<<<<<<< HEAD
// ...existing code...
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
=======
// BottomNavigator.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { CurvedBottomBar } from 'react-native-curved-bottom-bar';
import { useColor } from '../util/ColorSwitcher';

>>>>>>> cfaff0c6ffec6ab197e4517481802ceb038990cd
import Home from '../screens/BottomScreens/Home/Home';
import Offers from '../screens/BottomScreens/Offers/Offers';
import MyCart from '../screens/BottomScreens/MyCart/MyCart';
import Order from '../screens/BottomScreens/Order/Order';
import Profile from '../screens/BottomScreens/Profile/Profile';

<<<<<<< HEAD
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
=======
export default function BottomNavigator() {
  const { bgColor } = useColor();

  const icons = {
    Offers: require('../assets/blueoffer.png'),
    MyCart: require('../assets/bluecart.png'),
    Order: require('../assets/blueorder.png'),
    Profile: require('../assets/blueprofile.png'),
    Home: require('../assets/Home.png'),
  };

  const renderTab = (routeName, selectedTab) => {
    const focused = routeName === selectedTab;

    return (
      <View style={styles.tabItem}>
        <Image
          source={icons[routeName]}
          resizeMode="contain"
          style={{
            width: 22,
            height: 22,
            tintColor: focused ? bgColor : '#222',
          }}
        />
        <Text
          style={{
            marginTop: 4,
            fontSize: 12,
            color: focused ? bgColor : '#222',
            fontWeight: focused ? '600' : '400',
          }}
        >
          {routeName === 'MyCart' ? 'My Cart' : routeName}
        </Text>
      </View>
    );
  };

  return (
    <CurvedBottomBar.Navigator
      type="DOWN"
      height={75}
      circleWidth={65}
      bgColor="white"
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
      renderCircle={({ selectedTab, navigate }) => (
        <TouchableOpacity
          onPress={() => navigate('Home')}
          style={[
            styles.circleButton,
            { borderColor: bgColor },
          ]}
        >
          <Image
            source={icons.Home}
            style={{
              width: 30,
              height: 30,
              tintColor: bgColor,
            }}
          />
        </TouchableOpacity>
      )}
      tabBar={({ routeName, selectedTab, navigate }) => (
        <TouchableOpacity
          onPress={() => navigate(routeName)}
          style={styles.tabButton}
        >
          {renderTab(routeName, selectedTab)}
        </TouchableOpacity>
      )}
    >
      <CurvedBottomBar.Screen
        name="Offers"
        position="LEFT"
        component={Offers}
      />
      <CurvedBottomBar.Screen
        name="MyCart"
        position="LEFT"
        component={MyCart}
      />

      <CurvedBottomBar.Screen
        name="Home"
        position="CENTER"
        component={Home}
      />

      <CurvedBottomBar.Screen
        name="Order"
        position="RIGHT"
        component={Order}
      />
      <CurvedBottomBar.Screen
        name="Profile"
        position="RIGHT"
        component={Profile}
      />
    </CurvedBottomBar.Navigator>
  );
}

const styles = StyleSheet.create({
  tabButton: {
    flex: 1,
    alignItems: 'center',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  circleButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 35,
    borderWidth: 3,
    elevation: 8,
    marginTop: -30
  },
});
>>>>>>> cfaff0c6ffec6ab197e4517481802ceb038990cd
