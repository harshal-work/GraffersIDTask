// File: D:\VinstaPlus\src\screens\BottomScreens\Home\Search\Store\RecommendedSection.js
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

const RecommendedSection = ({
  addedItems,
  handleAddToCart,
  handleCardPress,
  getAddButtonScale,
  navigation,
  bgColor,
  textColor,
}) => {
  const handleViewAll = () => {
    navigation.navigate('RecommendedProducts', {
      title: 'All Recommended Products',
      products: RECOMMENDED,
    });
  };

  const styles = getStyles(bgColor, textColor);

  return (
    <>
      <View style={styles.recoHeader}>
        <Text style={styles.recoTitle}>Recommended for you</Text>
        <TouchableOpacity onPress={handleViewAll}>
          <Text style={[styles.viewAll, { color: bgColor }]}>View All</Text>
        </TouchableOpacity>
      </View>

      {/* Recommended vertical cards */}
      {RECOMMENDED.map(item => {
        const isAdded = addedItems[item.id];
        const addScale = getAddButtonScale(item.id);

        return (
          <TouchableOpacity
            key={item.id}
            style={styles.recoCardVertical}
            onPress={() => handleCardPress(item)}
            activeOpacity={0.7}
          >
            <View style={styles.recoCardLeftVertical}>
              <View
                style={[styles.ratingWrap, { backgroundColor: `${bgColor}20` }]}
              >
                <Text style={[styles.ratingText, { color: bgColor }]}>
                  {item.rating || '4.5★'}
                </Text>
              </View>
              <Text style={styles.recoTitleItem}>{item.title}</Text>
              <Text style={styles.recoPrice}>{item.price}</Text>
              <Text style={styles.recoDesc} numberOfLines={2}>
                {item.desc}
              </Text>
            </View>

            <View style={styles.recoCardRightVertical}>
              <Image
                source={item.img || item.image}
                style={styles.recoImageVertical}
              />
              <Animated.View style={{ transform: [{ scale: addScale }] }}>
                <TouchableOpacity
                  style={[
                    styles.addBtnRef,
                    {
                      borderColor: bgColor,
                      backgroundColor: isAdded ? bgColor : 'transparent',
                    },
                  ]}
                  onPress={() => handleAddToCart(item.id)}
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
    recoHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: wp('5%'),
      marginTop: hp('2%'),
      marginBottom: hp('1%'),
    },
    recoTitle: {
      fontSize: hp('2.2%'),
      fontWeight: 'bold',
      color: '#000',
      letterSpacing: -0.3,
    },
    viewAll: {
      fontWeight: 'bold',
      fontSize: hp('1.6%'),
    },
    recoCardVertical: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      marginHorizontal: wp('5%'),
      marginTop: hp('1.5%'),
      padding: wp('3%'),
      borderRadius: wp('4%'),
      borderWidth: 1,
      borderColor: '#f0f0f0',
    },
    recoCardLeftVertical: {
      flex: 1,
      paddingRight: wp('3%'),
      justifyContent: 'center',
    },
    recoCardRightVertical: {
      width: wp('30%'),
      alignItems: 'center',
      justifyContent: 'center',
    },
    recoImageVertical: {
      width: wp('25%'),
      height: wp('25%'),
      resizeMode: 'contain',
      marginBottom: hp('2%'),
    },
    ratingWrap: {
      alignSelf: 'flex-start',
      paddingHorizontal: wp('3%'),
      paddingVertical: hp('0.6%'),
      borderRadius: wp('2%'),
      marginBottom: hp('1%'),
    },
    ratingText: {
      fontWeight: 'bold',
      fontSize: hp('1.3%'),
    },
    recoTitleItem: {
      fontSize: hp('1.9%'),
      fontWeight: 'bold',
      marginBottom: hp('0.4%'),
      color: '#000',
    },
    recoPrice: {
      fontSize: hp('1.7%'),
      fontWeight: 'bold',
      marginBottom: hp('0.8%'),
      color: '#000',
    },
    recoDesc: {
      fontSize: hp('1.4%'),
      color: '#666',
      lineHeight: hp('2%'),
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

export default RecommendedSection;
