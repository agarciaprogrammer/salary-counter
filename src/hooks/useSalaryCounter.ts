"use client";

import { useEffect, useState } from "react";
import { calculateWorkedMinutes, calculateMoney } from "@/lib/timeCalculator";
import { ContractConfig } from "@/lib/contract";

export const useSalaryCounter = (contract: ContractConfig | null) => {
  const [money, setMoney] = useState(0);

  useEffect(() => {
    if(!contract) return;

    const update = () => {
      const minutes = calculateWorkedMinutes(contract);
      const total = calculateMoney(minutes, contract);
      setMoney(total);
    };

    update();
    const interval = setInterval(update, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [contract]);

  return money;
};
