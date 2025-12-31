// src/screens/auth/LoginScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  Modal,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

export default function LoginScreen({ navigation }: { navigation: any }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [popup, setPopup] = useState('');

  const isValid = email.length > 5 && password.length >= 8;

  const handleLogin = async () => {
    try {
      const savedUser = await AsyncStorage.getItem('USER');
      
      if (!savedUser) {
        setPopup('No account found. Please sign up first.');
        return;
      }

      const user = JSON.parse(savedUser);

      if (user.email !== email) {
        setPopup('User not found. Please sign up first.');
        return;
      }

      if (user.password !== password) {
        setPopup('Incorrect password. Please try again.');
        return;
      }

      // Set login status
      await AsyncStorage.setItem('IS_LOGGED_IN', 'true');
      
      setPopup('Login successful');

      setTimeout(() => {
        setPopup('');
        navigation.replace('Main');
      }, 1000);
    } catch (error) {
      setPopup('Login failed. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <View style={styles.card}>
          <Image
            source={require('../../assets/splash.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.title}>Graffers ID</Text>
          <Text style={styles.subtitle}>Login to continue</Text>

          <View style={styles.inputBox}>
            <TextInput
              placeholder="Email"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputBox}>
            <TextInput
              placeholder="Password"
              placeholderTextColor="#9CA3AF"
              secureTextEntry={!showPassword}
              autoCorrect={false}
              style={styles.input}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              style={styles.eyeBtn}
              onPress={() => setShowPassword(!showPassword)}
              activeOpacity={0.7}
            >
              <Image
                source={
                  showPassword
                    ? require('../../assets/eyeon.png')
                    : require('../../assets/eyeoff.png')
                }
                style={styles.eyeIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.loginBtn, !isValid && styles.disabledBtn]}
            disabled={!isValid}
            onPress={handleLogin}
            activeOpacity={0.8}
          >
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => navigation.navigate('Signup')}
            activeOpacity={0.7}
          >
            <Text style={styles.link}>Create New Account</Text>
          </TouchableOpacity>
        </View>

        {/* Popup Modal */}
        <Modal transparent visible={popup.length > 0} animationType="fade">
          <View style={styles.popupBg}>
            <View style={styles.popup}>
              <Text style={styles.popupText}>{popup}</Text>
              <TouchableOpacity 
                onPress={() => setPopup('')}
                style={styles.popupBtnContainer}
                activeOpacity={0.7}
              >
                <Text style={styles.popupBtn}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#eef2f7',
  },
  container: {
    flex: 1,
    backgroundColor: '#eef2f7',
    justifyContent: 'center',
    paddingHorizontal: width > 400 ? 40 : 20,
    paddingVertical: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: width > 400 ? 32 : 24,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    alignItems: 'center',
    maxWidth: 400,
    alignSelf: 'center',
  },
  logo: {
    width: width > 400 ? 100 : 90,
    height: width > 400 ? 100 : 90,
    marginBottom: 24,
  },
  title: {
    fontSize: width > 400 ? 28 : 24,
    fontWeight: '800',
    textAlign: 'center',
    color: '#1f2937',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    textAlign: 'center',
    color: '#6b7280',
    fontSize: 16,
    marginBottom: 32,
  },
  inputBox: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 16,
    height: 56,
    justifyContent: 'center',
    paddingHorizontal: 18,
    marginBottom: 20,
    backgroundColor: '#f9fafb',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  input: {
    fontSize: 16,
    color: '#1f2937',
    paddingVertical: 0,
    paddingHorizontal: 0,
    flex: 1,
    letterSpacing: -0.2,
  },
  eyeBtn: {
    position: 'absolute',
    right: 16,
    top: '50%',
    marginTop: -11,
    padding: 4,
  },
  eyeIcon: {
    width: 24,
    height: 24,
  },
  loginBtn: {
    backgroundColor: '#211b47',
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 8,
    marginBottom: 24,
  },
  disabledBtn: {
    backgroundColor: '#9ca3af',
  },
  loginText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  link: {
    marginTop: 12,
    textAlign: 'center',
    color: '#211b47',
    fontWeight: '700',
    fontSize: 16,
  },
  popupBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  popup: {
    backgroundColor: '#fff',
    padding: 28,
    borderRadius: 20,
    width: '90%',
    maxWidth: 350,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  popupText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#374151',
    lineHeight: 22,
  },
  popupBtnContainer: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  popupBtn: {
    fontWeight: '700',
    color: '#211b47',
    fontSize: 16,
  },
});
