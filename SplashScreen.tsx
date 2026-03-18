import { useState } from 'react'
import { useApp } from '@/lib/app-context'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  ArrowLeft, Pill, Clock, Calendar, AlertCircle,
  CheckCircle2, Volume2, Info, FileText, Bell, ChevronDown
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
    <div className="screen-container">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setCurrentScreen('medications')}
          className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
      </div>

      {/* Medication Info */}
      <Card className="p-5 rounded-3xl glass-card">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center">
            <Pill className="w-7 h-7 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Metformin</h1>
            <p className="text-muted-foreground">500mg Tablet</p>
          </div>
        </div>
        <div className="flex gap-3">
          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">Diabetes</span>
          <span className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium">2x daily</span>
        </div>
      </Card>

      {/* Take Medication Button */}
      <Card className="p-5 rounded-3xl glass-card">
        {!showConfirmation ? (
          <Button onClick={handleTakeMedication} className="w-full h-14 rounded-2xl text-lg font-semibold gradient-primary border-0">
            Mark as Taken
          </Button>
        ) : confirmed ? (
          <div className="flex items-center justify-center gap-3 py-3">
            <CheckCircle2 className="w-8 h-8 text-pulse-success" />
            <div>
              <p className="font-semibold text-pulse-success">Medication Taken!</p>
              <p className="text-sm text-muted-foreground">
                Recorded at {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-3 py-3">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-muted-foreground">Confirming...</p>
          </div>
        )}
      </Card>

      {/* Quick Info Cards */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="p-4 rounded-2xl glass-card text-center">
          <Clock className="w-5 h-5 text-primary mx-auto mb-2" />
          <p className="text-xs text-muted-foreground">Next Dose</p>
          <p className="font-semibold text-foreground">8:00 PM</p>
        </Card>
        <Card className="p-4 rounded-2xl glass-card text-center">
          <Calendar className="w-5 h-5 text-accent mx-auto mb-2" />
          <p className="text-xs text-muted-foreground">Refill Due</p>
          <p className="font-semibold text-foreground">Mar 28</p>
        </Card>
      </div>

      {/* Instructions */}
      <Card className="p-5 rounded-3xl glass-card">
        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
          <Info className="w-4 h-4 text-primary" />
          Important Instructions
        </h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5">•</span>
            Take with food to reduce stomach upset
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5">•</span>
            Avoid alcohol while on this medication
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5">•</span>
            Do not skip doses even if feeling well
          </li>
        </ul>
      </Card>

      {/* Reminder Settings */}
      <Card className="p-5 rounded-3xl glass-card">
        <h2 className="font-semibold text-foreground mb-4">Reminder Settings</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Volume2 className="w-5 h-5 text-primary" />
              <span className="text-sm text-foreground">Voice Reminder</span>
            </div>
            <div className="w-10 h-6 rounded-full bg-primary flex items-center justify-end p-0.5">
              <div className="w-5 h-5 rounded-full bg-primary-foreground" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-accent" />
              <span className="text-sm text-foreground">Push Notifications</span>
            </div>
            <div className="w-10 h-6 rounded-full bg-primary flex items-center justify-end p-0.5">
              <div className="w-5 h-5 rounded-full bg-primary-foreground" />
            </div>
          </div>
        </div>
      </Card>

      {/* History */}
      <Card className="p-5 rounded-3xl glass-card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-foreground">History</h2>
          <span className="text-xs text-muted-foreground">This Week</span>
        </div>
        <div className="space-y-4">
          {medicationHistory.map((day, index) => (
            <div key={index}>
              <p className="text-xs font-medium text-muted-foreground mb-2">{day.date}</p>
              {day.doses.map((dose, i) => (
                <div key={i} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    {dose.status === 'taken' ? (
                      <CheckCircle2 className="w-5 h-5 text-pulse-success" />
                    ) : dose.status === 'missed' ? (
                      <AlertCircle className="w-5 h-5 text-destructive" />
                    ) : (
                      <Clock className="w-5 h-5 text-muted-foreground" />
                    )}
                    <div>
                      <p className="text-sm text-foreground">{dose.time}</p>
                      {dose.takenAt && (
                        <p className="text-xs text-muted-foreground">Taken at {dose.takenAt}</p>
                      )}
                    </div>
                  </div>
                  <span className={`text-xs font-medium capitalize ${
                    dose.status === 'taken' ? 'text-pulse-success' :
                    dose.status === 'missed' ? 'text-destructive' : 'text-muted-foreground'
                  }`}>
                    {dose.status}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </Card>

      {/* Prescription Info */}
      <Button variant="outline" className="w-full h-12 rounded-2xl border-border">
        <FileText className="w-4 h-4 mr-2" />
        View Prescription
      </Button>
    </div>
  )
}
