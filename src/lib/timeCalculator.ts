import { ContractConfig } from "./contract";

const toMinutes = (time: string) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

export const calculateMoney = (
  minutes: number,
  contract: ContractConfig
) => {
  const monthlyMinutes = calculateMonthlyWorkMinutes(contract);
  const ratePerMinute = contract.salaryMonthly / monthlyMinutes;

  return minutes * ratePerMinute;
};

export const calculateWorkedMinutes = (
  contract: ContractConfig,
  now = new Date()
): number => {

  const startDate = new Date(contract.startDate);
  let totalMinutes = 0;

  const workStart = toMinutes(contract.startHour);
  const workEnd = toMinutes(contract.endHour);

  const breakStart = contract.breakStart ? toMinutes(contract.breakStart) : null;
  const breakEnd = contract.breakEnd ? toMinutes(contract.breakEnd) : null;

  let current = new Date(startDate);

  while (current <= now) {
    const day = current.getDay(); // 0 domingo

    if (contract.workDays.includes(day)) {

      let dayStart = new Date(current);
      let dayEnd = new Date(current);

      dayStart.setHours(
        Math.floor(workStart / 60),
        workStart % 60,
        0,
        0
      );

      dayEnd.setHours(
        Math.floor(workEnd / 60),
        workEnd % 60,
        0,
        0
      );

      if (dayStart < startDate) dayStart = startDate;
      if (dayEnd > now) dayEnd = now;

      if (dayEnd > dayStart) {
        let minutes = (dayEnd.getTime() - dayStart.getTime()) / 60000;

        if (breakStart !== null && breakEnd !== null) {
          const bStart = new Date(current);
          const bEnd = new Date(current);

          bStart.setHours(Math.floor(breakStart / 60), breakStart % 60, 0, 0);
          bEnd.setHours(Math.floor(breakEnd / 60), breakEnd % 60, 0, 0);

          if (bEnd > dayStart && bStart < dayEnd) {
            const overlapStart = Math.max(bStart.getTime(), dayStart.getTime());
            const overlapEnd = Math.min(bEnd.getTime(), dayEnd.getTime());
            minutes -= (overlapEnd - overlapStart) / 60000;
          }
        }

        totalMinutes += Math.max(0, minutes);
      }
    }

    current.setDate(current.getDate() + 1);
    current.setHours(0,0,0,0);
  }

  return totalMinutes;
};

export const calculateMonthlyWorkMinutes = (contract: ContractConfig) => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  let total = 0;

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    if (contract.workDays.includes(date.getDay())) {
      const dailyMinutes =
        (toMinutes(contract.endHour) - toMinutes(contract.startHour)) -
        (contract.breakStart && contract.breakEnd
          ? toMinutes(contract.breakEnd) - toMinutes(contract.breakStart)
          : 0);

      total += dailyMinutes;
    }
  }

  return total;
};
