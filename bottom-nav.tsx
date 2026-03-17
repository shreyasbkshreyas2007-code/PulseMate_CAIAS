import { AppProvider } from '@/lib/app-context'
import { PulseMateApp } from '@/components/pulse-mate-app'

export default function Home() {
  return (
    <AppProvider>
      <PulseMateApp />
    </AppProvider>
  )
}
