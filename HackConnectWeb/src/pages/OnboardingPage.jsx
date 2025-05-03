import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OnboardingPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const handleContinue = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      localStorage.setItem('onboardingCompleted', 'true');
      window.location.href = '/';
    }
  };

  const steps = [
    {
      title: "👋 Welcome to HackConnect",
      content: "Your hacker break, your social hackathon network.",
      image: "welcome"
    },
    {
      title: "Programming non-stop, take a break!",
      content: "Connect with other participants, build your team, share your project... and have fun while you climb the rankings!",
      image: "network"
    },
    {
      title: "What can you do?",
      content: (
        <ul className="space-y-4 text-left px-2">
          {[
            "Scan with your wristband QR and log in without passwords",
            "Create your team and add your friends",
            "Register your project and let the AI suggest the best title for you",
            "Meet people by completing challenges (who else uses React?)",
            "Customise your profile with an avatar",
            "Climb the leaderboard and win prizes!"
          ].map((feature, index) => (
            <li key={index} className="flex items-start">
              <span className="mr-3 mt-0.5 text-blue-300">✓</span>
              <span className="flex-1">{feature}</span>
            </li>
          ))}
        </ul>
      ),
      image: "features"
    },
    {
      title: "🕹 Try it now!",
      content: "Scan the QR and start playing the Hackathon Social Game",
      image: "cta"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 text-white flex flex-col">
      {/* Header Fijo */}
      <header className="p-4 bg-gradient-to-b from-blue-900 to-blue-800 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">HackConnect</h1>
          <button
            onClick={() => {
              localStorage.setItem('onboardingCompleted', 'true');
              window.location.href = '/';
            }}
            className="text-sm opacity-80 hover:opacity-100 transition-opacity"
          >
            Skip
          </button>
        </div>

        {/* Step Counter Fijo */}
        <div className="flex justify-center space-x-2 mt-3">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentStep === index ? 'bg-white w-6' : 'bg-white bg-opacity-30 w-2'
              }`}
            />
          ))}
        </div>
      </header>

      {/* Contenido Scrollable */}
      <main className="flex-1 overflow-y-auto py-4 px-6">
        <div className="max-w-md mx-auto flex flex-col items-center">
          {/* Título */}
          <h2 className="text-2xl font-bold mb-6 text-center">
            {steps[currentStep].title}
          </h2>

          {/* Contenido Principal */}
          <div className="w-full mb-6">
            {typeof steps[currentStep].content === 'string' ? (
              <p className="text-lg text-center">{steps[currentStep].content}</p>
            ) : (
              steps[currentStep].content
            )}
          </div>

          {/* Imagen/Ilustración */}
          <div className="bg-white bg-opacity-10 rounded-xl p-8 w-full flex items-center justify-center mb-6">
            <span className="text-5xl">
              {steps[currentStep].image === "welcome" && "👋"}
              {steps[currentStep].image === "network" && "🌐"}
              {steps[currentStep].image === "features" && "✨"}
              {steps[currentStep].image === "cta" && "📱"}
            </span>
          </div>
        </div>
      </main>

      {/* Botón Fijo en la parte inferior */}
      <div className="sticky bottom-0 bg-gradient-to-t from-purple-900 to-purple-800 pt-4 pb-6 px-6">
        <button
          onClick={handleContinue}
          className="w-full max-w-md mx-auto bg-white text-blue-900 font-bold py-3 px-8 rounded-full hover:bg-opacity-90 transition-all block shadow-lg"
        >
          {currentStep === steps.length - 1 ? "Let's Hack!" : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default OnboardingPage;
