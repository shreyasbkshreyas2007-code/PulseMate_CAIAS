import { useEffect } from 'react'
import { useApp } from '@/lib/app-context'
import { Heart } from 'lucide-react'

export function SplashScreen() {
  const { setCurrentScreen } = useApp()

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentScreen('onboarding')
    }, 2500)
    return () => clearTimeout(timer)
  }, [setCurrentScreen])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gradient-primary">
      <div className="animate-fade-in-up flex flex-col items-center gap-4">
        <div className="w-20 h-20 rounded-3xl bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center animate-heartbeat">
          <Heart className="w-10 h-10 text-primary-foreground" />
        </div>
        <h1 className="text-4xl font-bold text-primary-foreground tracking-tight">PulseMate</h1>
        <p className="text-primary-foreground/70 text-lg">AI Healthcare Guardian</p>
      </div>
      <div className="absolute bottom-12 flex gap-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-primary-foreground/40"
            style={{ animation: `pulse-ring 1.5s ease-in-out ${i * 0.3}s infinite` }}
          />
        ))}
      </div>
    </div>
  )
}
