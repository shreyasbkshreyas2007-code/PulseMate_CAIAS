import { useApp } from '@/lib/app-context'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  ArrowLeft, Brain, TrendingUp, TrendingDown,
  AlertCircle, CheckCircle2, Moon, Footprints,
  Pill, Heart, Clock, Calendar
} from 'lucide-react'

const dailyPatterns = [
  { label: 'Wake Up Time', value: '6:45 AM', change: 'Consistent', status: 'good', icon: Clock },
  { label: 'Average Sleep', value: '7.5 hours', change: '+15% this week', status: 'good', icon: Moon },
  { label: 'Daily Steps', value: '4,200 avg', change: '+8% this week', status: 'good', icon: Footprints },
  { label: 'Med Adherence', value: '94%', change: '+2% this month', status: 'good', icon: Pill },
]

const weeklyInsights = [
  { type: 'positive', title: 'Improved Sleep Quality', description: 'Your average sleep duration has increased by 15% this week. The consistent bedtime routine appears to be working well.', icon: Moon },
  { type: 'positive', title: 'Excellent Medication Compliance', description: "You've maintained 94% medication adherence this month, above the recommended 90% threshold.", icon: Pill },
  { type: 'neutral', title: 'Activity Levels Stable', description: 'Your daily step count has been consistent this week. Consider adding a short afternoon walk to boost activity.', icon: Footprints },
  { type: 'attention', title: 'Heart Rate Variation', description: 'We noticed slightly elevated heart rate readings in the evenings. This could be related to caffeine consumption or stress.', icon: Heart },
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
    <div className="screen-container">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setCurrentScreen('health')}
          className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">AI Insights</h1>
          <p className="text-sm text-muted-foreground">Behavior pattern analysis</p>
        </div>
      </div>

      {/* Summary Card */}
      <Card className="p-5 rounded-3xl gradient-primary text-primary-foreground">
        <p className="text-sm opacity-80 mb-1">Weekly Health Score</p>
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-5xl font-bold">92</span>
          <span className="text-sm opacity-70">/100</span>
        </div>
        <div className="flex items-center gap-1 mb-2">
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm">+5 from last week</span>
        </div>
        <p className="text-sm opacity-80">Excellent! Your health metrics are consistently improving.</p>
      </Card>

      {/* Daily Patterns */}
      <Card className="p-5 rounded-3xl glass-card">
        <h2 className="font-semibold text-foreground mb-4">Daily Patterns</h2>
        <div className="space-y-3">
          {dailyPatterns.map((pattern) => {
            const Icon = pattern.icon
            return (
              <div key={pattern.label} className="flex items-center justify-between p-3 rounded-2xl bg-muted/50">
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{pattern.label}</p>
                    <p className="text-xs text-muted-foreground">{pattern.value}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {pattern.status === 'good' ? (
                    <TrendingUp className="w-3.5 h-3.5 text-pulse-success" />
                  ) : (
                    <TrendingDown className="w-3.5 h-3.5 text-pulse-warning" />
                  )}
                  <span className="text-xs text-pulse-success font-medium">{pattern.change}</span>
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Weekly Insights */}
      <Card className="p-5 rounded-3xl glass-card">
        <h2 className="font-semibold text-foreground mb-4">This Week's Insights</h2>
        <div className="space-y-4">
          {weeklyInsights.map((insight, index) => {
            const Icon = insight.icon
            return (
              <div key={index} className={`p-4 rounded-2xl ${
                insight.type === 'attention' ? 'bg-pulse-warning/10 border border-pulse-warning/20' : 'bg-muted/50'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icon className={`w-5 h-5 ${insight.type === 'attention' ? 'text-pulse-warning' : 'text-primary'}`} />
                    <p className="font-medium text-foreground text-sm">{insight.title}</p>
                  </div>
                  {insight.type === 'positive' && <CheckCircle2 className="w-4 h-4 text-pulse-success" />}
                  {insight.type === 'attention' && <AlertCircle className="w-4 h-4 text-pulse-warning" />}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{insight.description}</p>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Behavior Flags */}
      <Card className="p-5 rounded-3xl glass-card">
        <h2 className="font-semibold text-foreground mb-4">Behavior Monitoring</h2>
        <div className="space-y-3">
          {behaviorFlags.map((flag) => (
            <div key={flag.label} className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-foreground">{flag.label}</p>
                <p className="text-xs text-muted-foreground">{flag.detail}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${
                flag.status === 'improved' ? 'bg-pulse-success/10 text-pulse-success' : 'bg-muted text-muted-foreground'
              }`}>
                {flag.status}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Share Report */}
      <Button className="w-full h-12 rounded-2xl gradient-primary border-0">
        Share Weekly Report with Doctor
      </Button>
    </div>
  )
}
