import { useState } from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  type FilterFn,
  type RowSelectionState,
  type SortingState,
} from '@tanstack/react-table'
import { ArrowDown, ArrowUp, ArrowUpDown, Eye, Pencil, Trash2 } from 'lucide-react'
import type { Study } from '@types'
import { STUDIES } from '@api/data/mockData'
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

const columnHelper = createColumnHelper<Study>()

const studyGlobalFilter: FilterFn<Study> = (row, _columnId, filterValue: string) => {
  const q = filterValue.toLowerCase()
  return (
    row.original.id.toLowerCase().includes(q) ||
    row.original.title.toLowerCase().includes(q) ||
    row.original.pi.toLowerCase().includes(q)
  )
}

function SortIcon({ sorted }: { sorted: false | 'asc' | 'desc' }) {
  if (sorted === 'asc') return <ArrowUp className='ml-1 size-3' />
  if (sorted === 'desc') return <ArrowDown className='ml-1 size-3' />
  return <ArrowUpDown className='ml-1 size-3 opacity-40' />
}

export function StudiesTab() {
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
      header: 'ID',
      enableSorting: false,
      cell: ({ getValue }) => (
        <span className='font-mono text-primary text-[0.78rem]'>{getValue()}</span>
      ),
    }),
    columnHelper.accessor('title', {
      header: ({ column }) => (
        <button
          className='flex items-center text-muted-foreground hover:text-foreground'
          onClick={() => column.toggleSorting()}
        >
          Título
          <SortIcon sorted={column.getIsSorted()} />
        </button>
      ),
      enableSorting: true,
      cell: ({ getValue }) => (
        <span className='font-medium text-[0.78rem] max-w-[220px] truncate block'>
          {getValue()}
        </span>
      ),
    }),
    columnHelper.accessor('pi', {
      header: ({ column }) => (
        <button
          className='flex items-center text-muted-foreground hover:text-foreground'
          onClick={() => column.toggleSorting()}
        >
          Investigador
          <SortIcon sorted={column.getIsSorted()} />
        </button>
      ),
      enableSorting: true,
      cell: ({ getValue }) => (
        <span className='text-muted-foreground text-[0.78rem]'>{getValue()}</span>
      ),
    }),
    columnHelper.accessor('devices', {
      header: 'Dispositivos',
      enableSorting: false,
      cell: ({ getValue }) => (
        <span className='text-center block text-[0.78rem]'>{getValue()}</span>
      ),
    }),
    columnHelper.accessor('participants', {
      header: 'Participantes',
      enableSorting: false,
      cell: ({ getValue }) => (
        <span className='text-center block text-[0.78rem]'>{getValue()}</span>
      ),
    }),
    columnHelper.accessor('progress', {
      header: 'Progresso',
      enableSorting: false,
      cell: ({ getValue }) => {
        const pct = getValue()
        return (
          <div className='flex items-center gap-2'>
            <div className='bg-muted rounded-full h-2 w-24 overflow-hidden'>
              <div
                className='bg-primary rounded-full h-2'
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className='text-[0.68rem] text-muted-foreground min-w-[28px]'>
              {pct}%
            </span>
          </div>
        )
      },
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
    columnHelper.display({
      id: 'actions',
      header: 'Ações',
      cell: () => (
        <div className='flex gap-1'>
          <Button variant='ghost' size='icon-xs'>
            <Eye />
          </Button>
          <Button variant='ghost' size='icon-xs'>
            <Pencil />
          </Button>
          <Button variant='ghost' size='icon-xs'>
            <Trash2 />
          </Button>
        </div>
      ),
    }),
  ]

  const table = useReactTable({
    data: STUDIES,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: studyGlobalFilter,
    state: { rowSelection, sorting, globalFilter },
  })

  return (
    <div className='flex flex-col gap-4 p-6'>
      <Input
        placeholder='Buscar estudo...'
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
                  <TableHead
                    key={header.id}
                    className='text-[0.63rem] uppercase tracking-[0.1em]'
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
