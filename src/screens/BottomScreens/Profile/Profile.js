import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  BackHandler,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
    
    // Handle device back button
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.replace('Main');
      return true;
    });

    return () => backHandler.remove();
  }, []);

  const loadUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('USER');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.log('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBackPress = () => {
    navigation.replace('Main');
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading Profile...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity 
        style={styles.backBtn} 
        onPress={handleBackPress}
      >
        <Image source={require('../../../assets/back.png')} style={styles.backIcon} />
      </TouchableOpacity>

      {/* Profile Card */}
      <View style={styles.card}>
        {/* Profile Image */}
        <View style={styles.profileImageContainer}>
          <Image 
            source={require('../../../assets/splash.png')} 
            style={styles.profileImage}
            resizeMode="cover"
          />
        </View>

        {/* Name Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Name</Text>
          <Text style={styles.infoValue}>{user?.name || 'Not set'}</Text>
        </View>

        {/* Mobile Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Mobile Number</Text>
          <Text style={styles.infoValue}>{user?.mobile || 'Not set'}</Text>
        </View>

        {/* Email Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Email</Text>
          <Text style={styles.infoValue}>{user?.email || 'Not set'}</Text>
        </View>

        {/* DOB Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Date of Birth</Text>
          <Text style={styles.infoValue}>{user?.dob || 'Not set'}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef2f7',
  },
  backBtn: { 
    position: 'absolute', 
    top: 50, 
    left: 20, 
    zIndex: 10,
    padding: 8,
  },
  backIcon: { 
    width: 24, 
    height: 24 
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    marginTop: 100,
    margin: 20,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    alignItems: 'center',
  },
  profileImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#211b47',
    overflow: 'hidden',
    marginBottom: 24,
    elevation: 8,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    backgroundColor: '#f8fafc',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
  },
  infoLabel: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '600',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 18,
    color: '#1f2937',
    fontWeight: '700',
  },
  loadingText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 100,
  },
});

export default Profile;
