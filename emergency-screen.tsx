"use client"

import { useApp } from '@/lib/app-context'
import { SplashScreen } from '@/components/screens/splash-screen'
import { OnboardingScreen } from '@/components/screens/onboarding-screen'
import { LoginScreen } from '@/components/screens/login-screen'
import { SignupScreen } from '@/components/screens/signup-screen'
import { DashboardScreen } from '@/components/screens/dashboard-screen'
import { MedicationsScreen } from '@/components/screens/medications-screen'
import { MedicationDetailScreen } from '@/components/screens/medication-detail-screen'
import { DispenserScreen } from '@/components/screens/dispenser-screen'
import { HealthScreen } from '@/components/screens/health-screen'
import { EmergencyScreen } from '@/components/screens/emergency-screen'
import { SOSScreen } from '@/components/screens/sos-screen'
import { InsightsScreen } from '@/components/screens/insights-screen'
import { ProfileScreen } from '@/components/screens/profile-screen'
import { GuardianPanelScreen } from '@/components/screens/guardian-panel-screen'
import { BottomNav } from '@/components/navigation/bottom-nav'

export function PulseMateApp() {
  const { currentScreen, isLoggedIn, userRole } = useApp()

  // Screens that should show bottom nav
  const showBottomNav = isLoggedIn && 
    userRole !== 'guardian' &&
    ['dashboard', 'medications', 'medication-detail', 'dispenser', 'health', 'emergency', 'insights', 'profile'].includes(currentScreen)

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen />
      case 'onboarding':
        return <OnboardingScreen />
      case 'login':
        return <LoginScreen />
      case 'signup':
        return <SignupScreen />
      case 'dashboard':
        return <DashboardScreen />
      case 'medications':
        return <MedicationsScreen />
      case 'medication-detail':
        return <MedicationDetailScreen />
      case 'dispenser':
        return <DispenserScreen />
      case 'health':
        return <HealthScreen />
      case 'emergency':
        return <EmergencyScreen />
      case 'sos':
        return <SOSScreen />
      case 'insights':
        return <InsightsScreen />
      case 'profile':
        return <ProfileScreen />
      case 'guardian-panel':
        return <GuardianPanelScreen />
      default:
        return <SplashScreen />
    }
  }

  return (
    <div className="min-h-dvh bg-background">
      {renderScreen()}
      {showBottomNav && <BottomNav />}
    </div>
  )
}
