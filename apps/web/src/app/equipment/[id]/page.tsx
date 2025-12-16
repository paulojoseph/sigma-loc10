'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import ConfirmModal from '@/components/ConfirmModal';
import RentModal from '@/components/RentModal';

interface Equipment {
  id: string;
  name: string;
  description: string;
  daily_rate: string;
  status: 'AVAILABLE' | 'RENTED' | 'MAINTENANCE';
  created_at: string;
}

export default function EquipmentDetail({ params }: { params: { id: string } }) {
  const [item, setItem] = useState<Equipment | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  // Estados dos Modais
  const [isModalOpen, setIsModalOpen] = useState(false);      // Manutenção
  const [isRentModalOpen, setIsRentModalOpen] = useState(false); // Locação

  useEffect(() => {
    fetchEquipment();
  }, [params.id]);

  const fetchEquipment = () => {
    fetch(`http://localhost:8000/api/equipment/${params.id}/`)
      .then((res) => res.json())
      .then((data) => {
        setItem(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  };

  // --- AÇÃO 1: Manutenção ---
  const handleMaintenance = async () => {
    if (!item) return;
    setProcessing(true);

    const newStatus = item.status === 'MAINTENANCE' ? 'AVAILABLE' : 'MAINTENANCE';
    const actionName = newStatus === 'MAINTENANCE' ? 'entrada em manutenção' : 'liberação do equipamento';

    try {
      const res = await fetch(`http://localhost:8000/api/equipment/${item.id}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        fetchEquipment();
        toast.success(`Sucesso! A ${actionName} foi registrada.`);
      } else {
        toast.error('Erro ao atualizar status. Tente novamente.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Erro de conexão com o servidor.');
    } finally {
      setProcessing(false);
    }
  };

  // --- AÇÃO 2: Locação (Aluguel) ---
  const handleRentConfirm = async (rentalData: { clientName: string; startDate: string; endDate: string }) => {
    if (!item) return;
    setProcessing(true);

    try {
      // Simulação: Atualiza status para RENTED (Num app real, criaria o contrato via POST)
      const res = await fetch(`http://localhost:8000/api/equipment/${item.id}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'RENTED',
          // Aqui poderíamos enviar rentalData para um endpoint de contratos
        }),
      });

      if (res.ok) {
        fetchEquipment();
        toast.success(`Contrato gerado para ${rentalData.clientName}! Equipamento alugado.`);
        console.log("Dados do Contrato:", rentalData);
      } else {
        toast.error('Erro ao realizar locação.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Erro de conexão.');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) return <div className="p-10 text-center">Carregando detalhes...</div>;
  if (!item) return <div className="p-10 text-center text-red-500">Equipamento não encontrado.</div>;

  const isMaintenance = item.status === 'MAINTENANCE';

  return (
    <div className="min-h-screen bg-gray-50 p-8">

      {/* 1. Modal de Manutenção */}
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleMaintenance}
        title={isMaintenance ? "Finalizar Manutenção?" : "Agendar Manutenção?"}
        description={isMaintenance
          ? "O equipamento voltará a ficar disponível para locação imediatamente."
          : "O equipamento ficará indisponível para novos contratos até a conclusão do serviço."}
        confirmText={isMaintenance ? "Liberar Equipamento" : "Confirmar Manutenção"}
        isDestructive={!isMaintenance}
      />

      {/* 2. Modal de Locação */}
      <RentModal
        isOpen={isRentModalOpen}
        onClose={() => setIsRentModalOpen(false)}
        onConfirm={handleRentConfirm}
        dailyRate={parseFloat(item.daily_rate)}
        equipmentName={item.name}
      />

      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-gray-500 hover:text-blue-600 mb-6 inline-block text-sm">
          ← Voltar para a Frota
        </Link>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          {/* Header */}
          <div className="bg-slate-900 p-8 text-white flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">{item.name}</h1>
              <p className="text-slate-400 mt-2 text-sm">ID: {item.id}</p>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-70">Valor Diária</p>
              <p className="text-3xl font-bold text-green-400">
                R$ {parseFloat(item.daily_rate).toFixed(2)}
              </p>
            </div>
          </div>

          <div className="p-8">
            {/* Status Badge */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-gray-600 font-medium">Status Atual:</span>
              <span className={`px-3 py-1 rounded-full text-sm font-bold 
                 ${item.status === 'AVAILABLE' ? 'bg-green-100 text-green-700' :
                  item.status === 'RENTED' ? 'bg-blue-100 text-blue-700' :
                    'bg-red-100 text-red-700'}`}>
                {item.status}
              </span>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-4">Descrição Técnica</h3>
            <p className="text-gray-600 leading-relaxed text-lg mb-8">
              {item.description}
            </p>

            {/* Área de Ação */}
            <div className="border-t pt-8 flex gap-4">

              {/* Botão de Aluguel */}
              <button
                onClick={() => setIsRentModalOpen(true)}
                disabled={item.status !== 'AVAILABLE'}
                className={`flex-1 py-3 px-6 rounded-lg font-bold text-white transition-all
                  ${item.status === 'AVAILABLE'
                    ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-200 shadow-lg'
                    : 'bg-blue-100 text-blue-400 cursor-not-allowed'}`}
              >
                {item.status === 'AVAILABLE'
                  ? 'Alugar Agora'
                  : item.status === 'RENTED'
                    ? 'Atualmente Alugado'
                    : 'Em Manutenção'}
              </button>

              {/* Botão de Manutenção */}
              <button
                onClick={() => setIsModalOpen(true)}
                disabled={processing || item.status === 'RENTED'}
                className={`px-6 py-3 border rounded-lg font-medium transition-colors
                  ${isMaintenance
                    ? 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'}
                  ${processing ? 'opacity-50 cursor-wait' : ''}
                `}
              >
                {isMaintenance ? 'Finalizar Manutenção' : 'Agendar Manutenção'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}