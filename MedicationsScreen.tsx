import { useState } from 'react'
import { useApp } from '@/lib/app-context'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  AlertTriangle, Phone, MapPin, Shield, Bell,
  Users, Activity, ChevronRight, AlertCircle, CheckCircle2, Smartphone
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

  return (
    <div className="screen-container">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Emergency</h1>
          <p className="text-sm text-muted-foreground">Safety features & contacts</p>
        </div>
        <span className="px-3 py-1 rounded-full bg-pulse-success/10 text-pulse-success text-xs font-semibold flex items-center gap-1">
          <Shield className="w-3 h-3" />
          Protected
        </span>
      </div>

      {/* SOS Button */}
      <Card className="p-6 rounded-3xl glass-card flex flex-col items-center">
        <p className="text-sm text-muted-foreground mb-4">Press and hold for emergency</p>
        <button
          onClick={() => setCurrentScreen('sos')}
          className="w-28 h-28 rounded-full bg-destructive flex items-center justify-center text-primary-foreground text-2xl font-bold shadow-lg shadow-destructive/30 hover:scale-105 active:scale-95 transition-transform"
        >
          SOS
        </button>
        <p className="text-xs text-muted-foreground mt-4">Alerts will be sent to all emergency contacts</p>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="p-4 rounded-2xl glass-card cursor-pointer hover:border-primary/30 transition-colors">
          <Phone className="w-6 h-6 text-primary mb-2" />
          <p className="font-medium text-foreground text-sm">Call Doctor</p>
          <p className="text-xs text-muted-foreground">Dr. Johnson</p>
        </Card>
        <Card className="p-4 rounded-2xl glass-card cursor-pointer hover:border-primary/30 transition-colors">
          <MapPin className="w-6 h-6 text-accent mb-2" />
          <p className="font-medium text-foreground text-sm">Share Location</p>
          <p className="text-xs text-muted-foreground">With family</p>
        </Card>
      </div>

      {/* Safety Features */}
      <Card className="p-5 rounded-3xl glass-card">
        <h2 className="font-semibold text-foreground mb-4">Safety Features</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground text-sm">Fall Detection</p>
              <p className="text-xs text-muted-foreground">Automatic alerts on falls</p>
            </div>
            <button
              onClick={() => setFallDetectionEnabled(!fallDetectionEnabled)}
              className={`w-12 h-7 rounded-full flex items-center p-1 transition-colors ${
                fallDetectionEnabled ? 'bg-primary justify-end' : 'bg-muted justify-start'
              }`}
            >
              <div className="w-5 h-5 rounded-full bg-primary-foreground shadow-sm" />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground text-sm">Location Sharing</p>
              <p className="text-xs text-muted-foreground">Share with guardians</p>
            </div>
            <button
              onClick={() => setLocationSharingEnabled(!locationSharingEnabled)}
              className={`w-12 h-7 rounded-full flex items-center p-1 transition-colors ${
                locationSharingEnabled ? 'bg-primary justify-end' : 'bg-muted justify-start'
              }`}
            >
              <div className="w-5 h-5 rounded-full bg-primary-foreground shadow-sm" />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground text-sm">Wearable Connected</p>
              <p className="text-xs text-muted-foreground">Active monitoring</p>
            </div>
            <Smartphone className="w-5 h-5 text-pulse-success" />
          </div>
        </div>
      </Card>

      {/* Emergency Contacts */}
      <Card className="p-5 rounded-3xl glass-card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-foreground">Emergency Contacts</h2>
          <button className="text-sm text-primary font-medium">Edit</button>
        </div>
        <div className="space-y-3">
          {emergencyContacts.map((contact, index) => (
            <div key={index} className="flex items-center gap-3 p-3 rounded-2xl bg-muted/50">
              <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
                {contact.avatar}
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground text-sm">{contact.name}</p>
                <p className="text-xs text-muted-foreground">{contact.role}</p>
              </div>
              <Phone className="w-4 h-4 text-primary" />
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Alerts */}
      <Card className="p-5 rounded-3xl glass-card">
        <h2 className="font-semibold text-foreground mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {recentAlerts.map((alert, index) => (
            <div key={index} className="flex items-start gap-3">
              {alert.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-pulse-success mt-0.5" />
              ) : alert.type === 'warning' ? (
                <AlertCircle className="w-5 h-5 text-pulse-warning mt-0.5" />
              ) : (
                <Bell className="w-5 h-5 text-primary mt-0.5" />
              )}
              <div className="flex-1">
                <p className="text-sm text-foreground">{alert.message}</p>
                <p className="text-xs text-muted-foreground">{alert.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
