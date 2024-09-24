'use server'
import { IAluguel } from '@/interfaces/IAluguel'
import { revalidatePath } from 'next/cache'

// Função para buscar todos os alugueis
export const fetchAllRent = async (): Promise<IAluguel[]> => {
  try {
    const response = await fetch('http://localhost:3000/alugueis')
    if (!response.ok) {
      const errorMessage = await response.text()
      throw new Error(`Erro ao buscar alugueis: ${errorMessage}`)
    }
    const data: IAluguel[] = await response.json()
    return data
  } catch (error) {
    console.error('Erro ao buscar alugueis:', error)
    throw new Error('Erro ao buscar alugueis')
  }
}

// Função para buscar um aluguel por ID
export const fetchRentById = async (id: number): Promise<IAluguel> => {
  try {
    const response = await fetch(`http://localhost:3000/alugueis/${id}`)
    if (!response.ok) {
      const errorMessage = await response.text()
      throw new Error(`Erro ao buscar aluguel: ${errorMessage}`)
    }
    const data: IAluguel = await response.json()
    return data
  } catch (error) {
    console.error('Erro ao buscar aluguel:', error)
    throw new Error('Erro ao buscar aluguel')
  }
}

// Função para adicionar um novo aluguel
export const createRent = async (rent: IAluguel): Promise<IAluguel> => {
  try {
    const response = await fetch('http://localhost:3000/alugueis', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rent),
    })
    if (!response.ok) {
      const errorMessage = await response.text()
      throw new Error(`Erro ao criar aluguel: ${errorMessage}`)
    }
    const data: IAluguel = await response.json()
    revalidatePath('/admin/alugueis')
    return data
  } catch (error) {
    console.error('Erro ao criar aluguel:', error)
    throw new Error('Erro ao criar aluguel')
  }
}

// Função para atualizar um rent existente
export const updateRent = async (
  id: number,
  rent: IAluguel,
): Promise<IAluguel> => {
  try {
    const response = await fetch(`http://localhost:3000/alugueis/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rent),
    })
    if (!response.ok) {
      const errorMessage = await response.text()
      throw new Error(`Erro ao atualizar aluguel: ${errorMessage}`)
    }
    const data: IAluguel = await response.json()
    revalidatePath('/admin/alugueis')
    return data
  } catch (error) {
    console.error('Erro ao atualizar aluguel:', error)
    throw new Error('Erro ao atualizar aluguel')
  }
}

// Função para excluir um rent por ID
export const deleteRent = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`http://localhost:3000/alugueis/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      const errorMessage = await response.text()
      throw new Error(`Erro ao excluir aluguel: ${errorMessage}`)
    }
    revalidatePath('/admin/alugueis')
  } catch (error) {
    console.error('Erro ao excluir aluguel:', error)
    throw new Error('Erro ao excluir aluguel')
  }
}
