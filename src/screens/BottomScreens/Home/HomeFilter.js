// File: src/screens/BottomScreens/Home/HomeFilter.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';
import { useColor } from '../../../util/ColorSwitcher';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

const { width } = Dimensions.get('window');
// Slightly reduced scaling to make everything smaller
const responsiveSize = size => (width / 400) * size;

// Category data specific for home screen
const HOME_CATEGORIES = [
  { id: '1', title: 'Grocery', img: require('../../../assets/grocery.png') },
  {
    id: '2',
    title: 'Electronics',
    img: require('../../../assets/electronics.png'),
  },
  { id: '3', title: 'Health', img: require('../../../assets/health.png') },
  { id: '4', title: 'Food', img: require('../../../assets/fruit.png') },
  { id: '6', title: 'Home', img: require('../../../assets/store.png') },
];

export default function HomeFilter({ navigation }) {
  const { bgColor } = useColor();
  const [selectedCategories, setSelectedCategories] = useState({});
  const [rating, setRating] = useState(4);
  const [sortBy, setSortBy] = useState('Popular');
  const [priceRange, setPriceRange] = useState([500, 5000]);
  const [distance, setDistance] = useState([1, 10]); // in km

  const toggleCategory = id => {
    setSelectedCategories(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePriceChange = values => {
    setPriceRange(values);
  };

  const handleDistanceChange = values => {
    setDistance(values);
  };

  const formatCurrency = amount => {
    return `₹${amount.toLocaleString('en-IN')}`;
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

        <Text style={styles.headerTitle}>Home Filters</Text>

        <View style={{ width: responsiveSize(34) }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Categories */}
        <Text style={styles.sectionTitle}>Categories</Text>

        <View style={styles.catWrap}>
          {HOME_CATEGORIES.map(cat => (
            <TouchableOpacity
              key={cat.id}
              onPress={() => toggleCategory(cat.id)}
              style={[
                styles.catBox,
                selectedCategories[cat.id] && [
                  styles.catActive,
                  { backgroundColor: bgColor },
                ],
              ]}
            >
              <Image source={cat.img} style={styles.catImg} />
              <Text
                style={[
                  styles.catTxt,
                  selectedCategories[cat.id] && { color: '#fff' },
                ]}
              >
                {cat.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Sort By */}
        <Text style={[styles.sectionTitle, { marginTop: responsiveSize(18) }]}>
          Sort by
        </Text>

        <View style={styles.sortRow}>
          {[
            'Popular',
            'Free delivery',
            'Nearest me',
            'Rating high to low',
            'Delivery time',
          ].map(option => (
            <TouchableOpacity
              key={option}
              style={[
                styles.sortBox,
                sortBy === option && [
                  styles.sortActive,
                  { backgroundColor: bgColor },
                ],
              ]}
              onPress={() => setSortBy(option)}
            >
              <Text
                style={[styles.sortTxt, sortBy === option && { color: '#fff' }]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Rating */}
        <Text style={[styles.sectionTitle, { marginTop: responsiveSize(18) }]}>
          Minimum Rating
        </Text>

        <View style={styles.ratingContainer}>
          {[5, 4, 3, 2, 1].map(num => (
            <TouchableOpacity
              key={num}
              style={[
                styles.ratingBtn,
                rating === num && [
                  styles.ratingActive,
                  { backgroundColor: bgColor },
                ],
              ]}
              onPress={() => setRating(num)}
            >
              <Text
                style={[styles.ratingTxt, rating === num && { color: '#fff' }]}
              >
                {num} ★
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Price Range */}
        <Text style={[styles.sectionTitle, { marginTop: responsiveSize(18) }]}>
          Price Range
        </Text>

        <View style={styles.rangeContainer}>
          <View style={styles.rangeLabels}>
            <Text style={styles.rangeLabel}>
              Min: {formatCurrency(priceRange[0])}
            </Text>
            <Text style={styles.rangeLabel}>
              Max: {formatCurrency(priceRange[1])}
            </Text>
          </View>

          <View style={styles.sliderContainer}>
            <MultiSlider
              values={[priceRange[0], priceRange[1]]}
              sliderLength={width - responsiveSize(44)}
              onValuesChange={handlePriceChange}
              min={100}
              max={10000}
              step={100}
              allowOverlap={false}
              snapped={true}
              markerStyle={[styles.markerStyle, { backgroundColor: bgColor }]}
              selectedStyle={{ backgroundColor: bgColor }}
              unselectedStyle={{ backgroundColor: '#E0E0E0' }}
              trackStyle={styles.trackStyle}
              pressedMarkerStyle={[
                styles.pressedMarkerStyle,
                { backgroundColor: bgColor },
              ]}
            />
          </View>

          <View style={styles.rangeLimitLabels}>
            <Text style={styles.rangeLimitText}>{formatCurrency(100)}</Text>
            <Text style={styles.rangeLimitText}>{formatCurrency(10000)}</Text>
          </View>
        </View>

        {/* Distance Range */}
        <Text style={[styles.sectionTitle, { marginTop: responsiveSize(18) }]}>
          Distance (km)
        </Text>

        <View style={styles.rangeContainer}>
          <View style={styles.rangeLabels}>
            <Text style={styles.rangeLabel}>Min: {distance[0]} km</Text>
            <Text style={styles.rangeLabel}>Max: {distance[1]} km</Text>
          </View>

          <View style={styles.sliderContainer}>
            <MultiSlider
              values={[distance[0], distance[1]]}
              sliderLength={width - responsiveSize(44)}
              onValuesChange={handleDistanceChange}
              min={0}
              max={20}
              step={1}
              allowOverlap={false}
              snapped={true}
              markerStyle={[styles.markerStyle, { backgroundColor: bgColor }]}
              selectedStyle={{ backgroundColor: bgColor }}
              unselectedStyle={{ backgroundColor: '#E0E0E0' }}
              trackStyle={styles.trackStyle}
              pressedMarkerStyle={[
                styles.pressedMarkerStyle,
                { backgroundColor: bgColor },
              ]}
            />
          </View>

          <View style={styles.rangeLimitLabels}>
            <Text style={styles.rangeLimitText}>0 km</Text>
            <Text style={styles.rangeLimitText}>20 km</Text>
          </View>
        </View>

        {/* Additional Filters */}
        <Text style={[styles.sectionTitle, { marginTop: responsiveSize(18) }]}>
          Additional Filters
        </Text>

        <View style={styles.additionalFilters}>
          {[
            'Free Delivery',
            'Open Now',
            'Offers Available',
            'Credit Card Accepted',
            'Home Delivery',
          ].map(filter => (
            <TouchableOpacity
              key={filter}
              style={styles.additionalFilterBox}
              activeOpacity={0.7}
            >
              <Text style={styles.additionalFilterText}>{filter}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Reset / Apply */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.resetBtn}
            onPress={() => {
              setSelectedCategories({});
              setRating(4);
              setSortBy('Popular');
              setPriceRange([500, 5000]);
              setDistance([1, 10]);
            }}
          >
            <Text style={styles.resetTxt}>RESET</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.applyBtn, { backgroundColor: bgColor }]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.applyTxt}>APPLY FILTERS</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: responsiveSize(40) }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  },

  content: {
    padding: responsiveSize(14),
  },
  sectionTitle: {
    fontSize: responsiveSize(14),
    fontWeight: '700',
    marginBottom: responsiveSize(8),
    color: '#000',
  },

  /* Categories */
  catWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: responsiveSize(8),
  },
  catBox: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: responsiveSize(8),
    borderRadius: responsiveSize(8),
    alignItems: 'center',
    minWidth: responsiveSize(90),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  catActive: {},
  catImg: {
    width: responsiveSize(24),
    height: responsiveSize(24),
    marginRight: responsiveSize(6),
  },
  catTxt: {
    color: '#000',
    fontSize: responsiveSize(11),
    fontWeight: '500',
  },

  /* Sort By */
  sortRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: responsiveSize(8),
  },
  sortBox: {
    paddingHorizontal: responsiveSize(10),
    paddingVertical: responsiveSize(8),
    backgroundColor: '#fff',
    borderRadius: responsiveSize(8),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  sortActive: {},
  sortTxt: {
    fontSize: responsiveSize(11),
    color: '#000',
    fontWeight: '500',
  },

  /* Rating */
  ratingContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  ratingBtn: {
    paddingVertical: responsiveSize(9),
    paddingHorizontal: responsiveSize(12),
    backgroundColor: '#fff',
    borderRadius: responsiveSize(8),
    marginRight: responsiveSize(8),
    marginBottom: responsiveSize(8),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  ratingActive: {},
  ratingTxt: {
    fontWeight: '700',
    fontSize: responsiveSize(12),
    color: '#000',
  },

  /* Range Containers (Price & Distance) */
  rangeContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: responsiveSize(10),
    padding: responsiveSize(12),
    marginTop: responsiveSize(4),
    marginBottom: responsiveSize(8),
  },
  rangeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: responsiveSize(14),
  },
  rangeLabel: {
    fontSize: responsiveSize(12),
    fontWeight: '600',
    color: '#000',
  },
  sliderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: responsiveSize(8),
  },
  trackStyle: {
    height: responsiveSize(3),
    borderRadius: responsiveSize(2),
  },
  markerStyle: {
    height: responsiveSize(20),
    width: responsiveSize(20),
    borderRadius: responsiveSize(10),
    borderWidth: responsiveSize(2),
    borderColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  pressedMarkerStyle: {
    height: responsiveSize(24),
    width: responsiveSize(24),
    borderRadius: responsiveSize(12),
  },
  rangeLimitLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: responsiveSize(8),
  },
  rangeLimitText: {
    fontSize: responsiveSize(10),
    color: '#666',
    fontWeight: '500',
  },

  /* Additional Filters */
  additionalFilters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: responsiveSize(8),
    marginTop: responsiveSize(4),
  },
  additionalFilterBox: {
    paddingHorizontal: responsiveSize(10),
    paddingVertical: responsiveSize(8),
    backgroundColor: '#fff',
    borderRadius: responsiveSize(8),
    borderWidth: 1,
    borderColor: '#E0E0E0',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  additionalFilterText: {
    fontSize: responsiveSize(11),
    color: '#000',
    fontWeight: '500',
  },

  /* Buttons */
  buttonContainer: {
    flexDirection: 'row',
    marginTop: responsiveSize(24),
  },
  resetBtn: {
    flex: 1,
    height: responsiveSize(44),
    borderRadius: responsiveSize(10),
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: responsiveSize(10),
    borderWidth: responsiveSize(1.5),
    borderColor: '#E0E0E0',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  resetTxt: {
    fontWeight: '700',
    fontSize: responsiveSize(12),
    color: '#000',
  },
  applyBtn: {
    flex: 1,
    height: responsiveSize(44),
    borderRadius: responsiveSize(10),
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.18,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  applyTxt: {
    fontWeight: '700',
    color: '#fff',
    fontSize: responsiveSize(12),
  },
});
