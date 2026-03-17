"use client"

import { useState } from 'react'
import { useApp } from '@/lib/app-context'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
  Pill, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  Calendar,
  Plus,
  Volume2,
  Bell,
  AlertCircle
} from 'lucide-react'

const medications = [
  { 
    id: 1,
    name: 'Metformin', 
    dosage: '500mg', 
    frequency: '2x daily',
    times: ['8:00 AM', '8:00 PM'],
    color: 'bg-primary',
    takenToday: 1,
    totalToday: 2,
    nextDose: '8:00 PM',
    instructions: 'Take with food',
    status: 'due'
  },
  { 
    id: 2,
    name: 'Lisinopril', 
    dosage: '10mg', 
    frequency: '1x daily',
    times: ['12:00 PM'],
    color: 'bg-accent',
    takenToday: 0,
    totalToday: 1,
    nextDose: '12:00 PM',
    instructions: 'Take on empty stomach',
    status: 'upcoming'
  },
  { 
    id: 3,
    name: 'Aspirin', 
    dosage: '81mg', 
    frequency: '1x daily',
    times: ['8:00 PM'],
    color: 'bg-pulse-warning',
    takenToday: 0,
    totalToday: 1,
    nextDose: '8:00 PM',
    instructions: 'Take with water',
    status: 'upcoming'
  },
  { 
    id: 4,
    name: 'Vitamin D', 
    dosage: '1000 IU', 
    frequency: '1x daily',
    times: ['9:00 AM'],
    color: 'bg-pulse-success',
    takenToday: 1,
    totalToday: 1,
    nextDose: null,
    instructions: 'Take with breakfast',
    status: 'completed'
  },
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
    <div className="mobile-frame min-h-dvh bg-background pb-24 safe-area-top">
      {/* Header */}
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Medications</h1>
            <p className="text-muted-foreground text-sm">Manage your daily doses</p>
          </div>
          <Button size="icon" className="rounded-2xl h-12 w-12 gradient-primary">
            <Plus className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Today's Progress */}
      <div className="px-6 mb-4">
        <Card className="p-5 rounded-3xl border-border">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-muted-foreground text-sm">Today&apos;s Progress</p>
              <p className="text-foreground font-bold text-2xl">{takenDoses} of {totalDoses} doses</p>
            </div>
            <div className="relative w-16 h-16">
              <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                  className="text-muted"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={`${complianceRate * 1.76} 176`}
                  className="text-primary"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-foreground font-bold text-sm">{complianceRate}%</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 rounded-xl h-10"
              onClick={() => setCurrentScreen('dispenser')}
            >
              <Volume2 className="w-4 h-4 mr-2" />
              Voice Reminder
            </Button>
            <Button 
              size="sm" 
              className="flex-1 rounded-xl h-10 gradient-primary border-0"
              onClick={() => setCurrentScreen('dispenser')}
            >
              <Pill className="w-4 h-4 mr-2" />
              Dispenser
            </Button>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <div className="px-6 mb-4">
        <div className="flex gap-2 p-1 bg-muted rounded-2xl">
          <button
            onClick={() => setActiveTab('schedule')}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'schedule' 
                ? 'bg-card text-foreground shadow-sm' 
                : 'text-muted-foreground'
            }`}
          >
            Today&apos;s Schedule
          </button>
          <button
            onClick={() => setActiveTab('medications')}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'medications' 
                ? 'bg-card text-foreground shadow-sm' 
                : 'text-muted-foreground'
            }`}
          >
            All Medications
          </button>
        </div>
      </div>

      {activeTab === 'schedule' ? (
        /* Timeline View */
        <div className="px-6 mb-6">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />
            
            <div className="space-y-4">
              {timelineSlots.map((slot, index) => (
                <div key={index} className="relative flex gap-4">
                  {/* Timeline dot */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 z-10 ${
                    slot.status === 'taken' 
                      ? 'bg-pulse-success' 
                      : slot.status === 'upcoming' 
                      ? 'bg-card border-2 border-primary' 
                      : 'bg-muted'
                  }`}>
                    {slot.status === 'taken' ? (
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    ) : (
                      <Clock className={`w-5 h-5 ${slot.status === 'upcoming' ? 'text-primary' : 'text-muted-foreground'}`} />
                    )}
                  </div>
                  
                  {/* Card */}
                  <Card 
                    className={`flex-1 p-4 rounded-2xl border-border ${
                      slot.status === 'upcoming' ? 'border-l-4 border-l-primary' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`font-semibold ${
                        slot.status === 'taken' ? 'text-muted-foreground' : 'text-foreground'
                      }`}>
                        {slot.time}
                      </span>
                      {slot.status === 'taken' && (
                        <span className="text-pulse-success text-xs font-medium">Completed</span>
                      )}
                      {slot.status === 'upcoming' && (
                        <span className="text-primary text-xs font-medium">Upcoming</span>
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
          </div>
        </div>
      ) : (
        /* Medications List */
        <div className="px-6 mb-6 space-y-3">
          {medications.map((med) => (
            <Card 
              key={med.id}
              className="p-4 rounded-2xl border-border cursor-pointer hover:border-primary/30 transition-all"
              onClick={() => setCurrentScreen('medication-detail')}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl ${med.color} flex items-center justify-center`}>
                  <Pill className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-foreground font-semibold">{med.name}</p>
                    {med.status === 'completed' && (
                      <CheckCircle2 className="w-4 h-4 text-pulse-success" />
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm">{med.dosage} - {med.frequency}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <Progress 
                      value={(med.takenToday / med.totalToday) * 100} 
                      className="flex-1 h-1.5"
                    />
                    <span className="text-muted-foreground text-xs">
                      {med.takenToday}/{med.totalToday}
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Reminder Alert */}
      <div className="px-6 mb-6">
        <Card className="p-4 rounded-2xl border-border bg-pulse-warning/5 border-pulse-warning/20">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-pulse-warning/10 flex items-center justify-center shrink-0">
              <Bell className="w-5 h-5 text-pulse-warning" />
            </div>
            <div className="flex-1">
              <p className="text-foreground font-semibold text-sm">Next Reminder</p>
              <p className="text-muted-foreground text-sm mt-1">
                Lisinopril 10mg at 12:00 PM - Voice reminder enabled
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
