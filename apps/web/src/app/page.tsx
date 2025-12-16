'use client';

import { useQuery } from '@tanstack/react-query';
import { EquipmentService, Equipment } from '../services/equipmentService';
import EquipmentList from '../components/EquipmentList';
import Link from 'next/link';

export default function Home() {
  const { data: equipment = [], isLoading } = useQuery({
    queryKey: ['equipment'],
    queryFn: EquipmentService.getAll,
  });

  const totalAssets = equipment.length;
  const availableAssets = equipment.filter((e: Equipment) => e.status === 'AVAILABLE').length;
  const maintenanceAssets = equipment.filter((e: Equipment) => e.status === 'MAINTENANCE').length;
  const rentedAssets = equipment.filter((e: Equipment) => e.status === 'RENTED').length;

  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard Operacional</h1>
            <p className="text-slate-500 mt-1">Visão geral da frota e disponibilidade em tempo real.</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="http://localhost:8000/admin"
              target="_blank"
              className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200"
            >
              Acessar Backoffice (Admin)
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
          <KpiCard title="Total de Ativos" value={totalAssets} icon="🚜" color="bg-white" />
          <KpiCard title="Disponíveis" value={availableAssets} icon="✅" color="bg-green-50 border-green-100 text-green-700" />
          <KpiCard title="Alugados" value={rentedAssets} icon="🤝" color="bg-blue-50 border-blue-100 text-blue-700" />
          <KpiCard title="Em Manutenção" value={maintenanceAssets} icon="🔧" color="bg-red-50 border-red-100 text-red-700" />
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            📋 Inventário Recente
          </h2>
          {isLoading ? (
            <div className="p-10 text-center text-slate-400">Carregando indicadores...</div>
          ) : (
            <EquipmentList equipment={equipment} />
          )}
        </div>
      </div>
    </div>
  );
}

interface KpiCardProps {
  title: string;
  value: number;
  icon: string;
  color: string;
}

function KpiCard({ title, value, icon, color }: KpiCardProps) {
  return (
    <div className={`p-6 rounded-xl border ${color.includes('bg-white') ? 'border-slate-200 bg-white' : color} shadow-sm transition-all hover:shadow-md`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider opacity-70 mb-1">{title}</p>
          <h3 className="text-3xl font-bold">{value}</h3>
        </div>
        <span className="text-2xl">{icon}</span>
      </div>
    </div>
  );
}