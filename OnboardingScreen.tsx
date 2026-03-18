import { useState } from 'react'
import { useApp } from '@/lib/app-context'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  User, Heart, Pill, Activity, MapPin, Bell, Phone,
  ChevronRight, TrendingUp, TrendingDown, CheckCircle2,
  AlertCircle, Clock, Calendar, FileText, Settings,
  LogOut, RefreshCw
} from 'lucide-react'

const patientInfo = {
  name: 'Margaret Johnson',
  age: 78,
  lastActive: '2 minutes ago',
  location: '123 Maple Street, Apt 4B',
  status: 'active',
}

const medicationHistory = [
  { name: 'Metformin', time: '8:00 AM', status: 'taken', takenAt: '8:05 AM' },
  { name: 'Lisinopril', time: '12:00 PM', status: 'due', takenAt: null },
  { name: 'Aspirin', time: '8:00 PM', status: 'upcoming', takenAt: null },
]

const weeklyCompliance = [
  { day: 'Mon', percentage: 100 },
  { day: 'Tue', percentage: 100 },
  { day: 'Wed', percentage: 83 },
  { day: 'Thu', percentage: 100 },
  { day: 'Fri', percentage: 100 },
  { day: 'Sat', percentage: 67 },
  { day: 'Sun', percentage: 100 },
]

const healthTrends = [
  { label: 'Heart Rate', value: '72 bpm', trend: '+3%', trendUp: true, status: 'normal' },
  { label: 'Blood Pressure', value: '120/80', trend: 'Stable', trendUp: true, status: 'normal' },
  { label: 'Sleep Quality', value: '7.5 hrs', trend: '+15%', trendUp: true, status: 'good' },
  { label: 'Activity Level', value: '4,523 steps', trend: '+8%', trendUp: true, status: 'normal' },
]

const recentAlerts = [
  { type: 'info', message: 'Morning medication taken on time', time: '8:05 AM' },
  { type: 'success', message: 'All vitals normal', time: '7:30 AM' },
  { type: 'warning', message: 'Afternoon dose due in 30 minutes', time: '11:30 AM' },
]

