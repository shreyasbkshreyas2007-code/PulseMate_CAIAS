import { useApp } from '@/lib/app-context'
import { SplashScreen } from '@/components/screens/SplashScreen'
import { OnboardingScreen } from '@/components/screens/OnboardingScreen'
import { LoginScreen } from '@/components/screens/LoginScreen'
import { SignupScreen } from '@/components/screens/SignupScreen'
import { DashboardScreen } from '@/components/screens/DashboardScreen'
import { MedicationsScreen } from '@/components/screens/MedicationsScreen'
import { MedicationDetailScreen } from '@/components/screens/MedicationDetailScreen'
import { DispenserScreen } from '@/components/screens/DispenserScreen'
import { HealthScreen } from '@/components/screens/HealthScreen'
import { EmergencyScreen } from '@/components/screens/EmergencyScreen'
import { SOSScreen } from '@/components/screens/SOSScreen'
import { InsightsScreen } from '@/components/screens/InsightsScreen'
import { ProfileScreen } from '@/components/screens/ProfileScreen'
import { GuardianPanelScreen } from '@/components/screens/GuardianPanelScreen'
import { BottomNav } from '@/components/navigation/BottomNav'

export function PulseMateApp() {
  const { currentScreen, isLoggedIn, userRole } = useApp()

  const showBottomNav = isLoggedIn &&
    userRole !== 'guardian' &&
    ['dashboard', 'medications', 'medication-detail', 'dispenser', 'health', 'emergency', 'insights', 'profile'].includes(currentScreen)

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash': return <SplashScreen />
      case 'onboarding': return <OnboardingScreen />
      case 'login': return <LoginScreen />
      case 'signup': return <SignupScreen />
      case 'dashboard': return <DashboardScreen />
      case 'medications': return <MedicationsScreen />
      case 'medication-detail': return <MedicationDetailScreen />
      case 'dispenser': return <DispenserScreen />
      case 'health': return <HealthScreen />
      case 'emergency': return <EmergencyScreen />
      case 'sos': return <SOSScreen />
      case 'insights': return <InsightsScreen />
      case 'profile': return <ProfileScreen />
      case 'guardian-panel': return <GuardianPanelScreen />
      default: return <DashboardScreen />
    }
  }

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative overflow-x-hidden">
      {renderScreen()}
      {showBottomNav && <BottomNav />}
    </div>
  )
}
