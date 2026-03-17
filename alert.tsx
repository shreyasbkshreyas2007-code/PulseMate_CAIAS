"use client"

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
    <div className="mobile-frame flex flex-col items-center justify-center min-h-dvh gradient-primary relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute bottom-40 right-10 w-48 h-48 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute top-1/3 right-20 w-24 h-24 rounded-full bg-white/5 blur-2xl" />
      
      {/* Logo container */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="relative">
          <div className="w-28 h-28 rounded-3xl bg-white/20 backdrop-blur-xl flex items-center justify-center animate-pulse-glow">
            <Heart className="w-14 h-14 text-white animate-heartbeat" strokeWidth={2.5} />
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white/30 animate-float" />
          <div className="absolute -bottom-1 -left-3 w-4 h-4 rounded-full bg-white/20 animate-float" style={{ animationDelay: '0.5s' }} />
        </div>
        
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white tracking-tight">PulseMate</h1>
          <p className="text-white/80 text-lg mt-2 font-medium">Your AI Health Guardian</p>
        </div>
      </div>
      
      {/* Loading indicator */}
      <div className="absolute bottom-20 flex flex-col items-center gap-4">
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div 
              key={i}
              className="w-2.5 h-2.5 rounded-full bg-white/60 animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
        <p className="text-white/60 text-sm">Initializing care system...</p>
      </div>
    </div>
  )
}
