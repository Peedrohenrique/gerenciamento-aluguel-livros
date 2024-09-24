'use server'
import { ILivro } from '@/interfaces/ILivro'
import { API_BASE_URL } from '@/lib/api'
import { revalidatePath } from 'next/cache'

// Função para buscar todos os livros
export const fetchAllBooks = async (): Promise<ILivro[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/livros`)
    if (!response.ok) {
      const errorMessage = await response.text()
      throw new Error(`Erro ao buscar livros: ${errorMessage}`)
    }
    const data: ILivro[] = await response.json()
    return data
  } catch (error) {
    console.error('Erro ao buscar livros:', error)
    throw new Error('Erro ao buscar livros')
  }
}

// Função para buscar um autor por ID
export const fetchBookById = async (id: number): Promise<ILivro> => {
  try {
    const response = await fetch(`${API_BASE_URL}/livros/${id}`)
    if (!response.ok) {
      const errorMessage = await response.text()
      throw new Error(`Erro ao buscar livro: ${errorMessage}`)
    }
    const data: ILivro = await response.json()
    return data
  } catch (error) {
    console.error('Erro ao buscar livro:', error)
    throw new Error('Erro ao buscar livro')
  }
}

// Função para adicionar um novo autor
export const createBook = async (book: ILivro): Promise<ILivro> => {
  try {
    const response = await fetch(`${API_BASE_URL}/livros`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    })
    if (!response.ok) {
      const errorMessage = await response.text()
      throw new Error(`Erro ao criar book: ${errorMessage}`)
    }
    const data: ILivro = await response.json()
    revalidatePath('/admin/livros')
    return data
  } catch (error) {
    console.error('Erro ao criar book:', error)
    throw new Error('Erro ao criar book')
  }
}

// Função para atualizar um autor existente
export const updateBook = async (id: number, book: ILivro): Promise<ILivro> => {
  try {
    const response = await fetch(`${API_BASE_URL}/livros/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    })
    if (!response.ok) {
      const errorMessage = await response.text()
      throw new Error(`Erro ao atualizar book: ${errorMessage}`)
    }
    const data: ILivro = await response.json()
    revalidatePath('/admin/livros')
    return data
  } catch (error) {
    console.error('Erro ao atualizar book:', error)
    throw new Error('Erro ao atualizar book')
  }
}

// Função para excluir um autor por ID
export const deleteBook = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/livros/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      const errorMessage = await response.text()
      throw new Error(`Erro ao excluir book: ${errorMessage}`)
    }

    revalidatePath('/admin/livros')
  } catch (error) {
    console.error('Erro ao excluir book:', error)
    throw new Error('Erro ao excluir book')
  }
}
