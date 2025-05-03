import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OnboardingPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const handleContinue = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Marcar onboarding como completado
      localStorage.setItem('onboardingCompleted', 'true');
      navigate('/'); // Redirigir a la página principal
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
        <ul className="space-y-3 text-left">
          <li className="flex items-center">
            <span className="mr-2">✓</span> Scan with your wristband QR and log in without passwords
          </li>
          <li className="flex items-center">
            <span className="mr-2">✓</span> Create your team and add your friends
          </li>
          <li className="flex items-center">
            <span className="mr-2">✓</span> Register your project and let the AI suggest the best title for you
          </li>
          <li className="flex items-center">
            <span className="mr-2">✓</span> Meet people by completing challenges (who else uses React?)
          </li>
          <li className="flex items-center">
            <span className="mr-2">✓</span> Customise your profile with an avatar
          </li>
          <li className="flex items-center">
            <span className="mr-2">✓</span> Climb the leaderboard and win prizes!
          </li>
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
      {/* Header */}
      <header className="p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">HackConnect</h1>
          <button
            onClick={() => {
              localStorage.setItem('onboardingCompleted', 'true');
              navigate('/');
            }}
            className="text-sm opacity-70 hover:opacity-100"
          >
            Skip
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md mx-auto">
          {/* Indicator */}
          <div className="flex justify-center space-x-2 mb-8">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full ${currentStep === index ? 'bg-white w-6' : 'bg-white bg-opacity-30'}`}
              />
            ))}
          </div>

          {/* Content */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{steps[currentStep].title}</h2>
            <div className="text-lg mb-6">
              {steps[currentStep].content}
            </div>

            {/* Image Placeholder (reemplazar con tus imágenes reales) */}
            <div className="bg-white bg-opacity-10 rounded-xl p-8 mb-6 flex items-center justify-center">
              <span className="text-4xl">
                {steps[currentStep].image === "welcome" && "👋"}
                {steps[currentStep].image === "network" && "🌐"}
                {steps[currentStep].image === "features" && "✨"}
                {steps[currentStep].image === "cta" && "📱"}
              </span>
            </div>
          </div>

          {/* Button */}
          <button
            onClick={handleContinue}
            className="bg-white text-blue-900 font-bold py-3 px-8 rounded-full hover:bg-opacity-90 transition-all"
          >
            {currentStep === steps.length - 1 ? "Let's Hack!" : "Continue"}
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-sm opacity-70">
        HackConnect © {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default OnboardingPage;
