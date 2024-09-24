'use client'

import * as React from 'react'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Edit } from './edit'
import { IAluguel } from '@/interfaces/IAluguel'

import { AlertDelete } from '@/components/alert-delete'

export function AluguelTable({ data }: { data: IAluguel[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([])

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})

  const [authorId, setAuthorId] = React.useState<number | null>(null)
  const [isEditOpen, setIsEditOpen] = React.useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false)

  const handleEdit = (id: number) => {
    setAuthorId(id)
    setIsEditOpen(true)
  }

  const handleDelete = async (id: number) => {
    setAuthorId(id)
    setIsDeleteOpen(true)
  }

  const columns: ColumnDef<IAluguel>[] = [
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') === 0 ? 'Inativo' : 'Ativo'
        return <div className="font-medium">{status}</div>
      },
    },
    {
      accessorKey: 'data_aluguel',
      header: 'Data aluguel',

      cell: ({ row }) => {
        const dataAluguel = new Date(
          row.getValue('data_aluguel'),
        ).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })
        return <div className="">{dataAluguel}</div>
      },
    },
    {
      accessorKey: 'data_devolucao',
      header: 'Data devolução',
      cell: ({ row }) => {
        const dataDevolucao = new Date(
          row.getValue('data_devolucao'),
        ).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })
        return <div className="">{dataDevolucao}</div>
      },
    },
    {
      accessorKey: 'cliente',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Cliente
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const clienteNome = row.original.cliente?.nome || 'Cliente desconhecido'
        return <div className="font-medium">{clienteNome}</div>
      },
      // Adicionando filtro customizado
      filterFn: (row, columnId, filterValue) => {
        const clienteNome = row.original.cliente?.nome || ''
        return clienteNome.toLowerCase().includes(filterValue.toLowerCase())
      },
    },

    {
      accessorKey: 'livro',
      header: 'Livro',
      cell: ({ row }) => {
        const livroNome = row.original.livro?.titulo || 'Livro desconhecido'
        return <div className="capitalize">{livroNome}</div>
      },
    },
    {
      accessorKey: 'observacao',
      header: 'Observação',
      cell: ({ row }) => <div className="">{row.getValue('observacao')}</div>,
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <div className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Abrir menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() =>
                    navigator.clipboard.writeText(row.original.id!)
                  }
                >
                  Copiar ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Ver</DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleEdit(Number(row.original.id))}
                >
                  {' '}
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleDelete(Number(row.original.id))}
                >
                  Deletar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      },
    },
  ]

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  })

  return (
    <>
      <Edit id={authorId} isOpen={isEditOpen} setIsOpen={setIsEditOpen} />
      <AlertDelete
        id={authorId}
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        name="'ALUGUEL'"
      />

      <div className="w-full mt-10">
        <div className="flex items-center py-4">
          <Input
            placeholder="Pesquisar por cliente..."
            value={
              (table.getColumn('cliente')?.getFilterValue() as string) ?? ''
            }
            onChange={(event) =>
              table.getColumn('cliente')?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Colunas <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    Sem resultados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            Página {table.getState().pagination.pageIndex + 1} de{' '}
            {table.getPageCount()} {' - '}
            {table.getFilteredRowModel().rows.length} registros
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Próximo
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
