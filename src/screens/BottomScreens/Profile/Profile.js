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

// Swiggy-style tighter scaling
const responsiveSize = size => (width / 400) * size;

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
      icon: require('../../../assets/wallet.png'),
      label: 'Wallet',
      route: 'Wallet',
    },
    {
      id: 4,
      icon: require('../../../assets/settings.png'),
      label: 'Settings',
      route: 'Setting',
    },
  ];

  // Bottom options (list view)
  const bottomOptions = [
    {
      id: 1,
      icon: require('../../../assets/blueprofile.png'),
      label: 'Profile',
      route: 'MyProfile',
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
      route: 'OffersClone',
    },
    {
      id: 4,
      icon: require('../../../assets/refer.png'),
      label: 'Refer To Earn',
      route: 'Refertoearn',
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
    },
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
                navigation.navigate('Login'),
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
        </View>

        {/* Extra padding for bottom tab */}
        <View style={{ height: responsiveSize(72) }} />
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
      Platform.OS === 'ios' ? responsiveSize(80) : responsiveSize(70),
    paddingHorizontal: responsiveSize(13),
    paddingTop: responsiveSize(8),
  },

  /* HEADER - Swiggy compact */
  header: {
    height: Platform.OS === 'ios' ? responsiveSize(90) : responsiveSize(82),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveSize(16),
    justifyContent: 'center',
    paddingTop: Platform.OS === 'ios' ? responsiveSize(44) : responsiveSize(26),
    paddingBottom: 0,
  },
  headerTitle: {
    color: '#fff',
    fontSize: responsiveSize(16),
    fontWeight: '700',
    textAlign: 'center',
    flex: 1,
  },

  // Profile Header Section - Reduced sizes
  profileHeader: {
    width: '100%',
    paddingTop: responsiveSize(12),
    paddingBottom: responsiveSize(12),
    backgroundColor: '#FFFFFF',
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveSize(13),
  },
  userImage: {
    width: responsiveSize(70),
    height: responsiveSize(70),
    borderRadius: responsiveSize(35),
    borderWidth: 2,
    borderColor: '#FFFFFF',
    backgroundColor: '#F0F0F0',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  userInfo: {
    flex: 1,
    marginLeft: responsiveSize(12),
  },
  userName: {
    fontSize: responsiveSize(18),
    fontWeight: '700',
    color: '#333333',
    marginBottom: responsiveSize(3),
  },
  userEmail: {
    fontSize: responsiveSize(12),
    color: '#666666',
    marginBottom: responsiveSize(1.5),
    fontWeight: '500',
  },
  userPhone: {
    fontSize: responsiveSize(12),
    color: '#666666',
    fontWeight: '500',
  },

  // Top Options Grid - Compact
  topOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveSize(13),
    marginTop: responsiveSize(8),
    marginBottom: responsiveSize(16),
  },
  topOption: {
    width: width * 0.22,
    alignItems: 'center',
  },
  topIconContainer: {
    width: responsiveSize(52),
    height: responsiveSize(52),
    borderRadius: responsiveSize(14),
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsiveSize(6),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  topIcon: {
    width: responsiveSize(22),
    height: responsiveSize(22),
  },
  topLabel: {
    fontSize: responsiveSize(11),
    color: '#333333',
    fontWeight: '500',
    textAlign: 'center',
  },

  // Bottom Options List - Compact
  bottomSection: {
    marginTop: responsiveSize(4),
    paddingHorizontal: responsiveSize(13),
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: responsiveSize(13),
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionIconContainer: {
    width: responsiveSize(38),
    height: responsiveSize(38),
    borderRadius: responsiveSize(10),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: responsiveSize(12),
  },
  optionIcon: {
    width: responsiveSize(19),
    height: responsiveSize(19),
  },
  optionLabel: {
    fontSize: responsiveSize(14),
    color: '#333333',
    fontWeight: '600',
    flex: 1,
  },
  arrowIcon: {
    width: responsiveSize(14),
    height: responsiveSize(14),
  },

  // Popup Modal Styles - Compact
  popupOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: responsiveSize(16),
  },
  popupBox: {
    width: width * 0.88,
    backgroundColor: '#FFFFFF',
    borderRadius: responsiveSize(14),
    padding: responsiveSize(20),
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  popupText: {
    fontSize: responsiveSize(14),
    textAlign: 'center',
    marginBottom: responsiveSize(20),
    color: '#333333',
    fontWeight: '500',
    lineHeight: responsiveSize(19),
  },
  popupButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  popupButton: {
    borderRadius: responsiveSize(9),
    paddingVertical: responsiveSize(10),
    paddingHorizontal: responsiveSize(16),
    minWidth: responsiveSize(85),
    alignItems: 'center',
  },
  popupCancelButton: {
    backgroundColor: '#F0F0F0',
    marginRight: responsiveSize(8),
  },
  popupConfirmButton: {},
  popupButtonText: {
    fontSize: responsiveSize(13),
    fontWeight: '600',
  },
});
