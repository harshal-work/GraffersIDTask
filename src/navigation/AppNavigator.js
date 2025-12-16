import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import BottomNavigator from './BottomNavigator';

// Auth
import LoginScreen from '../screens/Auth/LoginScreen';
import WelcomeScreen from '../screens/Auth/WelcomeScreen';
import SplashScreen from '../screens/Auth/SplashScreen';
import OTPScreen from '../screens/Auth/OTPScreen';
import Location from '../screens/Auth/Location';

// Home/Search
import Search from '../screens/BottomScreens/Home/Search/search';
import Items from '../screens/BottomScreens/Home/Search/Items';
import Filter from '../screens/BottomScreens/Home/Search/Filter';
import HomeFilter from '../screens/BottomScreens/Home/HomeFilter';
import StoreList from '../screens/BottomScreens/Home/StoreList';
import Store from '../screens/BottomScreens/Home/Search/Store/Store';

// Other
import OffersClone from '../screens/BottomScreens/Offers/OffersClone';
import MyCartClone from '../screens/BottomScreens/MyCart/MyCartClone';

// Payment
import PaymentScreen from '../screens/Payment/PaymentScreen';
import PaymentSuccess from '../screens/Payment/PaymentSuccess';

// Orders
import TrackOrder from '../screens/BottomScreens/Order/TrackOrder';
import OrderDetail from '../screens/BottomScreens/Order/OrderDetail';
import CancelOrder from '../screens/BottomScreens/Order/CancelOrder';

// Profile
import Address from '../screens/BottomScreens/Profile/Address';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="OTP" component={OTPScreen} />
        <Stack.Screen name="Location" component={Location} />

        <Stack.Screen name="Main" component={BottomNavigator} />

        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Items" component={Items} />
        <Stack.Screen name="Store" component={Store} />
        <Stack.Screen name="Filter" component={Filter} />
        <Stack.Screen name="HomeFilter" component={HomeFilter} />
        <Stack.Screen name="StoreList" component={StoreList} />

        <Stack.Screen name="OffersClone" component={OffersClone} />
        <Stack.Screen name="MyCartClone" component={MyCartClone} />

        <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
        <Stack.Screen name="PaymentSuccess" component={PaymentSuccess} />

        <Stack.Screen name="OrderDetail" component={OrderDetail} />
        <Stack.Screen name="TrackOrder" component={TrackOrder} />
        <Stack.Screen name="CancelOrder" component={CancelOrder} />

        {/* PROFILE */}
        <Stack.Screen name="Address" component={Address} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
