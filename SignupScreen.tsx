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
  const { setCurrentScreen, setUserRole, setIsLoggedIn, setUserName } = useApp()
  const [selectedRole, setSelectedRole] = useState<UserRole>('elderly')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = () => {
    setUserRole(selectedRole)
    setIsLoggedIn(true)
    setUserName(email.split('@')[0] || 'User')
    setCurrentScreen(selectedRole === 'guardian' ? 'guardian-panel' : 'dashboard')
  }

  return (
    <div className="min-h-screen flex flex-col p-6">
      {/* Header */}
      <div className="flex flex-col items-center gap-2 pt-8 pb-6">
        <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mb-2">
          <Heart className="w-7 h-7 text-primary-foreground" />
        </div>
        <h1 className="text-3xl font-bold text-foreground">PulseMate</h1>
        <p className="text-muted-foreground">Welcome back</p>
      </div>

      {/* Role Selection */}
      <div className="space-y-3 mb-6">
        <p className="text-sm font-medium text-muted-foreground">I am a...</p>
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
                <Icon className={`w-6 h-6 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                <span className={`text-sm font-medium ${isSelected ? 'text-primary' : 'text-muted-foreground'}`}>
                  {role.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Form */}
      <div className="space-y-4 flex-1">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Email</label>
          <Input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-14 rounded-2xl text-lg bg-card border-border"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Password</label>
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-14 rounded-2xl text-lg pr-12 bg-card border-border"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          <button className="text-sm text-primary font-medium">Forgot password?</button>
        </div>
      </div>

      {/* Footer */}
      <div className="space-y-4 pb-8 pt-6">
        <Button onClick={handleLogin} className="w-full h-14 rounded-2xl text-lg font-semibold gradient-primary border-0">
          Sign In
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>

        <div className="text-center text-muted-foreground text-sm">or</div>

        <Button
          variant="outline"
          onClick={() => setCurrentScreen('signup')}
          className="w-full h-14 rounded-2xl text-lg font-medium border-border"
        >
          Create Account
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          By continuing, you agree to our{' '}
          <span className="text-primary">Terms</span>
          {' '}and{' '}
          <span className="text-primary">Privacy Policy</span>
        </p>
      </div>
    </div>
  )
}
