"use client"

import { useState, useEffect } from 'react'
import { useApp } from '@/lib/app-context'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  AlertTriangle, 
  Phone, 
  MapPin, 
  X,
  CheckCircle2,
  Clock,
  Users,
  Navigation,
  Volume2
} from 'lucide-react'

const emergencyContacts = [
  { name: 'Dr. Sarah Johnson', role: 'Doctor', status: 'notified', avatar: 'SJ' },
  { name: 'Michael (Son)', role: 'Guardian', status: 'notified', avatar: 'M' },
  { name: '911 Services', role: 'Emergency', status: 'on-standby', avatar: '911' },
]

export function SOSScreen() {
  const { setCurrentScreen } = useApp()
  const [countdown, setCountdown] = useState(10)
  const [alertSent, setAlertSent] = useState(false)
  const [helpOnWay, setHelpOnWay] = useState(false)

  useEffect(() => {
    if (countdown > 0 && !alertSent) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else if (countdown === 0 && !alertSent) {
      setAlertSent(true)
      setTimeout(() => setHelpOnWay(true), 3000)
    }
  }, [countdown, alertSent])

  const handleCancel = () => {
    setCurrentScreen('emergency')
  }

  const handleConfirmSafe = () => {
    setCurrentScreen('dashboard')
  }

  return (
    <div className="mobile-frame min-h-dvh bg-destructive/5 safe-area-top safe-area-bottom">
      {/* Pulsing background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-destructive/10 animate-pulse" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-destructive/20 blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 flex flex-col min-h-dvh px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          {!alertSent ? (
            <>
              <div className="w-24 h-24 mx-auto rounded-full bg-destructive flex items-center justify-center mb-4 animate-pulse">
                <AlertTriangle className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-destructive mb-2">Emergency Alert</h1>
              <p className="text-foreground">
                Sending alert in <span className="font-bold text-destructive">{countdown}</span> seconds
              </p>
            </>
          ) : helpOnWay ? (
            <>
              <div className="w-24 h-24 mx-auto rounded-full bg-pulse-success flex items-center justify-center mb-4">
                <CheckCircle2 className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-pulse-success mb-2">Help is On the Way</h1>
              <p className="text-foreground">Stay calm. Your contacts have been notified.</p>
            </>
          ) : (
            <>
              <div className="w-24 h-24 mx-auto rounded-full bg-pulse-warning flex items-center justify-center mb-4 animate-pulse">
                <Phone className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-pulse-warning mb-2">Alerting Contacts</h1>
              <p className="text-foreground">Sending emergency notifications...</p>
            </>
          )}
        </div>

        {/* Cancel Button (only during countdown) */}
        {!alertSent && (
          <Button 
            variant="outline" 
            className="mx-auto mb-8 h-14 px-8 rounded-2xl border-destructive text-destructive hover:bg-destructive/10"
            onClick={handleCancel}
          >
            <X className="w-5 h-5 mr-2" />
            Cancel Alert ({countdown}s)
          </Button>
        )}

        {/* Location Card */}
        <Card className="p-4 rounded-2xl border-border bg-card mb-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-foreground font-semibold">Your Location</p>
              <p className="text-muted-foreground text-sm">123 Maple Street, Apartment 4B</p>
              <p className="text-primary text-sm font-medium">Sharing live location</p>
            </div>
            <Navigation className="w-6 h-6 text-primary animate-pulse" />
          </div>
        </Card>

        {/* Contacts Status */}
        <Card className="p-4 rounded-2xl border-border bg-card mb-4">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-foreground" />
            <p className="text-foreground font-semibold">Contact Status</p>
          </div>
          <div className="space-y-3">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white ${
                  contact.avatar === '911' ? 'bg-destructive' : 'bg-primary'
                }`}>
                  {contact.avatar}
                </div>
                <div className="flex-1">
                  <p className="text-foreground font-medium text-sm">{contact.name}</p>
                  <p className="text-muted-foreground text-xs">{contact.role}</p>
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                  alertSent
                    ? contact.status === 'notified'
                      ? 'bg-pulse-success/10 text-pulse-success'
                      : 'bg-pulse-warning/10 text-pulse-warning'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {alertSent ? (
                    <>
                      <CheckCircle2 className="w-3 h-3" />
                      {contact.status === 'notified' ? 'Notified' : 'On Standby'}
                    </>
                  ) : (
                    <>
                      <Clock className="w-3 h-3" />
                      Pending
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Voice Alert Status */}
        {alertSent && (
          <Card className="p-4 rounded-2xl border-border bg-primary/5 border-primary/20 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center animate-pulse">
                <Volume2 className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-foreground font-semibold text-sm">Voice Alert Active</p>
                <p className="text-muted-foreground text-xs">
                  &quot;Emergency services and your contacts have been notified. Help is on the way.&quot;
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Action Buttons */}
        <div className="space-y-3">
          {alertSent ? (
            <>
              <Button 
                className="w-full h-14 text-lg font-semibold rounded-2xl bg-destructive hover:bg-destructive/90"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call 911 Now
              </Button>
              <Button 
                variant="outline"
                className="w-full h-14 text-lg font-semibold rounded-2xl"
                onClick={handleConfirmSafe}
              >
                <CheckCircle2 className="w-5 h-5 mr-2" />
                I&apos;m Safe - Cancel Alert
              </Button>
            </>
          ) : (
            <Button 
              variant="outline"
              className="w-full h-14 text-lg font-semibold rounded-2xl border-destructive text-destructive hover:bg-destructive/10"
              onClick={handleCancel}
            >
              <X className="w-5 h-5 mr-2" />
              Cancel Emergency
            </Button>
          )}
        </div>

        {/* Emergency Tip */}
        <p className="text-center text-muted-foreground text-sm mt-6">
          If you can, stay on the line with emergency services and describe your situation.
        </p>
      </div>
    </div>
  )
}
