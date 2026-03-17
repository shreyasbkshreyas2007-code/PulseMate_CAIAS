"use client"

import { useState } from 'react'
import { useApp } from '@/lib/app-context'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  ArrowLeft, 
  Pill, 
  Clock, 
  Calendar, 
  AlertCircle, 
  CheckCircle2,
  Volume2,
  Info,
  FileText,
  Bell,
  ChevronDown
} from 'lucide-react'

const medicationHistory = [
  { date: 'Today', doses: [
    { time: '8:00 AM', status: 'taken', takenAt: '8:05 AM' },
    { time: '8:00 PM', status: 'upcoming', takenAt: null },
  ]},
  { date: 'Yesterday', doses: [
    { time: '8:00 AM', status: 'taken', takenAt: '8:12 AM' },
    { time: '8:00 PM', status: 'taken', takenAt: '8:00 PM' },
  ]},
  { date: 'Mar 15', doses: [
    { time: '8:00 AM', status: 'taken', takenAt: '7:55 AM' },
    { time: '8:00 PM', status: 'missed', takenAt: null },
  ]},
]

export function MedicationDetailScreen() {
  const { setCurrentScreen } = useApp()
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [confirmed, setConfirmed] = useState(false)

  const handleTakeMedication = () => {
    setShowConfirmation(true)
    setTimeout(() => {
      setConfirmed(true)
    }, 1000)
  }

  return (
    <div className="mobile-frame min-h-dvh bg-background pb-24 safe-area-top">
      {/* Header */}
      <div className="px-6 pt-4 pb-2">
        <button 
          onClick={() => setCurrentScreen('medications')}
          className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
      </div>

      {/* Medication Info */}
      <div className="px-6 pb-4">
        <div className="flex items-start gap-4">
          <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center">
            <Pill className="w-10 h-10 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground">Metformin</h1>
            <p className="text-muted-foreground">500mg Tablet</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                Diabetes
              </span>
              <span className="px-2 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium">
                2x daily
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Take Medication Button */}
      <div className="px-6 mb-6">
        {!showConfirmation ? (
          <Button 
            className="w-full h-16 text-lg font-semibold rounded-2xl gradient-primary border-0"
            onClick={handleTakeMedication}
          >
            <CheckCircle2 className="w-6 h-6 mr-2" />
            Mark as Taken
          </Button>
        ) : confirmed ? (
          <Card className="p-4 rounded-2xl border-pulse-success bg-pulse-success/10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-pulse-success flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-foreground font-semibold">Medication Taken!</p>
                <p className="text-muted-foreground text-sm">Recorded at {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
              </div>
            </div>
          </Card>
        ) : (
          <Card className="p-4 rounded-2xl border-border">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center animate-pulse">
                <Pill className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-foreground font-semibold">Confirming...</p>
                <p className="text-muted-foreground text-sm">Recording your dose</p>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Quick Info Cards */}
      <div className="px-6 mb-6">
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-4 rounded-2xl border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Next Dose</p>
                <p className="text-foreground font-semibold">8:00 PM</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 rounded-2xl border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Refill Due</p>
                <p className="text-foreground font-semibold">Mar 28</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Instructions */}
      <div className="px-6 mb-6">
        <Card className="p-4 rounded-2xl border-border">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-pulse-warning/10 flex items-center justify-center shrink-0">
              <AlertCircle className="w-5 h-5 text-pulse-warning" />
            </div>
            <div>
              <p className="text-foreground font-semibold">Important Instructions</p>
              <ul className="text-muted-foreground text-sm mt-2 space-y-1">
                <li>- Take with food to reduce stomach upset</li>
                <li>- Avoid alcohol while on this medication</li>
                <li>- Do not skip doses even if feeling well</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>

      {/* Reminder Settings */}
      <div className="px-6 mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-3">Reminder Settings</h2>
        <div className="space-y-2">
          <Card className="p-4 rounded-2xl border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Volume2 className="w-5 h-5 text-primary" />
                <span className="text-foreground">Voice Reminder</span>
              </div>
              <div className="w-12 h-7 rounded-full bg-primary flex items-center p-1">
                <div className="w-5 h-5 rounded-full bg-white ml-auto shadow-sm" />
              </div>
            </div>
          </Card>
          <Card className="p-4 rounded-2xl border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-primary" />
                <span className="text-foreground">Push Notifications</span>
              </div>
              <div className="w-12 h-7 rounded-full bg-primary flex items-center p-1">
                <div className="w-5 h-5 rounded-full bg-white ml-auto shadow-sm" />
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* History */}
      <div className="px-6 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-foreground">History</h2>
          <button className="flex items-center gap-1 text-primary text-sm font-medium">
            This Week
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-4">
          {medicationHistory.map((day, index) => (
            <div key={index}>
              <p className="text-muted-foreground text-sm mb-2">{day.date}</p>
              <div className="space-y-2">
                {day.doses.map((dose, i) => (
                  <Card key={i} className="p-3 rounded-xl border-border">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          dose.status === 'taken' 
                            ? 'bg-pulse-success/10' 
                            : dose.status === 'missed'
                            ? 'bg-destructive/10'
                            : 'bg-muted'
                        }`}>
                          {dose.status === 'taken' ? (
                            <CheckCircle2 className="w-4 h-4 text-pulse-success" />
                          ) : dose.status === 'missed' ? (
                            <AlertCircle className="w-4 h-4 text-destructive" />
                          ) : (
                            <Clock className="w-4 h-4 text-muted-foreground" />
                          )}
                        </div>
                        <div>
                          <p className="text-foreground text-sm font-medium">{dose.time}</p>
                          {dose.takenAt && (
                            <p className="text-muted-foreground text-xs">Taken at {dose.takenAt}</p>
                          )}
                        </div>
                      </div>
                      <span className={`text-xs font-medium capitalize ${
                        dose.status === 'taken' 
                          ? 'text-pulse-success' 
                          : dose.status === 'missed'
                          ? 'text-destructive'
                          : 'text-muted-foreground'
                      }`}>
                        {dose.status}
                      </span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prescription Info */}
      <div className="px-6 mb-6">
        <Button 
          variant="outline" 
          className="w-full h-12 rounded-2xl"
        >
          <FileText className="w-5 h-5 mr-2" />
          View Prescription
        </Button>
      </div>
    </div>
  )
}
