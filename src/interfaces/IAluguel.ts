export interface IAluguel {
  id?: string
  data_aluguel: Date
  data_devolucao: Date
  cliente_id?: string
  livro_id?: string
  observacao?: string | undefined
  status: boolean
  cliente?: {
    nome: string
  }
  livro?: {
    titulo: string
  }
}
