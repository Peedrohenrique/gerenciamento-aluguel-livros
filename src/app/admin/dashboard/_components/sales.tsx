import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { DollarSign, Users, BookOpen, CircleUserRound } from 'lucide-react'

export function Sales() {
  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-center">
            <CardTitle className="text-lg sm:text-xl ">Total aluguel</CardTitle>
            <DollarSign className="ml-auto w-4 h-4" />
          </div>
          <CardDescription>Total aluguéis em 30 dias</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-base sm:text-lg font-bold">R$ 40.000</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-center">
            <CardTitle className="text-lg sm:text-xl">Total cliente</CardTitle>
            <CircleUserRound className="ml-auto w-4 h-4" />
          </div>
          <CardDescription>Total de todos os clientes</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-base sm:text-lg font-bold">249</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-center">
            <CardTitle className="text-lg sm:text-xl">Total livro</CardTitle>
            <BookOpen className="ml-auto w-4 h-4" />
          </div>
          <CardDescription>Total de todos os livro</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-base sm:text-lg font-bold">79</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-center">
            <CardTitle className="text-lg sm:text-xl">Total autor</CardTitle>
            <Users className="ml-auto w-4 h-4" />
          </div>
          <CardDescription>Total de todos os autores</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-base sm:text-lg font-bold">2500</p>
        </CardContent>
      </Card>
    </section>
  )
}
