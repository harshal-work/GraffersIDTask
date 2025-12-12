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

// Responsive sizing (from MyOrdersScreen reference)
const responsiveSize = (size) => (width / 375) * size;

// Platform detection
const isIOS = Platform.OS === 'ios';

// Responsive font scaling (adapted from OfferCard)
const fontScale = (size) => {
  return isIOS ? size * 0.95 : size;
};

// Scale size for dimensions (adapted from OfferCard)
const scaleSize = (size) => {
  return isIOS ? size * 1.02 : size;
};

// Static Offers Data - FIXED line breaks
const offersData = [
  {
    id: 1,
    title: 'Free Delivery',
    description: 'Enjoy exclusive discount on\njewelry today!',
    image: require('../../../assets/offers.png'),
    buttonText: 'VIEW OFFERS'
  },
  {
    id: 2,
    title: '50% OFF Groceries',
    description: 'Get 50% discount on\nfresh groceries & staples!',
    image: require('../../../assets/50.png'),
    buttonText: 'SHOP NOW'
  },
  {
    id: 3,
    title: '10% Health Discount',
    description: '10% off on medicines\n& healthcare products!',
    image: require('../../../assets/10.png'),
    buttonText: 'GET DEAL'
  },
  {
    id: 4,
    title: 'Electronics Sale',
    description: 'Up to 30% off on\nsmartphones & accessories!',
    image: require('../../../assets/offers.png'),
    buttonText: 'EXPLORE'
  },
  {
    id: 5,
    title: 'Card Payment Offer',
    description: '5% cashback on\nall card payments!',
    image: require('../../../assets/50.png'),
    buttonText: 'ACTIVATE'
  },
  {
    id: 6,
    title: 'Grocery Combo',
    description: 'Buy 2 get 1 free\non grocery essentials!',
    image: require('../../../assets/10.png'),
    buttonText: 'VIEW COMBO'
  }
];

export default function Offers() {
  const { bgColor, textColor } = useColor();

  const handleViewOffer = (offer) => {
    console.log(`Navigate to offer: ${offer.title}`);
    // Navigation logic - replace with your navigation
  };

  return (
    <View style={[styles.container, { backgroundColor: '#FFFFFF' }]}>
      <StatusBar backgroundColor={bgColor} barStyle="light-content" />
      
      {/* Header */}
      <View style={[styles.header, { backgroundColor: bgColor }]}>
        <Text style={styles.headerTitle}>Offers</Text>
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
                marginBottom: index === offersData.length - 1 ? responsiveSize(20) : responsiveSize(16),
              }
            ]}
          >
            <View style={styles.offerContent}>
              <Text style={[styles.offerHeader, { color: bgColor }]}>{offer.title}</Text>
              <Text style={[styles.offerSubTxt, { color: textColor + 'CC' }]}>
                {offer.description}
              </Text>
              <TouchableOpacity
                style={[styles.offerButton, { backgroundColor: bgColor }]}
                onPress={() => handleViewOffer(offer)}
                activeOpacity={0.8}
              >
                <Text style={[styles.offerBtnText, { color: textColor }]}>{offer.buttonText}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.offerImageWrap}>
              <Image
                source={offer.image}
                style={[
                  styles.offerImage,
                  { tintColor: bgColor } // Theme primary color tint for images
                ]}
                resizeMode="contain"
              />
            </View>
          </View>
        ))}

        {/* Extra padding for bottom tab */}
        <View style={{ height: responsiveSize(80) }} />
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
    paddingBottom: Platform.OS === 'ios' ? responsiveSize(100) : responsiveSize(90),
    paddingHorizontal: responsiveSize(15),
    paddingTop: responsiveSize(10),
  },

  /* HEADER */
  header: {
    height: Platform.OS === 'ios' ? responsiveSize(100) : responsiveSize(90),
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: responsiveSize(18),
    justifyContent: "space-between",
    paddingTop: Platform.OS === 'ios' ? responsiveSize(50) : responsiveSize(30),
    paddingBottom: responsiveSize(0),
  },
  headerTitle: { 
    color: "#fff", 
    fontSize: responsiveSize(20), 
    fontWeight: "700",
    textAlign: 'center',
    flex: 1,
  },

  /* OFFER CARD - EXACT from OfferCard with ColorSwitcher adaptation */
  offerCard: {
    borderRadius: scaleSize(responsiveSize(16)),
    flexDirection: 'row',
    alignItems: 'center',
    padding: scaleSize(responsiveSize(18)),
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
  offerContent: {
    flex: 1,
    marginRight: responsiveSize(12),
  },
  offerHeader: {
    fontWeight: '700',
    fontSize: fontScale(responsiveSize(20)),
    marginBottom: responsiveSize(6),
  },
  offerSubTxt: {
    fontSize: fontScale(responsiveSize(14)),
    marginBottom: responsiveSize(18),
    lineHeight: responsiveSize(22),
  },
  offerButton: {
    borderRadius: scaleSize(responsiveSize(10)),
    paddingVertical: isIOS ? responsiveSize(14) : responsiveSize(12),
    paddingHorizontal: responsiveSize(18),
    alignSelf: 'flex-start',
  },
  offerBtnText: {
    fontWeight: '700',
    fontSize: fontScale(responsiveSize(13)),
    letterSpacing: 0.3,
  },
  offerImageWrap: {
    width: responsiveSize(90),
    height: responsiveSize(90),
    justifyContent: 'center',
    alignItems: 'center',
  },
  offerImage: {
    width: '100%',
    height: '100%',
  },
});
