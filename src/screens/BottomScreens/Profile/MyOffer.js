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

const { width } = Dimensions.get('window');

// slightly smaller base than 375 for a tighter look
const responsiveSize = size => (width / 400) * size;

const isIOS = Platform.OS === 'ios';

const fontScale = size => (isIOS ? size * 0.95 : size);

const scaleSize = size => (isIOS ? size * 1.02 : size);

// Static Offers Data - FIXED line breaks
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

export default function Offers() {
  const { bgColor, textColor } = useColor();

  const handleViewOffer = offer => {
    console.log(`Navigate to offer: ${offer.title}`);
    // Navigation logic - replace with your navigation
  };

  return (
    <View style={[styles.container, { backgroundColor: '#FFFFFF' }]}>
      <StatusBar backgroundColor={bgColor} barStyle="light-content" />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: bgColor }]}>
        <Text style={styles.headerTitle}>My Offer's</Text>
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
                    ? responsiveSize(18)
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
        <View style={{ height: responsiveSize(72) }} />
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
      Platform.OS === 'ios' ? responsiveSize(80) : responsiveSize(70),
    paddingHorizontal: responsiveSize(13),
    paddingTop: responsiveSize(8),
  },

  /* HEADER */
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
    fontSize: fontScale(responsiveSize(16)),
    fontWeight: '700',
    textAlign: 'center',
    flex: 1,
  },

  /* OFFER CARD */
  offerCard: {
    borderRadius: scaleSize(responsiveSize(14)),
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
    marginRight: responsiveSize(8),
  },
  offerHeader: {
    fontWeight: '700',
    fontSize: fontScale(responsiveSize(15)),
    marginBottom: responsiveSize(4),
  },
  offerSubTxt: {
    fontSize: fontScale(responsiveSize(11.5)),
    marginBottom: responsiveSize(12),
    lineHeight: responsiveSize(17),
  },
  offerButton: {
    borderRadius: scaleSize(responsiveSize(9)),
    paddingVertical: isIOS ? responsiveSize(9) : responsiveSize(8),
    paddingHorizontal: responsiveSize(14),
    alignSelf: 'flex-start',
  },
  offerBtnText: {
    fontWeight: '700',
    fontSize: fontScale(responsiveSize(11.5)),
    letterSpacing: 0.3,
  },
  offerImageWrap: {
    width: responsiveSize(64),
    height: responsiveSize(64),
    justifyContent: 'center',
    alignItems: 'center',
  },
  offerImage: {
    width: '100%',
    height: '100%',
  },
});
