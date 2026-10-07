import { createContext, useContext } from 'react';
import { useMeditationStorage } from '../hooks/useMeditationStorage.js';

const MeditationContext = createContext(null);

export function MeditationProvider({ children }) {
  const value = useMeditationStorage();
  return (
    <MeditationContext.Provider value={value}>
      {children}
    </MeditationContext.Provider>
  );
}

export function useMeditation() {
  const ctx = useContext(MeditationContext);
  if (!ctx) {
    throw new Error('useMeditation must be used within MeditationProvider');
  }
  return ctx;
}
