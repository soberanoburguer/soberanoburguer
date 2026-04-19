"use client";

import { useState, useEffect } from "react";

// Open every day 17:30–00:00.
// Returns nextOpenLabel: "hoje" if it's still before opening today,
// "amanhã" if already past closing (shouldn't happen with current schedule,
// but future-proofs for if a closed day is added).
function getStatus() {
  const now = new Date();
  const minutes = now.getHours() * 60 + now.getMinutes();
  const isOpen = minutes >= 17 * 60 + 30;
  const opensToday = !isOpen && minutes < 17 * 60 + 30;
  const nextOpenLabel = opensToday ? "hoje" : "amanhã";
  return { isOpen, closingTime: "00h", openingTime: "17h30", nextOpenLabel };
}

export function useStoreStatus() {
  const [status, setStatus] = useState(getStatus);

  useEffect(() => {
    const id = setInterval(() => setStatus(getStatus()), 60_000);
    return () => clearInterval(id);
  }, []);

  return status;
}
