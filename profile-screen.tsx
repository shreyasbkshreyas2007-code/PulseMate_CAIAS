"use client"

import { useState } from 'react'
import { useApp, UserRole } from '@/lib/app-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Heart, User, Stethoscope, Users, Eye, EyeOff, ArrowRight } from 'lucide-react'

const roles: { id: UserRole; label: string; icon: typeof User; description: string }[] = [
  { id: 'elderly', label: 'Patient', icon: User, description: 'I need health monitoring' },
  { id: 'guardian', label: 'Guardian', icon: Users, description: 'I care for a loved one' },
  { id: 'doctor', label: 'Doctor', icon: Stethoscope, description: 'I manage patient care' },
]

export function LoginScreen() {
  const { setCurrentScreen, setUserRole, setIsLoggedIn, userRole } = useApp()
  const [selectedRole, setSelectedRole] = useState<UserRole>('elderly')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = () => {
    setUserRole(selectedRole)
    setIsLoggedIn(true)
    setCurrentScreen(selectedRole === 'guardian' ? 'guardian-panel' : 'dashboard')
  }

  const handleSignup = () => {
    setCurrentScreen('signup')
  }

  return (
    <div className="mobile-frame flex flex-col min-h-dvh bg-background safe-area-top safe-area-bottom">
      {/* Header */}
      <div className="px-6 pt-8 pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">PulseMate</h1>
            <p className="text-muted-foreground text-sm">Welcome back</p>
          </div>
        </div>
      </div>

      {/* Role Selection */}
      <div className="px-6 py-4">
        <p className="text-sm font-medium text-foreground mb-3">I am a...</p>
        <div className="grid grid-cols-3 gap-3">
          {roles.map((role) => {
            const Icon = role.icon
            const isSelected = selectedRole === role.id
            return (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`p-4 rounded-2xl border-2 transition-all duration-200 flex flex-col items-center gap-2 ${
                  isSelected 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border bg-card hover:border-muted-foreground/30'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-sm font-medium ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                  {role.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 px-6 py-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Email</label>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-14 rounded-xl text-lg bg-card border-border"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Password</label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-14 rounded-xl text-lg pr-12 bg-card border-border"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button className="text-sm text-primary font-medium hover:underline">
              Forgot password?
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 pb-8 space-y-4">
        <Button 
          onClick={handleLogin}
          className="w-full h-14 text-lg font-semibold rounded-2xl gradient-primary border-0"
        >
          Sign In
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-background text-muted-foreground">or</span>
          </div>
        </div>

        <Button 
          variant="outline"
          onClick={handleSignup}
          className="w-full h-14 text-lg font-semibold rounded-2xl"
        >
          Create Account
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          By continuing, you agree to our{' '}
          <button className="text-primary hover:underline">Terms</button>
          {' '}and{' '}
          <button className="text-primary hover:underline">Privacy Policy</button>
        </p>
      </div>
    </div>
  )
}
