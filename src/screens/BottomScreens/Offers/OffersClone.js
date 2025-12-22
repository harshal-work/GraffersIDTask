import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useColor } from '../../../util/ColorSwitcher';

const { width, height } = Dimensions.get('window');

// Slightly reduced responsive sizing
const responsiveSize = size => (width / 400) * size;

// Platform detection
const isIOS = Platform.OS === 'ios';

// Responsive font scaling
const fontScale = size => {
  return isIOS ? size * 0.95 : size;
};

// Scale size for dimensions
const scaleSize = size => {
  return isIOS ? size * 1.02 : size;
};

// Static Offers Data
const offersData = [
  {
    id: 1,
    title: 'Free Delivery',
    description: 'Enjoy exclusive discount on\njewelry today!',
    image: require('../../../assets/offers.png'),
    buttonText: 'VIEW OFFERS',
  },
  {
    id: 2,
    title: '50% OFF Groceries',
    description: 'Get 50% discount on\nfresh groceries & staples!',
    image: require('../../../assets/50.png'),
    buttonText: 'SHOP NOW',
  },
  {
    id: 3,
    title: '10% Health Discount',
    description: '10% off on medicines\n& healthcare products!',
    image: require('../../../assets/10.png'),
    buttonText: 'GET DEAL',
  },
  {
    id: 4,
    title: 'Electronics Sale',
    description: 'Up to 30% off on\nsmartphones & accessories!',
    image: require('../../../assets/offers.png'),
    buttonText: 'EXPLORE',
  },
  {
    id: 5,
    title: 'Card Payment Offer',
    description: '5% cashback on\nall card payments!',
    image: require('../../../assets/50.png'),
    buttonText: 'ACTIVATE',
  },
  {
    id: 6,
    title: 'Grocery Combo',
    description: 'Buy 2 get 1 free\non grocery essentials!',
    image: require('../../../assets/10.png'),
    buttonText: 'VIEW COMBO',
  },
];

export default function OfferClone({ navigation }) {
  const { bgColor, textColor } = useColor();

  const handleViewOffer = offer => {
    console.log(`Navigate to offer: ${offer.title}`);
    // Navigation logic - replace with your navigation
  };

  return (
    <View style={[styles.container, { backgroundColor: '#FFFFFF' }]}>
      <StatusBar backgroundColor={bgColor} barStyle="light-content" />

      {/* Header with Back Button */}
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

        <Text style={styles.headerTitle}>Offers</Text>

        <View style={{ width: responsiveSize(32) }} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {offersData.map((offer, index) => (
          <View
            key={offer.id}
            style={[
              styles.offerCard,
              {
                backgroundColor: textColor,
                marginBottom:
                  index === offersData.length - 1
                    ? responsiveSize(16)
                    : responsiveSize(12),
              },
            ]}
          >
            <View style={styles.offerContent}>
              <Text style={[styles.offerHeader, { color: bgColor }]}>
                {offer.title}
              </Text>
              <Text style={[styles.offerSubTxt, { color: textColor + 'CC' }]}>
                {offer.description}
              </Text>
              <TouchableOpacity
                style={[styles.offerButton, { backgroundColor: bgColor }]}
                onPress={() => handleViewOffer(offer)}
                activeOpacity={0.8}
              >
                <Text style={[styles.offerBtnText, { color: textColor }]}>
                  {offer.buttonText}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.offerImageWrap}>
              <Image
                source={offer.image}
                style={[styles.offerImage, { tintColor: bgColor }]}
                resizeMode="contain"
              />
            </View>
          </View>
        ))}

        {/* Extra padding for bottom tab */}
        <View style={{ height: responsiveSize(64) }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom:
      Platform.OS === 'ios' ? responsiveSize(80) : responsiveSize(72),
    paddingHorizontal: responsiveSize(12),
    paddingTop: responsiveSize(8),
  },

  /* HEADER - compact */
  header: {
    height: Platform.OS === 'ios' ? responsiveSize(90) : responsiveSize(82),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveSize(14),
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? responsiveSize(44) : responsiveSize(26),
    paddingBottom: 0,
  },
  headerTitle: {
    color: '#fff',
    fontSize: responsiveSize(16),
    fontWeight: '700',
    textAlign: 'center',
    flex: 1,
    marginHorizontal: responsiveSize(8),
  },
  iconBtn: {
    width: responsiveSize(34),
    height: responsiveSize(34),
    borderRadius: responsiveSize(10),
    justifyContent: 'center',
    alignItems: 'center',
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
  icon: {
    width: responsiveSize(16),
    height: responsiveSize(16),
    resizeMode: 'contain',
  },

  /* OFFER CARD */
  offerCard: {
    borderRadius: scaleSize(responsiveSize(13)),
    flexDirection: 'row',
    alignItems: 'center',
    padding: scaleSize(responsiveSize(14)),
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
  offerContent: {
    flex: 1,
    marginRight: responsiveSize(10),
  },
  offerHeader: {
    fontWeight: '700',
    fontSize: fontScale(responsiveSize(15)),
    marginBottom: responsiveSize(4),
  },
  offerSubTxt: {
    fontSize: fontScale(responsiveSize(11)),
    marginBottom: responsiveSize(12),
    lineHeight: responsiveSize(17),
  },
  offerButton: {
    borderRadius: scaleSize(responsiveSize(8)),
    paddingVertical: isIOS ? responsiveSize(10) : responsiveSize(9),
    paddingHorizontal: responsiveSize(14),
    alignSelf: 'flex-start',
  },
  offerBtnText: {
    fontWeight: '700',
    fontSize: fontScale(responsiveSize(11)),
    letterSpacing: 0.25,
  },
  offerImageWrap: {
    width: responsiveSize(70),
    height: responsiveSize(70),
    justifyContent: 'center',
    alignItems: 'center',
  },
  offerImage: {
    width: '100%',
    height: '100%',
  },
});
