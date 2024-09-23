import { ClienteTable } from './_components/table'
import { Create } from './_components/create'
import { fetchAllClients } from '@/services/cliente'

async function Clientes() {
  const client = await fetchAllClients()

  return (
    <div className="">
      <div className="flex items-center justify-between lg:justify-between">
        <div className="flex flex-col gap-3">
          <h1 className="text-5xl ">Clientes</h1>
          <p className="text-sm text-gray-500 ">
            Todas as informações sobre os clientes
          </p>
        </div>
        <Create />
      </div>

      <ClienteTable data={client} />
    </div>
  )
}

export default Clientes
