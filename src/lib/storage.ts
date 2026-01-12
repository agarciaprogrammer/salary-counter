import { ContractConfig } from "./contract";

const KEY = "salary_contract";

export const saveContract = (data: ContractConfig) => {
  localStorage.setItem(KEY, JSON.stringify(data));
};

export const loadContract = (): ContractConfig | null => {
  const raw = localStorage.getItem(KEY);
  if (!raw) return null;
  return JSON.parse(raw);
};
