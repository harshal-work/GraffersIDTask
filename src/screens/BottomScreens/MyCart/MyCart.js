// src/screens/ProfileMenuScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PURPLE = '#211b47';

export default function ProfileMenuScreen({ navigation }: any) {
  const handleNavigate = (screen: string) => {
    navigation.navigate(screen);
  };

  const handleLogout = async () => {
    try {
      // Clear login status
      await AsyncStorage.removeItem('IS_LOGGED_IN');
      // Optionally clear user data too
      await AsyncStorage.removeItem('USER');
      
      navigation.replace('Login');
    } catch (error) {
      console.log('Logout error:', error);
      navigation.replace('Login');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={PURPLE} barStyle="light-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.profileImageContainer}>
          <Image
            source={require('../../../assets/splash.png')}
            style={styles.profileImage}
          />
        </View>
        <Text style={styles.userName}>Graffers ID</Text>
        <Text style={styles.userRole}>Task</Text>
      </View>

      {/* CONTENT */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* MENU CARD */}
        <View style={styles.card}>
          <MenuItem
            icon={require('../../../assets/user2.png')}
            label="Profile"
            onPress={() => handleNavigate('Profile')}
          />

          <MenuItem
            icon={require('../../../assets/Home.png')}
            label="Home"
            onPress={() => handleNavigate('Home')}
          />
        </View>

        {/* LOGOUT */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Image
            source={require('../../../assets/logout.png')}
            style={styles.logoutIcon}
          />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

/* MENU ITEM COMPONENT */
const MenuItem = ({
  icon,
  label,
  onPress,
}: {
  icon: any;
  label: string;
  onPress: () => void;
}) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.iconBox}>
      <Image source={icon} style={styles.menuIcon} />
    </View>
    <Text style={styles.menuText}>{label}</Text>
    <Text style={styles.arrow}>›</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },

  /* HEADER */
  header: {
    backgroundColor: PURPLE,
    paddingTop: 60,
    paddingBottom: 30,
    alignItems: 'center',
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#fff',
    overflow: 'hidden',
    marginBottom: 14,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  userName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#fff',
  },
  userRole: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
    fontWeight: '600',
  },

  /* CONTENT */
  content: {
    padding: 20,
  },

  /* CARD */
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 8,
    marginBottom: 30,
    elevation: 3,
  },

  /* MENU ITEM */
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#eef2ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuIcon: {
    width: 20,
    height: 20,
    tintColor: PURPLE,
  },
  menuText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    flex: 1,
  },
  arrow: {
    fontSize: 22,
    color: '#9ca3af',
  },

  /* LOGOUT */
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ef4444',
    paddingVertical: 16,
    borderRadius: 14,
    justifyContent: 'center',
  },
  logoutIcon: {
    width: 22,
    height: 22,
    tintColor: '#fff',
    marginRight: 10,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
});
