import { useApp } from '@/lib/app-context'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
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
  CheckCircle2,
  Brain
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
    <div className="screen-container">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-muted-foreground text-sm">{getGreeting()}</p>
          <h1 className="text-2xl font-bold text-foreground">{userName}</h1>
        </div>
        <button
          onClick={() => setCurrentScreen('profile')}
          className="w-11 h-11 rounded-full gradient-primary flex items-center justify-center"
        >
          <span className="text-primary-foreground font-semibold text-sm">
            {userName.charAt(0).toUpperCase()}
          </span>
        </button>
      </div>

      {/* Health Status Card */}
      <Card className="p-5 rounded-3xl glass-card">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-medium text-muted-foreground">Health Status</p>
          <span className="px-3 py-1 rounded-full bg-pulse-success/10 text-pulse-success text-xs font-semibold">
            Excellent
          </span>
        </div>
        <p className="text-foreground font-medium">All vitals are normal</p>
        <div className="flex items-center gap-1 mt-1">
          <TrendingUp className="w-3.5 h-3.5 text-pulse-success" />
          <span className="text-xs text-pulse-success font-medium">+12%</span>
        </div>
      </Card>

      {/* Quick Health Metrics */}
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
              <span className="text-sm font-bold text-foreground">{metric.value}</span>
              <span className="text-[10px] text-muted-foreground">{metric.unit}</span>
            </button>
          )
        })}
      </div>

      {/* Medication Compliance */}
      <Card className="p-5 rounded-3xl glass-card">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-foreground">Today's Progress</h2>
          <span className="text-2xl font-bold text-primary">85%</span>
        </div>
        <p className="text-sm text-muted-foreground mb-2">Medication Adherence</p>
        <Progress value={85} className="h-2 rounded-full" />
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-muted-foreground">5 of 6 doses taken today</span>
          <span className="text-xs text-pulse-success font-medium">On track</span>
        </div>
      </Card>

      {/* Upcoming Medications */}
      <Card className="p-5 rounded-3xl glass-card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-foreground">Upcoming Medications</h2>
          <button onClick={() => setCurrentScreen('medications')} className="text-sm text-primary font-medium">
            View All
          </button>
        </div>
        <div className="space-y-3">
          {upcomingMeds.map((med, index) => (
            <button
              key={index}
              onClick={() => setCurrentScreen('medication-detail')}
              className="flex items-center justify-between w-full p-3 rounded-2xl bg-muted/50 hover:bg-muted transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  med.status === 'due' ? 'bg-primary/10' : 'bg-muted'
                }`}>
                  <Pill className={`w-5 h-5 ${med.status === 'due' ? 'text-primary' : 'text-muted-foreground'}`} />
                </div>
                <div className="text-left">
                  <p className="font-medium text-foreground">{med.name}</p>
                  {med.status === 'due' && (
                    <span className="text-xs text-primary font-medium">Due Now</span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">{med.dosage}</p>
                <p className="text-xs text-muted-foreground">{med.time}</p>
              </div>
            </button>
          ))}
        </div>
      </Card>

      {/* AI Insight */}
      <Card className="p-5 rounded-3xl border-primary/20 bg-primary/5">
        <div className="flex items-center gap-2 mb-2">
          <Brain className="w-5 h-5 text-primary" />
          <span className="text-sm font-semibold text-primary">AI Insight</span>
        </div>
        <p className="text-sm text-foreground leading-relaxed">
          Your sleep pattern has improved by 15% this week. Keep maintaining your bedtime routine!
        </p>
      </Card>
    </div>
  )
}
