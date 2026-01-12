import { ContractConfig } from "./contract";

const toMinutes = (time: string) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

export const getWorkStatus = (contract: ContractConfig, now = new Date()) => {
  const day = now.getDay();

  if (!contract.workDays.includes(day)) return "Fuera de jornada";

  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const start = toMinutes(contract.startHour);
  const end = toMinutes(contract.endHour);

  if (currentMinutes < start || currentMinutes > end) return "Fuera de jornada";

  if (contract.breakStart && contract.breakEnd) {
    const bStart = toMinutes(contract.breakStart);
    const bEnd = toMinutes(contract.breakEnd);
    if (currentMinutes >= bStart && currentMinutes <= bEnd) return "En pausa";
  }

  return "Jornada activa";
};
