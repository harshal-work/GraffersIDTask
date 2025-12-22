// File: D:\VinstaPlus\src\screens\BottomScreens\Home\Search\Store\ReviewModal.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  StyleSheet,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { modalStyles } from './styles';

const ReviewModal = ({ visible, onClose, bgColor, textColor }) => {
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');

  const handleSubmit = () => {
    console.log('Review submitted:', { rating, reviewText });
    onClose();
  };

  const styles = getStyles(bgColor, textColor);

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={modalStyles.modalOverlay}>
        <TouchableOpacity
          style={modalStyles.modalBackdrop}
          activeOpacity={1}
          onPress={onClose}
        />
        <View style={modalStyles.bottomSheetContainer}>
          <View style={modalStyles.bottomSheetHandle} />
          <View style={modalStyles.bottomSheetHeader}>
            <Text style={modalStyles.bottomSheetTitle}>Write a Review</Text>
            <TouchableOpacity
              onPress={onClose}
              style={[
                modalStyles.closeButton,
                { backgroundColor: `${bgColor}20` },
              ]}
            >
              <Text style={[modalStyles.closeButtonText, { color: bgColor }]}>
                ✕
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            style={modalStyles.bottomSheetContent}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.reviewLabel}>Rate your experience</Text>
            <View style={styles.ratingContainer}>
              {[1, 2, 3, 4, 5].map(star => (
                <TouchableOpacity key={star} onPress={() => setRating(star)}>
                  <Text
                    style={[
                      styles.star,
                      star <= rating ? styles.starActive : styles.starInactive,
                    ]}
                  >
                    ★
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.reviewLabel}>Your Review</Text>
            <TextInput
              style={styles.reviewInput}
              multiline
              numberOfLines={4}
              placeholder="Share your experience with this store..."
              value={reviewText}
              onChangeText={setReviewText}
              textAlignVertical="top"
            />
          </ScrollView>

          <View style={styles.reviewButtons}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.submitButton, { backgroundColor: bgColor }]}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>Submit Review</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const getStyles = (bgColor, textColor) =>
  StyleSheet.create({
    reviewLabel: {
      fontSize: hp('1.4%'),
      fontWeight: '600',
      color: '#000',
      marginBottom: hp('0.8%'),
    },
    ratingContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: hp('2.4%'),
    },
    star: {
      fontSize: hp('3.3%'),
      marginHorizontal: wp('0.9%'),
    },
    starActive: {
      color: '#FFC529',
    },
    starInactive: {
      color: '#ddd',
    },
    reviewInput: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: wp('2.5%'),
      padding: wp('2.6%'),
      fontSize: hp('1.3%'),
      minHeight: hp('8.5%'),
      marginBottom: hp('2.4%'),
    },
    reviewButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: wp('4.5%'),
      paddingBottom: wp('4.5%'),
    },
    cancelButton: {
      flex: 1,
      paddingVertical: hp('1.2%'),
      borderRadius: wp('2.5%'),
      borderWidth: 1,
      borderColor: '#ddd',
      alignItems: 'center',
      marginRight: wp('1.8%'),
    },
    cancelButtonText: {
      color: '#666',
      fontSize: hp('1.4%'),
      fontWeight: '600',
    },
    submitButton: {
      flex: 1,
      paddingVertical: hp('1.2%'),
      borderRadius: wp('2.5%'),
      alignItems: 'center',
      marginLeft: wp('1.8%'),
    },
    submitButtonText: {
      color: '#fff',
      fontSize: hp('1.4%'),
      fontWeight: 'bold',
    },
  });

export default ReviewModal;
