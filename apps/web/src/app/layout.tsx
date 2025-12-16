import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import Navbar from '../components/Navbar';
import Providers from '../components/Providers';
import './globals.css';

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