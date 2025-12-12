// File: screens/PaymentScreen.js
import React, { useState, useEffect, useRef } from 'react';
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
  Alert,
  ActivityIndicator,
  Animated,
} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import { useNavigation } from '@react-navigation/native';
import { useColor } from '../../util/ColorSwitcher';

const { width, height } = Dimensions.get('window');

// Responsive sizing
const responsiveSize = size => (width / 375) * size;

// Responsive font scaling
const fontScale = size => {
  return Platform.OS === 'ios' ? size * 0.95 : size;
};

// Vibration helper function
const vibrate = (duration = 40) => {
  if (Platform.OS === 'ios') {
    Vibration.vibrate([0, duration]);
  } else {
    Vibration.vibrate(duration);
  }
};

const PaymentScreen = () => {
  const navigation = useNavigation();
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState('success');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

  const progressAnim = useRef(new Animated.Value(0)).current;

  const { bgColor, textColor } = useColor();

  const closeIcon = require('../../assets/back.png');
  const successIcon = require('../../assets/tick.png');

  // Order details - calculated properly
  const orderItems = [
    {
      id: 1,
      name: 'iPhone 17 Plus',
      price: 240000,
      quantity: 2,
      image: require('../../assets/mobile2.png'),
    },
    {
      id: 2,
      name: 'iPhone 15 Pro',
      price: 340000,
      quantity: 1,
      image: require('../../assets/mobile3.png'),
    },
  ];

  // Calculate totals
  const calculateSubtotal = () => {
    return orderItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  const subtotal = calculateSubtotal();
  const deliveryFee = 0; // Free delivery
  const discount = 0; // No discount
  const totalAmount = subtotal + deliveryFee - discount;

  // Format currency for display
  const formatCurrency = amount => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const showPopup = (msg, type = 'success') => {
    setPopupMessage(msg);
    setPopupType(type);
    setPopupVisible(true);
    vibrate();
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  // Animate progress bar
  useEffect(() => {
    if (showSuccessPopup) {
      progressAnim.setValue(0);
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 2500,
        useNativeDriver: false,
      }).start();
    }
  }, [showSuccessPopup]);

  const handlePayment = async () => {
    if (isProcessing) return;

    setIsProcessing(true);
    setPaymentStatus('processing');

    try {
      // IMPORTANT: Amount must be in paise (₹1 = 100 paise)
      const amountInPaise = Math.round(totalAmount * 100);

      const options = {
        description: 'Vinsta Mobile Order Payment',
        image: 'https://i.imgur.com/3g7nmJC.png', // Static Razorpay merchant logo
        currency: 'INR',
        key: 'rzp_test_RB4DVzPPSyg8yG', // Test key - replace with your live key in production
        amount: amountInPaise.toString(), // Convert to string
        name: 'Vinsta Store',
        prefill: {
          email: 'customer@vinsta.com',
          contact: '9999999999',
          name: 'Vinsta Customer',
        },
        theme: {
          color: bgColor, // Using dynamic bgColor from color switcher
          backdrop_color: '#000000',
        },
        modal: {
          ondismiss: () => {
            console.log('Payment modal dismissed by user');
            setIsProcessing(false);
            setPaymentStatus('cancelled');
            showPopup('Payment cancelled by user.', 'error');
          },
        },
        retry: {
          enabled: true,
          max_count: 2,
        },
        timeout: 300,
        remember_cards: true,
      };

      console.log('Opening Razorpay with options:', {
        ...options,
        key: 'rzp_test_...', // Hide full key in logs
      });

      // Open Razorpay checkout
      RazorpayCheckout.open(options)
        .then(data => {
          console.log('Payment Success Response:', data);

          // Check if payment was successful
          if (data.razorpay_payment_id) {
            setIsProcessing(false);
            setPaymentStatus('success');
            vibrate(100);

            // Show success popup
            setShowSuccessPopup(true);

            // Navigate to success screen after delay
            setTimeout(() => {
              setShowSuccessPopup(false);
              navigation.navigate('PaymentSuccess', {
                paymentId: data.razorpay_payment_id,
                amount: totalAmount,
                orderId: `ORD${Date.now()}`,
                items: orderItems,
              });
            }, 2500);
          } else {
            throw new Error('Payment ID not received');
          }
        })
        .catch(error => {
          console.log('Razorpay Payment Error:', error);
          setIsProcessing(false);
          setPaymentStatus('failed');

          let errMsg = 'Payment failed. Please try again.';

          // Handle specific error cases
          if (error.error) {
            const errorObj = error.error;
            console.log('Error Object:', errorObj);

            if (errorObj.code === 2) {
              errMsg = 'Network error. Please check your internet connection.';
            } else if (errorObj.code === 4) {
              errMsg =
                'Payment processing failed. Please try with a different payment method.';
            } else if (errorObj.code === 5) {
              errMsg = 'Payment cancelled by user.';
            } else if (errorObj.code === 0) {
              errMsg =
                'Payment initialization failed. Please check your Razorpay key.';
            } else if (errorObj.description) {
              errMsg = errorObj.description;
            }
          } else if (error.description) {
            errMsg = error.description;
          } else if (typeof error === 'string') {
            if (error.includes('network') || error.includes('internet')) {
              errMsg = 'Network error. Please check your internet connection.';
            } else if (error.includes('cancel')) {
              errMsg = 'Payment cancelled by user.';
            }
          }

          showPopup(errMsg, 'error');
          vibrate(50);
        });
    } catch (error) {
      console.log('Payment initialization error:', error);
      setIsProcessing(false);
      setPaymentStatus('failed');
      showPopup('Failed to initialize payment. Please try again.', 'error');
    }
  };

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={[styles.container, { backgroundColor: '#FFFFFF' }]}>
      <StatusBar backgroundColor={bgColor} barStyle="light-content" />

      {/* HEADER - Fixed to match OfferClone screen */}
      <View style={[styles.header, { backgroundColor: bgColor }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.iconBtn, { backgroundColor: textColor }]}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Image
            source={require('../../assets/back.png')}
            style={[styles.icon, { tintColor: bgColor }]}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Payment</Text>

        <View style={{ width: responsiveSize(40) }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* SHIPPING SECTION */}
        <View style={[styles.section, { backgroundColor: '#FFFFFF' }]}>
          <View style={styles.shippingHeader}>
            <Text style={[styles.shippingTitle, { color: '#000000' }]}>
              Shipping to
            </Text>
            <TouchableOpacity>
              <Text style={[styles.changeText, { color: '#666666' }]}>
                Change
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.shippingRow}>
            <Image
              source={require('../../assets/mapicon.png')}
              style={styles.locationIcon}
            />
            <View style={{ flex: 1 }}>
              <Text style={[styles.homeTitle, { color: '#000000' }]}>Home</Text>
              <Text style={[styles.addressText, { color: '#666666' }]}>
                Near MC College, Barpeta Town, Assam 145621, India
              </Text>
            </View>
          </View>
        </View>

        {/* ORDER SUMMARY SECTION */}
        <View style={[styles.section, { backgroundColor: '#FFFFFF' }]}>
          <Text style={[styles.sectionTitle, { color: '#000000' }]}>
            Order Summary
          </Text>

          {/* Dynamic Order Items */}
          {orderItems.map(item => (
            <View key={item.id} style={styles.orderItem}>
              <View style={styles.itemLeft}>
                <Image source={item.image} style={styles.foodImage} />
                <View style={styles.itemDetails}>
                  <Text style={[styles.itemName, { color: '#000000' }]}>
                    {item.name}
                  </Text>
                  <Text style={[styles.itemQty, { color: '#666666' }]}>
                    Qty: {item.quantity}
                  </Text>
                </View>
              </View>
              <Text style={[styles.itemPrice, { color: '#000000' }]}>
                {formatCurrency(item.price * item.quantity)}
              </Text>
            </View>
          ))}

          {/* Divider */}
          <View style={[styles.divider, { backgroundColor: '#e0e0e0' }]} />

          {/* Price Breakdown */}
          <View style={styles.priceRow}>
            <Text style={[styles.priceLabel, { color: '#666666' }]}>
              Subtotal
            </Text>
            <Text style={[styles.priceValue, { color: '#000000' }]}>
              {formatCurrency(subtotal)}
            </Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={[styles.priceLabel, { color: '#666666' }]}>
              Delivery Fee
            </Text>
            <Text style={[styles.priceValue, { color: '#4CAF50' }]}>Free</Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={[styles.priceLabel, { color: '#666666' }]}>
              Discount
            </Text>
            <Text style={[styles.priceValue, { color: '#FF5722' }]}>
              - {formatCurrency(discount)}
            </Text>
          </View>

          {/* Divider */}
          <View style={[styles.divider, { backgroundColor: '#e0e0e0' }]} />

          {/* Total */}
          <View style={styles.totalRow}>
            <Text style={[styles.totalLabel, { color: '#000000' }]}>
              Total Amount
            </Text>
            <Text style={[styles.totalValue, { color: '#000000' }]}>
              {formatCurrency(totalAmount)}
            </Text>
          </View>
        </View>

        {/* Payment Note */}
        <View
          style={[
            styles.noteSection,
            {
              backgroundColor: '#f8f8f8',
              borderLeftColor: bgColor,
            },
          ]}
        >
          <Text style={[styles.noteText, { color: '#666666' }]}>
            💳 Click "PAY & CONFIRM" to proceed with secure payment via Razorpay
          </Text>
        </View>

        {/* Security Info */}
        <View style={styles.securitySection}>
          <Image
            source={require('../../assets/shield.png')}
            style={[styles.securityIcon, { tintColor: bgColor }]}
          />
          <Text style={[styles.securityText, { color: '#666666' }]}>
            Your payment is secured with 256-bit SSL encryption
          </Text>
        </View>

        {/* Razorpay Test Mode Banner */}
        <View
          style={[
            styles.testModeBanner,
            { backgroundColor: '#FFF3CD', borderColor: '#FFC107' },
          ]}
        >
          <Text style={[styles.testModeText, { color: '#856404' }]}>
            ⚠️ TEST MODE: Using Razorpay Test Key. No real transaction will
            occur.
          </Text>
        </View>

        {/* Bottom Spacer */}
        <View style={{ height: height * 0.2 }} />
      </ScrollView>

      {/* TOTAL & PAY BUTTON */}
      <View
        style={[
          styles.bottomSection,
          {
            backgroundColor: '#FFFFFF',
            borderTopColor: '#e0e0e0',
          },
        ]}
      >
        <View style={styles.totalRowBottom}>
          <Text style={[styles.totalLabelBottom, { color: '#000000' }]}>
            Total
          </Text>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={[styles.itemsText, { color: '#666666' }]}>
              ({orderItems.reduce((sum, item) => sum + item.quantity, 0)} items)
            </Text>
            <Text style={[styles.totalValueBottom, { color: '#000000' }]}>
              {formatCurrency(totalAmount)}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.payBtn,
            {
              backgroundColor: bgColor,
              opacity: isProcessing ? 0.7 : 1,
            },
          ]}
          onPress={handlePayment}
          activeOpacity={0.8}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator
                size="small"
                color={textColor}
                style={styles.spinner}
              />
              <Text
                style={[
                  styles.payBtnText,
                  { color: textColor, marginLeft: 10 },
                ]}
              >
                PROCESSING...
              </Text>
            </View>
          ) : (
            <Text style={[styles.payBtnText, { color: textColor }]}>
              PAY & CONFIRM
            </Text>
          )}
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
          <View style={[styles.popupBox, { backgroundColor: '#FFFFFF' }]}>
            <TouchableOpacity
              style={styles.closeIconWrapper}
              onPress={closePopup}
            >
              <Image
                source={closeIcon}
                style={[styles.closeIcon, { tintColor: '#000000' }]}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <View
              style={[
                styles.popupIconContainer,
                {
                  backgroundColor:
                    popupType === 'error' ? '#FFEBEE' : bgColor + '20',
                },
              ]}
            >
              <Image
                source={
                  popupType === 'error'
                    ? require('../../assets/error.png')
                    : require('../../assets/help.png')
                }
                style={[
                  styles.popupStatusIcon,
                  { tintColor: popupType === 'error' ? '#D32F2F' : bgColor },
                ]}
              />
            </View>

            <Text style={[styles.popupText, { color: '#000000' }]}>
              {popupMessage}
            </Text>
            <TouchableOpacity
              style={[styles.popupButton, { backgroundColor: bgColor }]}
              onPress={closePopup}
            >
              <Text style={[styles.popupButtonText, { color: textColor }]}>
                OK
              </Text>
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
          <View
            style={[styles.successPopupBox, { backgroundColor: '#FFFFFF' }]}
          >
            {/* Success Image */}
            <View
              style={[
                styles.successIconContainer,
                { backgroundColor: bgColor + '20' },
              ]}
            >
              <Image
                source={successIcon}
                style={[styles.successImage, { tintColor: bgColor }]}
                resizeMode="contain"
              />
            </View>

            {/* Success Message */}
            <Text style={[styles.successTitle, { color: '#000000' }]}>
              Payment Successful!
            </Text>
            <Text style={[styles.successSubtitle, { color: '#666666' }]}>
              Your payment of {formatCurrency(totalAmount)} was successful and
              your order has been confirmed.
            </Text>

            {/* Loading/Progress indicator */}
            <View
              style={[styles.progressBar, { backgroundColor: bgColor + '20' }]}
            >
              <Animated.View
                style={[
                  styles.progressFill,
                  {
                    backgroundColor: bgColor,
                    width: progressWidth,
                  },
                ]}
              />
            </View>

            <Text style={[styles.redirectText, { color: '#666666' }]}>
              Redirecting to order confirmation...
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: height * 0.02,
  },

  /** HEADER - Fixed to match OfferClone screen **/
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
    color: '#fff',
    fontSize: responsiveSize(20),
    fontWeight: '700',
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
    height: responsiveSize(20),
  },

  /** SHIPPING SECTION **/
  section: {
    padding: responsiveSize(20),
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    marginHorizontal: responsiveSize(15),
    backgroundColor: '#FFFFFF',
    borderRadius: responsiveSize(10),
    marginTop: responsiveSize(15),
    borderWidth: 1,
    borderColor: '#e0e0e0',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  shippingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  shippingTitle: {
    fontSize: fontScale(responsiveSize(16)),
    fontWeight: '700',
    fontFamily: 'Figtree-Bold',
  },
  changeText: {
    fontSize: fontScale(responsiveSize(14)),
    fontWeight: '600',
    fontFamily: 'Figtree-SemiBold',
  },
  shippingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsiveSize(12),
  },
  locationIcon: {
    width: responsiveSize(50),
    height: responsiveSize(50),
    marginRight: responsiveSize(10),
  },
  homeTitle: {
    fontSize: fontScale(responsiveSize(16)),
    fontWeight: '700',
    fontFamily: 'Figtree-Bold',
  },
  addressText: {
    fontSize: fontScale(responsiveSize(13)),
    lineHeight: responsiveSize(18),
    marginTop: responsiveSize(3),
    fontFamily: 'Figtree-Regular',
  },

  /** ORDER ITEMS **/
  sectionTitle: {
    fontSize: fontScale(responsiveSize(16)),
    fontWeight: '700',
    marginBottom: responsiveSize(15),
    fontFamily: 'Figtree-Bold',
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: responsiveSize(12),
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  foodImage: {
    width: responsiveSize(50),
    height: responsiveSize(50),
    borderRadius: responsiveSize(8),
    marginRight: responsiveSize(12),
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: fontScale(responsiveSize(15)),
    fontWeight: '600',
    marginBottom: responsiveSize(4),
    fontFamily: 'Figtree-SemiBold',
  },
  itemQty: {
    fontSize: fontScale(responsiveSize(13)),
    fontFamily: 'Figtree-Regular',
  },
  itemPrice: {
    fontSize: fontScale(responsiveSize(15)),
    fontWeight: '700',
    fontFamily: 'Figtree-Bold',
  },

  /** DIVIDER **/
  divider: {
    height: 1,
    marginVertical: responsiveSize(12),
  },

  /** PRICE DETAILS **/
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: responsiveSize(8),
  },
  priceLabel: {
    fontSize: fontScale(responsiveSize(14)),
    fontFamily: 'Figtree-Regular',
  },
  priceValue: {
    fontSize: fontScale(responsiveSize(14)),
    fontWeight: '500',
    fontFamily: 'Figtree-Medium',
  },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: fontScale(responsiveSize(16)),
    fontWeight: '700',
    fontFamily: 'Figtree-Bold',
  },
  totalValue: {
    fontSize: fontScale(responsiveSize(18)),
    fontWeight: '700',
    fontFamily: 'Figtree-Bold',
  },

  /** NOTE SECTION **/
  noteSection: {
    padding: responsiveSize(15),
    marginHorizontal: responsiveSize(15),
    marginTop: responsiveSize(15),
    borderRadius: responsiveSize(10),
    borderLeftWidth: 4,
  },
  noteText: {
    fontSize: fontScale(responsiveSize(13)),
    lineHeight: responsiveSize(20),
    fontFamily: 'Figtree-Regular',
  },

  /** SECURITY SECTION **/
  securitySection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: responsiveSize(15),
    marginTop: responsiveSize(15),
    padding: responsiveSize(12),
    borderRadius: responsiveSize(8),
    backgroundColor: '#f8f8f8',
  },
  securityIcon: {
    width: responsiveSize(16),
    height: responsiveSize(16),
    marginRight: responsiveSize(8),
  },
  securityText: {
    fontSize: fontScale(responsiveSize(12)),
    fontFamily: 'Figtree-Regular',
    flex: 1,
  },

  /** TEST MODE BANNER **/
  testModeBanner: {
    marginHorizontal: responsiveSize(15),
    marginTop: responsiveSize(15),
    padding: responsiveSize(12),
    borderRadius: responsiveSize(8),
    borderWidth: 1,
    alignItems: 'center',
  },
  testModeText: {
    fontSize: fontScale(responsiveSize(12)),
    fontFamily: 'Figtree-Regular',
    textAlign: 'center',
  },

  /** BOTTOM SECTION **/
  bottomSection: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: responsiveSize(20),
    borderTopWidth: 1,
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
    fontSize: fontScale(responsiveSize(16)),
    fontWeight: '700',
    fontFamily: 'Figtree-Bold',
  },
  itemsText: {
    fontSize: fontScale(responsiveSize(12)),
    fontFamily: 'Figtree-Regular',
  },
  totalValueBottom: {
    fontSize: fontScale(responsiveSize(18)),
    fontWeight: '700',
    fontFamily: 'Figtree-Bold',
  },

  payBtn: {
    borderRadius: responsiveSize(10),
    marginTop: responsiveSize(15),
    paddingVertical: responsiveSize(14),
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  payBtnText: {
    fontSize: fontScale(responsiveSize(16)),
    fontWeight: '700',
    fontFamily: 'Figtree-Bold',
  },

  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  spinner: {
    width: responsiveSize(20),
    height: responsiveSize(20),
  },

  /** ERROR/SUCCESS POPUP **/
  popupOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: width * 0.05,
  },
  popupBox: {
    width: width * 0.85,
    borderRadius: responsiveSize(16),
    padding: responsiveSize(25),
    alignItems: 'center',
    position: 'relative',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  popupIconContainer: {
    width: responsiveSize(60),
    height: responsiveSize(60),
    borderRadius: responsiveSize(30),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsiveSize(15),
  },
  popupStatusIcon: {
    width: responsiveSize(30),
    height: responsiveSize(30),
  },
  popupText: {
    fontSize: fontScale(responsiveSize(16)),
    textAlign: 'center',
    marginBottom: responsiveSize(25),
    lineHeight: responsiveSize(22),
    fontFamily: 'Figtree-Medium',
  },
  popupButton: {
    borderRadius: responsiveSize(10),
    paddingVertical: responsiveSize(12),
    paddingHorizontal: responsiveSize(40),
    width: '100%',
    alignItems: 'center',
  },
  popupButtonText: {
    fontWeight: '700',
    fontSize: fontScale(responsiveSize(14)),
    fontFamily: 'Figtree-Bold',
  },
  closeIconWrapper: {
    position: 'absolute',
    top: responsiveSize(15),
    right: responsiveSize(15),
    padding: responsiveSize(5),
  },
  closeIcon: {
    width: responsiveSize(18),
    height: responsiveSize(18),
  },

  /** SUCCESS POPUP WITH IMAGE **/
  successPopupOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: width * 0.1,
  },
  successPopupBox: {
    width: width * 0.85,
    borderRadius: responsiveSize(20),
    padding: responsiveSize(30),
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
      },
      android: {
        elevation: 15,
      },
    }),
  },
  successIconContainer: {
    width: responsiveSize(80),
    height: responsiveSize(80),
    borderRadius: responsiveSize(40),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsiveSize(20),
  },
  successImage: {
    width: responsiveSize(40),
    height: responsiveSize(40),
  },
  successTitle: {
    fontSize: fontScale(responsiveSize(22)),
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: responsiveSize(10),
    fontFamily: 'Figtree-Bold',
  },
  successSubtitle: {
    fontSize: fontScale(responsiveSize(16)),
    textAlign: 'center',
    lineHeight: responsiveSize(22),
    marginBottom: responsiveSize(25),
    fontFamily: 'Figtree-Regular',
  },
  progressBar: {
    width: '100%',
    height: responsiveSize(4),
    borderRadius: responsiveSize(2),
    marginBottom: responsiveSize(15),
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: responsiveSize(2),
  },
  redirectText: {
    fontSize: fontScale(responsiveSize(14)),
    fontFamily: 'Figtree-Regular',
  },
});
