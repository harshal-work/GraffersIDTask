// File: src/screens/BottomScreens/Home/HealthHome.js
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
  specialoffer: require('../../../assets/s4.png'),
  store: require('../../../assets/store.png'),
  heart: require('../../../assets/heart.png'),
  heartfill: require('../../../assets/heartfill.png'),
  star: require('../../../assets/star.png'),
  bike: require('../../../assets/bike.png'),
  clock: require('../../../assets/clock.png'),
  
  // Health specific assets
  monitoring: require('../../../assets/firstadd.png'),
  respiratory: require('../../../assets/h1.png'),
  mobility: require('../../../assets/h2.png'),
  diagnostic: require('../../../assets/h3.png'),
  surgical: require('../../../assets/h4.png'),
  daily: require('../../../assets/h2.png'),
  wound: require('../../../assets/h4.png'),
  orthopedic: require('../../../assets/h3.png'),
  firstaid: require('../../../assets/h1.png'),
  otc: require('../../../assets/firstadd.png'),
  healthmonitor: require('../../../assets/h3.png'),
  protection: require('../../../assets/h1.png'),
  vitamins: require('../../../assets/h4.png'),
  supplements: require('../../../assets/h3.png'),
  personalcare: require('../../../assets/h2.png'),
  babycare: require('../../../assets/h1.png'),
  
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
    name: i % 2 === 0 ? 'Health Store' : 'Medical Mart',
    rating: (4.0 + Math.random() * 0.5).toFixed(1),
    distance: `${(Math.random() * 1000 + 100).toFixed(1)} m`,
    time: `${Math.floor(Math.random() * 15) + 5}-${Math.floor(Math.random() * 15) + 15} mins`,
    orders: `${Math.floor(Math.random() * 5000) + 1000}+ Order`,
    img: assets.store,
    locationText: 'Near MC College, Barpeta Town',
    tags: i % 2 === 0 ? ['Medical', 'Health'] : ['Wellness', 'Pharmacy']
  }));
};

// Create medical devices data
const createMedicalDevicesData = () => {
  const medicalDeviceLabels = [
    "Monitoring Devices",
    "Respiratory Devices",
    "Mobility Aids",
    "Diagnostic Devices",
    "Surgical & Clinical Instruments",
    "Daily Medical Use Devices",
    "Wound Care Devices",
    "Orthopedic Devices"
  ];
  
  const medicalDeviceImages = [
    assets.monitoring, assets.respiratory, assets.mobility, assets.diagnostic,
    assets.surgical, assets.daily, assets.wound, assets.orthopedic
  ];
  
  return medicalDeviceLabels.map((label, index) => ({
    id: `medical_${index}`,
    title: label,
    price: `₹${(Math.random() * 5000 + 500).toFixed(2)}`,
    desc: 'Medical devices and equipment for healthcare needs.',
    img: medicalDeviceImages[index % medicalDeviceImages.length],
    rating: (4.3 + Math.random() * 0.2).toFixed(1),
    category: 'MEDICAL_DEVICES'
  }));
};

// Create health products data
const createHealthProductsData = () => {
  const healthProductLabels = [
    "First Aid Essentials",
    "Over-the-Counter",
    "Health Monitoring",
    "Protection & Hygiene",
    "Vitamins & Nutrition",
    "Supplements",
    "Personal Care",
    "Baby Care"
  ];
  
  const healthProductImages = [
    assets.firstaid, assets.otc, assets.healthmonitor, assets.protection,
    assets.vitamins, assets.supplements, assets.personalcare, assets.babycare
  ];
  
  return healthProductLabels.map((label, index) => ({
    id: `health_${index}`,
    title: label,
    price: `₹${(Math.random() * 2000 + 100).toFixed(2)}`,
    desc: 'Health and wellness products for daily care.',
    img: healthProductImages[index % healthProductImages.length],
    rating: (4.4 + Math.random() * 0.1).toFixed(1),
    category: 'HEALTH_PRODUCTS'
  }));
};

const dummyStores = createStoresData();
const medicalDevicesData = createMedicalDevicesData();
const healthProductsData = createHealthProductsData();
const medicalDevicesGridData = Array.from({ length: 8 }).map((_, i) => ({ id: i.toString() }));
const healthProductsGridData = Array.from({ length: 8 }).map((_, i) => ({ id: i.toString() }));

