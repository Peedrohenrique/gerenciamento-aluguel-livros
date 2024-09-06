import { AutorTable } from './_components/table'
import { Create } from './_components/create'

function Autores() {
  return (
    <div className="">
      <div className="flex items-center justify-between lg:justify-between">
        <div className="flex flex-col gap-3">
          <h1 className="text-5xl ">Autores</h1>
          <p className="text-sm text-gray-500 ">
            Todas as informações sobre os autores de livros
          </p>
        </div>
        <Create />
      </div>

      <AutorTable />
    </div>
  )
}

export default Autores
