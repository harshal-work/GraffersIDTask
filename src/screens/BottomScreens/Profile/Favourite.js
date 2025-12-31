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
  Modal,
  Alert,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useColor } from '../../../util/ColorSwitcher';

const { width } = Dimensions.get('window');
const rs = size => (width / 400) * size;

const isIOS = Platform.OS === 'ios';

const fontScale = size => (isIOS ? size * 0.95 : size);

export default function FavouritesScreen({ navigation }) {
  const useNav = useNavigation();
  const { bgColor, textColor } = useColor();
  const [selectedItem, setSelectedItem] = useState(null);
  const [showRemoveModal, setShowRemoveModal] = useState(false);

  const favouritesData = [
    {
      id: '1',
      name: 'iPhone 17 Pro Max',
      price: '₹89,999',
      originalPrice: '₹99,999',
      image: require('../../../assets/mobile2.png'),
      brand: 'Apple',
      discount: '10%',
    },
    {
      id: '2',
      name: 'Samsung Galaxy S25 Ultra',
      price: '₹1,24,999',
      originalPrice: '₹1,34,999',
      image: require('../../../assets/mobile2.png'),
      brand: 'Samsung',
      discount: '8%',
    },
    {
      id: '3',
      name: 'OnePlus 13 Pro',
      price: '₹69,999',
      originalPrice: '₹79,999',
      image: require('../../../assets/mobile2.png'),
      brand: 'OnePlus',
      discount: '12%',
    },
    {
      id: '4',
      name: 'Google Pixel 10 Pro',
      price: '₹79,999',
      originalPrice: '₹89,999',
      image: require('../../../assets/mobile2.png'),
      brand: 'Google',
      discount: '11%',
    },
    {
      id: '5',
      name: 'iPhone 17 Plus',
      price: '₹79,999',
      originalPrice: '₹89,999',
      image: require('../../../assets/mobile2.png'),
      brand: 'Apple',
      discount: '10%',
    },
  ];

  const handleAddToCart = item => {
    Alert.alert('Added to Cart', `${item.name} added to your cart!`);
  };

  const handleRemoveFromFavourites = item => {
    setSelectedItem(item);
    setShowRemoveModal(true);
  };

  const confirmRemove = () => {
    Alert.alert('Removed', `${selectedItem?.name} removed from favourites`);
    setShowRemoveModal(false);
    setSelectedItem(null);
  };

  const closeModal = () => {
    setShowRemoveModal(false);
    setSelectedItem(null);
  };

  const handleItemPress = item => {
    navigation.navigate('ProductDetail', { product: item });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={bgColor} barStyle="light-content" />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: bgColor }]}>
        <TouchableOpacity
          onPress={() => useNav.goBack()}
          style={styles.iconBtn}
        >
          <Image
            source={require('../../../assets/back.png')}
            style={[styles.icon, { tintColor: bgColor }]}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Favourites</Text>
        <View style={{ width: rs(32) }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {favouritesData.map((item, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.favouriteCard}
            onPress={() => handleItemPress(item)}
            activeOpacity={0.8}
          >
            <Image source={item.image} style={styles.productImage} />

            <View style={styles.productInfo}>
              <Text style={[styles.brandName, { color: bgColor }]}>
                {item.brand}
              </Text>

              <Text style={styles.productName} numberOfLines={2}>
                {item.name}
              </Text>

              <View style={styles.priceContainer}>
                <Text style={styles.currentPrice}>{item.price}</Text>
                <Text style={styles.originalPrice}>{item.originalPrice}</Text>
              </View>
            </View>

            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={[styles.addToCartBtn, { backgroundColor: bgColor }]}
                onPress={e => {
                  e.stopPropagation();
                  handleAddToCart(item);
                }}
              >
                <Text style={styles.addToCartText}>ADD</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.removeBtn}
                onPress={e => {
                  e.stopPropagation();
                  handleRemoveFromFavourites(item);
                }}
              >
                <Image
                  source={require('../../../assets/delete.png')}
                  style={styles.deleteIcon}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}

        <View style={{ height: isIOS ? rs(80) : rs(70) }} />
      </ScrollView>

      {/* Remove Confirmation Modal */}
      <Modal
        animationType="fade"
        transparent
        visible={showRemoveModal}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Image
              source={require('../../../assets/delete.png')}
              style={styles.modalIcon}
            />
            <Text style={styles.modalTitle}>Remove from Favourites?</Text>
            <Text style={styles.modalMessage}>
              {selectedItem?.name} will be removed from your favourites list
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={closeModal}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.modalConfirmButton,
                  { backgroundColor: '#d32f2f' },
                ]}
                onPress={confirmRemove}
              >
                <Text style={styles.modalConfirmText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  /* Header */
  header: {
    height: isIOS ? rs(90) : rs(82),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: rs(14),
    justifyContent: 'space-between',
    paddingTop: isIOS ? rs(44) : rs(26),
    paddingBottom: 0,
  },
  headerTitle: {
    color: '#fff',
    fontSize: fontScale(rs(16)),
    fontWeight: '700',
    textAlign: 'center',
    flex: 1,
    marginHorizontal: rs(8),
  },
  iconBtn: {
    width: rs(34),
    height: rs(34),
    borderRadius: rs(10),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
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
    width: rs(16),
    height: rs(16),
    resizeMode: 'contain',
  },

  scrollContent: {
    paddingHorizontal: rs(13),
    paddingBottom: isIOS ? rs(80) : rs(70),
    paddingTop: rs(8),
  },

  /* FAVOURITES CARDS */
  favouriteCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginVertical: rs(6),
    borderRadius: rs(12),
    padding: rs(11),
    borderWidth: 1,
    borderColor: '#e0e0e0',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1.5 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  productImage: {
    width: rs(64),
    height: rs(64),
    borderRadius: rs(8),
    marginRight: rs(10),
    resizeMode: 'contain',
  },
  productInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  brandName: {
    fontSize: fontScale(rs(11.5)),
    fontWeight: '600',
    marginBottom: rs(2),
  },
  productName: {
    fontSize: fontScale(rs(13)),
    fontWeight: '700',
    color: '#000',
    lineHeight: rs(18),
    marginBottom: rs(4),
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentPrice: {
    fontSize: fontScale(rs(13)),
    fontWeight: '700',
    color: '#000',
    marginRight: rs(6),
  },
  originalPrice: {
    fontSize: fontScale(rs(11.5)),
    color: '#999',
    textDecorationLine: 'line-through',
    marginRight: rs(6),
  },
  discountBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: rs(6),
    paddingVertical: rs(3),
    borderRadius: rs(5),
  },
  discountText: {
    fontSize: fontScale(rs(9.5)),
    color: '#fff',
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingLeft: rs(8),
  },
  addToCartBtn: {
    borderRadius: rs(7),
    paddingVertical: rs(7),
    paddingHorizontal: rs(12),
    marginBottom: rs(6),
    alignItems: 'center',
    minWidth: rs(52),
  },
  addToCartText: {
    color: '#fff',
    fontSize: fontScale(rs(11)),
    fontWeight: '600',
  },
  removeBtn: {
    width: rs(30),
    height: rs(30),
    borderRadius: rs(15),
    backgroundColor: '#ffebee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteIcon: {
    width: rs(14),
    height: rs(14),
    tintColor: '#d32f2f',
    resizeMode: 'contain',
  },

  /* MODAL STYLES */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: rs(18),
  },
  modalContainer: {
    width: '100%',
    maxWidth: rs(300),
    backgroundColor: '#fff',
    borderRadius: rs(14),
    padding: rs(18),
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.18,
        shadowRadius: 6,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  modalIcon: {
    width: rs(40),
    height: rs(40),
    tintColor: '#d32f2f',
    marginBottom: rs(10),
    resizeMode: 'contain',
  },
  modalTitle: {
    fontSize: fontScale(rs(14)),
    fontWeight: '700',
    color: '#000',
    marginBottom: rs(6),
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: fontScale(rs(12)),
    color: '#666',
    textAlign: 'center',
    marginBottom: rs(18),
    lineHeight: rs(16),
  },
  modalButtons: {
    flexDirection: 'row',
    gap: rs(10),
    width: '100%',
  },
  modalCancelButton: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    borderRadius: rs(9),
    paddingVertical: rs(10),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  modalCancelText: {
    fontSize: fontScale(rs(12)),
    fontWeight: '600',
    color: '#666',
  },
  modalConfirmButton: {
    flex: 1,
    borderRadius: rs(9),
    paddingVertical: rs(10),
    alignItems: 'center',
  },
  modalConfirmText: {
    fontSize: fontScale(rs(12)),
    fontWeight: '600',
    color: '#fff',
  },
});
