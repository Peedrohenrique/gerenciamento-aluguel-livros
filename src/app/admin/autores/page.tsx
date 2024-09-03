import { AutorTable } from '@/components/autorTable'
import { Button } from '@/components/ui/button'

function Autores() {
  return (
    // <div>
    //   <h1 className="text-5xl font-bold">Autores</h1>
    //   <AutorTable />
    // </div>

    <div className="">
      <div className="flex items-center justify-between lg:justify-between">
        <div className="flex flex-col gap-3">
          <h1 className="text-5xl ">Autores</h1>
          <p className="text-sm text-gray-500 ">
            Todas as informações sobre os autores de livros
          </p>
        </div>
        <Button className="px-10">Novo</Button>
      </div>

      <AutorTable />
    </div>
  )
}

export default Autores
