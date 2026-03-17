"use client"

import { useApp, Screen } from '@/lib/app-context'
import { Home, Pill, Activity, AlertTriangle, User } from 'lucide-react'

const navItems: { id: Screen; label: string; icon: typeof Home }[] = [
  { id: 'dashboard', label: 'Home', icon: Home },
  { id: 'medications', label: 'Meds', icon: Pill },
  { id: 'health', label: 'Health', icon: Activity },
  { id: 'emergency', label: 'SOS', icon: AlertTriangle },
  { id: 'profile', label: 'Profile', icon: User },
]

export function BottomNav() {
  const { currentScreen, setCurrentScreen } = useApp()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border safe-area-bottom">
      <div className="mobile-frame">
        <div className="flex items-center justify-around py-2 px-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = currentScreen === item.id || 
              (item.id === 'emergency' && currentScreen === 'sos') ||
              (item.id === 'medications' && (currentScreen === 'medication-detail' || currentScreen === 'dispenser'))
            const isSOS = item.id === 'emergency'
            
            return (
              <button
                key={item.id}
                onClick={() => setCurrentScreen(item.id)}
                className={`flex flex-col items-center gap-1 py-2 px-4 rounded-2xl transition-all duration-200 ${
                  isSOS 
                    ? 'relative'
                    : isActive 
                    ? 'text-primary' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {isSOS ? (
                  <div className={`w-12 h-12 -mt-6 rounded-full flex items-center justify-center shadow-lg ${
                    isActive ? 'bg-destructive animate-pulse-glow' : 'bg-destructive/90'
                  }`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                ) : (
                  <Icon className={`w-6 h-6 ${isActive ? 'scale-110' : ''} transition-transform`} />
                )}
                <span className={`text-xs font-medium ${isSOS ? 'text-destructive' : ''}`}>
                  {item.label}
                </span>
                {isActive && !isSOS && (
                  <div className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-primary" />
                )}
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
