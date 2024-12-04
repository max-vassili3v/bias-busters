import React, { useEffect, useRef, useState } from 'react';
import { Camera, CameraOff, ArrowRight } from 'lucide-react';
import {Card, CardContent} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import ml5 from "ml5";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';

const WebcamViewer = () => {

  const [currentSlide, setCurrentSlide] = useState(0);

  const audioRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const camSlides = [5];

  const [enabled, setEnabled] = useState(true);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
      setIsAnimating(false);
      console.log(currentSlide);
      if(camSlides.includes(currentSlide)) {
        console.log("Cam slide!");
        setEnabled(false);
      }else{
        setEnabled(true);
      }
    }, 500)
    
  };



  useEffect(() => {
    // Play the audio when the component is mounted
    audioRef.current.play();
  }, []);

  const slides = [
    // SLIDE 1
    <div className={`
      transition-opacity duration-500 ease-in-out
      ${isAnimating ? 'opacity-0' : 'opacity-100'}
    `}>
    <Card className="w-screen h-screen">
      <CardContent className="h-full w-full flex flex-col items-center justify-center space-y-8 p-8">
        <h2 className="absolute top-1/4 text-5xl md:text-5xl lg:text-9xl text-center">Bias Breakers</h2>
        <h2 className="absolute top-1/2 text-5xl md:text-5xl lg:text-5xl text-center">a Game by AIKreate</h2>
        <h2 className="absolute top-2/3 text-5xl md:text-5xl lg:text-5xl text-center">Press 'Next' to start the game</h2>
      </CardContent>
    </Card></div>,
    // SLIDE 2
    <Card className="w-screen h-screen">
      <CardContent className="h-full w-full flex flex-col items-center justify-center space-y-8 p-8">
        <img 
          src="alien.jpg"
          alt="Greeting"
          className="absolute top-10 w-1/2 h-1/2 object-cover rounded-lg shadow-xl"
        />
        <div className={`
      transition-opacity duration-500 ease-in-out
      ${isAnimating ? 'opacity-0' : 'opacity-100'}
    `}><h2 className="absolute top-2/3 transform -translate-x-1/4 text-3xl md:text-3xl lg:text-3xl text-center">Hi there!</h2></div>
      </CardContent>
    </Card>,
    // SLIDE 3
    <Card className="w-screen h-screen">
      <CardContent className="h-full w-full flex flex-col items-center justify-center space-y-8 p-8">
        <img 
          src="alien.jpg"
          alt="Greeting"
          className="absolute top-10 w-1/2 h-1/2 object-cover rounded-lg shadow-xl"
        />
        <div className={`
      transition-opacity duration-500 ease-in-out
      ${isAnimating ? 'opacity-0' : 'opacity-100'}
    `}>
        <h2 className="absolute top-2/3 transform -translate-x-1/4 text-3xl md:text-3xl lg:text-3xl text-center">We are an alien civilization from the distant planet of Aii.</h2></div>
      </CardContent>
    </Card>,
    // SLIDE 4
    <Card className="w-screen h-screen">
    <CardContent className="h-full w-full flex flex-col items-center justify-center space-y-8 p-8">
      <img 
        src="alien.jpg"
        alt="Greeting"
        className="absolute top-10 w-1/2 h-1/2 object-cover rounded-lg shadow-xl"
      />
      <div className={`
    transition-opacity duration-500 ease-in-out
    ${isAnimating ? 'opacity-0' : 'opacity-100'}
  `}>
      <h2 className="absolute top-2/3 transform -translate-x-1/4 text-3xl md:text-3xl lg:text-3xl text-center">Not to worry - we come in peace! However, we do have a request of you...</h2></div>
    </CardContent>
  </Card>,
  // SLIDE 5
  <Card className="w-screen h-screen">
  <CardContent className="h-full w-full flex flex-col items-center justify-center space-y-8 p-8">
    <img 
      src="alien.jpg"
      alt="Greeting"
      className="absolute top-10 w-1/2 h-1/2 object-cover rounded-lg shadow-xl"
    />
    <div className={`
  transition-opacity duration-500 ease-in-out
  ${isAnimating ? 'opacity-0' : 'opacity-100'}
`}>
    <h2 className="absolute top-2/3 transform -translate-x-1/4 text-3xl md:text-3xl lg:text-3xl text-center">We would like to learn a bit about the animals of your home planet!</h2></div>
  </CardContent>
</Card>,
// SLIDE 6
<Card className="w-screen h-screen">
  <CardContent className="absolute h-full w-full items-center justify-center space-y-8 p-8">
    <img 
      src="alien.jpg"
      alt="Greeting"
      className="absolute top-10 w-1/2 h-1/2 object-cover rounded-lg shadow-xl"
    />
    <div className={`
  transition-opacity duration-500 ease-in-out
  ${isAnimating ? 'opacity-0' : 'opacity-100'}
`}>
    <h2 className="absolute top-2/3 text-3xl md:text-3xl lg:text-3xl text-center">We have heard about these species called 'dogs' - maybe we can start with that?</h2></div>
  </CardContent>
</Card>,
//SLIDE 7 (CAMERA)
  <WebcamComponent success={nextSlide}></WebcamComponent>,
  <Card className="w-screen h-screen">
  <CardContent className="absolute h-full w-full items-center justify-center space-y-8 p-8">
    <img 
      src="alien.jpg"
      alt="Greeting"
      className="absolute top-10 w-1/2 h-1/2 object-cover rounded-lg shadow-xl"
    />
    <div className={`
  transition-opacity duration-500 ease-in-out
  ${isAnimating ? 'opacity-0' : 'opacity-100'}
`}>
    <h2 className="absolute top-2/3 text-3xl md:text-3xl lg:text-3xl text-center">So this is what you call a 'dog'... How fascinating!</h2></div>
  </CardContent>
</Card>,
<Card className="w-screen h-screen">
  <CardContent className="absolute h-full w-full items-center justify-center space-y-8 p-8">
    <img 
      src="alien.jpg"
      alt="Greeting"
      className="absolute top-10 w-1/2 h-1/2 object-cover rounded-lg shadow-xl"
    />
    <div className={`
  transition-opacity duration-500 ease-in-out
  ${isAnimating ? 'opacity-0' : 'opacity-100'}
`}>
    <h2 className="absolute top-2/3 text-3xl md:text-3xl lg:text-3xl text-center">I wonder if this is what all of these 'dogs' look like...</h2></div>
  </CardContent>
</Card>,
<Card className="w-screen h-screen">
  <CardContent className="absolute h-full w-3/4 flex flex-col items-center justify-center space-y-8 p-8">
    <h2 className="text-3xl md:text-3xl lg:text-3xl text-center">When humans make decisions, even though they don't have enough information for the bigger picture, this is called <b>bias</b>.</h2>
    <h2 className="text-3xl md:text-3xl lg:text-3xl text-center">Imagine someone who has only tried strawberry ice cream. They might say 'strawberry ice cream is my favourite flavour'. This is <b>biased</b>, because they have never tried any other flavours of ice cream - they do not have enough <b>information</b>.</h2>
  </CardContent>
</Card>
  ];

  return (
    <div className="app">
      <audio ref = {audioRef} src="/music.mp3" autoPlay loop></audio>
      <div className="slide w-full h-full items-center justify-center p-4" key={currentSlide}>
        {slides[currentSlide]}</div>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center text-lg">
        <div className="animate-[opacity:1s,transform:1s] ease-in-out hover:scale-105 hover:shadow-2xl transition-all duration-300">
        <button
          onClick={nextSlide}
          disabled={!enabled}
          className="bg-blue-500 text-white py-6 px-80  rounded hover:bg-blue-600"
        >
          <p className="text-sm md:text-base lg:text-lg xl:text-xl">Next</p>
          <ArrowRight size={24} />
        </button>
        </div>
        
      </div>
    </div>
  );
};

