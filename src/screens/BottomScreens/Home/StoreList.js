// File: src/screens/StoreList.js
import React, { useState, useRef, useEffect } from 'react';
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
import { useColor } from '../../../util/ColorSwitcher';

const { width, height } = Dimensions.get('window');

// Slightly reduced scaling to make everything smaller
const responsiveSize = size => (width / 400) * size;

// Safe vibration function with permission check
const safeVibrate = (duration = 40) => {
  try {
    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      if (Vibration && typeof Vibration.vibrate === 'function') {
        Vibration.vibrate(duration);
      }
    }
  } catch (error) {
    console.log('Vibration error:', error);
  }
};

// Store categories for filtering
const STORE_CATEGORIES = [
  { id: 'all', title: 'All Stores' },
  { id: 'grocery', title: 'Groceries' },
  { id: 'electronics', title: 'Electronics' },
  { id: 'health', title: 'Health' },
];

// Static dummy data for stores
const ALL_STORES = [
  // Grocery Stores
  {
    id: 'grocery_1',
    name: 'Fresh Grocery Mart',
    category: 'grocery',
    img: require('../../../assets/st2.png'),
    rating: '4.5',
    locationText: 'Near MC College, Barpeta Town',
    distance: '590.0 m',
    time: '10-15 mins',
    orders: '5000+ Order',
    tags: ['Vegetables', 'Fruits', 'Fresh'],
    deliveryFee: 'Free',
    minOrder: '₹199',
  },
  {
    id: 'grocery_2',
    name: 'Organic Food Hub',
    category: 'grocery',
    img: require('../../../assets/st1.png'),
    rating: '4.7',
    locationText: 'City Center, Barpeta Road',
    distance: '1.2 km',
    time: '20-25 mins',
    orders: '3000+ Order',
    tags: ['Organic', 'Healthy', 'Fresh'],
    deliveryFee: 'Free',
    minOrder: '₹299',
  },
  {
    id: 'grocery_3',
    name: 'Daily Needs Store',
    category: 'grocery',
    img: require('../../../assets/st2.png'),
    rating: '4.3',
    locationText: 'Main Market, Barpeta',
    distance: '850.0 m',
    time: '15-20 mins',
    orders: '4500+ Order',
    tags: ['Daily', 'Essentials', 'Fresh'],
    deliveryFee: '₹20',
    minOrder: '₹99',
  },

  // Electronics Stores
  {
    id: 'electronics_1',
    name: 'Tech Gadget Hub',
    category: 'electronics',
    img: require('../../../assets/e1.png'),
    rating: '4.6',
    locationText: 'Electronics Market, Barpeta',
    distance: '1.5 km',
    time: '25-30 mins',
    orders: '2500+ Order',
    tags: ['Gadgets', 'Mobile', 'Laptop'],
    deliveryFee: 'Free',
    minOrder: '₹499',
  },
  {
    id: 'electronics_2',
    name: 'Smart Electronics',
    category: 'electronics',
    img: require('../../../assets/e2.png'),
    rating: '4.4',
    locationText: 'Shopping Complex, Barpeta',
    distance: '1.0 km',
    time: '20-25 mins',
    orders: '2000+ Order',
    tags: ['Smart', 'Home', 'Audio'],
    deliveryFee: '₹30',
    minOrder: '₹299',
  },
  {
    id: 'electronics_3',
    name: 'Device World',
    category: 'electronics',
    img: require('../../../assets/e3.png'),
    rating: '4.8',
    locationText: 'Tech Park, Barpeta',
    distance: '2.0 km',
    time: '30-35 mins',
    orders: '1800+ Order',
    tags: ['Devices', 'Accessories', 'Gaming'],
    deliveryFee: 'Free',
    minOrder: '₹999',
  },

  // Health Stores
  {
    id: 'health_1',
    name: 'Health & Wellness Store',
    category: 'health',
    img: require('../../../assets/h1.png'),
    rating: '4.9',
    locationText: 'Medical Street, Barpeta',
    distance: '700.0 m',
    time: '10-15 mins',
    orders: '3500+ Order',
    tags: ['Medical', 'Wellness', 'Care'],
    deliveryFee: 'Free',
    minOrder: '₹199',
  },
  {
    id: 'health_2',
    name: 'Pharma Plus',
    category: 'health',
    img: require('../../../assets/h2.png'),
    rating: '4.5',
    locationText: 'Hospital Road, Barpeta',
    distance: '1.3 km',
    time: '20-25 mins',
    orders: '2800+ Order',
    tags: ['Pharmacy', 'Medicine', 'Care'],
    deliveryFee: '₹25',
    minOrder: '₹149',
  },
  {
    id: 'health_3',
    name: 'First Aid Center',
    category: 'health',
    img: require('../../../assets/h3.png'),
    rating: '4.7',
    locationText: 'Emergency Lane, Barpeta',
    distance: '900.0 m',
    time: '15-20 mins',
    orders: '3200+ Order',
    tags: ['First Aid', 'Emergency', 'Medical'],
    deliveryFee: 'Free',
    minOrder: '₹99',
  },
  {
    id: 'health_4',
    name: 'Wellness Pharmacy',
    category: 'health',
    img: require('../../../assets/h4.png'),
    rating: '4.6',
    locationText: 'Wellness Center, Barpeta',
    distance: '1.1 km',
    time: '18-23 mins',
    orders: '2400+ Order',
    tags: ['Wellness', 'Vitamins', 'Supplements'],
    deliveryFee: 'Free',
    minOrder: '₹299',
  },
  {
    id: 'grocery_4',
    name: 'Super Market Delight',
    category: 'grocery',
    img: require('../../../assets/fruit.png'),
    rating: '4.4',
    locationText: 'Super Market Area, Barpeta',
    distance: '1.4 km',
    time: '22-27 mins',
    orders: '3800+ Order',
    tags: ['Supermarket', 'All Items', 'Fresh'],
    deliveryFee: '₹40',
    minOrder: '₹499',
  },
  {
    id: 'electronics_4',
    name: 'Home Appliances Center',
    category: 'electronics',
    img: require('../../../assets/mobile.png'),
    rating: '4.3',
    locationText: 'Appliance Market, Barpeta',
    distance: '1.8 km',
    time: '28-33 mins',
    orders: '1600+ Order',
    tags: ['Appliances', 'Home', 'Kitchen'],
    deliveryFee: 'Free',
    minOrder: '₹1499',
  },
];

