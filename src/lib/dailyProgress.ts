import { ContractConfig } from "./contract";
import { calculateWorkedMinutes } from "./timeCalculator";

export const calculateDailyProgress = (contract: ContractConfig) => {
  const today = new Date();
  const start = new Date(today);
  start.setHours(0,0,0,0);

  const worked = calculateWorkedMinutes(contract, today) -
                 calculateWorkedMinutes(contract, start);

  const workMinutesPerDay = 8 * 60; // después lo refinamos

  return Math.min(100, (worked / workMinutesPerDay) * 100);
};
