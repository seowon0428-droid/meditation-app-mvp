import { Link } from 'react-router-dom';
import meditations from '../data/meditations.json';
import { useMeditation } from '../context/MeditationContext.jsx';
import { TIME_OF_DAY_META } from '../lib/timeOfDay.js';
import { useTimeOfDayPeriod } from '../hooks/useTimeOfDayPeriod.js';

export default function HomePage() {
  const { settings } = useMeditation();
  const period = useTimeOfDayPeriod(settings.autoTimeOfDay);
  const meta = TIME_OF_DAY_META[period];
  const recommendId = meta.recommendCategory;
  const recommend = meditations.items.find((i) => i.category === recommendId)
    ?? meditations.items[0];
  const categoryLabel =
    meditations.categories.find((c) => c.id === recommend?.category)?.label ?? '';

  return (
    <div className="page home-page">
      <p className="home-emoji" aria-hidden="true">{meta.emoji}</p>
      <h1 className="home-greeting">{meta.greeting}</h1>
      <p className="home-sub">{meta.sub}</p>

      <Link to="/meditate" className="btn btn-primary btn-lg">
        명상 시작
      </Link>

      <section className="card home-today">
        <p className="section-label">오늘의 명상</p>
        <h2 className="home-today-title">{recommend?.title ?? '마음을 가라앉히는 10분'}</h2>
        <p className="muted">{categoryLabel} · {recommend?.durationLabel}</p>
        <Link to="/meditate" className="btn btn-secondary">
          시작하기
        </Link>
      </section>
    </div>
  );
}