export default WebcamViewer;

interface WebcamComponentProps{
  success: () => void;
}

const WebcamComponent : React.FC<WebcamComponentProps> = ({success}) => {

  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("Waiting for input...");
  const [model, setModel] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);

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
      const modelPath = "https://teachablemachine.withgoogle.com/models/XsgaQW9Sh/";

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
        console.log("Classifying...")
        if (videoRef.current) {
          model.classify(videoRef.current, (results: any[], error: any) => {
            if (error) {
              console.error(error);
              setStatus('Error during prediction');
              return;
            }

            // Get the top result
            const topPrediction = results[0];
            console.log(`Predicted: ${topPrediction.label} (Confidence: ${(topPrediction.confidence * 100).toFixed(2)}%)`);
            if(topPrediction.label === "Class 3") {
              setIsOpen(true);
            }
            if(topPrediction.label === "Class 2") {
              success();
            }
          });
        }
      };

      const interval = setInterval(classifyFrame, 1000); // Classify every 100ms (you can adjust this timing)

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
      <p style={{ marginTop: "20px", fontSize: "18px" }}>Show us what a dog is! ({status})</p>
    </div>
    <PopupWindow isOpen = {isOpen} onClose={() => setIsOpen(false)} ttitle="Naughty!" msg={
      <div className="text-center"><p>This isn't a Dog!</p><br></br><p>However, this shows us one way an AI can be <b>biased</b>!</p><br></br><p>Just like how wrong data can trick humans, it can also trick AI. When you train AI, you have to make sure your data is correct.</p></div>
    }></PopupWindow>
      </div>
  );
};

interface PopupWindowProps {
  isOpen: boolean;
  onClose: () => void;
  ttitle: string;
  msg: JSX.Element;
}

const PopupWindow : React.FC<PopupWindowProps> = ({ isOpen, onClose, ttitle, msg}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md animate-pop-in data-[state=closed]:animate-pop-out fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <DialogHeader>
          <DialogTitle className="text-xl">{ttitle}</DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <p>{msg}</p>
        </div>
        <Button 
          className="mt-4 transition-all hover:scale-105" 
          onClick={onClose}
        >
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
};