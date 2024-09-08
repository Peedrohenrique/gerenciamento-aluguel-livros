import { IAutor } from '@/interfaces/IAutor'

// Função para buscar todos os autores
export const fetchAllAuthors = async (): Promise<IAutor[]> => {
  try {
    const response = await fetch('http://localhost:3000/autores')
    console.log(response)
    if (!response.ok) {
      const errorMessage = await response.text()
      throw new Error(`Erro ao buscar autores: ${errorMessage}`)
    }

    const data: IAutor[] = await response.json()
    return data
  } catch (error) {
    console.error('Erro ao buscar autores:', error)
    throw new Error('Erro ao buscar autores')
  }
}
