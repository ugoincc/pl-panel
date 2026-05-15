import { cn } from '#/lib/utils'

const STATUS_CONFIG: Record<
  string,
  { pill: string; dot: string; label: string; dotClass?: string }
> = {
  online: {
    pill: 'bg-primary/10 text-primary',
    dot: 'bg-primary',
    label: 'Online',
    dotClass: 'admin-dot-online',
  },
  offline: {
    pill: 'bg-red-400/10 text-red-400',
    dot: 'bg-red-400',
    label: 'Offline',
  },
  syncing: {
    pill: 'bg-amber-400/10 text-amber-400',
    dot: 'bg-amber-400',
    label: 'Sincronizando',
    dotClass: 'admin-dot-syncing',
  },
  ativo: {
    pill: 'bg-primary/10 text-primary',
    dot: 'bg-primary',
    label: 'Ativo',
    dotClass: 'admin-dot-online',
  },
  pausado: {
    pill: 'bg-amber-400/10 text-amber-400',
    dot: 'bg-amber-400',
    label: 'Pausado',
  },
  concluído: {
    pill: 'bg-red-400/10 text-red-400',
    dot: 'bg-red-400',
    label: 'Concluído',
  },
}

export function StatusPill({ status }: { status: string }) {
  const c = STATUS_CONFIG[status] ?? {
    pill: 'bg-muted text-muted-foreground',
    dot: 'bg-muted-foreground',
    label: status,
  }
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2 py-0.5 text-[0.66rem] font-medium tracking-[0.06em] uppercase',
        c.pill,
      )}
    >
      <span
        className={cn('size-[5px] rounded-full shrink-0', c.dotClass, c.dot)}
        style={c.dotClass ? { boxShadow: '0 0 4px currentColor' } : undefined}
      />
      {c.label}
    </span>
  )
}
