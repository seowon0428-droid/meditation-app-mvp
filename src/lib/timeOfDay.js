import bgDawn from '../../새벽.png';
import bgDay from '../../낮.png';
import bgDusk from '../../노을.png';
import bgNight from '../../밤.png';
import bgLateNight from '../../깊은 밤.png';

/** @typedef {'dawn' | 'day' | 'dusk' | 'night' | 'lateNight'} TimeOfDay */

export const TIME_OF_DAY_ORDER = ['dawn', 'day', 'dusk', 'night', 'lateNight'];

const BG_OVERLAY =
  'linear-gradient(160deg, rgba(8, 10, 14, 0.52) 0%, rgba(8, 10, 14, 0.28) 45%, rgba(8, 10, 14, 0.58) 100%)';

export const TIME_OF_DAY_META = {
  dawn: {
    label: '새벽',
    emoji: '🌅',
    greeting: '고요한 새벽이에요.',
    sub: '하루를 부드럽게 시작해보세요.',
    recommendCategory: 'morning',
    bgImage: bgDawn,
    bgGradient:
      'linear-gradient(160deg, #1a2332 0%, #3d4f6f 40%, #6b7f9a 100%)',
  },
  day: {
    label: '낮',
    emoji: '☀️',
    greeting: '좋은 하루예요.',
    sub: '잠시 숨을 고르며 쉬어가세요.',
    recommendCategory: 'focus',
    bgImage: bgDay,
    bgGradient:
      'linear-gradient(160deg, #1e3a4a 0%, #2d5a6b 45%, #4a8a9e 100%)',
  },
  dusk: {
    label: '노을',
    emoji: '🌇',
    greeting: '하루가 저물고 있어요.',
    sub: '오늘의 무게를 조금 내려놓아요.',
    recommendCategory: 'stress',
    bgImage: bgDusk,
    bgGradient:
      'linear-gradient(160deg, #2a1f2e 0%, #5c3d4a 40%, #8b5e6b 100%)',
  },
  night: {
    label: '밤',
    emoji: '🌙',
    greeting: '오늘 하루도 수고했어요.',
    sub: '잠시 쉬어가세요.',
    recommendCategory: 'sleep',
    bgImage: bgNight,
    bgGradient:
      'linear-gradient(160deg, #0d1117 0%, #1a1f35 50%, #252b45 100%)',
  },
  lateNight: {
    label: '깊은 밤',
    emoji: '🌌',
    greeting: '깊은 밤이에요.',
    sub: '생각을 내려놓고 몸을 쉬게 해요.',
    recommendCategory: 'sleep',
    bgImage: bgLateNight,
    bgGradient:
      'linear-gradient(160deg, #050508 0%, #12121a 55%, #1c1c28 100%)',
  },
};

/**
 * @param {TimeOfDay} period
 * @param {boolean} [useNatureBackground]
 */
export function getTimeBackgroundStyle(period, useNatureBackground = true) {
  const meta = TIME_OF_DAY_META[period] ?? TIME_OF_DAY_META.night;
  const active = useNatureBackground ? meta : TIME_OF_DAY_META.night;

  if (useNatureBackground && active.bgImage) {
    return {
      backgroundColor: '#0a0c10',
      backgroundImage: `${BG_OVERLAY}, url(${active.bgImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    };
  }

  return {
    background: active.bgGradient,
  };
}

/**
 * @param {Date} [date]
 * @returns {TimeOfDay}
 */
export function getTimeOfDay(date = new Date()) {
  const h = date.getHours();
  if (h >= 5 && h < 8) return 'dawn';
  if (h >= 8 && h < 17) return 'day';
  if (h >= 17 && h < 20) return 'dusk';
  if (h >= 20 && h < 24) return 'night';
  return 'lateNight';
}

export function formatDateKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}
