import React, { useEffect, useRef, useState } from 'react';
import { Camera, CameraOff, ArrowRight } from 'lucide-react';
import {Card, CardContent} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import ml5 from "ml5";

const WebcamViewer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [model, setModel] = useState<any>(null);
  const [status, setStatus] = useState<string>("Waiting for input...");

  const [currentSlide, setCurrentSlide] = useState(0);

  const audioRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);
  

  

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

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
      setIsAnimating(false);
    }, 500)
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

  useEffect(() => {
    // Play the audio when the component is mounted
    audioRef.current.play();
  }, []);

  const slides = [
    <Card className="w-screen h-screen">
      <CardContent className="h-full w-full flex flex-col items-center justify-center space-y-8 p-8">
        <h2 className="absolute top-1/4 text-5xl md:text-5xl lg:text-9xl text-center">Bias Breakers</h2>
        <h2 className="absolute top-1/2 text-5xl md:text-5xl lg:text-5xl text-center">a Game by AIKreate</h2>
        <h2 className="absolute top-2/3 text-5xl md:text-5xl lg:text-5xl text-center">Press 'Next' to start the game</h2>
      </CardContent>
    </Card>,
    <Card className="w-screen h-screen">
      <CardContent className="h-full w-full flex flex-col items-center justify-center space-y-8 p-8">
        <img 
          src="alien.jpg"
          alt="Greeting"
          className="absolute top-10 w-1/2 h-1/2 object-cover rounded-lg shadow-xl"
        />
        <h2 className="absolute top-2/3 transform -translate-x-1/4 text-3xl md:text-3xl lg:text-3xl text-center">Hi there!</h2>
      </CardContent>
    </Card>,
    <div className="slide bg-green-300 p-10 text-center">Slide 2: Here's Some Info</div>,
    <div className="slide bg-red-300 p-10 text-center">Slide 3: Enjoy the Experience</div>,
    <div className="slide bg-yellow-300 p-10 text-center">Slide 4: Thanks for Watching</div>,
    <div className="slide-container">
      <div className="flex flex-col items-center gap-4 p-10">
      <div className="relative w-full h-full max-w-4xl aspect-video bg-gray-100 rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover"
        />
        {!stream && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <CameraOff className="w-20 h-20 text-gray-400" />
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <Button 
          onClick={startWebcam} 
          disabled={!!stream}
          className="flex items-center gap-2"
        >
          <Camera className="w-4 h-4"/>
          Start Camera
        </Button>
        <Button 
          onClick={stopWebcam} 
          disabled={!stream}
          variant="outline"
          className="flex items-center gap-2"
        >
          <CameraOff className="w-4 h-4"/>
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
      </div>
  ];

  return (
    <div className="app">
      <div className="slide w-full h-full items-center justify-center p-4">
      <div className={`
          transition-opacity duration-500 ease-in-out
          ${isAnimating ? 'opacity-0' : 'opacity-100'}
        `}>
        {slides[currentSlide]}</div>
        </div>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center text-lg">
        <div className="animate-[opacity:1s,transform:1s] ease-in-out hover:scale-105 hover:shadow-2xl transition-all duration-300">
        <button
          onClick={nextSlide}
          className="bg-blue-500 text-white py-6 px-80  rounded hover:bg-blue-600"
        >
          <p className="text-sm md:text-base lg:text-lg xl:text-xl">Next</p>
          <ArrowRight size={24} />
        </button>
        </div>
        <audio ref = {audioRef} src="/music.mp3" autoPlay loop></audio>
      </div>
    </div>
  );
};

export default WebcamViewer;