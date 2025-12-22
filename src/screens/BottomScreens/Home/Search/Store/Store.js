import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
  StatusBar,
  Animated,
  Dimensions,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useColor } from '../../../../../util/ColorSwitcher';
import { commonStyles, safeVibrate } from './styles';
import RestaurantBadge from './RestaurantBadge';
import OffersModal from './OffersModal';
import ReviewModal from './ReviewModal';
import ElectronicsSection from './ElectronicsSection';
import RecommendedSection from './RecommendedSection';
import BestInMobileSection from './BestInMobileSection';
import FiltersScreen from './FiltersScreen';

const { width } = Dimensions.get('window');

// Slightly reduced responsive sizing vs base
const responsiveSize = size => (width / 400) * size;

export default function Store({ navigation }) {
  const { bgColor, textColor } = useColor();
  const [isLiked, setIsLiked] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Mobile');
  const [showOffersModal, setShowOffersModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [addedItems, setAddedItems] = useState({});
  const heartScale = useRef(new Animated.Value(1)).current;
  const addButtonScales = useRef({});

  const toggleHeart = () => {
    safeVibrate(40);
    Animated.sequence([
      Animated.timing(heartScale, {
        toValue: 1.3,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.timing(heartScale, {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start();
    setIsLiked(prev => !prev);
  };

  const getAddButtonScale = itemId => {
    if (!addButtonScales.current[itemId]) {
      addButtonScales.current[itemId] = new Animated.Value(1);
    }
    return addButtonScales.current[itemId];
  };

  const handleAddToCart = itemId => {
    safeVibrate(30);

    const scaleAnim = getAddButtonScale(itemId);
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    setAddedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const handleCardPress = item => {
    navigation.navigate('Items', {
      item: {
        ...item,
        img:
          item.img ||
          item.image ||
          require('../../../../../assets/mobile2.png'),
      },
    });
  };

  const handleSearchPress = () => {
    navigation.navigate('Search');
  };

  const styles = getStyles(bgColor, textColor);

  return (
    <View style={commonStyles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={commonStyles.scrollContent}
      >
        {/* Banner with curved bottom */}
        <View style={styles.bannerContainer}>
          <View style={styles.bannerWrap}>
            <Image
              source={require('../../../../../assets/store.png')}
              style={styles.bannerImage}
            />

            {/* Header buttons on image */}
            <View style={styles.headerOverlay}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={[styles.iconBtn, { backgroundColor: '#FFFFFF' }]}
              >
                <Image
                  source={require('../../../../../assets/back.png')}
                  style={[styles.icon, { tintColor: bgColor }]}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={toggleHeart}
                style={[
                  styles.heartWrapper,
                  {
                    backgroundColor: isLiked
                      ? 'rgba(255, 255, 255, 0.9)'
                      : 'rgba(255, 255, 255, 0.3)',
                  },
                ]}
              >
                <Animated.Image
                  source={
                    isLiked
                      ? require('../../../../../assets/heartfill.png')
                      : require('../../../../../assets/heart.png')
                  }
                  style={[
                    styles.heartIcon,
                    { tintColor: isLiked ? bgColor : '#fff' },
                    { transform: [{ scale: heartScale }] },
                  ]}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Curved bottom overlay */}
          <View style={styles.curveOverlay} />
        </View>

        {/* Badge with logo in curve area */}
        <RestaurantBadge />

        {/* Features row */}
        <View style={styles.featuresRow}>
          <View style={styles.featureItem}>
            <View style={styles.line} />
            <Text style={styles.featureText}>Free Delivery above ₹250.00</Text>
            <View style={styles.line} />
          </View>

          <TouchableOpacity onPress={() => setShowOffersModal(true)}>
            <Text
              style={[styles.featureText, styles.offerText, { color: bgColor }]}
            >
              3 Offers
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setShowReviewModal(true)}>
            <Text
              style={[
                styles.featureText,
                styles.reviewText,
                { color: bgColor },
              ]}
            >
              Write Review
            </Text>
          </TouchableOpacity>
        </View>

        {/* Search */}
        <TouchableOpacity onPress={handleSearchPress}>
          <View style={styles.searchWrapper}>
            <View style={styles.searchBox}>
              <Image
                source={require('../../../../../assets/search.png')}
                style={[styles.searchIcon, { tintColor: bgColor }]}
              />
              <Text style={styles.searchPlaceholder}>search</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Available Electronics Items Section */}
        <ElectronicsSection
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          onFilterPress={() => setShowFilters(true)}
          bgColor={bgColor}
          textColor={textColor}
        />

        {/* Recommended Section */}
        <RecommendedSection
          addedItems={addedItems}
          handleAddToCart={handleAddToCart}
          handleCardPress={handleCardPress}
          getAddButtonScale={getAddButtonScale}
          navigation={navigation}
          bgColor={bgColor}
          textColor={textColor}
        />

        {/* Best in Mobile Section */}
        <BestInMobileSection
          addedItems={addedItems}
          handleAddToCart={handleAddToCart}
          handleCardPress={handleCardPress}
          getAddButtonScale={getAddButtonScale}
          navigation={navigation}
          bgColor={bgColor}
          textColor={textColor}
        />

        <View style={{ height: hp('5%') }} />
      </ScrollView>

      {/* Modals */}
      <OffersModal
        visible={showOffersModal}
        onClose={() => setShowOffersModal(false)}
        bgColor={bgColor}
        textColor={textColor}
      />

      <ReviewModal
        visible={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        bgColor={bgColor}
        textColor={textColor}
      />

      {/* Filters Modal */}
      <FiltersScreen
        visible={showFilters}
        onClose={() => setShowFilters(false)}
        navigation={navigation}
        bgColor={bgColor}
        textColor={textColor}
      />
    </View>
  );
}

const getStyles = (bgColor, textColor) =>
  StyleSheet.create({
    bannerContainer: {
      position: 'relative',
      marginTop: 0,
    },
    bannerWrap: {
      width: '100%',
      height: hp('26%'),
      overflow: 'hidden',
    },
    bannerImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    headerOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: hp('26%'),
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      paddingTop:
        Platform.OS === 'ios'
          ? hp('4.5%')
          : StatusBar.currentHeight + hp('0.8%'),
      paddingHorizontal: wp('4.5%'),
      zIndex: 9,
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
    heartWrapper: {
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      borderRadius: wp('4.5%'),
      padding: wp('1.6%'),
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
        },
        android: {
          elevation: 3,
        },
      }),
    },
    heartIcon: {
      width: wp('5%'),
      height: wp('5%'),
      resizeMode: 'contain',
    },
    curveOverlay: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: hp('3.2%'),
      backgroundColor: '#fff',
      borderTopLeftRadius: wp('7%'),
      borderTopRightRadius: wp('7%'),
    },
    featuresRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: hp('1.3%'),
      marginBottom: hp('0.4%'),
      paddingHorizontal: wp('5.5%'),
    },
    featureItem: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
    },
    line: {
      height: 1,
      flex: 1,
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
    featureText: {
      color: '#000',
      fontSize: hp('1.4%'),
      fontWeight: '600',
      marginHorizontal: wp('1.8%'),
      marginVertical: hp('0.4%'),
    },
    offerText: {
      fontWeight: '700',
      textDecorationLine: 'underline',
    },
    reviewText: {
      fontWeight: '700',
      textDecorationLine: 'underline',
    },
    searchWrapper: {
      flexDirection: 'row',
      marginTop: hp('0.9%'),
      marginBottom: hp('1.2%'),
      paddingHorizontal: wp('4.5%'),
      alignItems: 'center',
    },
    searchBox: {
      flex: 1,
      height: hp('5%'),
      borderRadius: wp('2.5%'),
      backgroundColor: '#f5f5f5',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: wp('3.5%'),
      borderWidth: 1,
      borderColor: '#eee',
    },
    searchIcon: {
      width: wp('4%'),
      height: wp('4%'),
      marginRight: wp('1.6%'),
      resizeMode: 'contain',
    },
    searchPlaceholder: {
      color: '#999',
      fontSize: hp('1.5%'),
      flex: 1,
      fontWeight: '400',
    },
  });
