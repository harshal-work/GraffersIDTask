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
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      name: !name,
      dob: !dob,
      mobile: mobile.length !== 10,
      email: !email,
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
      name,
      dob,
      mobile: `+91${mobile}`,
      email,
      password,
    };

    await AsyncStorage.setItem('USER', JSON.stringify(user));
    setPopup('Account created successfully');

    setTimeout(() => {
      setPopup('');
      navigation.replace('Login');
    }, 1200);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Back */}
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Image source={require('../../assets/back.png')} style={styles.backIcon} />
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.title}>Create Account</Text>

        <TextInput
          placeholder="Full Name"
          style={[styles.input, errors.name && styles.error]}
          value={name}
          onChangeText={setName}
                        placeholderTextColor="gray"

        />

        <TextInput
          placeholder="Date of Birth (DD/MM/YYYY)"
          style={[styles.input, errors.dob && styles.error]}
          value={dob}
          onChangeText={setDob}
                        placeholderTextColor="gray"

        />

        <View style={[styles.mobileBox, errors.mobile && styles.error]}>
          <Text style={styles.code}>+91</Text>
          <TextInput
            placeholder="Mobile Number"
            keyboardType="number-pad"
            maxLength={10}
            style={styles.mobileInput}
            value={mobile}
            onChangeText={t => setMobile(t.replace(/[^0-9]/g, ''))}
                          placeholderTextColor="gray"

          />
        </View>

        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          style={[styles.input, errors.email && styles.error]}
          value={email}
          onChangeText={setEmail}
                        placeholderTextColor="gray"

        />

        {/* Password */}
        <View style={[styles.passwordBox, errors.password && styles.error]}>
          <TextInput
            placeholder="Password (min 8 chars)"
            secureTextEntry={!showPassword}
            style={styles.passwordInput}
            value={password}
            onChangeText={setPassword}
                          placeholderTextColor="gray"

          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={
                showPassword
                  ? require('../../assets/eyeon.png')
                  : require('../../assets/eyeoff.png')
              }
              style={styles.eye}
            />
          </TouchableOpacity>
        </View>

        {/* Confirm Password */}
        <View style={[styles.passwordBox, errors.confirmPassword && styles.error]}>
          <TextInput
            placeholder="Confirm Password"
            secureTextEntry={!showConfirm}
            style={styles.passwordInput}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
                          placeholderTextColor="gray"

          />
          <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
            <Image
              source={
                showConfirm
                  ? require('../../assets/eyeon.png')
                  : require('../../assets/eyeoff.png')
              }
              style={styles.eye}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.btn} onPress={handleSignup}>
          <Text style={styles.btnText}>Signup</Text>
        </TouchableOpacity>
      </View>

      {/* Popup */}
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
  backBtn: { position: 'absolute', top: 50, left: 20, zIndex: 10 },
  backIcon: { width: 24, height: 24 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    elevation: 6,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    borderColor: '#d1d5db',
  },
  mobileBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 12,
    marginBottom: 14,
    borderColor: '#d1d5db',
  },
  code: { fontWeight: '700', marginRight: 6 },
  mobileInput: { flex: 1, paddingVertical: 12 },
  passwordBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 14,
    marginBottom: 14,
    borderColor: '#d1d5db',
  },
  passwordInput: { flex: 1, paddingVertical: 14 },
  eye: { width: 22, height: 22 },
  error: { borderColor: '#ef4444' },
  btn: {
    backgroundColor: '#211b47',
    height: 54,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
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
  popupText: { fontSize: 15, marginBottom: 12, textAlign: 'center' },
  popupBtn: { fontWeight: '700', color: '#211b47' },
});
