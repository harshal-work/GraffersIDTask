// screens/WelcomeScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Modal,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';

const { width, height } = Dimensions.get('window');
const TOP_MARGIN = height * 0.1;
const SCALE = width / 420;

export default function WelcomeScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [reference, setReference] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePickerVisible, setImagePickerVisible] = useState(false);

  // Clear input function
  const clearInput = setter => {
    setter('');
  };

  // Open image picker modal
  const openImagePickerModal = () => {
    setImagePickerVisible(true);
  };

  // Handle camera option
  const handleTakePhoto = () => {
    setImagePickerVisible(false);
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    ImagePicker.launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.assets && response.assets[0]) {
        setProfileImage(response.assets[0].uri);
      }
    });
  };

  // Handle gallery option
  const handleChooseFromGallery = () => {
    setImagePickerVisible(false);
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled gallery');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.assets && response.assets[0]) {
        setProfileImage(response.assets[0].uri);
      }
    });
  };

  // Remove uploaded image
  const removeImage = () => {
    setProfileImage(null);
  };

  return (
    <ScrollView
      contentContainerStyle={[styles.container, { paddingTop: TOP_MARGIN }]}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.subtitle}>
        Fill the details & complete your profile
      </Text>

      {/* NAME */}
      <Text style={styles.label}>Enter Your Name *</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Please enter your name here"
          value={name}
          onChangeText={setName}
          placeholderTextColor={'#999'}
        />
        <TouchableOpacity onPress={() => clearInput(setName)}>
          <View style={styles.iconBox} />
        </TouchableOpacity>
      </View>

      {/* EMAIL */}
      <Text style={styles.label}>Enter Your Email *</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Please enter your email here"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor={'#999'}
        />
        <TouchableOpacity onPress={() => clearInput(setEmail)}>
          <View style={styles.iconBox} />
        </TouchableOpacity>
      </View>

      {/* MOBILE */}
      <Text style={styles.label}>Enter Your Mobile No. *</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Please enter your mobile number"
          value={mobile}
          keyboardType="number-pad"
          onChangeText={setMobile}
          placeholderTextColor={'#999'}
        />
        <TouchableOpacity onPress={() => clearInput(setMobile)}>
          <View style={styles.iconBox} />
        </TouchableOpacity>
      </View>

      {/* PROFILE PHOTO */}
      <Text style={styles.label}>Profile photo *</Text>
      <View style={styles.photoRow}>
        <View style={styles.photoWrapper}>
          <Image
            source={
              profileImage
                ? { uri: profileImage }
                : require('../../assets/user.png')
            }
            style={styles.userImage}
          />
          <TouchableOpacity
            style={styles.galleryBadge}
            onPress={openImagePickerModal}
          >
            <Image
              source={require('../../assets/gallery.png')}
              style={{ width: 20 * SCALE, height: 20 * SCALE }}
            />
          </TouchableOpacity>
          {profileImage && (
            <TouchableOpacity style={styles.removeBadge} onPress={removeImage}>
              <Text style={styles.removeText}>X</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={{ flex: 1, marginLeft: 14 }}>
          <Text style={styles.photoTitle}>Add a face to your profile</Text>
          <Text style={styles.photoSubtitle}>
            Tap to take a photo or upload from gallery. JPG/PNG up to ~5 MB.
          </Text>
        </View>
      </View>

      {/* REFERENCE CODE */}
      <Text style={styles.label}>Reference Code (Optional)</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Enter Reference code"
          value={reference}
          onChangeText={setReference}
          placeholderTextColor={'#999'}
        />
        <TouchableOpacity onPress={() => clearInput(setReference)}>
          <View style={styles.iconBox} />
        </TouchableOpacity>
      </View>

      {/* TERMS ACCEPT */}
      <View style={styles.checkboxRow}>
        <TouchableOpacity onPress={() => setAccepted(!accepted)}>
          <View style={[styles.checkbox, accepted && styles.checkboxChecked]}>
            {accepted && (
              <Image
                source={require('../../assets/tick.png')}
                style={styles.tickIcon}
              />
            )}
          </View>
        </TouchableOpacity>
        <Text style={styles.termsText}>
          I accept{' '}
          <Text
            style={styles.termsLink}
            onPress={() => navigation.navigate('Terms')}
          >
            terms & conditions.
          </Text>
        </Text>
      </View>

      {/* SUBMIT */}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => navigation.navigate('Location')}
      >
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>

      {/* Image Picker Modal */}
      <Modal
        visible={imagePickerVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setImagePickerVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={handleTakePhoto}
            >
              <Text style={styles.modalOptionText}>Take Photo</Text>
            </TouchableOpacity>

            <View style={styles.modalDivider} />

            <TouchableOpacity
              style={styles.modalOption}
              onPress={handleChooseFromGallery}
            >
              <Text style={styles.modalOptionText}>Choose from Photos</Text>
            </TouchableOpacity>

            <View style={styles.modalDivider} />

            <TouchableOpacity
              style={[styles.modalOption, styles.cancelOption]}
              onPress={() => setImagePickerVisible(false)}
            >
              <Text style={styles.cancelOptionText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 90,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 28 * SCALE,
    fontWeight: '800',
    color: '#032F27',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14 * SCALE,
    color: '#555',
    marginBottom: 20,
  },
  label: {
    fontSize: 14 * SCALE,
    fontWeight: '600',
    marginTop: 12,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.2,
    borderColor: '#032F27',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginTop: 6,
    height: 52 * SCALE,
  },
  input: {
    flex: 1,
    fontSize: 14 * SCALE,
  },
  iconBox: {
    width: 20 * SCALE,
    height: 20 * SCALE,
    backgroundColor: '#032F27',
    borderRadius: 5,
  },
  photoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  photoWrapper: {
    width: 80 * SCALE,
    height: 80 * SCALE,
    borderRadius: 80,
    borderWidth: 3,
    borderColor: '#032F27',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  userImage: {
    width: '95%',
    height: '95%',
    borderRadius: 100,
  },
  galleryBadge: {
    position: 'absolute',
    bottom: -4,
    right: -6,
    backgroundColor: '#032F27',
    borderRadius: 20,
    padding: 4,
  },
  removeBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#032F27',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  photoTitle: {
    fontSize: 15 * SCALE,
    fontWeight: '700',
  },
  photoSubtitle: {
    fontSize: 12 * SCALE,
    color: '#555',
    marginTop: 2,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  checkbox: {
    width: 20 * SCALE,
    height: 20 * SCALE,
    borderWidth: 1.6,
    borderColor: '#032F27',
    borderRadius: 5,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#032F27',
  },
  tickIcon: {
    width: 14 * SCALE,
    height: 14 * SCALE,
    tintColor: '#fff',
  },
  termsText: {
    fontSize: 13 * SCALE,
  },
  termsLink: {
    color: '#032F27',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  submitButton: {
    backgroundColor: '#032F27',
    height: 50 * SCALE,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  submitText: {
    color: '#fff',
    fontSize: 16 * SCALE,
    fontWeight: '700',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: 30,
    paddingTop: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 15,
    color: '#032F27',
  },
  modalOption: {
    paddingVertical: 18,
    alignItems: 'center',
  },
  modalOptionText: {
    fontSize: 18,
    color: '#032F27',
    fontWeight: '500',
  },
  modalDivider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 10,
  },
  cancelOption: {
    marginTop: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
  },
  cancelOptionText: {
    fontSize: 18,
    color: '#ff3b30',
    fontWeight: '600',
  },
});
