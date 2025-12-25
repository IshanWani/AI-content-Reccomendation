import { useState, useEffect } from 'react';

export const useAutoRefresh = (interval = 5000, enabled = true) => {
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    if (!enabled) return;

    const timer = setInterval(() => {
      setLastUpdated(new Date());
    }, interval);

    return () => clearInterval(timer);
  }, [interval, enabled]);

  return { lastUpdated };
};