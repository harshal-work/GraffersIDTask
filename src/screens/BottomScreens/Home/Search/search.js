import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Platform,
  StatusBar,
  Animated,
  Vibration,
} from 'react-native';
import { useColor } from '../../../../util/ColorSwitcher';

const { width, height } = Dimensions.get('window');

// Responsive sizing
const responsiveSize = (size) => (width / 375) * size;

// Safe vibration function with permission check
const safeVibrate = (duration = 40) => {
  try {
    // Check if Vibration is available and we're on a supported platform
    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      if (Vibration && typeof Vibration.vibrate === 'function') {
        Vibration.vibrate(duration);
      }
    }
  } catch (error) {
    console.log('Vibration error:', error);
    // Silently fail - don't crash the app if vibration fails
  }
};

const PRODUCTS = [
  {
    id: 'p1',
    title: 'Iphone 17 plus',
    price: '₹100000.00',
    desc: 'Have a 6.6-inch OLED screen, making it large but lightweight.',
    img: require('../../../../assets/mobile2.png'),
    rating: '4.5',
  },
  {
    id: 'p2',
    title: 'Iphone 17 plus',
    price: '₹100000.00',
    desc: 'Have a 6.6-inch OLED screen, making it large but lightweight.',
    img: require('../../../../assets/mobile4.png'),
    rating: '4.5',
  },
  {
    id: 'p3',
    title: 'Iphone 17 plus',
    price: '₹100000.00',
    desc: 'Have a 6.6-inch OLED screen, making it large but lightweight.',
    img: require('../../../../assets/mobile5.png'),
    rating: '4.5',
  },
];

const STORES = [
  {
    id: 's1',
    name: 'Grocery Store\'s',
    img: require('../../../../assets/st1.png'),
    rating: '4.4',
    locationText: 'Near MC College, Barpeta Town',
    distance: '590.0 m',
    time: '25 min',
    orders: '5000+ Order',
  },
  {
    id: 's2',
    name: 'Grocery Store\'s',
    img: require('../../../../assets/st2.png'),
    rating: '4.4',
    locationText: 'Near MC College, Barpeta Town',
    distance: '590.0 m',
    time: '25 min',
    orders: '5000+ Order',
  },
];

