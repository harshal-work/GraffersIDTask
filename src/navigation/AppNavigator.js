// ...existing code...
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomNavigator from './BottomNavigator';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/Auth/LoginScreen';
import WelcomeScreen from '../screens/Auth/WelcomeScreen';
import SplashScreen from '../screens/Auth/SplashScreen';
import OTPScreen from '../screens/Auth/OTPScreen';
<<<<<<< HEAD

=======
import Location from '../screens/Auth/Location';
import search from '../screens/BottomScreens/Home/Search/search';
import Items from '../screens/BottomScreens/Home/Search/Items';
import Store from '../screens/BottomScreens/Home/Search/Store';
import Filter from '../screens/BottomScreens/Home/Search/Filter';
import HomeFilter from '../screens/BottomScreens/Home/HomeFilter';
import StoreList from '../screens/BottomScreens/Home/StoreList';
>>>>>>> cfaff0c6ffec6ab197e4517481802ceb038990cd
const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="OTP" component={OTPScreen} options={{ headerShown: false }} />
<<<<<<< HEAD
        <Stack.Screen name="Main" component={BottomNavigator} options={{ headerShown: false }} />
=======
        <Stack.Screen name="Location" component={Location} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={BottomNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Search" component={search} options={{ headerShown: false }} />
        <Stack.Screen name="Items" component={Items} options={{ headerShown: false }} />
        <Stack.Screen name="Store" component={Store} options={{ headerShown: false }} />
        <Stack.Screen name="Filter" component={Filter} options={{ headerShown: false }} />
        <Stack.Screen name="HomeFilter" component={HomeFilter} options={{ headerShown: false }} />
        <Stack.Screen name="StoreList" component={StoreList} options={{ headerShown: false }} />
>>>>>>> cfaff0c6ffec6ab197e4517481802ceb038990cd
      </Stack.Navigator>
    </NavigationContainer>
  );
}
