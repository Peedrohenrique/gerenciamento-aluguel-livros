import { LivroTable } from './_components/table'
import { Create } from './_components/create'
import { fetchAllBooks } from '@/services/livro'

async function Livros() {
  const data = await fetchAllBooks()

  return (
    <div className="">
      <div className="flex items-center justify-between lg:justify-between">
        <div className="flex flex-col gap-3">
          <h1 className="text-5xl ">Livros</h1>
          <p className="text-sm text-gray-500 ">
            Todas as informações sobre os livros
          </p>
        </div>
        <Create />
      </div>

      <LivroTable data={data} />
    </div>
  )
}

export default Livros
