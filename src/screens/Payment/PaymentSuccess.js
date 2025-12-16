import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  SafeAreaView,
  BackHandler,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useColor } from '../../util/ColorSwitcher';

const PaymentSuccess = () => {
  const navigation = useNavigation();
  const { bgColor, textColor } = useColor();

  // Handle Android hardware back button
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate('Main');
        return true; // Prevent default back behavior
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );

      return () => backHandler.remove();
    }, [navigation]),
  );

  const handleBackPress = () => {
    navigation.navigate('Main');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <StatusBar backgroundColor={bgColor} barStyle="light-content" />

      {/* BACK BUTTON */}
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <View style={[styles.iconBtn, { backgroundColor: textColor }]}>
          <Image
            source={require('../../assets/back.png')}
            style={[styles.backIcon, { tintColor: bgColor }]}
          />
        </View>
      </TouchableOpacity>

      {/* TICK ICON SECTION */}
      <View style={styles.centerSection}>
        <View style={styles.outerCircle}>
          <View style={[styles.innerCircle, { backgroundColor: textColor }]}>
            <Image
              source={require('../../assets/tick.png')}
              style={[styles.tickIcon, { tintColor: bgColor }]}
            />
          </View>
        </View>

        {/* SUCCESS TEXT */}
        <Text style={[styles.title, { color: textColor }]}>
          Congratulations!
        </Text>
        <Text style={[styles.subtitle, { color: textColor }]}>
          You Ordered Successfully
        </Text>
        <Text style={[styles.desc, { color: textColor }]}>
          You successfully placed an order, your order is confirmed and will be
          delivered ASAP ThankYou.{'\n'}Wish you enjoy the Product.
        </Text>
      </View>

      {/* BUTTON */}
      <View style={styles.buttonSection}>
        <TouchableOpacity
          style={[styles.keepBrowsingBtn, { backgroundColor: textColor }]}
          onPress={() => navigation.navigate('Main')}
        >
          <Text style={[styles.keepBrowsingText, { color: bgColor }]}>
            KEEP BROWSING
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PaymentSuccess;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 40,
  },

  backButton: {
    position: 'absolute',
    top: 55,
    left: 20,
    zIndex: 10,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backIcon: {
    width: 20,
    height: 20,
  },

  centerSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 120,
    paddingHorizontal: 20,
  },

  outerCircle: {
    backgroundColor: '#fff',
    width: 130,
    height: 130,
    borderRadius: 65,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  innerCircle: {
    width: 90,
    height: 90,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tickIcon: {
    width: 40,
    height: 40,
  },

  title: {
    fontSize: 22,
    fontFamily: 'Figtree-Bold',
    marginTop: 30,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Figtree-SemiBold',
    marginTop: 6,
  },
  desc: {
    fontSize: 14,
    fontFamily: 'Figtree-Regular',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 20,
    opacity: 0.9,
  },

  buttonSection: {
    width: '100%',
    alignItems: 'center',
  },

  keepBrowsingBtn: {
    borderRadius: 10,
    width: '85%',
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  keepBrowsingText: {
    fontSize: 16,
    fontWeight: '900',
  },
});
