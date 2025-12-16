'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-slate-900 border-b border-slate-800 text-white">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo / Marca */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold text-lg">
            S
          </div>
          <span className="font-bold text-xl tracking-tight">Sigma Loc</span>
        </div>

        {/* Links de Navegação */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <Link href="/" className="hover:text-white transition-colors">Dashboard</Link>
          <Link href="/equipamentos" className="hover:text-white transition-colors">Equipamentos</Link>
          <Link href="/contratos" className="hover:text-white transition-colors">Contratos</Link>
          <Link href="/relatorios" className="hover:text-white transition-colors">Relatórios</Link>
        </div>

        {/* Perfil / Admin */}
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-white">Admin User</p>
            <p className="text-xs text-slate-400">Gerente de Operações</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-slate-700 border-2 border-slate-600"></div>
        </div>
      </div>
    </nav>
  );
}