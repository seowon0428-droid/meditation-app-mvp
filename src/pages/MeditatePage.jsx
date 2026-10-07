import { useState } from 'react';
import MeditationVideoSection from '../components/MeditationVideoSection.jsx';
import meditations from '../data/meditations.json';

const DURATIONS = [5, 10, 15, 20];

export default function MeditatePage() {
  const [minutes, setMinutes] = useState(10);
  const [category, setCategory] = useState(meditations.categories[0].id);

  return (
    <div className="page meditate-page">
      <section className="meditate-timer" aria-labelledby="meditate-duration-prompt">
        <p id="meditate-duration-prompt" className="lead">
          얼마나 명상할까요?
        </p>
        <div className="duration-grid">
          {DURATIONS.map((m) => (
            <button
              key={m}
              type="button"
              className={minutes === m ? 'chip chip--active' : 'chip'}
              onClick={() => setMinutes(m)}
            >
              {m}분
            </button>
          ))}
        </div>
      </section>

      <MeditationVideoSection
        selectedMinutes={minutes}
        category={category}
        onCategoryChange={setCategory}
      />
    </div>
  );
}
