import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useColor } from '../../../util/ColorSwitcher';

const { width, height } = Dimensions.get('window');

// Swiggy-style tighter scaling
const rs = size => (width / 400) * size;

const isIOS = Platform.OS === 'ios';

const settingsData = [
  { id: 1, title: 'Account Setting', icon: require('../../../assets/ac.png') },
  {
    id: 2,
    title: "Sound's and voice",
    icon: require('../../../assets/sound.png'),
  },
  { id: 3, title: 'Language', icon: require('../../../assets/language.png') },
  {
    id: 4,
    title: 'Notification Setting',
    icon: require('../../../assets/notisetting.png'),
  },
  {
    id: 5,
    title: 'Account management',
    icon: require('../../../assets/acmanage.png'),
  },
  { id: 6, title: 'About us', icon: require('../../../assets/aboutus.png') },
  { id: 7, title: 'Share app', icon: require('../../../assets/share1.png') },
];

const Settings = () => {
  const navigation = useNavigation();
  const { bgColor, textColor } = useColor();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header - Swiggy compact style */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../../assets/back.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Setting's</Text>
        <View style={{ width: rs(32) }} />
      </View>

      {/* List */}
      {settingsData.map(item => (
        <TouchableOpacity key={item.id} style={styles.row}>
          <View style={styles.rowLeft}>
            <Image source={item.icon} style={styles.rowIcon} />
            <Text style={styles.rowText}>{item.title}</Text>
          </View>

          <Image
            source={require('../../../assets/arrow-right.png')}
            style={styles.arrow}
          />
        </TouchableOpacity>
      ))}

      {/* Logout */}
      <TouchableOpacity style={styles.logoutRow}>
        <Image
          source={require('../../../assets/logout.png')}
          style={[styles.rowIcon, { tintColor: '#d32f2f' }]}
        />
        <Text style={styles.logoutText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  /* Header - Swiggy compact */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: isIOS ? rs(44) : rs(26),
    paddingBottom: rs(12),
    paddingHorizontal: rs(13),
  },
  backIcon: {
    width: rs(18),
    height: rs(18),
    tintColor: '#000',
  },
  headerTitle: {
    fontSize: rs(16),
    fontWeight: '600',
    color: '#000',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: rs(8),
  },

  /* Rows - Compact Swiggy style */
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: rs(12),
    paddingHorizontal: rs(13),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowIcon: {
    width: rs(19),
    height: rs(19),
    tintColor: '#000',
    marginRight: rs(12),
  },
  rowText: {
    fontSize: rs(13.5),
    color: '#000',
    flex: 1,
  },
  arrow: {
    width: rs(16),
    height: rs(16),
    tintColor: '#8b8b8bff',
  },

  /* Logout - Compact */
  logoutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: rs(14),
    paddingHorizontal: rs(13),
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  logoutText: {
    fontSize: rs(13.5),
    color: '#d32f2f',
    marginLeft: rs(12),
    fontWeight: '500',
  },
});
