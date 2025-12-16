import type { Metadata } from 'next';
// 1. Fonte comentada para evitar erro de timeout no Docker
// import { Inter } from 'next/font/google'; 
import { Toaster } from 'sonner';
import Navbar from '../components/Navbar';
import Providers from '../components/Providers'; // Essencial para o React Query
import './globals.css';

// 2. Configuração da fonte comentada
// const inter = Inter({ subsets: ['latin'] });

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
      {/* 3. Usamos 'font-sans' genérico em vez da classe da Inter */}
      <body className="font-sans bg-slate-50 min-h-screen">
        <Providers>
          <Navbar />
          <main className="pt-6">
            {children}
          </main>
          <Toaster richColors position="top-right" />
        </Providers>
      </body>
    </html>
  );
}