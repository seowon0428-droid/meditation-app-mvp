import { useEffect, useState } from 'react';
import meditations from '../data/meditations.json';
import { useMeditation } from '../context/MeditationContext.jsx';

export default function MeditationVideoSection({
  selectedMinutes,
  category,
  onCategoryChange,
}) {
  const { recordSession } = useMeditation();
  const [activeId, setActiveId] = useState(null);

  const items = meditations.items.filter(
    (i) => i.category === category && i.minutes === selectedMinutes,
  );
  const active = items.find((i) => i.id === activeId) ?? null;

  useEffect(() => {
    setActiveId(null);
  }, [selectedMinutes, category]);

  const completeFromVideo = () => {
    if (!active) return;
    recordSession({
      minutes: active.minutes,
      category: active.category,
      source: 'youtube',
      title: active.title,
    });
  };

  return (
    <section className="meditate-videos" aria-labelledby="meditate-topic-prompt">
      <p id="meditate-topic-prompt" className="lead">
        어떤 명상을 할까요?
      </p>
      <div className="category-tabs" role="tablist">
        {meditations.categories.map((c) => (
          <button
            key={c.id}
            type="button"
            role="tab"
            aria-selected={category === c.id}
            className={category === c.id ? 'chip chip--active' : 'chip'}
            onClick={() => onCategoryChange(c.id)}
          >
            {c.emoji} {c.label}
          </button>
        ))}
      </div>

      <ul className="video-list">
        {items.length === 0 && (
          <li className="muted">
            선택한 시간과 주제에 맞는 영상은 곧 추가됩니다.
          </li>
        )}
        {items.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              className="video-list-item"
              onClick={() => setActiveId(item.id)}
            >
              <span>{item.title}</span>
              <span className="muted">{item.durationLabel}</span>
            </button>
          </li>
        ))}
      </ul>

      {active && (
        <section className="card player-card">
          <h3 className="player-title">{active.title}</h3>
          <div className="player-frame">
            <iframe
              title={active.title}
              src={`https://www.youtube-nocookie.com/embed/${active.youtubeId}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <button type="button" className="btn btn-primary" onClick={completeFromVideo}>
            명상 완료 · 기록 남기기
          </button>
        </section>
      )}
    </section>
  );
}
