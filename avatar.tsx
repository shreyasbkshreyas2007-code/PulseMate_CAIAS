import { useState } from 'react'
import { useApp, UserRole } from '@/lib/app-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Heart, ArrowLeft, ArrowRight, Eye, EyeOff } from 'lucide-react'

export function SignupScreen() {
  const { setCurrentScreen, setUserRole, setIsLoggedIn, setUserName } = useApp()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [age, setAge] = useState('')

  const handleSignup = () => {
    setUserName(name || 'User')
    setIsLoggedIn(true)
    setCurrentScreen('dashboard')
  }

  return (
    <div className="min-h-screen flex flex-col p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => setCurrentScreen('login')}
          className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Create Account</h1>
          <p className="text-muted-foreground text-sm">Join PulseMate today</p>
        </div>
      </div>

      {/* Form */}
      <div className="space-y-4 flex-1">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Full Name</label>
          <Input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-14 rounded-2xl text-lg bg-card border-border"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Age</label>
          <Input
            type="number"
            placeholder="Enter your age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="h-14 rounded-2xl text-lg bg-card border-border"
          />
        </div>
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
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-14 rounded-2xl text-lg pr-12 bg-card border-border"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="space-y-4 pb-8 pt-6">
        <Button onClick={handleSignup} className="w-full h-14 rounded-2xl text-lg font-semibold gradient-primary border-0">
          Create Account
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <button onClick={() => setCurrentScreen('login')} className="text-primary font-medium">Sign In</button>
        </p>
      </div>
    </div>
  )
}
