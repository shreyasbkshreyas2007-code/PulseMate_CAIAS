"use client"

import { useState } from 'react'
import { useApp } from '@/lib/app-context'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  AlertTriangle, 
  Phone, 
  MapPin, 
  Shield,
  Bell,
  Users,
  Activity,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  Smartphone
} from 'lucide-react'

const emergencyContacts = [
  { name: 'Dr. Sarah Johnson', role: 'Primary Doctor', phone: '+1 555-0123', avatar: 'SJ' },
  { name: 'Michael (Son)', role: 'Guardian', phone: '+1 555-0456', avatar: 'M' },
  { name: 'Emergency Services', role: '911', phone: '911', avatar: '911' },
]

const recentAlerts = [
  { type: 'info', message: 'Fall detection test completed', time: '2 hours ago' },
  { type: 'success', message: 'Emergency contacts updated', time: 'Yesterday' },
  { type: 'warning', message: 'Low battery on wearable device', time: '2 days ago' },
]

export function EmergencyScreen() {
  const { setCurrentScreen } = useApp()
  const [fallDetectionEnabled, setFallDetectionEnabled] = useState(true)
  const [locationSharingEnabled, setLocationSharingEnabled] = useState(true)

  const handleSOS = () => {
    setCurrentScreen('sos')
  }

  return (
    <div className="mobile-frame min-h-dvh bg-background pb-24 safe-area-top">
      {/* Header */}
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Emergency</h1>
            <p className="text-muted-foreground text-sm">Safety features & contacts</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-pulse-success/10">
            <Shield className="w-4 h-4 text-pulse-success" />
            <span className="text-pulse-success text-sm font-medium">Protected</span>
          </div>
        </div>
      </div>

      {/* SOS Button */}
      <div className="px-6 mb-6">
        <Card className="p-6 rounded-3xl border-destructive/20 bg-destructive/5">
          <div className="text-center">
            <p className="text-muted-foreground text-sm mb-4">Press and hold for emergency</p>
            <button
              onClick={handleSOS}
              className="w-32 h-32 mx-auto rounded-full bg-destructive flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform animate-pulse-glow"
              style={{ 
                boxShadow: '0 0 40px rgba(239, 68, 68, 0.4), 0 0 80px rgba(239, 68, 68, 0.2)'
              }}
            >
              <div className="text-center">
                <AlertTriangle className="w-12 h-12 text-white mx-auto mb-1" />
                <span className="text-white font-bold text-lg">SOS</span>
              </div>
            </button>
            <p className="text-destructive text-sm font-medium mt-4">
              Alerts will be sent to all emergency contacts
            </p>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="px-6 mb-6">
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-4 rounded-2xl border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-foreground font-semibold text-sm">Call Doctor</p>
                <p className="text-muted-foreground text-xs">Dr. Johnson</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 rounded-2xl border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-foreground font-semibold text-sm">Share Location</p>
                <p className="text-muted-foreground text-xs">With family</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Safety Features */}
      <div className="px-6 mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-3">Safety Features</h2>
        <div className="space-y-2">
          <Card className="p-4 rounded-2xl border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-pulse-warning/10 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-pulse-warning" />
                </div>
                <div>
                  <p className="text-foreground font-medium">Fall Detection</p>
                  <p className="text-muted-foreground text-sm">Automatic alerts on falls</p>
                </div>
              </div>
              <button 
                onClick={() => setFallDetectionEnabled(!fallDetectionEnabled)}
                className={`w-12 h-7 rounded-full flex items-center p-1 transition-colors ${
                  fallDetectionEnabled ? 'bg-primary' : 'bg-muted'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                  fallDetectionEnabled ? 'translate-x-5' : ''
                }`} />
              </button>
            </div>
          </Card>

          <Card className="p-4 rounded-2xl border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-foreground font-medium">Location Sharing</p>
                  <p className="text-muted-foreground text-sm">Share with guardians</p>
                </div>
              </div>
              <button 
                onClick={() => setLocationSharingEnabled(!locationSharingEnabled)}
                className={`w-12 h-7 rounded-full flex items-center p-1 transition-colors ${
                  locationSharingEnabled ? 'bg-primary' : 'bg-muted'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                  locationSharingEnabled ? 'translate-x-5' : ''
                }`} />
              </button>
            </div>
          </Card>

          <Card className="p-4 rounded-2xl border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-foreground font-medium">Wearable Connected</p>
                  <p className="text-pulse-success text-sm">Active monitoring</p>
                </div>
              </div>
              <CheckCircle2 className="w-6 h-6 text-pulse-success" />
            </div>
          </Card>
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="px-6 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-foreground">Emergency Contacts</h2>
          <Button variant="ghost" size="sm" className="text-primary">
            Edit
          </Button>
        </div>
        <div className="space-y-2">
          {emergencyContacts.map((contact, index) => (
            <Card key={index} className="p-4 rounded-2xl border-border">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white ${
                  contact.avatar === '911' ? 'bg-destructive' : 'bg-primary'
                }`}>
                  {contact.avatar}
                </div>
                <div className="flex-1">
                  <p className="text-foreground font-semibold">{contact.name}</p>
                  <p className="text-muted-foreground text-sm">{contact.role}</p>
                </div>
                <Button size="icon" variant="outline" className="rounded-xl">
                  <Phone className="w-5 h-5" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="px-6 mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-3">Recent Activity</h2>
        <div className="space-y-2">
          {recentAlerts.map((alert, index) => (
            <Card key={index} className="p-3 rounded-xl border-border">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  alert.type === 'success' 
                    ? 'bg-pulse-success/10' 
                    : alert.type === 'warning'
                    ? 'bg-pulse-warning/10'
                    : 'bg-primary/10'
                }`}>
                  {alert.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 text-pulse-success" />
                  ) : alert.type === 'warning' ? (
                    <AlertCircle className="w-4 h-4 text-pulse-warning" />
                  ) : (
                    <Bell className="w-4 h-4 text-primary" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-foreground text-sm">{alert.message}</p>
                  <p className="text-muted-foreground text-xs">{alert.time}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
