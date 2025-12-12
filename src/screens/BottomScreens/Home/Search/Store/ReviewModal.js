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
      fontSize: hp('1.6%'),
      fontWeight: '600',
      color: '#000',
      marginBottom: hp('1%'),
    },
    ratingContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: hp('3%'),
    },
    star: {
      fontSize: hp('4%'),
      marginHorizontal: wp('1%'),
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
      borderRadius: wp('3%'),
      padding: wp('3%'),
      fontSize: hp('1.5%'),
      minHeight: hp('10%'),
      marginBottom: hp('3%'),
    },
    reviewButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: wp('5%'),
      paddingBottom: wp('5%'),
    },
    cancelButton: {
      flex: 1,
      paddingVertical: hp('1.5%'),
      borderRadius: wp('3%'),
      borderWidth: 1,
      borderColor: '#ddd',
      alignItems: 'center',
      marginRight: wp('2%'),
    },
    cancelButtonText: {
      color: '#666',
      fontSize: hp('1.6%'),
      fontWeight: '600',
    },
    submitButton: {
      flex: 1,
      paddingVertical: hp('1.5%'),
      borderRadius: wp('3%'),
      alignItems: 'center',
      marginLeft: wp('2%'),
    },
    submitButtonText: {
      color: '#fff',
      fontSize: hp('1.6%'),
      fontWeight: 'bold',
    },
  });

export default ReviewModal;
