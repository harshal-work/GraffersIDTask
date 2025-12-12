// File: D:\VinstaPlus\src\screens\BottomScreens\Home\Search\Store\BestInMobileSection.js
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
  StyleSheet,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { RECOMMENDED } from './styles';

const BestInMobileSection = ({
  addedItems,
  handleAddToCart,
  handleCardPress,
  getAddButtonScale,
  navigation,
  bgColor,
  textColor,
}) => {
  const handleViewAllBest = () => {
    navigation.navigate('BestInMobileProducts', {
      title: 'All Best in Mobile Products',
      products: RECOMMENDED,
    });
  };

  const styles = getStyles(bgColor, textColor);

  return (
    <>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Best in mobile</Text>
        <TouchableOpacity onPress={handleViewAllBest}>
          <Text style={[styles.viewAll, { color: bgColor }]}>View All</Text>
        </TouchableOpacity>
      </View>

      {/* Best in mobile card */}
      {RECOMMENDED.map(item => {
        const isAdded = addedItems[item.id + '_best'];
        const addScale = getAddButtonScale(item.id + '_best');

        return (
          <TouchableOpacity
            key={item.id + '_best'}
            style={styles.bestCard}
            onPress={() => handleCardPress(item)}
            activeOpacity={0.7}
          >
            <View style={styles.bestLeft}>
              <View
                style={[
                  styles.ratingWrapSmall,
                  { backgroundColor: `${bgColor}20` },
                ]}
              >
                <Text style={[styles.ratingTextSmall, { color: bgColor }]}>
                  {item.rating || '4.5★'}
                </Text>
              </View>
              <Text style={styles.bestTitle}>{item.title}</Text>
              <Text style={styles.bestPrice}>{item.price}</Text>
              <Text style={styles.bestDesc} numberOfLines={2}>
                {item.desc}
              </Text>
            </View>

            <View style={styles.bestRight}>
              <Image source={item.img || item.image} style={styles.bestImage} />
              <Animated.View style={{ transform: [{ scale: addScale }] }}>
                <TouchableOpacity
                  style={[
                    styles.addBtnRef,
                    {
                      borderColor: bgColor,
                      backgroundColor: isAdded ? bgColor : 'transparent',
                    },
                  ]}
                  onPress={() => handleAddToCart(item.id + '_best')}
                >
                  <Text
                    style={[
                      styles.addBtnTextRef,
                      { color: isAdded ? '#fff' : bgColor },
                    ]}
                  >
                    {isAdded ? 'ADDED' : '+ ADD'}
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </TouchableOpacity>
        );
      })}
    </>
  );
};

const getStyles = (bgColor, textColor) =>
  StyleSheet.create({
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: wp('5%'),
      marginTop: hp('2%'),
      marginBottom: hp('1%'),
    },
    sectionTitle: {
      fontSize: hp('2.2%'),
      fontWeight: 'bold',
      color: '#000',
      letterSpacing: -0.3,
    },
    viewAll: {
      fontWeight: 'bold',
      fontSize: hp('1.6%'),
    },
    bestCard: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      marginHorizontal: wp('5%'),
      marginTop: hp('1.5%'),
      padding: wp('3%'),
      borderRadius: wp('4%'),
      borderWidth: 1,
      borderColor: '#f0f0f0',
    },
    bestLeft: {
      flex: 1,
      justifyContent: 'center',
    },
    ratingWrapSmall: {
      alignSelf: 'flex-start',
      paddingHorizontal: wp('3%'),
      paddingVertical: hp('0.6%'),
      borderRadius: wp('2%'),
      marginBottom: hp('1%'),
    },
    ratingTextSmall: {
      fontWeight: 'bold',
      fontSize: hp('1.3%'),
    },
    bestTitle: {
      fontSize: hp('1.9%'),
      fontWeight: 'bold',
      marginBottom: hp('0.4%'),
      color: '#000',
    },
    bestPrice: {
      fontSize: hp('1.7%'),
      fontWeight: 'bold',
      marginBottom: hp('0.8%'),
      color: '#000',
    },
    bestDesc: {
      color: '#666',
      fontSize: hp('1.4%'),
      lineHeight: hp('2%'),
    },
    bestRight: {
      width: wp('28%'),
      alignItems: 'center',
      justifyContent: 'center',
    },
    bestImage: {
      width: wp('25%'),
      height: wp('25%'),
      resizeMode: 'contain',
      marginBottom: hp('2%'),
    },
    addBtnRef: {
      borderWidth: 2,
      borderRadius: wp('2%'),
      paddingHorizontal: wp('4%'),
      paddingVertical: hp('0.8%'),
      alignItems: 'center',
      minWidth: wp('20%'),
    },
    addBtnTextRef: {
      fontWeight: 'bold',
      fontSize: hp('1.3%'),
    },
  });

export default BestInMobileSection;
