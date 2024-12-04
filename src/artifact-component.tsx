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
import { motion } from 'framer-motion';

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
    <CenteredCard msg={
      <div className="relative w-full h-full">
        <h2 className="text-9xl font-semibold mb-6 leading-loose">Bias Busters</h2>
        <br></br>
          <p className="text-gray-600 text-lg leading-relaxed leading-loose">
            A game by AIKreate
          </p>
          <br></br>
          <br></br>
          <h2 className="text-4xl mb-6 leading-loose absolute w-full top-[150%]">Learn about how to train AI through trying to teach aliens about animals on planet Earth!</h2>
      </div>
    }></CenteredCard></div>,
    // SLIDE 2
    <CenteredCard msg={
      <div className="relative w-full h-full">
        <img 
          src="alien.jpg"
          alt="Greeting"
          className="w-96 rounded-lg mx-auto shadow-lg"
        />
        <h2 className="text-4xl mb-6 leading-loose absolute w-full top-[150%]">Hi there!</h2>
        </div>
    }></CenteredCard>,
    // SLIDE 3
    <CenteredCard msg={
      <div className="relative w-full h-full">
        <img 
          src="alien.jpg"
          alt="Greeting"
          className="w-96 rounded-lg mx-auto shadow-lg"
        />
        <div className={`
      transition-opacity duration-500 ease-in-out
      ${isAnimating ? 'opacity-0' : 'opacity-100'}
    `}><h2 className="text-4xl mb-6 leading-loose absolute w-full top-[150%]">We are an alien civilization from the distant planet of Aii.</h2></div>
      </div>
    }></CenteredCard>,
  // SLIDE 4
  <CenteredCard msg={
    <div className="relative w-full h-full">
      <img 
        src="alien.jpg"
        alt="Greeting"
        className="w-96 rounded-lg mx-auto shadow-lg"
      />
      <div className={`
    transition-opacity duration-500 ease-in-out
    ${isAnimating ? 'opacity-0' : 'opacity-100'}
  `}><h2 className="text-4xl mb-6 leading-loose absolute w-full top-[150%]">Not to worry - we come in peace! However, we do have something we'd like you to do...</h2></div>
    </div>
  }></CenteredCard>,
  // SLIDE 5
  <CenteredCard msg={
    <div className="relative w-full h-full">
      <img 
        src="alien.jpg"
        alt="Greeting"
        className="w-96 rounded-lg mx-auto shadow-lg"
      />
      <div className={`
    transition-opacity duration-500 ease-in-out
    ${isAnimating ? 'opacity-0' : 'opacity-100'}
  `}><h2 className="text-4xl mb-6 leading-loose absolute w-full top-[150%]">We would like to learn a bit about the animals of your home planet!</h2></div>
    </div>
  }></CenteredCard>,
  // SLIDE 6
  <CenteredCard msg={
    <div className="relative w-full h-full">
      <img 
        src="alien.jpg"
        alt="Greeting"
        className="w-96 rounded-lg mx-auto shadow-lg"
      />
      <div className={`
    transition-opacity duration-500 ease-in-out
    ${isAnimating ? 'opacity-0' : 'opacity-100'}
  `}><h2 className="text-4xl mb-6 leading-loose absolute w-full top-[150%]">We have heard about these species called 'dogs' - maybe we can start with that?</h2></div>
    </div>
  }></CenteredCard>,
//SLIDE 7 (CAMERA)
<div className={`
  transition-opacity duration-500 ease-in-out
  ${isAnimating ? 'opacity-0' : 'opacity-100'}
`}><WebcamComponent success={nextSlide} msg = "Show the aliens what a dog is through the camera"></WebcamComponent></div>,
//SLIDE 8
<CenteredCard msg={
    <div className="relative w-full h-full">
      <img 
        src="alien.jpg"
        alt="Greeting"
        className="w-96 rounded-lg mx-auto shadow-lg"
      />
      <div className={`
    transition-opacity duration-500 ease-in-out
    ${isAnimating ? 'opacity-0' : 'opacity-100'}
  `}><h2 className="text-4xl mb-6 leading-loose absolute w-full top-[150%]">So this is what you call a dog...How fascinating!</h2></div>
    </div>
  }></CenteredCard>,
  //SLIDE 9
  <div className={`
    transition-opacity duration-500 ease-in-out
    ${isAnimating ? 'opacity-0' : 'opacity-100'}
  `}>
