// src/screens/SplashScreen.js
import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Main'); //Main  // Login
    }, 3000);

    return () => clearTimeout(timer); // prevent memory leak
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/splash.png')}
        style={styles.logo}
        resizeMode="contain" // keeps aspect ratio
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // white background
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '60%', // responsive width
    height: '30%', // responsive height
  },
});
