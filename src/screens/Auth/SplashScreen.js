// src/screens/SplashScreen.js
import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
<<<<<<< HEAD
      navigation.replace('Login');
=======
      navigation.replace('Login'); //Main  // Login
>>>>>>> cfaff0c6ffec6ab197e4517481802ceb038990cd
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
    width: '60%',   // responsive width
    height: '30%',  // responsive height
  },
});
