"use client"

import { useState, useEffect } from 'react'
import { useApp } from '@/lib/app-context'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  ArrowLeft, 
  Pill, 
  Volume2,
  VolumeX,
  CheckCircle2,
  Clock,
  RefreshCw,
  Settings,
  Power,
  Wifi,
  Battery
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
    
    // Simulate dispensing
    setTimeout(() => {
      setIsDispensing(false)
    }, 3000)
  }

  return (
    <div className="mobile-frame min-h-dvh bg-background pb-24 safe-area-top">
      {/* Header */}
      <div className="px-6 pt-4 pb-2">
        <button 
          onClick={() => setCurrentScreen('medications')}
          className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
      </div>

      <div className="px-6 pb-4">
        <h1 className="text-2xl font-bold text-foreground">Smart Dispenser</h1>
        <p className="text-muted-foreground">Virtual medicine dispenser simulation</p>
      </div>

      {/* Dispenser Status */}
      <div className="px-6 mb-6">
        <Card className="p-5 rounded-3xl border-border bg-gradient-to-br from-card to-muted">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-pulse-success flex items-center justify-center">
                <Power className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-foreground font-semibold">Dispenser Online</p>
                <p className="text-pulse-success text-sm">Connected & Ready</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-xl"
              onClick={() => setVoiceEnabled(!voiceEnabled)}
            >
              {voiceEnabled ? (
                <Volume2 className="w-5 h-5 text-primary" />
              ) : (
                <VolumeX className="w-5 h-5 text-muted-foreground" />
              )}
            </Button>
          </div>
          
          {/* Status indicators */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Wifi className="w-4 h-4 text-pulse-success" />
              <span className="text-muted-foreground text-sm">WiFi</span>
            </div>
            <div className="flex items-center gap-2">
              <Battery className="w-4 h-4 text-pulse-success" />
              <span className="text-muted-foreground text-sm">100%</span>
            </div>
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground text-sm">Synced</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Dispenser Visualization */}
      <div className="px-6 mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-3">Medicine Slots</h2>
        <Card className="p-4 rounded-3xl border-border bg-muted/50">
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
                  className={`relative p-4 rounded-2xl border-2 transition-all ${
                    isCurrentDispensing
                      ? 'border-primary bg-primary/5 animate-pulse'
                      : 'border-border bg-card hover:border-primary/30'
                  }`}
                >
                  {/* Slot number */}
                  <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-muted text-muted-foreground text-xs font-bold flex items-center justify-center">
                    {slot.id}
                  </div>
                  
                  {/* Pill icon */}
                  <div className={`w-12 h-12 mx-auto rounded-xl ${slot.color} flex items-center justify-center mb-3 ${
                    isCurrentDispensing ? 'animate-bounce' : ''
                  }`}>
                    <Pill className="w-6 h-6 text-white" />
                  </div>
                  
                  {/* Medication info */}
                  <p className="text-foreground font-semibold text-sm text-center truncate">
                    {slot.medication}
                  </p>
                  <p className="text-muted-foreground text-xs text-center">{slot.dosage}</p>
                  
                  {/* Quantity indicator */}
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className={isLow ? 'text-pulse-warning font-medium' : 'text-muted-foreground'}>
                        {slot.quantity} left
                      </span>
                      {isLow && <span className="text-pulse-warning">Low</span>}
                    </div>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all ${
                          isLow ? 'bg-pulse-warning' : 'bg-pulse-success'
                        }`}
                        style={{ width: `${fillPercentage}%` }}
                      />
                    </div>
                  </div>
                  
                  {/* Next dispense */}
                  <div className="flex items-center justify-center gap-1 mt-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {slot.nextDispense}
                  </div>
                  
                  {/* Dispensing overlay */}
                  {isCurrentDispensing && (
                    <div className="absolute inset-0 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-8 h-8 mx-auto rounded-full border-2 border-primary border-t-transparent animate-spin mb-2" />
                        <p className="text-primary text-xs font-medium">Dispensing...</p>
                      </div>
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </Card>
      </div>

      {/* Voice Reminder Demo */}
      <div className="px-6 mb-6">
        <Card className="p-4 rounded-2xl border-border bg-primary/5 border-primary/20">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center animate-pulse-glow">
              <Volume2 className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-foreground font-semibold">Voice Reminder Active</p>
              <p className="text-muted-foreground text-sm">
                &quot;It&apos;s time for your Lisinopril. Please take one 10mg tablet.&quot;
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Dispensing Confirmation */}
      {dispensedSlot && !isDispensing && (
        <div className="px-6 mb-6">
          <Card className="p-4 rounded-2xl border-pulse-success bg-pulse-success/10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-pulse-success flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-foreground font-semibold">Medication Dispensed!</p>
                <p className="text-muted-foreground text-sm">
                  {dispenserSlots.find(s => s.id === dispensedSlot)?.medication} from Slot {dispensedSlot}
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Quick Actions */}
      <div className="px-6 mb-6">
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="h-14 rounded-2xl">
            <RefreshCw className="w-5 h-5 mr-2" />
            Refill Alert
          </Button>
          <Button variant="outline" className="h-14 rounded-2xl">
            <Settings className="w-5 h-5 mr-2" />
            Settings
          </Button>
        </div>
      </div>
    </div>
  )
}
