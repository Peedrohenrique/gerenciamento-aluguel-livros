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
import { Textarea } from '@/components/ui/textarea'
import { IAutor } from '@/interfaces/IAutor'
import { createAuthor } from '@/services/autor'
import { useToast } from '@/hooks/use-toast'
import { Loader2 } from 'lucide-react'

// Esquema de validação do Zod
const formSchema = z.object({
  nome: z
    .string()
    .min(2, { message: 'Nome deve ter pelo menos 2 caracteres.' }),
  data_nascimento: z
    .string()
    .nonempty({ message: 'Data de nascimento é obrigatória.' }),
  nacionalidade: z
    .string()
    .min(2, { message: 'Nacionalidade deve ter pelo menos 2 caracteres.' }),
  biografia: z
    .string()
    .min(10, { message: 'A biografia deve ter pelo menos 10 caracteres.' }),
})

export function Create() {
  const [loading, setLoading] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: '',
      data_nascimento: '',
      nacionalidade: '',
      biografia: '',
    },
  })

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true)
    try {
      await createAuthor(values as IAutor)
      toast({
        title: 'Cadastro realizado! ✅',
        description: 'Seu autor foi cadastrado com sucesso!',
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
        description: 'Erro ao cadastrar o autor.',
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
          <DialogTitle>Criar Autor</DialogTitle>
          <DialogDescription>
            Crie um novo autor. Clique em salvar quando terminar.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="grid gap-4 py-4"
          >
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="data_nascimento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de Nascimento</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nacionalidade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nacionalidade</FormLabel>
                  <FormControl>
                    <Input placeholder="Nacionalidade" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="biografia"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Biografia</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Biografia" {...field} />
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
