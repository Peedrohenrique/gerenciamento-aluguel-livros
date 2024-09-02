import { PropsWithChildren } from 'react'
import { cn } from '@/lib/utils'
import { Sidebar } from '@/components/sidebar'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export default async function Layout({ children }: PropsWithChildren) {
  return (
    <div className={cn('min-h-screen bg-background font-sans antialiased')}>
      <Sidebar />
      <main className={cn('flex-1 sm:ml-64 p-10', poppins.className)}>
        {children}
      </main>
    </div>
  )
}