<CenteredCard msg={
    <div className="relative w-full h-full">
      <img 
        src="alien.jpg"
        alt="Greeting"
        className="w-96 rounded-lg mx-auto shadow-lg"
      />
      <h2 className="text-4xl mb-6 leading-loose absolute w-full top-[150%]">I wonder if this is what all of these 'dogs' look like...</h2></div>
  }></CenteredCard></div>,
  //SLIDE 9
  <div className={`
    transition-opacity duration-500 ease-in-out
    ${isAnimating ? 'opacity-0' : 'opacity-100'}
  `}>
<CenteredCard msg={
    <div className="relative w-full h-full">
      <h2 className="text-4xl mb-6 leading-loose py-10">When humans make decisions without enough information to understand the bigger picture, it is called <b>bias.</b></h2>
      <h2 className="text-4xl mb-6 leading-loose py-10">Someone being <b>biased</b> is a very similar idea to someone being unfair or not open minded: it is when they are not properly considering every perspective or every option.</h2>
      <h2 className="text-4xl mb-6 leading-loose py-10">Let's go over some examples to understand properly!</h2></div>
  }></CenteredCard></div>,
  //SLIDE 9
  <div className={`
    transition-opacity duration-500 ease-in-out
    ${isAnimating ? 'opacity-0' : 'opacity-100'}
  `}>
<CenteredCard msg={
    <div className="relative w-full h-full">
      <h2 className="text-4xl mb-6 leading-loose">Imagine you are a human who has only ever tried chocolate ice cream. When someone asks you what your favorite flavor is, you probably say chocolate.</h2>
      <h2 className="text-4xl mb-6 leading-loose">But this is biased! You have never tried any other flavors before. You do not have enough <b>information</b> to make an <b>unbiased decision.</b></h2>
      <img 
        src="icecream.jpg"
        alt="Greeting"
        className="w-96 rounded-lg mx-auto shadow-lg"
      /></div>
  }></CenteredCard></div>,
  //SLIDE 10
  <div className={`
    transition-opacity duration-500 ease-in-out
    ${isAnimating ? 'opacity-0' : 'opacity-100'}
  `}>
  <CenteredCard msg={
    <div className="relative w-full h-full">
      <h2 className="text-4xl mb-6 leading-loose">Another example! Imagine you are having an argument with a stranger.</h2>
      <h2 className="text-4xl mb-6 leading-loose py-10">Your friends and the stranger's friends are listening. Because your friends know and trust you, they might be <b>biased</b> and automatically think you are correct. Even if you are actually wrong</h2>
      <img 
        src="argue.jpg"
        alt="Greeting"
        className="w-96 rounded-lg mx-auto shadow-lg"
      /></div>
  }></CenteredCard></div>,
  //SLIDE 11
  <div className={`
    transition-opacity duration-500 ease-in-out
    ${isAnimating ? 'opacity-0' : 'opacity-100'}
  `}>
  <CenteredCard msg={
    <div className="relative w-full h-full">
      <h2 className="text-4xl mb-6 leading-loose py-10">Our AI aliens can also be biased. We have only shown them one type of dog. They do not have enough information to understand that there are other types of dogs.</h2>
      <h2 className="text-4xl mb-6 leading-loose py-10">It is important to teach our AI that dogs can come in different colors, sizes, species, and so on.</h2>
      <h2 className="text-4xl mb-6 leading-loose py-10">So let's continue, and show our aliens what other dogs can look like!</h2>
      </div>
  }></CenteredCard></div>,
  //SLIDE 12
<div className={`
    transition-opacity duration-500 ease-in-out
    ${isAnimating ? 'opacity-0' : 'opacity-100'}
  `}><WebcamComponent success={nextSlide} msg = "Show the aliens what other dogs look like!"></WebcamComponent></div>,
<CenteredCard msg={
    <div className="relative w-full h-full">
      <img 
        src="alien.jpg"
        alt="Greeting"
        className="w-96 rounded-lg mx-auto shadow-lg"
      />
      <div className={`
    transition-opacity duration-500 ease-in-out
    ${isAnimating ? 'opacity-0' : 'opacity-100'}
  `}><h2 className="text-4xl mb-6 leading-loose absolute w-full top-[150%]">Thanks a bunch! Now we understand what a dog is, and how they come in different sizes and colors!</h2></div>
    </div>
  }></CenteredCard>,
  //SLIDE 13
  <CenteredCard msg={
    <div className="relative w-full h-full">
      <img 
        src="alien.jpg"
        alt="Greeting"
        className="w-96 rounded-lg mx-auto shadow-lg"
      />
      <div className={`
    transition-opacity duration-500 ease-in-out
    ${isAnimating ? 'opacity-0' : 'opacity-100'}
  `}><h2 className="text-4xl mb-6 leading-loose absolute w-full top-[150%]">My next question is about this other animal called a 'cat'. Please show me a cat.</h2></div>
    </div>
  }></CenteredCard>,
  //SLIDE 14
