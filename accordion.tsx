"use client"

import { useState } from 'react'
import { useApp, UserRole } from '@/lib/app-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Heart, User, Stethoscope, Users, Eye, EyeOff, ArrowRight, ArrowLeft, Check } from 'lucide-react'

const roles: { id: UserRole; label: string; icon: typeof User; description: string }[] = [
  { id: 'elderly', label: 'Patient', icon: User, description: 'I need health monitoring' },
  { id: 'guardian', label: 'Guardian', icon: Users, description: 'I care for a loved one' },
  { id: 'doctor', label: 'Doctor', icon: Stethoscope, description: 'I manage patient care' },
]

export function SignupScreen() {
  const { setCurrentScreen, setUserRole, setIsLoggedIn, setUserName } = useApp()
  const [selectedRole, setSelectedRole] = useState<UserRole>('elderly')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSignup = () => {
    setUserRole(selectedRole)
    setUserName(name || 'Margaret')
    setIsLoggedIn(true)
    setCurrentScreen(selectedRole === 'guardian' ? 'guardian-panel' : 'dashboard')
  }

  const handleBack = () => {
    setCurrentScreen('login')
  }

  const passwordStrength = () => {
    if (password.length === 0) return { level: 0, text: '' }
    if (password.length < 6) return { level: 1, text: 'Weak' }
    if (password.length < 10) return { level: 2, text: 'Medium' }
    return { level: 3, text: 'Strong' }
  }

  const strength = passwordStrength()

  return (
    <div className="mobile-frame flex flex-col min-h-dvh bg-background safe-area-top safe-area-bottom">
      {/* Header */}
      <div className="px-6 pt-4 pb-2">
        <button 
          onClick={handleBack}
          className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
      </div>

      <div className="px-6 pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Create Account</h1>
            <p className="text-muted-foreground text-sm">Join the PulseMate family</p>
          </div>
        </div>
      </div>

      {/* Role Selection */}
      <div className="px-6 py-3">
        <p className="text-sm font-medium text-foreground mb-3">I am a...</p>
        <div className="grid grid-cols-3 gap-3">
          {roles.map((role) => {
            const Icon = role.icon
            const isSelected = selectedRole === role.id
            return (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`p-3 rounded-2xl border-2 transition-all duration-200 flex flex-col items-center gap-2 ${
                  isSelected 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border bg-card hover:border-muted-foreground/30'
                }`}
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                  isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className={`text-xs font-medium ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                  {role.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 px-6 py-3 overflow-auto">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Full Name</label>
            <Input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-13 rounded-xl text-base bg-card border-border"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Email</label>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-13 rounded-xl text-base bg-card border-border"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Password</label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-13 rounded-xl text-base pr-12 bg-card border-border"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            
            {/* Password strength indicator */}
            {password.length > 0 && (
              <div className="flex items-center gap-2 mt-2">
                <div className="flex-1 flex gap-1">
                  {[1, 2, 3].map((level) => (
                    <div
                      key={level}
                      className={`h-1.5 flex-1 rounded-full transition-colors ${
                        level <= strength.level
                          ? strength.level === 1
                            ? 'bg-destructive'
                            : strength.level === 2
                            ? 'bg-pulse-warning'
                            : 'bg-pulse-success'
                          : 'bg-muted'
                      }`}
                    />
                  ))}
                </div>
                <span className={`text-xs font-medium ${
                  strength.level === 1
                    ? 'text-destructive'
                    : strength.level === 2
                    ? 'text-pulse-warning'
                    : 'text-pulse-success'
                }`}>
                  {strength.text}
                </span>
              </div>
            )}
          </div>

          {/* Features checklist */}
          <div className="pt-2 space-y-2">
            {[
              '24/7 AI health monitoring',
              'Smart medication reminders',
              'Emergency SOS system',
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-5 h-5 rounded-full bg-pulse-success/20 flex items-center justify-center">
                  <Check className="w-3 h-3 text-pulse-success" />
                </div>
                {feature}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 pb-8 pt-4 space-y-4">
        <Button 
          onClick={handleSignup}
          className="w-full h-14 text-lg font-semibold rounded-2xl gradient-primary border-0"
        >
          Create Account
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <button onClick={handleBack} className="text-primary font-medium hover:underline">
            Sign In
          </button>
        </p>
      </div>
    </div>
  )
}
