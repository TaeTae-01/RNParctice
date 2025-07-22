import { createHomeStyles } from '@/assets/styles/home.styles';
import useTheme from '@/hooks/useTheme';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const settingScreen = () => {

    const { toggleDarkMode, colors } = useTheme();

    const homeStyles = createHomeStyles(colors);

    return (
    <LinearGradient colors={colors.gradients.background} style = {homeStyles.container}
    >
      <StatusBar barStyle={colors.statusBarStyle}/>
      <SafeAreaView style={homeStyles.container}>
        <Text style={homeStyles.todoText}>Setting Tab</Text>
        <TouchableOpacity onPress={toggleDarkMode}>
          <Text style={homeStyles.todoText}>Change Theme !</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
    )
}

export default settingScreen;
