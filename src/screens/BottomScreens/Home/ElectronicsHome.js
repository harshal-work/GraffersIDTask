// File: src/screens/BottomScreens/Home/ElectronicsHome.js
import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, FlatList, Dimensions, StatusBar, Platform, Animated, Vibration
} from 'react-native';
import { useColor } from '../../../util/ColorSwitcher';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

// Responsive sizing
const responsiveSize = (size) => (width / 375) * size;
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

const assets = {
  location: require('../../../assets/location.png'),
  dropdown: require('../../../assets/dropdown.png'),
  user: require('../../../assets/user2.png'),
  search: require('../../../assets/search.png'),
  filter: require('../../../assets/filter.png'),
  specialoffer: require('../../../assets/s3.png'),
  store: require('../../../assets/store.png'),
  heart: require('../../../assets/heart.png'),
  heartfill: require('../../../assets/heartfill.png'),
  star: require('../../../assets/star.png'),
  bike: require('../../../assets/bike.png'),
  clock: require('../../../assets/clock.png'),
  
  // Electronics specific assets
  mobile: require('../../../assets/mobile.png'),
  laptop: require('../../../assets/e1.png'),
  watch: require('../../../assets/e2.png'),
  audio: require('../../../assets/e3.png'),
  headphones: require('../../../assets/e4.png'),
  gaming: require('../../../assets/e5.png'),
  camera: require('../../../assets/e6.png'),
  tv: require('../../../assets/e1.png'),
  fridge: require('../../../assets/e1.png'),
  washing: require('../../../assets/e2.png'),
  vacuum: require('../../../assets/mobile.png'),
  lights: require('../../../assets/e3.png'),
  purifier: require('../../../assets/e4.png'),
  microwave: require('../../../assets/e5.png'),
  dishwasher: require('../../../assets/e6.png'),
  ac: require('../../../assets/mobile.png'),
  
  // Category icons
  all: require('../../../assets/all.png'),
  grocery: require('../../../assets/grocery.png'),
  electronics: require('../../../assets/electronics.png'),
  health: require('../../../assets/health.png'),
};

// Create store data
const createStoresData = () => {
  return Array.from({ length: 5 }).map((_, i) => ({ 
    id: `store_${i}`,
    name: i % 2 === 0 ? 'Electronics Store' : 'Gadget Hub',
    rating: (4.0 + Math.random() * 0.5).toFixed(1),
    distance: `${(Math.random() * 1000 + 100).toFixed(1)} m`,
    time: `${Math.floor(Math.random() * 15) + 5}-${Math.floor(Math.random() * 15) + 15} mins`,
    orders: `${Math.floor(Math.random() * 5000) + 1000}+ Order`,
    img: assets.store,
    locationText: 'Near MC College, Barpeta Town',
    tags: i % 2 === 0 ? ['Electronics', 'Gadgets'] : ['Home Appliances', 'Smart']
  }));
};

// Create personal devices data
const createPersonalDevicesData = () => {
  const personalDeviceLabels = [
    "Mobile & Phone's",
    "Laptop & Tablet's",
    "Smart Watches",
    "Home Audio System",
    "Headphones & Earphones",
    "Gaming Console",
    "Camera's & D.SLRs",
    "Television & L.E.D.s"
  ];
  
  const personalDeviceImages = [
    assets.mobile, assets.laptop, assets.watch, assets.audio,
    assets.headphones, assets.gaming, assets.camera, assets.tv
  ];
  
  return personalDeviceLabels.map((label, index) => ({
    id: `personal_${index}`,
    title: label,
    price: `₹${(Math.random() * 50000 + 5000).toFixed(2)}`,
    desc: 'Latest technology gadgets and personal electronics.',
    img: personalDeviceImages[index % personalDeviceImages.length],
    rating: (4.2 + Math.random() * 0.3).toFixed(1),
    category: 'PERSONAL_ELECTRONICS'
  }));
};

// Create home electronics data
const createHomeElectronicsData = () => {
  const homeElectronicsLabels = [
    "Refrigerator & Freezing mat.",
    "Washing Machine's",
    "Vacuum Cleaners",
    "Light's & Smart Plugs",
    "Water Purifiers",
    "Microwave & Ovens",
    "Smart Dishwashers",
    "Air Conditioners"
  ];
  
  const homeElectronicsImages = [
    assets.fridge, assets.washing, assets.vacuum, assets.lights,
    assets.purifier, assets.microwave, assets.dishwasher, assets.ac
  ];
  
  return homeElectronicsLabels.map((label, index) => ({
    id: `home_${index}`,
    title: label,
    price: `₹${(Math.random() * 80000 + 10000).toFixed(2)}`,
    desc: 'Home appliances and smart electronics for convenience.',
    img: homeElectronicsImages[index % homeElectronicsImages.length],
    rating: (4.1 + Math.random() * 0.4).toFixed(1),
    category: 'HOME_ELECTRONICS'
  }));
};

