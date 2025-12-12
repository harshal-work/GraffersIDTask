import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useColor } from '../../../../../util/ColorSwitcher';

const { width } = Dimensions.get('window');

// Consistent responsive sizing function
const responsiveSize = size => (width / 375) * size;

const RestaurantBadge = () => {
  const { bgColor, textColor } = useColor();

  return (
    <View style={styles.container}>
      <View style={styles.logoRow}>
        <View style={styles.logoInCurve}>
          <View style={styles.logoCircle}>
            <Image
              source={require('../../../../../assets/be.png')}
              style={styles.logo}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.mapButton} activeOpacity={0.8}>
          <Image
            source={require('../../../../../assets/mapicon.png')}
            style={styles.mapIcon}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Grocery Store</Text>

      <View style={styles.locationRow}>
        <Image
          source={require('../../../../../assets/location.png')}
          style={[styles.locIcon, { tintColor: bgColor }]}
        />
        <Text style={styles.locationText}>
          Near MC College, Barpeta Town Assam
        </Text>
      </View>

      <View style={styles.centerBadge}>
        <Text style={styles.centerBadgeText}>ELECTRONICS</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <View style={styles.iconContainer}>
            <Image
              source={require('../../../../../assets/location4.png')}
              style={[styles.statIcon, { tintColor: bgColor }]}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.statText}>590.0 m</Text>
        </View>

        {/* Vertical Separator Line */}
        <View style={styles.separator} />

        <View style={styles.statItem}>
          <View style={styles.iconContainer}>
            <Image
              source={require('../../../../../assets/clock.png')}
              style={[styles.statIcon, { tintColor: bgColor }]}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.statText}>25 min</Text>
        </View>

        {/* Vertical Separator Line */}
        <View style={styles.separator} />

        <View style={styles.statItem}>
          <View style={styles.iconContainer}>
            <Image
              source={require('../../../../../assets/order.png')}
              style={[styles.statIcon, { tintColor: bgColor }]}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.statText}>5000+ Order</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: wp('6%'),
    marginTop: -hp('6%'),
    zIndex: 2,
  },
  logoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: hp('1%'),
  },
  logoInCurve: {
    flex: 1,
    alignItems: 'center',
  },
  logoCircle: {
    width: responsiveSize(80),
    height: responsiveSize(80),
    borderRadius: responsiveSize(40),
    backgroundColor: '#FFDB56',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
      },
      android: { elevation: 6 },
    }),
    borderWidth: 4,
    borderColor: '#fff',
  },
  logo: {
    width: responsiveSize(48),
    height: responsiveSize(48),
    resizeMode: 'contain',
  },
  mapButton: {
    position: 'absolute',
    right: 0,
    top: hp('2%'),
  },
  mapIcon: {
    width: responsiveSize(32),
    height: responsiveSize(32),
    resizeMode: 'contain',
  },
  title: {
    fontSize: responsiveSize(22),
    fontWeight: 'bold',
    color: '#000',
    marginTop: responsiveSize(8),
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsiveSize(12),
    justifyContent: 'center',
    paddingHorizontal: wp('2%'),
    flexWrap: 'wrap',
  },
  locIcon: {
    width: responsiveSize(18),
    height: responsiveSize(18),
    marginRight: responsiveSize(8),
    resizeMode: 'contain',
  },
  locationText: {
    color: '#888',
    fontSize: responsiveSize(14),
    flexShrink: 1,
    textAlign: 'center',
    fontWeight: '600',
    maxWidth: '90%',
  },
  centerBadge: {
    marginTop: responsiveSize(20),
    backgroundColor: '#f5f5f5',
    paddingHorizontal: responsiveSize(20),
    paddingVertical: responsiveSize(10),
    borderRadius: responsiveSize(12),
  },
  centerBadgeText: {
    fontSize: responsiveSize(13),
    color: '#333',
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: responsiveSize(16),
    width: '100%',
    paddingHorizontal: responsiveSize(8),
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  iconContainer: {
    width: responsiveSize(16),
    height: responsiveSize(16),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: responsiveSize(4),
  },
  statIcon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  statText: {
    fontSize: responsiveSize(11),
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
  },
  separator: {
    width: 1,
    height: responsiveSize(20),
    backgroundColor: '#E0E0E0',
    marginHorizontal: responsiveSize(5),
  },
});

export default RestaurantBadge;
