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
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.card}>
        <Image
          source={require('../../assets/splash.png')}
          style={styles.logo}
        />

        <Text style={styles.title}>Graffers ID</Text>
        <Text style={styles.subtitle}>Login to continue</Text>

        <View style={styles.inputBox}>
          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
                          placeholderTextColor="gray"

          />
        </View>

        <View style={styles.inputBox}>
          <TextInput
            placeholder="Password"
            secureTextEntry={!showPassword}
            style={styles.input}
            value={password}
            onChangeText={setPassword}
                          placeholderTextColor="gray"

          />
          <TouchableOpacity
            style={styles.eyeBtn}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Image
              source={
                showPassword
                  ? require('../../assets/eyeon.png')
                  : require('../../assets/eyeoff.png')
              }
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.loginBtn, !isValid && styles.disabledBtn]}
          disabled={!isValid}
          onPress={handleLogin}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.link}>Create New Account</Text>
        </TouchableOpacity>
      </View>

      {/* Popup Modal */}
      <Modal transparent visible={popup.length > 0} animationType="fade">
        <View style={styles.popupBg}>
          <View style={styles.popup}>
            <Text style={styles.popupText}>{popup}</Text>
            <TouchableOpacity onPress={() => setPopup('')}>
              <Text style={styles.popupBtn}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef2f7',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    elevation: 6,
  },
  logo: {
    width: 90,
    height: 90,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    color: '#6b7280',
    marginBottom: 24,
  },
  inputBox: {
    borderWidth: 1,
    borderRadius: 14,
    height: 54,
    justifyContent: 'center',
    paddingHorizontal: 14,
    marginBottom: 16,
    borderColor: '#d1d5db',
  },
  input: {
    fontSize: 15,
    paddingRight: 44,
  },
  eyeBtn: {
    position: 'absolute',
    right: 14,
  },
  eyeIcon: {
    width: 22,
    height: 22,
  },
  loginBtn: {
    backgroundColor: '#211b47',
    height: 54,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledBtn: {
    backgroundColor: '#9ca3af',
  },
  loginText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  link: {
    marginTop: 20,
    textAlign: 'center',
    color: '#211b47',
    fontWeight: '700',
  },
  popupBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    width: '80%',
    alignItems: 'center',
  },
  popupText: {
    fontSize: 15,
    marginBottom: 12,
    textAlign: 'center',
  },
  popupBtn: {
    fontWeight: '700',
    color: '#211b47',
  },
});
