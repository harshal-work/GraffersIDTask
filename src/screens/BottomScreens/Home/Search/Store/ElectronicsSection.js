// File: D:\VinstaPlus\src\screens\BottomScreens\Home\Search\Store\ElectronicsSection.js
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { CATEGORIES } from './styles';

const ElectronicsSection = ({
  activeCategory,
  setActiveCategory,
  onFilterPress,
  bgColor,
  textColor,
}) => {
  const styles = getStyles(bgColor, textColor);

  return (
    <>
      {/* Available Items header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Available Electronics Items</Text>
      </View>

      {/* Categories horizontal */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.catScroll}
        contentContainerStyle={styles.catScrollContent}
      >
        {CATEGORIES.map(cat => {
          const isActive = activeCategory === cat.name;
          return (
            <TouchableOpacity
              key={cat.id}
              style={[styles.categoryBtn, isActive && styles.categoryBtnActive]}
              onPress={() => setActiveCategory(cat.name)}
            >
              <View
                style={[
                  styles.categoryIconWrapper,
                  isActive && styles.categoryIconWrapperActive,
                ]}
              >
                <Image
                  source={cat.icon}
                  style={[
                    styles.categoryIcon,
                    isActive && styles.categoryIconActive,
                  ]}
                />
              </View>
              <Text
                style={[
                  styles.categoryTxt,
                  isActive && styles.categoryTxtActive,
                ]}
              >
                {cat.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Filter pills row */}
      <View style={styles.filterPillsRow}>
        <TouchableOpacity style={styles.filterPill} onPress={onFilterPress}>
          <Text style={styles.filterPillText}>Filters</Text>
          <Image
            source={require('../../../../../assets/filter.png')}
            style={[styles.filterPillIcon, { tintColor: bgColor }]}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.filterPill}>
          <Text style={styles.filterPillText}>Explore</Text>
          <Image
            source={require('../../../../../assets/dropdown.png')}
            style={[styles.filterPillIcon, { tintColor: bgColor }]}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.filterPill}>
          <Text style={styles.filterPillText}>Great Offers</Text>
          <Image
            source={require('../../../../../assets/dropdown.png')}
            style={[styles.filterPillIcon, { tintColor: bgColor }]}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

const getStyles = (bgColor, textColor) =>
  StyleSheet.create({
    sectionHeader: {
      marginTop: hp('1.3%'),
      paddingHorizontal: wp('4%'),
      marginBottom: hp('0.8%'),
    },
    sectionTitle: {
      fontSize: hp('1.9%'),
      fontWeight: 'bold',
      color: '#000',
      letterSpacing: -0.3,
    },
    catScroll: {
      marginTop: hp('0.4%'),
      marginBottom: hp('0.8%'),
    },
    catScrollContent: {
      paddingLeft: wp('4%'),
      paddingRight: wp('4%'),
      alignItems: 'center',
    },
    categoryBtn: {
      backgroundColor: '#fff',
      borderRadius: wp('9%'),
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: wp('2.5%'),
      paddingVertical: hp('0.8%'),
      paddingHorizontal: wp('2.5%'),
      flexDirection: 'row',
      minHeight: hp('4.8%'),
      borderWidth: 1,
      borderColor: '#f0f0f0',
    },
    categoryBtnActive: {
      backgroundColor: bgColor,
      borderColor: bgColor,
    },
    categoryIconWrapper: {
      width: wp('8%'),
      height: wp('8%'),
      borderRadius: wp('4%'),
      backgroundColor: '#f5f5f5',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: wp('1.6%'),
    },
    categoryIconWrapperActive: {
      backgroundColor: '#fff',
    },
    categoryIcon: {
      width: wp('4.8%'),
      height: wp('4.8%'),
      resizeMode: 'contain',
    },
    categoryIconActive: {},
    categoryTxt: {
      color: bgColor,
      fontSize: hp('1.5%'),
      fontWeight: 'bold',
    },
    categoryTxtActive: {
      color: '#fff',
    },
    filterPillsRow: {
      flexDirection: 'row',
      paddingHorizontal: wp('4%'),
      marginBottom: hp('0.8%'),
      marginTop: hp('0.8%'),
    },
    filterPill: {
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#efefef',
      paddingHorizontal: wp('3%'),
      paddingVertical: hp('0.6%'),
      borderRadius: wp('1.8%'),
      marginRight: wp('2.5%'),
      flexDirection: 'row',
      alignItems: 'center',
    },
    filterPillIcon: {
      width: wp('3.1%'),
      height: wp('1.9%'),
      marginLeft: wp('1.2%'),
      resizeMode: 'contain',
    },
    filterPillText: {
      fontSize: hp('1.25%'),
      color: '#444',
      fontWeight: '500',
    },
  });

export default ElectronicsSection;
