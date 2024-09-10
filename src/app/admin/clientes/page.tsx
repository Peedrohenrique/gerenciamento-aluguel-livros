import { ClienteTable } from './_components/table'
import { Create } from './_components/create'
// import { fetchAllAuthors } from '@/services/autor'

async function Clientes() {
  // const autors = await fetchAllAuthors()

  return (
    <div className="">
      <div className="flex items-center justify-between lg:justify-between">
        <div className="flex flex-col gap-3">
          <h1 className="text-5xl ">Clientes</h1>
          <p className="text-sm text-gray-500 ">
            Todas as informações sobre os clientes de livros
          </p>
        </div>
        <Create />
      </div>

      <ClienteTable />
    </div>
  )
}

export default Clientes
