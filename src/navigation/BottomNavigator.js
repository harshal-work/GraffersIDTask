// ...existing code...
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/BottomScreens/Home/Home';
import Offers from '../screens/BottomScreens/Offers/Offers';
import MyCart from '../screens/BottomScreens/MyCart/MyCart';
import Order from '../screens/BottomScreens/Order/Order';
import Profile from '../screens/BottomScreens/Profile/Profile';

const Tab = createBottomTabNavigator();

export default function BottomNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Tab.Screen name="Offers" component={Offers} options={{ headerShown: false }} />
      <Tab.Screen name="MyCart" component={MyCart} options={{ headerShown: false }} />
      <Tab.Screen name="Order" component={Order} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}
