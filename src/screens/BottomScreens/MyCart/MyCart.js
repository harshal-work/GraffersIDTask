// screens/MyCart.js
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';
import { useColor } from '../../../util/ColorSwitcher';

const { width, height } = Dimensions.get('window');

// Slightly reduced responsive sizing
const responsiveSize = size => (width / 400) * size;

export default function MyCart({ navigation }) {
  const { bgColor, textColor } = useColor();

  const [qty, setQty] = useState(2);
  const [delivery, setDelivery] = useState('Home');
  const [selectedItems, setSelectedItems] = useState([]);

  const increaseQty = () => setQty(q => q + 1);
  const decreaseQty = () => setQty(q => (q > 1 ? q - 1 : 1));

  const toggleItem = itemName => {
    if (selectedItems.includes(itemName)) {
      setSelectedItems(selectedItems.filter(item => item !== itemName));
    } else {
      setSelectedItems([...selectedItems, itemName]);
    }
  };

  // Image mapping for recommended products
  const imageMap = {
    Cover: require('../../../assets/phone-case.png'),
    Headphone: require('../../../assets/headphones.png'),
    Charger: require('../../../assets/phone-charger.png'),
    Earphone: require('../../../assets/earphone.png'),
  };

  const recommendedProducts = [
    { name: 'Cover', image: 'Cover' },
    { name: 'Headphone', image: 'Headphone' },
    { name: 'Charger', image: 'Charger' },
    { name: 'Earphone', image: 'Earphone' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: '#FFFFFF' }]}>
      <StatusBar backgroundColor={bgColor} barStyle="light-content" />

      {/* HEADER */}
      <View style={[styles.header, { backgroundColor: bgColor }]}>
        <Text style={styles.headerTitle}>My Cart</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* OFFERS SECTION */}
        <View style={styles.offersCard}>
          <Text style={styles.offersTitle}>
            All the Awesome Things I Picked
          </Text>

          <View style={styles.offerSteps}>
            {/* Step 1 */}
            <View style={styles.offerStep}>
              <View style={styles.stepContent}>
                <View style={styles.stepIconContainer}>
                  <Image
                    source={require('../../../assets/drop.png')}
                    style={[styles.stepIcon, { tintColor: bgColor }]}
                  />
                </View>
                <Text style={styles.stepText}>All picks are awesome</Text>
              </View>
              <View style={[styles.stepLine, { backgroundColor: bgColor }]} />
            </View>

            {/* Step 2 */}
            <View style={styles.offerStep}>
              <View style={styles.stepContent}>
                <View style={styles.stepIconContainer}>
                  <Image
                    source={require('../../../assets/drop.png')}
                    style={[styles.stepIcon, { tintColor: bgColor }]}
                  />
                </View>
                <Text style={styles.stepText}>
                  Select 2 more items to get 25% off
                </Text>
              </View>
              <View style={[styles.stepLine, { backgroundColor: bgColor }]} />
            </View>

            {/* Step 3 */}
            <View style={styles.offerStep}>
              <View style={styles.stepContent}>
                <View style={styles.stepIconContainer}>
                  <Image
                    source={require('../../../assets/drop.png')}
                    style={[styles.stepIcon, { tintColor: bgColor }]}
                  />
                </View>
                <Text style={styles.stepText}>
                  Select 4 items to get 30% off
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* PRODUCT CARD */}
        <View style={styles.productCard}>
          {/* Remove Icon - Top Right Corner */}
          <TouchableOpacity style={styles.removeBtn}>
            <Text style={styles.remove}>✕</Text>
          </TouchableOpacity>

          <Image
            source={require('../../../assets/mobile2.png')}
            style={styles.productImg}
          />

          <View style={styles.productInfo}>
            <Text style={styles.productName}>I Phone 17 Plus</Text>
            <Text style={styles.soldBy}>Sold By : Grocery Store</Text>
            <Text style={[styles.price, { color: bgColor }]}>₹124,050.00</Text>

            {/* Quantity Selector - After price */}
            <View style={styles.qtyContainer}>
              <TouchableOpacity
                onPress={decreaseQty}
                style={[styles.qtyBtn, { backgroundColor: bgColor }]}
              >
                <Text style={styles.qtyBtnTxt}>−</Text>
              </TouchableOpacity>

              <Text style={styles.qtyNumber}>{qty < 10 ? `0${qty}` : qty}</Text>

              <TouchableOpacity
                onPress={increaseQty}
                style={[styles.qtyBtn, { backgroundColor: bgColor }]}
              >
                <Text style={styles.qtyBtnTxt}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Recommended Section */}
        <Text style={styles.recommendedTitle}>More Recommended Product's</Text>

        <View style={styles.recommendedContainer}>
          {recommendedProducts.map((product, index) => (
            <TouchableOpacity
              key={index}
              style={styles.recoItem}
              onPress={() => toggleItem(product.name)}
            >
              <View style={styles.recoContent}>
                <Image
                  source={imageMap[product.image]}
                  style={styles.recoImg}
                />
                <View
                  style={[
                    styles.checkbox,
                    { borderColor: bgColor },
                    selectedItems.includes(product.name) && [
                      styles.checkboxSelected,
                      { backgroundColor: bgColor },
                    ],
                  ]}
                >
                  {selectedItems.includes(product.name) && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </View>
              </View>
              <Text style={styles.recoText}>{product.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.offerNote}>
          with I Phone 17. Select additional item to get 10% discount.*
        </Text>

        {/* Promo Code */}
        <View style={styles.promoSection}>
          <Text style={styles.promoTitle}>Promo Code</Text>
          <View style={styles.promoRow}>
            <TextInput
              placeholder="Submit"
              placeholderTextColor="#999"
              style={styles.promoInput}
            />
            <TouchableOpacity
              style={[styles.applyBtn, { backgroundColor: bgColor }]}
            >
              <Text style={styles.applyTxt}>APPLY</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* PRICE BREAKDOWN */}
        <View style={styles.priceSection}>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Subtotal</Text>
            <Text style={styles.priceValue}>₹ 450.00</Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Tax and Fees</Text>
            <Text style={styles.priceValue}>₹ 50.00</Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Offer & Discount</Text>
            <Text style={styles.priceValue}>₹ 20.00</Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Delivery</Text>
            <Text style={styles.priceValue}>₹ 20.00</Text>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total (3 items)</Text>
            <Text style={[styles.totalValue, { color: bgColor }]}>
              ₹83,000.00
            </Text>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* DELIVERY OPTION */}
        <Text style={styles.sectionTitle}>Select Delivery Option</Text>

        <View style={styles.deliveryOptions}>
          {['Home', 'Office', 'Other'].map(opt => (
            <TouchableOpacity
              key={opt}
              style={styles.deliveryOption}
              onPress={() => setDelivery(opt)}
            >
              <View style={styles.radioContainer}>
                <View
                  style={[
                    styles.radioOuter,
                    { borderColor: bgColor },
                    delivery === opt && styles.radioOuterActive,
                  ]}
                >
                  {delivery === opt && (
                    <View
                      style={[styles.radioInner, { backgroundColor: bgColor }]}
                    />
                  )}
                </View>
                <Text style={styles.radioLabel}>{opt}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* DELIVERY LOCATION */}
        <Text style={styles.sectionTitle}>Delivery Location</Text>

        <View style={styles.locationCard}>
          <View style={styles.locationRow}>
            <View style={styles.radioContainer}>
              <View
                style={[
                  styles.radioOuter,
                  { borderColor: bgColor },
                  styles.radioOuterActive,
                ]}
              >
                <View
                  style={[styles.radioInner, { backgroundColor: bgColor }]}
                />
              </View>
              <Text style={styles.locationText}>
                CM Block, 2nd Floor, Assam, India
              </Text>
            </View>
          </View>

          <TextInput
            placeholder="landmark/instruction (optional)"
            placeholderTextColor="#999"
            style={styles.landmarkInput}
            multiline
          />
        </View>

        {/* CHECKOUT BUTTON */}
        <TouchableOpacity
          style={[styles.checkoutBtn, { backgroundColor: bgColor }]}
          onPress={() => navigation.navigate('PaymentScreen')}
        >
          <Text style={styles.checkoutText}>CHECKOUT</Text>
        </TouchableOpacity>

        <View style={{ height: 36 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom:
      Platform.OS === 'ios' ? responsiveSize(90) : responsiveSize(80),
  },

  /* HEADER */
  header: {
    height: Platform.OS === 'ios' ? responsiveSize(90) : responsiveSize(82),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveSize(14),
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? responsiveSize(44) : responsiveSize(26),
    paddingBottom: 0,
  },
  headerTitle: {
    color: '#fff',
    fontSize: responsiveSize(16),
    fontWeight: '700',
    textAlign: 'center',
    flex: 1,
    marginHorizontal: responsiveSize(8),
  },

  /* OFFERS SECTION */
  offersCard: {
    marginTop: responsiveSize(12),
    marginHorizontal: responsiveSize(12),
    backgroundColor: '#fff',
    borderRadius: responsiveSize(8),
    padding: responsiveSize(12),
    borderWidth: 1,
    borderColor: '#e0e0e0',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  offersTitle: {
    fontSize: responsiveSize(13),
    fontWeight: '700',
    color: '#000',
    marginBottom: responsiveSize(14),
    textAlign: 'center',
  },
  offerSteps: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  offerStep: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },
  stepContent: {
    alignItems: 'center',
    width: '100%',
  },
  stepIconContainer: {
    width: responsiveSize(20),
    height: responsiveSize(20),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsiveSize(6),
  },
  stepIcon: {
    width: responsiveSize(14),
    height: responsiveSize(14),
  },
  stepText: {
    fontSize: responsiveSize(9),
    color: '#666',
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: responsiveSize(11),
    paddingHorizontal: responsiveSize(3),
  },
  stepLine: {
    position: 'absolute',
    top: responsiveSize(10),
    left: '50%',
    width: '100%',
    height: 2,
    zIndex: -1,
  },

  /* PRODUCT CARD */
  productCard: {
    marginTop: responsiveSize(12),
    marginHorizontal: responsiveSize(12),
    backgroundColor: '#fff',
    borderRadius: responsiveSize(8),
    padding: responsiveSize(10),
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    position: 'relative',
  },
  productImg: {
    width: responsiveSize(62),
    height: responsiveSize(80),
    borderRadius: responsiveSize(5),
    marginRight: responsiveSize(10),
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: responsiveSize(13.5),
    fontWeight: '700',
    color: '#000',
    marginBottom: responsiveSize(2),
  },
  soldBy: {
    color: '#666',
    fontSize: responsiveSize(10.5),
    marginBottom: responsiveSize(5),
  },
  price: {
    fontSize: responsiveSize(13.5),
    fontWeight: '700',
    marginBottom: responsiveSize(6),
  },

  /* QUANTITY */
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyBtn: {
    width: responsiveSize(22),
    height: responsiveSize(22),
    borderRadius: responsiveSize(11),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  qtyBtnTxt: {
    color: '#fff',
    fontSize: responsiveSize(11),
    fontWeight: 'bold',
    lineHeight: responsiveSize(13),
  },
  qtyNumber: {
    fontSize: responsiveSize(10.5),
    fontWeight: '600',
    marginHorizontal: responsiveSize(5),
    color: '#000',
    minWidth: responsiveSize(16),
    textAlign: 'center',
  },

  /* Remove Button */
  removeBtn: {
    position: 'absolute',
    top: responsiveSize(6),
    right: responsiveSize(6),
    width: responsiveSize(18),
    height: responsiveSize(18),
    borderRadius: responsiveSize(9),
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  remove: {
    fontSize: responsiveSize(10),
    color: '#666',
    fontWeight: '300',
  },

  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginHorizontal: responsiveSize(12),
    marginVertical: responsiveSize(10),
  },

  /* RECOMMENDED */
  recommendedTitle: {
    fontSize: responsiveSize(13),
    fontWeight: '700',
    marginHorizontal: responsiveSize(12),
    marginBottom: responsiveSize(10),
    color: '#000',
  },
  recommendedContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: responsiveSize(12),
    marginBottom: responsiveSize(6),
  },
  recoItem: {
    alignItems: 'center',
    width: responsiveSize(68),
  },
  recoContent: {
    position: 'relative',
    alignItems: 'center',
  },
  recoImg: {
    width: responsiveSize(54),
    height: responsiveSize(54),
    borderRadius: responsiveSize(5),
    marginBottom: responsiveSize(5),
  },
  checkbox: {
    position: 'absolute',
    top: -3,
    right: -3,
    width: responsiveSize(16),
    height: responsiveSize(16),
    borderWidth: 1,
    borderRadius: responsiveSize(3),
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#1d3f72',
  },
  checkmark: {
    color: '#fff',
    fontSize: responsiveSize(9),
    fontWeight: 'bold',
  },
  recoText: {
    fontSize: responsiveSize(10.5),
    textAlign: 'center',
    color: '#000',
    fontWeight: '500',
    marginTop: responsiveSize(1.5),
  },

  offerNote: {
    color: '#666',
    marginHorizontal: responsiveSize(12),
    marginTop: responsiveSize(4),
    marginBottom: responsiveSize(12),
    fontSize: responsiveSize(10.5),
    fontStyle: 'italic',
    textAlign: 'center',
  },

  /* PROMO CODE */
  promoSection: {
    marginHorizontal: responsiveSize(12),
    marginBottom: responsiveSize(12),
  },
  promoTitle: {
    fontSize: responsiveSize(13),
    fontWeight: '700',
    marginBottom: responsiveSize(6),
    color: '#000',
  },
  promoRow: {
    flexDirection: 'row',
  },
  promoInput: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingHorizontal: responsiveSize(10),
    borderRadius: responsiveSize(5),
    height: responsiveSize(36),
    fontSize: responsiveSize(11.5),
    color: '#000',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  applyBtn: {
    paddingHorizontal: responsiveSize(14),
    justifyContent: 'center',
    borderRadius: responsiveSize(5),
    marginLeft: responsiveSize(6),
    minWidth: responsiveSize(64),
  },
  applyTxt: {
    color: '#fff',
    fontWeight: '700',
    fontSize: responsiveSize(11.5),
  },

  /* PRICE SECTION */
  priceSection: {
    marginHorizontal: responsiveSize(12),
    marginBottom: responsiveSize(12),
    backgroundColor: '#f8f8f8',
    borderRadius: responsiveSize(7),
    padding: responsiveSize(10),
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: responsiveSize(3),
  },
  priceLabel: {
    color: '#666',
    fontSize: responsiveSize(11.5),
  },
  priceValue: {
    fontWeight: '500',
    fontSize: responsiveSize(11.5),
    color: '#000',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: responsiveSize(6),
    paddingTop: responsiveSize(6),
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  totalLabel: {
    fontSize: responsiveSize(12.5),
    fontWeight: '600',
    color: '#000',
  },
  totalValue: {
    fontSize: responsiveSize(13.5),
    fontWeight: '700',
  },

  /* SECTIONS */
  sectionTitle: {
    fontSize: responsiveSize(13),
    fontWeight: '700',
    marginHorizontal: responsiveSize(12),
    marginBottom: responsiveSize(8),
    color: '#000',
  },

  /* DELIVERY OPTIONS */
  deliveryOptions: {
    flexDirection: 'row',
    marginHorizontal: responsiveSize(12),
    marginBottom: responsiveSize(12),
  },
  deliveryOption: {
    marginRight: responsiveSize(16),
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioOuter: {
    width: responsiveSize(16),
    height: responsiveSize(16),
    borderRadius: responsiveSize(8),
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: responsiveSize(5),
  },
  radioOuterActive: {},
  radioInner: {
    width: responsiveSize(7),
    height: responsiveSize(7),
    borderRadius: responsiveSize(3.5),
  },
  radioLabel: {
    fontSize: responsiveSize(11.5),
    color: '#000',
  },

  /* LOCATION */
  locationCard: {
    marginHorizontal: responsiveSize(12),
    backgroundColor: '#f8f8f8',
    borderRadius: responsiveSize(5),
    padding: responsiveSize(10),
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: responsiveSize(12),
  },
  locationRow: {
    marginBottom: responsiveSize(8),
  },
  locationText: {
    color: '#000',
    fontSize: responsiveSize(11.5),
    flex: 1,
  },

  landmarkInput: {
    backgroundColor: '#fff',
    height: responsiveSize(80),
    borderRadius: responsiveSize(5),
    paddingHorizontal: responsiveSize(8),
    fontSize: responsiveSize(11),
    color: '#000',
    borderWidth: 1,
    borderColor: '#ddd',
  },

  /* CHECKOUT BTN */
  checkoutBtn: {
    marginHorizontal: responsiveSize(12),
    height: responsiveSize(40),
    borderRadius: responsiveSize(5),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.16,
    shadowRadius: 3,
    marginTop: responsiveSize(6),
  },
  checkoutText: {
    color: '#fff',
    fontSize: responsiveSize(13),
    fontWeight: '700',
  },
});
