'use server'
import { IAutor } from '@/interfaces/IAutor'
import { revalidatePath } from 'next/cache'

// Função para buscar todos os autores
export const fetchAllAuthors = async (): Promise<IAutor[]> => {
  try {
    const response = await fetch('http://localhost:3000/autores')
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

// Função para buscar um autor por ID
export const fetchAuthorById = async (id: number): Promise<IAutor> => {
  try {
    const response = await fetch(`http://localhost:3000/autores/${id}`)
    if (!response.ok) {
      const errorMessage = await response.text()
      throw new Error(`Erro ao buscar autor: ${errorMessage}`)
    }
    const data: IAutor = await response.json()
    return data
  } catch (error) {
    console.error('Erro ao buscar autor:', error)
    throw new Error('Erro ao buscar autor')
  }
}

// Função para adicionar um novo autor
export const createAuthor = async (author: IAutor): Promise<IAutor> => {
  try {
    const response = await fetch('http://localhost:3000/autores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(author),
    })
    if (!response.ok) {
      const errorMessage = await response.text()
      throw new Error(`Erro ao criar autor: ${errorMessage}`)
    }
    const data: IAutor = await response.json()
    revalidatePath('/admin/autores')
    return data
  } catch (error) {
    console.error('Erro ao criar autor:', error)
    throw new Error('Erro ao criar autor')
  }
}

// Função para atualizar um autor existente
export const updateAuthor = async (
  id: number,
  author: IAutor,
): Promise<IAutor> => {
  try {
    const response = await fetch(`http://localhost:3000/autores/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(author),
    })
    if (!response.ok) {
      const errorMessage = await response.text()
      throw new Error(`Erro ao atualizar autor: ${errorMessage}`)
    }
    const data: IAutor = await response.json()
    revalidatePath('/admin/autores')
    return data
  } catch (error) {
    console.error('Erro ao atualizar autor:', error)
    throw new Error('Erro ao atualizar autor')
  }
}

// Função para excluir um autor por ID
export const deleteAuthor = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`http://localhost:3000/autores/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      const errorMessage = await response.text()
      throw new Error(`Erro ao excluir autor: ${errorMessage}`)
    }
    revalidatePath('/admin/autores')
  } catch (error) {
    console.error('Erro ao excluir autor:', error)
    throw new Error('Erro ao excluir autor')
  }
}
