// File: D:\VinstaPlus\src\navigation\AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomNavigator from './BottomNavigator';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/Auth/LoginScreen';
import WelcomeScreen from '../screens/Auth/WelcomeScreen';
import SplashScreen from '../screens/Auth/SplashScreen';
import OTPScreen from '../screens/Auth/OTPScreen';
import Location from '../screens/Auth/Location';
import search from '../screens/BottomScreens/Home/Search/search';
import Items from '../screens/BottomScreens/Home/Search/Items';
import Filter from '../screens/BottomScreens/Home/Search/Filter';
import HomeFilter from '../screens/BottomScreens/Home/HomeFilter';
import StoreList from '../screens/BottomScreens/Home/StoreList';
import OffersClone from '../screens/BottomScreens/Offers/OffersClone';
import Store from '../screens/BottomScreens/Home/Search/Store/Store';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OTP"
          component={OTPScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Location"
          component={Location}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={BottomNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Search"
          component={search}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Items"
          component={Items}
          options={{ headerShown: false }}
        />
        {/* FIXED: Removed duplicate Store screen - only keep one */}
        <Stack.Screen
          name="Store"
          component={Store}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Filter"
          component={Filter}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeFilter"
          component={HomeFilter}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="StoreList"
          component={StoreList}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OffersClone"
          component={OffersClone}
          options={{ headerShown: false }}
        />
        {/* REMOVED: Duplicate Store screen was here */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