const dummyStores = createStoresData();
const personalDevicesData = createPersonalDevicesData();
const homeElectronicsData = createHomeElectronicsData();
const personalDevicesGridData = Array.from({ length: 8 }).map((_, i) => ({ id: i.toString() }));
const homeElectronicsGridData = Array.from({ length: 8 }).map((_, i) => ({ id: i.toString() }));

export default function ElectronicsHome({ activeTab, setActiveTab }) {
  const { bgColor, switchColor } = useColor();
  const navigation = useNavigation();
  const [likedStores, setLikedStores] = useState({});
  const heartButtonScales = useRef({});

  const onCategoryPress = (id) => {
    // Safe check for setActiveTab function
    if (setActiveTab && typeof setActiveTab === 'function') {
      setActiveTab(id);
    }
    switchColor(id);
  };

  // Handle search navigation
  const handleSearchPress = () => {
    navigation.navigate('Search');
  };

  // Handle filter press
  const handleFilterPress = () => {
    navigation.navigate('HomeFilter');
  };

  // Handle store press - Navigate to Store screen
  const handleStorePress = (store) => {
    navigation.navigate('Store', { store });
  };

  // Handle view all stores press
  const handleViewAllStores = () => {
    navigation.navigate('StoreList', { stores: dummyStores });
  };

  // Handle special offers see all press
  const handleSeeAllOffers = () => {
    navigation.navigate('Offers');
  };

  // Handle personal device press
  const handlePersonalDevicePress = (index) => {
    const device = personalDevicesData[index];
    if (device) {
      navigation.navigate('Items', { item: device });
    } else {
      // Fallback device item
      const fallbackDevice = {
        id: `personal_${index}`,
        title: [
          "Mobile & Phone's",
          "Laptop & Tablet's",
          "Smart Watches",
          "Home Audio System",
          "Headphones & Earphones",
          "Gaming Console",
          "Camera's & D.SLRs",
          "Television & L.E.D.s"
        ][index],
        price: '₹15,999.00',
        desc: 'Latest technology gadgets and personal electronics.',
        img: [
          assets.mobile, assets.laptop, assets.watch, assets.audio,
          assets.headphones, assets.gaming, assets.camera, assets.tv
        ][index],
        rating: '4.5',
        category: 'PERSONAL_ELECTRONICS'
      };
      navigation.navigate('Items', { item: fallbackDevice });
    }
  };

  // Handle home electronics press
  const handleHomeElectronicsPress = (index) => {
    const device = homeElectronicsData[index];
    if (device) {
      navigation.navigate('Items', { item: device });
    } else {
      // Fallback home electronics item
      const fallbackDevice = {
        id: `home_${index}`,
        title: [
          "Refrigerator & Freezing mat.",
          "Washing Machine's",
          "Vacuum Cleaners",
          "Light's & Smart Plugs",
          "Water Purifiers",
          "Microwave & Ovens",
          "Smart Dishwashers",
          "Air Conditioners"
        ][index],
        price: '₹25,999.00',
        desc: 'Home appliances and smart electronics for convenience.',
        img: [
          assets.fridge, assets.washing, assets.vacuum, assets.lights,
          assets.purifier, assets.microwave, assets.dishwasher, assets.ac
        ][index],
        rating: '4.5',
        category: 'HOME_ELECTRONICS'
      };
      navigation.navigate('Items', { item: fallbackDevice });
    }
  };

  // Get or create scale animation for heart (store)
  const getStoreHeartButtonScale = (storeId) => {
    if (!heartButtonScales.current[storeId]) {
      heartButtonScales.current[storeId] = new Animated.Value(1);
    }
    return heartButtonScales.current[storeId];
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

        {/* HEART TOP RIGHT */}
        <TouchableOpacity 
          style={[
            styles.heartWrapper,
            { 
              backgroundColor: isLiked ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.4)',
            }
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
          {/* ⭐ RATING BADGE ABOVE TITLE */}
          <View style={[styles.ratingBadgeNew, { backgroundColor: bgColor }]}>
            <Image 
              source={assets.star} 
              style={styles.starIcon} 
              resizeMode="contain"
            />
            <Text style={styles.ratingTextNew}>{item.rating}</Text>
          </View>

          <Text style={styles.storeTitle}>{item.name}</Text>

          {/* Delivery row */}
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

          {/* Tags */}
          <View style={styles.tagsRow}>
            {item.tags && item.tags.map((tag, idx) => (
              <View key={idx} style={[styles.tag, { borderColor: bgColor }]}>
                <Text style={[styles.tagText, { color: bgColor }]}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderGridItem = (imageSource, label, onPress) => (
    <TouchableOpacity 
      style={styles.gridItem}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image source={imageSource} style={styles.gridImage} resizeMode="contain" />
      <Text style={styles.gridLabel} numberOfLines={2}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header top */}
        <View style={[styles.topHeader, { backgroundColor: bgColor }]}>
          {/* iOS Safe Area Spacer */}
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

          <Text style={styles.headerTitle}>Get your electronics delivered fast—right when you need them.</Text>

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
                placeholder="Find for electronics Item's.."
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

        {/* Category row */}
        <View style={styles.categoryRow}>
          {[
            { id: 'ALL', icon: assets.all, title: 'All' },
            { id: 'GROCERY', icon: assets.grocery, title: 'Groceries' },
            { id: 'ELECTRONICS', icon: assets.electronics, title: 'Electronics' },
            { id: 'HEALTH', icon: assets.health, title: 'Health' },
          ].map((c) => (
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
                  { 
                    tintColor: activeTab === c.id ? bgColor : '#999'
                  }
                ]} 
                resizeMode="contain"
              />
              <Text style={[
                styles.catLabel, 
                { 
                  color: activeTab === c.id ? bgColor : '#333'
                }
              ]}>
                {c.title}
              </Text>
              {activeTab === c.id && (
                <View style={[styles.catUnderline, { backgroundColor: bgColor }]} />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Special Offers */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Special Offers</Text>
          <TouchableOpacity onPress={handleSeeAllOffers} activeOpacity={0.7}>
            <Text style={[styles.sectionLink, { color: bgColor }]}>See All</Text>
          </TouchableOpacity>
        </View>

        {/* SPECIAL CARD */}
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

        {/* Popular Stores */}
        <View style={[styles.sectionHeader, { marginTop: responsiveSize(24) }]}>
          <Text style={styles.sectionTitle}>Popular Store's</Text>
          <TouchableOpacity onPress={handleViewAllStores} activeOpacity={0.7}>
            <Text style={[styles.sectionLink, { color: bgColor }]}>View All</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={dummyStores}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(i) => i.id}
          contentContainerStyle={styles.storeListContent}
          renderItem={renderStore}
        />

        {/* Device's For Personal Use */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Device's For Personal Use</Text>
        </View>

        <View style={styles.gridWrap}>
          {personalDevicesGridData.map((g, idx) => (
            <View key={g.id} style={styles.gridItemWrapper}>
              {renderGridItem(
                idx % 8 === 0 ? assets.mobile :
                idx % 8 === 1 ? assets.laptop :
                idx % 8 === 2 ? assets.watch :
                idx % 8 === 3 ? assets.audio :
                idx % 8 === 4 ? assets.headphones :
                idx % 8 === 5 ? assets.gaming :
                idx % 8 === 6 ? assets.camera :
                                assets.tv,
                idx % 8 === 0 ? "Mobile & Phone's" :
                idx % 8 === 1 ? "Laptop & Tablet's" :
                idx % 8 === 2 ? "Smart Watches" :
                idx % 8 === 3 ? "Home Audio System" :
                idx % 8 === 4 ? "Headphones & Earphones" :
                idx % 8 === 5 ? "Gaming Console" :
                idx % 8 === 6 ? "Camera's & D.SLRs" :
                                "Television & L.E.D.s",
                () => handlePersonalDevicePress(idx)
              )}
            </View>
          ))}
        </View>

        {/* Electronics For Home Convenience */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Electronics for home convenience</Text>
        </View>

        <View style={styles.gridWrap}>
          {homeElectronicsGridData.map((g, idx) => (
            <View key={g.id} style={styles.gridItemWrapper}>
              {renderGridItem(
                idx % 8 === 0 ? assets.fridge :
                idx % 8 === 1 ? assets.washing :
                idx % 8 === 2 ? assets.vacuum :
                idx % 8 === 3 ? assets.lights :
                idx % 8 === 4 ? assets.purifier :
                idx % 8 === 5 ? assets.microwave :
                idx % 8 === 6 ? assets.dishwasher :
                                assets.ac,
                idx % 8 === 0 ? "Refrigerator & Freezing mat." :
                idx % 8 === 1 ? "Washing Machine's" :
                idx % 8 === 2 ? "Vacuum Cleaners" :
                idx % 8 === 3 ? "Light's & Smart Plugs" :
                idx % 8 === 4 ? "Water Purifiers" :
                idx % 8 === 5 ? "Microwave & Ovens" :
                idx % 8 === 6 ? "Smart Dishwashers" :
                                "Air Conditioners",
                () => handleHomeElectronicsPress(idx)
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
    backgroundColor: '#F8F8F8' 
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Platform.OS === 'ios' ? responsiveSize(100) : responsiveSize(90),
  },

  // HEADER - Proper handling for both iOS and Android
  topHeader: {
    paddingHorizontal: responsiveSize(18),
    paddingBottom: responsiveSize(20),
    borderBottomLeftRadius: responsiveSize(20),
    borderBottomRightRadius: responsiveSize(20),
    // Android uses paddingTop, iOS uses the safe area view
    paddingTop: Platform.OS === 'android' ? statusBarHeight : 20,
  },
  iosSafeArea: {
    height: statusBarHeight,
  },
  topRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? responsiveSize(8) : responsiveSize(20),
  },
  locationWrap: { 
    flexDirection: 'row', 
    alignItems: 'center',
    flex: 1,
  },
  locationTextContainer: {
    marginLeft: responsiveSize(8),
    flex: 1,
  },
  addressRow: {
    flexDirection: 'row', 
    alignItems: 'center',
  },
  iconSmall: { 
    width: responsiveSize(18), 
    height: responsiveSize(18), 
    tintColor: '#fff' 
  },
  dropdown: { 
    width: responsiveSize(8), 
    height: responsiveSize(8), 
    tintColor: '#fff',
    marginLeft: responsiveSize(6),
  },

  deliverText: { 
    color: '#fff', 
    fontSize: responsiveSize(12) 
  },
  addressText: { 
    color: '#fff', 
    fontWeight: '700', 
    fontSize: responsiveSize(14),
  },
  userIcon: { 
    width: responsiveSize(40), 
    height: responsiveSize(40), 
    borderRadius: responsiveSize(20) 
  },
  headerTitle: { 
    color: '#fff', 
    fontSize: responsiveSize(20), 
    fontWeight: '700', 
    marginTop: responsiveSize(16),
    lineHeight: responsiveSize(26),
  },

  searchRow: { 
    flexDirection: 'row', 
    marginTop: responsiveSize(18), 
    alignItems: 'center' 
  },
  searchBox: { 
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#fff', 
    paddingHorizontal: responsiveSize(14), 
    borderRadius: responsiveSize(12),
    height: Platform.OS === 'ios' ? responsiveSize(52) : responsiveSize(50),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchIcon: { 
    width: responsiveSize(18), 
    height: responsiveSize(18),
  },
  filterIcon: {
    width: responsiveSize(18), 
    height: responsiveSize(18),
  },
  searchInput: { 
    marginLeft: responsiveSize(10), 
    fontSize: responsiveSize(14), 
    flex: 1,
    color: '#333',
    paddingVertical: 0,
    height: '100%',
  },
  filterBtn: { 
    width: Platform.OS === 'ios' ? responsiveSize(52) : responsiveSize(50), 
    height: Platform.OS === 'ios' ? responsiveSize(52) : responsiveSize(50), 
    marginLeft: responsiveSize(12), 
    backgroundColor: '#fff', 
    borderRadius: responsiveSize(12), 
    alignItems: 'center', 
    justifyContent: 'center', 
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  // CATEGORY - Fixed to show proper highlighting
  categoryRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingHorizontal: responsiveSize(18), 
    marginTop: responsiveSize(16), 
    backgroundColor: '#fff', 
    paddingVertical: responsiveSize(16),
    marginHorizontal: responsiveSize(8),
    borderRadius: responsiveSize(12),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  categoryItem: { 
    alignItems: 'center', 
    flex: 1,
    paddingHorizontal: responsiveSize(4),
  },
  catIcon: { 
    width: responsiveSize(36), 
    height: responsiveSize(36), 
    marginBottom: responsiveSize(8),
    tintColor: '#999', // Default color
  },
  catLabel: { 
    fontSize: responsiveSize(12), 
    color: '#333', // Default color
    fontWeight: '500',
    textAlign: 'center',
  },
  catUnderline: { 
    height: responsiveSize(3), 
    width: responsiveSize(32), 
    marginTop: responsiveSize(6), 
    borderRadius: responsiveSize(3) 
  },

  // SECTION
  sectionHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginTop: responsiveSize(24), 
    paddingHorizontal: responsiveSize(18),
    marginBottom: responsiveSize(8),
  },
  sectionTitle: { 
    fontSize: responsiveSize(18), 
    fontWeight: '700', 
    color: '#222' 
  },
  sectionLink: { 
    fontSize: responsiveSize(14), 
    fontWeight: '500' 
  },

  // SPECIAL CARD - Increased height
  specialCard: {
    flexDirection: 'row',
    marginHorizontal: responsiveSize(18),
    padding: responsiveSize(20),
    borderRadius: responsiveSize(16),
    alignItems: 'center',
    marginTop: responsiveSize(12),
    overflow: 'hidden',
    minHeight: responsiveSize(140),
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  specialLeft: { flex: 1 },
  specialPercent: { 
    fontSize: responsiveSize(32), 
    fontWeight: '800', 
    color: '#fff' 
  },
  specialTitle: { 
    fontSize: responsiveSize(20), 
    fontWeight: '700', 
    color: '#fff', 
    marginTop: responsiveSize(8) 
  },
  specialDesc: { 
    color: '#fff', 
    marginTop: responsiveSize(8), 
    fontSize: responsiveSize(13), 
    width: '90%',
    lineHeight: responsiveSize(18),
  },
  specialImage: { 
    width: responsiveSize(140), 
    height: responsiveSize(120) 
  },

  // STORE CARDS - Fixed store card height and content with reduced space
  storeListContent: {
    paddingLeft: responsiveSize(15),
    paddingRight: responsiveSize(8),
    paddingBottom: responsiveSize(10),
  },
  storeCard: { 
    width: width * 0.72, 
    marginRight: responsiveSize(16), 
    borderRadius: responsiveSize(16), 
    backgroundColor: '#fff', 
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: responsiveSize(10),
  },
  storeImage: { 
    width: '100%', 
    height: responsiveSize(160),
  },
  
  // Heart wrapper for stores
  heartWrapper: {
    position: 'absolute',
    right: responsiveSize(12),
    top: responsiveSize(12),
    padding: responsiveSize(8),
    borderRadius: responsiveSize(20),
    width: responsiveSize(36),
    height: responsiveSize(36),
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
    width: responsiveSize(20),
    height: responsiveSize(20),
  },

  storeBody: { 
    padding: responsiveSize(16),
    paddingBottom: responsiveSize(16),
  },

  // ⭐ NEW RATING INSIDE STORE BODY - Reduced space
  ratingBadgeNew: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveSize(10),
    paddingVertical: responsiveSize(5),
    borderRadius: responsiveSize(20),
    alignSelf: 'flex-start',
    marginBottom: responsiveSize(6), // Reduced from 12 to 6
  },
  starIcon: {
    width: responsiveSize(12),
    height: responsiveSize(12),
    marginRight: responsiveSize(6),
    tintColor: '#fff',
  },
  ratingTextNew: { 
    color: '#fff', 
    fontSize: responsiveSize(12), 
    fontWeight: '700' 
  },

  storeTitle: { 
    fontSize: responsiveSize(16), 
    fontWeight: '700', 
    color: '#222',
    marginBottom: responsiveSize(8),
  },
  
  deliveryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveSize(12),
  },
  deliveryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: responsiveSize(16),
  },
  metaIcon: { 
    width: responsiveSize(14), 
    height: responsiveSize(14),
  },
  metaText: { 
    color: '#777', 
    fontSize: responsiveSize(12), 
    marginLeft: responsiveSize(6),
    textTransform: 'capitalize',
  },

  tagsRow: { 
    flexDirection: 'row', 
    flexWrap: 'wrap',
  },
  tag: { 
    backgroundColor: 'transparent', 
    paddingHorizontal: responsiveSize(10), 
    paddingVertical: responsiveSize(6), 
    borderRadius: responsiveSize(12),
    borderWidth: 1,
    marginRight: responsiveSize(8),
    marginBottom: responsiveSize(4),
  },
  tagText: { 
    fontSize: responsiveSize(12), 
    fontWeight: '500' 
  },

  // GRID
  gridWrap: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    paddingHorizontal: responsiveSize(15), 
    marginTop: responsiveSize(12), 
    justifyContent: 'space-between',
  },
  gridItemWrapper: {
    width: (width - responsiveSize(60)) / 4,
    marginBottom: responsiveSize(20),
  },
  gridItem: { 
    alignItems: 'center',
    padding: responsiveSize(8),
  },
  gridImage: { 
    width: responsiveSize(60), 
    height: responsiveSize(60) 
  },
  gridLabel: { 
    fontSize: responsiveSize(12), 
    textAlign: 'center', 
    marginTop: responsiveSize(10), 
    color: '#333',
    fontWeight: '500',
    lineHeight: responsiveSize(16),
  },
});