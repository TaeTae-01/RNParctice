import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import './assets/styles/global.css';
import { EnvTest } from './src/components/common/EnvTest';

export default function App() {
  // 개발 환경에서는 환경변수 테스트 컴포넌트 표시
  if (process.env.EXPO_PUBLIC_APP_ENV === 'development') {
    return (
      <>
        <EnvTest />
        <StatusBar style="auto" />
      </>
    );
  }

  return (
    <View className="flex-1 items-center justify-center bg-brown-50">
      <Text className="text-2xl font-bold text-primary-500 mb-4">
        ☕ Caffeine Tracker
      </Text>
      <Text className="text-lg text-brown-700 mb-2">
        카페인 추적 앱
      </Text>
      <Text className="text-base text-brown-500">
        브라운 테마 적용 완료! 🎉
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}
