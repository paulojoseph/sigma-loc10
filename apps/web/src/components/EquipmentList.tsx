'use client'

import { useQuery } from '@tanstack/react-query';
import { EquipmentService } from '../services/equipmentService';
import Link from 'next/link';
import { ArrowRight, Calendar, Hammer, Truck } from 'lucide-react';

export default function EquipmentList() {
  const { data: equipment, isLoading, isError } = useQuery({
    queryKey: ['equipment'],
    queryFn: EquipmentService.getAll,
  });

  if (isLoading) return <div className="p-12 text-center text-slate-400 animate-pulse">Carregando frota...</div>;
  if (isError) return <div className="p-12 text-center text-red-500 bg-red-50 rounded-lg">Erro ao carregar dados.</div>;

  const list = equipment || [];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'AVAILABLE': return { label: 'Disponível', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' };
      case 'RENTED': return { label: 'Alugado', color: 'bg-blue-100 text-blue-700 border-blue-200' };
      case 'MAINTENANCE': return { label: 'Manutenção', color: 'bg-amber-100 text-amber-700 border-amber-200' };
      default: return { label: status, color: 'bg-slate-100 text-slate-700 border-slate-200' };
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <header className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard de Frota</h1>
          <p className="text-slate-500 mt-2">Gerencie seus ativos, contratos e manutenções em tempo real.</p>
        </div>
        <div className="hidden sm:block">
          <span className="text-sm font-medium text-slate-500 bg-white px-3 py-1 rounded-full border shadow-sm">
            Total: {list.length} ativos
          </span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {list.map((item) => {
          const status = getStatusConfig(item.status);

          return (
            <Link
              key={item.id}
              href={`/equipment/${item.id}`}
              className="group bg-white rounded-xl border border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden"
            >
              <div className="p-5 flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-blue-50 transition-colors">
                    <Truck className="w-6 h-6 text-slate-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                  <span className={`text-[11px] px-2.5 py-1 rounded-full border font-semibold tracking-wide uppercase ${status.color}`}>
                    {status.label}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">{item.name}</h3>
                <p className="text-slate-500 text-sm line-clamp-2 h-10 leading-relaxed mb-4">
                  {item.description}
                </p>

                <div className="flex items-center gap-4 text-xs text-slate-400 mb-4 border-t border-slate-50 pt-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>2024</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Hammer className="w-3 h-3" />
                    <span>Rev: 02/24</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 px-5 py-3 border-t border-slate-100 flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">Diária</span>
                  <span className="font-bold text-slate-900">R$ {parseFloat(item.daily_rate).toFixed(2)}</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:text-white transition-all">
                  <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  );
}