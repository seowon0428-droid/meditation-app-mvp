import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: '홈', end: true },
  { to: '/meditate', label: '명상' },
  { to: '/history', label: '기록' },
  { to: '/challenge', label: '챌린지' },
];

export default function Nav() {
  return (
    <nav className="top-nav" aria-label="주요 메뉴">
      {links.map(({ to, label, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            isActive ? 'nav-link nav-link--active' : 'nav-link'
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
