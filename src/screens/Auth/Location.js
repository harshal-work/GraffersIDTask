// screens/Location.js
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

const { width } = Dimensions.get("window");

export default function Location({ navigation }) {
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('Main');
    }, 2000); // 2 seconds
  };

  return (
    <ImageBackground
      source={require('../../assets/mapbg.png')}
      style={styles.bg}
      resizeMode="cover"
    >
      {/* HEADER */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/back.png')}
            style={{ width: 26, height: 26 }}
          />
        </TouchableOpacity>

        <Text style={styles.title}>Select Location</Text>

        <View style={{ width: 42 }} />
      </View>

      {/* SEARCH BAR */}
      <View style={styles.searchBar}>
        <Image
          source={require('../../assets/search.png')}
          style={{ width: 20, height: 20, marginRight: 10, opacity: 0.6 }}
        />
        <TextInput
          style={{ flex: 1 }}
          placeholder="search for area"
          placeholderTextColor="#777"
        />
      </View>

      {/* LOCATION CARD */}
      <View style={styles.card}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={require('../../assets/location2.png')}
            style={{ width: 24, height: 24, marginRight: 10, tintColor: '#1d3f72' }}
          />
          <Text style={styles.currentLocation}>Use Current location</Text>
        </View>

        <Text style={styles.address}>Indore City. Indore, India</Text>

        <TouchableOpacity style={styles.rightArrow}>
          <Image
            source={require('../../assets/tick.png')}
            style={{ width: 18, height: 18, tintColor: '#1d3f72' }}
          />
        </TouchableOpacity>

        <Text style={styles.addAddress}>Add Address</Text>
      </View>

      {/* SAVE */}
      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>

      {/* LOADING OVERLAY (same as OTPScreen) */}
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#1d3f72" />
        </View>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: '100%',
    height: '100%',
    paddingTop: 70,
    paddingHorizontal: 20,
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  backBtn: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
    flex: 1,
  },

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 55,
    borderRadius: 14,
    paddingHorizontal: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 16,
    width: '100%',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },

  currentLocation: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1d3f72',
  },

  address: {
    marginTop: 6,
    marginLeft: 34,
    fontSize: 14,
    color: '#000',
  },

  rightArrow: {
    position: 'absolute',
    right: 15,
    top: 20,
  },

  addAddress: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: '600',
    color: '#ffab40',
  },

  saveBtn: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: '#1d3f72',
    width: width * 0.88,
    height: 58,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },

  saveText: {
    color: '#fff',
    fontSize: 18,
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