<div className={`
  transition-opacity duration-500 ease-in-out
  ${isAnimating ? 'opacity-0' : 'opacity-100'}
`}>
<WebcamComponent success={nextSlide} msg = "Show the aliens what a cat is through the camera"></WebcamComponent></div>,
//SLIDE 15
<div className={`
    transition-opacity duration-500 ease-in-out
    ${isAnimating ? 'opacity-0' : 'opacity-100'}
  `}>
<CenteredCard msg={
    <div className="relative w-full h-full">
      <img 
        src="alien.jpg"
        alt="Greeting"
        className="w-96 rounded-lg mx-auto shadow-lg"
      />
      <h2 className="text-4xl mb-6 leading-loose absolute w-full top-[150%]">So this is a cat, but I don't understand how this is different from a dog! They both have pointy ears, round eyes, fur...</h2></div>
    
  }></CenteredCard></div>,
  //SLIDE 16
  <div className={`
    transition-opacity duration-500 ease-in-out
    ${isAnimating ? 'opacity-0' : 'opacity-100'}
  `}>
  <CenteredCard msg={
    <div className="relative w-full h-full">
      <h2 className="text-4xl mb-6 leading-loose"><b>Bias</b> can also cause us to not understand the difference between things. Imagine you were arranging fruits into categories but you had never seen an orange before. Is it a strange apple? Maybe a strange peach?</h2>
      <h2 className="text-4xl mb-6 leading-loose py-10">Because we don't have enough <b>information</b>, we are <b>biased</b> in how we recognise different fruits.</h2>
      <img 
        src="orange.jpg"
        alt="Greeting"
        className="w-96 rounded-lg mx-auto shadow-lg"
      />
      </div>
  }></CenteredCard></div>,
  //SLIDE 17
  <div className={`
    transition-opacity duration-500 ease-in-out
    ${isAnimating ? 'opacity-0' : 'opacity-100'}
  `}>
  <CenteredCard msg={
    <div className="relative w-full h-full">
      <h2 className="text-4xl mb-6 leading-loose">In the same way, our AI aliens are <b>biased</b> because they do not have enough information about cats to properly tell the difference.</h2>
      <h2 className="text-4xl mb-6 leading-loose py-10">Since they have only seen dogs, they can only understand things by comparing it with a dog.</h2>
      <h2 className="text-4xl mb-6 leading-loose py-10">Let's try and teach them the difference by showing more pictures of cats!</h2>
      </div>
  }></CenteredCard></div>,
  //SLIDE 18 (camera)
<WebcamComponent success={nextSlide} msg = "Show the aliens more pictures of cats!"></WebcamComponent>,
//SLIDE 19
<div className={`
    transition-opacity duration-500 ease-in-out
    ${isAnimating ? 'opacity-0' : 'opacity-100'}
  `}>
<CenteredCard msg={
    <div className="relative w-full h-full">
      <img 
        src="alien.jpg"
        alt="Greeting"
        className="w-96 rounded-lg mx-auto shadow-lg"
      />
      <h2 className="text-4xl mb-6 leading-loose absolute w-full top-[150%]">Wow! Now I understand what a cat is, and the difference between cats and dogs. Thank you!!!</h2></div>
    
  }></CenteredCard></div>,
  //SLIDE 20
  <div className={`
    transition-opacity duration-500 ease-in-out
    ${isAnimating ? 'opacity-0' : 'opacity-100'}
  `}>
  <CenteredCard msg={
    <div className="relative w-full h-full">
      <h2 className="text-4xl mb-6 leading-loose"><b>Congratulations!</b> you have completed the lesson and you now understand how bias can trick AI, and why good data is needed for AI. </h2>
      <h2 className="text-4xl mb-6 leading-loose py-10">We now have some challenges for you. Teach our alien friends what a 'bear' is and what a 'bird' is using the remaining cards.</h2>
      <h2 className="text-4xl mb-6 leading-loose py-10">Once you think you have given enough good data, press 'next' to see how well the AI understands what bears and birds are. See if you can get 100% accuracy!</h2>
      </div>
  }></CenteredCard></div>,
  //SLIDE 21
  <div className={`
    transition-opacity duration-500 ease-in-out
    ${isAnimating ? 'opacity-0' : 'opacity-100'}
  `}>
  <CenteredCard msg={
    <div className="relative w-full h-full">
      <h2 className="text-4xl mb-6 leading-loose py-[20%]">First, let's start with bears. </h2>
      </div>
  }></CenteredCard></div>,
  //SLIDE 22
