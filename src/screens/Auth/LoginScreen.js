// screens/LoginScreen/LoginScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';

export default function LoginScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Image
          source={require('../../assets/loginimage.png')}
          style={styles.topImage}
          resizeMode="cover"
        />

        <View style={styles.sheet}>
          <Image
            source={require('../../assets/splash.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.desc}>
            <Text style={styles.descBold}>Welcome to </Text>
            <Text style={styles.brandText}>Vinsta </Text>
            Get Essential grocery product’s delivered at anywhere anytime
            home instantly
          </Text>

          <Text style={styles.label}>Please Enter Your Mobile Number</Text>

          <View style={styles.inputWrapper}>
            <Text style={styles.countryCode}>+91</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your 10 digit mobile number"
              keyboardType="numeric"
              placeholderTextColor="#999"
              maxLength={10}
            />
          </View>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.replace('OTP')}
          >
            <Text style={styles.btnText}>Send OTP</Text>
          </TouchableOpacity>

          <View style={styles.emailRow}>
            <Image
              source={require('../../assets/gmail.png')}
              style={styles.gmailIcon}
            />
            <Text style={styles.emailText}>Get O.T.P. through email</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  topImage: {
    width: '100%',
    height: height * 0.45,
  },

  sheet: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    marginTop: -30,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },

  logo: {
    width: 75,
    height: 75,
    alignSelf: 'center',
    marginBottom: 16,
  },

  desc: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    color: '#333',
    marginBottom: 30,
     fontWeight: '700',
  },
  descBold: {
    fontWeight: '700',
  },
  brandText: {
    color: '#e38b2c',
    fontWeight: '700',
  },

  label: {
    fontSize: 14,
    marginBottom: 10,
    color: '#000',
  },

  inputWrapper: {
    borderWidth: 1.5,
    borderColor: '#d0d4da',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    height: 52,
    marginBottom: 24,
  },
  countryCode: {
    fontSize: 16,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },

  btn: {
    backgroundColor: '#1d3f72',
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
  },
  btnText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },

  emailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 4,
  },

  gmailIcon: {
    width: 34,
    height: 34,
    marginRight: 8,
  },

  emailText: {
    fontSize: 15,
    color: '#222',
  },
});
