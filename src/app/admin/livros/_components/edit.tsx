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
import { fetchBookById, updateBook } from '@/services/livro'
import { useToast } from '@/hooks/use-toast'
import { Loader2 } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { IAutor } from '@/interfaces/IAutor'
import { fetchAllAuthors } from '@/services/autor'

// Esquema de validação do Zod
const formSchema = z.object({
  titulo: z
    .string()
    .min(2, { message: 'Título deve ter pelo menos 2 caracteres.' }),

  descricao: z
    .string()
    .min(2, { message: 'Descricão deve ter pelo menos 2 caracteres.' }),

  preco_aluguel: z
    .string()
    .regex(/^\d+([.,]\d{1,2})?$/, { message: 'Insira um preço válido.' }) // Aceita números decimais ou inteiros
    .transform((value) => parseFloat(value.replace(',', '.'))) // Substitui a vírgula por ponto e transforma em número
    .refine((value) => value > 0, { message: 'Preço deve ser positivo.' }), // Verifica se é positivo

  autor_id: z.string().nonempty({ message: 'Autor é obrigatório.' }),
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
  const [authors, setAuthors] = React.useState<IAutor[]>([]) // Estado para armazenar os autores
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titulo: '',
      descricao: '',
      preco_aluguel: 0,
      autor_id: '',
    },
  })

  // Função para submeter a atualização
  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true)
    try {
      await updateBook(Number(id), values as ILivro)
      toast({
        title: 'Atualização realizada! ✅',
        description: 'Seu autor foi atualizado com sucesso!',
        action: (
          <ToastAction altText="Goto schedule to undo">Fechar</ToastAction>
        ),
      })

      // Recarrega os dados atualizados do livro
      await fetchLivro()

      setLoading(false)
      setIsOpen(false)
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro na atualização!',
        description: 'Erro ao atualizar o livro.',
      })
      setLoading(false)
    }
  }

  // Função para buscar os dados do livro
  React.useEffect(() => {
    if (id) {
      fetchLivro()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  async function fetchLivro() {
    setLoading(true)
    try {
      const bookProps = await fetchBookById(Number(id))
      // Preenche os valores do formulário com os dados obtidos
      form.reset({
        titulo: bookProps.titulo,
        descricao: bookProps.descricao,
        preco_aluguel: bookProps.preco_aluguel,
        autor_id: bookProps.autor_id,
      })
      setLoading(false)
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro ao buscar livro!',
        description: 'Não foi possível carregar os dados do livro.',
      })
      setLoading(false)
    }
  }

  // Função para buscar os dados dos autores
  React.useEffect(() => {
    fetchAuthors()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function fetchAuthors() {
    setLoading(true)
    try {
      const authorProps = await fetchAllAuthors() // Busca todos os autores
      setAuthors(authorProps) // Armazena os autores no estado
      setLoading(false)
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro ao buscar autores!',
        description: 'Não foi possível carregar os dados dos autores.',
      })
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Editar Livro</DialogTitle>
          <DialogDescription>
            Faça alterações no livro aqui. Clique em salvar quando terminar.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="grid gap-4 py-4"
          >
            <FormField
              control={form.control}
              name="titulo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input placeholder="Título" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="descricao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input placeholder="Descrição" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="preco_aluguel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço Aluguel</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="R$:00.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="autor_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Autor</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value} // Garantir que o valor do select seja o valor do campo
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um autor" />
                      </SelectTrigger>
                      <SelectContent>
                        {authors.map((author) => (
                          <SelectItem key={author.id} value={String(author.id)}>
                            {author.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
