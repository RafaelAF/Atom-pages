"use client";

import { useEffect, useState } from "react";

interface CountdownProps {
  targetDate: string;
  label?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function Countdown({
  targetDate,
  label = "Contagem regressiva para o grande dia",
}: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const destination = new Date(targetDate).getTime();

    function calculateTime() {
      const now = new Date().getTime();
      const difference = destination - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      });
    }

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const pad = (num: number) => String(num).padStart(2, "0");

  return (
    <div className="w-full max-w-md mb-8">
      {label && (
        <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-3 text-center">
          {label}
        </p>
      )}
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        <div className="bg-surface border border-primary/40 rounded-2xl p-3 shadow-sm text-center">
          <span className="block font-serif text-2xl sm:text-3xl font-bold text-text">
            {mounted ? pad(timeLeft.days) : "00"}
          </span>
          <span className="text-[11px] uppercase tracking-wider text-text/70">Dias</span>
        </div>
        <div className="bg-surface border border-primary/40 rounded-2xl p-3 shadow-sm text-center">
          <span className="block font-serif text-2xl sm:text-3xl font-bold text-text">
            {mounted ? pad(timeLeft.hours) : "00"}
          </span>
          <span className="text-[11px] uppercase tracking-wider text-text/70">Horas</span>
        </div>
        <div className="bg-surface border border-primary/40 rounded-2xl p-3 shadow-sm text-center">
          <span className="block font-serif text-2xl sm:text-3xl font-bold text-text">
            {mounted ? pad(timeLeft.minutes) : "00"}
          </span>
          <span className="text-[11px] uppercase tracking-wider text-text/70">Min</span>
        </div>
        <div className="bg-surface border border-primary/40 rounded-2xl p-3 shadow-sm text-center">
          <span className="block font-serif text-2xl sm:text-3xl font-bold text-primaryDark">
            {mounted ? pad(timeLeft.seconds) : "00"}
          </span>
          <span className="text-[11px] uppercase tracking-wider text-text/70">Seg</span>
        </div>
      </div>
    </div>
  );
}

