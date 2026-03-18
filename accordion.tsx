import { useState } from 'react'
import { useApp } from '@/lib/app-context'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
  Pill, Clock, CheckCircle2, XCircle, ChevronRight,
  Calendar, Plus, Volume2, Bell, AlertCircle
} from 'lucide-react'

const medications = [
  { id: 1, name: 'Metformin', dosage: '500mg', frequency: '2x daily', times: ['8:00 AM', '8:00 PM'], color: 'bg-primary', takenToday: 1, totalToday: 2, nextDose: '8:00 PM', instructions: 'Take with food', status: 'due' },
  { id: 2, name: 'Lisinopril', dosage: '10mg', frequency: '1x daily', times: ['12:00 PM'], color: 'bg-accent', takenToday: 0, totalToday: 1, nextDose: '12:00 PM', instructions: 'Take on empty stomach', status: 'upcoming' },
  { id: 3, name: 'Aspirin', dosage: '81mg', frequency: '1x daily', times: ['8:00 PM'], color: 'bg-pulse-warning', takenToday: 0, totalToday: 1, nextDose: '8:00 PM', instructions: 'Take with water', status: 'upcoming' },
  { id: 4, name: 'Vitamin D', dosage: '1000 IU', frequency: '1x daily', times: ['9:00 AM'], color: 'bg-pulse-success', takenToday: 1, totalToday: 1, nextDose: null, instructions: 'Take with breakfast', status: 'completed' },
]

const timelineSlots = [
  { time: '8:00 AM', meds: ['Metformin'], status: 'taken' },
  { time: '9:00 AM', meds: ['Vitamin D'], status: 'taken' },
  { time: '12:00 PM', meds: ['Lisinopril'], status: 'upcoming' },
  { time: '8:00 PM', meds: ['Metformin', 'Aspirin'], status: 'upcoming' },
]

export function MedicationsScreen() {
  const { setCurrentScreen } = useApp()
  const [activeTab, setActiveTab] = useState<'schedule' | 'medications'>('schedule')

  const totalDoses = medications.reduce((acc, med) => acc + med.totalToday, 0)
  const takenDoses = medications.reduce((acc, med) => acc + med.takenToday, 0)
  const complianceRate = Math.round((takenDoses / totalDoses) * 100)

  return (
    <div className="screen-container">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Medications</h1>
        <p className="text-sm text-muted-foreground">Manage your daily doses</p>
      </div>

      {/* Today's Progress */}
      <Card className="p-5 rounded-3xl glass-card">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm text-muted-foreground">Today's Progress</p>
            <p className="text-sm font-medium text-foreground">{takenDoses} of {totalDoses} doses</p>
          </div>
          <span className="text-3xl font-bold text-primary">{complianceRate}%</span>
        </div>
        <Progress value={complianceRate} className="h-2 rounded-full" />
        <div className="flex gap-3 mt-4">
          <button
            onClick={() => setCurrentScreen('dispenser')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 text-primary text-sm font-medium"
          >
            <Volume2 className="w-4 h-4" />
            Voice Reminder
          </button>
          <button
            onClick={() => setCurrentScreen('dispenser')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent/10 text-accent text-sm font-medium"
          >
            <Pill className="w-4 h-4" />
            Dispenser
          </button>
        </div>
      </Card>

      {/* Tabs */}
      <div className="flex bg-muted rounded-2xl p-1">
        <button
          onClick={() => setActiveTab('schedule')}
          className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
            activeTab === 'schedule' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'
          }`}
        >
          Today's Schedule
        </button>
        <button
          onClick={() => setActiveTab('medications')}
          className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
            activeTab === 'medications' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'
          }`}
        >
          All Medications
        </button>
      </div>

      {activeTab === 'schedule' ? (
        /* Timeline View */
        <div className="relative pl-8">
          {/* Timeline line */}
          <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-border" />

          {timelineSlots.map((slot, index) => (
            <div key={index} className="relative mb-6 last:mb-0">
              {/* Timeline dot */}
              <div className="absolute -left-8 top-3">
                {slot.status === 'taken' ? (
                  <CheckCircle2 className="w-7 h-7 text-pulse-success bg-background rounded-full" />
                ) : (
                  <Clock className="w-7 h-7 text-primary bg-background rounded-full" />
                )}
              </div>

              {/* Card */}
              <Card className="p-4 rounded-2xl glass-card">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-foreground">{slot.time}</span>
                  {slot.status === 'taken' && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-pulse-success/10 text-pulse-success font-medium">Completed</span>
                  )}
                  {slot.status === 'upcoming' && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">Upcoming</span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {slot.meds.map((med, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentScreen('medication-detail')}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        slot.status === 'taken'
                          ? 'bg-muted text-muted-foreground'
                          : 'bg-primary/10 text-primary hover:bg-primary/20'
                      }`}
                    >
                      {med}
                    </button>
                  ))}
                </div>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        /* Medications List */
        <div className="space-y-3">
          {medications.map((med) => (
            <Card
              key={med.id}
              className="p-4 rounded-2xl glass-card cursor-pointer hover:border-primary/30 transition-colors"
              onClick={() => setCurrentScreen('medication-detail')}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${med.color} flex items-center justify-center`}>
                    <Pill className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-foreground">{med.name}</p>
                      {med.status === 'completed' && <CheckCircle2 className="w-4 h-4 text-pulse-success" />}
                    </div>
                    <p className="text-xs text-muted-foreground">{med.dosage} - {med.frequency}</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-muted-foreground">{med.takenToday}/{med.totalToday}</span>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Reminder Alert */}
      <Card className="p-4 rounded-2xl border-primary/20 bg-primary/5">
        <div className="flex items-center gap-2 mb-1">
          <Bell className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold text-primary">Next Reminder</span>
        </div>
        <p className="text-sm text-foreground">Lisinopril 10mg at 12:00 PM - Voice reminder enabled</p>
      </Card>
    </div>
  )
}
