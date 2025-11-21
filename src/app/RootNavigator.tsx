// src/app/RootNavigator.tsx
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useAuth } from '../bridge/auth/useAuth';
import BiometricGateScreen from '../modules/auth/screens/BiometricGateScreen';
import SignInScreen from '../modules/auth/screens/SignInScreen';
import SignUpScreen from '../modules/auth/screens/SignUpScreen';
import SplashScreen from '../modules/auth/screens/SplashScreen';
import EventDetailScreen from '../modules/events/screens/EventDetailScreen';
import type { EventItem } from '../services/api/ticketmasterClient';
import MainTabs from './MainTabs';

export type RootStackParamList = {
  Splash: undefined;
  SignIn: undefined;
  SignUp: undefined;
  BiometricGate: undefined;
  MainTabs: undefined;
  EventDetail: { event: EventItem };
};

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <SplashScreen />;
  }

  const initialRouteName: keyof RootStackParamList = user ? 'BiometricGate' : 'SignIn';

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRouteName}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="BiometricGate" component={BiometricGateScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="EventDetail" component={EventDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
