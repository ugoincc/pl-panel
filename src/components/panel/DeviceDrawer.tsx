import type { Device } from '@types'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { StatusPill } from '@/components/panel/StatusPill'
import { BatteryCell } from '@/components/panel/BatteryCell'
import { Sparkline } from '@/components/panel/Sparkline'

export function DeviceDrawer({
  device,
  open,
  onClose,
}: {
  device: Device | null
  open: boolean
  onClose: () => void
}) {
  const hrSpark = device?.hr
    ? [
        device.hr - 8,
        device.hr - 4,
        device.hr + 2,
        device.hr - 1,
        device.hr + 5,
        device.hr,
        device.hr - 2,
      ]
    : null
  const hrvSpark = device?.hrv
    ? [
        device.hrv - 12,
        device.hrv - 5,
        device.hrv + 3,
        device.hrv - 2,
        device.hrv + 7,
        device.hrv,
        device.hrv - 4,
      ]
    : null

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent
        side='right'
        showCloseButton={false}
        className='dark w-[380px] bg-card border-border overflow-y-auto p-0 flex flex-col gap-0'
      >
        <SheetHeader className='px-6 py-5 border-b border-border flex-shrink-0'>
          <SheetTitle className='text-foreground text-[1.1rem]'>
            {device?.id ?? '—'}
          </SheetTitle>
          <p className='text-xs text-muted-foreground mt-1'>{device?.model}</p>
        </SheetHeader>

        {device && (
          <>
            <section className='px-6 py-4 border-b border-border'>
              <p className='text-[0.62rem] uppercase tracking-[0.14em] text-muted-foreground mb-3'>
                Status atual
              </p>
              <div className='flex items-center flex-wrap gap-2.5'>
                <StatusPill status={device.status} />
                <BatteryCell pct={device.battery} />
              </div>
            </section>

            <section className='px-6 py-4 border-b border-border'>
              <p className='text-[0.62rem] uppercase tracking-[0.14em] text-muted-foreground mb-3'>
                Informações
              </p>
              <div className='grid grid-cols-2 gap-2.5'>
                {(
                  [
                    ['Utilizador', device.userName ?? '—'],
                    ['Último sync', device.lastSync?.split(' ')[1] ?? '—'],
                    ['Data', device.lastSync?.split(' ')[0] ?? '—'],
                  ] as [string, string][]
                ).map(([label, val]) => (
                  <div key={label} className='flex flex-col gap-0.5'>
                    <span className='text-[0.65rem] text-muted-foreground tracking-[0.06em]'>
                      {label}
                    </span>
                    <span className='text-[0.82rem] text-foreground font-medium'>
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <section className='px-6 py-4 border-b border-border'>
              <p className='text-[0.62rem] uppercase tracking-[0.14em] text-muted-foreground mb-3'>
                Métricas ao vivo
              </p>
              <div className='grid grid-cols-2 gap-2.5 mb-3'>
                {[
                  {
                    label: 'FC',
                    val: device.hr ? `${device.hr} bpm` : '—',
                    highlight: !!device.hr,
                  },
                  {
                    label: 'HRV (RMSSD)',
                    val: device.hrv ? `${device.hrv} ms` : '—',
                    highlight: false,
                  },
                  {
                    label: 'SpO₂',
                    val: device.spo2 ? `${device.spo2}%` : '—',
                    highlight: false,
                  },
                  {
                    label: 'Estresse',
                    val: device.stress != null ? `${device.stress}/100` : '—',
                    highlight: false,
                  },
                ].map(({ label, val, highlight }) => (
                  <div key={label} className='flex flex-col gap-0.5'>
                    <span className='text-[0.65rem] text-muted-foreground'>
                      {label}
                    </span>
                    <span
                      className={`text-[0.82rem] font-medium ${highlight ? 'text-primary' : 'text-foreground'}`}
                    >
                      {val}
                    </span>
                  </div>
                ))}
              </div>
              {hrSpark && (
                <div className='mt-3'>
                  <p className='text-[0.65rem] text-muted-foreground mb-2'>
                    FC — últimas 7 leituras
                  </p>
                  <Sparkline vals={hrSpark} />
                </div>
              )}
              {hrvSpark && (
                <div className='mt-3'>
                  <p className='text-[0.65rem] text-muted-foreground mb-2'>
                    HRV — últimas 7 leituras
                  </p>
                  <Sparkline vals={hrvSpark} color='#7B8FD4' />
                </div>
              )}
            </section>

            <div className='px-6 py-4 flex flex-col gap-2'>
              <Button className='w-full'>Forçar sincronização</Button>
              <Button variant='outline' className='w-full'>
                Exportar dados
              </Button>
              <Button variant='outline' className='w-full'>
                Editar vínculo
              </Button>
              <Button variant='destructive' className='w-full'>
                Desvincular dispositivo
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
