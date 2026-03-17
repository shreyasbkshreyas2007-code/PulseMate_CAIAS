"use client"

import { useState } from 'react'
import { useApp } from '@/lib/app-context'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  User, 
  Heart, 
  Pill, 
  Activity, 
  MapPin, 
  Bell,
  Phone,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  AlertCircle,
  Clock,
  Calendar,
  FileText,
  Settings,
  LogOut,
  RefreshCw
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
    <div className="mobile-frame min-h-dvh bg-background pb-8 safe-area-top">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 bg-gradient-to-b from-primary/10 to-transparent">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-muted-foreground text-sm">Guardian Dashboard</p>
            <h1 className="text-xl font-bold text-foreground">Welcome, {userName}</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative p-2.5 rounded-xl bg-card border border-border">
              <Bell className="w-5 h-5 text-foreground" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-destructive rounded-full border-2 border-card" />
            </button>
            <button 
              onClick={handleLogout}
              className="p-2.5 rounded-xl bg-card border border-border"
            >
              <LogOut className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Patient Card */}
        <Card className="p-4 rounded-2xl border-border">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-foreground">{patientInfo.name}</h2>
                <div className="w-2.5 h-2.5 rounded-full bg-pulse-success animate-pulse" />
              </div>
              <p className="text-muted-foreground text-sm">{patientInfo.age} years old</p>
              <div className="flex items-center gap-1 mt-1 text-pulse-success text-sm">
                <Clock className="w-3 h-3" />
                Active {patientInfo.lastActive}
              </div>
            </div>
            <Button size="icon" className="rounded-xl bg-primary">
              <Phone className="w-5 h-5" />
            </Button>
          </div>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="px-6 py-4">
        <div className="grid grid-cols-3 gap-3">
          <Card className="p-3 rounded-2xl border-border text-center">
            <div className="w-8 h-8 mx-auto rounded-lg bg-pulse-success/10 flex items-center justify-center mb-2">
              <CheckCircle2 className="w-4 h-4 text-pulse-success" />
            </div>
            <p className="text-xl font-bold text-foreground">{averageCompliance}%</p>
            <p className="text-muted-foreground text-xs">Compliance</p>
          </Card>
          <Card className="p-3 rounded-2xl border-border text-center">
            <div className="w-8 h-8 mx-auto rounded-lg bg-primary/10 flex items-center justify-center mb-2">
              <Heart className="w-4 h-4 text-primary" />
            </div>
            <p className="text-xl font-bold text-foreground">Normal</p>
            <p className="text-muted-foreground text-xs">Health Status</p>
          </Card>
          <Card className="p-3 rounded-2xl border-border text-center">
            <div className="w-8 h-8 mx-auto rounded-lg bg-accent/10 flex items-center justify-center mb-2">
              <MapPin className="w-4 h-4 text-accent" />
            </div>
            <p className="text-xl font-bold text-foreground">Home</p>
            <p className="text-muted-foreground text-xs">Location</p>
          </Card>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 mb-4">
        <div className="flex gap-2 p-1 bg-muted rounded-2xl">
          {(['overview', 'medications', 'health'] as const).map((tab) => (
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
          {/* Today's Alerts */}
          <div className="px-6 mb-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-foreground">Today&apos;s Activity</h2>
              <Button variant="ghost" size="sm" className="text-primary">
                <RefreshCw className="w-4 h-4 mr-1" />
                Refresh
              </Button>
            </div>
            <div className="space-y-2">
              {recentAlerts.map((alert, index) => (
                <Card key={index} className="p-3 rounded-xl border-border">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      alert.type === 'success' 
                        ? 'bg-pulse-success/10' 
                        : alert.type === 'warning'
                        ? 'bg-pulse-warning/10'
                        : 'bg-primary/10'
                    }`}>
                      {alert.type === 'success' ? (
                        <CheckCircle2 className="w-4 h-4 text-pulse-success" />
                      ) : alert.type === 'warning' ? (
                        <AlertCircle className="w-4 h-4 text-pulse-warning" />
                      ) : (
                        <Pill className="w-4 h-4 text-primary" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-foreground text-sm">{alert.message}</p>
                    </div>
                    <span className="text-muted-foreground text-xs">{alert.time}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Weekly Compliance Chart */}
          <div className="px-6 mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-3">Weekly Compliance</h2>
            <Card className="p-4 rounded-2xl border-border">
              <div className="flex items-end justify-between h-32 gap-2">
                {weeklyCompliance.map((day, i) => {
                  const isToday = i === 3
                  return (
                    <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full flex flex-col items-center gap-1">
                        <span className={`text-xs font-medium ${
                          day.percentage === 100 ? 'text-pulse-success' : 'text-pulse-warning'
                        }`}>
                          {day.percentage}%
                        </span>
                        <div 
                          className={`w-full rounded-lg transition-all ${
                            day.percentage === 100 
                              ? 'bg-pulse-success' 
                              : isToday
                              ? 'bg-primary'
                              : 'bg-pulse-warning'
                          }`}
                          style={{ height: `${day.percentage * 0.8}px` }}
                        />
                      </div>
                      <span className={`text-xs ${isToday ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                        {day.day}
                      </span>
                    </div>
                  )
                })}
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="px-6 mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-3">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-14 rounded-2xl justify-start">
                <MapPin className="w-5 h-5 mr-2 text-primary" />
                View Location
              </Button>
              <Button variant="outline" className="h-14 rounded-2xl justify-start">
                <FileText className="w-5 h-5 mr-2 text-primary" />
                Health Report
              </Button>
              <Button variant="outline" className="h-14 rounded-2xl justify-start">
                <Calendar className="w-5 h-5 mr-2 text-primary" />
                Schedule
              </Button>
              <Button variant="outline" className="h-14 rounded-2xl justify-start">
                <Settings className="w-5 h-5 mr-2 text-primary" />
                Settings
              </Button>
            </div>
          </div>
        </>
      )}

      {activeTab === 'medications' && (
        <>
          {/* Today's Medications */}
          <div className="px-6 mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-3">Today&apos;s Schedule</h2>
            <div className="space-y-3">
              {medicationHistory.map((med, index) => (
                <Card key={index} className={`p-4 rounded-2xl border-border ${
                  med.status === 'due' ? 'border-l-4 border-l-primary' : ''
                }`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      med.status === 'taken' 
                        ? 'bg-pulse-success/10' 
                        : med.status === 'due'
                        ? 'bg-primary/10'
                        : 'bg-muted'
                    }`}>
                      {med.status === 'taken' ? (
                        <CheckCircle2 className="w-6 h-6 text-pulse-success" />
                      ) : (
                        <Pill className={`w-6 h-6 ${med.status === 'due' ? 'text-primary' : 'text-muted-foreground'}`} />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-foreground font-semibold">{med.name}</p>
                      <p className="text-muted-foreground text-sm">Scheduled: {med.time}</p>
                      {med.takenAt && (
                        <p className="text-pulse-success text-sm">Taken at {med.takenAt}</p>
                      )}
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                      med.status === 'taken' 
                        ? 'bg-pulse-success/10 text-pulse-success' 
                        : med.status === 'due'
                        ? 'bg-primary/10 text-primary'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {med.status}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Compliance Score */}
          <div className="px-6 mb-6">
            <Card className="p-4 rounded-2xl border-border bg-pulse-success/5 border-pulse-success/20">
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
                      strokeDasharray={`${averageCompliance * 1.76} 176`}
                      className="text-pulse-success"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-foreground font-bold text-sm">{averageCompliance}%</span>
                  </div>
                </div>
                <div>
                  <p className="text-foreground font-semibold">Weekly Compliance Score</p>
                  <p className="text-muted-foreground text-sm">Excellent medication adherence</p>
                </div>
              </div>
            </Card>
          </div>
        </>
      )}

      {activeTab === 'health' && (
        <>
          {/* Health Trends */}
          <div className="px-6 mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-3">Health Metrics</h2>
            <div className="space-y-3">
              {healthTrends.map((metric, index) => (
                <Card key={index} className="p-4 rounded-2xl border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">{metric.label}</p>
                      <p className="text-foreground font-bold text-xl">{metric.value}</p>
                    </div>
                    <div className="text-right">
                      <div className={`flex items-center gap-1 justify-end ${
                        metric.trendUp ? 'text-pulse-success' : 'text-pulse-warning'
                      }`}>
                        {metric.trendUp ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <TrendingDown className="w-4 h-4" />
                        )}
                        <span className="text-sm font-medium">{metric.trend}</span>
                      </div>
                      <span className={`text-xs capitalize ${
                        metric.status === 'good' 
                          ? 'text-pulse-success' 
                          : 'text-primary'
                      }`}>
                        {metric.status}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* AI Summary */}
          <div className="px-6 mb-6">
            <Card className="p-4 rounded-2xl border-border bg-primary/5 border-primary/20">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Activity className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-foreground font-semibold">AI Health Summary</p>
                  <p className="text-muted-foreground text-sm mt-1">
                    Margaret&apos;s health metrics are stable and within normal ranges. Sleep quality has improved by 15% this week. No anomalies detected in daily activity patterns.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </>
      )}

      {/* Emergency Contact Button */}
      <div className="px-6 pb-6">
        <Button 
          className="w-full h-14 rounded-2xl bg-destructive hover:bg-destructive/90"
        >
          <Phone className="w-5 h-5 mr-2" />
          Emergency Contact
        </Button>
      </div>
    </div>
  )
}
