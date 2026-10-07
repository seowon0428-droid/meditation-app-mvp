import { formatDateKey } from './timeOfDay.js';

export const STORAGE_KEY = 'meditation-app-v1';

export const DEFAULT_SETTINGS = {
  defaultVolume: 0.7,
  autoTimeBackground: true,
  autoTimeOfDay: true,
};

export function createDefaultState() {
  return {
    version: 1,
    sessions: [],
    challenge: {
      startDate: null,
      completedDays: [],
    },
    settings: { ...DEFAULT_SETTINGS },
  };
}

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createDefaultState();
    const parsed = JSON.parse(raw);
    if (!parsed || parsed.version !== 1) return createDefaultState();
    return {
      ...createDefaultState(),
      ...parsed,
      settings: { ...DEFAULT_SETTINGS, ...parsed.settings },
      challenge: {
        ...createDefaultState().challenge,
        ...parsed.challenge,
      },
    };
  } catch {
    return createDefaultState();
  }
}

export function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

/** @param {{ minutes: number, category: string, source?: 'timer' | 'youtube', title?: string }} session */
export function addSession(state, session) {
  const date = formatDateKey();
  const entry = {
    id: `${date}-${Date.now()}`,
    date,
    minutes: session.minutes,
    category: session.category,
    source: session.source ?? 'timer',
    title: session.title ?? '',
  };

  const next = {
    ...state,
    sessions: [...state.sessions, entry],
  };

  const challenge = ensureChallengeStarted(next, date);
  const completedDays = new Set(challenge.completedDays);
  if (!completedDays.has(date)) {
    completedDays.add(date);
  }
  next.challenge = {
    ...challenge,
    completedDays: [...completedDays].sort(),
  };

  return next;
}

function ensureChallengeStarted(state, dateKey) {
  const ch = state.challenge;
  if (ch.startDate) return ch;
  return { ...ch, startDate: dateKey };
}

export function getStats(sessions) {
  const totalMinutes = sessions.reduce((sum, s) => sum + s.minutes, 0);
  const totalCount = sessions.length;

  const daySet = new Set(sessions.map((s) => s.date));
  const sortedDays = [...daySet].sort();
  let streak = 0;
  if (sortedDays.length > 0) {
    const today = formatDateKey();
    let cursor = today;
    const hasToday = daySet.has(today);
    if (!hasToday) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      cursor = formatDateKey(yesterday);
    }
    while (daySet.has(cursor)) {
      streak += 1;
      const d = new Date(cursor);
      d.setDate(d.getDate() - 1);
      cursor = formatDateKey(d);
    }
  }

  return { totalMinutes, totalCount, streak };
}

/** Sessions on a given yyyy-mm-dd */
export function sessionsOnDate(sessions, dateKey) {
  return sessions.filter((s) => s.date === dateKey);
}

/**
 * 7-day challenge from startDate (inclusive)
 * @returns {{ dayIndex: number, days: { date: string, done: boolean }[] }}
 */
export function getChallengeProgress(challenge) {
  if (!challenge.startDate) {
    return { dayIndex: 0, days: [] };
  }
  const done = new Set(challenge.completedDays);
  const start = new Date(challenge.startDate);
  const days = [];
  for (let i = 0; i < 7; i += 1) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const key = formatDateKey(d);
    days.push({ date: key, done: done.has(key) });
  }
  const today = formatDateKey();
  const dayIndex = days.findIndex((x) => x.date === today);
  return { dayIndex, days };
}
