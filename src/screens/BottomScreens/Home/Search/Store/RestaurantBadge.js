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

// Slightly reduced responsive sizing
const responsiveSize = size => (width / 400) * size;

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
    paddingHorizontal: wp('5%'),
    marginTop: -hp('5.5%'),
    zIndex: 2,
  },
  logoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: hp('0.8%'),
  },
  logoInCurve: {
    flex: 1,
    alignItems: 'center',
  },
  logoCircle: {
    width: responsiveSize(70),
    height: responsiveSize(70),
    borderRadius: responsiveSize(35),
    backgroundColor: '#FFDB56',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
      },
      android: { elevation: 5 },
    }),
    borderWidth: 3,
    borderColor: '#fff',
  },
  logo: {
    width: responsiveSize(42),
    height: responsiveSize(42),
    resizeMode: 'contain',
  },
  mapButton: {
    position: 'absolute',
    right: 0,
    top: hp('1.6%'),
  },
  mapIcon: {
    width: responsiveSize(26),
    height: responsiveSize(26),
    resizeMode: 'contain',
  },
  title: {
    fontSize: responsiveSize(18),
    fontWeight: 'bold',
    color: '#000',
    marginTop: responsiveSize(6),
    textAlign: 'center',
    letterSpacing: -0.4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsiveSize(8),
    justifyContent: 'center',
    paddingHorizontal: wp('2%'),
    flexWrap: 'wrap',
  },
  locIcon: {
    width: responsiveSize(14),
    height: responsiveSize(14),
    marginRight: responsiveSize(6),
    resizeMode: 'contain',
  },
  locationText: {
    color: '#888',
    fontSize: responsiveSize(11.5),
    flexShrink: 1,
    textAlign: 'center',
    fontWeight: '600',
    maxWidth: '90%',
  },
  centerBadge: {
    marginTop: responsiveSize(14),
    backgroundColor: '#f5f5f5',
    paddingHorizontal: responsiveSize(16),
    paddingVertical: responsiveSize(8),
    borderRadius: responsiveSize(10),
  },
  centerBadgeText: {
    fontSize: responsiveSize(11),
    color: '#333',
    fontWeight: 'bold',
    letterSpacing: 0.4,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: responsiveSize(12),
    width: '100%',
    paddingHorizontal: responsiveSize(6),
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  iconContainer: {
    width: responsiveSize(14),
    height: responsiveSize(14),
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
    fontSize: responsiveSize(9.5),
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
  },
  separator: {
    width: 1,
    height: responsiveSize(16),
    backgroundColor: '#E0E0E0',
    marginHorizontal: responsiveSize(4),
  },
});

export default RestaurantBadge;
