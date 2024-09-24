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
  DialogTrigger,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { Loader2 } from 'lucide-react'
import { createRent } from '@/services/aluguel'
import { Textarea } from '@/components/ui/textarea'
import { ICliente } from '@/interfaces/ICliente'
import { fetchAllClients } from '@/services/cliente'
import { ILivro } from '@/interfaces/ILivro'
import { fetchAllBooks } from '@/services/livro'

// Esquema de validação do Zod
const formSchema = z.object({
  data_aluguel: z.string({ required_error: 'Data de aluguel é obrigatória.' }),
  data_devolucao: z.string({
    required_error: 'Data de devolução é obrigatória.',
  }),
  cliente_id: z.string({ message: 'Cliente é obrigatório.' }),
  livro_id: z.string({ message: 'Livro é obrigatório.' }),
  observacao: z.string().optional(),
  status: z.boolean(),
})

export function Create() {
  const [loading, setLoading] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)
  const [cliente, setCliente] = React.useState<ICliente[]>([])
  const [livro, setLivro] = React.useState<ILivro[]>([])
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

  // Função para buscar os dados de livros e clientes
  React.useEffect(() => {
    fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function fetch() {
    const livroProps = await fetchAllBooks()
    const clienteProps = await fetchAllClients()

    setCliente(clienteProps)
    setLivro(livroProps)
  }

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true)
    try {
      // Convertendo strings de data para objetos Date
      const formattedValues = {
        ...values,
        data_aluguel: new Date(values.data_aluguel),
        data_devolucao: new Date(values.data_devolucao),
      }
      await createRent(formattedValues)
      toast({
        title: 'Cadastro realizado! ✅',
        description: 'Seu livro foi cadastrado com sucesso!',
        action: (
          <ToastAction altText="Goto schedule to undo">Fechar</ToastAction>
        ),
      })

      setLoading(false)
      setIsOpen(false)
      form.reset()
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro no cadastro!',
        description: 'Erro ao cadastrar o aluguel.',
      })
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="px-10">Novo +</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Criar Aluguel</DialogTitle>
          <DialogDescription>
            Crie um novo aluguel. Clique em salvar quando terminar.
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
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={String(cliente[0]?.id)}
                          placeholder="Selecione um cliente"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {cliente.map((cliente) => (
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
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={String(livro[0]?.id)}
                          placeholder="Selecione um livro"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {livro.map((livro) => (
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
              <Button type="submit">
                {loading ? (
                  <Loader2 className="mr-2 ml-2 h-4 w-4 animate-spin" />
                ) : (
                  'Criar'
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
