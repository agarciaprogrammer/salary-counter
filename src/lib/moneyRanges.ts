import { ContractConfig } from "./contract";
import { calculateMoney, calculateWorkedMinutes } from "./timeCalculator";

export const calculateTodayMoney = (contract: ContractConfig) => {
  const now = new Date();
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);

  const minutes =
    calculateWorkedMinutes(contract, now) -
    calculateWorkedMinutes(contract, start);

  return calculateMoney(minutes, contract);
};

export const calculateLast7DaysMoney = (contract: ContractConfig) => {
  const now = new Date();
  const start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const minutes =
    calculateWorkedMinutes(contract, now) -
    calculateWorkedMinutes(contract, start);

  return calculateMoney(minutes, contract);
};

export const calculateMonthlyMoney = (contract: ContractConfig) => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);

  const minutes =
    calculateWorkedMinutes(contract, now) -
    calculateWorkedMinutes(contract, start);

  return calculateMoney(minutes, contract);
};
