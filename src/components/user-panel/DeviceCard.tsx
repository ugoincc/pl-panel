import { Battery, RefreshCw } from 'lucide-react'
import type { Device } from '@types'
import { StatusPill } from '@/components/panel/StatusPill'
import { Separator } from '@/components/ui/separator'

const METRICS = [
  { key: 'hr' as const, label: 'HR', unit: 'bpm' },
  { key: 'hrv' as const, label: 'HRV', unit: 'ms' },
  { key: 'spo2' as const, label: 'SpO2', unit: '%' },
  { key: 'stress' as const, label: 'Stress', unit: '/100' },
]

export function DeviceCard({ device }: { device: Device }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <p className="font-semibold text-sea-ink">{device.model}</p>
        <p className="text-xs text-muted-foreground">{device.id}</p>
        <StatusPill status={device.status} />
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Battery className="h-3.5 w-3.5" />
          <span>{device.battery}%</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <RefreshCw className="h-3.5 w-3.5" />
          <span>{device.lastSync}</span>
        </div>
      </div>
      <Separator />
      <div className="grid grid-cols-2 gap-3">
        {METRICS.map(({ key, label, unit }) => (
          <div
            key={key}
            className="rounded-lg border border-border bg-background p-3 flex flex-col gap-1 border-l-2 border-l-lagoon"
          >
            <div className="flex items-center gap-1 mb-1">
              <span className="inline-block h-2 w-2 rounded-full bg-lagoon animate-pulse" />
              <span className="text-xs text-muted-foreground">{label}</span>
            </div>
            <span className="text-2xl font-bold text-sea-ink">
              {device[key] ?? '--'}
            </span>
            <span className="text-xs text-muted-foreground">{unit}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
