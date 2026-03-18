import { useApp } from '@/lib/app-context'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  User, Heart, Pill, Settings, LogOut, ChevronRight,
  Bell, Shield, Phone, MapPin, HelpCircle, FileText
} from 'lucide-react'

const menuItems = [
  { label: 'Health Records', icon: Heart, color: 'text-destructive', bgColor: 'bg-destructive/10' },
  { label: 'Prescriptions', icon: FileText, color: 'text-primary', bgColor: 'bg-primary/10' },
  { label: 'Emergency Contacts', icon: Phone, color: 'text-pulse-warning', bgColor: 'bg-pulse-warning/10' },
  { label: 'Notifications', icon: Bell, color: 'text-accent', bgColor: 'bg-accent/10' },
  { label: 'Privacy & Security', icon: Shield, color: 'text-pulse-success', bgColor: 'bg-pulse-success/10' },
  { label: 'Help & Support', icon: HelpCircle, color: 'text-pulse-teal', bgColor: 'bg-pulse-teal/10' },
]

export function ProfileScreen() {
  const { userName, userRole, setCurrentScreen, setIsLoggedIn } = useApp()

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentScreen('login')
  }

  return (
    <div className="screen-container">
      {/* Profile Header */}
      <Card className="p-6 rounded-3xl glass-card flex flex-col items-center">
        <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mb-4">
          <span className="text-primary-foreground text-2xl font-bold">
            {userName.charAt(0).toUpperCase()}
          </span>
        </div>
        <h1 className="text-xl font-bold text-foreground">{userName}</h1>
        <p className="text-sm text-muted-foreground capitalize">{userRole} Account</p>
        <div className="flex gap-4 mt-4">
          <div className="text-center">
            <p className="text-lg font-bold text-primary">94%</p>
            <p className="text-xs text-muted-foreground">Adherence</p>
          </div>
          <div className="w-px bg-border" />
          <div className="text-center">
            <p className="text-lg font-bold text-pulse-success">Good</p>
            <p className="text-xs text-muted-foreground">Health</p>
          </div>
          <div className="w-px bg-border" />
          <div className="text-center">
            <p className="text-lg font-bold text-foreground">12</p>
            <p className="text-xs text-muted-foreground">Days Active</p>
          </div>
        </div>
      </Card>

      {/* Menu Items */}
      <Card className="rounded-3xl glass-card overflow-hidden">
        {menuItems.map((item, index) => {
          const Icon = item.icon
          return (
            <button
              key={item.label}
              className={`flex items-center justify-between w-full p-4 hover:bg-muted/50 transition-colors ${
                index !== menuItems.length - 1 ? 'border-b border-border/50' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${item.bgColor} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <span className="font-medium text-foreground text-sm">{item.label}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          )
        })}
      </Card>

      {/* Settings */}
      <Card className="p-4 rounded-2xl glass-card">
        <button className="flex items-center gap-3 w-full">
          <Settings className="w-5 h-5 text-muted-foreground" />
          <span className="font-medium text-foreground text-sm">App Settings</span>
        </button>
      </Card>

      {/* Logout */}
      <Button
        onClick={handleLogout}
        variant="outline"
        className="w-full h-12 rounded-2xl border-destructive/30 text-destructive hover:bg-destructive hover:text-primary-foreground"
      >
        <LogOut className="w-4 h-4 mr-2" />
        Sign Out
      </Button>
    </div>
  )
}
