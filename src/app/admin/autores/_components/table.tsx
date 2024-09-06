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

export type Autor = {
  id: string
  nome: string
  email: string
  status: string
  cidade: string
}

const data: Autor[] = [
  {
    id: '1',
    nome: 'João Silva',
    email: 'joao.silva@gmail.com',
    status: 'Ativo',
    cidade: 'São Paulo',
  },
  {
    id: '2',
    nome: 'Maria Oliveira',
    email: 'maria.oliveira@gmail.com',
    status: 'Inativo',
    cidade: 'Rio de Janeiro',
  },
  {
    id: '3',
    nome: 'Carlos Santos',
    email: 'carlos.santos@gmail.com',
    status: 'Ativo',
    cidade: 'Belo Horizonte',
  },
  {
    id: '4',
    nome: 'Ana Pereira',
    email: 'ana.pereira@gmail.com',
    status: 'Ativo',
    cidade: 'Porto Alegre',
  },
  {
    id: '5',
    nome: 'Luís Costa',
    email: 'luis.costa@gmail.com',
    status: 'Inativo',
    cidade: 'Curitiba',
  },
  {
    id: '6',
    nome: 'Fernanda Almeida',
    email: 'fernanda.almeida@gmail.com',
    status: 'Ativo',
    cidade: 'Fortaleza',
  },
  {
    id: '7',
    nome: 'Paulo Mendes',
    email: 'paulo.mendes@gmail.com',
    status: 'Ativo',
    cidade: 'Brasília',
  },
  {
    id: '8',
    nome: 'Beatriz Lima',
    email: 'beatriz.lima@gmail.com',
    status: 'Inativo',
    cidade: 'Salvador',
  },
  {
    id: '9',
    nome: 'Ricardo Sousa',
    email: 'ricardo.sousa@gmail.com',
    status: 'Ativo',
    cidade: 'Recife',
  },
  {
    id: '10',
    nome: 'Juliana Rocha',
    email: 'juliana.rocha@gmail.com',
    status: 'Ativo',
    cidade: 'Florianópolis',
  },
  {
    id: '11',
    nome: 'Mariana Farias',
    email: 'mariana.farias@gmail.com',
    status: 'Inativo',
    cidade: 'Manaus',
  },
]

export function AutorTable() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})

  const [authorId, setAuthorId] = React.useState<string | null>(null) // Estado para armazenar o ID do autor
  const [isEditOpen, setIsEditOpen] = React.useState(false) // Estado para controlar a exibição do modal

  const handleEdit = (id: string) => {
    setAuthorId(id)
    setIsEditOpen(true)
  }

  const columns: ColumnDef<Autor>[] = [
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue('status')}</div>
      ),
    },
    {
      accessorKey: 'nome',
      header: 'Nome',
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue('nome')}</div>
      ),
    },
    {
      accessorKey: 'email',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            E-mail
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue('email')}</div>
      ),
    },
    {
      accessorKey: 'cidade',
      header: () => <div className="">Cidade</div>,
      cell: ({ row }) => (
        <div className=" font-medium">{row.getValue('cidade')}</div>
      ),
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
                  onClick={() => navigator.clipboard.writeText(row.original.id)}
                >
                  Copiar ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Ver</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleEdit(row.original.id)}>
                  {' '}
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem>Deletar</DropdownMenuItem>
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
      <Edit authorId={authorId} isOpen={isEditOpen} setIsOpen={setIsEditOpen} />

      <div className="w-full mt-10">
        <div className="flex items-center py-4">
          <Input
            placeholder="Pesquisar por nome..."
            value={(table.getColumn('nome')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn('nome')?.setFilterValue(event.target.value)
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
