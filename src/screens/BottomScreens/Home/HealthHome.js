// File: src/screens/BottomScreens/Home/HealthHome.js
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
    time: `${Math.floor(Math.random() * 15) + 5}-${
      Math.floor(Math.random() * 15) + 15
    } mins`,
    orders: `${Math.floor(Math.random() * 5000) + 1000}+ Order`,
    img: assets.store,
    locationText: 'Near MC College, Barpeta Town',
    tags: i % 2 === 0 ? ['Medical', 'Health'] : ['Wellness', 'Pharmacy'],
  }));
};

// Create medical devices data
const createMedicalDevicesData = () => {
  const medicalDeviceLabels = [
    'Monitoring Devices',
    'Respiratory Devices',
    'Mobility Aids',
    'Diagnostic Devices',
    'Surgical & Clinical Instruments',
    'Daily Medical Use Devices',
    'Wound Care Devices',
    'Orthopedic Devices',
  ];

  const medicalDeviceImages = [
    assets.monitoring,
    assets.respiratory,
    assets.mobility,
    assets.diagnostic,
    assets.surgical,
    assets.daily,
    assets.wound,
    assets.orthopedic,
  ];

  return medicalDeviceLabels.map((label, index) => ({
    id: `medical_${index}`,
    title: label,
    price: `₹${(Math.random() * 5000 + 500).toFixed(2)}`,
    desc: 'Medical devices and equipment for healthcare needs.',
    img: medicalDeviceImages[index % medicalDeviceImages.length],
    rating: (4.3 + Math.random() * 0.2).toFixed(1),
    category: 'MEDICAL_DEVICES',
  }));
};

// Create health products data
const createHealthProductsData = () => {
  const healthProductLabels = [
    'First Aid Essentials',
    'Over-the-Counter',
    'Health Monitoring',
    'Protection & Hygiene',
    'Vitamins & Nutrition',
    'Supplements',
    'Personal Care',
    'Baby Care',
  ];

  const healthProductImages = [
    assets.firstaid,
    assets.otc,
    assets.healthmonitor,
    assets.protection,
    assets.vitamins,
    assets.supplements,
    assets.personalcare,
    assets.babycare,
  ];

  return healthProductLabels.map((label, index) => ({
    id: `health_${index}`,
    title: label,
    price: `₹${(Math.random() * 2000 + 100).toFixed(2)}`,
    desc: 'Health and wellness products for daily care.',
    img: healthProductImages[index % healthProductImages.length],
    rating: (4.4 + Math.random() * 0.1).toFixed(1),
    category: 'HEALTH_PRODUCTS',
  }));
};

const dummyStores = createStoresData();
const medicalDevicesData = createMedicalDevicesData();
const healthProductsData = createHealthProductsData();
const medicalDevicesGridData = Array.from({ length: 8 }).map((_, i) => ({
  id: i.toString(),
}));
const healthProductsGridData = Array.from({ length: 8 }).map((_, i) => ({
  id: i.toString(),
}));

