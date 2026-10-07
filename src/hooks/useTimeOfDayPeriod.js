import { useEffect, useState } from 'react';
import { getTimeOfDay } from '../lib/timeOfDay.js';

/**
 * @param {boolean} enabled
 */
export function useTimeOfDayPeriod(enabled = true) {
  const [period, setPeriod] = useState(() => getTimeOfDay());

  useEffect(() => {
    if (!enabled) return undefined;
    const sync = () => setPeriod(getTimeOfDay());
    sync();
    const id = window.setInterval(sync, 60_000);
    return () => window.clearInterval(id);
  }, [enabled]);

  return enabled ? period : 'night';
}
