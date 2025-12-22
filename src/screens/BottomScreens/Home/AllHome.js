// File: src/screens/BottomScreens/Home/AllHome.js
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  Dimensions,
  StatusBar,
  Platform,
  Animated,
  Vibration,
} from 'react-native';
import { useColor } from '../../../util/ColorSwitcher';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

// Slightly reduced scaling to make everything smaller
const responsiveSize = size => (width / 400) * size;
const isSmallScreen = width < 375;

// Get proper status bar height for both platforms
const getStatusBarHeight = () => {
  if (Platform.OS === 'ios') {
    return height >= 812 ? 44 : 20;
  }
  return StatusBar.currentHeight || 24;
};

const statusBarHeight = getStatusBarHeight();

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

const assets = {
  location: require('../../../assets/location.png'),
  dropdown: require('../../../assets/dropdown.png'),
  user: require('../../../assets/user2.png'),
  search: require('../../../assets/search.png'),
  filter: require('../../../assets/filter.png'),
  specialoffer: require('../../../assets/specialoffer.png'),
  store: require('../../../assets/store.png'),
  heart: require('../../../assets/heart.png'),
  heartfill: require('../../../assets/heartfill.png'),
  star: require('../../../assets/star.png'),
  bike: require('../../../assets/bike.png'),
  clock: require('../../../assets/clock.png'),

  // Category icons
  all: require('../../../assets/all.png'),
  grocery: require('../../../assets/grocery.png'),
  electronics: require('../../../assets/electronics.png'),
  health: require('../../../assets/health.png'),

  // Grocery images
  fruit: require('../../../assets/fruit.png'),
  g1: require('../../../assets/g1.png'),
  g2: require('../../../assets/g2.png'),
  g3: require('../../../assets/g3.png'),
  g4: require('../../../assets/g4.png'),
  g5: require('../../../assets/g5.png'),

  // Electronics images
  mobile: require('../../../assets/mobile.png'),
  e1: require('../../../assets/e1.png'),
  e2: require('../../../assets/e2.png'),
  e3: require('../../../assets/e3.png'),
  e4: require('../../../assets/e4.png'),
  e5: require('../../../assets/e5.png'),

  // Health images
  firstadd: require('../../../assets/firstadd.png'),
  h1: require('../../../assets/h1.png'),
  h2: require('../../../assets/h2.png'),
  h3: require('../../../assets/h3.png'),
  h4: require('../../../assets/h4.png'),
  h5: require('../../../assets/h2.png'),
};

// Arrays for each category images
const groceryImages = [
  assets.fruit,
  assets.g1,
  assets.g2,
  assets.g3,
  assets.g4,
  assets.g5,
];
const electronicsImages = [
  assets.mobile,
  assets.e1,
  assets.e2,
  assets.e3,
  assets.e4,
  assets.e5,
];
const healthImages = [
  assets.firstadd,
  assets.h1,
  assets.h2,
  assets.h3,
  assets.h4,
  assets.h5,
];

// Grocery item labels
const groceryLabels = [
  "Fruit's and healthy item's",
  "Vegetables & green item's",
  'Bakery & Breads',
  'Dairy & Eggs',
  'Meat & Seafood',
  'Beverages & Drinks',
  'Snacks & Cookies',
  'Frozen Foods',
];

// Electronics item labels
const electronicsLabels = [
  "Mobile & Phone's",
  "Laptop & Tablet's",
  'Smart Watches',
  'Home Audio System',
  'Camera & Photography',
  'Gaming Consoles',
  'Headphones & Earphones',
  'Chargers & Cables',
];

// Health item labels
const healthLabels = [
  'First Aid Essentials',
  'Over-the-Counter',
  'Health Monitoring',
  'Protection & Hygiene',
  'Vitamins & Supplements',
  'Personal Care',
  'Baby Care Products',
  'Elderly Care Items',
];

