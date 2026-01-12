"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveContract } from "@/lib/storage";

const days = [
  { label: "Lunes", value: 1 },
  { label: "Martes", value: 2 },
  { label: "Miércoles", value: 3 },
  { label: "Jueves", value: 4 },
  { label: "Viernes", value: 5 },
  { label: "Sábado", value: 6 },
  { label: "Domingo", value: 0 },
];

export default function SetupPage() {
  const router = useRouter();

  const [startDate, setStartDate] = useState("");
  const [salaryMonthly, setSalaryMonthly] = useState("");
  const [currency, setCurrency] = useState("ARS");

  const [workDays, setWorkDays] = useState<number[]>([1,2,3,4,5]);

  const [startHour, setStartHour] = useState("09:00");
  const [endHour, setEndHour] = useState("18:00");

  const [hasBreak, setHasBreak] = useState(true);
  const [breakStart, setBreakStart] = useState("13:00");
  const [breakEnd, setBreakEnd] = useState("14:00");

  const toggleDay = (day:number) => {
    setWorkDays(prev =>
      prev.includes(day)
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  const handleSubmit = () => {
    saveContract({
      startDate,
      salaryMonthly: Number(salaryMonthly),
      currency,
      workDays,
      startHour,
      endHour,
      breakStart: hasBreak ? breakStart : undefined,
      breakEnd: hasBreak ? breakEnd : undefined,
    });

    router.push("/");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="w-full max-w-xl space-y-8">

        <div>
          <h1 className="text-3xl font-bold">Configurá tu contrato</h1>
          <p className="text-gray-400 text-sm">
            Definí cómo se transforma tu tiempo en valor.
          </p>
        </div>

        {/* Fecha inicio */}
        <div>
          <label className="text-sm text-gray-400">Fecha de inicio</label>
          <input type="date" className="w-full p-2 bg-gray-900 border border-gray-700 rounded" value={startDate} onChange={e=>setStartDate(e.target.value)} />
        </div>

        {/* Sueldo */}
        <div className="flex gap-2">
          <input type="number" placeholder="Sueldo mensual" className="flex-1 p-2 bg-gray-900 border border-gray-700 rounded" value={salaryMonthly} onChange={e=>setSalaryMonthly(e.target.value)} />
          <select className="p-2 bg-gray-900 border border-gray-700 rounded" value={currency} onChange={e=>setCurrency(e.target.value)}>
            <option>ARS</option>
            <option>USD</option>
            <option>EUR</option>
          </select>
        </div>

        {/* Días */}
        <div>
          <p className="text-sm text-gray-400 mb-2">Días laborales</p>
          <div className="flex flex-wrap gap-2">
            {days.map(d => (
              <button
                key={d.value}
                onClick={()=>toggleDay(d.value)}
                className={`px-3 py-1 rounded text-sm border ${
                  workDays.includes(d.value)
                    ? "bg-white text-black"
                    : "border-gray-600 text-gray-400"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Horario */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="text-sm text-gray-400">Inicio</label>
            <input type="time" className="w-full p-2 bg-gray-900 border border-gray-700 rounded" value={startHour} onChange={e=>setStartHour(e.target.value)} />
          </div>
          <div className="flex-1">
            <label className="text-sm text-gray-400">Fin</label>
            <input type="time" className="w-full p-2 bg-gray-900 border border-gray-700 rounded" value={endHour} onChange={e=>setEndHour(e.target.value)} />
          </div>
        </div>

        {/* Pausa */}
        <div>
          <label className="flex items-center gap-2 text-sm text-gray-400">
            <input type="checkbox" checked={hasBreak} onChange={e=>setHasBreak(e.target.checked)} />
            Tengo pausa
          </label>

          {hasBreak && (
            <div className="flex gap-4 mt-2">
              <input type="time" className="flex-1 p-2 bg-gray-900 border border-gray-700 rounded" value={breakStart} onChange={e=>setBreakStart(e.target.value)} />
              <input type="time" className="flex-1 p-2 bg-gray-900 border border-gray-700 rounded" value={breakEnd} onChange={e=>setBreakEnd(e.target.value)} />
            </div>
          )}
        </div>

        {/* Botón */}
        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-white text-black font-semibold rounded hover:opacity-90 transition"
        >
          Ir al contador
        </button>

      </div>
    </main>
  );
}