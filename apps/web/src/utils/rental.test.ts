import { RentalLogic } from './rental';

describe('RentalLogic', () => {
  describe('calculateDays', () => {
    it('should return 1 day for same start and end date', () => {
      const days = RentalLogic.calculateDays('2024-01-01', '2024-01-01');
      expect(days).toBe(1);
    });

    it('should calculate correct difference', () => {
      const days = RentalLogic.calculateDays('2024-01-01', '2024-01-05');
      expect(days).toBe(4);
    });

    it('should return 0 if end date is before start date', () => {
      const days = RentalLogic.calculateDays('2024-01-05', '2024-01-01');
      expect(days).toBe(0);
    });
  });

  describe('calculateTotal', () => {
    it('should calculate multiplication correctly', () => {
      const total = RentalLogic.calculateTotal(5, 100);
      expect(total).toBe(500);
    });
  });
});
