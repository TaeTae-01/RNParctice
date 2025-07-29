// 사용자 관련 타입
export interface User {
  id: string;
  email: string;
  name: string;
  gender: 'male' | 'female' | 'other';
  age: number;
  weight: number;
  daily_caffeine_limit: number;
  current_caffeine: number;
  theme_preference: 'light' | 'dark' | 'system';
  created_at: string;
  updated_at: string;
}

// 카페인 아이템 타입
export interface CaffeineItem {
  id: string;
  category: 'coffee' | 'energy_drink';
  brand: string;
  name: string;
  size?: string; // 커피만 해당
  caffeine_content: number; // mg
  serving_size_ml?: number;
  icon_name: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

// 카페인 로그 타입
export interface CaffeineLog {
  id: string;
  user_id: string;
  caffeine_item_id: string;
  caffeine_amount: number;
  consumed_at: string;
  metabolism_complete_at: string;
  is_active: boolean;
  created_at: string;
  // 조인된 데이터
  caffeine_item?: CaffeineItem;
}

// 테마 관련 타입
export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  card: string;
  text: string;
  textSecondary: string;
  border: string;
  error: string;
  success: string;
  warning: string;
  caffeine: string;
  progressBg: string;
  progressFill: string;
}

// 계층적 선택 관련 타입
export interface CategoryOption {
  id: 'coffee' | 'energy_drink';
  name: string;
  icon: string;
}

export interface BrandOption {
  id: string;
  name: string;
  icon: string;
}

export interface DrinkOption {
  id: string;
  name: string;
  icon: string;
  caffeine?: number; // 에너지 드링크용
}

export interface SizeOption {
  id: string;
  name: string;
  multiplier: number;
}

// 선택 상태 타입
export interface CaffeineSelection {
  category: 'coffee' | 'energy_drink';
  brand: string;
  drink: DrinkOption;
  size?: SizeOption;
  caffeine: number;
}

// 네비게이션 타입
export type RootStackParamList = {
  AuthStack: undefined;
  MainStack: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
};

export type MainStackParamList = {
  MainTabs: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  CaffeineSelection: undefined;
  History: undefined;
  Profile: undefined;
};

// API 응답 타입
export interface ApiResponse<T> {
  data: T;
  error: null;
}

export interface ApiError {
  data: null;
  error: {
    message: string;
    code?: string;
  };
}

// 폼 관련 타입
export interface ProfileFormData {
  name: string;
  gender: 'male' | 'female' | 'other';
  age: number;
  weight: number;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  gender: 'male' | 'female' | 'other';
  age: number;
  weight: number;
}

// 캐시 관련 타입
export interface CacheItem<T> {
  value: T;
  timestamp: number;
  ttl: number;
}

// 오프라인 액션 타입
export interface PendingAction {
  type: 'ADD_CAFFEINE' | 'UPDATE_PROFILE' | 'UPDATE_THEME';
  payload: any;
  timestamp: number;
  id: string;
}
