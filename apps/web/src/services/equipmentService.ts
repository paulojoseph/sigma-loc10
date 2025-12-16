import api from './api';

// 1. Interface alinhada com o Serializer do Django
export interface Equipment {
  id: string; // Django usa UUID (String), não number
  name: string;
  description: string; // Obrigatório no nosso Model
  daily_rate: string; // Django DecimalField vem como string para preservar precisão
  status: 'AVAILABLE' | 'RENTED' | 'MAINTENANCE';
  created_at?: string;
  image_url?: string; // Opcional
  category?: string;  // Opcional
}

export const EquipmentService = {
  // Busca todos (Listagem)
  getAll: async (): Promise<Equipment[]> => {
    const response = await api.get('/equipment/');
    return response.data;
  },

  // Busca um (Detalhe)
  getById: async (id: string): Promise<Equipment> => {
    const response = await api.get(`/equipment/${id}/`);
    return response.data;
  },

  // Atualiza status (Manutenção ou Devolução)
  updateStatus: async (id: string, status: 'AVAILABLE' | 'RENTED' | 'MAINTENANCE') => {
    const response = await api.patch(`/equipment/${id}/`, { status });
    return response.data;
  },

  // Realiza locação (Simulação MVP via PATCH no status)
  // No futuro, isso seria um POST em /contracts/
  rent: async (id: string, data: { clientName: string; startDate: string; endDate: string }) => {
    // Por enquanto, atualizamos o status e logamos o contrato.
    // O Backend aceita apenas o status no PATCH do equipment, 
    // dados do contrato iriam para outro endpoint na versão final.
    const response = await api.patch(`/equipment/${id}/`, {
      status: 'RENTED'
    });
    return response.data;
  }
};