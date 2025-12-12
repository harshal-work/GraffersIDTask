import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useColor } from '../../../util/ColorSwitcher';

const { width, height } = Dimensions.get('window');

// Responsive sizing
const responsiveSize = size => (width / 375) * size;

const Profile = () => {
  const navigation = useNavigation();
  const { bgColor, textColor } = useColor();
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupAction, setPopupAction] = useState(null);

  // Top options with 4 icons in a row
  const topOptions = [
    {
      id: 1,
      icon: require('../../../assets/address.png'),
      label: 'Address',
      route: 'Address',
    },
    {
      id: 2,
      icon: require('../../../assets/order.png'),
      label: 'My Order',
      route: 'MyOrder',
    },
    {
      id: 3,
      icon: require('../../../assets/subscription.png'),
      label: 'Subscriptions',
      route: 'Subscription',
    },
    {
      id: 4,
      icon: require('../../../assets/wallet.png'),
      label: 'Wallet',
      route: 'Wallet',
    },
  ];

  // Bottom options (list view)
  const bottomOptions = [
    {
      id: 1,
      icon: require('../../../assets/blueprofile.png'),
      label: 'Profile',
      route: 'ProfileEdit',
    },
    {
      id: 2,
      icon: require('../../../assets/fav.png'),
      label: "Favourite's",
      route: 'Favourite',
    },
    {
      id: 3,
      icon: require('../../../assets/offers.png'),
      label: "My Offer's",
      route: 'Offers',
    },
    {
      id: 4,
      icon: require('../../../assets/refer.png'),
      label: 'Refer To Earn',
      route: 'Refer',
    },
    {
      id: 5,
      icon: require('../../../assets/dark.png'),
      label: 'Dark Mode',
      route: 'DarkMode',
    },
    {
      id: 6,
      icon: require('../../../assets/support.png'),
      label: 'Support',
      route: 'Support',
    },
    {
      id: 7,
      icon: require('../../../assets/help.png'),
      label: 'Help',
      route: 'Help',
    }, // Added Help here
    {
      id: 8,
      icon: require('../../../assets/settings.png'),
      label: "Setting's",
      route: 'Settings',
    },
  ];

  const openPopup = (message, onConfirm) => {
    setPopupMessage(message);
    setPopupAction(() => onConfirm);
    setShowPopup(true);
  };

  const handleNavigation = route => {
    navigation.navigate(route);
  };

  return (
    <View style={[styles.container, { backgroundColor: '#FFFFFF' }]}>
      <StatusBar backgroundColor={bgColor} barStyle="light-content" />

      {/* HEADER */}
      <View style={[styles.header, { backgroundColor: bgColor }]}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Header Section */}
        <View style={styles.profileHeader}>
          <View style={styles.userRow}>
            <Image
              source={require('../../../assets/user2.png')}
              style={styles.userImage}
            />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>Harshal Sharma</Text>
              <Text style={styles.userEmail}>harshal@gmail.com</Text>
              <Text style={styles.userPhone}>+91 1234567890</Text>
            </View>
          </View>
        </View>

        {/* Top Options Grid (4 items in a row) */}
        <View style={styles.topOptionsContainer}>
          {topOptions.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.topOption}
              onPress={() => handleNavigation(item.route)}
              activeOpacity={0.8}
            >
              <View style={styles.topIconContainer}>
                <Image
                  source={item.icon}
                  style={[styles.topIcon, { tintColor: bgColor }]}
                />
              </View>
              <Text style={styles.topLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Bottom Options List */}
        <View style={styles.bottomSection}>
          {bottomOptions.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.optionRow}
              onPress={() => handleNavigation(item.route)}
              activeOpacity={0.7}
            >
              <View style={styles.optionLeft}>
                <View
                  style={[
                    styles.optionIconContainer,
                    { backgroundColor: `${bgColor}15` },
                  ]}
                >
                  <Image
                    source={item.icon}
                    style={[styles.optionIcon, { tintColor: bgColor }]}
                  />
                </View>
                <Text style={styles.optionLabel}>{item.label}</Text>
              </View>
              <Image
                source={require('../../../assets/arrow-right.png')}
                style={[styles.arrowIcon, { tintColor: '#666' }]}
              />
            </TouchableOpacity>
          ))}

          {/* Logout Option */}
          <TouchableOpacity
            style={styles.optionRow}
            onPress={() =>
              openPopup('Are you sure you want to logout?', () =>
                navigation.navigate('SignIn'),
              )
            }
            activeOpacity={0.7}
          >
            <View style={styles.optionLeft}>
              <View
                style={[
                  styles.optionIconContainer,
                  { backgroundColor: '#E5393515' },
                ]}
              >
                <Image
                  source={require('../../../assets/logout.png')}
                  style={[styles.optionIcon, { tintColor: '#E53935' }]}
                />
              </View>
              <Text style={[styles.optionLabel, { color: '#E53935' }]}>
                Logout
              </Text>
            </View>
          </TouchableOpacity>

          {/* Delete Account Option */}
          <TouchableOpacity
            style={styles.optionRow}
            onPress={() =>
              openPopup('Are you sure you want to delete your account?', () =>
                navigation.navigate('SignIn'),
              )
            }
            activeOpacity={0.7}
          >
            <View style={styles.optionLeft}>
              <View
                style={[
                  styles.optionIconContainer,
                  { backgroundColor: '#E5393515' },
                ]}
              >
                <Image
                  source={require('../../../assets/delete.png')}
                  style={[styles.optionIcon, { tintColor: '#E53935' }]}
                />
              </View>
              <Text style={[styles.optionLabel, { color: '#E53935' }]}>
                Delete Account
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Extra padding for bottom tab */}
        <View style={{ height: responsiveSize(80) }} />
      </ScrollView>

      {/* Popup Modal */}
      <Modal
        transparent
        visible={showPopup}
        animationType="fade"
        onRequestClose={() => setShowPopup(false)}
      >
        <View style={styles.popupOverlay}>
          <View style={styles.popupBox}>
            <Text style={styles.popupText}>{popupMessage}</Text>
            <View style={styles.popupButtonsContainer}>
              <TouchableOpacity
                style={[styles.popupButton, styles.popupCancelButton]}
                onPress={() => setShowPopup(false)}
              >
                <Text style={[styles.popupButtonText, { color: '#333' }]}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.popupButton,
                  styles.popupConfirmButton,
                  { backgroundColor: bgColor },
                ]}
                onPress={() => {
                  setShowPopup(false);
                  popupAction && popupAction();
                }}
              >
                <Text style={[styles.popupButtonText, { color: '#fff' }]}>
                  OK
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom:
      Platform.OS === 'ios' ? responsiveSize(100) : responsiveSize(90),
  },

  /* HEADER */
  header: {
    height: Platform.OS === 'ios' ? responsiveSize(100) : responsiveSize(90),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveSize(18),
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? responsiveSize(50) : responsiveSize(30),
    paddingBottom: responsiveSize(0),
  },
  headerTitle: {
    color: '#fff',
    fontSize: responsiveSize(20),
    fontWeight: '700',
    textAlign: 'center',
    flex: 1,
    marginHorizontal: responsiveSize(10),
  },

  // Profile Header Section
  profileHeader: {
    width: '100%',
    paddingTop: responsiveSize(15),
    paddingBottom: responsiveSize(15),
    backgroundColor: '#FFFFFF',
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveSize(20),
  },
  userImage: {
    width: responsiveSize(85),
    height: responsiveSize(85),
    borderRadius: responsiveSize(42.5),
    borderWidth: 3,
    borderColor: '#FFFFFF',
    backgroundColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userInfo: {
    flex: 1,
    marginLeft: responsiveSize(15),
  },
  userName: {
    fontSize: responsiveSize(22),
    fontWeight: '700',
    color: '#333333',
    marginBottom: responsiveSize(4),
  },
  userEmail: {
    fontSize: responsiveSize(14),
    color: '#666666',
    marginBottom: responsiveSize(2),
    fontWeight: '500',
  },
  userPhone: {
    fontSize: responsiveSize(14),
    color: '#666666',
    fontWeight: '500',
  },

  // Top Options Grid
  topOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveSize(15),
    marginTop: responsiveSize(10),
    marginBottom: responsiveSize(20),
  },
  topOption: {
    width: width * 0.21,
    alignItems: 'center',
  },
  topIconContainer: {
    width: responsiveSize(60),
    height: responsiveSize(60),
    borderRadius: responsiveSize(16),
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsiveSize(8),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  topIcon: {
    width: responsiveSize(26),
    height: responsiveSize(26),
  },
  topLabel: {
    fontSize: responsiveSize(11.9),
    color: '#333333',
    fontWeight: '500',
    textAlign: 'center',
  },

  // Bottom Options List
  bottomSection: {
    marginTop: responsiveSize(5),
    paddingHorizontal: responsiveSize(20),
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: responsiveSize(16),
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionIconContainer: {
    width: responsiveSize(44),
    height: responsiveSize(44),
    borderRadius: responsiveSize(12),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: responsiveSize(15),
  },
  optionIcon: {
    width: responsiveSize(22),
    height: responsiveSize(22),
  },
  optionLabel: {
    fontSize: responsiveSize(16),
    color: '#333333',
    fontWeight: '600',
    flex: 1,
  },
  arrowIcon: {
    width: responsiveSize(16),
    height: responsiveSize(16),
  },

  // Popup Modal Styles
  popupOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: responsiveSize(20),
  },
  popupBox: {
    width: width * 0.85,
    backgroundColor: '#FFFFFF',
    borderRadius: responsiveSize(16),
    padding: responsiveSize(25),
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  popupText: {
    fontSize: responsiveSize(16),
    textAlign: 'center',
    marginBottom: responsiveSize(25),
    color: '#333333',
    fontWeight: '500',
    lineHeight: responsiveSize(22),
  },
  popupButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  popupButton: {
    borderRadius: responsiveSize(10),
    paddingVertical: responsiveSize(12),
    paddingHorizontal: responsiveSize(20),
    minWidth: responsiveSize(100),
    alignItems: 'center',
  },
  popupCancelButton: {
    backgroundColor: '#F0F0F0',
    marginRight: responsiveSize(10),
  },
  popupConfirmButton: {
    // Background color is set inline with bgColor
  },
  popupButtonText: {
    fontSize: responsiveSize(14),
    fontWeight: '600',
  },
});
