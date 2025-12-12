// File: D:\VinstaPlus\src\screens\BottomScreens\Home\Search\Store\OffersModal.js
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  StyleSheet,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { modalStyles } from './styles';

const OffersModal = ({ visible, onClose, bgColor, textColor }) => {
  const offers = [
    {
      id: 1,
      title: 'Festival Special',
      description: 'Get 20% off on all mobile phones',
    },
    {
      id: 2,
      title: 'First Order',
      description: 'Flat ₹500 off on first purchase',
    },
    {
      id: 3,
      title: 'Weekend Sale',
      description: 'Buy 1 get 1 free on accessories',
    },
  ];

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
            <Text style={modalStyles.bottomSheetTitle}>Available Offers</Text>
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
            {offers.map(offer => (
              <View key={offer.id} style={styles.offerItem}>
                <View style={[styles.offerBadge, { backgroundColor: bgColor }]}>
                  <Text style={styles.offerBadgeText}>OFFER</Text>
                </View>
                <View style={styles.offerContent}>
                  <Text style={styles.offerTitle}>{offer.title}</Text>
                  <Text style={styles.offerDescription}>
                    {offer.description}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>

          <TouchableOpacity
            style={[styles.applyButton, { backgroundColor: bgColor }]}
            onPress={onClose}
          >
            <Text style={styles.applyButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const getStyles = (bgColor, textColor) =>
  StyleSheet.create({
    offerItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: hp('2%'),
      backgroundColor: '#f9f9f9',
      borderRadius: wp('3%'),
      padding: wp('3%'),
    },
    offerBadge: {
      paddingHorizontal: wp('3%'),
      paddingVertical: hp('0.5%'),
      borderRadius: wp('2%'),
      marginRight: wp('3%'),
    },
    offerBadgeText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: hp('1.1%'),
    },
    offerContent: {
      flex: 1,
    },
    offerTitle: {
      fontSize: hp('1.6%'),
      fontWeight: 'bold',
      color: '#000',
      marginBottom: hp('0.5%'),
    },
    offerDescription: {
      fontSize: hp('1.4%'),
      color: '#666',
    },
    applyButton: {
      marginHorizontal: wp('5%'),
      marginVertical: hp('2%'),
      paddingVertical: hp('1.5%'),
      borderRadius: wp('3%'),
      alignItems: 'center',
    },
    applyButtonText: {
      color: '#fff',
      fontSize: hp('1.6%'),
      fontWeight: 'bold',
    },
  });

export default OffersModal;
