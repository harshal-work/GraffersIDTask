// src/screens/auth/SignupScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  Modal,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

export default function SignupScreen({ navigation }: { navigation: any }) {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [errors, setErrors] = useState({
    name: false,
    dob: false,
    mobile: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [popup, setPopup] = useState('');

  const validate = () => {
    const e = {
      name: !name.trim(),
      dob: !dob.trim(),
      mobile: mobile.length !== 10,
      email: !email.trim() || !email.includes('@'),
      password: password.length < 8,
      confirmPassword: password !== confirmPassword,
    };

    setErrors(e);

    const hasError = Object.values(e).some(v => v);
    if (hasError) {
      setPopup('Please fill all fields correctly');
      return false;
    }
    return true;
  };

  const handleSignup = async () => {
    if (!validate()) return;

    const user = {
      name: name.trim(),
      dob: dob.trim(),
      mobile: `+91${mobile}`,
      email: email.trim().toLowerCase(),
      password,
    };

    try {
      await AsyncStorage.setItem('USER', JSON.stringify(user));
      setPopup('Account created successfully');
      
      setTimeout(() => {
        setPopup('');
        navigation.replace('Login');
      }, 1200);
    } catch (error) {
      setPopup('Signup failed. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        {/* Back Button */}
        <TouchableOpacity 
          style={styles.backBtn} 
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Image 
            source={require('../../assets/back.png')} 
            style={styles.backIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <View style={styles.card}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Fill in your details to get started</Text>

          {/* Name Input */}
          <View style={[styles.inputBox, errors.name && styles.errorBox]}>
            <TextInput
              placeholder="Full Name"
              placeholderTextColor="#9CA3AF"
              style={styles.input}
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              autoCorrect={false}
            />
          </View>

          {/* DOB Input */}
          <View style={[styles.inputBox, errors.dob && styles.errorBox]}>
            <TextInput
              placeholder="Date of Birth (DD/MM/YYYY)"
              placeholderTextColor="#9CA3AF"
              style={styles.input}
              value={dob}
              onChangeText={setDob}
              maxLength={10}
            />
          </View>

          {/* Mobile Input */}
          <View style={[styles.mobileBox, errors.mobile && styles.errorBox]}>
            <Text style={styles.code}>+91</Text>
            <TextInput
              placeholder="Mobile Number"
              placeholderTextColor="#9CA3AF"
              keyboardType="number-pad"
              maxLength={10}
              style={styles.mobileInput}
              value={mobile}
              onChangeText={t => setMobile(t.replace(/[^0-9]/g, ''))}
            />
          </View>

          {/* Email Input */}
          <View style={[styles.inputBox, errors.email && styles.errorBox]}>
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

          {/* Password Input */}
          <View style={[styles.passwordBox, errors.password && styles.errorBox]}>
            <TextInput
              placeholder="Password (min 8 chars)"
              placeholderTextColor="#9CA3AF"
              secureTextEntry={!showPassword}
              style={styles.passwordInput}
              value={password}
              onChangeText={setPassword}
              autoCorrect={false}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeBtn}
              activeOpacity={0.7}
            >
              <Image
                source={
                  showPassword
                    ? require('../../assets/eyeon.png')
                    : require('../../assets/eyeoff.png')
                }
                style={styles.eye}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          {/* Confirm Password Input */}
          <View style={[styles.passwordBox, errors.confirmPassword && styles.errorBox]}>
            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor="#9CA3AF"
              secureTextEntry={!showConfirm}
              style={styles.passwordInput}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              autoCorrect={false}
            />
            <TouchableOpacity
              onPress={() => setShowConfirm(!showConfirm)}
              style={styles.eyeBtn}
              activeOpacity={0.7}
            >
              <Image
                source={
                  showConfirm
                    ? require('../../assets/eyeon.png')
                    : require('../../assets/eyeoff.png')
                }
                style={styles.eye}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={styles.btn} 
            onPress={handleSignup}
            activeOpacity={0.8}
          >
            <Text style={styles.btnText}>Create Account</Text>
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
  backBtn: {
    position: 'absolute',
    top: 16,
    left: width > 400 ? 32 : 20,
    zIndex: 10,
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: width > 400 ? 32 : 24,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    maxWidth: 400,
    alignSelf: 'center',
    alignItems: 'center',
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
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  mobileBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 16,
    height: 56,
    paddingHorizontal: 18,
    marginBottom: 20,
    backgroundColor: '#f9fafb',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  code: {
    fontWeight: '700',
    color: '#374151',
    fontSize: 16,
    marginRight: 12,
  },
  mobileInput: {
    flex: 1,
    fontSize: 16,
    color: '#1f2937',
    paddingVertical: 0,
  },
  passwordBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 16,
    height: 56,
    paddingHorizontal: 18,
    marginBottom: 20,
    backgroundColor: '#f9fafb',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  input: {
    fontSize: 16,
    color: '#1f2937',
    paddingVertical: 0,
    flex: 1,
    letterSpacing: -0.2,
  },
  passwordInput: {
    fontSize: 16,
    color: '#1f2937',
    paddingVertical: 0,
    flex: 1,
    letterSpacing: -0.2,
  },
  eyeBtn: {
    padding: 4,
  },
  eye: {
    width: 24,
    height: 24,
  },
  errorBox: {
    borderColor: '#ef4444',
    backgroundColor: '#fef2f2',
  },
  btn: {
    backgroundColor: '#211b47',
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 8,
  },
  btnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.5,
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
    shadowOffset: { width: 0, height: 10 },
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
