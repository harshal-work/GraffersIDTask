// File: D:\VinstaPlus\src\screens\BottomScreens\Home\Search\Store\FiltersScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  StyleSheet,
  Switch,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const FiltersScreen = ({
  visible,
  onClose,
  navigation,
  bgColor,
  textColor,
}) => {
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [inStock, setInStock] = useState(true);
  const [fastDelivery, setFastDelivery] = useState(false);

  const categories = ['Mobile', 'Computer', 'Laptop', 'Tablet', 'Accessories'];
  const brands = [
    'Apple',
    'Samsung',
    'OnePlus',
    'Xiaomi',
    'Realme',
    'Oppo',
    'Vivo',
  ];

  const toggleCategory = category => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const toggleBrand = brand => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  const applyFilters = () => {
    console.log('Applied filters:', {
      priceRange,
      selectedCategories,
      selectedBrands,
      inStock,
      fastDelivery,
    });
    onClose();
  };

  const resetFilters = () => {
    setPriceRange([0, 100000]);
    setSelectedCategories([]);
    setSelectedBrands([]);
    setInStock(true);
    setFastDelivery(false);
  };

  const styles = getStyles(bgColor, textColor);

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Filters</Text>
            <TouchableOpacity
              onPress={onClose}
              style={[styles.closeButton, { backgroundColor: `${bgColor}20` }]}
            >
              <Text style={[styles.closeButtonText, { color: bgColor }]}>
                ✕
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
          >
            {/* Price Range */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Price Range</Text>
              <View style={styles.priceRangeContainer}>
                <View style={styles.priceInputContainer}>
                  <Text style={styles.priceLabel}>Min</Text>
                  <View style={styles.priceInput}>
                    <Text style={styles.priceText}>₹{priceRange[0]}</Text>
                  </View>
                </View>
                <View style={styles.priceInputContainer}>
                  <Text style={styles.priceLabel}>Max</Text>
                  <View style={styles.priceInput}>
                    <Text style={styles.priceText}>₹{priceRange[1]}</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Categories */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Categories</Text>
              <View style={styles.tagsContainer}>
                {categories.map(category => (
                  <TouchableOpacity
                    key={category}
                    style={[
                      styles.tag,
                      selectedCategories.includes(category) &&
                        styles.tagSelected,
                    ]}
                    onPress={() => toggleCategory(category)}
                  >
                    <Text
                      style={[
                        styles.tagText,
                        selectedCategories.includes(category) &&
                          styles.tagTextSelected,
                      ]}
                    >
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Brands */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Brands</Text>
              <View style={styles.tagsContainer}>
                {brands.map(brand => (
                  <TouchableOpacity
                    key={brand}
                    style={[
                      styles.tag,
                      selectedBrands.includes(brand) && styles.tagSelected,
                    ]}
                    onPress={() => toggleBrand(brand)}
                  >
                    <Text
                      style={[
                        styles.tagText,
                        selectedBrands.includes(brand) &&
                          styles.tagTextSelected,
                      ]}
                    >
                      {brand}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Other Filters */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Other Filters</Text>

              <View style={styles.filterRow}>
                <Text style={styles.filterLabel}>In Stock Only</Text>
                <Switch
                  value={inStock}
                  onValueChange={setInStock}
                  trackColor={{ false: '#767577', true: bgColor }}
                  thumbColor="#fff"
                />
              </View>

              <View style={styles.filterRow}>
                <Text style={styles.filterLabel}>Fast Delivery</Text>
                <Switch
                  value={fastDelivery}
                  onValueChange={setFastDelivery}
                  trackColor={{ false: '#767577', true: bgColor }}
                  thumbColor="#fff"
                />
              </View>
            </View>
          </ScrollView>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.resetButton} onPress={resetFilters}>
              <Text style={styles.resetButtonText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.applyButton, { backgroundColor: bgColor }]}
              onPress={applyFilters}
            >
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const getStyles = (bgColor, textColor) =>
  StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
    },
    modalContainer: {
      backgroundColor: '#fff',
      borderTopLeftRadius: wp('6%'),
      borderTopRightRadius: wp('6%'),
      maxHeight: hp('80%'),
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: wp('5%'),
      paddingVertical: hp('2%'),
      borderBottomWidth: 1,
      borderBottomColor: '#f0f0f0',
    },
    headerTitle: {
      fontSize: hp('2.2%'),
      fontWeight: 'bold',
      color: '#000',
    },
    closeButton: {
      width: wp('8%'),
      height: wp('8%'),
      borderRadius: wp('4%'),
      justifyContent: 'center',
      alignItems: 'center',
    },
    closeButtonText: {
      fontSize: hp('2.5%'),
      fontWeight: '300',
    },
    content: {
      paddingHorizontal: wp('5%'),
      paddingVertical: hp('2%'),
      maxHeight: hp('60%'),
    },
    section: {
      marginBottom: hp('3%'),
    },
    sectionTitle: {
      fontSize: hp('1.8%'),
      fontWeight: 'bold',
      color: '#000',
      marginBottom: hp('1.5%'),
    },
    priceRangeContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    priceInputContainer: {
      flex: 1,
      marginHorizontal: wp('1%'),
    },
    priceLabel: {
      fontSize: hp('1.4%'),
      color: '#666',
      marginBottom: hp('0.5%'),
    },
    priceInput: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: wp('2%'),
      padding: wp('3%'),
      backgroundColor: '#f9f9f9',
    },
    priceText: {
      fontSize: hp('1.6%'),
      color: '#000',
    },
    tagsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    tag: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: wp('3%'),
      paddingHorizontal: wp('3%'),
      paddingVertical: hp('0.8%'),
      marginRight: wp('2%'),
      marginBottom: hp('1%'),
      backgroundColor: '#fff',
    },
    tagSelected: {
      backgroundColor: bgColor,
      borderColor: bgColor,
    },
    tagText: {
      fontSize: hp('1.4%'),
      color: '#666',
    },
    tagTextSelected: {
      color: '#fff',
    },
    filterRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: hp('1%'),
      borderBottomWidth: 1,
      borderBottomColor: '#f0f0f0',
    },
    filterLabel: {
      fontSize: hp('1.6%'),
      color: '#000',
    },
    actionButtons: {
      flexDirection: 'row',
      paddingHorizontal: wp('5%'),
      paddingVertical: hp('2%'),
      borderTopWidth: 1,
      borderTopColor: '#f0f0f0',
    },
    resetButton: {
      flex: 1,
      paddingVertical: hp('1.5%'),
      borderRadius: wp('3%'),
      borderWidth: 1,
      borderColor: '#ddd',
      alignItems: 'center',
      marginRight: wp('2%'),
    },
    resetButtonText: {
      color: '#666',
      fontSize: hp('1.6%'),
      fontWeight: '600',
    },
    applyButton: {
      flex: 1,
      paddingVertical: hp('1.5%'),
      borderRadius: wp('3%'),
      alignItems: 'center',
      marginLeft: wp('2%'),
    },
    applyButtonText: {
      color: '#fff',
      fontSize: hp('1.6%'),
      fontWeight: 'bold',
    },
  });

export default FiltersScreen;
