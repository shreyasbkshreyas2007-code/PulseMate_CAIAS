import { useState } from 'react'
import { useApp } from '@/lib/app-context'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  ArrowLeft, Pill, Volume2, VolumeX, CheckCircle2,
  Clock, RefreshCw, Settings, Power, Wifi, Battery
} from 'lucide-react'

const dispenserSlots = [
  { id: 1, medication: 'Metformin', dosage: '500mg', quantity: 28, maxQuantity: 30, color: 'bg-primary', nextDispense: '8:00 PM' },
  { id: 2, medication: 'Lisinopril', dosage: '10mg', quantity: 15, maxQuantity: 30, color: 'bg-accent', nextDispense: '12:00 PM' },
  { id: 3, medication: 'Aspirin', dosage: '81mg', quantity: 25, maxQuantity: 30, color: 'bg-pulse-warning', nextDispense: '8:00 PM' },
  { id: 4, medication: 'Vitamin D', dosage: '1000 IU', quantity: 8, maxQuantity: 30, color: 'bg-pulse-success', nextDispense: 'Tomorrow' },
]

export function DispenserScreen() {
  const { setCurrentScreen } = useApp()
  const [isDispensing, setIsDispensing] = useState(false)
  const [dispensedSlot, setDispensedSlot] = useState<number | null>(null)
  const [voiceEnabled, setVoiceEnabled] = useState(true)

  const handleDispense = (slotId: number) => {
    setIsDispensing(true)
    setDispensedSlot(slotId)
    setTimeout(() => {
      setIsDispensing(false)
    }, 3000)
  }

  return (
    <div className="screen-container">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setCurrentScreen('medications')}
          className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground">Smart Dispenser</h1>
          <p className="text-sm text-muted-foreground">Virtual medicine dispenser simulation</p>
        </div>
      </div>

      {/* Dispenser Status */}
      <Card className="p-5 rounded-3xl glass-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-pulse-success animate-pulse" />
            <div>
              <p className="font-semibold text-foreground">Dispenser Online</p>
              <p className="text-xs text-muted-foreground">Connected & Ready</p>
            </div>
          </div>
          <button onClick={() => setVoiceEnabled(!voiceEnabled)} className="p-2 rounded-xl bg-muted">
            {voiceEnabled ? <Volume2 className="w-5 h-5 text-primary" /> : <VolumeX className="w-5 h-5 text-muted-foreground" />}
          </button>
        </div>
        <div className="flex gap-4 mt-4">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Wifi className="w-3.5 h-3.5 text-pulse-success" />
            WiFi
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Battery className="w-3.5 h-3.5 text-pulse-success" />
            100%
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <RefreshCw className="w-3.5 h-3.5 text-pulse-success" />
            Synced
          </div>
        </div>
      </Card>

      {/* Dispenser Visualization */}
      <div>
        <h2 className="font-semibold text-foreground mb-3">Medicine Slots</h2>
        <div className="grid grid-cols-2 gap-3">
          {dispenserSlots.map((slot) => {
            const isLow = slot.quantity < 10
            const fillPercentage = (slot.quantity / slot.maxQuantity) * 100
            const isCurrentDispensing = isDispensing && dispensedSlot === slot.id

            return (
              <button
                key={slot.id}
                onClick={() => !isDispensing && handleDispense(slot.id)}
                disabled={isDispensing}
                className={`relative p-4 rounded-2xl border-2 transition-all text-left ${
                  isCurrentDispensing
                    ? 'border-primary bg-primary/5 animate-pulse'
                    : 'border-border bg-card hover:border-primary/30'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-muted-foreground">#{slot.id}</span>
                  <Pill className={`w-5 h-5 ${isCurrentDispensing ? 'text-primary' : 'text-muted-foreground'}`} />
                </div>
                <p className="font-semibold text-foreground text-sm">{slot.medication}</p>
                <p className="text-xs text-muted-foreground">{slot.dosage}</p>

                {/* Quantity */}
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-muted-foreground">{slot.quantity} left</span>
                    {isLow && <span className="text-destructive font-medium">Low</span>}
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${isLow ? 'bg-destructive' : 'bg-pulse-success'}`}
                      style={{ width: `${fillPercentage}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {slot.nextDispense}
                </div>

                {isCurrentDispensing && (
                  <div className="absolute inset-0 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-1" />
                      <span className="text-xs font-medium text-primary">Dispensing...</span>
                    </div>
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Voice Reminder Demo */}
      <Card className="p-4 rounded-2xl border-primary/20 bg-primary/5">
        <div className="flex items-center gap-2 mb-2">
          <Volume2 className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold text-primary">Voice Reminder Active</span>
        </div>
        <p className="text-sm text-foreground italic">
          "It's time for your Lisinopril. Please take one 10mg tablet."
        </p>
      </Card>

      {/* Dispensing Confirmation */}
      {dispensedSlot && !isDispensing && (
        <Card className="p-4 rounded-2xl border-pulse-success/30 bg-pulse-success/5">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-pulse-success" />
            <div>
              <p className="font-semibold text-pulse-success">Medication Dispensed!</p>
              <p className="text-sm text-muted-foreground">
                {dispenserSlots.find(s => s.id === dispensedSlot)?.medication} from Slot {dispensedSlot}
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" className="h-12 rounded-2xl border-border">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refill Alert
        </Button>
        <Button variant="outline" className="h-12 rounded-2xl border-border">
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Button>
      </div>
    </div>
  )
}
