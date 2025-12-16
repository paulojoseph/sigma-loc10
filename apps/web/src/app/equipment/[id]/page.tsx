'use client';

import { useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import ConfirmModal from '@/components/ConfirmModal';
import RentModal from '@/components/RentModal';
import { EquipmentService } from '@/services/equipmentService';
import api from '@/services/api';
import { ArrowLeft, CheckCircle2, AlertTriangle, PenTool, CalendarClock, ShieldCheck } from 'lucide-react';

export default function EquipmentDetail({ params }: { params: { id: string } }) {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRentModalOpen, setIsRentModalOpen] = useState(false);

  // Queries & Mutations
  const { data: item, isLoading, isError } = useQuery({
    queryKey: ['equipment', params.id],
    queryFn: () => EquipmentService.getById(params.id),
    retry: 1
  });

  const mutationStatus = useMutation({
    mutationFn: async (newStatus: string) => {
      const response = await api.patch(`/equipment/${params.id}/`, { status: newStatus });
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['equipment', params.id] });
      queryClient.invalidateQueries({ queryKey: ['equipment'] });
      toast.success(`Status atualizado para ${data.status}`);
      setIsModalOpen(false);
    },
    onError: () => toast.error("Erro ao atualizar status.")
  });

  const mutationRent = useMutation({
    mutationFn: async (rentalData: { status: string; clientName: string }) => {
      const response = await api.patch(`/equipment/${params.id}/`, { status: 'RENTED' });
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['equipment', params.id] });
      queryClient.invalidateQueries({ queryKey: ['equipment'] });
      toast.success(`Alugado para ${variables.clientName}`);
      setIsRentModalOpen(false);
    },
    onError: () => toast.error("Erro ao processar locação.")
  });

  if (isLoading) return <div className="min-h-screen flex items-center justify-center text-slate-400">Carregando...</div>;
  if (isError || !item) return <div className="min-h-screen flex items-center justify-center text-red-500">Equipamento não encontrado.</div>;

  const isMaintenance = item.status === 'MAINTENANCE';
  const isRented = item.status === 'RENTED';
  const isAvailable = item.status === 'AVAILABLE';

  return (
    <div className="min-h-screen pb-20">

      {/* Modais */}
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => mutationStatus.mutate(isMaintenance ? 'AVAILABLE' : 'MAINTENANCE')}
        title={isMaintenance ? "Concluir Manutenção" : "Enviar para Manutenção"}
        description={isMaintenance
          ? "Confirmar que o equipamento está apto para voltar à frota?"
          : "O equipamento ficará indisponível durante o período."}
        confirmText={isMaintenance ? "Liberar" : "Confirmar Manutenção"}
        isDestructive={!isMaintenance}
      />

      <RentModal
        isOpen={isRentModalOpen}
        onClose={() => setIsRentModalOpen(false)}
        onConfirm={(data) => mutationRent.mutate({ status: 'RENTED', clientName: data.clientName })}
        dailyRate={parseFloat(item.daily_rate as any)}
        equipmentName={item.name}
      />

      {/* Main Content: Asymmetric Grid */}
      <div className="container mx-auto px-6 pt-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors mb-8 group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Voltar para Dashboard
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

          {/* Coluna Esquerda: Detalhes (2/3) */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 w-fit
                   ${isAvailable ? 'bg-emerald-100 text-emerald-700' :
                    isRented ? 'bg-blue-100 text-blue-700' :
                      'bg-amber-100 text-amber-700'}`}>
                  {isAvailable && <CheckCircle2 size={12} />}
                  {isRented && <CalendarClock size={12} />}
                  {isMaintenance && <AlertTriangle size={12} />}
                  {item.status}
                </span>
                <span className="text-slate-400 text-xs font-mono">ID: {item.id}</span>
              </div>
              <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
                {item.name}
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-y border-slate-100 py-8">
              <div className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
                <div className="text-slate-400 text-xs uppercase font-bold mb-1">Categoria</div>
                <div className="font-medium text-slate-900">Pesado</div>
              </div>
              <div className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
                <div className="text-slate-400 text-xs uppercase font-bold mb-1">Ano Modelo</div>
                <div className="font-medium text-slate-900">2024</div>
              </div>
              <div className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
                <div className="text-slate-400 text-xs uppercase font-bold mb-1">Seguro</div>
                <div className="font-medium text-green-600 flex items-center gap-1">
                  <ShieldCheck size={14} /> Ativo
                </div>
              </div>
            </div>
          </div>

          {/* Coluna Direita: Sticky Action Card (1/3) */}
          <div className="lg:col-span-1 lg:sticky lg:top-24">
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6">
              <div className="flex justify-between items-baseline mb-8">
                <span className="text-slate-500 font-medium">Valor Diária</span>
                <span className="text-3xl font-bold text-slate-900">
                  R$ {parseFloat(item.daily_rate as any).toFixed(2)}
                </span>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => setIsRentModalOpen(true)}
                  disabled={!isAvailable}
                  className={`w-full py-3.5 px-4 rounded-xl font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2
                       ${isAvailable
                      ? 'bg-blue-600 hover:bg-blue-700 hover:shadow-blue-200 hover:-translate-y-0.5'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'}`}
                >
                  {isAvailable ? 'Iniciar Locação' : 'Indisponível'}
                </button>

                <button
                  onClick={() => setIsModalOpen(true)}
                  disabled={isRented}
                  className={`w-full py-3.5 px-4 rounded-xl font-bold border-2 transition-all flex items-center justify-center gap-2
                       ${isMaintenance
                      ? 'border-emerald-100 bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                      : 'border-slate-100 bg-white text-slate-600 hover:border-slate-200 hover:text-slate-900'}`}
                >
                  <PenTool size={16} />
                  {isMaintenance ? 'Concluir Manutenção' : 'Registrar Manutenção'}
                </button>
              </div>

              <div className="mt-6 text-center">
                <p className="text-xs text-slate-400 leading-relaxed">
                  Ao alugar, você concorda com os Termos de Serviço da Sigma Loc. O faturamento ocorre na devolução.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}