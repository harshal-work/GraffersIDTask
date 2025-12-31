// src/screens/SplashScreen.tsx
import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SplashScreen({ navigation }: { navigation: any }) {
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const isLoggedIn = await AsyncStorage.getItem('IS_LOGGED_IN');
        
        const timer = setTimeout(() => {
          if (isLoggedIn === 'true') {
            navigation.replace('Main');
          } else {
            navigation.replace('Login');
          }
        }, 3000);
        
        return () => clearTimeout(timer);
      } catch (error) {
        console.log('Auth check error:', error);
        // Default to Login on error
        const timer = setTimeout(() => {
          navigation.replace('Login');
        }, 3000);
        return () => clearTimeout(timer);
      }
    };

    checkAuthStatus();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/splash.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#211b47',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '60%',
    height: '30%',
    borderRadius: 16,
  },
});
