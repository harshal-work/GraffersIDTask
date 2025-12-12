// File: screens/PaymentScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  Platform,
  Modal,
  Dimensions,
  ScrollView,
  Vibration,
} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../theme/colors';

const { width, height } = Dimensions.get('window');

// Vibration helper function
const vibrate = (duration: number = 40) => {
  if (Platform.OS === "ios") {
    // iOS requires a pattern array
    Vibration.vibrate([0, duration]);
  } else {
    // Android accepts duration directly
    Vibration.vibrate(duration);
  }
};

const PaymentScreen = () => {
  const navigation = useNavigation<any>();
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState<'success' | 'error'>('success');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const closeIcon = require('../assets/close.png');
  const successIcon = require('../assets/sucess.png');

  const showPopup = (msg: string, type: 'success' | 'error' = 'success') => {
    setPopupMessage(msg);
    setPopupType(type);
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  const showSuccessPaymentPopup = () => {
    setShowSuccessPopup(true);
    vibrate(100); // Vibrate on success
    
    // Auto navigate after 2 seconds
    setTimeout(() => {
      setShowSuccessPopup(false);
      navigation.navigate('PaymentSuccess', {
        paymentId: 'temp_payment_id', // You'll replace this with actual payment ID
      });
    }, 2000);
  };

  const handlePayment = () => {
    const options = {
      description: 'Vinsta Food Order Payment',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: 'rzp_test_RB4DVzPPSyg8yG',
      amount: '58000',
      name: 'Vinsta',
      prefill: {
        email: 'testuser@vinsta.com',
        contact: '9999999999',
        name: 'Vinsta Customer',
      },
      theme: { color: COLORS.primary },
    };

    RazorpayCheckout.open(options)
      .then(data => {
        console.log('Payment Success:', data);
        vibrate(100); // Success vibration
        
        // Show success popup with image
        setShowSuccessPopup(true);
        
        // Auto navigate after 2 seconds
        setTimeout(() => {
          setShowSuccessPopup(false);
          navigation.navigate('PaymentSuccess', {
            paymentId: data.razorpay_payment_id,
          });
        }, 2000);
      })
      .catch(error => {
        console.log('Razorpay Error:', error);
        const errMsg =
          error.description ||
          error.error?.description ||
          'Payment cancelled by user.';
        showPopup(errMsg, 'error');
        vibrate(50); // Error vibration - shorter duration
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Image
            source={require('../assets/back.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment</Text>
        <View style={{ width: 20 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* SHIPPING SECTION */}
        <View style={styles.section}>
          <View style={styles.shippingHeader}>
            <Text style={styles.shippingTitle}>Shipping to</Text>
            {/* <TouchableOpacity>
              <Text style={styles.changeText}>Change</Text>
            </TouchableOpacity> */}
          </View>

          <View style={styles.shippingRow}>
            <Image
              source={require('../assets/loc1.png')}
              style={styles.locationIcon}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.homeTitle}>Home</Text>
              <Text style={styles.addressText}>
                Near MC College, Barpeta Town, Assam 145621, India
              </Text>
            </View>
          </View>
        </View>

        {/* ORDER SUMMARY SECTION */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>

          {/* Order Items */}
          <View style={styles.orderItem}>
            <View style={styles.itemLeft}>
              <Image
                source={require('../assets/b1.png')}
                style={styles.foodImage}
              />
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>Chicken Burger</Text>
                <Text style={styles.itemQty}>Qty: 2</Text>
              </View>
            </View>
            <Text style={styles.itemPrice}>₹ 240.00</Text>
          </View>

          <View style={styles.orderItem}>
            <View style={styles.itemLeft}>
              <Image
                source={require('../assets/b2.png')}
                style={styles.foodImage}
              />
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>Veg Pizza</Text>
                <Text style={styles.itemQty}>Qty: 1</Text>
              </View>
            </View>
            <Text style={styles.itemPrice}>₹ 340.00</Text>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Price Breakdown */}
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Subtotal</Text>
            <Text style={styles.priceValue}>₹ 580.00</Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Delivery Fee</Text>
            <Text style={styles.priceValue}>Free</Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Discount</Text>
            <Text style={[styles.priceValue, { color: COLORS.primary }]}>
              - ₹ 0.00
            </Text>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Total */}
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>₹ 580.00</Text>
          </View>
        </View>

        {/* Payment Note */}
        <View style={styles.noteSection}>
          <Text style={styles.noteText}>
            💳 Click "PAY & CONFIRM" to proceed with secure payment via Razorpay
          </Text>
        </View>

        {/* Bottom Spacer */}
        <View style={{ height: height * 0.2 }} />
      </ScrollView>

      {/* TOTAL & PAY BUTTON */}
      <View style={styles.bottomSection}>
        <View style={styles.totalRowBottom}>
          <Text style={styles.totalLabelBottom}>Total</Text>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.itemsText}>(3 items)</Text>
            <Text style={styles.totalValueBottom}>₹ 580.00</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.payBtn}
          onPress={handlePayment}
          activeOpacity={0.8}
        >
          <Text style={styles.payBtnText}>PAY & CONFIRM</Text>
        </TouchableOpacity>
      </View>

      {/* Error/Success Popup Modal */}
      <Modal
        transparent
        visible={popupVisible}
        animationType="fade"
        onRequestClose={closePopup}
      >
        <View style={styles.popupOverlay}>
          <View style={styles.popupBox}>
            <TouchableOpacity
              style={styles.closeIconWrapper}
              onPress={closePopup}
            >
              <Image
                source={closeIcon}
                style={styles.closeIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text style={styles.popupText}>{popupMessage}</Text>
            <TouchableOpacity style={styles.popupButton} onPress={closePopup}>
              <Text style={styles.popupButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Success Payment Popup with Image */}
      <Modal
        transparent
        visible={showSuccessPopup}
        animationType="fade"
        onRequestClose={() => setShowSuccessPopup(false)}
      >
        <View style={styles.successPopupOverlay}>
          <View style={styles.successPopupBox}>
            {/* Success Image */}
            <Image
              source={successIcon}
              style={styles.successImage}
              resizeMode="contain"
            />
            
            {/* Success Message */}
            <Text style={styles.successTitle}>Order Confirmed!</Text>
            <Text style={styles.successSubtitle}>
              Your payment was successful and your order has been confirmed.
            </Text>
            
            {/* Loading/Progress indicator */}
            <View style={styles.progressBar}>
              <View style={styles.progressFill} />
            </View>
            
            <Text style={styles.redirectText}>Redirecting...</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContent: {
    paddingBottom: height * 0.02,
  },

  /** HEADER **/
  header: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 55 : 45,
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  backIcon: { width: 22, height: 22, tintColor: '#fff' },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    fontFamily: 'Figtree-Bold',
  },

  /** SHIPPING SECTION **/
  section: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  shippingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  shippingTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    fontFamily: 'Figtree-Bold',
  },
  changeText: {
    color: COLORS.primary,
    fontWeight: '700',
    fontFamily: 'Figtree-SemiBold',
  },
  shippingRow: { flexDirection: 'row', alignItems: 'center', marginTop: 12 },
  locationIcon: { width: 60, height: 60, marginRight: 10 },
  homeTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    fontFamily: 'Figtree-Bold',
  },
  addressText: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
    marginTop: 3,
    fontFamily: 'Figtree-Regular',
  },

  /** ORDER ITEMS **/
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 15,
    fontFamily: 'Figtree-Bold',
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  foodImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#f0f0f0',
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
    fontFamily: 'Figtree-SemiBold',
  },
  itemQty: {
    fontSize: 13,
    color: '#777',
    fontFamily: 'Figtree-Regular',
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000',
    fontFamily: 'Figtree-Bold',
  },

  /** DIVIDER **/
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 12,
  },

  /** PRICE DETAILS **/
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  priceLabel: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Figtree-Regular',
  },
  priceValue: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
    fontFamily: 'Figtree-Medium',
  },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    fontFamily: 'Figtree-Bold',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primary,
    fontFamily: 'Figtree-Bold',
  },

  /** NOTE SECTION **/
  noteSection: {
    backgroundColor: '#FFF9E6',
    padding: 15,
    marginHorizontal: 20,
    marginTop: 15,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  noteText: {
    fontSize: 13,
    color: '#666',
    lineHeight: 20,
    fontFamily: 'Figtree-Regular',
  },

  /** BOTTOM SECTION **/
  bottomSection: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  totalRowBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  totalLabelBottom: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    fontFamily: 'Figtree-Bold',
  },
  itemsText: {
    fontSize: 12,
    color: '#777',
    fontFamily: 'Figtree-Regular',
  },
  totalValueBottom: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    fontFamily: 'Figtree-Bold',
  },

  payBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    marginTop: 15,
    paddingVertical: 14,
    alignItems: 'center',
  },
  payBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Figtree-Bold',
  },

  /** ERROR/SUCCESS POPUP **/
  popupOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: width * 0.05,
  },
  popupBox: {
    width: width * 0.8,
    backgroundColor: COLORS.secondary,
    borderRadius: width * 0.03,
    padding: width * 0.05,
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  popupText: {
    fontSize: width * 0.04,
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: height * 0.02,
    lineHeight: height * 0.025,
    fontFamily: 'Figtree-Regular',
  },
  popupButton: {
    backgroundColor: COLORS.primary,
    borderRadius: width * 0.02,
    paddingVertical: height * 0.012,
    paddingHorizontal: width * 0.06,
  },
  popupButtonText: {
    color: COLORS.secondary,
    fontWeight: '700',
    fontSize: width * 0.035,
    fontFamily: 'Figtree-Bold',
  },
  closeIconWrapper: {
    position: 'absolute',
    top: width * 0.03,
    right: width * 0.03,
    padding: width * 0.01,
  },
  closeIcon: {
    width: width * 0.045,
    height: width * 0.045,
    tintColor: COLORS.text,
  },

  /** SUCCESS POPUP WITH IMAGE **/
  successPopupOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: width * 0.1,
  },
  successPopupBox: {
    width: width * 0.85,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  successImage: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'Figtree-Bold',
  },
  successSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 25,
    fontFamily: 'Figtree-Regular',
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: '#f0f0f0',
    borderRadius: 2,
    marginBottom: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 2,
    width: '100%',
  },
  redirectText: {
    fontSize: 14,
    color: '#999',
    fontFamily: 'Figtree-Regular',
  },
});