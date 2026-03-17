"use client"

import { useApp } from '@/lib/app-context'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  User, 
  Settings, 
  Bell, 
  Shield, 
  HelpCircle, 
  LogOut, 
  ChevronRight,
  Heart,
  Pill,
  FileText,
  Users,
  Phone
} from 'lucide-react'

const menuItems = [
  { icon: User, label: 'Personal Information', description: 'Manage your profile details' },
  { icon: Bell, label: 'Notifications', description: 'Customize alert preferences' },
  { icon: Pill, label: 'Medication Settings', description: 'Manage reminders & schedules' },
  { icon: Users, label: 'Emergency Contacts', description: 'Add guardians & doctors' },
  { icon: FileText, label: 'Medical Records', description: 'View health documents' },
  { icon: Shield, label: 'Privacy & Security', description: 'Manage your data' },
  { icon: HelpCircle, label: 'Help & Support', description: 'Get assistance' },
]

export function ProfileScreen() {
  const { userName, setCurrentScreen, setIsLoggedIn, userRole } = useApp()

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentScreen('login')
  }

  return (
    <div className="mobile-frame min-h-dvh bg-background pb-24 safe-area-top">
      {/* Header */}
      <div className="px-6 pt-6 pb-4">
        <h1 className="text-2xl font-bold text-foreground">Profile</h1>
      </div>

      {/* Profile Card */}
      <div className="px-6 mb-6">
        <Card className="p-5 rounded-3xl border-border">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-foreground">{userName}</h2>
              <p className="text-muted-foreground text-sm capitalize">{userRole} Account</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-pulse-success/10">
                  <Heart className="w-3 h-3 text-pulse-success" />
                  <span className="text-pulse-success text-xs font-medium">Active</span>
                </div>
              </div>
            </div>
            <button className="p-2 rounded-xl bg-muted hover:bg-muted/80 transition-colors">
              <Settings className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="px-6 mb-6">
        <div className="grid grid-cols-3 gap-3">
          <Card className="p-4 rounded-2xl border-border text-center">
            <p className="text-2xl font-bold text-primary">156</p>
            <p className="text-muted-foreground text-xs mt-1">Days Active</p>
          </Card>
          <Card className="p-4 rounded-2xl border-border text-center">
            <p className="text-2xl font-bold text-pulse-success">94%</p>
            <p className="text-muted-foreground text-xs mt-1">Compliance</p>
          </Card>
          <Card className="p-4 rounded-2xl border-border text-center">
            <p className="text-2xl font-bold text-accent">3</p>
            <p className="text-muted-foreground text-xs mt-1">Guardians</p>
          </Card>
        </div>
      </div>

      {/* Emergency Contact Quick Action */}
      <div className="px-6 mb-6">
        <Card className="p-4 rounded-2xl border-border bg-destructive/5 border-destructive/20">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
              <Phone className="w-6 h-6 text-destructive" />
            </div>
            <div className="flex-1">
              <p className="text-foreground font-semibold">Emergency Contact</p>
              <p className="text-muted-foreground text-sm">Dr. Sarah Johnson</p>
            </div>
            <Button size="sm" variant="destructive" className="rounded-xl">
              Call
            </Button>
          </div>
        </Card>
      </div>

      {/* Menu Items */}
      <div className="px-6 mb-6">
        <div className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon
            return (
              <button
                key={index}
                className="w-full flex items-center gap-4 p-4 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                  <Icon className="w-5 h-5 text-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-foreground font-medium">{item.label}</p>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            )
          })}
        </div>
      </div>

      {/* Logout Button */}
      <div className="px-6 mb-6">
        <Button 
          variant="outline" 
          className="w-full h-14 rounded-2xl text-destructive border-destructive/30 hover:bg-destructive/10"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5 mr-2" />
          Sign Out
        </Button>
      </div>

      {/* App Version */}
      <div className="px-6 pb-6 text-center">
        <p className="text-muted-foreground text-xs">PulseMate v1.0.0</p>
      </div>
    </div>
  )
}
