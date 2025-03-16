import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import frontpage from './Screens/frontpage';
import register from './Screens/register';
import login from './Screens/login';
import map from './Screens/MapScreen';
import search from './Screens/searchPage'

SplashScreen.preventAutoHideAsync();
const h = "wara ka baby"
const Stack = createStackNavigator();
const a = "lols";
export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'poppins': require('./assets/fonts/Poppins-SemiBold.ttf'),
    'poppinreg': require('./assets/fonts/Poppins-Regular.ttf'),
    'poppinmed': require('./assets/fonts/Poppins-Medium.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="">
      <Stack.Screen 
          name="map" 
          component={map} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="frontpage" 
          component={frontpage} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="register" 
          component={register} 
          options={{ headerShown: true}}
        />
        <Stack.Screen 
          name="login" 
          component={login} 
          options={{ headerShown: true, title: ' '  }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
