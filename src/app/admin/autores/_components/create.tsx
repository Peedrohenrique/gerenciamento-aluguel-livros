'use client'
import * as React from 'react'
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
import { IAutor } from '@/interfaces/IAutor'

export function Create() {
  const [data, setData] = React.useState<IAutor>({
    nome: '',
    biografia: '',
    dataNascimento: '',
    nacionalidade: '',
  })
  console.log(data)

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault()

    try {
      console.log(data)
    } catch (error) {}
  }

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
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nome" className="text-right">
                Nome
              </Label>
              <Input
                id="name"
                type="text"
                className="col-span-3"
                onChange={(e) => setData({ ...data, nome: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="biografia" className="text-right">
                Data nascimento
              </Label>
              <Input
                id="biografia"
                type="date"
                className="col-span-3"
                onChange={(e) =>
                  setData({ ...data, dataNascimento: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="biografia" className="text-right">
                Nacionalidade
              </Label>
              <Input
                id="biografia"
                className="col-span-3"
                onChange={(e) =>
                  setData({ ...data, nacionalidade: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="biografia" className="text-right">
                Biografia
              </Label>
              <Textarea
                id="biografia"
                className="col-span-3"
                onChange={(e) =>
                  setData({ ...data, biografia: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Criar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
