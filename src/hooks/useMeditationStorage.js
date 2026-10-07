import { useCallback, useEffect, useState } from 'react';
import {
  addSession,
  getChallengeProgress,
  getStats,
  loadState,
  saveState,
} from '../lib/storage.js';

export function useMeditationStorage() {
  const [state, setState] = useState(() => loadState());

  useEffect(() => {
    saveState(state);
  }, [state]);

  const recordSession = useCallback((session) => {
    setState((prev) => addSession(prev, session));
  }, []);

  const updateSettings = useCallback((partial) => {
    setState((prev) => ({
      ...prev,
      settings: { ...prev.settings, ...partial },
    }));
  }, []);

  const stats = getStats(state.sessions);
  const challengeProgress = getChallengeProgress(state.challenge);

  return {
    state,
    sessions: state.sessions,
    settings: state.settings,
    stats,
    challengeProgress,
    recordSession,
    updateSettings,
  };
}
