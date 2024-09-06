import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function Edit({
  authorId,
  isOpen,
  setIsOpen,
}: {
  authorId: string | null
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Autor</DialogTitle>
          <DialogDescription>
            Faça alterações em autor aqui. Clique em salvar quando terminar.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nome" className="text-right">
              Nome
            </Label>
            <Input
              id="name"
              defaultValue={`${authorId}`}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="biografia" className="text-right">
              Biografia
            </Label>
            <Input
              id="biografia"
              defaultValue={`${authorId}`}
              className="col-span-3"
            />
          </div>
        </div>

        <DialogFooter>
          <Button type="submit">Editar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
