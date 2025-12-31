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
  Platform,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useColor } from '../../util/ColorSwitcher';

const PaymentSuccess = () => {
  const navigation = useNavigation();
  const { bgColor, textColor } = useColor();

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate('Main');
        return true;
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
    paddingBottom: 32,
  },

  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 45 : 35,
    left: 16,
    zIndex: 10,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  backIcon: {
    width: 18,
    height: 18,
  },

  centerSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    paddingHorizontal: 16,
  },

  outerCircle: {
    backgroundColor: '#fff',
    width: 110,
    height: 110,
    borderRadius: 55,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  innerCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tickIcon: {
    width: 34,
    height: 34,
  },

  title: {
    fontSize: 18,
    fontFamily: 'Figtree-Bold',
    marginTop: 24,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Figtree-SemiBold',
    marginTop: 5,
  },
  desc: {
    fontSize: 12.5,
    fontFamily: 'Figtree-Regular',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 17,
    opacity: 0.9,
  },

  buttonSection: {
    width: '100%',
    alignItems: 'center',
  },

  keepBrowsingBtn: {
    borderRadius: 9,
    width: '85%',
    paddingVertical: 12,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  keepBrowsingText: {
    fontSize: 14,
    fontWeight: '900',
  },
});
