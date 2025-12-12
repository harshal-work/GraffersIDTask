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

export default function Items({ route, navigation }) {
  const { item } = route.params;
  const { bgColor, textColor } = useColor();
  
  const [isLiked, setIsLiked] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  
  // Animation refs
  const heartScale = useRef(new Animated.Value(1)).current;
  const addToCartScale = useRef(new Animated.Value(1)).current;
  const minusScale = useRef(new Animated.Value(1)).current;
  const plusScale = useRef(new Animated.Value(1)).current;

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

  const handleAddToCart = () => {
    safeVibrate(30);
    
    Animated.sequence([
      Animated.timing(addToCartScale, {
        toValue: 1.1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(addToCartScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    setIsAddedToCart(!isAddedToCart);
  };

  const handleIncreaseQuantity = () => {
    safeVibrate(20);
    
    Animated.sequence([
      Animated.timing(plusScale, {
        toValue: 1.2,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(plusScale, {
        toValue: 1,
        duration: 80,
        useNativeDriver: true,
      }),
    ]).start();

    setQuantity(prev => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      safeVibrate(20);
      
      Animated.sequence([
        Animated.timing(minusScale, {
          toValue: 1.2,
          duration: 80,
          useNativeDriver: true,
        }),
        Animated.timing(minusScale, {
          toValue: 1,
          duration: 80,
          useNativeDriver: true,
        }),
      ]).start();

      setQuantity(prev => prev - 1);
    }
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

        <Text style={styles.headerTitle}>Item's Details</Text>
        
        <View style={{ width: responsiveSize(40) }} />
      </View>

      <ScrollView 
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Main Image with Rating Badge */}
        <View style={styles.imageContainer}>
          <Image source={item.img} style={styles.mainImage} />
          
          {/* Rating Badge */}
          <View style={[styles.ratingBadge, { backgroundColor: bgColor }]}>
            <Image 
              source={require('../../../../assets/star.png')} 
              style={[styles.starIcon, { tintColor: '#fff' }]} 
            />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>

        {/* Product Info Row with Heart Button */}
        <View style={styles.productHeaderRow}>
          <View style={styles.productTitleContainer}>
            <Text style={styles.name}>{item.title}</Text>
            <Text style={[styles.price, { color: bgColor }]}>{item.price}</Text>
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

        {/* Description */}
        <Text style={styles.desc}>{item.desc}</Text>

        {/* Quantity Selector - Consistent with Search Screen */}
        <View style={styles.quantitySection}>
          <Text style={styles.quantityLabel}>Quantity</Text>
          <View style={styles.quantityContainer}>
            <Animated.View style={{ transform: [{ scale: minusScale }] }}>
              <TouchableOpacity 
                style={[styles.qtyButton, { backgroundColor: bgColor }]}
                onPress={handleDecreaseQuantity}
                disabled={quantity <= 1}
              >
                <Text style={styles.qtyButtonText}>−</Text>
              </TouchableOpacity>
            </Animated.View>
            
            <Text style={styles.qtyText}>{quantity < 10 ? `0${quantity}` : quantity}</Text>
            
            <Animated.View style={{ transform: [{ scale: plusScale }] }}>
              <TouchableOpacity 
                style={[styles.qtyButton, { backgroundColor: bgColor }]}
                onPress={handleIncreaseQuantity}
              >
                <Text style={styles.qtyButtonText}>+</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>

        {/* Add to Cart Button */}
        <Animated.View style={{ transform: [{ scale: addToCartScale }] }}>
          <TouchableOpacity 
            style={[styles.addCartBtn, { backgroundColor: isAddedToCart ? '#4CAF50' : bgColor }]}
            onPress={handleAddToCart}
          >
            <Text style={styles.addCartTxt}>
              {isAddedToCart ? '✓ ADDED TO CART' : 'ADD TO CART'}
            </Text>
          </TouchableOpacity>
        </Animated.View>
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
    height: responsiveSize(300), 
    borderRadius: responsiveSize(12),
  },
  
  /* Rating Badge */
  ratingBadge: {
    position: 'absolute',
    bottom: responsiveSize(10),
    right: responsiveSize(10),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveSize(10),
    paddingVertical: responsiveSize(6),
    borderRadius: responsiveSize(20),
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
    width: responsiveSize(14), 
    height: responsiveSize(14), 
    marginRight: responsiveSize(4),
  },
  ratingText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: responsiveSize(12),
  },
  
  /* Product Header Row */
  productHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: responsiveSize(15),
  },
  productTitleContainer: {
    flex: 1,
  },
  name: { 
    fontSize: responsiveSize(22), 
    fontWeight: '700', 
    color: '#000',
  },
  price: { 
    fontSize: responsiveSize(20), 
    fontWeight: '700', 
    marginTop: responsiveSize(6),
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
  
  desc: { 
    color: '#666', 
    lineHeight: responsiveSize(22),
    fontSize: responsiveSize(14),
    marginBottom: responsiveSize(25),
  },
  
  /* Quantity Section */
  quantitySection: {
    marginBottom: responsiveSize(30),
  },
  quantityLabel: {
    fontSize: responsiveSize(16),
    fontWeight: '600',
    color: '#000',
    marginBottom: responsiveSize(12),
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyButton: {
    width: responsiveSize(36),
    height: responsiveSize(36),
    borderRadius: responsiveSize(18),
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
    fontSize: responsiveSize(20),
    fontWeight: '700',
    lineHeight: responsiveSize(22),
  },
  qtyText: {
    fontSize: responsiveSize(16),
    fontWeight: '600',
    marginHorizontal: responsiveSize(15),
    color: '#000',
    minWidth: responsiveSize(30),
    textAlign: 'center',
  },
  
  /* Add to Cart Button */
  addCartBtn: {
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
  addCartTxt: { 
    color: '#fff', 
    fontWeight: '700', 
    fontSize: responsiveSize(16) 
  },
});