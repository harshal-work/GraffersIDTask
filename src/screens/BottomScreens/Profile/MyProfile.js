import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
  Dimensions,
  Alert,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useColor } from '../../../util/ColorSwitcher';

const { width, height } = Dimensions.get('window');

// Swiggy-style tighter scaling
const rs = size => (width / 400) * size;

const isIOS = Platform.OS === 'ios';

const fontScale = size => (isIOS ? size * 0.95 : size);

const MyProfile = () => {
  const navigation = useNavigation();
  const { bgColor, textColor } = useColor();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const isValidEmail = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSave = () => {
    if (!name.trim()) return Alert.alert('Enter name');
    if (phone.length !== 10) return Alert.alert('Enter valid phone number');
    if (!isValidEmail(email)) return Alert.alert('Enter valid email');
    if (!address.trim()) return Alert.alert('Enter address');

    Alert.alert('Success', 'Profile saved');
  };

  const InputField = ({
    label,
    value,
    setValue,
    placeholder,
    keyboardType,
    multiline,
    maxLength,
  }) => (
    <>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.inputWrapper}>
        <TextInput
          value={value}
          onChangeText={setValue}
          placeholder={placeholder}
          placeholderTextColor="#B5B5B5"
          keyboardType={keyboardType}
          multiline={multiline}
          maxLength={maxLength}
          style={[
            styles.input,
            multiline && {
              height: rs(70),
              textAlignVertical: 'top',
            },
          ]}
          blurOnSubmit={false}
          returnKeyType="done"
        />

        {value.length > 0 && (
          <TouchableOpacity onPress={() => setValue('')}>
            <Text style={styles.clear}>✕</Text>
          </TouchableOpacity>
        )}
      </View>
    </>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={bgColor} barStyle="light-content" />

      {/* Header - Swiggy compact style */}
      <View style={[styles.header, { backgroundColor: bgColor }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconBtn}
        >
          <Image
            source={require('../../../assets/back.png')}
            style={[styles.icon, { tintColor: bgColor }]}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>My Profile</Text>

        <View style={{ width: rs(40) }} />
      </View>

      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Image - Reduced size */}
        <View style={styles.profileWrapper}>
          <View style={styles.imageBorder}>
            <Image
              source={require('../../../assets/user2.png')}
              style={styles.profileImage}
            />
          </View>

          <TouchableOpacity style={styles.cameraIcon}>
            <Image
              source={require('../../../assets/camera.png')}
              style={{ width: rs(16), height: rs(16) }}
            />
          </TouchableOpacity>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <InputField
            label="Name"
            value={name}
            setValue={setName}
            placeholder="Enter your name"
            keyboardType="default"
          />

          <InputField
            label="Phone Number"
            value={phone}
            setValue={v => setPhone(v.replace(/[^0-9]/g, ''))}
            placeholder="Enter phone number"
            keyboardType="number-pad"
            maxLength={10}
          />

          <InputField
            label="Gmail"
            value={email}
            setValue={setEmail}
            placeholder="Enter email"
            keyboardType="email-address"
          />

          <InputField
            label="Delivery Address"
            value={address}
            setValue={setAddress}
            placeholder="Enter address"
            multiline
          />

          <TouchableOpacity
            style={[styles.saveBtn, { backgroundColor: bgColor }]}
            onPress={handleSave}
          >
            <Text style={[styles.saveText, { color: textColor }]}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  scrollContent: {
    paddingBottom: isIOS ? rs(80) : rs(70),
    paddingHorizontal: rs(13),
    paddingTop: rs(8),
  },

  /* Header - Swiggy compact */
  header: {
    height: isIOS ? rs(90) : rs(82),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: rs(16),
    justifyContent: 'space-between',
    paddingTop: isIOS ? rs(44) : rs(26),
    paddingBottom: rs(0),
  },
  headerTitle: {
    color: '#fff',
    fontSize: fontScale(rs(16)),
    fontWeight: '700',
    textAlign: 'center',
    flex: 1,
    marginHorizontal: rs(10),
  },
  iconBtn: {
    width: rs(36),
    height: rs(36),
    borderRadius: rs(10),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  icon: {
    width: rs(18),
    height: rs(18),
  },

  profileWrapper: {
    alignItems: 'center',
    marginTop: rs(16),
    marginBottom: rs(24),
  },

  imageBorder: {
    width: rs(90),
    height: rs(90),
    borderRadius: rs(45),
    borderWidth: 2,
    borderColor: '#F2A365',
    alignItems: 'center',
    justifyContent: 'center',
  },

  profileImage: {
    width: rs(78),
    height: rs(78),
    borderRadius: rs(39),
  },

  cameraIcon: {
    position: 'absolute',
    right: width / 2 - rs(45),
    bottom: rs(4),
    backgroundColor: '#fff',
    width: rs(28),
    height: rs(28),
    borderRadius: rs(14),
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },

  form: {},

  label: {
    fontSize: fontScale(rs(13)),
    fontWeight: '500',
    marginBottom: rs(5),
    marginTop: rs(8),
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: rs(9),
    paddingHorizontal: rs(11),
  },

  input: {
    flex: 1,
    fontSize: fontScale(rs(13)),
    paddingVertical: rs(11),
    color: '#000',
  },

  clear: {
    fontSize: rs(14),
    color: '#999',
    paddingLeft: rs(6),
  },

  saveBtn: {
    height: rs(44),
    borderRadius: rs(10),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: rs(24),
    marginBottom: rs(32),
  },

  saveText: {
    fontSize: fontScale(rs(14)),
    fontWeight: '600',
  },
});
