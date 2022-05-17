import React from 'react';
import { useFonts, DMSans_400Regular } from '@expo-google-fonts/dm-sans';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DMSerifDisplay_400Regular } from '@expo-google-fonts/dm-serif-display';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components/native';
import { Product } from './src/screens/Product';
import { AuthProvider } from './src/hooks/auth';
import * as SplashScreen from 'expo-splash-screen';

import theme from './src/theme';
import { SignIn } from './src/screens/SignIn';

export default function App() {
  SplashScreen.preventAutoHideAsync();
  
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSerifDisplay_400Regular
  });

  if (!fontsLoaded) {
    return null;
  }

  SplashScreen.hideAsync();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        <StatusBar style="light" translucent />
        <AuthProvider>
          <Product />
        </AuthProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

