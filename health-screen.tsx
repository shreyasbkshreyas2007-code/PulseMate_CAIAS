"use client"

import { useApp } from '@/lib/app-context'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { 
  Heart, 
  Pill, 
  Activity, 
  Bell, 
  ChevronRight, 
  Footprints,
  Moon,
  Flame,
  TrendingUp,
  Clock,
  AlertCircle,
  CheckCircle2
} from 'lucide-react'

const upcomingMeds = [
  { name: 'Metformin', time: '8:00 AM', status: 'due', dosage: '500mg' },
  { name: 'Lisinopril', time: '12:00 PM', status: 'upcoming', dosage: '10mg' },
  { name: 'Aspirin', time: '8:00 PM', status: 'upcoming', dosage: '81mg' },
]

const healthMetrics = [
  { label: 'Heart Rate', value: '72', unit: 'bpm', icon: Heart, color: 'text-destructive', bgColor: 'bg-destructive/10' },
  { label: 'Steps', value: '4,523', unit: 'steps', icon: Footprints, color: 'text-primary', bgColor: 'bg-primary/10' },
  { label: 'Sleep', value: '7.5', unit: 'hrs', icon: Moon, color: 'text-pulse-violet', bgColor: 'bg-pulse-violet/10' },
  { label: 'Calories', value: '1,240', unit: 'kcal', icon: Flame, color: 'text-pulse-warning', bgColor: 'bg-pulse-warning/10' },
]

export function DashboardScreen() {
  const { userName, setCurrentScreen } = useApp()

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 17) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <div className="mobile-frame min-h-dvh bg-background pb-24 safe-area-top">
      {/* Header */}
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground text-sm font-medium">{getGreeting()}</p>
            <h1 className="text-2xl font-bold text-foreground">{userName}</h1>
          </div>
          <button className="relative p-3 rounded-2xl bg-card border border-border hover:bg-muted transition-colors">
            <Bell className="w-5 h-5 text-foreground" />
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-destructive rounded-full border-2 border-card" />
          </button>
        </div>
      </div>

      {/* Health Status Card */}
      <div className="px-6 mb-4">
        <Card className="p-5 gradient-teal rounded-3xl border-0 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Activity className="w-4 h-4 text-white" />
              </div>
              <span className="text-white/90 text-sm font-medium">Health Status</span>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-white text-3xl font-bold">Excellent</p>
                <p className="text-white/80 text-sm mt-1">All vitals are normal</p>
              </div>
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/20">
                <TrendingUp className="w-4 h-4 text-white" />
                <span className="text-white text-sm font-medium">+12%</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Health Metrics */}
      <div className="px-6 mb-6">
        <div className="grid grid-cols-4 gap-3">
          {healthMetrics.map((metric) => {
            const Icon = metric.icon
            return (
              <button
                key={metric.label}
                onClick={() => setCurrentScreen('health')}
                className="flex flex-col items-center p-3 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors"
              >
                <div className={`w-10 h-10 rounded-xl ${metric.bgColor} flex items-center justify-center mb-2`}>
                  <Icon className={`w-5 h-5 ${metric.color}`} />
                </div>
                <span className="text-foreground font-bold text-sm">{metric.value}</span>
                <span className="text-muted-foreground text-[10px]">{metric.unit}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Medication Compliance */}
      <div className="px-6 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-foreground">Today&apos;s Progress</h2>
          <span className="text-sm text-primary font-medium">85%</span>
        </div>
        <Card className="p-4 rounded-2xl border-border">
          <div className="flex items-center gap-4">
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
                  strokeDasharray={`${85 * 1.76} 176`}
                  className="text-primary"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <Pill className="w-5 h-5 text-primary" />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-foreground font-semibold">Medication Adherence</p>
              <p className="text-muted-foreground text-sm">5 of 6 doses taken today</p>
              <div className="flex items-center gap-1 mt-1">
                <CheckCircle2 className="w-4 h-4 text-pulse-success" />
                <span className="text-pulse-success text-xs font-medium">On track</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Upcoming Medications */}
      <div className="px-6 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-foreground">Upcoming Medications</h2>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-primary"
            onClick={() => setCurrentScreen('medications')}
          >
            View All
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        <div className="space-y-3">
          {upcomingMeds.map((med, index) => (
            <Card 
              key={index} 
              className={`p-4 rounded-2xl border-border cursor-pointer transition-all hover:border-primary/30 ${
                med.status === 'due' ? 'border-l-4 border-l-primary' : ''
              }`}
              onClick={() => setCurrentScreen('medication-detail')}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  med.status === 'due' ? 'bg-primary/10' : 'bg-muted'
                }`}>
                  <Pill className={`w-6 h-6 ${med.status === 'due' ? 'text-primary' : 'text-muted-foreground'}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-foreground font-semibold">{med.name}</p>
                    {med.status === 'due' && (
                      <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                        Due Now
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm">{med.dosage}</p>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{med.time}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* AI Insight */}
      <div className="px-6 mb-6">
        <Card className="p-4 rounded-2xl border-border bg-pulse-success/5 border-pulse-success/20">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-pulse-success/10 flex items-center justify-center shrink-0">
              <AlertCircle className="w-5 h-5 text-pulse-success" />
            </div>
            <div>
              <p className="text-foreground font-semibold text-sm">AI Insight</p>
              <p className="text-muted-foreground text-sm mt-1">
                Your sleep pattern has improved by 15% this week. Keep maintaining your bedtime routine!
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
