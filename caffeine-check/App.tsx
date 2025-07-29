import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import './assets/styles/global.css';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold text-primary-500 mb-4">
        ☕ Caffeine Tracker
      </Text>
      <Text className="text-lg text-gray-600 mb-2">
        카페인 추적 앱
      </Text>
      <Text className="text-base text-gray-500">
        NativeWind 설정 완료! 🎉
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}
