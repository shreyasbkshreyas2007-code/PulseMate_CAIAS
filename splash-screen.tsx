"use client"

import { useState } from 'react'
import { useApp } from '@/lib/app-context'
import { Button } from '@/components/ui/button'
import { Heart, Bell, Shield, Users, ChevronRight, ChevronLeft } from 'lucide-react'

const onboardingSteps = [
  {
    icon: Heart,
    title: "AI-Powered Health Monitoring",
    description: "PulseMate continuously monitors your health patterns using advanced AI to detect anomalies and keep you safe 24/7.",
    color: "bg-primary",
  },
  {
    icon: Bell,
    title: "Smart Medication Reminders",
    description: "Never miss a dose. Our intelligent system tracks your prescriptions and sends timely voice reminders for every medication.",
    color: "bg-accent",
  },
  {
    icon: Shield,
    title: "Emergency Detection System",
    description: "Automatic fall detection and one-tap SOS button ensures help is always just a moment away when you need it most.",
    color: "bg-pulse-danger",
  },
  {
    icon: Users,
    title: "Connected Care Network",
    description: "Keep your loved ones informed. Family members and doctors can monitor your health and stay connected through our guardian panel.",
    color: "bg-pulse-success",
  },
]

export function OnboardingScreen() {
  const { setCurrentScreen } = useApp()
  const [currentStep, setCurrentStep] = useState(0)

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setCurrentScreen('login')
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkip = () => {
    setCurrentScreen('login')
  }

  const step = onboardingSteps[currentStep]
  const Icon = step.icon

  return (
    <div className="mobile-frame flex flex-col min-h-dvh bg-background safe-area-top safe-area-bottom">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-4 pb-2">
        <button 
          onClick={handlePrev}
          className={`p-2 rounded-full transition-opacity ${currentStep === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
          <ChevronLeft className="w-5 h-5 text-muted-foreground" />
        </button>
        <button 
          onClick={handleSkip}
          className="text-muted-foreground text-sm font-medium hover:text-foreground transition-colors"
        >
          Skip
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        {/* Icon */}
        <div className={`w-32 h-32 rounded-[2rem] ${step.color} flex items-center justify-center mb-10 shadow-lg animate-float`}>
          <Icon className="w-16 h-16 text-white" strokeWidth={1.5} />
        </div>

        {/* Text */}
        <div className="text-center max-w-sm">
          <h2 className="text-2xl font-bold text-foreground mb-4 text-balance">
            {step.title}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed text-pretty">
            {step.description}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="px-8 pb-8">
        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {onboardingSteps.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentStep 
                  ? 'w-8 bg-primary' 
                  : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
            />
          ))}
        </div>

        {/* Button */}
        <Button 
          onClick={handleNext}
          className="w-full h-14 text-lg font-semibold rounded-2xl gradient-primary border-0"
        >
          {currentStep === onboardingSteps.length - 1 ? 'Get Started' : 'Continue'}
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  )
}
