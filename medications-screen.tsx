"use client"

import { useState } from 'react'
import { useApp } from '@/lib/app-context'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Heart, 
  Activity, 
  Footprints, 
  Moon, 
  Flame,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Brain,
  Thermometer,
  Droplets,
  Wind
} from 'lucide-react'

const healthMetrics = [
  { 
    id: 'heart', 
    label: 'Heart Rate', 
    value: '72', 
    unit: 'bpm', 
    icon: Heart, 
    color: 'text-destructive',
    bgColor: 'bg-destructive/10',
    trend: '+3%',
    trendUp: true,
    status: 'normal',
    min: 60,
    max: 100,
    current: 72
  },
  { 
    id: 'steps', 
    label: 'Steps', 
    value: '4,523', 
    unit: 'of 6,000', 
    icon: Footprints, 
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    trend: '+12%',
    trendUp: true,
    status: 'good',
    min: 0,
    max: 6000,
    current: 4523
  },
  { 
    id: 'sleep', 
    label: 'Sleep', 
    value: '7.5', 
    unit: 'hours', 
    icon: Moon, 
    color: 'text-pulse-violet',
    bgColor: 'bg-pulse-violet/10',
    trend: '+15%',
    trendUp: true,
    status: 'good',
    min: 0,
    max: 9,
    current: 7.5
  },
  { 
    id: 'calories', 
    label: 'Calories', 
    value: '1,240', 
    unit: 'kcal', 
    icon: Flame, 
    color: 'text-pulse-warning',
    bgColor: 'bg-pulse-warning/10',
    trend: '-5%',
    trendUp: false,
    status: 'normal',
    min: 0,
    max: 2000,
    current: 1240
  },
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
    <div className="mobile-frame min-h-dvh bg-background pb-24 safe-area-top">
      {/* Header */}
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Health Dashboard</h1>
            <p className="text-muted-foreground text-sm">AI-powered monitoring</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-pulse-success/10">
            <CheckCircle2 className="w-4 h-4 text-pulse-success" />
            <span className="text-pulse-success text-sm font-medium">All Normal</span>
          </div>
        </div>
      </div>

      {/* AI Risk Status */}
      <div className="px-6 mb-4">
        <Card className="p-5 rounded-3xl gradient-teal border-0 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <span className="text-white/90 text-sm font-medium">AI Health Analysis</span>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-white text-3xl font-bold">Low Risk</p>
                <p className="text-white/80 text-sm mt-1">All vitals within healthy range</p>
              </div>
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/20">
                <Activity className="w-4 h-4 text-white" />
                <span className="text-white text-sm font-medium">Active</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <div className="px-6 mb-4">
        <div className="flex gap-2 p-1 bg-muted rounded-2xl">
          {(['overview', 'vitals', 'insights'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium capitalize transition-all ${
                activeTab === tab 
                  ? 'bg-card text-foreground shadow-sm' 
                  : 'text-muted-foreground'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'overview' && (
        <>
          {/* Health Metrics Grid */}
          <div className="px-6 mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-3">Today&apos;s Metrics</h2>
            <div className="grid grid-cols-2 gap-3">
              {healthMetrics.map((metric) => {
                const Icon = metric.icon
                const progress = (metric.current / metric.max) * 100
                return (
                  <Card key={metric.id} className="p-4 rounded-2xl border-border">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-10 h-10 rounded-xl ${metric.bgColor} flex items-center justify-center`}>
                        <Icon className={`w-5 h-5 ${metric.color}`} />
                      </div>
                      <div className={`flex items-center gap-1 text-xs font-medium ${
                        metric.trendUp ? 'text-pulse-success' : 'text-pulse-warning'
                      }`}>
                        {metric.trendUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {metric.trend}
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                    <p className="text-muted-foreground text-sm">{metric.unit}</p>
                    <div className="mt-3 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${metric.color.replace('text-', 'bg-')}`}
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      />
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Activity Chart Placeholder */}
          <div className="px-6 mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-3">Weekly Activity</h2>
            <Card className="p-4 rounded-2xl border-border">
              <div className="flex items-end justify-between h-32 gap-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
                  const heights = [60, 80, 45, 90, 75, 55, 70]
                  const isToday = i === 3
                  return (
                    <div key={day} className="flex-1 flex flex-col items-center gap-2">
                      <div 
                        className={`w-full rounded-lg transition-all ${
                          isToday ? 'bg-primary' : 'bg-muted'
                        }`}
                        style={{ height: `${heights[i]}%` }}
                      />
                      <span className={`text-xs ${isToday ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                        {day}
                      </span>
                    </div>
                  )
                })}
              </div>
            </Card>
          </div>
        </>
      )}

      {activeTab === 'vitals' && (
        <>
          {/* Vital Signs */}
          <div className="px-6 mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-3">Vital Signs</h2>
            <div className="space-y-3">
              {vitalSigns.map((vital, index) => {
                const Icon = vital.icon
                return (
                  <Card key={index} className="p-4 rounded-2xl border-border">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-muted-foreground text-sm">{vital.label}</p>
                        <div className="flex items-baseline gap-1">
                          <p className="text-foreground font-bold text-xl">{vital.value}</p>
                          <span className="text-muted-foreground text-sm">{vital.unit}</span>
                        </div>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        vital.status === 'good' 
                          ? 'bg-pulse-success/10 text-pulse-success' 
                          : 'bg-primary/10 text-primary'
                      }`}>
                        {vital.status === 'good' ? 'Optimal' : 'Normal'}
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Heart Rate Graph Simulation */}
          <div className="px-6 mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-3">Heart Rate Today</h2>
            <Card className="p-4 rounded-2xl border-border">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-3xl font-bold text-foreground">72 <span className="text-lg font-normal text-muted-foreground">bpm</span></p>
                  <p className="text-muted-foreground text-sm">Average today</p>
                </div>
                <div className="text-right">
                  <p className="text-muted-foreground text-sm">Range</p>
                  <p className="text-foreground font-medium">65 - 85 bpm</p>
                </div>
              </div>
              {/* Simple ECG-like visualization */}
              <div className="h-20 flex items-center overflow-hidden">
                <svg className="w-full h-full" viewBox="0 0 400 80" preserveAspectRatio="none">
                  <path
                    d="M0 40 L20 40 L30 40 L40 20 L50 60 L60 10 L70 70 L80 40 L100 40 L120 40 L130 40 L140 20 L150 60 L160 10 L170 70 L180 40 L200 40 L220 40 L230 40 L240 20 L250 60 L260 10 L270 70 L280 40 L300 40 L320 40 L330 40 L340 20 L350 60 L360 10 L370 70 L380 40 L400 40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-primary"
                  />
                </svg>
              </div>
            </Card>
          </div>
        </>
      )}

      {activeTab === 'insights' && (
        <>
          {/* Risk Predictions */}
          <div className="px-6 mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-3">AI Risk Assessment</h2>
            <div className="space-y-3">
              {riskPredictions.map((risk, index) => (
                <Card key={index} className="p-4 rounded-2xl border-border">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-foreground font-medium">{risk.label}</p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      risk.level === 'Low' || risk.level === 'None'
                        ? 'bg-pulse-success/10 text-pulse-success'
                        : risk.level === 'Medium'
                        ? 'bg-pulse-warning/10 text-pulse-warning'
                        : 'bg-destructive/10 text-destructive'
                    }`}>
                      {risk.level}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${risk.color}`}
                      style={{ width: `${Math.max(risk.percentage, 5)}%` }}
                    />
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Anomaly Detection */}
          <div className="px-6 mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-3">Behaviour Patterns</h2>
            <Card className="p-4 rounded-2xl border-border bg-pulse-success/5 border-pulse-success/20">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-pulse-success/10 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-pulse-success" />
                </div>
                <div>
                  <p className="text-foreground font-semibold">Normal Activity Detected</p>
                  <p className="text-muted-foreground text-sm mt-1">
                    Your daily routine patterns are consistent. Sleep, movement, and medication adherence are all within expected ranges.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Insights Button */}
          <div className="px-6 mb-6">
            <Button 
              className="w-full h-14 rounded-2xl"
              variant="outline"
              onClick={() => setCurrentScreen('insights')}
            >
              <Brain className="w-5 h-5 mr-2" />
              View Detailed Insights
              <ChevronRight className="w-5 h-5 ml-auto" />
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
