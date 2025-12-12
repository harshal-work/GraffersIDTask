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
import { useColor } from '../../../../util/ColorSwitcher';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

const { width } = Dimensions.get('window');
const responsiveSize = (size) => (width / 375) * size;

const CATEGORIES = [
  { id: '1', title: 'Laptop', img: require('../../../../assets/mobile2.png') },
  { id: '2', title: 'Monitor', img: require('../../../../assets/mobile3.png') },
  { id: '3', title: 'AISA', img: require('../../../../assets/mobile.png') },
  { id: '4', title: 'Router', img: require('../../../../assets/mobile2.png') },
];

export default function Filter({ navigation }) {
  const { bgColor, textColor } = useColor();
  const [selected, setSelected] = useState({});
  const [rating, setRating] = useState(4);
  const [sortBy, setSortBy] = useState('Popular');
  const [priceRange, setPriceRange] = useState([5000, 50000]);

  const toggle = id => {
    setSelected(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePriceChange = (values) => {
    setPriceRange(values);
  };

  const formatCurrency = (amount) => {
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
            source={require('../../../../assets/back.png')} 
            style={[styles.icon, { tintColor: bgColor }]} 
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Filters</Text>
        
        <View style={{ width: responsiveSize(40) }} />
      </View>

      <ScrollView 
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Categories */}
        <Text style={styles.sectionTitle}>Categories</Text>

        <View style={styles.catWrap}>
          {CATEGORIES.map(cat => (
            <TouchableOpacity
              key={cat.id}
              onPress={() => toggle(cat.id)}
              style={[
                styles.catBox, 
                selected[cat.id] && [styles.catActive, { backgroundColor: bgColor }]
              ]}
            >
              <Image source={cat.img} style={styles.catImg} />
              <Text style={[styles.catTxt, selected[cat.id] && { color: '#fff' }]}>
                {cat.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Sort By */}
        <Text style={[styles.sectionTitle, { marginTop: responsiveSize(20) }]}>Sort by</Text>

        <View style={styles.sortRow}>
          {['Popular', 'Free delivery', 'Nearest me', 'Cost low to high', 'Delivery time'].map(option => (
            <TouchableOpacity
              key={option}
              style={[
                styles.sortBox, 
                sortBy === option && [styles.sortActive, { backgroundColor: bgColor }]
              ]}
              onPress={() => setSortBy(option)}
            >
              <Text style={[styles.sortTxt, sortBy === option && { color: '#fff' }]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Rating */}
        <Text style={[styles.sectionTitle, { marginTop: responsiveSize(20) }]}>Rating</Text>

        <View style={styles.ratingContainer}>
          {[5, 4, 3, 2, 1].map(num => (
            <TouchableOpacity
              key={num}
              style={[
                styles.ratingBtn, 
                rating === num && [styles.ratingActive, { backgroundColor: bgColor }]
              ]}
              onPress={() => setRating(num)}
            >
              <Text style={[styles.ratingTxt, rating === num && { color: '#fff' }]}>
                {num} ★
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Price Range */}
        <Text style={[styles.sectionTitle, { marginTop: responsiveSize(20) }]}>Price Range</Text>
        
        <View style={styles.priceRangeContainer}>
          <View style={styles.priceLabels}>
            <Text style={styles.priceLabel}>Min: {formatCurrency(priceRange[0])}</Text>
            <Text style={styles.priceLabel}>Max: {formatCurrency(priceRange[1])}</Text>
          </View>
          
          <View style={styles.sliderContainer}>
            <MultiSlider
              values={[priceRange[0], priceRange[1]]}
              sliderLength={width - responsiveSize(48)}
              onValuesChange={handlePriceChange}
              min={1000}
              max={100000}
              step={1000}
              allowOverlap={false}
              snapped={true}
              markerStyle={[styles.markerStyle, { backgroundColor: bgColor }]}
              selectedStyle={{ backgroundColor: bgColor }}
              unselectedStyle={{ backgroundColor: '#E0E0E0' }}
              trackStyle={styles.trackStyle}
              pressedMarkerStyle={[styles.pressedMarkerStyle, { backgroundColor: bgColor }]}
            />
          </View>
          
          <View style={styles.priceRangeLabels}>
            <Text style={styles.priceRangeMin}>{formatCurrency(1000)}</Text>
            <Text style={styles.priceRangeMax}>{formatCurrency(100000)}</Text>
          </View>
        </View>

        {/* Reset / Apply */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.resetBtn}
            onPress={() => {
              setSelected({});
              setRating(4);
              setSortBy('Popular');
              setPriceRange([5000, 50000]);
            }}
          >
            <Text style={styles.resetTxt}>RESET</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.applyBtn, { backgroundColor: bgColor }]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.applyTxt}>APPLY</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: responsiveSize(50) }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff' 
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
    height: responsiveSize(20) 
  },

  content: { 
    padding: responsiveSize(16) 
  },
  sectionTitle: { 
    fontSize: responsiveSize(16), 
    fontWeight: '700', 
    marginBottom: responsiveSize(10),
    color: '#000',
  },

  /* Categories */
  catWrap: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    gap: responsiveSize(10) 
  },
  catBox: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: responsiveSize(10),
    borderRadius: responsiveSize(10),
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  catActive: {},
  catImg: { 
    width: responsiveSize(28), 
    height: responsiveSize(28), 
    marginRight: responsiveSize(8) 
  },
  catTxt: { 
    color: '#000',
    fontSize: responsiveSize(13),
    fontWeight: '500',
  },

  /* Sort By */
  sortRow: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    gap: responsiveSize(10) 
  },
  sortBox: {
    paddingHorizontal: responsiveSize(12),
    paddingVertical: responsiveSize(10),
    backgroundColor: '#fff',
    borderRadius: responsiveSize(10),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  sortActive: {},
  sortTxt: { 
    fontSize: responsiveSize(12),
    color: '#000',
    fontWeight: '500',
  },

  /* Rating */
  ratingContainer: { 
    flexDirection: 'row', 
    flexWrap: 'wrap' 
  },
  ratingBtn: {
    paddingVertical: responsiveSize(12),
    paddingHorizontal: responsiveSize(16),
    backgroundColor: '#fff',
    borderRadius: responsiveSize(10),
    marginRight: responsiveSize(10),
    marginBottom: responsiveSize(10),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
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
    fontSize: responsiveSize(14),
    color: '#000',
  },

  /* Price Range */
  priceRangeContainer: {
    backgroundColor: '#fff',
    borderRadius: responsiveSize(12),
    padding: responsiveSize(16),
    marginTop: responsiveSize(5),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  priceLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: responsiveSize(20),
  },
  priceLabel: {
    fontSize: responsiveSize(14),
    fontWeight: '600',
    color: '#000',
  },
  sliderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: responsiveSize(10),
  },
  trackStyle: {
    height: responsiveSize(4),
    borderRadius: responsiveSize(2),
  },
  markerStyle: {
    height: responsiveSize(24),
    width: responsiveSize(24),
    borderRadius: responsiveSize(12),
    borderWidth: responsiveSize(2),
    borderColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  pressedMarkerStyle: {
    height: responsiveSize(28),
    width: responsiveSize(28),
    borderRadius: responsiveSize(14),
  },
  priceRangeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: responsiveSize(10),
  },
  priceRangeMin: {
    fontSize: responsiveSize(12),
    color: '#666',
    fontWeight: '500',
  },
  priceRangeMax: {
    fontSize: responsiveSize(12),
    color: '#666',
    fontWeight: '500',
  },

  /* Buttons */
  buttonContainer: { 
    flexDirection: 'row', 
    marginTop: responsiveSize(30) 
  },
  resetBtn: {
    flex: 1,
    height: responsiveSize(50),
    borderRadius: responsiveSize(12),
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: responsiveSize(14),
    borderWidth: responsiveSize(2),
    borderColor: '#E0E0E0',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  resetTxt: { 
    fontWeight: '700',
    fontSize: responsiveSize(14),
    color: '#000',
  },
  applyBtn: {
    flex: 1,
    height: responsiveSize(50),
    borderRadius: responsiveSize(12),
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
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
    fontSize: responsiveSize(14),
  },
});