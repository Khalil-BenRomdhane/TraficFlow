import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import DataView from './screens/DataVue';
import Splash from './screens/Splash';
import Prevision from './screens/PrevisionMap';
import ChoiceScreen from './screens/ChoiceScreen';
import TrafficMap from './screens/PrevisionMap';  // Corrigé ici, TrafficMap vient d'un fichier différent
import LoginScreen from './screens/Login';
import SignupScreen from './screens/SignUp';
import Predire from './screens/Predire';
import Suivie from './screens/Suivie'


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen
          name="Predire"
          component={Predire}
          options={{ headerShown: false }}
             />

          <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        />
        <Stack.Screen
        name="Suivie"
        component={Suivie}
        options={{ headerShown: false }}
      />
        <Stack.Screen
          name="Home"
          component={TrafficMap}  // Assurez-vous que TrafficMap est dans le bon fichier
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChoiceScreen"
          component={ChoiceScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Prevision"
          component={Prevision}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="signUp"
          component={SignupScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
        name="DataView"
        component={DataView}
        options={{ headerShown: false }}
      />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
