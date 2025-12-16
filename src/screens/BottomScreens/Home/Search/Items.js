// File: Items.js
import React, { useRef, useState } from 'react';
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
} from 'react-native';
import { useColor } from '../../../../util/ColorSwitcher';

const { width } = Dimensions.get('window');

// Responsive sizing
const responsiveSize = size => (width / 375) * size;

// Platform detection
const isIOS = Platform.OS === 'ios';

// Responsive font scaling
const fontScale = size => (isIOS ? size * 0.95 : size);

// Sample products
const PRODUCTS = [
  { id: 'p1', title: 'I Phone 17 Plus', seller: 'Ram store', price: '₹ 450.50', time: '10-15 mins', rating: '4.4', img: require('../../../../assets/mobile3.png') },
  { id: 'p2', title: 'I Phone 17 Plus', seller: 'Ram store', price: '₹ 450.50', time: '10-15 mins', rating: '4.5', img: require('../../../../assets/mobile4.png') },
  { id: 'p3', title: 'I Phone 17 Plus', seller: 'Ram store', price: '₹ 450.50', time: '10-15 mins', rating: '4.6', img: require('../../../../assets/mobile4.png') },
  { id: 'p4', title: 'I Phone 17 Plus', seller: 'Ram store', price: '₹ 450.50', time: '10-15 mins', rating: '4.3', img: require('../../../../assets/mobile3.png') },
  { id: 'p5', title: 'I Phone 17 Plus', seller: 'Ram store', price: '₹ 450.50', time: '10-15 mins', rating: '4.4', img: require('../../../../assets/mobile3.png') },
  { id: 'p6', title: 'I Phone 17 Plus', seller: 'Ram store', price: '₹ 450.50', time: '10-15 mins', rating: '4.2', img: require('../../../../assets/mobile4.png') },
];

const CATEGORIES = [
  { name: 'All', icon: require('../../../../assets/mobile3.png') },
  { name: 'I - Phone', icon: require('../../../../assets/mobile3.png') },
  { name: 'Motorola', icon: require('../../../../assets/mobile4.png') },
  { name: 'Xiaomi', icon: require('../../../../assets/mobile3.png') },
  { name: 'POCO', icon: require('../../../../assets/mobile4.png') },
];

