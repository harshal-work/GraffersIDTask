// screens/OTPScreen.js
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  ActivityIndicator,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const OTPScreen = ({ navigation }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);

  const inputs = useRef([]);

  // Auto-focus first input
  useEffect(() => {
    inputs.current[0]?.focus();
  }, []);

  // Timer 1-minute reverse
  useEffect(() => {
    let interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = () => {
    const minutes = String(Math.floor(timer / 60)).padStart(2, '0');
    const seconds = String(timer % 60).padStart(2, '0');
    return `${minutes} : ${seconds}`;
  };

  const handleChange = (text, index) => {
    if (text.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 5) {
      inputs.current[index + 1].focus();
    }

    if (index === 5 && text !== '') {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigation.navigate('Welcome');
      }, 3000);
    }
  };

  const handleBackspace = (text, index) => {
    if (text === '' && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.container}>

        <Image source={require('../../assets/splash.png')} style={styles.logo} />

        <Text style={styles.title}>O.T.P. Verification</Text>
        <Text style={styles.subtext}>Enter the code from SMS we sent to</Text>
        <Text style={styles.boldNumber}>+12334567789.</Text>

        <Text style={styles.timer}>{formatTime()}</Text>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              style={styles.input}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={(t) => handleChange(t, index)}
              onKeyPress={({ nativeEvent }) =>
                nativeEvent.key === 'Backspace' && handleBackspace('', index)
              }
              ref={(ref) => (inputs.current[index] = ref)}
            />
          ))}
        </View>

        <Text style={styles.resend}>
          Didn’t receive the OTP ? <Text style={styles.resendLink}>Resend</Text>
        </Text>

        {loading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#1d3f72" />
          </View>
        )}

      </View>
    </KeyboardAvoidingView>
  );
};

export default OTPScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',   // center vertically
    alignItems: 'center',       // center horizontally
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },

  logo: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
    marginBottom: 25,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1d3f72',
    marginBottom: 10,
  },

  subtext: {
    fontSize: 14,
    color: '#555',
  },

  boldNumber: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 20,
    color: '#000',
  },

  timer: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1d3f72',
    marginBottom: 30,
  },

  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 20,
  },

  input: {
    width: 50,
    height: 55,
    borderWidth: 1.5,
    borderColor: '#1d3f72',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
  },

  resend: {
    marginTop: 10,
    fontSize: 14,
    color: '#444',
  },

  resendLink: {
    color: '#1d3f72',
    fontWeight: '700',
  },

  loadingOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
});
