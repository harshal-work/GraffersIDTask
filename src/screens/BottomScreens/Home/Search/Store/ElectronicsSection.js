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
      marginTop: hp('1.5%'),
      paddingHorizontal: wp('5%'),
      marginBottom: hp('1%'),
    },
    sectionTitle: {
      fontSize: hp('2.2%'),
      fontWeight: 'bold',
      color: '#000',
      letterSpacing: -0.3,
    },
    catScroll: {
      marginTop: hp('0.5%'),
      marginBottom: hp('1%'),
    },
    catScrollContent: {
      paddingLeft: wp('5%'),
      paddingRight: wp('5%'),
      alignItems: 'center',
    },
    categoryBtn: {
      backgroundColor: '#fff',
      borderRadius: wp('10%'),
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: wp('3%'),
      paddingVertical: hp('1%'),
      paddingHorizontal: wp('3%'),
      flexDirection: 'row',
      minHeight: hp('5.5%'),
      borderWidth: 1,
      borderColor: '#f0f0f0',
    },
    categoryBtnActive: {
      backgroundColor: bgColor,
      borderColor: bgColor,
    },
    categoryIconWrapper: {
      width: wp('9%'),
      height: wp('9%'),
      borderRadius: wp('4.5%'),
      backgroundColor: '#f5f5f5',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: wp('2%'),
    },
    categoryIconWrapperActive: {
      backgroundColor: '#fff',
    },
    categoryIcon: {
      width: wp('5.5%'),
      height: wp('5.5%'),
      resizeMode: 'contain',
    },
    categoryTxt: {
      color: bgColor,
      fontSize: hp('1.7%'),
      fontWeight: 'bold',
    },
    categoryTxtActive: {
      color: '#fff',
    },
    filterPillsRow: {
      flexDirection: 'row',
      paddingHorizontal: wp('5%'),
      marginBottom: hp('1%'),
      marginTop: hp('1%'),
    },
    filterPill: {
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#efefef',
      paddingHorizontal: wp('3.5%'),
      paddingVertical: hp('0.8%'),
      borderRadius: wp('2%'),
      marginRight: wp('3%'),
      flexDirection: 'row',
      alignItems: 'center',
    },
    filterPillIcon: {
      width: wp('3.5%'),
      height: wp('2.1%'),
      marginLeft: wp('1.5%'),
    },
    filterPillText: {
      fontSize: hp('1.4%'),
      color: '#444',
      fontWeight: '500',
    },
  });

export default ElectronicsSection;
