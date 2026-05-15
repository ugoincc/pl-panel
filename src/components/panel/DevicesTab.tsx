import { useState } from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  type RowSelectionState,
  type SortingState,
  type FilterFn,
} from '@tanstack/react-table'
import { ArrowDown, ArrowUp, ArrowUpDown, Eye, RefreshCw, Trash2 } from 'lucide-react'
import type { Device } from '@types'
import { DEVICES } from '@api/data/mockData'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
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

const deviceGlobalFilter: FilterFn<Device> = (row, _columnId, filterValue: string) => {
  const q = filterValue.toLowerCase()
  return (
    row.original.id.toLowerCase().includes(q) ||
    row.original.participant.toLowerCase().includes(q) ||
    row.original.study.toLowerCase().includes(q)
  )
}

function SortIcon({ sorted }: { sorted: false | 'asc' | 'desc' }) {
  if (sorted === 'asc') return <ArrowUp className='ml-1 size-3' />
  if (sorted === 'desc') return <ArrowDown className='ml-1 size-3' />
  return <ArrowUpDown className='ml-1 size-3 opacity-40' />
}

export function DevicesTab({
  onViewDevice,
}: {
  onViewDevice: (device: Device) => void
}) {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')

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
      header: ({ column }) => (
        <button
          className='flex items-center text-muted-foreground hover:text-foreground'
          onClick={() => column.toggleSorting()}
        >
          Dispositivo
          <SortIcon sorted={column.getIsSorted()} />
        </button>
      ),
      enableSorting: true,
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
      header: ({ column }) => (
        <button
          className='flex items-center text-muted-foreground hover:text-foreground'
          onClick={() => column.toggleSorting()}
        >
          Status
          <SortIcon sorted={column.getIsSorted()} />
        </button>
      ),
      enableSorting: true,
      cell: ({ getValue }) => <StatusPill status={getValue()} />,
    }),
    columnHelper.accessor('battery', {
      header: ({ column }) => (
        <button
          className='flex items-center text-muted-foreground hover:text-foreground'
          onClick={() => column.toggleSorting()}
        >
          Bateria
          <SortIcon sorted={column.getIsSorted()} />
        </button>
      ),
      enableSorting: true,
      cell: ({ getValue }) => <BatteryCell pct={getValue()} />,
    }),
    columnHelper.accessor('hrv', {
      id: 'hrv',
      header: 'HRV',
      enableSorting: false,
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
      enableSorting: false,
      cell: ({ getValue }) => (
        <span className='text-[0.75rem] text-foreground'>{getValue()}</span>
      ),
    }),
    columnHelper.accessor('study', {
      header: 'Estudo',
      enableSorting: false,
      cell: ({ getValue }) => (
        <span className='text-[0.75rem] text-muted-foreground'>{getValue()}</span>
      ),
    }),
    columnHelper.accessor('lastSync', {
      header: ({ column }) => (
        <button
          className='flex items-center text-muted-foreground hover:text-foreground'
          onClick={() => column.toggleSorting()}
        >
          Último Sync
          <SortIcon sorted={column.getIsSorted()} />
        </button>
      ),
      enableSorting: true,
      cell: ({ getValue }) => {
        const val = getValue()
        if (!val) return <span className='text-muted-foreground'>—</span>
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
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: deviceGlobalFilter,
    state: { rowSelection, sorting, globalFilter },
  })

  return (
    <div className='flex flex-col gap-4 p-6'>
      <Input
        placeholder='Buscar dispositivo...'
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        className='max-w-xs bg-card border-border text-foreground placeholder:text-muted-foreground'
      />
      <div className='rounded-md border border-border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className='border-border hover:bg-muted/50'
              >
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className='text-[0.63rem] uppercase tracking-[0.1em]'>
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
