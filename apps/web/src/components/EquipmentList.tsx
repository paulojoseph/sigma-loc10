'use client'

import { useEffect, useState } from 'react';

// Tipagem para TypeScript (Senioridade: Type Safety)
interface Equipment {
  id: string;
  name: string;
  description: string;
  daily_rate: string;
  status: 'AVAILABLE' | 'RENTED' | 'MAINTENANCE';
}

export default function EquipmentList() {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Busca os dados da API
    fetch('http://localhost:8000/api/equipment/')
      .then((res) => res.json())
      .then((data) => {
        setEquipment(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar equipamentos:", err);
        setLoading(false);
      });
  }, []);

  // Função auxiliar para cores de status (UI/UX)
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'AVAILABLE': return 'bg-green-100 text-green-800 border-green-200';
      case 'RENTED': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'MAINTENANCE': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const translateStatus = (status: string) => {
    const map: Record<string, string> = {
      'AVAILABLE': 'Disponível',
      'RENTED': 'Alugado',
      'MAINTENANCE': 'Manutenção'
    };
    return map[status] || status;
  }

  if (loading) return <div className="p-8 text-center text-gray-500">Carregando frota...</div>;

  return (
    <div className="p-6 bg-gray-50 text-gray-900">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
        🚜 Frota Sigma Loc
      </h2>

      {/* Grid Responsivo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {equipment.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100">
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                <span className={`text-xs px-2 py-1 rounded-full border font-medium ${getStatusColor(item.status)}`}>
                  {translateStatus(item.status)}
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-4 h-10 line-clamp-2">
                {item.description}
              </p>

              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                <span className="text-xs text-gray-500">Diária</span>
                <span className="text-xl font-bold text-blue-600">
                  R$ {parseFloat(item.daily_rate).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Botão de Ação Fake */}
            <div className="bg-gray-50 px-5 py-3 border-t border-gray-100 text-right">
              <button className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
                Ver Detalhes →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}