export default function HealthHome({ activeTab, setActiveTab }) {
  const { bgColor, switchColor } = useColor();
  const navigation = useNavigation();
  const [likedStores, setLikedStores] = useState({});
  const heartButtonScales = useRef({});

  // Handle user profile navigation
  const handleUserProfilePress = () => {
    safeVibrate(50);
    navigation.navigate('MyProfile');
  };

  const onCategoryPress = id => {
    if (setActiveTab && typeof setActiveTab === 'function') {
      setActiveTab(id);
    }
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

  const handleMedicalDevicePress = index => {
    const device = medicalDevicesData[index];
    if (device) {
      navigation.navigate('Items', { item: device });
    } else {
      const fallbackDevice = {
        id: `medical_${index}`,
        title: [
          'Monitoring Devices',
          'Respiratory Devices',
          'Mobility Aids',
          'Diagnostic Devices',
          'Surgical & Clinical Instruments',
          'Daily Medical Use Devices',
          'Wound Care Devices',
          'Orthopedic Devices',
        ][index],
        price: '₹2,999.00',
        desc: 'Medical devices and equipment for healthcare needs.',
        img: [
          assets.monitoring,
          assets.respiratory,
          assets.mobility,
          assets.diagnostic,
          assets.surgical,
          assets.daily,
          assets.wound,
          assets.orthopedic,
        ][index],
        rating: '4.5',
        category: 'MEDICAL_DEVICES',
      };
      navigation.navigate('Items', { item: fallbackDevice });
    }
  };

  const handleHealthProductPress = index => {
    const product = healthProductsData[index];
    if (product) {
      navigation.navigate('Items', { item: product });
    } else {
      const fallbackProduct = {
        id: `health_${index}`,
        title: [
          'First Aid Essentials',
          'Over-the-Counter',
          'Health Monitoring',
          'Protection & Hygiene',
          'Vitamins & Nutrition',
          'Supplements',
          'Personal Care',
          'Baby Care',
        ][index],
        price: '₹499.00',
        desc: 'Health and wellness products for daily care.',
        img: [
          assets.firstaid,
          assets.otc,
          assets.healthmonitor,
          assets.protection,
          assets.vitamins,
          assets.supplements,
          assets.personalcare,
          assets.babycare,
        ][index],
        rating: '4.5',
        category: 'HEALTH_PRODUCTS',
      };
      navigation.navigate('Items', { item: fallbackProduct });
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

  const renderGridItem = (imageSource, label, onPress) => (
    <TouchableOpacity
      style={styles.gridItem}
      onPress={onPress}
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

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header top */}
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

            {/* User Profile Button - NOW NAVIGATES TO MyProfile */}
            <TouchableOpacity
              style={styles.userProfileButton}
              onPress={handleUserProfilePress}
              activeOpacity={0.7}
            >
              <Image
                source={assets.user}
                style={styles.userIcon}
                resizeMode="cover"
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.headerTitle}>
            Get your health essentials delivered when you need them.
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
                  { tintColor: activeTab === c.id ? bgColor : '#999' },
                ]}
                resizeMode="contain"
              />
              <Text
                style={[
                  styles.catLabel,
                  { color: activeTab === c.id ? bgColor : '#333' },
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

        {/* Special Offers */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Special Offers</Text>
          <TouchableOpacity onPress={handleSeeAllOffers} activeOpacity={0.7}>
            <Text style={[styles.sectionLink, { color: bgColor }]}>
              See All
            </Text>
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

        {/* Medical Devices */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Medical Devices</Text>
        </View>

        <View style={styles.gridWrap}>
          {medicalDevicesGridData.map((g, idx) => (
            <View key={g.id} style={styles.gridItemWrapper}>
              {renderGridItem(
                idx % 8 === 0
                  ? assets.monitoring
                  : idx % 8 === 1
                  ? assets.respiratory
                  : idx % 8 === 2
                  ? assets.mobility
                  : idx % 8 === 3
                  ? assets.diagnostic
                  : idx % 8 === 4
                  ? assets.surgical
                  : idx % 8 === 5
                  ? assets.daily
                  : idx % 8 === 6
                  ? assets.wound
                  : assets.orthopedic,
                idx % 8 === 0
                  ? 'Monitoring Devices'
                  : idx % 8 === 1
                  ? 'Respiratory Devices'
                  : idx % 8 === 2
                  ? 'Mobility Aids'
                  : idx % 8 === 3
                  ? 'Diagnostic Devices'
                  : idx % 8 === 4
                  ? 'Surgical & Clinical Instruments'
                  : idx % 8 === 5
                  ? 'Daily Medical Use Devices'
                  : idx % 8 === 6
                  ? 'Wound Care Devices'
                  : 'Orthopedic Devices',
                () => handleMedicalDevicePress(idx),
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
                idx % 8 === 0
                  ? assets.firstaid
                  : idx % 8 === 1
                  ? assets.otc
                  : idx % 8 === 2
                  ? assets.healthmonitor
                  : idx % 8 === 3
                  ? assets.protection
                  : idx % 8 === 4
                  ? assets.vitamins
                  : idx % 8 === 5
                  ? assets.supplements
                  : idx % 8 === 6
                  ? assets.personalcare
                  : assets.babycare,
                idx % 8 === 0
                  ? 'First Aid Essentials'
                  : idx % 8 === 1
                  ? 'Over-the-Counter'
                  : idx % 8 === 2
                  ? 'Health Monitoring'
                  : idx % 8 === 3
                  ? 'Protection & Hygiene'
                  : idx % 8 === 4
                  ? 'Vitamins & Nutrition'
                  : idx % 8 === 5
                  ? 'Supplements'
                  : idx % 8 === 6
                  ? 'Personal Care'
                  : 'Baby Care',
                () => handleHealthProductPress(idx),
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

  // HEADER - CORRECTED
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
    // FIXED: Changed from responsiveSize(6) and responsiveSize(16) to match ElectronicsHome
    marginTop: Platform.OS === 'ios' ? 6 : 10,
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
  userProfileButton: {
    padding: responsiveSize(4),
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

  // CATEGORY
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

  // SECTION
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

  // SPECIAL CARD
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

  // STORE CARDS
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
    fontWeight: '600',
  },

  // GRID
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
    fontSize: responsiveSize(11.5),
    textAlign: 'center',
    marginTop: responsiveSize(6),
    color: '#333',
    fontWeight: '600',
    lineHeight: responsiveSize(14),
  },
});