// Create complete item data with images
const createItemsData = () => {
  const items = [];

  // Grocery items
  groceryLabels.forEach((label, index) => {
    items.push({
      id: `grocery_${index}`,
      title: label,
      price: `₹${(Math.random() * 1000 + 100).toFixed(2)}`,
      desc: 'Fresh and healthy products for your daily needs.',
      img: groceryImages[index % groceryImages.length],
      rating: (4.0 + Math.random() * 0.5).toFixed(1),
      category: 'GROCERY',
    });
  });

  // Electronics items
  electronicsLabels.forEach((label, index) => {
    items.push({
      id: `electronics_${index}`,
      title: label,
      price: `₹${(Math.random() * 50000 + 10000).toFixed(2)}`,
      desc: 'Latest technology gadgets and devices.',
      img: electronicsImages[index % electronicsImages.length],
      rating: (4.2 + Math.random() * 0.3).toFixed(1),
      category: 'ELECTRONICS',
    });
  });

  // Health items
  healthLabels.forEach((label, index) => {
    items.push({
      id: `health_${index}`,
      title: label,
      price: `₹${(Math.random() * 2000 + 100).toFixed(2)}`,
      desc: 'Healthcare and wellness products.',
      img: healthImages[index % healthImages.length],
      rating: (4.3 + Math.random() * 0.2).toFixed(1),
      category: 'HEALTH',
    });
  });

  return items;
};

// Create store data
const createStoresData = () => {
  return Array.from({ length: 5 }).map((_, i) => ({
    id: `store_${i}`,
    name: i % 2 === 0 ? 'Grocery Store' : 'Electronics Hub',
    rating: (4.0 + Math.random() * 0.5).toFixed(1),
    distance: `${(Math.random() * 1000 + 100).toFixed(1)} m`,
    time: `${Math.floor(Math.random() * 15) + 5}-${
      Math.floor(Math.random() * 15) + 15
    } mins`,
    orders: `${Math.floor(Math.random() * 5000) + 1000}+ Order`,
    img: assets.store,
    locationText: 'Near MC College, Barpeta Town',
    tags: i % 2 === 0 ? ['Groceries', 'Fresh'] : ['Electronics', 'Gadgets'],
  }));
};

const allItemsData = createItemsData();
const dummyStores = createStoresData();
const gridData = Array.from({ length: 8 }).map((_, i) => ({
  id: i.toString(),
}));