export default function HealthHome({ activeTab, setActiveTab }) {
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

  // Handle medical device press
  const handleMedicalDevicePress = (index) => {
    const device = medicalDevicesData[index];
    if (device) {
      navigation.navigate('Items', { item: device });
    } else {
      // Fallback medical device item
      const fallbackDevice = {
        id: `medical_${index}`,
        title: [
          "Monitoring Devices",
          "Respiratory Devices",
          "Mobility Aids",
          "Diagnostic Devices",
          "Surgical & Clinical Instruments",
          "Daily Medical Use Devices",
          "Wound Care Devices",
          "Orthopedic Devices"
        ][index],
        price: '₹2,999.00',
        desc: 'Medical devices and equipment for healthcare needs.',
        img: [
          assets.monitoring, assets.respiratory, assets.mobility, assets.diagnostic,
          assets.surgical, assets.daily, assets.wound, assets.orthopedic
        ][index],
        rating: '4.5',
        category: 'MEDICAL_DEVICES'
      };
      navigation.navigate('Items', { item: fallbackDevice });
    }
  };

  // Handle health product press
  const handleHealthProductPress = (index) => {
    const product = healthProductsData[index];
    if (product) {
      navigation.navigate('Items', { item: product });
    } else {
      // Fallback health product item
      const fallbackProduct = {
        id: `health_${index}`,
        title: [
          "First Aid Essentials",
          "Over-the-Counter",
          "Health Monitoring",
          "Protection & Hygiene",
          "Vitamins & Nutrition",
          "Supplements",
          "Personal Care",
          "Baby Care"
        ][index],
        price: '₹499.00',
        desc: 'Health and wellness products for daily care.',
        img: [
          assets.firstaid, assets.otc, assets.healthmonitor, assets.protection,
          assets.vitamins, assets.supplements, assets.personalcare, assets.babycare
        ][index],
        rating: '4.5',
        category: 'HEALTH_PRODUCTS'
      };
      navigation.navigate('Items', { item: fallbackProduct });
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

          <Text style={styles.headerTitle}>Get your health essentials delivered when you need them.</Text>

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
                placeholder="Find for Health Item's.."
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

        {/* Medical Devices */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Medical Devices</Text>
        </View>

        <View style={styles.gridWrap}>
          {medicalDevicesGridData.map((g, idx) => (
            <View key={g.id} style={styles.gridItemWrapper}>
              {renderGridItem(
                idx % 8 === 0 ? assets.monitoring :
                idx % 8 === 1 ? assets.respiratory :
                idx % 8 === 2 ? assets.mobility :
                idx % 8 === 3 ? assets.diagnostic :
                idx % 8 === 4 ? assets.surgical :
                idx % 8 === 5 ? assets.daily :
                idx % 8 === 6 ? assets.wound :
                                assets.orthopedic,
                idx % 8 === 0 ? "Monitoring Devices" :
                idx % 8 === 1 ? "Respiratory Devices" :
                idx % 8 === 2 ? "Mobility Aids" :
                idx % 8 === 3 ? "Diagnostic Devices" :
                idx % 8 === 4 ? "Surgical & Clinical Instruments" :
                idx % 8 === 5 ? "Daily Medical Use Devices" :
                idx % 8 === 6 ? "Wound Care Devices" :
                                "Orthopedic Devices",
                () => handleMedicalDevicePress(idx)
              )}
            </View>
          ))}
        </View>

        {/* Health Products */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Health Products</Text>
        </View>

        <View style={styles.gridWrap}>
          {healthProductsGridData.map((g, idx) => (
            <View key={g.id} style={styles.gridItemWrapper}>
              {renderGridItem(
                idx % 8 === 0 ? assets.firstaid :
                idx % 8 === 1 ? assets.otc :
                idx % 8 === 2 ? assets.healthmonitor :
                idx % 8 === 3 ? assets.protection :
                idx % 8 === 4 ? assets.vitamins :
                idx % 8 === 5 ? assets.supplements :
                idx % 8 === 6 ? assets.personalcare :
                                assets.babycare,
                idx % 8 === 0 ? "First Aid Essentials" :
                idx % 8 === 1 ? "Over-the-Counter" :
                idx % 8 === 2 ? "Health Monitoring" :
                idx % 8 === 3 ? "Protection & Hygiene" :
                idx % 8 === 4 ? "Vitamins & Nutrition" :
                idx % 8 === 5 ? "Supplements" :
                idx % 8 === 6 ? "Personal Care" :
                                "Baby Care",
                () => handleHealthProductPress(idx)
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