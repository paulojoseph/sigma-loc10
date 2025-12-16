import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner'; // <--- 1. Importe aqui
import Navbar from '../components/Navbar';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sigma Loc | Gestão de Ativos',
  description: 'Plataforma Enterprise de Locação',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-slate-50 min-h-screen`}>
        <Navbar />
        <main className="pt-6">
          {children}
        </main>

        {/* 2. Adicione o componente aqui */}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}