export default function Search({ navigation }) {
  const { bgColor, textColor } = useColor();
  const [tab, setTab] = useState('grocery');
  const [query, setQuery] = useState('');
  const [addedToCart, setAddedToCart] = useState({});
  const [likedItems, setLikedItems] = useState({});
  const [likedStores, setLikedStores] = useState({});
  const [quantities, setQuantities] = useState({});
  
  // Animation refs
  const addButtonScales = useRef({});
  const heartButtonScales = useRef({});
  const storeHeartButtonScales = useRef({});
  const minusButtonScales = useRef({});
  const plusButtonScales = useRef({});

  // Get or create scale animation for a specific item
  const getAddButtonScale = (itemId) => {
    if (!addButtonScales.current[itemId]) {
      addButtonScales.current[itemId] = new Animated.Value(1);
    }
    return addButtonScales.current[itemId];
  };

  // Get or create scale animation for heart (product)
  const getHeartButtonScale = (itemId) => {
    if (!heartButtonScales.current[itemId]) {
      heartButtonScales.current[itemId] = new Animated.Value(1);
    }
    return heartButtonScales.current[itemId];
  };

  // Get or create scale animation for heart (store)
  const getStoreHeartButtonScale = (storeId) => {
    if (!storeHeartButtonScales.current[storeId]) {
      storeHeartButtonScales.current[storeId] = new Animated.Value(1);
    }
    return storeHeartButtonScales.current[storeId];
  };

  // Get or create scale animation for minus button
  const getMinusButtonScale = (itemId) => {
    if (!minusButtonScales.current[itemId]) {
      minusButtonScales.current[itemId] = new Animated.Value(1);
    }
    return minusButtonScales.current[itemId];
  };

  // Get or create scale animation for plus button
  const getPlusButtonScale = (itemId) => {
    if (!plusButtonScales.current[itemId]) {
      plusButtonScales.current[itemId] = new Animated.Value(1);
    }
    return plusButtonScales.current[itemId];
  };

  const getQuantity = (itemId) => {
    return quantities[itemId] || 1;
  };

  const handleIncreaseQuantity = (itemId) => {
    safeVibrate(20); // Short vibration for quantity change
    const scaleAnim = getPlusButtonScale(itemId);
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 80,
        useNativeDriver: true,
      }),
    ]).start();

    setQuantities(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 1) + 1
    }));
  };

  const handleDecreaseQuantity = (itemId) => {
    const currentQty = getQuantity(itemId);
    if (currentQty > 1) {
      safeVibrate(20); // Short vibration for quantity change
      const scaleAnim = getMinusButtonScale(itemId);
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 80,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 80,
          useNativeDriver: true,
        }),
      ]).start();

      setQuantities(prev => ({
        ...prev,
        [itemId]: prev[itemId] - 1
      }));
    }
  };

  const handleAddToCart = (itemId) => {
    safeVibrate(30); // Vibration effect
    
    // Scale animation
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

    setAddedToCart(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const handleHeartPress = (itemId) => {
    safeVibrate(40); // Vibration effect
    
    // Scale animation
    const scaleAnim = getHeartButtonScale(itemId);
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.3,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    setLikedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const handleStoreHeartPress = (storeId) => {
    safeVibrate(40); // Vibration effect
    
    // Scale animation
    const scaleAnim = getStoreHeartButtonScale(storeId);
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.3,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    setLikedStores(prev => ({
      ...prev,
      [storeId]: !prev[storeId]
    }));
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={bgColor} barStyle="light-content" />
      
      {/* HEADER */}
      <View style={[styles.header, { backgroundColor: bgColor }]}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={[styles.iconBtn, { backgroundColor: '#FFFFFF' }]}
        >
          <Image 
            source={require('../../../../assets/back.png')} 
            style={[styles.icon, { tintColor: bgColor }]} 
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Search Result</Text>

        <View style={{ width: responsiveSize(40) }} />
      </View>

      <ScrollView 
        contentContainerStyle={styles.content} 
        showsVerticalScrollIndicator={false}
      >
        {/* Search Row */}
        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <Image 
              source={require('../../../../assets/search.png')} 
              style={[styles.searchIcon, { tintColor: '#666' }]} 
            />
            <TextInput
              placeholder="Search result for mobile.."
              placeholderTextColor="#99a0a8"
              value={query}
              onChangeText={setQuery}
              style={styles.searchInput}
            />
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('Filter')}
            style={[styles.filterBtn, { backgroundColor: bgColor }]}
          >
            <Image 
              source={require('../../../../assets/filter.png')} 
              style={[styles.filterIcon, { tintColor: '#FFFFFF' }]} 
            />
          </TouchableOpacity>
        </View>

        {/* Toggle Buttons */}
        <View style={styles.toggleRow}>
          <TouchableOpacity
            style={[styles.toggleBtn, tab === 'grocery' && [styles.toggleActive, { backgroundColor: bgColor }]]}
            onPress={() => setTab('grocery')}
          >
            <Text style={[styles.toggleTxt, tab === 'grocery' && styles.toggleTxtActive]}>
              Item's
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.toggleBtn, tab === 'stores' && [styles.toggleActive, { backgroundColor: bgColor }]]}
            onPress={() => setTab('stores')}
          >
            <Text style={[styles.toggleTxt, tab === 'stores' && styles.toggleTxtActive]}>
              Store's
            </Text>
          </TouchableOpacity>
        </View>

        {/* Grocery / Stores */}
        {tab === 'grocery' ? (
          PRODUCTS.map(item => {
            const isAdded = addedToCart[item.id];
            const isLiked = likedItems[item.id];
            const quantity = getQuantity(item.id);
            const addScale = getAddButtonScale(item.id);
            const heartScale = getHeartButtonScale(item.id);
            const minusScale = getMinusButtonScale(item.id);
            const plusScale = getPlusButtonScale(item.id);

            return (
              <View key={item.id} style={styles.card}>
                {/* Heart Button */}
                <TouchableOpacity
                  style={[
                    styles.heartWrapper,
                    { 
                      backgroundColor: isLiked ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.3)',
                    }
                  ]}
                  onPress={() => handleHeartPress(item.id)}
                  activeOpacity={0.7}
                >
                  <Animated.Image
                    source={
                      isLiked
                        ? require('../../../../assets/heartfill.png')
                        : require('../../../../assets/heart.png')
                    }
                    style={[
                      styles.heartIcon,
                      { tintColor: isLiked ? bgColor : '#fff' },
                      { transform: [{ scale: heartScale }] },
                    ]}
                    resizeMode="contain"
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => navigation.navigate('Items', { item })}
                  style={styles.cardTouchable}
                >
                  <View style={styles.cardContent}>
                    <View style={styles.cardLeft}>
                      <Text style={styles.cardTitle}>{item.title}</Text>
                      <Text style={[styles.cardPrice, { color: bgColor }]}>{item.price}</Text>

                      <Text numberOfLines={3} style={styles.cardDesc}>
                        {item.desc}
                      </Text>

                      {/* Rating */}
                      <View style={[styles.ratingBadge, { backgroundColor: bgColor }]}>
                        <Image 
                          source={require('../../../../assets/star.png')} 
                          style={[styles.starIcon, { tintColor: '#fff' }]} 
                          resizeMode="contain"
                        />
                        <Text style={styles.ratingTxt}> {item.rating}</Text>
                      </View>

                      {/* Quantity Selector */}
                      <View style={styles.quantityContainer}>
                        <Animated.View style={{ transform: [{ scale: minusScale }] }}>
                          <TouchableOpacity 
                            style={[styles.qtyButton, { backgroundColor: bgColor }]}
                            onPress={() => handleDecreaseQuantity(item.id)}
                            disabled={quantity <= 1}
                          >
                            <Text style={styles.qtyButtonText}>−</Text>
                          </TouchableOpacity>
                        </Animated.View>
                        
                        <Text style={styles.qtyText}>{quantity < 10 ? `0${quantity}` : quantity}</Text>
                        
                        <Animated.View style={{ transform: [{ scale: plusScale }] }}>
                          <TouchableOpacity 
                            style={[styles.qtyButton, { backgroundColor: bgColor }]}
                            onPress={() => handleIncreaseQuantity(item.id)}
                          >
                            <Text style={styles.qtyButtonText}>+</Text>
                          </TouchableOpacity>
                        </Animated.View>
                      </View>
                    </View>

                    <View style={styles.cardRight}>
                      <Image source={item.img} style={styles.cardImage} resizeMode="contain" />
                      
                      {/* Add to Cart Button - Moved to right side */}
                      <View style={styles.addBtnContainerRight}>
                        <Animated.View style={{ transform: [{ scale: addScale }] }}>
                          <TouchableOpacity 
                            style={[
                              styles.addBtn, 
                              { 
                                borderColor: bgColor,
                                backgroundColor: isAdded ? bgColor : 'transparent'
                              }
                            ]}
                            onPress={() => handleAddToCart(item.id)}
                          >
                            <Text style={[
                              styles.addTxt, 
                              { color: isAdded ? '#fff' : bgColor }
                            ]}>
                              {isAdded ? 'ADDED' : '+ ADD'}
                            </Text>
                          </TouchableOpacity>
                        </Animated.View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })
        ) : (
          STORES.map(store => {
            const isLiked = likedStores[store.id];
            const heartScale = getStoreHeartButtonScale(store.id);

            return (
              <View key={store.id} style={styles.storeCard}>
                {/* Heart Button for Store */}
                <TouchableOpacity
                  style={[
                    styles.storeHeartWrapper,
                    { 
                      backgroundColor: isLiked ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.3)',
                    }
                  ]}
                  onPress={() => handleStoreHeartPress(store.id)}
                  activeOpacity={0.7}
                >
                  <Animated.Image
                    source={
                      isLiked
                        ? require('../../../../assets/heartfill.png')
                        : require('../../../../assets/heart.png')
                    }
                    style={[
                      styles.storeHeartIcon,
                      { tintColor: isLiked ? bgColor : '#fff' },
                      { transform: [{ scale: heartScale }] },
                    ]}
                    resizeMode="contain"
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.storeTouchable}
                  activeOpacity={0.9}
                  onPress={() => navigation.navigate('Store', { store })}
                >
                  <Image source={store.img} style={styles.storeImage} resizeMode="cover" />

                  {/* Store Rating Badge on Image */}
                  <View style={[styles.storeRatingBadge, { backgroundColor: bgColor }]}>
                    <Image 
                      source={require('../../../../assets/star.png')} 
                      style={[styles.storeStarIcon, { tintColor: '#fff' }]} 
                      resizeMode="contain"
                    />
                    <Text style={styles.storeRatingTxt}>{store.rating}</Text>
                  </View>

                  <View style={styles.storeBody}>
                    <Text style={styles.storeName}>{store.name}</Text>

                    <View style={styles.metaRow}>
                      <Image 
                        source={require('../../../../assets/location.png')} 
                        style={[styles.metaIcon, { tintColor: bgColor }]} 
                        resizeMode="contain"
                      />
                      <Text style={styles.metaText}>{store.locationText}</Text>
                    </View>

                    <View style={[styles.metaRow, { marginTop: responsiveSize(8) }]}>
                      <View style={styles.metaInline}>
                        <Image 
                          source={require('../../../../assets/location2.png')} 
                          style={[styles.smallIcon, {  tintColor: bgColor }]} 
                          resizeMode="contain"
                        />
                        <Text style={styles.metaText}>{store.distance}</Text>
                      </View>

                      <View style={styles.metaInline}>
                        <Image 
                          source={require('../../../../assets/clock.png')} 
                          style={[styles.smallIcon, {  tintColor: bgColor}]} 
                          resizeMode="contain"
                        />
                        <Text style={styles.metaText}>{store.time}</Text>
                      </View>

                      <View style={styles.metaInline}>
                        <Image 
                          source={require('../../../../assets/order.png')} 
                          style={[styles.smallIcon, {  tintColor: bgColor}]} 
                          resizeMode="contain"
                        />
                        <Text style={styles.metaText}>{store.orders}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FFFFFF' 
  },

  /* HEADER */
  header: {
    height: Platform.OS === 'ios' ? responsiveSize(100) : responsiveSize(90),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveSize(18),
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? responsiveSize(50) : responsiveSize(30),
    paddingBottom: responsiveSize(0),
  },
  headerTitle: { 
    color: "#fff", 
    fontSize: responsiveSize(20), 
    fontWeight: "700",
    textAlign: 'center',
    flex: 1,
    marginHorizontal: responsiveSize(10),
  },
  iconBtn: {
    width: responsiveSize(40),
    height: responsiveSize(40),
    borderRadius: responsiveSize(12),
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
    width: responsiveSize(20), 
    height: responsiveSize(20),
    resizeMode: 'contain',
  },

  content: { 
    paddingHorizontal: responsiveSize(16), 
    paddingBottom: responsiveSize(40) 
  },

  searchRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: responsiveSize(18),
    marginTop: responsiveSize(15),
  },
  searchBox: {
    flex: 1,
    backgroundColor: '#fff',
    height: responsiveSize(48),
    borderRadius: responsiveSize(12),
    paddingHorizontal: responsiveSize(10),
    flexDirection: 'row',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  searchIcon: { 
    width: responsiveSize(18), 
    height: responsiveSize(18), 
    marginRight: responsiveSize(8),
    resizeMode: 'contain',
  },
  searchInput: { 
    flex: 1, 
    fontSize: responsiveSize(14),
    color: '#000',
  },
  filterBtn: {
    width: responsiveSize(50),
    height: responsiveSize(48),
    marginLeft: responsiveSize(12),
    borderRadius: responsiveSize(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterIcon: { 
    width: responsiveSize(22), 
    height: responsiveSize(22),
    resizeMode: 'contain',
  },

  toggleRow: {
    flexDirection: 'row',
    backgroundColor: '#eceff4',
    borderRadius: responsiveSize(12),
    padding: responsiveSize(10),
    marginBottom: responsiveSize(16),
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: responsiveSize(14),
    borderRadius: responsiveSize(10),
    alignItems: 'center',
  },
  toggleActive: {},
  toggleTxt: { 
    fontSize: responsiveSize(14), 
    color: '#1d1d1d',
    fontWeight: '500',
  },
  toggleTxtActive: { 
    color: '#fff', 
    fontWeight: '700' 
  },

  /* Product Cards */
  card: {
    backgroundColor: '#fff',
    borderRadius: responsiveSize(12),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
    marginBottom: responsiveSize(14),
    padding: responsiveSize(14),
    position: 'relative',
  },
  cardTouchable: {
    flex: 1,
  },
  cardContent: {
    flexDirection: 'row',
  },
  cardLeft: { 
    flex: 1, 
    paddingRight: responsiveSize(8) 
  },
  cardTitle: { 
    fontSize: responsiveSize(16), 
    fontWeight: '700', 
    marginBottom: responsiveSize(4),
    color: '#000',
  },
  cardPrice: { 
    fontSize: responsiveSize(16), 
    fontWeight: '700', 
    marginBottom: responsiveSize(8) 
  },
  cardDesc: { 
    color: '#666', 
    fontSize: responsiveSize(12),
    lineHeight: responsiveSize(16),
    marginBottom: responsiveSize(10),
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: responsiveSize(8),
    paddingVertical: responsiveSize(4),
    borderRadius: responsiveSize(10),
    marginTop: responsiveSize(4),
    marginBottom: responsiveSize(12),
  },
  starIcon: { 
    width: responsiveSize(12), 
    height: responsiveSize(12), 
    marginRight: responsiveSize(4),
  },
  ratingTxt: { 
    fontWeight: '700',
    fontSize: responsiveSize(11),
    color: '#fff',
  },
  cardRight: { 
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardImage: { 
    width: responsiveSize(90), 
    height: responsiveSize(90), 
    borderRadius: responsiveSize(10),
    marginBottom: responsiveSize(8),
  },

  /* Quantity Selector */
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsiveSize(8),
  },
  qtyButton: {
    width: responsiveSize(28),
    height: responsiveSize(28),
    borderRadius: responsiveSize(14),
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  qtyButtonText: {
    color: '#fff',
    fontSize: responsiveSize(16),
    fontWeight: '700',
    lineHeight: responsiveSize(18),
  },
  qtyText: {
    fontSize: responsiveSize(14),
    fontWeight: '600',
    marginHorizontal: responsiveSize(10),
    color: '#000',
    minWidth: responsiveSize(20),
    textAlign: 'center',
  },

  /* Add Button Container - Right side */
  addBtnContainerRight: {
    alignItems: 'center',
    width: '100%',
  },
  addBtn: {
    borderWidth: responsiveSize(2),
    borderRadius: responsiveSize(8),
    paddingHorizontal: responsiveSize(20),
    paddingVertical: responsiveSize(8),
    alignItems: 'center',
    minWidth: responsiveSize(80),
  },
  addTxt: { 
    fontWeight: '700',
    fontSize: responsiveSize(13),
  },

  /* Heart Button for Products */
  heartWrapper: {
    position: 'absolute',
    right: responsiveSize(14),
    top: responsiveSize(14),
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: responsiveSize(20),
    width: responsiveSize(40),
    height: responsiveSize(40),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  heartIcon: {
    width: responsiveSize(24),
    height: responsiveSize(24),
  },

  /* Store Cards */
  storeCard: {
    borderRadius: responsiveSize(12),
    backgroundColor: '#fff',
    marginBottom: responsiveSize(14),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 3,
      },
    }),
    overflow: 'hidden',
    position: 'relative',
  },
  storeTouchable: {
    flex: 1,
  },
  storeImage: { 
    width: '100%', 
    height: responsiveSize(140),
  },
  storeBody: { 
    padding: responsiveSize(12) 
  },
  storeName: { 
    fontSize: responsiveSize(16), 
    fontWeight: '700', 
    marginTop: responsiveSize(4),
    color: '#000',
  },
  metaRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: responsiveSize(6) 
  },
  metaIcon: { 
    width: responsiveSize(16), 
    height: responsiveSize(16), 
    marginRight: responsiveSize(6),
  },
  metaText: { 
    color: '#666',
    fontSize: responsiveSize(13),
  },
  metaInline: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginRight: responsiveSize(12) 
  },
  smallIcon: { 
    width: responsiveSize(14), 
    height: responsiveSize(14), 
    marginRight: responsiveSize(6),
  },

  /* Store Rating Badge */
  storeRatingBadge: {
    position: 'absolute',
    bottom: responsiveSize(10),
    right: responsiveSize(10),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveSize(8),
    paddingVertical: responsiveSize(4),
    borderRadius: responsiveSize(10),
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
  storeStarIcon: {
    width: responsiveSize(12),
    height: responsiveSize(12),
    marginRight: responsiveSize(4),
  },
  storeRatingTxt: {
    color: '#fff',
    fontWeight: '700',
    fontSize: responsiveSize(12),
  },

  /* Heart Button for Stores */
  storeHeartWrapper: {
    position: 'absolute',
    right: responsiveSize(10),
    top: responsiveSize(10),
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: responsiveSize(20),
    width: responsiveSize(40),
    height: responsiveSize(40),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  storeHeartIcon: {
    width: responsiveSize(24),
    height: responsiveSize(24),
  },
});