// screens/LoginScreen/LoginScreen.tsx
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';

export default function LoginScreen({ navigation }: any) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const scrollViewRef = useRef < ScrollView > null;
  const inputRef = useRef < TextInput > null;
  const scrollY = useRef(new Animated.Value(0)).current;

  // Handle keyboard visibility
  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
        // Scroll to input when keyboard appears
        setTimeout(() => {
          scrollViewRef.current?.scrollTo({
            y: 200,
            animated: true,
          });
        }, 100);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
        // Scroll back to top when keyboard hides
        setTimeout(() => {
          scrollViewRef.current?.scrollTo({
            y: 0,
            animated: true,
          });
        }, 100);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handlePhoneNumberChange = (text: string) => {
    // Only allow numbers
    const formattedText = text.replace(/[^0-9]/g, '');
    setPhoneNumber(formattedText);
  };

  const handleSendOTP = () => {
    if (phoneNumber.length === 10) {
      Keyboard.dismiss();
      setTimeout(() => {
        navigation.replace('OTP');
      }, 300);
    }
  };

  const handleContentSizeChange = () => {
    // Auto-scroll to input when typing
    if (isKeyboardVisible && phoneNumber.length > 7) {
      setTimeout(() => {
        scrollViewRef.current?.scrollTo({
          y: 250,
          animated: true,
        });
      }, 50);
    }
  };

  const handleScroll = (event: any) => {
    scrollY.setValue(event.nativeEvent.contentOffset.y);
  };

  const handleOutsidePress = () => {
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <TouchableWithoutFeedback onPress={handleOutsidePress}>
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          onScroll={handleScroll}
          scrollEventThrottle={16}
          bounces={false}
        >
          <Image
            source={require('../../assets/loginimage.png')}
            style={[
              styles.topImage,
              isKeyboardVisible && styles.topImageKeyboardOpen,
            ]}
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
              Get Essential grocery product's delivered at anywhere anytime home
              instantly
            </Text>

            <Text style={styles.label}>Please Enter Your Mobile Number</Text>

            <View style={styles.inputWrapper}>
              <Text style={styles.countryCode}>+91</Text>
              <TextInput
                ref={inputRef}
                style={styles.input}
                placeholder="Enter your 10 digit mobile number"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={handlePhoneNumberChange}
                maxLength={10}
                returnKeyType="done"
                onSubmitEditing={handleSendOTP}
                onFocus={() => {
                  setKeyboardVisible(true);
                  setTimeout(() => {
                    scrollViewRef.current?.scrollTo({
                      y: 200,
                      animated: true,
                    });
                  }, 100);
                }}
                onBlur={() => {
                  setKeyboardVisible(false);
                }}
                onContentSizeChange={handleContentSizeChange}
                autoCorrect={false}
              />
            </View>

            <TouchableOpacity
              style={[
                styles.btn,
                phoneNumber.length !== 10 && styles.btnDisabled,
              ]}
              onPress={handleSendOTP}
              disabled={phoneNumber.length !== 10}
              activeOpacity={0.8}
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

          {/* Add extra space at bottom for better scrolling on keyboard open */}
          {isKeyboardVisible && <View style={styles.keyboardSpacer} />}
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  topImage: {
    width: '100%',
    height: height * 0.45,
  },
  topImageKeyboardOpen: {
    height: height * 0.35, // Reduce image height when keyboard is open
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
    minHeight: height * 0.6, // Ensure sheet has minimum height
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
    fontWeight: '600',
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
    backgroundColor: '#fff',
  },
  countryCode: {
    fontSize: 16,
    marginRight: 10,
    fontWeight: '600',
    color: '#000',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    paddingVertical: 8,
  },
  btn: {
    backgroundColor: '#032F27',
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
    shadowColor: '#032F27',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  btnDisabled: {
    backgroundColor: '#a0aec0',
    shadowOpacity: 0,
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
    fontWeight: '500',
  },
  keyboardSpacer: {
    height: Platform.OS === 'ios' ? 100 : 50,
  },
});
