import { Outlet } from 'react-router-dom';
import { MeditationProvider } from '../context/MeditationContext.jsx';
import TimeBackground from './TimeBackground.jsx';
import Nav from './Nav.jsx';

export default function Layout() {
  return (
    <MeditationProvider>
      <div className="app-shell">
        <TimeBackground />
        <Nav />
        <main className="app-main">
          <Outlet />
        </main>
      </div>
    </MeditationProvider>
  );
}
