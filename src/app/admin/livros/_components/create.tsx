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
import { createBook } from '@/services/livro'
import { fetchAllAuthors } from '@/services/autor' // Função para buscar autores
import { IAutor } from '@/interfaces/IAutor'

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

export function Create() {
  const [loading, setLoading] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)
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

  // Função para buscar os dados do autor
  React.useEffect(() => {
    fetchAuthor()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function fetchAuthor() {
    setLoading(true)
    try {
      const authorProps = await fetchAllAuthors() // Busca todos os autores

      setAuthors(authorProps) // Armazena os autores no estado

      // Preenche os valores do formulário com o primeiro autor obtido
      form.reset({
        ...form.getValues(),
        autor_id: authorProps[0]?.id || '',
      })

      setLoading(false)
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro ao buscar autor!',
        description: 'Não foi possível carregar os dados do autor.',
      })
      setLoading(false)
    }
  }

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true)
    try {
      await createBook(values)
      console.log(values)
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
        title: 'Erro cadastro!',
        description: 'Erro ao cadastrar o livro.',
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
          <DialogTitle>Criar Livro</DialogTitle>
          <DialogDescription>
            Crie um novo livro. Clique em salvar quando terminar.
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
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="R$:00.00"
                      {...field}
                    />
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
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={String(authors[0]?.id)}
                          placeholder="Selecione um autor"
                        />
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
