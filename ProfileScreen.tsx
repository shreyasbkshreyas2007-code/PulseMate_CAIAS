import { useState } from 'react'
import { useApp } from '@/lib/app-context'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import {
  Heart, Activity, Footprints, Moon, Flame,
  TrendingUp, TrendingDown, AlertTriangle,
  CheckCircle2, ChevronRight, Brain,
  Thermometer, Droplets, Wind
} from 'lucide-react'

const healthMetrics = [
  { id: 'heart', label: 'Heart Rate', value: '72', unit: 'bpm', icon: Heart, color: 'text-destructive', bgColor: 'bg-destructive/10', trend: '+3%', trendUp: true, status: 'normal', min: 60, max: 100, current: 72 },
  { id: 'steps', label: 'Steps', value: '4,523', unit: 'of 6,000', icon: Footprints, color: 'text-primary', bgColor: 'bg-primary/10', trend: '+12%', trendUp: true, status: 'good', min: 0, max: 6000, current: 4523 },
  { id: 'sleep', label: 'Sleep', value: '7.5', unit: 'hours', icon: Moon, color: 'text-pulse-violet', bgColor: 'bg-pulse-violet/10', trend: '+15%', trendUp: true, status: 'good', min: 0, max: 9, current: 7.5 },
  { id: 'calories', label: 'Calories', value: '1,240', unit: 'kcal', icon: Flame, color: 'text-pulse-warning', bgColor: 'bg-pulse-warning/10', trend: '-5%', trendUp: false, status: 'normal', min: 0, max: 2000, current: 1240 },
]

const vitalSigns = [
  { label: 'Blood Pressure', value: '120/80', unit: 'mmHg', icon: Activity, status: 'normal' },
  { label: 'Body Temperature', value: '98.6', unit: '°F', icon: Thermometer, status: 'normal' },
  { label: 'Blood Oxygen', value: '98', unit: '%', icon: Droplets, status: 'good' },
  { label: 'Respiratory Rate', value: '16', unit: '/min', icon: Wind, status: 'normal' },
]

const riskPredictions = [
  { label: 'Fall Risk', level: 'Low', color: 'bg-pulse-success', percentage: 15 },
  { label: 'Cardiac Event', level: 'Low', color: 'bg-pulse-success', percentage: 8 },
  { label: 'Medication Interaction', level: 'None', color: 'bg-pulse-success', percentage: 0 },
]