export default function StoreList({ navigation, route }) {
  const categoryFromRoute = route?.params?.category || 'ALL';
  const { bgColor, switchColor } = useColor();

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [likedStores, setLikedStores] = useState({});
  const heartButtonScales = useRef({});

  useEffect(() => {
    if (route?.params?.category) {
      const category = route.params.category;

      if (category === 'GROCERY') {
        setSelectedCategory('grocery');
      } else if (category === 'ELECTRONICS') {
        setSelectedCategory('electronics');
      } else if (category === 'HEALTH') {
        setSelectedCategory('health');
      } else {
        setSelectedCategory('all');
      }

      switchColor(category);
    }
  }, [route?.params?.category, switchColor]);

  const getStoreHeartButtonScale = storeId => {
    if (!heartButtonScales.current[storeId]) {
      heartButtonScales.current[storeId] = new Animated.Value(1);
    }
    return heartButtonScales.current[storeId];
  };

  const handleStoreHeartPress = storeId => {
    safeVibrate(40);

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
      [storeId]: !prev[storeId],
    }));
  };

  const handleStorePress = store => {
    navigation.navigate('Store', { store });
  };

  const handleCategoryPress = categoryId => {
    setSelectedCategory(categoryId);

    if (categoryId === 'grocery') {
      switchColor('GROCERY');
    } else if (categoryId === 'electronics') {
      switchColor('ELECTRONICS');
    } else if (categoryId === 'health') {
      switchColor('HEALTH');
    } else {
      switchColor('ALL');
    }
  };

  const filteredStores = ALL_STORES.filter(store => {
    if (selectedCategory !== 'all' && store.category !== selectedCategory) {
      return false;
    }

    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      return (
        store.name.toLowerCase().includes(query) ||
        store.tags.some(tag => tag.toLowerCase().includes(query)) ||
        store.locationText.toLowerCase().includes(query)
      );
    }

    return true;
  });

  const getHeaderTitle = () => {
    switch (selectedCategory) {
      case 'grocery':
        return 'Grocery Stores';
      case 'electronics':
        return 'Electronics Stores';
      case 'health':
        return 'Health Stores';
      default:
        return 'All Stores';
    }
  };

  const renderStore = store => {
    const isLiked = likedStores[store.id];
    const heartScale = getStoreHeartButtonScale(store.id);

    return (
      <View key={store.id} style={styles.storeCard}>
        {/* Heart Button for Store */}
        <TouchableOpacity
          style={[
            styles.storeHeartWrapper,
            {
              backgroundColor: isLiked
                ? 'rgba(255, 255, 255, 0.9)'
                : 'rgba(255, 255, 255, 0.3)',
            },
          ]}
          onPress={() => handleStoreHeartPress(store.id)}
          activeOpacity={0.7}
        >
          <Animated.Image
            source={
              isLiked
                ? require('../../../assets/heartfill.png')
                : require('../../../assets/heart.png')
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
          onPress={() => handleStorePress(store)}
        >
          <Image
            source={store.img}
            style={styles.storeImage}
            resizeMode="cover"
          />

          {/* Store Rating Badge on Image */}
          <View style={[styles.storeRatingBadge, { backgroundColor: bgColor }]}>
            <Image
              source={require('../../../assets/star.png')}
              style={[styles.storeStarIcon, { tintColor: '#fff' }]}
              resizeMode="contain"
            />
            <Text style={styles.storeRatingTxt}>{store.rating}</Text>
          </View>

          <View style={styles.storeBody}>
            <Text style={styles.storeName}>{store.name}</Text>

            <View style={styles.metaRow}>
              <Image
                source={require('../../../assets/location.png')}
                style={[styles.metaIcon, { tintColor: bgColor }]}
                resizeMode="contain"
              />
              <Text style={styles.metaText}>{store.locationText}</Text>
            </View>

            <View style={[styles.metaRow, { marginTop: responsiveSize(6) }]}>
              <View style={styles.metaInline}>
                <Image
                  source={require('../../../assets/location2.png')}
                  style={[styles.smallIcon, { tintColor: bgColor }]}
                  resizeMode="contain"
                />
                <Text style={styles.metaText}>{store.distance}</Text>
              </View>

              <View style={styles.metaInline}>
                <Image
                  source={require('../../../assets/clock.png')}
                  style={[styles.smallIcon, { tintColor: bgColor }]}
                  resizeMode="contain"
                />
                <Text style={styles.metaText}>{store.time}</Text>
              </View>

              <View style={styles.metaInline}>
                <Image
                  source={require('../../../assets/order.png')}
                  style={[styles.smallIcon, { tintColor: bgColor }]}
                  resizeMode="contain"
                />
                <Text style={styles.metaText}>{store.orders}</Text>
              </View>
            </View>

            {/* Delivery Info */}
            <View
              style={[styles.deliveryRow, { marginTop: responsiveSize(6) }]}
            >
              <View style={styles.deliveryInfo}>
                <Image
                  source={require('../../../assets/bike.png')}
                  style={[styles.bikeIcon, { tintColor: bgColor }]}
                  resizeMode="contain"
                />
                <Text style={styles.deliveryText}>
                  {store.deliveryFee} delivery
                </Text>
              </View>
              <View style={styles.minOrder}>
                <Text style={[styles.minOrderText, { color: bgColor }]}>
                  Min: {store.minOrder}
                </Text>
              </View>
            </View>

            {/* Tags */}
            <View style={styles.tagsContainer}>
              {store.tags.map((tag, index) => (
                <View
                  key={index}
                  style={[styles.tag, { borderColor: bgColor }]}
                >
                  <Text style={[styles.tagText, { color: bgColor }]}>
                    {tag}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
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
            source={require('../../../assets/back.png')}
            style={[styles.icon, { tintColor: bgColor }]}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{getHeaderTitle()}</Text>

        <View style={{ width: responsiveSize(34) }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Row */}
        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <Image
              source={require('../../../assets/search.png')}
              style={[styles.searchIcon, { tintColor: '#666' }]}
            />
            <TextInput
              placeholder="Search for stores..."
              placeholderTextColor="#99a0a8"
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={styles.searchInput}
            />
          </View>

          <TouchableOpacity
            style={[styles.filterBtn, { backgroundColor: bgColor }]}
          >
            <Image
              source={require('../../../assets/filter.png')}
              style={[styles.filterIcon, { tintColor: '#FFFFFF' }]}
            />
          </TouchableOpacity>
        </View>

        {/* Category Filter */}
        <View style={styles.categoryContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryScrollContent}
          >
            {STORE_CATEGORIES.map(category => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryBtn,
                  selectedCategory === category.id && [
                    styles.categoryActive,
                    { backgroundColor: bgColor },
                  ],
                ]}
                onPress={() => handleCategoryPress(category.id)}
              >
                <Text
                  style={[
                    styles.categoryTxt,
                    selectedCategory === category.id &&
                      styles.categoryTxtActive,
                  ]}
                >
                  {category.title}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Results Count */}
        <View style={styles.resultsRow}>
          <Text style={styles.resultsText}>
            {filteredStores.length}{' '}
            {filteredStores.length === 1 ? 'Store' : 'Stores'} Found
          </Text>
          <TouchableOpacity>
            <Text style={[styles.sortText, { color: bgColor }]}>
              Sort by: Nearest
            </Text>
          </TouchableOpacity>
        </View>

        {/* Stores List */}
        {filteredStores.length > 0 ? (
          filteredStores.map(store => renderStore(store))
        ) : (
          <View style={styles.noResultsContainer}>
            <Image
              source={require('../../../assets/store.png')}
              style={styles.noResultsImage}
              resizeMode="contain"
            />
            <Text style={styles.noResultsTitle}>No Stores Found</Text>
            <Text style={styles.noResultsText}>
              Try adjusting your search or filter to find what you're looking
              for.
            </Text>
          </View>
        )}

        {/* Bottom Padding */}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  /* HEADER */
  header: {
    height: Platform.OS === 'ios' ? responsiveSize(90) : responsiveSize(82),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveSize(14),
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? responsiveSize(42) : responsiveSize(26),
    paddingBottom: responsiveSize(0),
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

  content: {
    paddingHorizontal: responsiveSize(14),
    paddingBottom: responsiveSize(32),
  },

  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveSize(14),
    marginTop: responsiveSize(12),
  },
  searchBox: {
    flex: 1,
    backgroundColor: '#fff',
    height: responsiveSize(42),
    borderRadius: responsiveSize(10),
    paddingHorizontal: responsiveSize(8),
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
    width: responsiveSize(16),
    height: responsiveSize(16),
    marginRight: responsiveSize(6),
    resizeMode: 'contain',
  },
  searchInput: {
    flex: 1,
    fontSize: responsiveSize(12),
    color: '#000',
  },
  filterBtn: {
    width: responsiveSize(42),
    height: responsiveSize(42),
    marginLeft: responsiveSize(10),
    borderRadius: responsiveSize(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterIcon: {
    width: responsiveSize(18),
    height: responsiveSize(18),
    resizeMode: 'contain',
  },

  /* Category Filter */
  categoryContainer: {
    marginBottom: responsiveSize(12),
  },
  categoryScrollContent: {
    paddingHorizontal: responsiveSize(2),
  },
  categoryBtn: {
    paddingHorizontal: responsiveSize(12),
    paddingVertical: responsiveSize(8),
    borderRadius: responsiveSize(18),
    marginHorizontal: responsiveSize(3),
    backgroundColor: '#eceff4',
  },
  categoryActive: {},
  categoryTxt: {
    fontSize: responsiveSize(11),
    color: '#1d1d1d',
    fontWeight: '500',
  },
  categoryTxtActive: {
    color: '#fff',
    fontWeight: '700',
  },

  /* Results Row */
  resultsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsiveSize(12),
  },
  resultsText: {
    fontSize: responsiveSize(12),
    color: '#666',
    fontWeight: '500',
  },
  sortText: {
    fontSize: responsiveSize(11),
    fontWeight: '500',
  },

  /* Store Cards */
  storeCard: {
    borderRadius: responsiveSize(10),
    backgroundColor: '#fff',
    marginBottom: responsiveSize(12),
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
    padding: responsiveSize(10),
  },
  storeName: {
    fontSize: responsiveSize(14),
    fontWeight: '700',
    marginTop: responsiveSize(4),
    color: '#000',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsiveSize(4),
  },
  metaIcon: {
    width: responsiveSize(14),
    height: responsiveSize(14),
    marginRight: responsiveSize(4),
  },
  metaText: {
    color: '#666',
    fontSize: responsiveSize(11),
  },
  metaInline: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: responsiveSize(10),
  },
  smallIcon: {
    width: responsiveSize(12),
    height: responsiveSize(12),
    marginRight: responsiveSize(4),
  },

  /* Delivery Info */
  deliveryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bikeIcon: {
    width: responsiveSize(12),
    height: responsiveSize(12),
    marginRight: responsiveSize(4),
  },
  deliveryText: {
    fontSize: responsiveSize(11),
    color: '#666',
  },
  minOrder: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: responsiveSize(6),
    paddingVertical: responsiveSize(3),
    borderRadius: responsiveSize(6),
  },
  minOrderText: {
    fontSize: responsiveSize(10),
    fontWeight: '600',
  },

  /* Tags */
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: responsiveSize(6),
  },
  tag: {
    backgroundColor: 'transparent',
    paddingHorizontal: responsiveSize(6),
    paddingVertical: responsiveSize(3),
    borderRadius: responsiveSize(6),
    borderWidth: 1,
    marginRight: responsiveSize(4),
    marginBottom: responsiveSize(4),
  },
  tagText: {
    fontSize: responsiveSize(10),
    fontWeight: '500',
  },

  /* Store Rating Badge */
  storeRatingBadge: {
    position: 'absolute',
    bottom: responsiveSize(8),
    right: responsiveSize(8),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveSize(6),
    paddingVertical: responsiveSize(3),
    borderRadius: responsiveSize(8),
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
    width: responsiveSize(10),
    height: responsiveSize(10),
    marginRight: responsiveSize(4),
  },
  storeRatingTxt: {
    color: '#fff',
    fontWeight: '700',
    fontSize: responsiveSize(10),
  },

  /* Heart Button for Stores */
  storeHeartWrapper: {
    position: 'absolute',
    right: responsiveSize(8),
    top: responsiveSize(8),
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: responsiveSize(18),
    width: responsiveSize(32),
    height: responsiveSize(32),
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
    width: responsiveSize(18),
    height: responsiveSize(18),
  },

  /* No Results */
  noResultsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: responsiveSize(48),
  },
  noResultsImage: {
    width: responsiveSize(100),
    height: responsiveSize(100),
    marginBottom: responsiveSize(16),
    opacity: 0.5,
  },
  noResultsTitle: {
    fontSize: responsiveSize(16),
    fontWeight: '700',
    color: '#333',
    marginBottom: responsiveSize(6),
  },
  noResultsText: {
    fontSize: responsiveSize(12),
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: responsiveSize(32),
    lineHeight: responsiveSize(18),
  },

  /* Bottom Padding */
  bottomPadding: {
    height: responsiveSize(16),
  },
});
