import api from './api';

export interface Equipment {
  id: string;
  name: string;
  description: string;
  daily_rate: string;
  status: 'AVAILABLE' | 'RENTED' | 'MAINTENANCE';
  created_at?: string;
  image_url?: string;
  category?: string;
}

export const EquipmentService = {
  getAll: async (): Promise<Equipment[]> => {
    const response = await api.get('/equipment/');
    return response.data;
  },

  getById: async (id: string): Promise<Equipment> => {
    const response = await api.get(`/equipment/${id}/`);
    return response.data;
  },

  updateStatus: async (id: string, status: 'AVAILABLE' | 'RENTED' | 'MAINTENANCE') => {
    const response = await api.patch(`/equipment/${id}/`, { status });
    return response.data;
  },

  /**
   * Simulates a rental transaction.
   * Currently updates the status directly via PATCH.
   * Use the dedicated /contracts/ endpoint in production.
   */
  rent: async (id: string, data: { clientName: string; startDate: string; endDate: string }) => {
    const response = await api.patch(`/equipment/${id}/`, {
      status: 'RENTED'
    });
    return response.data;
  }
};