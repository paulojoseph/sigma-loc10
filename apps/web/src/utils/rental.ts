export const RentalLogic = {
  /**
   * Calculates the number of days between two dates.
   * Returns 0 if end date is before start date.
   * Minimum 1 day.
   */
  calculateDays: (startDate: string, endDate: string): number => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Reset hours to avoid timezone issues affecting day diff
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    if (end < start) return 0;

    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Se a data for a mesma (diff=0), conta como 1 diária
    return diffDays === 0 ? 1 : diffDays;
  },

  calculateTotal: (days: number, dailyRate: number): number => {
    return days * dailyRate;
  }
};
