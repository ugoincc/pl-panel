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
import type { Participant } from '@types'
import { PARTICIPANTS } from '@api/data/mockData'
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

const columnHelper = createColumnHelper<Participant>()

const participantGlobalFilter: FilterFn<Participant> = (
  row,
  _columnId,
  filterValue: string,
) => {
  const q = filterValue.toLowerCase()
  return (
    row.original.id.toLowerCase().includes(q) ||
    row.original.name.toLowerCase().includes(q) ||
    row.original.study.toLowerCase().includes(q)
  )
}

function SortIcon({ sorted }: { sorted: false | 'asc' | 'desc' }) {
  if (sorted === 'asc') return <ArrowUp className='ml-1 size-3' />
  if (sorted === 'desc') return <ArrowDown className='ml-1 size-3' />
  return <ArrowUpDown className='ml-1 size-3 opacity-40' />
}

export function ParticipantsTab() {
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
        <span className='text-primary font-medium font-mono text-[0.8rem]'>
          {getValue()}
        </span>
      ),
    }),
    columnHelper.accessor('name', {
      header: ({ column }) => (
        <button
          className='flex items-center text-muted-foreground hover:text-foreground'
          onClick={() => column.toggleSorting()}
        >
          Nome
          <SortIcon sorted={column.getIsSorted()} />
        </button>
      ),
      enableSorting: true,
      cell: ({ getValue }) => (
        <span className='font-medium text-[0.78rem]'>{getValue()}</span>
      ),
    }),
    columnHelper.accessor('age', {
      header: ({ column }) => (
        <button
          className='flex items-center text-muted-foreground hover:text-foreground'
          onClick={() => column.toggleSorting()}
        >
          Idade
          <SortIcon sorted={column.getIsSorted()} />
        </button>
      ),
      enableSorting: true,
      cell: ({ getValue }) => (
        <span className='text-muted-foreground text-[0.78rem]'>
          {getValue()} anos
        </span>
      ),
    }),
    columnHelper.accessor('study', {
      header: 'Estudo',
      enableSorting: false,
      cell: ({ getValue }) => (
        <span className='text-muted-foreground text-[0.78rem]'>{getValue()}</span>
      ),
    }),
    columnHelper.accessor('device', {
      header: 'Dispositivo',
      enableSorting: false,
      cell: ({ getValue }) => (
        <span className='text-[0.72rem] bg-muted px-2 py-0.5 text-muted-foreground'>
          {getValue()}
        </span>
      ),
    }),
    columnHelper.accessor('enrolled', {
      header: ({ column }) => (
        <button
          className='flex items-center text-muted-foreground hover:text-foreground'
          onClick={() => column.toggleSorting()}
        >
          Ingresso
          <SortIcon sorted={column.getIsSorted()} />
        </button>
      ),
      enableSorting: true,
      cell: ({ getValue }) => (
        <span className='text-muted-foreground text-[0.75rem]'>{getValue()}</span>
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
    data: PARTICIPANTS,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: participantGlobalFilter,
    state: { rowSelection, sorting, globalFilter },
  })

  return (
    <div className='flex flex-col gap-4 p-6'>
      <Input
        placeholder='Buscar participante...'
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
