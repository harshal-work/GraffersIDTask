// File: Items.js
import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Platform,
  StatusBar,
  Animated,
  Modal,
  TextInput,
} from 'react-native';
import { useColor } from '../../../../util/ColorSwitcher';

const { width, height } = Dimensions.get('window');

// Slightly reduced scaling to make everything smaller
const responsiveSize = size => (width / 400) * size;

// Platform detection
const isIOS = Platform.OS === 'ios';

// Responsive font scaling
const fontScale = size => (isIOS ? size * 0.95 : size);

// Sample products
const PRODUCTS = [
  {
    id: 'p1',
    title: 'I Phone 17 Plus',
    seller: 'Grocery Store',
    price: '₹ 450.50',
    time: '10-15 mins',
    rating: '4.4',
    img: require('../../../../assets/mobile2.png'),
  },
  {
    id: 'p2',
    title: 'I Phone 17 Plus',
    seller: 'Grocery Store',
    price: '₹ 450.50',
    time: '10-15 mins',
    rating: '4.5',
    img: require('../../../../assets/mobile3.png'),
  },
  {
    id: 'p3',
    title: 'I Phone 17 Plus',
    seller: 'Grocery Store',
    price: '₹ 450.50',
    time: '10-15 mins',
    rating: '4.6',
    img: require('../../../../assets/mobile4.png'),
  },
  {
    id: 'p4',
    title: 'I Phone 17 Plus',
    seller: 'Grocery Store',
    price: '₹ 450.50',
    time: '10-15 mins',
    rating: '4.3',
    img: require('../../../../assets/mobile2.png'),
  },
  {
    id: 'p5',
    title: 'I Phone 17 Plus',
    seller: 'Grocery Store',
    price: '₹ 450.50',
    time: '10-15 mins',
    rating: '4.4',
    img: require('../../../../assets/mobile3.png'),
  },
  {
    id: 'p6',
    title: 'I Phone 17 Plus',
    seller: 'Grocery Store',
    price: '₹ 450.50',
    time: '10-15 mins',
    rating: '4.2',
    img: require('../../../../assets/mobile4.png'),
  },
];

const CATEGORIES = [
  { name: 'All', icon: require('../../../../assets/mobile2.png') },
  { name: 'I - Phone', icon: require('../../../../assets/mobile3.png') },
  { name: 'Motorola', icon: require('../../../../assets/mobile4.png') },
  { name: 'Xiaomi', icon: require('../../../../assets/mobile2.png') },
  { name: 'POCO', icon: require('../../../../assets/mobile3.png') },
];

const safeVibrate = (duration = 30) => {
  try {
    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      const Vibration = require('react-native').Vibration;
      if (Vibration && typeof Vibration.vibrate === 'function')
        Vibration.vibrate(duration);
    }
  } catch (e) {
    // ignore vibration errors
  }
};

