import type { Metadata } from "next";
import "./globals.css";

import { Poppins } from 'next/font/google';

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "200", "300", "400", "500", "600", "700", "800", "900"] });

export const metadata: Metadata = {
  title: "Gerenciamento de Aluguel de Livros",
  description: "Projeto de gerenciamento de aluguel de livros",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
