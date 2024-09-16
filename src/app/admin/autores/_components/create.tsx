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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export function Create() {
  return (
    <Dialog>
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
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nome" className="text-right">
              Nome
            </Label>
            <Input id="name" type="text" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="biografia" className="text-right">
              Data nascimento
            </Label>
            <Input id="biografia" type="date" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="biografia" className="text-right">
              Nacionalidade
            </Label>
            <Input id="biografia" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="biografia" className="text-right">
              Biografia
            </Label>
            <Textarea id="biografia" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Criar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
