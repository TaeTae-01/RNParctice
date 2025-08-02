import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { supabase } from '../../lib/supabase';
import { debugLog, CAFFEINE_CONSTANTS, BROWN_COLORS } from '../../utils/constants';

/**
 * 환경변수 및 설정 테스트 컴포넌트
 * 개발 환경에서만 사용
 */
export const EnvTest: React.FC = () => {
  // 환경변수 로드 테스트
  const envVars = {
    SUPABASE_URL: process.env.EXPO_PUBLIC_SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 20) + '...',
    APP_ENV: process.env.EXPO_PUBLIC_APP_ENV,
    API_BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL,
    CACHE_DURATION: process.env.EXPO_PUBLIC_CACHE_DURATION,
    CAFFEINE_HALF_LIFE: process.env.EXPO_PUBLIC_CAFFEINE_HALF_LIFE,
    DEFAULT_DAILY_LIMIT: process.env.EXPO_PUBLIC_DEFAULT_DAILY_LIMIT,
  };

  // Supabase 연결 테스트
  const testSupabaseConnection = async () => {
    try {
      debugLog('Supabase 연결 테스트 시작');
      const { data, error } = await supabase.from('_test').select('*').limit(1);
      
      if (error) {
        debugLog('Supabase 연결 테스트 결과', { 
          status: 'success', 
          message: '연결 성공 (테이블이 없어도 정상)' 
        });
      } else {
        debugLog('Supabase 연결 테스트 결과', { 
          status: 'success', 
          message: '연결 및 쿼리 성공',
          data 
        });
      }
    } catch (err) {
      debugLog('Supabase 연결 테스트 실패', err);
    }
  };

  React.useEffect(() => {
    testSupabaseConnection();
  }, []);

  if (process.env.EXPO_PUBLIC_APP_ENV !== 'development') {
    return null; // 개발 환경이 아니면 렌더링하지 않음
  }

  return (
    <ScrollView className="flex-1 p-4 bg-gray-50">
      <Text className="text-2xl font-bold mb-4 text-center" style={{ color: BROWN_COLORS.brown[700] }}>
        🧪 환경변수 테스트
      </Text>

      {/* 환경변수 표시 */}
      <View className="bg-white p-4 rounded-lg mb-4 shadow-sm">
        <Text className="text-lg font-semibold mb-2" style={{ color: BROWN_COLORS.brown[600] }}>
          📋 환경변수 로드 상태
        </Text>
        {Object.entries(envVars).map(([key, value]) => (
          <View key={key} className="flex-row justify-between py-1 border-b border-gray-100">
            <Text className="font-medium text-gray-700">{key}:</Text>
            <Text className="text-gray-600 flex-1 text-right ml-2" numberOfLines={1}>
              {value || '❌ 없음'}
            </Text>
          </View>
        ))}
      </View>

      {/* 상수 값 표시 */}
      <View className="bg-white p-4 rounded-lg mb-4 shadow-sm">
        <Text className="text-lg font-semibold mb-2" style={{ color: BROWN_COLORS.brown[600] }}>
          ⚙️ 카페인 관련 상수
        </Text>
        <Text className="text-gray-700">반감기: {CAFFEINE_CONSTANTS.HALF_LIFE}시간</Text>
        <Text className="text-gray-700">완전 분해 시간: {CAFFEINE_CONSTANTS.COMPLETE_ELIMINATION_HOURS}시간</Text>
        <Text className="text-gray-700">최소 감지량: {CAFFEINE_CONSTANTS.MIN_DETECTABLE_AMOUNT}mg</Text>
        <Text className="text-gray-700">기본 일일 한도: {CAFFEINE_CONSTANTS.MAX_DAILY_LIMIT}mg</Text>
      </View>

      {/* 브라운 컬러 팔레트 표시 */}
      <View className="bg-white p-4 rounded-lg mb-4 shadow-sm">
        <Text className="text-lg font-semibold mb-2" style={{ color: BROWN_COLORS.brown[600] }}>
          🎨 브라운 컬러 팔레트
        </Text>
        <View className="flex-row flex-wrap">
          {Object.entries(BROWN_COLORS.brown).map(([shade, color]) => (
            <View
              key={shade}
              className="w-12 h-12 m-1 rounded"
              style={{ backgroundColor: color }}
            >
              <Text className="text-xs text-center mt-3 text-white font-bold">
                {shade}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Supabase 클라이언트 정보 */}
      <View className="bg-white p-4 rounded-lg shadow-sm">
        <Text className="text-lg font-semibold mb-2" style={{ color: BROWN_COLORS.brown[600] }}>
          🔗 Supabase 클라이언트 상태
        </Text>
        <Text className="text-gray-700">URL: {supabase.supabaseUrl}</Text>
        <Text className="text-gray-700">Key: {supabase.supabaseKey.substring(0, 20)}...</Text>
        <Text className="text-green-600 mt-2">✅ 클라이언트 초기화 완료</Text>
        <Text className="text-blue-600 mt-1">🔍 콘솔에서 연결 테스트 결과를 확인하세요</Text>
      </View>
    </ScrollView>
  );
};