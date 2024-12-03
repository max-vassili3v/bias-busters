import React, { useEffect, useRef, useState } from 'react';
import { Camera, CameraOff } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import ml5 from "ml5";

const WebcamViewer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [model, setModel] = useState<any>(null);
  const [status, setStatus] = useState<string>("Waiting for input...");

  const startWebcam = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' } 
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setError(null);
    } catch (err) {
      setError('Unable to access webcam. Please ensure you have granted camera permissions.');
      console.error('Error accessing webcam:', err);
    }
  };

  const stopWebcam = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  };

  useEffect(() => {
    const loadModel = () => {
      // Path to the model's JSON file in the public folder
      const modelPath = "https://teachablemachine.withgoogle.com/models/id8jGOFmW/";

      // Load the model using ml5.js
      const loadedModel = ml5.imageClassifier(modelPath, () => {
        console.log("Model loaded successfully!");
        console.log(Object.keys(loadedModel))
        setModel(loadedModel);
      });
    };

    loadModel();
  }, []);

  useEffect(() => {
    if (model && videoRef.current) {
      const classifyFrame = () => {
        if (videoRef.current) {
          model.classify(videoRef.current, (results: any[], error: any) => {
            if (error) {
              console.error(error);
              setStatus('Error during prediction');
              return;
            }

            // Get the top result
            const topPrediction = results[0];
            setStatus(`Predicted: ${topPrediction.label} (Confidence: ${(topPrediction.confidence * 100).toFixed(2)}%)`);
          });
        }
      };

      const interval = setInterval(classifyFrame, 100); // Classify every 100ms (you can adjust this timing)

      return () => clearInterval(interval); // Clean up the interval on component unmount
    }
  }, [model]);

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="relative w-full max-w-2xl aspect-video bg-gray-100 rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover"
        />
        {!stream && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <CameraOff className="w-12 h-12 text-gray-400" />
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <Button 
          onClick={startWebcam} 
          disabled={!!stream}
          className="flex items-center gap-2"
        >
          <Camera className="w-4 h-4" />
          Start Camera
        </Button>
        <Button 
          onClick={stopWebcam} 
          disabled={!stream}
          variant="outline"
          className="flex items-center gap-2"
        >
          <CameraOff className="w-4 h-4" />
          Stop Camera
        </Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <p style={{ marginTop: "20px", fontSize: "18px" }}>Reading Input: {status}</p>
    </div>
  );
};

export default WebcamViewer;