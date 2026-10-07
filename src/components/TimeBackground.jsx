import { getTimeBackgroundStyle } from '../lib/timeOfDay.js';
import { useMeditation } from '../context/MeditationContext.jsx';
import { useTimeOfDayPeriod } from '../hooks/useTimeOfDayPeriod.js';

export default function TimeBackground() {
  const { settings } = useMeditation();
  const period = useTimeOfDayPeriod(settings.autoTimeOfDay);

  return (
    <div
      className="time-background"
      style={getTimeBackgroundStyle(period, settings.autoTimeBackground)}
      aria-hidden="true"
    />
  );
}
