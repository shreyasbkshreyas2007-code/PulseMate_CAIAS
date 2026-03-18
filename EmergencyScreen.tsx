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
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-xl border-t border-border/50 max-w-md mx-auto">
      <div className="flex items-center justify-around py-2 px-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = currentScreen === item.id || 
            (item.id === 'emergency' && currentScreen === 'sos')
          return (
            <button
              key={item.id}
              onClick={() => setCurrentScreen(item.id)}
              className={`flex flex-col items-center gap-1 py-2 px-3 rounded-2xl transition-all duration-200 ${
                isActive
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className={`w-5 h-5 ${item.id === 'emergency' && isActive ? 'text-destructive' : ''}`} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