export function GuardianPanelScreen() {
  const { setCurrentScreen, setIsLoggedIn, userName } = useApp()
  const [activeTab, setActiveTab] = useState<'overview' | 'medications' | 'health'>('overview')

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentScreen('login')
  }

  const averageCompliance = Math.round(
    weeklyCompliance.reduce((acc, day) => acc + day.percentage, 0) / weeklyCompliance.length
  )

  return (
    <div className="screen-container pb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Guardian Dashboard</p>
          <h1 className="text-2xl font-bold text-foreground">Welcome, {userName}</h1>
        </div>
        <button onClick={handleLogout} className="p-2 rounded-xl bg-muted hover:bg-muted/80 transition-colors">
          <LogOut className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* Patient Card */}
      <Card className="p-5 rounded-3xl glass-card">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full gradient-primary flex items-center justify-center">
            <User className="w-7 h-7 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-foreground">{patientInfo.name}</h2>
            <p className="text-sm text-muted-foreground">{patientInfo.age} years old</p>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-pulse-success animate-pulse" />
            <span className="text-xs text-pulse-success font-medium">Active {patientInfo.lastActive}</span>
          </div>
        </div>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="p-3 rounded-2xl glass-card text-center">
          <p className="text-xl font-bold text-primary">{averageCompliance}%</p>
          <p className="text-xs text-muted-foreground">Compliance</p>
        </Card>
        <Card className="p-3 rounded-2xl glass-card text-center">
          <p className="text-xl font-bold text-pulse-success">Normal</p>
          <p className="text-xs text-muted-foreground">Health Status</p>
        </Card>
        <Card className="p-3 rounded-2xl glass-card text-center">
          <p className="text-xl font-bold text-foreground">Home</p>
          <p className="text-xs text-muted-foreground">Location</p>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex bg-muted rounded-2xl p-1">
        {(['overview', 'medications', 'health'] as const).map((tab) => (
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
          {/* Today's Alerts */}
          <Card className="p-5 rounded-3xl glass-card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-foreground">Today's Activity</h2>
              <button className="text-xs text-primary font-medium flex items-center gap-1">
                <RefreshCw className="w-3 h-3" />
                Refresh
              </button>
            </div>
            <div className="space-y-3">
              {recentAlerts.map((alert, index) => (
                <div key={index} className="flex items-start gap-3">
                  {alert.type === 'success' ? (
                    <CheckCircle2 className="w-5 h-5 text-pulse-success mt-0.5" />
                  ) : alert.type === 'warning' ? (
                    <AlertCircle className="w-5 h-5 text-pulse-warning mt-0.5" />
                  ) : (
                    <Bell className="w-5 h-5 text-primary mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{alert.message}</p>
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Weekly Compliance Chart */}
          <Card className="p-5 rounded-3xl glass-card">
            <h2 className="font-semibold text-foreground mb-4">Weekly Compliance</h2>
            <div className="flex items-end justify-between h-32 gap-2">
              {weeklyCompliance.map((day, i) => {
                const isToday = i === 3
                return (
                  <div key={day.day} className="flex flex-col items-center gap-1 flex-1">
                    <span className="text-[10px] text-muted-foreground font-medium">{day.percentage}%</span>
                    <div
                      className={`w-full rounded-lg transition-all ${isToday ? 'bg-primary' : 'bg-primary/20'}`}
                      style={{ height: `${day.percentage}%` }}
                    />
                    <span className={`text-[10px] font-medium ${isToday ? 'text-primary' : 'text-muted-foreground'}`}>{day.day}</span>
                  </div>
                )
              })}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-5 rounded-3xl glass-card">
            <h2 className="font-semibold text-foreground mb-3">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-12 rounded-2xl border-border text-sm">
                <MapPin className="w-4 h-4 mr-2" />View Location
              </Button>
              <Button variant="outline" className="h-12 rounded-2xl border-border text-sm">
                <FileText className="w-4 h-4 mr-2" />Health Report
              </Button>
              <Button variant="outline" className="h-12 rounded-2xl border-border text-sm">
                <Calendar className="w-4 h-4 mr-2" />Schedule
              </Button>
              <Button variant="outline" className="h-12 rounded-2xl border-border text-sm">
                <Settings className="w-4 h-4 mr-2" />Settings
              </Button>
            </div>
          </Card>
        </>
      )}

      {activeTab === 'medications' && (
        <>
          {/* Today's Medications */}
          <Card className="p-5 rounded-3xl glass-card">
            <h2 className="font-semibold text-foreground mb-4">Today's Schedule</h2>
            <div className="space-y-3">
              {medicationHistory.map((med, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-2xl bg-muted/50">
                  {med.status === 'taken' ? (
                    <CheckCircle2 className="w-6 h-6 text-pulse-success" />
                  ) : (
                    <Clock className="w-6 h-6 text-primary" />
                  )}
                  <div className="flex-1">
                    <p className="font-medium text-foreground text-sm">{med.name}</p>
                    <p className="text-xs text-muted-foreground">Scheduled: {med.time}</p>
                    {med.takenAt && (
                      <p className="text-xs text-pulse-success">Taken at {med.takenAt}</p>
                    )}
                  </div>
                  <span className={`text-xs font-medium capitalize ${
                    med.status === 'taken' ? 'text-pulse-success' : 'text-primary'
                  }`}>
                    {med.status}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Compliance Score */}
          <Card className="p-5 rounded-3xl gradient-primary text-primary-foreground text-center">
            <p className="text-5xl font-bold mb-1">{averageCompliance}%</p>
            <p className="text-sm opacity-80">Weekly Compliance Score</p>
            <p className="text-xs opacity-60 mt-1">Excellent medication adherence</p>
          </Card>
        </>
      )}

      {activeTab === 'health' && (
        <>
          {/* Health Trends */}
          <Card className="p-5 rounded-3xl glass-card">
            <h2 className="font-semibold text-foreground mb-4">Health Metrics</h2>
            <div className="space-y-3">
              {healthTrends.map((metric) => (
                <div key={metric.label} className="flex items-center justify-between p-3 rounded-2xl bg-muted/50">
                  <div>
                    <p className="text-sm text-muted-foreground">{metric.label}</p>
                    <p className="font-semibold text-foreground">{metric.value}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {metric.trendUp ? (
                        <TrendingUp className="w-3.5 h-3.5 text-pulse-success" />
                      ) : (
                        <TrendingDown className="w-3.5 h-3.5 text-pulse-warning" />
                      )}
                      <span className="text-xs text-pulse-success font-medium">{metric.trend}</span>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-pulse-success/10 text-pulse-success font-medium">
                      {metric.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* AI Summary */}
          <Card className="p-5 rounded-3xl border-primary/20 bg-primary/5">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-5 h-5 text-primary" />
              <span className="font-semibold text-primary">AI Health Summary</span>
            </div>
            <p className="text-sm text-foreground leading-relaxed">
              Margaret's health metrics are stable and within normal ranges. Sleep quality has improved by 15% this week. No anomalies detected in daily activity patterns.
            </p>
          </Card>
        </>
      )}

      {/* Emergency Contact Button */}
      <Button className="w-full h-14 rounded-2xl text-lg bg-destructive hover:bg-destructive/90 border-0">
        <Phone className="w-5 h-5 mr-2" />
        Emergency Contact
      </Button>
    </div>
  )
}