export function HealthScreen() {
  const { setCurrentScreen } = useApp()
  const [activeTab, setActiveTab] = useState<'overview' | 'vitals' | 'insights'>('overview')

  return (
    <div className="screen-container">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Health Dashboard</h1>
          <p className="text-sm text-muted-foreground">AI-powered monitoring</p>
        </div>
        <span className="px-3 py-1 rounded-full bg-pulse-success/10 text-pulse-success text-xs font-semibold">
          All Normal
        </span>
      </div>

      {/* AI Risk Status */}
      <Card className="p-5 rounded-3xl glass-card">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            <span className="font-semibold text-foreground">AI Health Analysis</span>
          </div>
          <span className="px-3 py-1 rounded-full bg-pulse-success/10 text-pulse-success text-sm font-semibold">Low Risk</span>
        </div>
        <p className="text-sm text-muted-foreground">All vitals within healthy range</p>
        <div className="flex items-center gap-1 mt-2">
          <Activity className="w-3.5 h-3.5 text-pulse-success" />
          <span className="text-xs text-pulse-success font-medium">Active</span>
        </div>
      </Card>

      {/* Tabs */}
      <div className="flex bg-muted rounded-2xl p-1">
        {(['overview', 'vitals', 'insights'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium capitalize transition-all ${
              activeTab === tab ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <>
          {/* Health Metrics Grid */}
          <div>
            <h2 className="font-semibold text-foreground mb-3">Today's Metrics</h2>
            <div className="grid grid-cols-2 gap-3">
              {healthMetrics.map((metric) => {
                const Icon = metric.icon
                const progress = (metric.current / metric.max) * 100
                return (
                  <Card key={metric.id} className="p-4 rounded-2xl glass-card">
                    <div className="flex items-center justify-between mb-2">
                      <div className={`w-9 h-9 rounded-xl ${metric.bgColor} flex items-center justify-center`}>
                        <Icon className={`w-4.5 h-4.5 ${metric.color}`} />
                      </div>
                      <div className="flex items-center gap-1">
                        {metric.trendUp ? <TrendingUp className="w-3 h-3 text-pulse-success" /> : <TrendingDown className="w-3 h-3 text-pulse-warning" />}
                        <span className={`text-xs font-medium ${metric.trendUp ? 'text-pulse-success' : 'text-pulse-warning'}`}>{metric.trend}</span>
                      </div>
                    </div>
                    <p className="text-xl font-bold text-foreground">{metric.value}</p>
                    <p className="text-xs text-muted-foreground">{metric.unit}</p>
                    <Progress value={progress} className="h-1 mt-2 rounded-full" />
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Weekly Activity */}
          <Card className="p-5 rounded-3xl glass-card">
            <h2 className="font-semibold text-foreground mb-4">Weekly Activity</h2>
            <div className="flex items-end justify-between h-32 gap-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
                const heights = [60, 80, 45, 90, 75, 55, 70]
                const isToday = i === 3
                return (
                  <div key={day} className="flex flex-col items-center gap-1 flex-1">
                    <div
                      className={`w-full rounded-lg transition-all ${isToday ? 'bg-primary' : 'bg-primary/20'}`}
                      style={{ height: `${heights[i]}%` }}
                    />
                    <span className={`text-[10px] font-medium ${isToday ? 'text-primary' : 'text-muted-foreground'}`}>{day}</span>
                  </div>
                )
              })}
            </div>
          </Card>
        </>
      )}

      {activeTab === 'vitals' && (
        <>
          {/* Vital Signs */}
          <div>
            <h2 className="font-semibold text-foreground mb-3">Vital Signs</h2>
            <div className="space-y-3">
              {vitalSigns.map((vital) => {
                const Icon = vital.icon
                return (
                  <Card key={vital.label} className="p-4 rounded-2xl glass-card">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{vital.label}</p>
                          <p className="text-lg font-bold text-foreground">{vital.value} <span className="text-sm font-normal text-muted-foreground">{vital.unit}</span></p>
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        vital.status === 'good' ? 'bg-pulse-success/10 text-pulse-success' : 'bg-primary/10 text-primary'
                      }`}>
                        {vital.status === 'good' ? 'Optimal' : 'Normal'}
                      </span>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Heart Rate */}
          <Card className="p-5 rounded-3xl glass-card">
            <h2 className="font-semibold text-foreground mb-2">Heart Rate Today</h2>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-3xl font-bold text-destructive">72</span>
              <span className="text-sm text-muted-foreground">bpm</span>
            </div>
            <p className="text-xs text-muted-foreground mb-3">Average today</p>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Range</span>
              <span className="font-medium">65 - 85 bpm</span>
            </div>
            {/* ECG-like visualization */}
            <div className="mt-3 h-16 flex items-center overflow-hidden">
              <svg viewBox="0 0 200 40" className="w-full text-destructive" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="0,20 20,20 25,20 30,10 35,30 40,5 45,35 50,20 55,20 80,20 85,20 90,10 95,30 100,5 105,35 110,20 115,20 140,20 145,20 150,10 155,30 160,5 165,35 170,20 175,20 200,20" />
              </svg>
            </div>
          </Card>
        </>
      )}

      {activeTab === 'insights' && (
        <>
          {/* Risk Predictions */}
          <Card className="p-5 rounded-3xl glass-card">
            <h2 className="font-semibold text-foreground mb-4">AI Risk Assessment</h2>
            <div className="space-y-4">
              {riskPredictions.map((risk) => (
                <div key={risk.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-foreground">{risk.label}</span>
                    <span className="text-xs font-medium text-pulse-success">{risk.level}</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className={`h-full rounded-full ${risk.color}`} style={{ width: `${Math.max(risk.percentage, 3)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Anomaly Detection */}
          <Card className="p-5 rounded-3xl border-pulse-success/20 bg-pulse-success/5">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-5 h-5 text-pulse-success" />
              <h2 className="font-semibold text-foreground">Behaviour Patterns</h2>
            </div>
            <p className="text-sm font-medium text-pulse-success mb-1">Normal Activity Detected</p>
            <p className="text-sm text-muted-foreground">
              Your daily routine patterns are consistent. Sleep, movement, and medication adherence are all within expected ranges.
            </p>
          </Card>

          {/* Insights Button */}
          <button
            onClick={() => setCurrentScreen('insights')}
            className="w-full p-4 rounded-2xl bg-primary/10 flex items-center justify-between hover:bg-primary/15 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Brain className="w-5 h-5 text-primary" />
              <span className="font-medium text-primary">View Detailed Insights</span>
            </div>
            <ChevronRight className="w-5 h-5 text-primary" />
          </button>
        </>
      )}
    </div>
  )
}
