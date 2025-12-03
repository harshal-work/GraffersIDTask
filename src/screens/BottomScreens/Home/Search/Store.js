import React, { useState, useRef } from 'react';
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
  Vibration
} from 'react-native';
import { useColor } from '../../../../util/ColorSwitcher';

const { width } = Dimensions.get('window');
const responsiveSize = (size) => (width / 375) * size;

// Safe vibration function
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

export default function Store({ route, navigation }) {
  const { store } = route.params;
  const { bgColor, textColor } = useColor();
  
  const [isLiked, setIsLiked] = useState(false);
  
  // Animation ref
  const heartScale = useRef(new Animated.Value(1)).current;

  const handleHeartPress = () => {
    safeVibrate(40);
    
    Animated.sequence([
      Animated.timing(heartScale, {
        toValue: 1.3,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(heartScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    setIsLiked(!isLiked);
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

        <Text style={styles.headerTitle}>Store Details</Text>
        
        <View style={{ width: responsiveSize(40) }} />
      </View>

      <ScrollView 
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Store Image with Rating Badge */}
        <View style={styles.imageContainer}>
          <Image source={store.img} style={styles.mainImage} />
          
          {/* Rating Badge - Consistent with Search Screen */}
          <View style={[styles.ratingBadge, { backgroundColor: bgColor }]}>
            <Image 
              source={require('../../../../assets/star.png')} 
              style={[styles.starIcon, { tintColor: '#fff' }]} 
            />
            <Text style={styles.ratingText}>{store.rating}</Text>
          </View>
        </View>

        {/* Store Name with Heart Button */}
        <View style={styles.storeHeaderRow}>
          <View style={styles.storeTitleContainer}>
            <Text style={styles.name}>{store.name}</Text>
            
            {/* Location Text - Consistent with Search Screen */}
            <View style={styles.locationRow}>
              <Image 
                source={require('../../../../assets/location.png')} 
                style={[styles.locationIcon, { tintColor: bgColor }]} 
              />
              <Text style={styles.locationText}>{store.locationText}</Text>
            </View>
          </View>
          
          {/* Heart Button - Consistent with Search Screen */}
          <TouchableOpacity
            onPress={handleHeartPress}
            style={[
              styles.heartWrapper,
              { 
                backgroundColor: isLiked ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.3)',
              }
            ]}
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
        </View>

        {/* Store Details - Consistent with Search Screen */}
        <View style={styles.detailsContainer}>
          <Text style={styles.sectionTitle}>Store Information</Text>
          
          {/* Distance */}
          <View style={styles.detailRow}>
            <View style={styles.detailIconContainer}>
              <Image 
                source={require('../../../../assets/location2.png')} 
                style={[styles.detailIcon, {  tintColor: bgColor }]} 
              />
            </View>
            <View style={styles.detailTextContainer}>
              <Text style={styles.detailLabel}>Distance</Text>
              <Text style={styles.detailValue}>{store.distance}</Text>
            </View>
          </View>

          {/* Delivery Time */}
          <View style={styles.detailRow}>
            <View style={styles.detailIconContainer}>
              <Image 
                source={require('../../../../assets/clock.png')} 
                style={[styles.detailIcon, {  tintColor: bgColor}]} 
              />
            </View>
            <View style={styles.detailTextContainer}>
              <Text style={styles.detailLabel}>Delivery Time</Text>
              <Text style={styles.detailValue}>{store.time}</Text>
            </View>
          </View>

          {/* Orders */}
          <View style={styles.detailRow}>
            <View style={styles.detailIconContainer}>
              <Image 
                source={require('../../../../assets/order.png')} 
                style={[styles.detailIcon, {  tintColor: bgColor }]} 
              />
            </View>
            <View style={styles.detailTextContainer}>
              <Text style={styles.detailLabel}>Orders Delivered</Text>
              <Text style={styles.detailValue}>{store.orders}</Text>
            </View>
          </View>
        </View>

        {/* Visit Store Button */}
        <TouchableOpacity
          style={[styles.visitBtn, { backgroundColor: bgColor }]}
          onPress={() => navigation.navigate('Main')}
        >
          <Text style={styles.visitTxt}>Visit Store</Text>
        </TouchableOpacity>

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
    padding: responsiveSize(16),
    paddingBottom: responsiveSize(40),
  },
  
  /* Image Container */
  imageContainer: {
    position: 'relative',
    marginBottom: responsiveSize(15),
  },
  mainImage: { 
    width: '100%', 
    height: responsiveSize(240), 
    borderRadius: responsiveSize(12),
  },
  
  /* Rating Badge - Consistent with Search Screen */
  ratingBadge: {
    position: 'absolute',
    bottom: responsiveSize(10),
    right: responsiveSize(10),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveSize(10),
    paddingVertical: responsiveSize(6),
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
  starIcon: { 
    width: responsiveSize(12), 
    height: responsiveSize(12), 
    marginRight: responsiveSize(4),
  },
  ratingText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: responsiveSize(12),
  },
  
  /* Store Header Row */
  storeHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: responsiveSize(20),
  },
  storeTitleContainer: {
    flex: 1,
  },
  name: { 
    fontSize: responsiveSize(22), 
    fontWeight: '800', 
    color: '#000',
    marginBottom: responsiveSize(8),
  },
  
  /* Location Row - Consistent with Search Screen */
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsiveSize(4),
  },
  locationIcon: { 
    width: responsiveSize(16), 
    height: responsiveSize(16), 
    marginRight: responsiveSize(6),
  },
  locationText: { 
    color: '#666',
    fontSize: responsiveSize(14),
    flex: 1,
  },
  
  /* Heart Button - Consistent with Search Screen */
  heartWrapper: {
    width: responsiveSize(44),
    height: responsiveSize(44),
    borderRadius: responsiveSize(22),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: responsiveSize(10),
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
  heartIcon: {
    width: responsiveSize(22),
    height: responsiveSize(22),
  },
  
  /* Details Container */
  detailsContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: responsiveSize(12),
    padding: responsiveSize(16),
    marginBottom: responsiveSize(30),
  },
  
  sectionTitle: {
    fontSize: responsiveSize(18),
    fontWeight: '700',
    color: '#000',
    marginBottom: responsiveSize(16),
  },
  
  /* Detail Row - Consistent with Search Screen */
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveSize(12),
  },
  detailIconContainer: {
    width: responsiveSize(36),
    height: responsiveSize(36),
    borderRadius: responsiveSize(18),
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: responsiveSize(12),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  detailIcon: {
    width: responsiveSize(18),
    height: responsiveSize(18),
  },
  detailTextContainer: {
    flex: 1,
  },
  detailLabel: {
    fontSize: responsiveSize(12),
    color: '#666',
    fontWeight: '500',
    marginBottom: responsiveSize(2),
  },
  detailValue: {
    fontSize: responsiveSize(14),
    color: '#000',
    fontWeight: '600',
  },
  
  /* Visit Store Button */
  visitBtn: {
    paddingVertical: responsiveSize(16),
    borderRadius: responsiveSize(12),
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
  visitTxt: { 
    color: '#fff', 
    fontWeight: '700', 
    fontSize: responsiveSize(16) 
  },
});