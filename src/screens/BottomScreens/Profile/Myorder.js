import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useColor } from '../../../util/ColorSwitcher';

const { width } = Dimensions.get('window');

// slightly smaller base than 375 for a tighter Swiggy-like look
const responsiveSize = size => (width / 400) * size;

const isIOS = Platform.OS === 'ios';

const fontScale = size => (isIOS ? size * 0.95 : size);

const scaleSize = size => (isIOS ? size * 1.02 : size);

const MyOrder = () => {
  const navigation = useNavigation();
  const { bgColor, textColor } = useColor();

  return (
    <View style={[styles.container, { backgroundColor: '#FFFFFF' }]}>
      <StatusBar backgroundColor={bgColor} barStyle="light-content" />

      {/* Header - Swiggy style compact */}
      <View style={[styles.header, { backgroundColor: bgColor }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.iconBtn, { backgroundColor: '#FFFFFF' }]}
        >
          <Image
            source={require('../../../assets/back.png')}
            style={[styles.icon, { tintColor: bgColor }]}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>My Orders</Text>

        <View style={{ width: responsiveSize(40) }} />
      </View>

      {/* Orders */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Card 1 */}
        <View style={styles.card}>
          <Text style={[styles.orderTitle, { color: bgColor }]}>
            Order #12345
          </Text>
          <Text style={styles.text}>Status: Delivered</Text>
          <Text style={styles.text}>Date: 25 Oct 2025</Text>
        </View>

        {/* Card 2 */}
        <View style={styles.card}>
          <Text style={[styles.orderTitle, { color: bgColor }]}>
            Order #67890
          </Text>
          <Text style={styles.text}>Status: In Transit</Text>
          <Text style={styles.text}>Date: 27 Oct 2025</Text>
        </View>

        {/* Extra padding for bottom tab */}
        <View style={{ height: responsiveSize(72) }} />
      </ScrollView>
    </View>
  );
};

export default MyOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: isIOS ? responsiveSize(80) : responsiveSize(70),
    paddingHorizontal: responsiveSize(13),
    paddingTop: responsiveSize(8),
  },

  /* HEADER - Compact Swiggy style */
  header: {
    height: isIOS ? responsiveSize(90) : responsiveSize(82),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveSize(16),
    justifyContent: 'space-between',
    paddingTop: isIOS ? responsiveSize(44) : responsiveSize(26),
    paddingBottom: 0,
  },
  headerTitle: {
    color: '#fff',
    fontSize: fontScale(responsiveSize(16)),
    fontWeight: '700',
    textAlign: 'center',
    flex: 1,
    marginHorizontal: responsiveSize(10),
  },
  iconBtn: {
    width: responsiveSize(36),
    height: responsiveSize(36),
    borderRadius: responsiveSize(10),
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  icon: {
    width: responsiveSize(18),
    height: responsiveSize(18),
  },

  /* Order Card - Swiggy-style compact with reduced sizes */
  card: {
    backgroundColor: '#f9f9f9',
    padding: responsiveSize(13),
    borderRadius: scaleSize(responsiveSize(12)),
    marginBottom: responsiveSize(12),
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

  orderTitle: {
    fontSize: fontScale(responsiveSize(15)),
    fontWeight: '700',
    marginBottom: responsiveSize(4),
  },

  text: {
    fontSize: fontScale(responsiveSize(12.5)),
    color: '#333',
    marginBottom: responsiveSize(2),
  },
});
