import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
}

const Countdown = () => {
  const target = new Date("2026-10-10T14:00:00").getTime();
  const [time, setTime] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = target - Date.now();

      setTime({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center py-10">
      <h2 className="text-2xl font-light mb-4">Faltam</h2>
      <div className="flex justify-center gap-6 text-3xl font-light">
        <div>{time.days}d</div>
        <div>{time.hours}h</div>
        <div>{time.minutes}m</div>
      </div>
    </div>
  );
};

export default Countdown;
