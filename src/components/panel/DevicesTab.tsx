import { useState } from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  type RowSelectionState,
} from '@tanstack/react-table'
import { Eye, RefreshCw, Trash2 } from 'lucide-react'
import type { Device } from '@types'
import { DEVICES } from '@api/data/mockData'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { StatusPill } from '@/components/panel/StatusPill'
import { BatteryCell } from '@/components/panel/BatteryCell'
import { Sparkline } from '@/components/panel/Sparkline'

const columnHelper = createColumnHelper<Device>()

export function DevicesTab({
  onViewDevice,
}: {
  onViewDevice: (device: Device) => void
}) {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  const columns = [
    columnHelper.display({
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
          aria-label='Selecionar todos'
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={row.getToggleSelectedHandler()}
          aria-label='Selecionar linha'
        />
      ),
    }),
    columnHelper.accessor('id', {
      header: 'Dispositivo',
      cell: ({ row }) => (
        <div>
          <div className='font-medium text-foreground text-[0.78rem]'>
            {row.original.id}
          </div>
          <div className='text-muted-foreground text-[0.68rem]'>
            {row.original.model}
          </div>
        </div>
      ),
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: ({ getValue }) => <StatusPill status={getValue()} />,
    }),
    columnHelper.accessor('battery', {
      header: 'Bateria',
      cell: ({ getValue }) => <BatteryCell pct={getValue()} />,
    }),
    columnHelper.accessor('hrv', {
      id: 'hrv',
      header: 'HRV',
      cell: ({ getValue }) => {
        const hrv = getValue()
        if (!hrv)
          return (
            <span className='text-muted-foreground text-[0.7rem]'>—</span>
          )
        const vals = [hrv - 12, hrv - 5, hrv + 3, hrv - 2, hrv + 7, hrv]
        return <Sparkline vals={vals} h={24} />
      },
    }),
    columnHelper.accessor('participant', {
      header: 'Participante',
      cell: ({ getValue }) => (
        <span className='text-[0.75rem] text-foreground'>{getValue()}</span>
      ),
    }),
    columnHelper.accessor('study', {
      header: 'Estudo',
      cell: ({ getValue }) => (
        <span className='text-[0.75rem] text-muted-foreground'>{getValue()}</span>
      ),
    }),
    columnHelper.accessor('lastSync', {
      header: 'Último Sync',
      cell: ({ getValue }) => {
        const val = getValue()
        if (!val)
          return <span className='text-muted-foreground'>—</span>
        const [date, time] = val.split(' ')
        return (
          <div>
            <div className='text-[0.72rem] text-foreground'>{time}</div>
            <div className='text-[0.65rem] text-muted-foreground'>{date}</div>
          </div>
        )
      },
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Ações',
      cell: ({ row }) => (
        <div className='flex gap-1'>
          <Button
            variant='ghost'
            size='icon-xs'
            onClick={() => onViewDevice(row.original)}
          >
            <Eye />
          </Button>
          <Button variant='ghost' size='icon-xs'>
            <RefreshCw />
          </Button>
          <Button variant='ghost' size='icon-xs'>
            <Trash2 />
          </Button>
        </div>
      ),
    }),
  ]

  const table = useReactTable({
    data: DEVICES,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
  })

  return (
    <div className='flex flex-col gap-4 p-6'>
      <div className='rounded-md border border-border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className='border-border hover:bg-muted/50'
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className='text-muted-foreground text-[0.63rem] uppercase tracking-[0.1em]'
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                className='border-border hover:bg-muted/30 data-[state=selected]:bg-primary/10'
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className='py-2.5'>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
