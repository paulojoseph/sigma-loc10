import { useState, useEffect } from 'react';
import { toast } from 'sonner';

interface RentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: { clientName: string; startDate: string; endDate: string }) => void;
  dailyRate: number;
  equipmentName: string;
}

export default function RentModal({
  isOpen,
  onClose,
  onConfirm,
  dailyRate,
  equipmentName
}: RentModalProps) {
  const [clientName, setClientName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalDays, setTotalDays] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // Recalcula o total sempre que as datas mudam
  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      // Diferença em milissegundos
      const diffTime = Math.abs(end.getTime() - start.getTime());
      // Converte para dias (mínimo de 1 diária)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;

      if (end >= start) {
        setTotalDays(diffDays);
        setTotalPrice(diffDays * dailyRate);
      } else {
        setTotalDays(0);
        setTotalPrice(0);
      }
    }
  }, [startDate, endDate, dailyRate]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!clientName || !startDate || !endDate) {
      toast.warning('Por favor, preencha todos os campos.');
      return;
    }
    if (new Date(endDate) < new Date(startDate)) {
      toast.error('A data final deve ser depois da inicial.');
      return;
    }

    onConfirm({ clientName, startDate, endDate });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden">

        {/* Header */}
        <div className="bg-slate-900 p-6 text-white">
          <h3 className="text-xl font-bold">Novo Contrato de Locação</h3>
          <p className="text-slate-400 text-sm mt-1">Equipamento: {equipmentName}</p>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">

          {/* Nome do Cliente */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Nome do Cliente / Obra</label>
            <input
              type="text"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Ex: Construtora Silva - Obra Centro"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Data Início</label>
              <input
                type="date"
                className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Data Devolução</label>
              <input
                type="date"
                className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          {/* Resumo Financeiro (O "Tchan" do Sênior) */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex justify-between items-center mt-4">
            <div>
              <p className="text-xs text-blue-600 font-bold uppercase tracking-wider">Estimativa Total</p>
              <p className="text-blue-900 text-sm">{totalDays} diárias x R$ {dailyRate.toFixed(2)}</p>
            </div>
            <p className="text-2xl font-bold text-blue-700">R$ {totalPrice.toFixed(2)}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-4 flex justify-end gap-3 border-t border-slate-100">
          <button onClick={onClose} className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-200 rounded-lg">
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all"
          >
            Confirmar Locação
          </button>
        </div>
      </div>
    </div>
  );
}