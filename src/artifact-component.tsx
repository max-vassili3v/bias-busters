//@ts-ignore

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
import { motion, AnimatePresence } from 'framer-motion';

const WebcamViewer = () => {

  const [currentSlide, setCurrentSlide] = useState(0);

  const audioRef = useRef(null);

  const camSlides = [5, 12, 15, 19];

  const accuracy = useRef(0.0);

  const [enabled, setEnabled] = useState(true);
  const dogs : Record<string, JSX.Element> = {
    Dog1: <div>
    <p>Yes! This is a dog!</p>
    <p>This dog is drawn in a <b>cartoon style.</b> It is important for the AI to recognise different styles of picture for dogs.</p>
    <p>Keep showing the AI other pictures of dogs to reduce <b>bias</b>.</p>
    </div>,
    Dog2: <div>
    <p>Yes! This is a dog!</p>
    <p>Here we see what the <b>full body</b> of the dog looks like, so that AI can recognise dogs not just by their face.</p>
    <p>Keep showing the AI other pictures of dogs to reduce <b>bias</b>.</p>
    </div>,
    Dog3: <div>
    <p>Yes! This is a dog!</p>
    <p>Here we have a different <b>species</b> of the dog as well as a different <b>style of picture.</b> Now our AI can recognise this too!</p>
    <p>Keep showing the AI other pictures of dogs to reduce <b>bias</b>.</p>
    </div>,
    Dog4: <div>
    <p>Yes! This is a dog!</p>
    <p>This dog is <b>black</b>, a different color to the rest. Teaching AI that dogs can be different colors will reduce bias!`121</p>
    <p>Keep showing the AI other pictures of dogs to reduce <b>bias</b>.</p>
    </div>
  };
  const cats : Record<string, JSX.Element> = {
    Cat1: <div>
    <p>Yes! This is a cat!</p>
    <p>Here, we show the AI just what the face of the cat looks like drawn in a 3D style. It is important to recognise the face as well as the whole body.</p>
    <p>Keep showing the AI other pictures of cats to reduce <b>bias</b>.</p>
    </div>,
    Cat2: <div>
    <p>Yes! This is a cat!</p>
    <p>It is important to show to our AI that cats can also be drawn like cartoons and have white fur.</p>
    <p>Keep showing the AI other pictures of cats to reduce <b>bias</b>.</p>
    </div>,
    Cat3: <div>
    <p>Yes! This is a cat!</p>
    <p>Here, we show the AI that cats can come in the color black, another color to reduce the bias of the AI!</p>
    <p>The cat is also looking sideways, so that the AI can recognise different views of cats.</p>
    <p>Keep showing the AI other pictures of cats to reduce <b>bias</b>.</p>
    </div>,
    Cat4: <div><p>Yes! This is a cat!</p>
    <p>We have the full body of the cat, from head to tail here.</p>
    <p>Keep showing the AI other pictures of cats to reduce <b>bias</b>.</p>
    </div>
  };
  const bears : Record<string, JSX.Element> = {
    Bear1: <div><p>Yes! This is a bear!</p>
    <p>This is a teddy bear: after all, that is a <b>type</b> of bear right?</p>
    <p>Keep showing the AI other pictures of bears to reduce <b>bias</b>.</p>
    </div>,
    Bear2: <div><p>Yes! This is a bear!</p>
    <p>This is a cute, cartooney gray bear! Very <b>distinct</b> from the others, so will reduce <b>bias</b> a lot!</p>
    <p>Keep showing the AI other pictures of bears to reduce <b>bias</b>.</p>
    </div>,
    Bear3: <div><p>Yes! This is a bear!</p>
    <p>This is a polar bear, another <b>type</b> of bear, drawn in a <b>Cartoon artstyle</b>.</p>
    <p>Keep showing the AI other pictures of bears to reduce <b>bias</b>.</p>
    </div>,
    Bear4: <div><p>Yes! This is a bear!</p>
    <p>This 3D grizzly bear is what most people imagine when they think of a bear, very important to teach our AI!</p>
    <p>Keep showing the AI other pictures of bears to reduce <b>bias</b>.</p>
    </div>,
    Bear5: <div><p>Yes! This is a bear!</p>
    <p>Look at this cute baby bear, drawn in a <b>3D artstyle.</b>.</p>
    <p>Keep showing the AI other pictures of bears to reduce <b>bias</b>.</p>
    </div>,
    Bear6: <div><p>Yes! This is a bear!</p>
    <p>This bear is black, one of the possible <b>colours</b> of bear our AI should know.</p>
    <p>Keep showing the AI other pictures of bears to reduce <b>bias</b>.</p>
    </div>,
    Bear7: <div><p>Yes! This is a bear!</p>
    <p>This is a polar bear, another <b>type</b> of bear, drawn in a <b>3D artstyle</b>.</p>
    <p>Keep showing the AI other pictures of bears to reduce <b>bias</b>.</p>
    </div>,
    Bear8: <div><p>Yes! This is a bear!</p>
    <p>This is a <b>cartoon bear</b>, important for our AI to be able to recognise as a bear.</p>
    <p>Keep showing the AI other pictures of bears to reduce <b>bias</b>.</p>
    </div>
  };
  const birds : Record<string, JSX.Element> = {
    Bird1: <div><p>Yes! This is a bird!</p>
    <p>This face of a majestic eagle is one of the many representations of a bird our AI should know!</p>
    <p>Keep showing the AI other pictures of birds to reduce <b>bias</b>.</p>
    </div>,
    Bird2: <div><p>Yes! This is a bird!</p>
    <p>Here, we only see the bird's face, helping the AI recognise a bird just by its face!</p>
    <p>Keep showing the AI other pictures of birds to reduce <b>bias</b>.</p>
    </div>,
    Bird3: <div><p>Yes! This is a bird!</p>
    <p>This picture of an eagle shows its full body, so that AI knows what that looks like as well!</p>
    <p>Keep showing the AI other pictures of birds to reduce <b>bias</b>.</p>
    </div>,
    Bird4: <div><p>Yes! This is a bird!</p>
    <p>This white stork shows in full view the wings that birds have, and how big they can be! This will reduce <b>bias</b>.</p>
    <p>Keep showing the AI other pictures of birds to reduce <b>bias</b>.</p>
    </div>,
    Bird5: <div><p>Yes! This is a bird!</p>
    <p>This is a cute, cartooney pidgeon. Learning that this is also a bird helps reduce <b>bias</b></p>
    <p>Keep showing the AI other pictures of birds to reduce <b>bias</b>.</p>
    </div>,
    Bird6: <div><p>Yes! This is a bird!</p>
    <p>This pink flamingo is very unique from the others, helping to reduce <b>bias</b>!</p>
    <p>Keep showing the AI other pictures of birds to reduce <b>bias</b>.</p>
    </div>,
    Bird7: <div><p>Yes! This is a bird!</p>
    <p>This pidgeon is 3D, helping to reduce <b>bias</b> by showing different styles of pictures.</p>
    <p>Keep showing the AI other pictures of birds to reduce <b>bias</b>.</p>
    </div>,
    Bird8: <div><p>Yes! This is a bird!</p>
    <p>This crow is black, a different <b>color</b> from the rest of the birds. This teaches the AI that birds can come in different colors!</p>
    <p>Keep showing the AI other pictures of birds to reduce <b>bias</b>.</p>
    </div>
  };

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    console.log(currentSlide);
    if(camSlides.includes(currentSlide)) {
      console.log("Cam slide!");
      setEnabled(false);
    }else{
      setEnabled(true);
    }
    
  };

  useEffect(() => {
    // Play the audio when the component is mounted
    audioRef.current.play();
  }, []);

  const slides = [
    // SLIDE 1
    <AnimatePresence mode="wait">
    <CenteredCard key={currentSlide} msg={
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
    }></CenteredCard></AnimatePresence>,
    // SLIDE 2
    <AnimatePresence mode="wait">
    <CenteredCard key = {currentSlide} msg={
      <div className="relative w-full h-full">
        <img 
          src="alien.jpg"
          alt="Greeting"
          className="w-96 rounded-lg mx-auto shadow-lg"
        />
        <h2 className="text-4xl mb-6 leading-loose absolute w-full top-[150%]">Hi there!</h2>
        </div>
    }></CenteredCard></AnimatePresence>,
    // SLIDE 3
    <CenteredCard msg={
      <div className="relative w-full h-full">
        <img 
          src="alien.jpg"
          alt="Greeting"
          className="w-96 rounded-lg mx-auto shadow-lg"
        />
    <h2 className="text-4xl mb-6 leading-loose absolute w-full top-[150%]">We are an alien civilization from the distant planet of Aii.</h2></div>
    }></CenteredCard>,
  // SLIDE 4
  <CenteredCard msg={
    <div className="relative w-full h-full">
      <img 
        src="alien.jpg"
        alt="Greeting"
        className="w-96 rounded-lg mx-auto shadow-lg"
      />
      <h2 className="text-4xl mb-6 leading-loose absolute w-full top-[150%]">Not to worry - we come in peace! However, we do have something we'd like you to do...</h2></div>
  }></CenteredCard>,
  // SLIDE 5
  <CenteredCard msg={
    <div className="relative w-full h-full">
      <img 
        src="alien.jpg"
        alt="Greeting"
        className="w-96 rounded-lg mx-auto shadow-lg"
      />
      <h2 className="text-4xl mb-6 leading-loose absolute w-full top-[150%]">We would like to learn a bit about the animals of your home planet!</h2></div>
  }></CenteredCard>,
  // SLIDE 6
  <CenteredCard msg={
    <div className="relative w-full h-full">
      <img 
        src="alien.jpg"
        alt="Greeting"
        className="w-96 rounded-lg mx-auto shadow-lg"
      /><h2 className="text-4xl mb-6 leading-loose absolute w-full top-[150%]">We have heard about these species called 'dogs' - maybe we can start with that?</h2></div>
  }></CenteredCard>,
//SLIDE 7 (CAMERA)
<WebcamComponent success={nextSlide} seenThresh = {1} msg = "Show the aliens what a dog is through the camera" acceptArray={dogs} acc = {accuracy}></WebcamComponent>,
//SLIDE 8
<CenteredCard msg={
    <div className="relative w-full h-full">
      <img 
        src="alien.jpg"
        alt="Greeting"
        className="w-96 rounded-lg mx-auto shadow-lg"
      />
<h2 className="text-4xl mb-6 leading-loose absolute w-full top-[150%]">So this is what you call a dog...How fascinating!</h2></div>
  }></CenteredCard>,
  //SLIDE 9
<CenteredCard msg={
    <div className="relative w-full h-full">
      <img 
        src="alien.jpg"
        alt="Greeting"
        className="w-96 rounded-lg mx-auto shadow-lg"
      />
      <h2 className="text-4xl mb-6 leading-loose absolute w-full top-[150%]">I wonder if this is what all of these 'dogs' look like...</h2></div>
  }></CenteredCard>,
  //SLIDE 10
<CenteredCard msg={
    <div className="relative w-full h-full">
      <h2 className="text-4xl mb-6 leading-loose py-10">When humans make decisions without enough information to understand the bigger picture, it is called <b>bias.</b></h2>
      <h2 className="text-4xl mb-6 leading-loose py-10">Someone being <b>biased</b> is a very similar idea to someone being unfair or not open minded: it is when they are not properly considering every perspective or every option.</h2>
      <h2 className="text-4xl mb-6 leading-loose py-10">Let's go over some examples to understand properly!</h2></div>
  }></CenteredCard>,
  //SLIDE 11
<CenteredCard msg={
    <div className="relative w-full h-full">
      <h2 className="text-4xl mb-6 leading-loose">Imagine you are a human who has only ever tried chocolate ice cream. When someone asks you what your favorite flavor is, you probably say chocolate.</h2>
      <h2 className="text-4xl mb-6 leading-loose">But this is biased! You have never tried any other flavors before. You do not have enough <b>information</b> to make an <b>unbiased decision.</b></h2>
      <img 
        src="icecream.jpg"
        alt="Greeting"
        className="w-96 rounded-lg mx-auto shadow-lg"
      /></div>
  }></CenteredCard>,
  //SLIDE 12
  <CenteredCard msg={
    <div className="relative w-full h-full">
      <h2 className="text-4xl mb-6 leading-loose">Another example! Imagine you are having an argument with a stranger.</h2>
      <h2 className="text-4xl mb-6 leading-loose py-10">Your friends and the stranger's friends are listening. Because your friends know and trust you, they might be <b>biased</b> and automatically think you are correct. Even if you are actually wrong</h2>
      <img 
        src="argue.jpg"
        alt="Greeting"
        className="w-96 rounded-lg mx-auto shadow-lg"
      /></div>
  }></CenteredCard>,
  //SLIDE 13
  <CenteredCard msg={
    <div className="relative w-full h-full">
      <h2 className="text-4xl mb-6 leading-loose py-10">Our AI aliens can also be biased. We have only shown them one type of dog. They do not have enough information to understand that there are other types of dogs.</h2>
      <h2 className="text-4xl mb-6 leading-loose py-10">It is important to teach our AI that dogs can come in different colors, sizes, species, and so on.</h2>
      <h2 className="text-4xl mb-6 leading-loose py-10">So let's continue, and show our aliens what other dogs can look like!</h2>
      </div>
  }></CenteredCard>,
  //SLIDE 14 (camera)
<WebcamComponent success={nextSlide} seenThresh={3} msg = "Show the aliens what other dogs look like!" acceptArray={dogs} acc = {accuracy}></WebcamComponent>,
//SLIDE 15
<CenteredCard msg={
    <div className="relative w-full h-full">
      <img 
        src="alien.jpg"
        alt="Greeting"
        className="w-96 rounded-lg mx-auto shadow-lg"
      /><h2 className="text-4xl mb-6 leading-loose absolute w-full top-[150%]">Thanks a bunch! Now we understand what a dog is, and how they come in different sizes and colors!</h2></div>
  }></CenteredCard>,
  //SLIDE 16
  <CenteredCard msg={
    <div className="relative w-full h-full">
      <img 
        src="alien.jpg"
        alt="Greeting"
        className="w-96 rounded-lg mx-auto shadow-lg"
      />
<h2 className="text-4xl mb-6 leading-loose absolute w-full top-[150%]">My next question is about this other animal called a 'cat'. Please show me a cat.</h2></div>
  }></CenteredCard>,
  //SLIDE 17 (camera)
<WebcamComponent success={nextSlide} msg = "Show the aliens what a cat is through the camera" acceptArray={cats} seenThresh={1} acc = {accuracy}></WebcamComponent>,
//SLIDE 18
<CenteredCard msg={
    <div className="relative w-full h-full">
      <img 
        src="alien.jpg"
        alt="Greeting"
        className="w-96 rounded-lg mx-auto shadow-lg"
      />
      <h2 className="text-4xl mb-6 leading-loose absolute w-full top-[150%]">So this is a cat, but I don't understand how this is different from a dog! They both have pointy ears, round eyes, fur...</h2></div>
    
  }></CenteredCard>,
  //SLIDE 19
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
  }></CenteredCard>,
  //SLIDE 20
  <CenteredCard msg={
    <div className="relative w-full h-full">
      <h2 className="text-4xl mb-6 leading-loose">In the same way, our AI aliens are <b>biased</b> because they do not have enough information about cats to properly tell the difference.</h2>
      <h2 className="text-4xl mb-6 leading-loose py-10">Since they have only seen dogs, they can only understand things by comparing it with a dog.</h2>
      <h2 className="text-4xl mb-6 leading-loose py-10">Let's try and teach them the difference by showing more pictures of cats!</h2>
      </div>
  }></CenteredCard>,
  //SLIDE 21 (camera)
<WebcamComponent success={nextSlide} msg = "Show the aliens more pictures of cats!" acceptArray = {cats} seenThresh={3} acc = {accuracy}></WebcamComponent>,
//SLIDE 22
<CenteredCard msg={
    <div className="relative w-full h-full">
      <img 
        src="alien.jpg"
        alt="Greeting"
        className="w-96 rounded-lg mx-auto shadow-lg"
      />
      <h2 className="text-4xl mb-6 leading-loose absolute w-full top-[150%]">Wow! Now I understand what a cat is, and the difference between cats and dogs. Thank you!!!</h2></div>
    
  }></CenteredCard>,
  //SLIDE 23
  <CenteredCard msg={
    <div className="relative w-full h-full">
      <h2 className="text-4xl mb-6 leading-loose"><b>Congratulations!</b> you have completed the lesson and you now understand how bias can trick AI, and why good data is needed for AI. </h2>
      <h2 className="text-4xl mb-6 leading-loose py-10">We now have some challenges for you. Teach our alien friends what a 'bear' is and what a 'bird' is using the remaining cards.</h2>
      <h2 className="text-4xl mb-6 leading-loose py-10">Once you think you have given enough good data, press 'next' to see how well the AI understands what bears and birds are. See if you can get 100% accuracy!</h2>
      </div>
  }></CenteredCard>,
  //SLIDE 24
  <CenteredCard msg={
    <div className="relative w-full h-full">
      <h2 className="text-4xl mb-6 leading-loose py-[20%]">First, let's start with bears. </h2>
      </div>
  }></CenteredCard>,
  //SLIDE 25
<WebcamComponent success={nextSlide} msg = "Show the aliens what a bear is through the camera" acceptArray={bears} seenThresh={1024} acc = {accuracy}></WebcamComponent>,
//SLIDE 26
  <CenteredCard msg={
    <div className="relative w-full h-full">
      <h2 className="text-4xl mb-6 leading-loose py-[10%]">Accuracy: {accuracy.current}% </h2>
      <h2 className="text-4xl mb-6 leading-loose">Wow!!! Well done!</h2>
      </div>
  }></CenteredCard>,
  //SLIDE 27
  <CenteredCard msg={
    <div className="relative w-full h-full">
      <h2 className="text-4xl mb-6 leading-loose py-[20%]">Now, let's try birds.</h2>
      </div>
  }></CenteredCard>,
  //SLIDE 28 (camera)
<WebcamComponent success={nextSlide} msg = "Show the aliens what a bird is through the camera" acceptArray={birds} seenThresh={1024} acc = {accuracy}></WebcamComponent>,
//SLIDE 29
  <CenteredCard msg={
    <div className="relative w-full h-full">
      <h2 className="text-4xl mb-6 leading-loose py-[10%]">Accuracy: {accuracy.current}% </h2>
      <h2 className="text-4xl mb-6 leading-loose">Wow!!! Well done!</h2>
      </div>
  }></CenteredCard>,
  //SLIDE 30
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
    }></CenteredCard>
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
  acceptArray: Record<string, JSX.Element>;
  seenThresh: number;
  acc: React.RefObject<number>;
}

const WebcamComponent : React.FC<WebcamComponentProps> = ({success, msg, acceptArray, seenThresh, acc}) => {

  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("Waiting for input...");
  const [model, setModel] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const currentPrediction = useRef("");
  const reject_message : JSX.Element = <div>
    <p>This isn't the correct animal!</p><br></br>
    <p>However, this shows us one way an AI can be <b>biased</b>!</p><br></br>
    <p>Just like how wrong data can trick humans, it can also trick AI. When you train AI, you have to make sure your data is correct.</p>
    <p><b>Note: AI may be wrong! Sometimes, you need to try again.</b></p>
    </div>
  const [message, setMessage] = useState<JSX.Element>(null);
  const seenSet = useRef(new Set<string>());
  const mistakes = useRef(0);
  

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
      const modelPath = "https://teachablemachine.withgoogle.com/models/t9XwtXKVp/";

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
            currentPrediction.current = topPrediction.label
            if(topPrediction.label != "Neutral" && topPrediction.label in acceptArray) {
              seenSet.current.add(topPrediction.label)
              setMessage(acceptArray[topPrediction.label]);
              // @ts-ignore
              acc.current = Math.max(0, Math.min(100, 12.5 * seenSet.current.size - 0.5 * mistakes.current));
              console.log("Accuracy", acc);
            }
            if(topPrediction.label != "Neutral" && !(topPrediction.label in acceptArray)){
              mistakes.current += 1;
              setMessage(<div><div style = {{visibility: 'hidden'}}>{currentPrediction.current}</div>{reject_message}</div>);
              // @ts-ignore
              acc.current = Math.max(0, Math.min(100, 12.5 * seenSet.current.size - 0.5 * mistakes.current));
              console.log("Accuracy", acc);
            }
          });
        }
      };

      const interval = setInterval(classifyFrame, 3000); // Classify every 100ms (you can adjust this timing)

      return () => clearInterval(interval); // Clean up the interval on component unmount
    }
  }, [model]);

  useEffect(() => {
    console.log(seenSet.current.size);
    if(message !== null) {
      if(seenSet.current.size != seenThresh) {
        setIsOpen(true);
      }else{
        success();
      }
      
    }
  }, [message]);

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  return (
    <motion.div initial={{ opacity: 0 }} exit={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
    <div className="slide-container">
      <div className="flex flex-col items-center gap-4 p-10">
      <div className="relative w-full h-full max-w-4xl aspect-video bg-gray-100 rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover transform scale-x-[-1]"
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

    <PopupWindow isOpen = {isOpen} onClose={() => setIsOpen(false)} ttitle="Message" msg={
      <div className="text-center">{message}</div>
    }></PopupWindow>
      </div>
      </motion.div>
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
      <DialogContent className="sm:max-w-xl animate-pop-in data-[state=closed]:animate-pop-out fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500">
        <DialogHeader>
          <DialogTitle className="text-xl text-center">{ttitle}</DialogTitle>
        </DialogHeader>
        <div className="p-4 leading-loose">
          {msg}
        </div>
        <Button 
          className="mt-4 transition-all hover:scale-105 bg-blue-600 p-10" 
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

  const variants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
    exited: { opacity: 0, x: 100}
  };

  return (
    <motion.div initial="hidden" exit="hidden" animate="visible" variants={variants} transition={{ duration: 0.5, ease: "easeOut"}}>
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