export default function AllHome({ activeTab, setActiveTab }) {
  const { bgColor, switchColor } = useColor();
  const navigation = useNavigation();
  const [likedStores, setLikedStores] = useState({});
  const heartButtonScales = useRef({});

  const onCategoryPress = id => {
    setActiveTab(id);
    switchColor(id);
  };

  const handleSearchPress = () => {
    navigation.navigate('Search');
  };

  const handleFilterPress = () => {
    navigation.navigate('HomeFilter');
  };

  const handleStorePress = store => {
    navigation.navigate('Store', { store });
  };

  const handleViewAllStores = () => {
    navigation.navigate('StoreList', { stores: dummyStores });
  };

  const handleSeeAllOffers = () => {
    navigation.navigate('OffersClone');
  };

  const handleCategoryItemPress = (category, index, label) => {
    const categoryItems = allItemsData.filter(
      item => item.category === category,
    );
    const item = categoryItems[index % categoryItems.length];

    if (item) {
      navigation.navigate('Items', {
        item: {
          ...item,
          title: label,
        },
      });
    } else {
      const fallbackItem = {
        id: `${category.toLowerCase()}_${index}`,
        title: label,
        price:
          category === 'GROCERY'
            ? '₹299.00'
            : category === 'ELECTRONICS'
            ? '₹15,999.00'
            : '₹499.00',
        desc:
          category === 'GROCERY'
            ? 'Fresh and healthy products for your daily needs.'
            : category === 'ELECTRONICS'
            ? 'Latest technology gadgets and devices.'
            : 'Healthcare and wellness products.',
        img:
          category === 'GROCERY'
            ? groceryImages[index % groceryImages.length]
            : category === 'ELECTRONICS'
            ? electronicsImages[index % electronicsImages.length]
            : healthImages[index % healthImages.length],
        rating: '4.5',
        category: category,
      };
      navigation.navigate('Items', { item: fallbackItem });
    }
  };

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

  const renderStore = ({ item }) => {
    const isLiked = likedStores[item.id];
    const heartScale = getStoreHeartButtonScale(item.id);

    return (
      <TouchableOpacity
        style={styles.storeCard}
        onPress={() => handleStorePress(item)}
        activeOpacity={0.9}
      >
        <Image source={item.img} style={styles.storeImage} resizeMode="cover" />

        <TouchableOpacity
          style={[
            styles.heartWrapper,
            {
              backgroundColor: isLiked
                ? 'rgba(255, 255, 255, 0.9)'
                : 'rgba(0, 0, 0, 0.4)',
            },
          ]}
          onPress={() => handleStoreHeartPress(item.id)}
          activeOpacity={0.7}
        >
          <Animated.Image
            source={isLiked ? assets.heartfill : assets.heart}
            style={[
              styles.heartIcon,
              { tintColor: isLiked ? bgColor : '#fff' },
              { transform: [{ scale: heartScale }] },
            ]}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <View style={styles.storeBody}>
          <View style={[styles.ratingBadgeNew, { backgroundColor: bgColor }]}>
            <Image
              source={assets.star}
              style={styles.starIcon}
              resizeMode="contain"
            />
            <Text style={styles.ratingTextNew}>{item.rating}</Text>
          </View>

          <Text style={styles.storeTitle}>{item.name}</Text>

          <View style={styles.deliveryRow}>
            <View style={styles.deliveryItem}>
              <Image
                source={assets.bike}
                style={[styles.metaIcon, { tintColor: bgColor }]}
                resizeMode="contain"
              />
              <Text style={styles.metaText}>free delivery</Text>
            </View>

            <View style={styles.deliveryItem}>
              <Image
                source={assets.clock}
                style={[styles.metaIcon, { tintColor: bgColor }]}
                resizeMode="contain"
              />
              <Text style={styles.metaText}>{item.time}</Text>
            </View>
          </View>

          <View style={styles.tagsRow}>
            {item.tags &&
              item.tags.map((tag, idx) => (
                <View key={idx} style={[styles.tag, { borderColor: bgColor }]}>
                  <Text style={[styles.tagText, { color: bgColor }]}>
                    {tag}
                  </Text>
                </View>
              ))}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderGridItem = (imageSource, label, category, index) => (
    <TouchableOpacity
      style={styles.gridItem}
      onPress={() => handleCategoryItemPress(category, index, label)}
      activeOpacity={0.8}
    >
      <Image
        source={imageSource}
        style={styles.gridImage}
        resizeMode="contain"
      />
      <Text style={styles.gridLabel} numberOfLines={2}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const getGroceryImage = index => {
    return groceryImages[index % groceryImages.length];
  };

  const getElectronicsImage = index => {
    return electronicsImages[index % electronicsImages.length];
  };

  const getHealthImage = index => {
    return healthImages[index % healthImages.length];
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.topHeader, { backgroundColor: bgColor }]}>
          {Platform.OS === 'ios' && <View style={styles.iosSafeArea} />}

          <View style={styles.topRow}>
            <View style={styles.locationWrap}>
              <Image
                source={assets.location}
                style={styles.iconSmall}
                resizeMode="contain"
              />
              <View style={styles.locationTextContainer}>
                <Text style={styles.deliverText}>Deliver to</Text>

                <View style={styles.addressRow}>
                  <Text style={styles.addressText}>4102 Pretty View Lane</Text>
                  <Image
                    source={assets.dropdown}
                    style={styles.dropdown}
                    resizeMode="contain"
                  />
                </View>
              </View>
            </View>

            <Image
              source={assets.user}
              style={styles.userIcon}
              resizeMode="cover"
            />
          </View>

          <Text style={styles.headerTitle}>
            Get your home essentials what do you need
          </Text>

          <View style={styles.searchRow}>
            <TouchableOpacity
              style={styles.searchBox}
              onPress={handleSearchPress}
              activeOpacity={0.7}
            >
              <Image
                source={assets.search}
                style={[styles.searchIcon, { tintColor: bgColor }]}
                resizeMode="contain"
              />
              <TextInput
                placeholder="Find for grocery electronics health Items.."
                placeholderTextColor="#bdbdbd"
                style={styles.searchInput}
                pointerEvents="none"
                editable={false}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.filterBtn, { borderColor: bgColor }]}
              onPress={handleFilterPress}
              activeOpacity={0.8}
            >
              <Image
                source={assets.filter}
                style={[styles.filterIcon, { tintColor: bgColor }]}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.categoryRow}>
          {[
            { id: 'ALL', icon: assets.all, title: 'All' },
            { id: 'GROCERY', icon: assets.grocery, title: 'Groceries' },
            {
              id: 'ELECTRONICS',
              icon: assets.electronics,
              title: 'Electronics',
            },
            { id: 'HEALTH', icon: assets.health, title: 'Health' },
          ].map(c => (
            <TouchableOpacity
              key={c.id}
              style={styles.categoryItem}
              onPress={() => onCategoryPress(c.id)}
              activeOpacity={0.85}
            >
              <Image
                source={c.icon}
                style={[
                  styles.catIcon,
                  activeTab === c.id && { tintColor: bgColor },
                ]}
                resizeMode="contain"
              />
              <Text
                style={[
                  styles.catLabel,
                  activeTab === c.id && { color: bgColor },
                ]}
              >
                {c.title}
              </Text>
              {activeTab === c.id && (
                <View
                  style={[styles.catUnderline, { backgroundColor: bgColor }]}
                />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Special Offers</Text>
          <TouchableOpacity onPress={handleSeeAllOffers} activeOpacity={0.7}>
            <Text style={[styles.sectionLink, { color: bgColor }]}>
              See All
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.specialCard, { backgroundColor: bgColor }]}
          onPress={handleSeeAllOffers}
          activeOpacity={0.9}
        >
          <View style={styles.specialLeft}>
            <Text style={styles.specialPercent}>30%</Text>
            <Text style={styles.specialTitle}>Today's Special!</Text>
            <Text style={styles.specialDesc}>
              Get discount for every order, only valid for today
            </Text>
          </View>
          <Image
            source={assets.specialoffer}
            style={styles.specialImage}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <View style={[styles.sectionHeader, { marginTop: responsiveSize(20) }]}>
          <Text style={styles.sectionTitle}>Popular Store's</Text>
          <TouchableOpacity onPress={handleViewAllStores} activeOpacity={0.7}>
            <Text style={[styles.sectionLink, { color: bgColor }]}>
              View All
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={dummyStores}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={i => i.id}
          contentContainerStyle={styles.storeListContent}
          renderItem={renderStore}
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Grocery Item's</Text>
        </View>

        <View style={styles.gridWrap}>
          {gridData.map((g, idx) => (
            <View key={g.id} style={styles.gridItemWrapper}>
              {renderGridItem(
                getGroceryImage(idx),
                groceryLabels[idx],
                'GROCERY',
                idx,
              )}
            </View>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Electronic's Item's</Text>
        </View>

        <View style={styles.gridWrap}>
          {gridData.map((g, idx) => (
            <View key={g.id} style={styles.gridItemWrapper}>
              {renderGridItem(
                getElectronicsImage(idx),
                electronicsLabels[idx],
                'ELECTRONICS',
                idx,
              )}
            </View>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Health Item's</Text>
        </View>

        <View style={styles.gridWrap}>
          {gridData.map((g, idx) => (
            <View key={g.id} style={styles.gridItemWrapper}>
              {renderGridItem(
                getHealthImage(idx),
                healthLabels[idx],
                'HEALTH',
                idx,
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom:
      Platform.OS === 'ios' ? responsiveSize(80) : responsiveSize(72),
  },

  topHeader: {
    paddingHorizontal: responsiveSize(14),
    paddingBottom: responsiveSize(16),
    borderBottomLeftRadius: responsiveSize(18),
    borderBottomRightRadius: responsiveSize(18),
    paddingTop: Platform.OS === 'android' ? statusBarHeight : 18,
  },
  iosSafeArea: {
    height: statusBarHeight,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? responsiveSize(6) : responsiveSize(16),
  },
  locationWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  locationTextContainer: {
    marginLeft: responsiveSize(6),
    flex: 1,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconSmall: {
    width: responsiveSize(14),
    height: responsiveSize(14),
    tintColor: '#fff',
  },
  dropdown: {
    width: responsiveSize(7),
    height: responsiveSize(7),
    tintColor: '#fff',
    marginLeft: responsiveSize(4),
  },

  deliverText: {
    color: '#fff',
    fontSize: responsiveSize(10),
  },
  addressText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: responsiveSize(12),
  },
  userIcon: {
    width: responsiveSize(34),
    height: responsiveSize(34),
    borderRadius: responsiveSize(17),
  },
  headerTitle: {
    color: '#fff',
    fontSize: responsiveSize(16),
    fontWeight: '700',
    marginTop: responsiveSize(12),
    lineHeight: responsiveSize(22),
  },

  searchRow: {
    flexDirection: 'row',
    marginTop: responsiveSize(14),
    alignItems: 'center',
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: responsiveSize(12),
    borderRadius: responsiveSize(10),
    height: Platform.OS === 'ios' ? responsiveSize(46) : responsiveSize(44),
    elevation: 1.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 1.5,
  },
  searchIcon: {
    width: responsiveSize(16),
    height: responsiveSize(16),
  },
  filterIcon: {
    width: responsiveSize(16),
    height: responsiveSize(16),
  },
  searchInput: {
    marginLeft: responsiveSize(8),
    fontSize: responsiveSize(12),
    flex: 1,
    color: '#333',
    paddingVertical: 0,
    height: '100%',
  },
  filterBtn: {
    width: Platform.OS === 'ios' ? responsiveSize(46) : responsiveSize(44),
    height: Platform.OS === 'ios' ? responsiveSize(46) : responsiveSize(44),
    marginLeft: responsiveSize(10),
    backgroundColor: '#fff',
    borderRadius: responsiveSize(10),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    elevation: 1.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 1.5,
  },

  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveSize(14),
    marginTop: responsiveSize(14),
    backgroundColor: '#fff',
    paddingVertical: responsiveSize(12),
    marginHorizontal: responsiveSize(8),
    borderRadius: responsiveSize(10),
    elevation: 1.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 1.5,
  },
  categoryItem: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: responsiveSize(2),
  },
  catIcon: {
    width: responsiveSize(30),
    height: responsiveSize(30),
    marginBottom: responsiveSize(6),
  },
  catLabel: {
    fontSize: responsiveSize(11),
    color: '#333',
    fontWeight: '500',
    textAlign: 'center',
  },
  catUnderline: {
    height: responsiveSize(2),
    width: responsiveSize(26),
    marginTop: responsiveSize(4),
    borderRadius: responsiveSize(2),
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: responsiveSize(20),
    paddingHorizontal: responsiveSize(14),
    marginBottom: responsiveSize(6),
  },
  sectionTitle: {
    fontSize: responsiveSize(16),
    fontWeight: '700',
    color: '#222',
  },
  sectionLink: {
    fontSize: responsiveSize(12),
    fontWeight: '500',
  },

  specialCard: {
    flexDirection: 'row',
    marginHorizontal: responsiveSize(14),
    padding: responsiveSize(16),
    borderRadius: responsiveSize(14),
    alignItems: 'center',
    marginTop: responsiveSize(10),
    overflow: 'hidden',
    minHeight: responsiveSize(120),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 3,
  },
  specialLeft: { flex: 1 },
  specialPercent: {
    fontSize: responsiveSize(26),
    fontWeight: '800',
    color: '#fff',
  },
  specialTitle: {
    fontSize: responsiveSize(18),
    fontWeight: '700',
    color: '#fff',
    marginTop: responsiveSize(6),
  },
  specialDesc: {
    color: '#fff',
    marginTop: responsiveSize(6),
    fontSize: responsiveSize(11),
    width: '90%',
    lineHeight: responsiveSize(15),
  },
  specialImage: {
    width: responsiveSize(110),
    height: responsiveSize(100),
  },

  storeListContent: {
    paddingLeft: responsiveSize(12),
    paddingRight: responsiveSize(6),
    paddingBottom: responsiveSize(8),
  },
  storeCard: {
    width: width * 0.7,
    marginRight: responsiveSize(12),
    borderRadius: responsiveSize(14),
    backgroundColor: '#fff',
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    marginBottom: responsiveSize(8),
  },
  storeImage: {
    width: '100%',
    height: responsiveSize(140),
  },

  heartWrapper: {
    position: 'absolute',
    right: responsiveSize(10),
    top: responsiveSize(10),
    padding: responsiveSize(6),
    borderRadius: responsiveSize(18),
    width: responsiveSize(30),
    height: responsiveSize(30),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.18,
        shadowRadius: 1.5,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  heartIcon: {
    width: responsiveSize(16),
    height: responsiveSize(16),
  },

  storeBody: {
    padding: responsiveSize(12),
    paddingBottom: responsiveSize(12),
  },

  ratingBadgeNew: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveSize(8),
    paddingVertical: responsiveSize(4),
    borderRadius: responsiveSize(18),
    alignSelf: 'flex-start',
    marginBottom: responsiveSize(4),
  },
  starIcon: {
    width: responsiveSize(10),
    height: responsiveSize(10),
    marginRight: responsiveSize(4),
    tintColor: '#fff',
  },
  ratingTextNew: {
    color: '#fff',
    fontSize: responsiveSize(10),
    fontWeight: '700',
  },

  storeTitle: {
    fontSize: responsiveSize(14),
    fontWeight: '700',
    color: '#222',
    marginBottom: responsiveSize(6),
  },

  deliveryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveSize(10),
  },
  deliveryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: responsiveSize(12),
  },
  metaIcon: {
    width: responsiveSize(12),
    height: responsiveSize(12),
  },
  metaText: {
    color: '#777',
    fontSize: responsiveSize(11),
    marginLeft: responsiveSize(4),
    textTransform: 'capitalize',
  },

  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: 'transparent',
    paddingHorizontal: responsiveSize(8),
    paddingVertical: responsiveSize(4),
    borderRadius: responsiveSize(10),
    borderWidth: 1,
    marginRight: responsiveSize(6),
    marginBottom: responsiveSize(4),
  },
  tagText: {
    fontSize: responsiveSize(11),
    fontWeight: '500',
  },

  gridWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: responsiveSize(12),
    marginTop: responsiveSize(10),
    justifyContent: 'space-between',
  },
  gridItemWrapper: {
    width: (width - responsiveSize(52)) / 4,
    marginBottom: responsiveSize(16),
  },
  gridItem: {
    alignItems: 'center',
    padding: responsiveSize(6),
  },
  gridImage: {
    width: responsiveSize(50),
    height: responsiveSize(50),
  },
  gridLabel: {
    fontSize: responsiveSize(10),
    textAlign: 'center',
    marginTop: responsiveSize(6),
    color: '#333',
    fontWeight: '500',
    lineHeight: responsiveSize(13),
  },
});
