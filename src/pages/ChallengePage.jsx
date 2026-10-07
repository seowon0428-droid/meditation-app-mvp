import { Link } from 'react-router-dom';
import { useMeditation } from '../context/MeditationContext.jsx';

export default function ChallengePage() {
  const { state, challengeProgress } = useMeditation();
  const started = Boolean(state.challenge.startDate);

  return (
    <div className="page challenge-page">
      <h1>7일 명상 챌린지</h1>
      <p className="lead">
        🌱 7일 동안 나를 위한 시간을 가져보세요.
      </p>
      <p className="muted">하루에 1번 이상 명상하면 성공합니다.</p>

      {!started && (
        <div className="card">
          <p className="muted">첫 명상을 완료하면 챌린지가 시작됩니다.</p>
          <Link to="/meditate" className="btn btn-primary btn-lg">
            명상 시작
          </Link>
        </div>
      )}

      {started && (
        <ol className="challenge-days">
          {challengeProgress.days.map((day, index) => (
            <li
              key={day.date}
              className={day.done ? 'challenge-day challenge-day--done' : 'challenge-day'}
            >
              <span>DAY {index + 1}</span>
              <span aria-hidden="true">{day.done ? '●' : '○'}</span>
              <span className="muted">{day.date}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
