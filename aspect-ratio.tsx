import { useState, useEffect } from 'react'
import { useApp } from '@/lib/app-context'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { AlertTriangle, Phone, MapPin, X, CheckCircle2 } from 'lucide-react'

export function SOSScreen() {
  const { setCurrentScreen } = useApp()
  const [countdown, setCountdown] = useState(5)
  const [alertSent, setAlertSent] = useState(false)

  useEffect(() => {
    if (countdown > 0 && !alertSent) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else if (countdown === 0 && !alertSent) {
      setAlertSent(true)
    }
  }, [countdown, alertSent])

  const handleCancel = () => {
    setCurrentScreen('emergency')
  }

  return (
    <div className="min-h-screen bg-destructive/5 flex flex-col items-center justify-center p-6 max-w-md mx-auto">
      {!alertSent ? (
        <div className="text-center space-y-8 animate-fade-in-up">
          {/* Pulsing SOS */}
          <div className="relative">
            <div className="w-40 h-40 rounded-full bg-destructive/20 flex items-center justify-center pulse-animate">
              <div className="w-28 h-28 rounded-full bg-destructive/40 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-destructive flex items-center justify-center">
                  <AlertTriangle className="w-10 h-10 text-primary-foreground" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-bold text-destructive mb-2">Emergency Alert</h1>
            <p className="text-muted-foreground">
              Sending alert in <span className="text-destructive font-bold text-2xl">{countdown}</span> seconds
            </p>
          </div>

          <p className="text-sm text-muted-foreground">
            Emergency contacts will be notified with your location
          </p>

          <Button
            onClick={handleCancel}
            variant="outline"
            className="w-full h-14 rounded-2xl text-lg border-destructive text-destructive hover:bg-destructive hover:text-primary-foreground"
          >
            <X className="w-5 h-5 mr-2" />
            Cancel Alert
          </Button>
        </div>
      ) : (
        <div className="text-center space-y-6 animate-fade-in-up">
          <div className="w-24 h-24 rounded-full bg-destructive flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-12 h-12 text-primary-foreground" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-destructive mb-2">Alert Sent!</h1>
            <p className="text-muted-foreground">Your emergency contacts have been notified</p>
          </div>

          <div className="space-y-3 w-full">
            <Card className="p-4 rounded-2xl glass-card">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <div className="text-left">
                  <p className="font-medium text-foreground text-sm">Dr. Sarah Johnson notified</p>
                  <p className="text-xs text-muted-foreground">Primary Doctor</p>
                </div>
              </div>
            </Card>
            <Card className="p-4 rounded-2xl glass-card">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <div className="text-left">
                  <p className="font-medium text-foreground text-sm">Michael (Son) notified</p>
                  <p className="text-xs text-muted-foreground">Guardian</p>
                </div>
              </div>
            </Card>
            <Card className="p-4 rounded-2xl glass-card">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-accent" />
                <div className="text-left">
                  <p className="font-medium text-foreground text-sm">Location shared</p>
                  <p className="text-xs text-muted-foreground">123 Maple Street, Apt 4B</p>
                </div>
              </div>
            </Card>
          </div>

          <Button
            onClick={handleCancel}
            className="w-full h-14 rounded-2xl text-lg gradient-primary border-0"
          >
            Return to Safety
          </Button>
        </div>
      )}
    </div>
  )
}