const safeVibrate = (duration = 30) => {
  try {
    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      const Vibration = require('react-native').Vibration;
      if (Vibration && typeof Vibration.vibrate === 'function') Vibration.vibrate(duration);
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

  const ensureAnimated = (map, id, initial = 1) => {
    if (!map[id]) map[id] = new Animated.Value(initial);
    return map[id];
  };

  const toggleLike = (id) => {
    const anim = ensureAnimated(heartScales, id, 1);
    Animated.sequence([
      Animated.timing(anim, { 
        toValue: 1.3, 
        duration: 120, 
        useNativeDriver: true 
      }),
      Animated.timing(anim, { 
        toValue: 1, 
        duration: 120, 
        useNativeDriver: true 
      }),
    ]).start();
    safeVibrate(40);
    likedMapRef[id] = !likedMapRef[id];
    setTick((t) => t + 1);
  };

  const toggleAdd = (id) => {
    const anim = ensureAnimated(plusScales, id, 1);
    Animated.sequence([
      Animated.timing(anim, { 
        toValue: 1.15, 
        duration: 110, 
        useNativeDriver: true 
      }),
      Animated.timing(anim, { 
        toValue: 1, 
        duration: 110, 
        useNativeDriver: true 
      }),
    ]).start();
    safeVibrate(20);
    addedMapRef[id] = !addedMapRef[id];
    setTick((t) => t + 1);
  };

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

          <View style={[styles.searchContainer, { backgroundColor: textColor }]}>
            <Image
              source={require('../../../../assets/search.png')}
              style={[styles.searchIcon, { tintColor: bgColor + '80' }]}
            />
            <Text style={[styles.searchText, { color: bgColor + '80' }]}>
              Find for Grocery Item's..
            </Text>
          </View>

          <TouchableOpacity style={[styles.filterBtn, { backgroundColor: textColor }]}>
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
              Deliver to :{' '}
              <Text style={[styles.deliverAddr, { color: textColor, fontWeight: '700' }]}>
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
        contentContainerStyle={{ paddingBottom: responsiveSize(120) }}
      >
        <View style={styles.sectionTitleContainer}>
          <Text style={[styles.sectionTitleText, { color: bgColor }]}>
            Mobile & Phone's (All)
          </Text>
          <View style={[styles.titleLine, { backgroundColor: bgColor + '30' }]} />
        </View>

        <View style={styles.categoriesWrapper}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScroll}
          >
            {CATEGORIES.map((cat) => {
              const active = cat.name === activeCategory;
              return (
                <TouchableOpacity
                  key={cat.name}
                  onPress={() => setActiveCategory(cat.name)}
                  style={[
                    styles.categoryItem,
                    active && {
                      borderBottomWidth: responsiveSize(3),
                      borderBottomColor: bgColor,
                      paddingBottom: responsiveSize(6),
                    },
                  ]}
                >
                  <View style={[styles.categoryIconWrap, { 
                    backgroundColor: active ? bgColor + '15' : textColor,
                    borderColor: active ? bgColor + '30' : '#f0f0f0',
                    borderWidth: 1
                  }]}>
                    <Image
                      source={cat.icon}
                      style={[
                        styles.categoryIconFull,
                        { 
                          tintColor: active ? bgColor : '#999'
                        }
                      ]}
                    />
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

        <View style={[styles.popularSection, { backgroundColor: textColor }]}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: bgColor }]}>Popular mobiles</Text>
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
                  style={[styles.card, idx % 2 === 0 ? styles.cardLeft : styles.cardRight]}
                >
                  <View style={[styles.cardImageWrap, { backgroundColor: bgColor + '08' }]}>
                    <Image source={p.img} style={styles.cardImageCover} />

                    <View style={styles.ratingBadgeBottom}>
                      <Text style={[styles.ratingTextBadge, { color: bgColor }]}>{p.rating}</Text>
                      <Image
                        source={require('../../../../assets/star.png')}
                        style={[styles.starIconSmall, { tintColor: bgColor }]}
                      />
                    </View>

                    <TouchableOpacity
                      style={[
                        styles.heartBtn,
                        { 
                          backgroundColor: liked 
                            ? 'rgba(255, 255, 255, 0.95)' 
                            : 'rgba(255, 255, 255, 0.9)',
                          shadowColor: liked ? bgColor : '#000'
                        }
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
                    <Text style={[styles.cardTitle, { color: bgColor }]} numberOfLines={1}>
                      {p.title}
                    </Text>
                    <Text style={[styles.cardSeller, { color: bgColor + '80' }]} numberOfLines={1}>
                      Sold By : {p.seller}
                    </Text>

                    <View style={styles.priceRow}>
                      <Text style={[styles.priceText, { color: bgColor }]}>{p.price}</Text>
                    </View>

                    <View style={styles.timeRow}>
                      <Image
                        source={require('../../../../assets/clock.png')}
                        style={[styles.clockIcon, { tintColor: bgColor }]}
                      />
                      <Text style={[styles.timeText, { color: bgColor + '80' }]}>{p.time}</Text>
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
                    onPress={() => toggleAdd(cardKey)}
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
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  statusBarSpacer: { 
    height: Platform.OS === 'ios' ? responsiveSize(40) : 0 
  },

  topBlue: { 
    width: '100%', 
    paddingBottom: responsiveSize(12), 
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight 
  },

  topHeader: {
    height: responsiveSize(68),
    paddingHorizontal: responsiveSize(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Platform.OS === 'ios' ? responsiveSize(10) : 0,
  },

  iconBtn: {
    width: responsiveSize(40),
    height: responsiveSize(40),
    borderRadius: responsiveSize(10),
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: { 
        shadowColor: '#000', 
        shadowOpacity: 0.1, 
        shadowRadius: 4, 
        shadowOffset: { width: 0, height: 2 } 
      },
      android: { elevation: 3 },
    }),
  },

  icon: { 
    width: responsiveSize(18), 
    height: responsiveSize(18), 
    resizeMode: 'contain' 
  },

  searchContainer: {
    flex: 1,
    marginHorizontal: responsiveSize(12),
    height: responsiveSize(40),
    borderRadius: responsiveSize(10),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveSize(12),
    ...Platform.select({ 
      ios: { 
        shadowColor: '#000', 
        shadowOpacity: 0.06, 
        shadowRadius: 4, 
        shadowOffset: { width: 0, height: 2 } 
      }, 
      android: { elevation: 2 } 
    }),
  },

  searchIcon: { 
    width: responsiveSize(16), 
    height: responsiveSize(16), 
    resizeMode: 'contain' 
  },

  searchText: { 
    marginLeft: responsiveSize(10), 
    fontSize: fontScale(responsiveSize(13)), 
    fontWeight: '500', 
    flex: 1 
  },

  filterBtn: {
    width: responsiveSize(40),
    height: responsiveSize(40),
    borderRadius: responsiveSize(10),
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({ 
      ios: { 
        shadowColor: '#000', 
        shadowOpacity: 0.06, 
        shadowRadius: 4, 
        shadowOffset: { width: 0, height: 2 } 
      }, 
      android: { elevation: 2 } 
    }),
  },

  filterIcon: { 
    width: responsiveSize(18), 
    height: responsiveSize(18), 
    resizeMode: 'contain' 
  },

  deliverRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: responsiveSize(16), 
    paddingHorizontal: responsiveSize(16), 
    height: responsiveSize(42) 
  },

  locIconWrap: {
    width: responsiveSize(42),
    height: responsiveSize(42),
    borderRadius: responsiveSize(10),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: responsiveSize(10),
    ...Platform.select({ 
      ios: { 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.08, 
        shadowRadius: 3 
      }, 
      android: { elevation: 2 } 
    }),
  },

  locIcon: { 
    width: responsiveSize(18), 
    height: responsiveSize(18), 
    resizeMode: 'contain' 
  },

  deliverTextWrap: { 
    flex: 1, 
    justifyContent: 'center' 
  },

  deliverText: { 
    fontSize: fontScale(responsiveSize(14)), 
    fontWeight: '500', 
    lineHeight: responsiveSize(20) 
  },

  deliverAddr: { 
    fontSize: fontScale(responsiveSize(14)) 
  },

  dropdownBtn: { 
    padding: responsiveSize(8), 
    marginLeft: responsiveSize(4) 
  },

  dropdownIcon: { 
    width: responsiveSize(12), 
    height: responsiveSize(12), 
    resizeMode: 'contain' 
  },

  content: { flex: 1 },

  sectionTitleContainer: { 
    paddingHorizontal: responsiveSize(16), 
    paddingTop: responsiveSize(20), 
    paddingBottom: responsiveSize(10) 
  },

  sectionTitleText: { 
    fontSize: fontScale(responsiveSize(18)), 
    fontWeight: '700', 
    marginBottom: responsiveSize(8) 
  },

  titleLine: { 
    height: 1, 
    width: '100%' 
  },

  categoriesWrapper: { 
    marginTop: responsiveSize(8), 
    paddingLeft: responsiveSize(16), 
    paddingRight: responsiveSize(8), 
    paddingBottom: responsiveSize(16) 
  },

  categoriesScroll: { 
    alignItems: 'center', 
    paddingRight: responsiveSize(8) 
  },

  categoryItem: { 
    width: responsiveSize(70), 
    alignItems: 'center', 
    marginRight: responsiveSize(12), 
    paddingVertical: responsiveSize(6) 
  },

  categoryIconWrap: {
    width: responsiveSize(56),
    height: responsiveSize(56),
    borderRadius: responsiveSize(28),
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    ...Platform.select({ 
      ios: { 
        shadowColor: '#000', 
        shadowOpacity: 0.05, 
        shadowRadius: 3, 
        shadowOffset: { width: 0, height: 1 } 
      }, 
      android: { elevation: 1 } 
    }),
  },

  categoryIconFull: {
    width: responsiveSize(30),
    height: responsiveSize(30),
    resizeMode: 'contain',
  },

  categoryLabel: { 
    marginTop: responsiveSize(6), 
    fontSize: fontScale(responsiveSize(12)), 
    textAlign: 'center', 
    fontWeight: '500', 
    width: '100%' 
  },

  categoryLabelActive: { 
    fontWeight: '700' 
  },

  popularSection: { 
    backgroundColor: '#fff', 
    paddingTop: responsiveSize(4) 
  },

  sectionHeader: { 
    paddingHorizontal: responsiveSize(16), 
    paddingTop: responsiveSize(10), 
    paddingBottom: responsiveSize(12) 
  },

  sectionTitle: { 
    fontSize: fontScale(responsiveSize(18)), 
    fontWeight: '700', 
    letterSpacing: 0.3 
  },

  gridWrapper: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between', 
    paddingHorizontal: responsiveSize(16) 
  },

  card: {
    width: (width - responsiveSize(48)) / 2,
    backgroundColor: '#fff',
    borderRadius: responsiveSize(12),
    marginBottom: responsiveSize(16),
    paddingBottom: responsiveSize(14),
    borderWidth: 1,
    borderColor: '#f0f0f0',
    overflow: 'hidden',
    position: 'relative',
  },

  cardLeft: { 
    marginRight: responsiveSize(8) 
  },

  cardRight: { 
    marginLeft: responsiveSize(8) 
  },

  cardImageWrap: {
    width: '100%',
    height: responsiveSize(140),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    borderTopLeftRadius: responsiveSize(12),
    borderTopRightRadius: responsiveSize(12),
  },

  cardImageCover: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  ratingBadgeBottom: {
    position: 'absolute',
    left: responsiveSize(8),
    bottom: responsiveSize(8),
    paddingHorizontal: responsiveSize(8),
    paddingVertical: responsiveSize(4),
    borderRadius: responsiveSize(8),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.92)',
    ...Platform.select({ 
      ios: { 
        shadowColor: '#000', 
        shadowOpacity: 0.06, 
        shadowOffset: { width: 0, height: 1 }, 
        shadowRadius: 2 
      }, 
      android: { elevation: 2 } 
    }),
  },

  starIconSmall: { 
    width: responsiveSize(12), 
    height: responsiveSize(12), 
    marginLeft: responsiveSize(6), 
    resizeMode: 'contain' 
  },

  ratingTextBadge: { 
    fontSize: fontScale(responsiveSize(11)), 
    fontWeight: '700' 
  },

  heartBtn: {
    position: 'absolute',
    right: responsiveSize(8),
    top: responsiveSize(8),
    width: responsiveSize(32),
    height: responsiveSize(32),
    borderRadius: responsiveSize(16),
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
    width: responsiveSize(18), 
    height: responsiveSize(18), 
    resizeMode: 'contain' 
  },

  cardBody: { 
    paddingHorizontal: responsiveSize(10), 
    paddingTop: responsiveSize(8), 
    paddingBottom: responsiveSize(8) 
  },

  cardTitle: { 
    fontSize: fontScale(responsiveSize(14)), 
    fontWeight: '700', 
    marginBottom: responsiveSize(4), 
    lineHeight: responsiveSize(18) 
  },

  cardSeller: { 
    fontSize: fontScale(responsiveSize(12)), 
    marginBottom: responsiveSize(8), 
    lineHeight: responsiveSize(16) 
  },

  priceRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'flex-start', 
    marginTop: responsiveSize(2) 
  },

  priceText: { 
    fontSize: fontScale(responsiveSize(15)), 
    fontWeight: '700', 
    flex: 1 
  },

  timeRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: responsiveSize(8) 
  },

  clockIcon: { 
    width: responsiveSize(14), 
    height: responsiveSize(14), 
    marginRight: responsiveSize(6), 
    resizeMode: 'contain' 
  },

  timeText: { 
    fontSize: fontScale(responsiveSize(12)), 
    fontWeight: '500' 
  },

  plusBtn: {
    position: 'absolute',
    right: responsiveSize(10),
    bottom: responsiveSize(10),
    width: responsiveSize(38),
    height: responsiveSize(38),
    borderRadius: responsiveSize(19),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
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
    width: responsiveSize(18), 
    height: responsiveSize(18), 
    resizeMode: 'contain' 
  },
});