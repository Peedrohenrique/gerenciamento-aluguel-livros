'use client'
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-6xl font-bold">Gerenciamento de Aluguel de Livros</h1>
      <Button className="mt-10" onClick={() => router.push('admin/dashboard')}>Login</Button>
    </main>
  );
}