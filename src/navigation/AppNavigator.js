import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import BottomNavigator from './BottomNavigator';

// Auth
import LoginScreen from '../screens/Auth/LoginScreen';
import SplashScreen from '../screens/Auth/SplashScreen';


// Profile

import SignupScreen from '../screens/Auth/SignupScreen';
import CompanyDetailScreen from '../screens/BottomScreens/Home/CompanyDetailScreen';
import SeeAll from '../screens/BottomScreens/Home/SeeAll';


const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Auth Screens */}
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
       

       



        {/* Profile Screens */}
       
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="CompanyDetailScreen" component={CompanyDetailScreen} />
        <Stack.Screen name="SeeAll" component={SeeAll} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
