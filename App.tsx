// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import AdoptionScreen from './src/screens/AdoptionScreen';
import VetHelpScreen from './src/screens/VetHelpScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import LoginScreen from './src/screens/LoginScreen';

import { AuthProvider, useAuth } from './src/context/AuthContext';
import { RootStackParamList } from './src/navigation/types'; // ✅ import types
import SplashScreen from './src/screens/SplashScreen';

const Stack = createNativeStackNavigator<RootStackParamList>(); // ✅ apply types

function AppNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return <SplashScreen />;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Adoption" component={AdoptionScreen} />
            <Stack.Screen name="VetHelp" component={VetHelpScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
