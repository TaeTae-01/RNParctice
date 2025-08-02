declare module '@env' {
  export const EXPO_PUBLIC_SUPABASE_URL: string;
  export const EXPO_PUBLIC_SUPABASE_ANON_KEY: string;
  export const EXPO_PUBLIC_APP_ENV: 'development' | 'staging' | 'production';
  export const EXPO_PUBLIC_API_BASE_URL: string;
  export const EXPO_PUBLIC_CACHE_DURATION: string;
  export const EXPO_PUBLIC_OFFLINE_CACHE_DURATION: string;
  export const EXPO_PUBLIC_CAFFEINE_HALF_LIFE: string;
  export const EXPO_PUBLIC_DEFAULT_DAILY_LIMIT: string;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EXPO_PUBLIC_SUPABASE_URL: string;
      EXPO_PUBLIC_SUPABASE_ANON_KEY: string;
      EXPO_PUBLIC_APP_ENV: 'development' | 'staging' | 'production';
      EXPO_PUBLIC_API_BASE_URL: string;
      EXPO_PUBLIC_CACHE_DURATION: string;
      EXPO_PUBLIC_OFFLINE_CACHE_DURATION: string;
      EXPO_PUBLIC_CAFFEINE_HALF_LIFE: string;
      EXPO_PUBLIC_DEFAULT_DAILY_LIMIT: string;
    }
  }
}

export { };
