'use client';

import Link from 'next/link';
import { Truck } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/70 border-b border-slate-200 supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo / Marca */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-blue-200 shadow-md group-hover:scale-105 transition-transform duration-200">
            <Truck size={18} strokeWidth={2.5} />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-800">Sigma<span className="text-blue-600">Loc</span></span>
        </Link>

        {/* Links de Navegação */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500">
          <Link href="/" className="hover:text-blue-600 transition-colors">Dashboard</Link>
          <Link href="#" className="hover:text-blue-600 transition-colors">Equipamentos</Link>
          <Link href="#" className="hover:text-blue-600 transition-colors">Contratos</Link>
          <Link href="#" className="hover:text-blue-600 transition-colors">Relatórios</Link>
        </div>

        {/* Perfil / Admin */}
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-semibold text-slate-700">Admin User</p>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider">Gerente</p>
          </div>
          <div className="h-9 w-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 text-xs font-bold">
            AU
          </div>
        </div>
      </div>
    </nav>
  );
}