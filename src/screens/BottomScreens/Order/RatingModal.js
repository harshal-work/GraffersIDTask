import React from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

// compact sizing (a bit smaller than 375 base)
const BASE_WIDTH = 400;
const responsiveSize = size => (width / BASE_WIDTH) * size;

const RatingModal = ({
  visible,
  onClose,
  selectedStars,
  onStarPress,
  reviewText,
  setReviewText,
  onSubmit,
  bgColor,
  orderData,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <TouchableOpacity
              onPress={onClose}
              activeOpacity={0.7}
              hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            >
              {/* optional back icon */}
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Leave a Review</Text>
            <View style={{ width: responsiveSize(18) }} />
          </View>

          {/* Order Card */}
          <View style={styles.reviewCard}>
            <Image
              source={
                orderData?.image || require('../../../assets/mobile2.png')
              }
              style={styles.foodImg}
            />
            <View style={styles.reviewCardContent}>
              <Text style={[styles.orderId, { color: bgColor }]}>
                {orderData?.id || '#265896'}
              </Text>
              <Text style={styles.orderTitle}>
                {orderData?.name || 'Product Name'}
              </Text>
              <Text style={styles.orderMeta}>
                Sold By: {orderData?.soldBy || 'Store Name'}
              </Text>
            </View>
            <Text style={styles.price}>{orderData?.price || '₹ 50000.00'}</Text>
          </View>

          {/* Rating Section */}
          <Text style={styles.howText}>How is your order?</Text>
          <Text style={styles.subHowText}>
            Please give your rating & also your review...
          </Text>

          {/* Stars Row */}
          <View style={styles.starRow}>
            {[1, 2, 3, 4, 5].map(star => (
              <TouchableOpacity
                key={star}
                onPress={() => onStarPress(star === selectedStars ? 0 : star)}
                activeOpacity={0.7}
              >
                <Image
                  source={require('../../../assets/star.png')}
                  style={[
                    styles.starRatingIcon,
                    selectedStars >= star
                      ? { tintColor: bgColor }
                      : { tintColor: '#000' },
                  ]}
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* Review Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputBox}
              placeholder="Write your review..."
              placeholderTextColor="#999"
              value={reviewText}
              onChangeText={setReviewText}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          {/* Buttons */}
          <View style={styles.modalBtnRow}>
            <TouchableOpacity
              style={styles.modalCancelBtn}
              onPress={onClose}
              activeOpacity={0.8}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalSubmitBtn, { backgroundColor: bgColor }]}
              onPress={onSubmit}
              activeOpacity={0.8}
            >
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: responsiveSize(20),
    borderTopRightRadius: responsiveSize(20),
    paddingHorizontal: responsiveSize(16),
    paddingTop: responsiveSize(18),
    paddingBottom: responsiveSize(22),
    maxHeight: height * 0.8,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: responsiveSize(14),
    paddingHorizontal: responsiveSize(2),
  },
  modalTitle: {
    fontSize: responsiveSize(14),
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
    flex: 1,
    marginLeft: responsiveSize(16),
  },

  reviewCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: responsiveSize(10),
    borderRadius: responsiveSize(10),
    marginBottom: responsiveSize(18),
    borderWidth: 1,
    borderColor: '#eee',
  },
  foodImg: {
    width: responsiveSize(48),
    height: responsiveSize(48),
    borderRadius: responsiveSize(6),
    marginRight: responsiveSize(9),
    resizeMode: 'contain',
  },
  reviewCardContent: {
    flex: 1,
    justifyContent: 'center',
  },
  orderId: {
    fontSize: responsiveSize(10.5),
    fontWeight: '600',
    marginBottom: responsiveSize(2),
  },
  orderTitle: {
    fontSize: responsiveSize(13),
    fontWeight: '700',
    color: '#000',
    marginBottom: responsiveSize(2),
  },
  orderMeta: {
    fontSize: responsiveSize(10.5),
    color: '#666',
    fontWeight: '500',
  },
  price: {
    fontSize: responsiveSize(13),
    fontWeight: '700',
    color: '#000',
  },

  howText: {
    fontSize: responsiveSize(14),
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
    marginBottom: responsiveSize(4),
  },
  subHowText: {
    fontSize: responsiveSize(11.5),
    color: '#666',
    textAlign: 'center',
    marginBottom: responsiveSize(18),
    fontWeight: '500',
    lineHeight: responsiveSize(16),
  },

  starRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsiveSize(20),
    gap: responsiveSize(4),
  },
  starRatingIcon: {
    width: responsiveSize(20),
    height: responsiveSize(20),
    resizeMode: 'contain',
  },

  inputContainer: {
    marginBottom: responsiveSize(20),
  },
  inputBox: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: responsiveSize(10),
    paddingHorizontal: responsiveSize(10),
    paddingVertical: responsiveSize(8),
    height: responsiveSize(96),
    fontSize: responsiveSize(11.5),
    color: '#000',
    backgroundColor: '#fff',
    textAlignVertical: 'top',
    fontWeight: '500',
    lineHeight: responsiveSize(16),
  },

  modalBtnRow: {
    flexDirection: 'row',
    gap: responsiveSize(9),
    marginHorizontal: responsiveSize(2),
  },
  modalCancelBtn: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: responsiveSize(8),
    paddingVertical: responsiveSize(11),
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalSubmitBtn: {
    flex: 1,
    borderRadius: responsiveSize(8),
    paddingVertical: responsiveSize(11),
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cancelText: {
    fontSize: responsiveSize(11.5),
    fontWeight: '600',
    color: '#666',
  },
  submitText: {
    fontSize: responsiveSize(11.5),
    fontWeight: '600',
    color: '#fff',
  },
});

export default RatingModal;
