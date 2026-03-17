"use client"

import { useApp } from '@/lib/app-context'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  ArrowLeft, 
  Brain, 
  TrendingUp, 
  TrendingDown, 
  AlertCircle,
  CheckCircle2,
  Moon,
  Footprints,
  Pill,
  Heart,
  Clock,
  Calendar
} from 'lucide-react'

const dailyPatterns = [
  { 
    label: 'Wake Up Time', 
    value: '6:45 AM', 
    change: 'Consistent',
    status: 'good',
    icon: Clock 
  },
  { 
    label: 'Average Sleep', 
    value: '7.5 hours', 
    change: '+15% this week',
    status: 'good',
    icon: Moon 
  },
  { 
    label: 'Daily Steps', 
    value: '4,200 avg', 
    change: '+8% this week',
    status: 'good',
    icon: Footprints 
  },
  { 
    label: 'Med Adherence', 
    value: '94%', 
    change: '+2% this month',
    status: 'good',
    icon: Pill 
  },
]

const weeklyInsights = [
  {
    type: 'positive',
    title: 'Improved Sleep Quality',
    description: 'Your average sleep duration has increased by 15% this week. The consistent bedtime routine appears to be working well.',
    icon: Moon,
  },
  {
    type: 'positive',
    title: 'Excellent Medication Compliance',
    description: 'You\'ve maintained 94% medication adherence this month, above the recommended 90% threshold.',
    icon: Pill,
  },
  {
    type: 'neutral',
    title: 'Activity Levels Stable',
    description: 'Your daily step count has been consistent this week. Consider adding a short afternoon walk to boost activity.',
    icon: Footprints,
  },
  {
    type: 'attention',
    title: 'Heart Rate Variation',
    description: 'We noticed slightly elevated heart rate readings in the evenings. This could be related to caffeine consumption or stress.',
    icon: Heart,
  },
]

const behaviorFlags = [
  { label: 'Morning Routine', status: 'normal', detail: 'Consistent wake-up times' },
  { label: 'Meal Times', status: 'normal', detail: 'Regular eating schedule' },
  { label: 'Activity Level', status: 'normal', detail: 'Within expected range' },
  { label: 'Sleep Pattern', status: 'improved', detail: 'Better than last week' },
  { label: 'Social Interaction', status: 'normal', detail: '3 calls this week' },
]

export function InsightsScreen() {
  const { setCurrentScreen } = useApp()

  return (
    <div className="mobile-frame min-h-dvh bg-background pb-24 safe-area-top">
      {/* Header */}
      <div className="px-6 pt-4 pb-2">
        <button 
          onClick={() => setCurrentScreen('health')}
          className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
      </div>

      <div className="px-6 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">AI Insights</h1>
            <p className="text-muted-foreground text-sm">Behavior pattern analysis</p>
          </div>
        </div>
      </div>

      {/* Summary Card */}
      <div className="px-6 mb-6">
        <Card className="p-5 rounded-3xl gradient-teal border-0 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative">
            <p className="text-white/80 text-sm mb-2">Weekly Health Score</p>
            <div className="flex items-end gap-3">
              <p className="text-white text-5xl font-bold">92</p>
              <div className="flex items-center gap-1 pb-2">
                <TrendingUp className="w-4 h-4 text-white" />
                <span className="text-white/90 text-sm">+5 from last week</span>
              </div>
            </div>
            <p className="text-white/80 text-sm mt-2">
              Excellent! Your health metrics are consistently improving.
            </p>
          </div>
        </Card>
      </div>

      {/* Daily Patterns */}
      <div className="px-6 mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-3">Daily Patterns</h2>
        <div className="grid grid-cols-2 gap-3">
          {dailyPatterns.map((pattern, index) => {
            const Icon = pattern.icon
            return (
              <Card key={index} className="p-4 rounded-2xl border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground text-xs">{pattern.label}</span>
                </div>
                <p className="text-foreground font-bold text-lg">{pattern.value}</p>
                <div className="flex items-center gap-1 mt-1">
                  {pattern.status === 'good' ? (
                    <TrendingUp className="w-3 h-3 text-pulse-success" />
                  ) : (
                    <TrendingDown className="w-3 h-3 text-pulse-warning" />
                  )}
                  <span className={`text-xs ${
                    pattern.status === 'good' ? 'text-pulse-success' : 'text-pulse-warning'
                  }`}>
                    {pattern.change}
                  </span>
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Weekly Insights */}
      <div className="px-6 mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-3">This Week&apos;s Insights</h2>
        <div className="space-y-3">
          {weeklyInsights.map((insight, index) => {
            const Icon = insight.icon
            return (
              <Card 
                key={index} 
                className={`p-4 rounded-2xl border-border ${
                  insight.type === 'positive' 
                    ? 'bg-pulse-success/5 border-pulse-success/20'
                    : insight.type === 'attention'
                    ? 'bg-pulse-warning/5 border-pulse-warning/20'
                    : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    insight.type === 'positive' 
                      ? 'bg-pulse-success/10'
                      : insight.type === 'attention'
                      ? 'bg-pulse-warning/10'
                      : 'bg-primary/10'
                  }`}>
                    <Icon className={`w-5 h-5 ${
                      insight.type === 'positive' 
                        ? 'text-pulse-success'
                        : insight.type === 'attention'
                        ? 'text-pulse-warning'
                        : 'text-primary'
                    }`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-foreground font-semibold">{insight.title}</p>
                      {insight.type === 'positive' && (
                        <CheckCircle2 className="w-4 h-4 text-pulse-success" />
                      )}
                      {insight.type === 'attention' && (
                        <AlertCircle className="w-4 h-4 text-pulse-warning" />
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm mt-1">{insight.description}</p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Behavior Flags */}
      <div className="px-6 mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-3">Behavior Monitoring</h2>
        <Card className="p-4 rounded-2xl border-border">
          <div className="space-y-4">
            {behaviorFlags.map((flag, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="text-foreground font-medium text-sm">{flag.label}</p>
                  <p className="text-muted-foreground text-xs">{flag.detail}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                  flag.status === 'improved'
                    ? 'bg-pulse-success/10 text-pulse-success'
                    : flag.status === 'warning'
                    ? 'bg-pulse-warning/10 text-pulse-warning'
                    : 'bg-primary/10 text-primary'
                }`}>
                  {flag.status}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Share Report */}
      <div className="px-6 mb-6">
        <Button className="w-full h-14 rounded-2xl gradient-primary border-0">
          <Calendar className="w-5 h-5 mr-2" />
          Share Weekly Report with Doctor
        </Button>
      </div>
    </div>
  )
}
