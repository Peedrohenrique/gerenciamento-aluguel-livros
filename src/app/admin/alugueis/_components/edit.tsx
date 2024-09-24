'use client'
import * as React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { ToastAction } from '@/components/ui/toast'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ILivro } from '@/interfaces/ILivro'
import { useToast } from '@/hooks/use-toast'
import { Loader2 } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { fetchRentById, updateRent } from '@/services/aluguel'
import { Textarea } from '@/components/ui/textarea'
import { ICliente } from '@/interfaces/ICliente'
import { fetchAllClients } from '@/services/cliente'
import { fetchAllBooks } from '@/services/livro'
import { IAluguel } from '@/interfaces/IAluguel'

// Esquema de validação do Zod
const formSchema = z.object({
  data_aluguel: z.string().nonempty('Data de aluguel é obrigatória.'),
  data_devolucao: z.string().nonempty('Data de devolução é obrigatória.'),
  cliente_id: z.string().nonempty('Cliente é obrigatório.'),
  livro_id: z.string().nonempty('Livro é obrigatório.'),
  observacao: z.string().optional(),
  status: z.boolean(),
})

export function Edit({
  id,
  isOpen,
  setIsOpen,
}: {
  id: number | null
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}) {
  const [loading, setLoading] = React.useState(false)
  const [clientes, setClientes] = React.useState<ICliente[]>([])
  const [livros, setLivros] = React.useState<ILivro[]>([])
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      data_aluguel: '',
      data_devolucao: '',
      cliente_id: '',
      livro_id: '',
      observacao: '',
      status: false,
    },
  })

  // Função para submeter a atualização
  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true)
    try {
      // Convertendo strings de data para objetos Date
      const formattedValues = {
        ...values,
        data_aluguel: new Date(values.data_aluguel),
        data_devolucao: new Date(values.data_devolucao),
      }

      await updateRent(Number(id), formattedValues as IAluguel)

      toast({
        title: 'Atualização realizada! ✅',
        description: 'Seu aluguel foi atualizado com sucesso!',
        action: (
          <ToastAction altText="Goto schedule to undo">Fechar</ToastAction>
        ),
      })

      // Recarrega os dados atualizados do aluguel
      await fetch()

      setIsOpen(false)
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro na atualização!',
        description: 'Erro ao atualizar o aluguel.',
      })
    } finally {
      setLoading(false)
    }
  }

  // Função para buscar os dados do aluguel
  React.useEffect(() => {
    if (id) {
      fetch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  async function fetch() {
    const aluguelProps = await fetchRentById(Number(id))

    // Preenche os valores do formulário com os dados obtidos
    form.reset({
      data_aluguel: String(aluguelProps.data_aluguel),
      data_devolucao: String(aluguelProps.data_devolucao),
      cliente_id: aluguelProps.cliente_id,
      livro_id: aluguelProps.livro_id,
      observacao: aluguelProps.observacao,
      status: aluguelProps.status,
    })
  }

  // Função para buscar os dados dos clientes e livros
  React.useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function fetchData() {
    const livrosProps = await fetchAllBooks()
    const clientesProps = await fetchAllClients()

    setClientes(clientesProps)
    setLivros(livrosProps)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Editar Aluguel</DialogTitle>
          <DialogDescription>
            Faça alterações no aluguel aqui. Clique em salvar quando terminar.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="grid gap-4 py-4"
          >
            <FormField
              control={form.control}
              name="data_aluguel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data Aluguel</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="data_devolucao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data Devolução</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cliente_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cliente</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um cliente" />
                      </SelectTrigger>
                      <SelectContent>
                        {clientes.map((cliente) => (
                          <SelectItem
                            key={cliente.id}
                            value={String(cliente.id)}
                          >
                            {cliente.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="livro_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Livro</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um livro" />
                      </SelectTrigger>
                      <SelectContent>
                        {livros.map((livro) => (
                          <SelectItem key={livro.id} value={String(livro.id)}>
                            {livro.titulo}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="observacao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observação</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Observação" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <Loader2 className="mr-2 ml-2 h-4 w-4 animate-spin" />
                ) : (
                  'Editar'
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
