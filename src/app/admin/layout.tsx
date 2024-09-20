import { PropsWithChildren } from 'react'
import { cn } from '@/lib/utils'
import { Sidebar } from '@/components/sidebar'

export default async function Layout({ children }: PropsWithChildren) {
  return (
    <div className={cn('min-h-screen bg-background antialiased')}>
      <Sidebar />
      <main className="flex-1 sm:ml-64 p-5">{children}</main>
    </div>
  )
}
