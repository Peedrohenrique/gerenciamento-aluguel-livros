export interface ILivro {
  id?: string
  titulo: string
  descricao: string
  preco_aluguel: number
  autor_id: string
  autor: {
    nome: string
  }
}
