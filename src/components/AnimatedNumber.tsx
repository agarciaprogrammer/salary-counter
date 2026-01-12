"use client";

import { useEffect, useState } from "react";

export default function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const diff = value - display;
    const step = diff / 20;

    let current = display;

    const interval = setInterval(() => {
      current += step;
      if ((step > 0 && current >= value) || (step < 0 && current <= value)) {
        current = value;
        clearInterval(interval);
      }
      setDisplay(current);
    }, 30);

    return () => clearInterval(interval);
  }, [value]);

  return <>{display.toFixed(2)}</>;
}
