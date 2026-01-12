"use client";

import { loadContract } from "@/lib/storage";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSalaryCounter } from "@/hooks/useSalaryCounter";
import AnimatedNumber from "@/components/AnimatedNumber";
import { getWorkStatus } from "@/lib/workStatus";
import { calculateDailyProgress } from "@/lib/dailyProgress";

export default function Dashboard() {
  const [contract, setContract] = useState<any>(null);

  useEffect(() => {
    setContract(loadContract());
  }, []);

  const money = useSalaryCounter(contract);

  if (!contract) {
    return (
      <main className="p-10">
        <Link href="/setup">Ir a configuración</Link>
      </main>
    );
  }

  const status = getWorkStatus(contract);
  const daily = calculateDailyProgress(contract);

  return (
    <main className="h-screen flex flex-col items-center justify-center text-center px-4">

      {/* Estado laboral */}
      <p className="text-sm text-gray-400 mb-4">
        {status}
      </p>

      {/* Contador */}
      <div className="text-6xl font-bold">
        {contract.currency} <AnimatedNumber value={money} />
      </div>

      <p className="text-gray-500 mt-3">
        Generados desde que empezaste
      </p>

      {/* Barra diaria */}
      <div className="w-64 h-2 bg-gray-700 rounded overflow-hidden mt-6">
        <div
          className="h-full bg-white transition-all duration-500"
          style={{ width: `${daily}%` }}
        />
      </div>

      <p className="text-xs text-gray-400 mt-2">
        Hoy completaste {daily.toFixed(1)}%
      </p>

      {/* Frase */}
      <p className="mt-6 italic text-sm text-gray-400">
        Esto no apareció solo.
      </p>

      <Link href="/setup" className="mt-10 text-sm underline">
        Ajustes
      </Link>

    </main>
  );
}
