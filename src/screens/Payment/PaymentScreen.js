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

// Swiggy-style tighter scaling
const responsiveSize = size => (width / 400) * size;

const fontScale = size => {
  return Platform.OS === 'ios' ? size * 0.95 : size;
};

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

  const calculateSubtotal = () => {
    return orderItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  const subtotal = calculateSubtotal();
  const deliveryFee = 0;
  const discount = 0;
  const totalAmount = subtotal + deliveryFee - discount;

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
      const amountInPaise = Math.round(totalAmount * 100);

      const options = {
        description: 'Vinsta Mobile Order Payment',
        image: 'https://i.imgur.com/3g7nmJC.png',
        currency: 'INR',
        key: 'rzp_test_RB4DVzPPSyg8yG',
        amount: amountInPaise.toString(),
        name: 'Vinsta Store',
        prefill: {
          email: 'customer@vinsta.com',
          contact: '9999999999',
          name: 'Vinsta Customer',
        },
        theme: {
          color: bgColor,
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
        key: 'rzp_test_...',
      });

      RazorpayCheckout.open(options)
        .then(data => {
          console.log('Payment Success Response:', data);

          if (data.razorpay_payment_id) {
            setIsProcessing(false);
            setPaymentStatus('success');
            vibrate(100);

            setShowSuccessPopup(true);

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

      {/* HEADER */}
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

          <View style={[styles.divider, { backgroundColor: '#e0e0e0' }]} />

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

          <View style={[styles.divider, { backgroundColor: '#e0e0e0' }]} />

          <View style={styles.totalRow}>
            <Text style={[styles.totalLabel, { color: '#000000' }]}>
              Total Amount
            </Text>
            <Text style={[styles.totalValue, { color: '#000000' }]}>
              {formatCurrency(totalAmount)}
            </Text>
          </View>
        </View>

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

        <View style={styles.securitySection}>
          <Image
            source={require('../../assets/shield.png')}
            style={[styles.securityIcon, { tintColor: bgColor }]}
          />
          <Text style={[styles.securityText, { color: '#666666' }]}>
            Your payment is secured with 256-bit SSL encryption
          </Text>
        </View>

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

        <View style={{ height: height * 0.15 }} />
      </ScrollView>

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
                style={[styles.payBtnText, { color: textColor, marginLeft: 8 }]}
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

            <Text style={[styles.successTitle, { color: '#000000' }]}>
              Payment Successful!
            </Text>
            <Text style={[styles.successSubtitle, { color: '#666666' }]}>
              Your payment of {formatCurrency(totalAmount)} was successful and
              your order has been confirmed.
            </Text>

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

  header: {
    height: Platform.OS === 'ios' ? responsiveSize(90) : responsiveSize(82),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveSize(16),
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? responsiveSize(44) : responsiveSize(26),
    paddingBottom: responsiveSize(0),
  },
  headerTitle: {
    color: '#fff',
    fontSize: fontScale(responsiveSize(16)),
    fontWeight: '700',
    textAlign: 'center',
    flex: 1,
    marginHorizontal: responsiveSize(10),
  },
  iconBtn: {
    width: responsiveSize(36),
    height: responsiveSize(36),
    borderRadius: responsiveSize(10),
    justifyContent: 'center',
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
  icon: {
    width: responsiveSize(18),
    height: responsiveSize(18),
  },

  section: {
    padding: responsiveSize(13),
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    marginHorizontal: responsiveSize(13),
    backgroundColor: '#FFFFFF',
    borderRadius: responsiveSize(9),
    marginTop: responsiveSize(12),
    borderWidth: 1,
    borderColor: '#e0e0e0',
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
  shippingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  shippingTitle: {
    fontSize: fontScale(responsiveSize(13.5)),
    fontWeight: '700',
  },
  changeText: {
    fontSize: fontScale(responsiveSize(12)),
    fontWeight: '600',
  },
  shippingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsiveSize(10),
  },
  locationIcon: {
    width: responsiveSize(42),
    height: responsiveSize(42),
    marginRight: responsiveSize(8),
  },
  homeTitle: {
    fontSize: fontScale(responsiveSize(13.5)),
    fontWeight: '700',
  },
  addressText: {
    fontSize: fontScale(responsiveSize(11.5)),
    lineHeight: responsiveSize(16),
    marginTop: responsiveSize(2),
  },

  sectionTitle: {
    fontSize: fontScale(responsiveSize(13.5)),
    fontWeight: '700',
    marginBottom: responsiveSize(12),
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: responsiveSize(10),
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  foodImage: {
    width: responsiveSize(42),
    height: responsiveSize(42),
    borderRadius: responsiveSize(7),
    marginRight: responsiveSize(10),
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: fontScale(responsiveSize(13)),
    fontWeight: '600',
    marginBottom: responsiveSize(3),
  },
  itemQty: {
    fontSize: fontScale(responsiveSize(11.5)),
  },
  itemPrice: {
    fontSize: fontScale(responsiveSize(13)),
    fontWeight: '700',
  },

  divider: {
    height: 1,
    marginVertical: responsiveSize(10),
  },

  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: responsiveSize(6),
  },
  priceLabel: {
    fontSize: fontScale(responsiveSize(12.5)),
  },
  priceValue: {
    fontSize: fontScale(responsiveSize(12.5)),
    fontWeight: '500',
  },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: fontScale(responsiveSize(14)),
    fontWeight: '700',
  },
  totalValue: {
    fontSize: fontScale(responsiveSize(16)),
    fontWeight: '700',
  },

  noteSection: {
    padding: responsiveSize(13),
    marginHorizontal: responsiveSize(13),
    marginTop: responsiveSize(12),
    borderRadius: responsiveSize(9),
    borderLeftWidth: 3,
  },
  noteText: {
    fontSize: fontScale(responsiveSize(11.5)),
    lineHeight: responsiveSize(17),
  },

  securitySection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: responsiveSize(13),
    marginTop: responsiveSize(12),
    padding: responsiveSize(10),
    borderRadius: responsiveSize(7),
    backgroundColor: '#f8f8f8',
  },
  securityIcon: {
    width: responsiveSize(14),
    height: responsiveSize(14),
    marginRight: responsiveSize(6),
  },
  securityText: {
    fontSize: fontScale(responsiveSize(11)),
    flex: 1,
  },

  testModeBanner: {
    marginHorizontal: responsiveSize(13),
    marginTop: responsiveSize(12),
    padding: responsiveSize(10),
    borderRadius: responsiveSize(7),
    borderWidth: 1,
    alignItems: 'center',
  },
  testModeText: {
    fontSize: fontScale(responsiveSize(11)),
    textAlign: 'center',
  },

  bottomSection: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: responsiveSize(16),
    borderTopWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  totalRowBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  totalLabelBottom: {
    fontSize: fontScale(responsiveSize(14)),
    fontWeight: '700',
  },
  itemsText: {
    fontSize: fontScale(responsiveSize(11)),
  },
  totalValueBottom: {
    fontSize: fontScale(responsiveSize(16)),
    fontWeight: '700',
  },

  payBtn: {
    borderRadius: responsiveSize(9),
    marginTop: responsiveSize(12),
    paddingVertical: responsiveSize(12),
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  payBtnText: {
    fontSize: fontScale(responsiveSize(14)),
    fontWeight: '700',
  },

  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    width: responsiveSize(18),
    height: responsiveSize(18),
  },

  popupOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: width * 0.05,
  },
  popupBox: {
    width: width * 0.88,
    borderRadius: responsiveSize(14),
    padding: responsiveSize(20),
    alignItems: 'center',
    position: 'relative',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  popupIconContainer: {
    width: responsiveSize(52),
    height: responsiveSize(52),
    borderRadius: responsiveSize(26),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsiveSize(12),
  },
  popupStatusIcon: {
    width: responsiveSize(26),
    height: responsiveSize(26),
  },
  popupText: {
    fontSize: fontScale(responsiveSize(14)),
    textAlign: 'center',
    marginBottom: responsiveSize(20),
    lineHeight: responsiveSize(19),
  },
  popupButton: {
    borderRadius: responsiveSize(9),
    paddingVertical: responsiveSize(10),
    paddingHorizontal: responsiveSize(32),
    width: '100%',
    alignItems: 'center',
  },
  popupButtonText: {
    fontWeight: '700',
    fontSize: fontScale(responsiveSize(13)),
  },
  closeIconWrapper: {
    position: 'absolute',
    top: responsiveSize(12),
    right: responsiveSize(12),
    padding: responsiveSize(4),
  },
  closeIcon: {
    width: responsiveSize(16),
    height: responsiveSize(16),
  },

  successPopupOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: width * 0.08,
  },
  successPopupBox: {
    width: width * 0.88,
    borderRadius: responsiveSize(16),
    padding: responsiveSize(24),
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
      },
      android: {
        elevation: 12,
      },
    }),
  },
  successIconContainer: {
    width: responsiveSize(68),
    height: responsiveSize(68),
    borderRadius: responsiveSize(34),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsiveSize(16),
  },
  successImage: {
    width: responsiveSize(34),
    height: responsiveSize(34),
  },
  successTitle: {
    fontSize: fontScale(responsiveSize(18)),
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: responsiveSize(8),
  },
  successSubtitle: {
    fontSize: fontScale(responsiveSize(14)),
    textAlign: 'center',
    lineHeight: responsiveSize(19),
    marginBottom: responsiveSize(20),
  },
  progressBar: {
    width: '100%',
    height: responsiveSize(3),
    borderRadius: responsiveSize(1.5),
    marginBottom: responsiveSize(12),
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: responsiveSize(1.5),
  },
  redirectText: {
    fontSize: fontScale(responsiveSize(12.5)),
  },
});
