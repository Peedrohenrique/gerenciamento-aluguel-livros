'use server'
import { ICliente } from '@/interfaces/ICliente'
import { API_BASE_URL } from '@/lib/api'
import { revalidatePath } from 'next/cache'

// Função para buscar todos os clientes
export const fetchAllClients = async (): Promise<ICliente[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/clientes`)
    if (!response.ok) {
      const errorMessage = await response.text()
      throw new Error(`Erro ao buscar clientes: ${errorMessage}`)
    }
    const data: ICliente[] = await response.json()
    return data
  } catch (error) {
    console.error('Erro ao buscar clientes:', error)
    throw new Error('Erro ao buscar clientes')
  }
}

// Função para buscar um cleinte por ID
export const fetchclientById = async (id: number): Promise<ICliente> => {
  try {
    const response = await fetch(`${API_BASE_URL}/clientes/${id}`)
    if (!response.ok) {
      const errorMessage = await response.text()
      throw new Error(`Erro ao buscar cliente: ${errorMessage}`)
    }
    const data: ICliente = await response.json()
    return data
  } catch (error) {
    console.error('Erro ao buscar cliente:', error)
    throw new Error('Erro ao buscar cliente')
  }
}

// Função para adicionar um novo cleinte
export const createClient = async (client: ICliente): Promise<ICliente> => {
  try {
    const response = await fetch(`${API_BASE_URL}/clientes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(client),
    })
    if (!response.ok) {
      const errorMessage = await response.text()
      throw new Error(`Erro ao criar cliente: ${errorMessage}`)
    }
    const data: ICliente = await response.json()
    revalidatePath('/admin/clientes')
    return data
  } catch (error) {
    console.error('Erro ao criar cliente:', error)
    throw new Error('Erro ao criar cliente')
  }
}

// Função para atualizar um cleinte existente
export const updateClient = async (
  id: number,
  client: ICliente,
): Promise<ICliente> => {
  try {
    const response = await fetch(`${API_BASE_URL}/clientes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(client),
    })
    if (!response.ok) {
      const errorMessage = await response.text()
      throw new Error(`Erro ao atualizar cliente: ${errorMessage}`)
    }
    const data: ICliente = await response.json()
    revalidatePath('/admin/clientes')
    return data
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error)
    throw new Error('Erro ao atualizar cliente')
  }
}

// Função para excluir um cliente por ID
export const deleteClient = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/clientes/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      const errorMessage = await response.text()
      throw new Error(`Erro ao excluir cliente: ${errorMessage}`)
    }
    revalidatePath('/admin/clientes')
  } catch (error) {
    console.error('Erro ao excluir cliente:', error)
    throw new Error('Erro ao excluir cliente')
  }
}
