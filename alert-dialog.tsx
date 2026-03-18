import { useState } from 'react'
import { useApp } from '@/lib/app-context'
import { Button } from '@/components/ui/button'
import { Heart, Bell, Shield, Users, ChevronRight, ChevronLeft } from 'lucide-react'

const onboardingSteps = [
  {
    icon: Heart,
    title: "AI-Powered Health Monitoring",
    description: "PulseMate continuously monitors your health patterns using advanced AI to detect anomalies and keep you safe 24/7.",
    color: "gradient-primary",
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
    color: "bg-destructive",
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

  const step = onboardingSteps[currentStep]
  const Icon = step.icon

  return (
    <div className="min-h-screen flex flex-col p-6">
      {/* Header */}
      <div className="flex justify-end">
        <button
          onClick={() => setCurrentScreen('login')}
          className="text-muted-foreground text-sm font-medium hover:text-foreground transition-colors"
        >
          Skip
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center gap-8 animate-fade-in-up" key={currentStep}>
        {/* Icon */}
        <div className={`w-28 h-28 rounded-[2rem] ${step.color} flex items-center justify-center shadow-lg`}>
          <Icon className="w-14 h-14 text-primary-foreground" />
        </div>

        {/* Text */}
        <div className="text-center space-y-4 px-4">
          <h2 className="text-2xl font-bold text-foreground">{step.title}</h2>
          <p className="text-muted-foreground text-base leading-relaxed">{step.description}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="space-y-6 pb-8">
        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2">
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
        <Button onClick={handleNext} className="w-full h-14 rounded-2xl text-lg font-semibold gradient-primary border-0">
          {currentStep === onboardingSteps.length - 1 ? 'Get Started' : 'Continue'}
          <ChevronRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </div>
  )
}
