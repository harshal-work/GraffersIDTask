import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  Dimensions,
  Alert,
  Platform,
} from 'react-native';
import { useColor } from '../../../util/ColorSwitcher';
import RatingModal from '../Order/RatingModal';

const { width, height } = Dimensions.get('window');

// Slightly reduced responsive sizing
const responsiveSize = size => (width / 400) * size;

export default function MyOrdersScreen({ navigation }) {
  const { bgColor, textColor } = useColor();
  const [activeTab, setActiveTab] = useState('Upcoming');
  const [ratingModalVisible, setRatingModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedStars, setSelectedStars] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const orderData = {
    past: [
      {
        id: '#265896',
        name: 'I Phone 17 Plus',
        price: '₹ 50000.00',
        soldBy: 'Grocery Store',
        status: 'Delivered',
        image: require('../../../assets/mobile2.png'),
      },
      {
        id: '#265897',
        name: 'I Phone 17 Plus',
        price: '₹ 50000.00',
        soldBy: 'Grocery Store',
        status: 'Delivered',
        image: require('../../../assets/mobile2.png'),
      },
      {
        id: '#265898',
        name: 'I Phone 17 Plus',
        price: '₹ 50000.00',
        soldBy: 'Grocery Store',
        status: 'Delivered',
        image: require('../../../assets/mobile2.png'),
      },
    ],
    upcoming: [
      {
        id: '#265899',
        name: 'I Phone 17 Plus',
        price: '₹ 50000.00',
        soldBy: 'Grocery Store',
        status: 'On the way',
        arrival: '25 min',
        image: require('../../../assets/mobile2.png'),
      },
      {
        id: '#265900',
        name: 'I Phone 17 Plus',
        price: '₹ 50000.00',
        soldBy: 'Grocery Store',
        status: 'On the way',
        arrival: '25 min',
        image: require('../../../assets/mobile2.png'),
      },
      {
        id: '#265901',
        name: 'I Phone 17 Plus',
        price: '₹ 50000.00',
        soldBy: 'Grocery Store',
        status: 'On the way',
        arrival: '25 min',
        image: require('../../../assets/mobile2.png'),
      },
      {
        id: '#265902',
        name: 'I Phone 17 Plus',
        price: '₹ 50000.00',
        soldBy: 'Grocery Store',
        status: 'On the way',
        arrival: '25 min',
        image: require('../../../assets/mobile2.png'),
      },
    ],
  };

  const handleRatePress = order => {
    setSelectedOrder(order);
    setSelectedStars(0);
    setReviewText('');
    setRatingModalVisible(true);
  };

  const handleReorderPress = order => {
    navigation.navigate('OrderDetail', { order });
  };

  const handleCardPress = order => {
    navigation.navigate('OrderDetail', { order });
  };

  const handleStarPress = star => {
    setSelectedStars(star);
  };

  const handleSubmitRating = () => {
    if (selectedStars === 0) {
      Alert.alert(
        'Please select a rating',
        'Tap on the stars to rate this order.',
      );
      return;
    }

    Alert.alert(
      'Thank You!',
      `You rated ${selectedOrder?.name} with ${selectedStars} star${
        selectedStars > 1 ? 's' : ''
      }.${reviewText ? '\n\nReview: ' + reviewText : ''}`,
      [
        {
          text: 'OK',
          onPress: () => {
            console.log('Rating submitted:', {
              orderId: selectedOrder?.id,
              stars: selectedStars,
              review: reviewText,
            });

            setRatingModalVisible(false);
            setSelectedStars(0);
            setReviewText('');
            setSelectedOrder(null);
          },
        },
      ],
    );
  };

  const closeRatingModal = () => {
    setRatingModalVisible(false);
    setSelectedStars(0);
    setReviewText('');
    setSelectedOrder(null);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={bgColor} barStyle="light-content" />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: bgColor }]}>
        <Text style={styles.headerTitle}>My Orders</Text>
      </View>

      {/* Tab Switcher */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'Upcoming' && [
              styles.tabActive,
              { backgroundColor: bgColor },
            ],
          ]}
          onPress={() => setActiveTab('Upcoming')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'Upcoming' && styles.tabTextActive,
            ]}
          >
            Upcoming Order
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'Past' && [
              styles.tabActive,
              { backgroundColor: bgColor },
            ],
          ]}
          onPress={() => setActiveTab('Past')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'Past' && styles.tabTextActive,
            ]}
          >
            Past Orders
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'Past'
          ? orderData.past.map((order, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.orderCard}
                onPress={() => handleCardPress(order)}
                activeOpacity={0.7}
              >
                <Image source={order.image} style={styles.productImage} />
                <View style={styles.orderContent}>
                  <Text style={[styles.orderId, { color: bgColor }]}>
                    {order.id}
                  </Text>
                  <Text style={styles.productName}>{order.name}</Text>
                  <Text style={[styles.productPrice, { color: bgColor }]}>
                    {order.price}
                  </Text>
                  <Text style={styles.soldBy}>
                    Sold By :{' '}
                    <Text style={styles.soldByText}>{order.soldBy}</Text>
                    <Text style={styles.deliveredStatus}> • Delivered</Text>
                  </Text>
                  <View style={styles.buttonsRow}>
                    <TouchableOpacity
                      style={styles.rateButton}
                      onPress={() => handleRatePress(order)}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.rateText}>Rate</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.reorderButton,
                        { backgroundColor: bgColor },
                      ]}
                      onPress={() => handleReorderPress(order)}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.reorderText}>Re-Order</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          : orderData.upcoming.map((order, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.orderCard}
                onPress={() => handleCardPress(order)}
                activeOpacity={0.7}
              >
                <Image source={order.image} style={styles.productImage} />
                <View style={styles.orderContent}>
                  <Text style={[styles.orderId, { color: bgColor }]}>
                    {order.id}
                  </Text>
                  <Text style={[styles.productNameLink, { color: bgColor }]}>
                    {order.name}
                  </Text>
                  <Text style={[styles.productPrice, { color: bgColor }]}>
                    {order.price}
                  </Text>
                  <Text style={styles.soldBy}>
                    Sold By :{' '}
                    <Text style={styles.soldByText}>{order.soldBy}</Text>
                  </Text>
                  <View style={styles.arrivalRow}>
                    <Text style={styles.estimateLabel}>Estimate Arrival</Text>
                    <Text style={styles.estimateTime}>{order.arrival}</Text>
                    <Text style={[styles.orderStatus, { color: bgColor }]}>
                      {order.status}
                    </Text>
                  </View>
                  <View style={styles.buttonsRow}>
                    <TouchableOpacity
                      style={styles.cancelButton}
                      onPress={() =>
                        navigation.navigate('CancelOrder', { order })
                      }
                      activeOpacity={0.8}
                    >
                      <Text style={styles.cancelText}>CANCEL</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.trackButton, { backgroundColor: bgColor }]}
                      onPress={() =>
                        navigation.navigate('TrackOrder', { order })
                      }
                      activeOpacity={0.8}
                    >
                      <Text style={styles.trackText}>TRACK ORDER</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))}

        {/* Extra padding for bottom tab */}
        <View style={{ height: responsiveSize(64) }} />
      </ScrollView>

      {/* Rating Modal */}
      <RatingModal
        visible={ratingModalVisible}
        onClose={closeRatingModal}
        selectedStars={selectedStars}
        onStarPress={handleStarPress}
        reviewText={reviewText}
        setReviewText={setReviewText}
        onSubmit={handleSubmitRating}
        bgColor={bgColor}
        orderData={selectedOrder}
      />
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
    paddingTop: responsiveSize(10),
  },
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

  /* TAB SWITCHER */
  tabsContainer: {
    flexDirection: 'row',
    marginHorizontal: responsiveSize(12),
    marginTop: responsiveSize(10),
    backgroundColor: '#F3F6FB',
    borderRadius: responsiveSize(10),
    overflow: 'hidden',
    minHeight: responsiveSize(40),
  },
  tabButton: {
    flex: 1,
    paddingVertical: responsiveSize(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabActive: {},
  tabText: {
    fontSize: responsiveSize(11.5),
    color: '#222',
    fontWeight: '600',
    textAlign: 'center',
  },
  tabTextActive: {
    color: '#fff',
  },

  /* ORDER CARDS */
  orderCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: responsiveSize(12),
    marginVertical: responsiveSize(6),
    borderRadius: responsiveSize(12),
    padding: responsiveSize(11),
    borderWidth: 1,
    borderColor: '#e0e0e0',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  productImage: {
    width: responsiveSize(56),
    height: responsiveSize(56),
    borderRadius: responsiveSize(6),
    resizeMode: 'contain',
  },
  orderContent: {
    flex: 1,
    marginLeft: responsiveSize(9),
    justifyContent: 'space-between',
  },
  orderId: {
    fontSize: responsiveSize(10.5),
    fontWeight: '600',
    marginBottom: responsiveSize(3),
  },
  productName: {
    fontSize: responsiveSize(13),
    fontWeight: '700',
    color: '#000',
    marginBottom: responsiveSize(2),
  },
  productNameLink: {
    fontSize: responsiveSize(13),
    fontWeight: '700',
    marginBottom: responsiveSize(2),
    textDecorationLine: 'underline',
  },
  productPrice: {
    fontSize: responsiveSize(13),
    fontWeight: '700',
    marginBottom: responsiveSize(4),
  },
  soldBy: {
    fontSize: responsiveSize(10.5),
    color: '#666',
    marginBottom: responsiveSize(6),
  },
  soldByText: {
    color: '#666',
  },
  deliveredStatus: {
    color: '#34A853',
    fontWeight: '600',
    fontSize: responsiveSize(10.5),
  },
  arrivalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveSize(8),
    flexWrap: 'wrap',
  },
  estimateLabel: {
    fontSize: responsiveSize(10.5),
    color: '#666',
  },
  estimateTime: {
    fontSize: responsiveSize(11.5),
    color: '#000',
    marginLeft: responsiveSize(3),
    fontWeight: '600',
  },
  orderStatus: {
    fontSize: responsiveSize(10.5),
    fontWeight: '700',
    marginLeft: responsiveSize(8),
  },
  buttonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsiveSize(6),
  },
  rateButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: responsiveSize(7),
    paddingHorizontal: responsiveSize(12),
    paddingVertical: responsiveSize(7),
    flex: 1,
    alignItems: 'center',
  },
  rateText: {
    color: '#000',
    fontWeight: '600',
    fontSize: responsiveSize(11),
  },
  reorderButton: {
    borderRadius: responsiveSize(7),
    paddingHorizontal: responsiveSize(12),
    paddingVertical: responsiveSize(7),
    flex: 1,
    alignItems: 'center',
  },
  reorderText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: responsiveSize(11),
  },
  cancelButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: responsiveSize(7),
    paddingHorizontal: responsiveSize(10),
    paddingVertical: responsiveSize(7),
    flex: 1,
    alignItems: 'center',
  },
  cancelText: {
    color: '#000',
    fontWeight: '600',
    fontSize: responsiveSize(10),
  },
  trackButton: {
    borderRadius: responsiveSize(7),
    paddingHorizontal: responsiveSize(10),
    paddingVertical: responsiveSize(7),
    flex: 1,
    alignItems: 'center',
  },
  trackText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: responsiveSize(10),
  },
});
