import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useAuth } from '../bridge/auth/useAuth';
import BiometricGateScreen from '../modules/auth/screens/BiometricGateScreen';
import SignInScreen from '../modules/auth/screens/SignInScreen';
import SignUpScreen from '../modules/auth/screens/SignUpScreen';
import SplashScreen from '../modules/auth/screens/SplashScreen';
import EventDetailScreen from '../modules/events/screens/EventDetailScreen';
import HomeScreen from '../modules/events/screens/HomeScreen';
import ProfileScreen from '../modules/profile/screens/ProfileScreen';

export type RootStackParamList = {
  Splash: undefined;
  SignIn: undefined;
  SignUp: undefined;
  BiometricGate: undefined;
  Home: undefined;
  EventDetail: { eventId: string };
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <SplashScreen />;
  }

  const initialRouteName: keyof RootStackParamList = user
    ? 'BiometricGate'
    : 'SignIn';

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={initialRouteName}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="BiometricGate" component={BiometricGateScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="EventDetail" component={EventDetailScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
