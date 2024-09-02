'use client'
import BlurIn from '@/components/magicui/blur-in'
import { BorderBeam } from '@/components/magicui/border-beam'
import Confetti, { ConfettiRef } from '@/components/magicui/confetti'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'

export default function Home() {
  const confettiRef = useRef<ConfettiRef>(null)
  const router = useRouter()

  return (
    <main className="flex min-h-screen flex-col items-center p-24 overflow-hidden">
      <Card className="relative flex h-[200px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
        <BlurIn
          className="text-6xl font-bold"
          word="Gerenciamento"
          duration={0.5}
        />
        <BorderBeam size={250} duration={12} delay={9} />
        <Confetti
          ref={confettiRef}
          className="absolute left-0 top-0 z-0 size-full"
          onMouseEnter={() => {
            confettiRef.current?.fire({})
          }}
        />
      </Card>

      {/* <h1 className="text-6xl font-bold">Gerenciamento de Aluguel de Livros</h1> */}
      <Button className="mt-10" onClick={() => router.push('admin/dashboard')}>
        Login
      </Button>

      {/* <div className="relative h-[200px] w-[200px] rounded-xl">
        <BorderBeam />
        </div> */}
    </main>
  )
}
