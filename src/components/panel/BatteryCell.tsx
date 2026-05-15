import { cn } from '#/lib/utils'

export function BatteryCell({ pct }: { pct: number }) {
  const colorClass =
    pct > 50 ? 'text-primary' : pct > 20 ? 'text-amber-400' : 'text-red-400'
  const barClass =
    pct > 50 ? 'bg-primary' : pct > 20 ? 'bg-amber-400' : 'bg-red-400'
  return (
    <div className='flex items-center gap-1.5'>
      <div className='w-9 h-[9px] border border-border rounded-sm relative overflow-hidden'>
        <div
          className={cn('absolute inset-y-0 left-0 transition-[width] duration-300', barClass)}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className={cn('text-[0.72rem]', colorClass)}>{pct}%</span>
    </div>
  )
}
