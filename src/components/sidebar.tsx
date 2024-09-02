'use client'
import Link from 'next/link'
import { Button } from './ui/button'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import {
  Home,
  LogOut,
  Package,
  PanelBottom,
  BookOpen,
  ShoppingBag,
  Users,
} from 'lucide-react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { UserDropdown } from './user-dropdown'
import { IUser } from '@/interfaces/IUser'

export function Sidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  const user: IUser = {
    name: 'Pedro Henrique.',
    email: 'pedro@test.com',
    image: 'https://github.com/Peedrohenrique.png',
  }

  return (
    <div className="flex flex-col w-full bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 border-r border-gray-200 bg-background sm:flex flex-col">
        <nav className="grid gap-6 text-lg font-medium">
          <div className="flex  text-muted-foreground border-b border-gray-200  py-3 font-normal text-lg hover:text-foreground ">
            <Link
              href="#"
              className="flex h-10 w-10 bg-primary rounded-full text-lg items-center justify-center text-primary-foreground md:text-base"
              prefetch={false}
            >
              <BookOpen className="w-5 h-5" />
              <span className="sr-only">Logo</span>
            </Link>
            <span className="m-auto ml-4">Gerenciamento Livros</span>
          </div>

          <Link
            href="dashboard"
            className={cn([
              isActive('/admin/dashboard') && 'bg-secondary rounded-md',
              `flex items-center gap-4 px-4 text-muted-foreground font-normal text-base hover:text-foreground`,
            ])}
            prefetch={false}
          >
            <Home className="w-5 h-5" />
            dashboard
          </Link>
          <Link
            href="alugueis"
            className={cn([
              isActive('/admin/alugueis') && 'bg-secondary rounded-md',
              `flex items-center gap-4 px-4 text-muted-foreground font-normal text-base hover:text-foreground`,
            ])}
            prefetch={false}
          >
            <ShoppingBag className="w-5 h-5" />
            Aluguéis
          </Link>
          <Link
            href="livros"
            className={cn([
              isActive('/admin/livros') && 'bg-secondary rounded-md',
              `flex items-center gap-4 px-4 text-muted-foreground font-normal text-base hover:text-foreground`,
            ])}
            prefetch={false}
          >
            <Package className="w-5 h-5" />
            Livros
          </Link>
          <Link
            href="clientes"
            className={cn([
              isActive('/admin/clientes') && 'bg-secondary rounded-md',
              `flex items-center gap-4 px-4 text-muted-foreground font-normal text-base hover:text-foreground`,
            ])}
            prefetch={false}
          >
            <Users className="w-5 h-5" />
            Clientes
          </Link>
          <Link
            href="autores"
            className={cn([
              isActive('/admin/autores') && 'bg-secondary rounded-md',
              `flex items-center gap-4 px-4 text-muted-foreground font-normal text-base hover:text-foreground`,
            ])}
            prefetch={false}
          >
            <Users className="w-5 h-5" />
            Autores
          </Link>
        </nav>
        <nav className="mt-auto flex flex-col items-lert gap-4 px-2 py-5">
          {/* <Link
            href="/"
            className="flex items-center gap-4 px-4 text-muted-foreground font-normal text-base hover:text-foreground"
          >
            <LogOut className="w-5 h-5" />
            Sair
          </Link> */}
          <UserDropdown user={user} />
        </nav>
      </aside>

      <div className="sm:hidden flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center px-4 border-b bg-background gap-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelBottom className="w-5 h-5" />
                <span className="sr-only">Abrir / fechar menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="sm:max-w-x">
              <nav className="grid gap-6 text-lg font-medium">
                <div className="flex  text-muted-foreground border-b border-gray-200  py-3 font-normal text-lg hover:text-foreground ">
                  <Link
                    href="#"
                    className="flex h-10 w-10 bg-primary rounded-full text-lg
                  items-center justify-center text-primary-foreground md:text-base"
                    prefetch={false}
                  >
                    <BookOpen className="w-5 h-5" />
                    <span className="sr-only">Logo</span>
                  </Link>
                  <span className="m-auto ml-4">Gerenciamento Livros</span>
                </div>
                <Link
                  href="/"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground font-normal text-base hover:text-foreground"
                  prefetch={false}
                >
                  <Home className="w-5 h-5" />
                  Início
                </Link>

                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground font-normal text-base hover:text-foreground"
                  prefetch={false}
                >
                  <ShoppingBag className="w-5 h-5" />
                  Pedidos
                </Link>

                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground font-normal text-base hover:text-foreground"
                  prefetch={false}
                >
                  <Package className="w-5 h-5" />
                  Produtos
                </Link>

                <Link
                  href="client"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground font-normal text-base hover:text-foreground"
                  prefetch={false}
                >
                  <Users className="w-5 h-5" />
                  Clientes
                </Link>

                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground font-normal text-base hover:text-foreground"
                  prefetch={false}
                >
                  <LogOut className="w-5 h-5" />
                  Sair
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <h2>Menu</h2>
        </header>
      </div>
    </div>
  )
}
