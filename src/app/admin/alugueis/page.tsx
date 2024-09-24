import { AluguelTable } from './_components/table'
import { Create } from './_components/create'
import { fetchAllRent } from '@/services/aluguel'

async function Livros() {
  const data = await fetchAllRent()

  return (
    <div className="">
      <div className="flex items-center justify-between lg:justify-between">
        <div className="flex flex-col gap-3">
          <h1 className="text-5xl ">Aluguéis</h1>
          <p className="text-sm text-gray-500 ">
            Todas as informações sobre os aluguéis
          </p>
        </div>
        <Create />
      </div>

      <AluguelTable data={data} />
    </div>
  )
}

export default Livros
