'use server'

import { API_BASE_URL } from '@/lib/api'
import { IDashboard } from '../interfaces/IDashboard'

// Função para buscar todos os dashboard
export const fetchAllDashboard = async (): Promise<IDashboard> => {
  try {
    const response = await fetch(`${API_BASE_URL}/dashboard`)
    if (!response.ok) {
      const errorMessage = await response.text()
      throw new Error(`Erro ao buscar dashboard: ${errorMessage}`)
    }
    const data: IDashboard = await response.json()
    return data
  } catch (error) {
    console.error('Erro ao buscar dashboard:', error)
    throw new Error('Erro ao buscar dashboard')
  }
}
