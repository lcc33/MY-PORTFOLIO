"use client";

import { useEffect, useState } from "react";

function formatTime(date: Date) {
  return new Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);
}

export function SiteClock() {
  const [time, setTime] = useState(() => formatTime(new Date()));

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTime(formatTime(new Date()));
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <time
      className="site-clock"
      dateTime={new Date().toISOString()}
      suppressHydrationWarning
    >
      {time}
    </time>
  );
}
