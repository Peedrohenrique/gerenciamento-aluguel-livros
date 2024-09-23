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
import { useToast } from '@/hooks/use-toast'
import { Loader2 } from 'lucide-react'
import { ICliente } from '@/interfaces/ICliente'
import { updateClient, fetchclientById } from '@/services/cliente'

// Esquema de validação do Zod
const formSchema = z.object({
  nome: z
    .string()
    .min(2, { message: 'Nome deve ter pelo menos 2 caracteres.' }),

  email: z
    .string()
    .email({ message: 'Formato de email inválido.' })
    .min(2, { message: 'Email deve ter pelo menos 2 caracteres.' }),

  telefone: z
    .string()
    .min(2, { message: 'Telefone deve ter pelo menos 2 caracteres.' }),
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
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: '',
      email: '',
      telefone: '',
    },
  })

  // Função para submeter a atualização
  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true)
    try {
      await updateClient(Number(id), values as ICliente)
      toast({
        title: 'Atualização realizada! ✅',
        description: 'Seu cliente foi atualizado com sucesso!',
        action: (
          <ToastAction altText="Goto schedule to undo">Fechar</ToastAction>
        ),
      })

      // Recarrega os dados atualizados do cliente
      await fetchClient()

      setLoading(false)
      setIsOpen(false)
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro na atualização!',
        description: 'Erro ao atualizar o cliente.',
      })
      setLoading(false)
    }
  }

  // Função para buscar os dados do cliente
  React.useEffect(() => {
    if (id) {
      fetchClient()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  async function fetchClient() {
    setLoading(true)
    try {
      const clientProps = await fetchclientById(Number(id))
      // Preenche os valores do formulário com os dados obtidos
      form.reset({
        nome: clientProps.nome,
        email: clientProps.email,
        telefone: clientProps.telefone,
      })
      setLoading(false)
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro ao buscar cliente!',
        description: 'Não foi possível carregar os dados do cliente.',
      })
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Editar Cliente</DialogTitle>
          <DialogDescription>
            Faça alterações no cliente aqui. Clique em salvar quando terminar.
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="telefone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input placeholder="telefone" {...field} />
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