export default function Items({ navigation }) {
  const { bgColor, textColor } = useColor();

  // Maps for toggles & animations
  const likedMapRef = useRef({}).current;
  const addedMapRef = useRef({}).current;
  const heartScales = useRef({}).current;
  const plusScales = useRef({}).current;

  const [tick, setTick] = useState(0);
  const [activeCategory, setActiveCategory] = useState('All');
  const [showPopup, setShowPopup] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Animation values for popup
  const popupScale = useRef(new Animated.Value(0)).current;
  const popupOpacity = useRef(new Animated.Value(0)).current;
  const productImageScale = useRef(new Animated.Value(0.5)).current;

  const ensureAnimated = useCallback((map, id, initial = 1) => {
    if (!map[id]) map[id] = new Animated.Value(initial);
    return map[id];
  }, []);

  const showAddToCartPopup = useCallback(
    product => {
      setSelectedProduct(product);

      const newCartCount = cartCount + 1;
      setCartCount(newCartCount);
      setCartItems(prev => [
        ...prev,
        {
          id: product.id,
          title: product.title,
          seller: product.seller,
          price: product.price,
          img: product.img,
        },
      ]);

      popupScale.setValue(0);
      popupOpacity.setValue(0);
      productImageScale.setValue(0.5);

      setShowPopup(true);
      safeVibrate(50);

      Animated.parallel([
        Animated.spring(popupScale, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(popupOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(productImageScale, {
          toValue: 1,
          tension: 150,
          friction: 5,
          useNativeDriver: true,
        }),
      ]).start();
    },
    [cartCount, popupScale, popupOpacity, productImageScale],
  );

  const hidePopup = useCallback(() => {
    Animated.parallel([
      Animated.timing(popupScale, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(popupOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowPopup(false);
      setSelectedProduct(null);
    });
  }, [popupScale, popupOpacity]);

  const toggleLike = useCallback(
    id => {
      const anim = ensureAnimated(heartScales, id, 1);
      Animated.sequence([
        Animated.timing(anim, {
          toValue: 1.3,
          duration: 120,
          useNativeDriver: true,
        }),
        Animated.timing(anim, {
          toValue: 1,
          duration: 120,
          useNativeDriver: true,
        }),
      ]).start();
      safeVibrate(40);
      likedMapRef[id] = !likedMapRef[id];
      setTick(t => t + 1);
    },
    [ensureAnimated, heartScales],
  );

  const toggleAdd = useCallback(
    (id, product) => {
      const anim = ensureAnimated(plusScales, id, 1);
      Animated.sequence([
        Animated.timing(anim, {
          toValue: 1.15,
          duration: 110,
          useNativeDriver: true,
        }),
        Animated.timing(anim, {
          toValue: 1,
          duration: 110,
          useNativeDriver: true,
        }),
      ]).start();

      const wasAddedBefore = !!addedMapRef[id];

      if (!wasAddedBefore) {
        showAddToCartPopup(product);
      }

      addedMapRef[id] = !addedMapRef[id];
      setTick(t => t + 1);
    },
    [ensureAnimated, plusScales, showAddToCartPopup],
  );

  const navigateToCart = useCallback(() => {
    hidePopup();
    navigation.navigate('MyCartClone', {
      cartItems,
      cartCount,
    });
  }, [hidePopup, cartItems, cartCount, navigation]);

  const renderFiltersModal = () => (
    <Modal
      visible={filtersVisible}
      transparent
      animationType="slide"
      onRequestClose={() => setFiltersVisible(false)}
    >
      <View style={styles.filtersModalContainer}>
        <View style={[styles.filtersContent, { backgroundColor: textColor }]}>
          <View style={styles.filtersHeader}>
            <Text style={[styles.filtersTitle, { color: bgColor }]}>
              Filters
            </Text>
            <TouchableOpacity onPress={() => setFiltersVisible(false)}>
              <Text style={[styles.closeFilters, { color: bgColor }]}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.filtersList}>
            {[
              'Price: Low to High',
              'Price: High to Low',
              'Rating',
              'Newest',
              'Popular',
            ].map(filter => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterOption,
                  selectedFilters.includes(filter) && {
                    backgroundColor: bgColor + '15',
                  },
                ]}
                onPress={() => {
                  if (selectedFilters.includes(filter)) {
                    setSelectedFilters(prev => prev.filter(f => f !== filter));
                  } else {
                    setSelectedFilters(prev => [...prev, filter]);
                  }
                }}
              >
                <Text
                  style={[
                    styles.filterOptionText,
                    { color: bgColor },
                    selectedFilters.includes(filter) && { fontWeight: '700' },
                  ]}
                >
                  {filter}
                </Text>
                {selectedFilters.includes(filter) && (
                  <View
                    style={[styles.selectedDot, { backgroundColor: bgColor }]}
                  />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.filterButtons}>
            <TouchableOpacity
              style={[styles.clearFiltersBtn, { borderColor: bgColor }]}
              onPress={() => setSelectedFilters([])}
            >
              <Text style={[styles.clearFiltersText, { color: bgColor }]}>
                Clear All
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.applyFiltersBtn, { backgroundColor: bgColor }]}
              onPress={() => setFiltersVisible(false)}
            >
              <Text style={[styles.applyFiltersText, { color: textColor }]}>
                Apply Filters
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={bgColor} barStyle="light-content" />

      <View style={[styles.topBlue, { backgroundColor: bgColor }]}>
        {isIOS && <View style={styles.statusBarSpacer} />}

        <View style={styles.topHeader}>
          <TouchableOpacity
            style={[styles.iconBtn, { backgroundColor: textColor }]}
            onPress={() => navigation.goBack?.()}
          >
            <Image
              source={require('../../../../assets/back.png')}
              style={[styles.icon, { tintColor: bgColor }]}
            />
          </TouchableOpacity>

          <View
            style={[styles.searchContainer, { backgroundColor: textColor }]}
          >
            <Image
              source={require('../../../../assets/search.png')}
              style={[styles.searchIcon, { tintColor: bgColor + '80' }]}
            />
            <TextInput
              style={[styles.searchText, { color: bgColor + '80' }]}
              placeholder="Find for Grocery Item's.."
              placeholderTextColor={bgColor + '80'}
            />
          </View>

          <TouchableOpacity
            style={[styles.filterBtn, { backgroundColor: textColor }]}
            onPress={() => setFiltersVisible(true)}
          >
            <Image
              source={require('../../../../assets/filter.png')}
              style={[styles.filterIcon, { tintColor: bgColor }]}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.deliverRow}>
          <View style={[styles.locIconWrap, { backgroundColor: textColor }]}>
            <Image
              source={require('../../../../assets/location3.png')}
              style={[styles.locIcon, { tintColor: bgColor }]}
            />
          </View>

          <View style={styles.deliverTextWrap}>
            <Text style={[styles.deliverText, { color: textColor }]}>
              Deliver to:{' '}
              <Text
                style={[
                  styles.deliverAddr,
                  { color: textColor, fontWeight: '700' },
                ]}
              >
                4102 Pretty View Lane
              </Text>
            </Text>
          </View>

          <TouchableOpacity style={styles.dropdownBtn}>
            <Image
              source={require('../../../../assets/dropdown.png')}
              style={[styles.dropdownIcon, { tintColor: textColor }]}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={[styles.content, { backgroundColor: textColor }]}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: responsiveSize(110) }}
      >
        <View style={styles.sectionTitleContainer}>
          <Text style={[styles.sectionTitleText, { color: bgColor }]}>
            Mobile & Phone's (All)
          </Text>
          <View
            style={[styles.titleLine, { backgroundColor: bgColor + '30' }]}
          />
        </View>

        <View style={styles.categoriesWrapper}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScroll}
          >
            {CATEGORIES.map(cat => {
              const active = cat.name === activeCategory;
              return (
                <TouchableOpacity
                  key={cat.name}
                  onPress={() => setActiveCategory(cat.name)}
                  style={[
                    styles.categoryItem,
                    active && {
                      borderBottomWidth: responsiveSize(2),
                      borderBottomColor: bgColor,
                      paddingBottom: responsiveSize(5),
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.categoryIconWrap,
                      {
                        backgroundColor: active ? bgColor + '15' : textColor,
                        borderColor: active ? bgColor + '30' : '#f0f0f0',
                        borderWidth: 1,
                      },
                    ]}
                  >
                    <Image source={cat.icon} style={styles.categoryIconFull} />
                  </View>
                  <Text
                    style={[
                      styles.categoryLabel,
                      { color: active ? bgColor : '#666' },
                      active && styles.categoryLabelActive,
                    ]}
                    numberOfLines={1}
                  >
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
        <View style={[styles.titleLine, { backgroundColor: bgColor + '30' }]} />

        <View style={[styles.popularSection, { backgroundColor: textColor }]}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: bgColor }]}>
              Popular mobiles
            </Text>
            <TouchableOpacity>
              <Text style={[styles.viewAllText, { color: bgColor }]}>
                View All
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.gridWrapper}>
            {PRODUCTS.map((p, idx) => {
              const cardKey = p.id;
              const liked = !!likedMapRef[cardKey];
              const added = !!addedMapRef[cardKey];

              const heartAnim = ensureAnimated(heartScales, cardKey, 1);
              const plusAnim = ensureAnimated(plusScales, cardKey, 1);

              return (
                <View
                  key={cardKey}
                  style={[
                    styles.card,
                    idx % 2 === 0 ? styles.cardLeft : styles.cardRight,
                  ]}
                >
                  <View
                    style={[
                      styles.cardImageWrap,
                      { backgroundColor: bgColor + '08' },
                    ]}
                  >
                    <Image source={p.img} style={styles.cardImageCover} />

                    <View style={styles.ratingBadgeBottom}>
                      <Image
                        source={require('../../../../assets/star.png')}
                        style={[styles.starIconSmall, { tintColor: bgColor }]}
                      />
                      <Text
                        style={[styles.ratingTextBadge, { color: bgColor }]}
                      >
                        {p.rating}
                      </Text>
                    </View>

                    <TouchableOpacity
                      style={[
                        styles.heartBtn,
                        {
                          backgroundColor: liked
                            ? 'rgba(255, 255, 255, 0.95)'
                            : 'rgba(255, 255, 255, 0.9)',
                          shadowColor: liked ? bgColor : '#000',
                        },
                      ]}
                      onPress={() => toggleLike(cardKey)}
                      activeOpacity={0.85}
                    >
                      <Animated.Image
                        source={
                          liked
                            ? require('../../../../assets/heartfill.png')
                            : require('../../../../assets/heart.png')
                        }
                        style={[
                          styles.heartIcon,
                          { tintColor: liked ? bgColor : '#999' },
                          { transform: [{ scale: heartAnim }] },
                        ]}
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.cardBody}>
                    <Text
                      style={[styles.cardTitle, { color: bgColor }]}
                      numberOfLines={1}
                    >
                      {p.title}
                    </Text>
                    <Text
                      style={[styles.cardSeller, { color: bgColor + '80' }]}
                      numberOfLines={1}
                    >
                      Sold By : {p.seller}
                    </Text>

                    <View style={styles.priceRow}>
                      <Text style={[styles.priceText, { color: bgColor }]}>
                        {p.price}
                      </Text>
                    </View>

                    <View style={styles.timeRow}>
                      <Image
                        source={require('../../../../assets/clock.png')}
                        style={[styles.clockIcon, { tintColor: bgColor }]}
                      />
                      <Text
                        style={[styles.timeText, { color: bgColor + '80' }]}
                      >
                        {p.time}
                      </Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    style={[
                      styles.plusBtn,
                      {
                        backgroundColor: bgColor,
                        borderColor: bgColor,
                        shadowColor: bgColor,
                      },
                    ]}
                    onPress={() => toggleAdd(cardKey, p)}
                    activeOpacity={0.85}
                  >
                    <Animated.Image
                      source={require('../../../../assets/plus.png')}
                      style={[
                        styles.plusIcon,
                        { tintColor: textColor },
                        { transform: [{ scale: plusAnim }] },
                      ]}
                    />
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* Add to Cart Popup */}
      {showPopup && selectedProduct && (
        <View style={styles.popupOverlay}>
          <Animated.View
            style={[
              styles.popupContainer,
              {
                backgroundColor: textColor,
                transform: [{ scale: popupScale }],
                opacity: popupOpacity,
              },
            ]}
          >
            <View
              style={[
                styles.popupImageContainer,
                { backgroundColor: bgColor + '08' },
              ]}
            >
              <Animated.Image
                source={selectedProduct.img}
                style={[
                  styles.popupImage,
                  { transform: [{ scale: productImageScale }] },
                ]}
                resizeMode="contain"
              />
            </View>

            <Text style={[styles.popupProductTitle, { color: bgColor }]}>
              {selectedProduct.title}
            </Text>
            <Text style={[styles.popupSeller, { color: bgColor + '80' }]}>
              Sold By: {selectedProduct.seller}
            </Text>

            <View style={styles.popupSpacer} />

            <Text style={[styles.popupSuccessText, { color: bgColor }]}>
              {selectedProduct.title} added to cart successfully.
            </Text>

            <View style={styles.popupSpacerSmall} />

            <Text style={[styles.popupCartCount, { color: bgColor + '80' }]}>
              {cartItems.length > 1
                ? `${cartItems.length} Products are in cart`
                : '1 Product is in cart'}
            </Text>

            <View style={styles.popupButtons}>
              <TouchableOpacity
                style={[styles.viewCartButton, { backgroundColor: bgColor }]}
                onPress={navigateToCart}
              >
                <Text style={[styles.viewCartText, { color: textColor }]}>
                  View Cart
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.laterButton, { borderColor: bgColor }]}
                onPress={hidePopup}
              >
                <Text style={[styles.laterText, { color: bgColor }]}>
                  Later
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      )}

      {/* Filters Modal */}
      {renderFiltersModal()}
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  statusBarSpacer: {
    height: Platform.OS === 'ios' ? responsiveSize(36) : 0,
  },

  topBlue: {
    width: '100%',
    paddingBottom: responsiveSize(10),
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
  },

  topHeader: {
    height: responsiveSize(60),
    paddingHorizontal: responsiveSize(14),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Platform.OS === 'ios' ? responsiveSize(8) : 0,
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
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
      },
      android: { elevation: 3 },
    }),
  },

  icon: {
    width: responsiveSize(16),
    height: responsiveSize(16),
    resizeMode: 'contain',
  },

  searchContainer: {
    flex: 1,
    marginHorizontal: responsiveSize(10),
    height: responsiveSize(36),
    borderRadius: responsiveSize(9),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveSize(10),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
      },
      android: { elevation: 2 },
    }),
  },

  searchIcon: {
    width: responsiveSize(14),
    height: responsiveSize(14),
    resizeMode: 'contain',
  },

  searchText: {
    marginLeft: responsiveSize(8),
    fontSize: fontScale(responsiveSize(11)),
    fontWeight: '500',
    flex: 1,
  },

  filterBtn: {
    width: responsiveSize(34),
    height: responsiveSize(34),
    borderRadius: responsiveSize(10),
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
      },
      android: { elevation: 2 },
    }),
  },

  filterIcon: {
    width: responsiveSize(16),
    height: responsiveSize(16),
    resizeMode: 'contain',
  },

  deliverRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsiveSize(12),
    paddingHorizontal: responsiveSize(14),
    height: responsiveSize(38),
  },

  locIconWrap: {
    width: responsiveSize(36),
    height: responsiveSize(36),
    borderRadius: responsiveSize(10),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: responsiveSize(8),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
      },
      android: { elevation: 2 },
    }),
  },

  locIcon: {
    width: responsiveSize(16),
    height: responsiveSize(16),
    resizeMode: 'contain',
  },

  deliverTextWrap: {
    flex: 1,
    justifyContent: 'center',
  },

  deliverText: {
    fontSize: fontScale(responsiveSize(12)),
    fontWeight: '500',
    lineHeight: responsiveSize(18),
  },

  deliverAddr: {
    fontSize: fontScale(responsiveSize(12)),
  },

  dropdownBtn: {
    padding: responsiveSize(6),
    marginLeft: responsiveSize(4),
  },

  dropdownIcon: {
    width: responsiveSize(10),
    height: responsiveSize(10),
    resizeMode: 'contain',
  },

  content: { flex: 1 },

  sectionTitleContainer: {
    paddingHorizontal: responsiveSize(14),
    paddingTop: responsiveSize(18),
    paddingBottom: responsiveSize(8),
  },

  sectionTitleText: {
    fontSize: fontScale(responsiveSize(16)),
    fontWeight: '700',
    marginBottom: responsiveSize(6),
  },

  titleLine: {
    height: 1,
    width: '100%',
  },

  categoriesWrapper: {
    marginTop: responsiveSize(6),
    paddingLeft: responsiveSize(14),
    paddingRight: responsiveSize(6),
    paddingBottom: responsiveSize(14),
  },

  categoriesScroll: {
    alignItems: 'center',
    paddingRight: responsiveSize(6),
  },

  categoryItem: {
    width: responsiveSize(64),
    alignItems: 'center',
    marginRight: responsiveSize(10),
    paddingVertical: responsiveSize(5),
  },

  categoryIconWrap: {
    width: responsiveSize(50),
    height: responsiveSize(50),
    borderRadius: responsiveSize(25),
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 1 },
      },
      android: { elevation: 1 },
    }),
  },

  categoryIconFull: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: responsiveSize(25),
  },

  categoryLabel: {
    marginTop: responsiveSize(4),
    fontSize: fontScale(responsiveSize(11)),
    textAlign: 'center',
    fontWeight: '500',
    width: '100%',
  },

  categoryLabelActive: {
    fontWeight: '700',
  },

  popularSection: {
    backgroundColor: '#fff',
    paddingTop: responsiveSize(4),
  },

  sectionHeader: {
    paddingHorizontal: responsiveSize(14),
    paddingTop: responsiveSize(8),
    paddingBottom: responsiveSize(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  sectionTitle: {
    fontSize: fontScale(responsiveSize(16)),
    fontWeight: '700',
    letterSpacing: 0.3,
  },

  viewAllText: {
    fontSize: fontScale(responsiveSize(12)),
    fontWeight: '600',
  },

  gridWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveSize(14),
  },

  card: {
    width: (width - responsiveSize(44)) / 2,
    backgroundColor: '#fff',
    borderRadius: responsiveSize(10),
    marginBottom: responsiveSize(14),
    paddingBottom: responsiveSize(12),
    borderWidth: 1,
    borderColor: '#f0f0f0',
    overflow: 'hidden',
    position: 'relative',
  },

  cardLeft: {
    marginRight: responsiveSize(6),
  },

  cardRight: {
    marginLeft: responsiveSize(6),
  },

  cardImageWrap: {
    width: '100%',
    height: responsiveSize(120),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    borderTopLeftRadius: responsiveSize(10),
    borderTopRightRadius: responsiveSize(10),
  },

  cardImageCover: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  popupImageContainer: {
    width: '100%',
    height: responsiveSize(180),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: responsiveSize(12),
    marginBottom: responsiveSize(18),
    paddingHorizontal: responsiveSize(18),
    overflow: 'hidden',
  },

  popupImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },

  ratingBadgeBottom: {
    position: 'absolute',
    left: responsiveSize(6),
    bottom: responsiveSize(6),
    paddingHorizontal: responsiveSize(6),
    paddingVertical: responsiveSize(3),
    borderRadius: responsiveSize(7),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.92)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
      },
      android: { elevation: 2 },
    }),
  },

  starIconSmall: {
    width: responsiveSize(10),
    height: responsiveSize(10),
    marginRight: responsiveSize(4),
    resizeMode: 'contain',
  },

  ratingTextBadge: {
    fontSize: fontScale(responsiveSize(10)),
    fontWeight: '700',
  },

  heartBtn: {
    position: 'absolute',
    right: responsiveSize(6),
    top: responsiveSize(6),
    width: responsiveSize(28),
    height: responsiveSize(28),
    borderRadius: responsiveSize(14),
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },

  heartIcon: {
    width: responsiveSize(16),
    height: responsiveSize(16),
    resizeMode: 'contain',
  },

  cardBody: {
    paddingHorizontal: responsiveSize(8),
    paddingTop: responsiveSize(6),
    paddingBottom: responsiveSize(6),
  },

  cardTitle: {
    fontSize: fontScale(responsiveSize(12)),
    fontWeight: '700',
    marginBottom: responsiveSize(3),
    lineHeight: responsiveSize(16),
  },

  cardSeller: {
    fontSize: fontScale(responsiveSize(10)),
    marginBottom: responsiveSize(6),
    lineHeight: responsiveSize(14),
  },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: responsiveSize(2),
  },

  priceText: {
    fontSize: fontScale(responsiveSize(13)),
    fontWeight: '700',
    flex: 1,
  },

  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsiveSize(6),
  },

  clockIcon: {
    width: responsiveSize(12),
    height: responsiveSize(12),
    marginRight: responsiveSize(4),
    resizeMode: 'contain',
  },

  timeText: {
    fontSize: fontScale(responsiveSize(10)),
    fontWeight: '500',
  },

  plusBtn: {
    position: 'absolute',
    right: responsiveSize(8),
    bottom: responsiveSize(8),
    width: responsiveSize(26),
    height: responsiveSize(26),
    borderRadius: responsiveSize(16),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2.5,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 6,
      },
      android: {
        elevation: 6,
      },
    }),
  },

  plusIcon: {
    width: responsiveSize(13),
    height: responsiveSize(13),
    resizeMode: 'contain',
  },

  // Popup Styles
  popupOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },

  popupContainer: {
    width: width * 0.85,
    borderRadius: responsiveSize(18),
    padding: responsiveSize(22),
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 20,
      },
      android: {
        elevation: 15,
      },
    }),
  },

  popupProductTitle: {
    fontSize: fontScale(responsiveSize(16)),
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: responsiveSize(4),
  },

  popupSeller: {
    fontSize: fontScale(responsiveSize(12)),
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: responsiveSize(12),
  },

  popupSpacer: {
    height: responsiveSize(8),
  },

  popupSpacerSmall: {
    height: responsiveSize(4),
  },

  popupSuccessText: {
    fontSize: fontScale(responsiveSize(14)),
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: responsiveSize(20),
  },

  popupCartCount: {
    fontSize: fontScale(responsiveSize(12)),
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: responsiveSize(20),
  },

  popupButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },

  viewCartButton: {
    flex: 1,
    marginRight: responsiveSize(8),
    paddingVertical: responsiveSize(12),
    borderRadius: responsiveSize(10),
    alignItems: 'center',
    justifyContent: 'center',
  },

  viewCartText: {
    fontSize: fontScale(responsiveSize(14)),
    fontWeight: '700',
  },

  laterButton: {
    flex: 1,
    paddingVertical: responsiveSize(12),
    borderRadius: responsiveSize(10),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },

  laterText: {
    fontSize: fontScale(responsiveSize(14)),
    fontWeight: '700',
  },

  // Filters Modal Styles
  filtersModalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },

  filtersContent: {
    borderTopLeftRadius: responsiveSize(18),
    borderTopRightRadius: responsiveSize(18),
    padding: responsiveSize(18),
    maxHeight: height * 0.7,
  },

  filtersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsiveSize(16),
  },

  filtersTitle: {
    fontSize: fontScale(responsiveSize(18)),
    fontWeight: '700',
  },

  closeFilters: {
    fontSize: fontScale(responsiveSize(20)),
    fontWeight: '300',
  },

  filtersList: {
    marginBottom: responsiveSize(16),
  },

  filterOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: responsiveSize(12),
    paddingHorizontal: responsiveSize(8),
    borderRadius: responsiveSize(8),
    marginBottom: responsiveSize(6),
  },

  filterOptionText: {
    fontSize: fontScale(responsiveSize(14)),
    fontWeight: '500',
  },

  selectedDot: {
    width: responsiveSize(10),
    height: responsiveSize(10),
    borderRadius: responsiveSize(5),
  },

  filterButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: responsiveSize(8),
  },

  clearFiltersBtn: {
    flex: 1,
    marginRight: responsiveSize(8),
    paddingVertical: responsiveSize(12),
    borderRadius: responsiveSize(10),
    alignItems: 'center',
    borderWidth: 2,
  },

  clearFiltersText: {
    fontSize: fontScale(responsiveSize(14)),
    fontWeight: '600',
  },

  applyFiltersBtn: {
    flex: 1,
    paddingVertical: responsiveSize(12),
    borderRadius: responsiveSize(10),
    alignItems: 'center',
  },

  applyFiltersText: {
    fontSize: fontScale(responsiveSize(14)),
    fontWeight: '600',
  },
});
