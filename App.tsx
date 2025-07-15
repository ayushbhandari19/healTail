// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import AdoptionScreen from './src/screens/AdoptionScreen';
import VetHelpScreen from './src/screens/VetHelpScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Adoption" component={AdoptionScreen} />
        <Stack.Screen name="VetHelp" component={VetHelpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