<div className={`
    transition-opacity duration-500 ease-in-out
    ${isAnimating ? 'opacity-0' : 'opacity-100'}
  `}>
<WebcamComponent success={nextSlide} msg = "Show the aliens what a bear is through the camera"></WebcamComponent></div>,
//SLIDE 23
<div className={`
    transition-opacity duration-500 ease-in-out
    ${isAnimating ? 'opacity-0' : 'opacity-100'}
  `}>
  <CenteredCard msg={
    <div className="relative w-full h-full">
      <h2 className="text-4xl mb-6 leading-loose py-[10%]">Accuracy: 100% </h2>
      <h2 className="text-4xl mb-6 leading-loose">Wow!!! Well done!</h2>
      </div>
  }></CenteredCard></div>,
  //SLIDE 24
<div className={`
    transition-opacity duration-500 ease-in-out
    ${isAnimating ? 'opacity-0' : 'opacity-100'}
  `}>
  <CenteredCard msg={
    <div className="relative w-full h-full">
      <h2 className="text-4xl mb-6 leading-loose py-[20%]">Now, let's try birds.</h2>
      </div>
  }></CenteredCard></div>,
  //SLIDE 25 (camera)
  <div className={`
    transition-opacity duration-500 ease-in-out
    ${isAnimating ? 'opacity-0' : 'opacity-100'}
  `}>
<WebcamComponent success={nextSlide} msg = "Show the aliens what a bird is through the camera"></WebcamComponent></div>,
//SLIDE 26
<div className={`
    transition-opacity duration-500 ease-in-out
    ${isAnimating ? 'opacity-0' : 'opacity-100'}
  `}>
  <CenteredCard msg={
    <div className="relative w-full h-full">
      <h2 className="text-4xl mb-6 leading-loose py-[10%]">Accuracy: 100% </h2>
      <h2 className="text-4xl mb-6 leading-loose">Wow!!! Well done!</h2>
      </div>
  }></CenteredCard></div>,
  //SLIDE 27
<div className={`
      transition-opacity duration-500 ease-in-out
      ${isAnimating ? 'opacity-0' : 'opacity-100'}
    `}>
    <CenteredCard msg={
      <div className="relative w-full h-full">
        <h2 className="text-9xl font-semibold mb-6 leading-loose">Thank you for playing!</h2>
        <br></br>
          <p className="text-gray-600 text-lg leading-relaxed leading-loose">
            Developed by Max Vassiliev
          </p>
          <br></br>
          <br></br>
          <h2 className="text-4xl mb-6 leading-loose absolute w-full top-[150%]">To play again, click 'Next'. If you didn't get 100% accuracy, feel free to try again!</h2>
      </div>
    }></CenteredCard></div>
  ];

  return (
    <div className="app">
      <audio ref = {audioRef} src="/music.mp3" autoPlay loop></audio>
      <div className="items-center justify-center p-4" key={currentSlide}>
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
  msg: string;
}

const WebcamComponent : React.FC<WebcamComponentProps> = ({success, msg}) => {

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

      const interval = setInterval(classifyFrame, 3000); // Classify every 100ms (you can adjust this timing)

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
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
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
      <h2 className="text-2xl font-semibold mb-6 leading-loose bg-black bg-opacity-60 p-5 rounded-lg">{msg}</h2>
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
          {msg}
        </div>
        <Button 
          className="mt-4 transition-all hover:scale-105 bg-blue" 
          onClick={onClose}
        >
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
};

interface CenteredCardProps {
  msg: JSX.Element;
}

const CenteredCard : React.FC<CenteredCardProps> = ({msg}) => {
  return (
    <motion.div initial={{ opacity: 0 }} exit={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
    <div className="min-h-screen flex items-start justify-center p-8 ">
      <Card className="w-full max-w-[90%] h-[80vh] dark border-0">
        <CardContent className="p-12 text-center flex flex-col">
          {msg}
        </CardContent>
      </Card>
    </div>
    </motion.div>
  );
};