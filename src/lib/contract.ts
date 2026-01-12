export interface ContractConfig {
  startDate: string;
  salaryMonthly: number;
  currency: string;
  workDays: number[];
  startHour: string;
  endHour: string;
  breakStart?: string;
  breakEnd?: string;
}