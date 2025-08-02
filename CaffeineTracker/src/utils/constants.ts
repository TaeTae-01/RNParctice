/**
 * 앱 전체에서 사용되는 상수들
 */

// 환경변수에서 카페인 관련 설정 가져오기
export const CAFFEINE_HALF_LIFE = parseFloat(
  process.env.EXPO_PUBLIC_CAFFEINE_HALF_LIFE || '5.5'
); // 시간

export const DEFAULT_DAILY_LIMIT = parseInt(
  process.env.EXPO_PUBLIC_DEFAULT_DAILY_LIMIT || '400',
  10
); // mg

export const CACHE_DURATION = parseInt(
  process.env.EXPO_PUBLIC_CACHE_DURATION || '300000',
  10
); // 5분 (밀리초)

export const OFFLINE_CACHE_DURATION = parseInt(
  process.env.EXPO_PUBLIC_OFFLINE_CACHE_DURATION || '86400000',
  10
); // 24시간 (밀리초)

// 카페인 계산 관련 상수
export const CAFFEINE_CONSTANTS = {
  HALF_LIFE: CAFFEINE_HALF_LIFE,
  COMPLETE_ELIMINATION_HOURS: CAFFEINE_HALF_LIFE * 6, // 약 33시간 (99.9% 분해)
  MIN_DETECTABLE_AMOUNT: 10, // 10mg 이하일 때 무시
  WEIGHT_MULTIPLIER: 5.5, // 체중 1kg당 권장 카페인량
  MAX_DAILY_LIMIT: 400, // 최대 일일 권장량
} as const;

// 나이별/성별 조정 계수
export const DEMOGRAPHIC_FACTORS = {
  AGE: {
    UNDER_18: 0.5, // 18세 미만 50% 감소
    OVER_65: 0.8,  // 65세 이상 20% 감소
  },
  GENDER: {
    FEMALE: 0.9,   // 여성 10% 감소
    MALE: 1.0,
    OTHER: 1.0,
  },
} as const;

// 캐시 관련 상수
export const CACHE_KEYS = {
  USER_PROFILE: 'user_profile',
  CAFFEINE_DATA: 'caffeine_data',
  CAFFEINE_ITEMS: 'caffeine_items',
  PENDING_ACTIONS: 'pending_actions',
  THEME_PREFERENCE: 'theme_preference',
} as const;

// 앱 환경 체크
export const APP_ENV = process.env.EXPO_PUBLIC_APP_ENV || 'development';
export const IS_DEV = APP_ENV === 'development';
export const IS_PROD = APP_ENV === 'production';

// API 관련 상수
export const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

// 브라운 테마 컬러 상수
export const BROWN_COLORS = {
  // 기본 브라운 팔레트
  brown: {
    50: '#FDF8F6',
    100: '#F2E8E5',
    200: '#EADDD7',
    300: '#E0CDC4',
    400: '#D6B8A7',
    500: '#A0715D', // 메인 브라운
    600: '#8B5A42',
    700: '#744C34',
    800: '#5D3E2A',
    900: '#4A3221',
  },
  // 카페인 관련 컬러
  caffeine: {
    light: '#8B4513', // 연한 갈색 (라이트 모드)
    dark: '#D2691E',  // 진한 갈색 (다크 모드)
    accent: '#CD853F', // 액센트 컬러
  },
  // 상태 컬러
  status: {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  },
} as const;

// 디버그 로그 함수
export const debugLog = (message: string, data?: any) => {
  if (IS_DEV) {
    console.log(`[CaffeineTracker] ${message}`, data || '');
  }
};