import { useMemo, useState } from 'react';
import { sessionsOnDate } from '../lib/storage.js';
import { formatDateKey } from '../lib/timeOfDay.js';
import meditations from '../data/meditations.json';
import { useMeditation } from '../context/MeditationContext.jsx';

function categoryLabel(id) {
  return meditations.categories.find((c) => c.id === id)?.label ?? id;
}

export default function HistoryPage() {
  const { sessions, stats } = useMeditation();
  const [viewDate, setViewDate] = useState(() => new Date());
  const [selectedKey, setSelectedKey] = useState(formatDateKey());

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstWeekday = new Date(year, month, 1).getDay();

  const sessionDates = useMemo(() => {
    const set = new Set(sessions.map((s) => s.date));
    return set;
  }, [sessions]);

  const selectedSessions = sessionsOnDate(sessions, selectedKey);

  const shiftMonth = (delta) => {
    setViewDate(new Date(year, month + delta, 1));
  };

  return (
    <div className="page history-page">
      <h1>명상 기록</h1>
      <div className="stats-row">
        <div className="stat">
          <span className="stat-value">{stats.totalMinutes}</span>
          <span className="stat-label">총 분</span>
        </div>
        <div className="stat">
          <span className="stat-value">{stats.totalCount}</span>
          <span className="stat-label">횟수</span>
        </div>
        <div className="stat">
          <span className="stat-value">{stats.streak}</span>
          <span className="stat-label">연속 일</span>
        </div>
      </div>

      <div className="calendar">
        <div className="calendar-header">
          <button type="button" className="btn btn-ghost" onClick={() => shiftMonth(-1)}>
            ‹
          </button>
          <span>{year}년 {month + 1}월</span>
          <button type="button" className="btn btn-ghost" onClick={() => shiftMonth(1)}>
            ›
          </button>
        </div>
        <div className="calendar-weekdays">
          {['일', '월', '화', '수', '목', '금', '토'].map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>
        <div className="calendar-grid">
          {Array.from({ length: firstWeekday }).map((_, i) => (
            <span key={`pad-${i}`} className="calendar-cell calendar-cell--empty" />
          ))}
          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const key = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const hasSession = sessionDates.has(key);
            const isSelected = selectedKey === key;
            return (
              <button
                key={key}
                type="button"
                className={[
                  'calendar-cell',
                  hasSession ? 'calendar-cell--done' : '',
                  isSelected ? 'calendar-cell--selected' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => setSelectedKey(key)}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      <section className="card history-detail-card">
        <h2 className="history-detail-date">{selectedKey}</h2>
        {selectedSessions.length === 0 && (
          <p className="muted history-detail-empty">이 날짜의 기록이 없습니다.</p>
        )}
        <ul className="session-list history-detail-sessions">
          {selectedSessions.map((s) => (
            <li key={s.id}>
              명상 {s.minutes}분 · {categoryLabel(s.category)}
              {s.title ? ` · ${s.title}` : ''}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
