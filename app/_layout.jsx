import { StyleSheet, Text, View } from 'react-native'
import "../global.css";
import {SplashScreen, Slot, Stack} from 'expo-router'
import {useFonts} from 'expo-font'
import { useEffect } from 'react';
import GlobalProvider from '../context/GlobalProvider';

SplashScreen.preventAutoHideAsync();
// Loads in the fonts from assets making them easier to access throughout the application
const RootLayout = () => {
    const [fontsLoaded, error] = useFonts({
      "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
      "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
      "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
      "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
      "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
      "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
      "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
      "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
      "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
    });
  
  
  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error])

    if (!fontsLoaded && !error) return null;

  return (
    <GlobalProvider>
  <Stack>
    {/* The index screen is the default screen that will be shown when the app is opened */}
    {/* the method of hiding the header is by setting the headerShown property to false */}
    <Stack.Screen name ="index" options={{headerShown:
    false}}/>
    <Stack.Screen name ="(auth)" options={{headerShown:
    false}}/>
    <Stack.Screen name ="(tabs)" options={{headerShown:
    false}}/>
    <Stack.Screen name ="search/[query]" options={{headerShown:
    false}}/>
  </Stack>
  </GlobalProvider>
  )
}

export default RootLayout

