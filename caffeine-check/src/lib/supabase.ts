import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';

// 환경변수 가져오기
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

// 환경변수 검증
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase 환경변수가 설정되지 않았습니다. .env 파일을 확인해주세요.');
}

// SecureStore 어댑터 (토큰 암호화 저장)
const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    SecureStore.setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    SecureStore.deleteItemAsync(key);
  },
};

// Supabase 클라이언트 생성
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter, // 보안 저장소 사용
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// 디버그용 로그 (개발 환경에서만)
if (__DEV__) {
  console.log('🔗 Supabase 클라이언트 초기화 완료');
  console.log('📡 URL:', supabaseUrl);
}
