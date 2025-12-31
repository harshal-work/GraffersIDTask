// File: D:\VinstaPlus\src\screens\BottomScreens\Home\Search\Store\styles.js
import { StyleSheet, Dimensions, Platform } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const W = Dimensions.get('window').width;

// Safe vibration
export const safeVibrate = (duration = 30) => {
  try {
    if (Vibration && typeof Vibration.vibrate === 'function') {
      Vibration.vibrate(duration);
    }
  } catch (e) {
    // ignore
  }
};

// Data
export const CATEGORIES = [
  {
    id: 'c1',
    name: 'Mobile',
    icon: require('../../../../../assets/mobile2.png'),
    img: require('../../../../../assets/mobile2.png'),
  },
  {
    id: 'c2',
    name: 'Computer',
    icon: require('../../../../../assets/mobile2.png'),
    img: require('../../../../../assets/mobile2.png'),
  },
  {
    id: 'c3',
    name: 'Laptop',
    icon: require('../../../../../assets/mobile2.png'),
    img: require('../../../../../assets/mobile2.png'),
  },
];

export const RECOMMENDED = [
  {
    id: 'r1',
    title: 'Iphone 17 plus',
    price: '₹100000.00',
    desc: 'Have a 6.5-inch Q1.0D screen and Iphone 17 plus is shown in the phone.',
    image: require('../../../../../assets/mobile2.png'),
    img: require('../../../../../assets/mobile2.png'),
    rating: '4.5★',
  },
  {
    id: 'r2',
    title: 'Iphone 17 plus',
    price: '₹100000.00',
    desc: 'Have a 6.5-inch Q1.0D screen and Iphone 17 plus is shown in the phone.',
    image: require('../../../../../assets/mobile3.png'),
    img: require('../../../../../assets/mobile3.png'),
    rating: '4.5★',
  },
];

// Common styles
export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingBottom: hp('4%'),
  },
});

// Modal styles
export const modalStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  bottomSheetContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: wp('6%'),
    borderTopRightRadius: wp('6%'),
    maxHeight: hp('80%'),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  bottomSheetHandle: {
    alignSelf: 'center',
    width: wp('15%'),
    height: hp('0.5%'),
    backgroundColor: '#ddd',
    borderRadius: wp('1%'),
    marginTop: hp('1%'),
    marginBottom: hp('1%'),
  },
  bottomSheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('2%'),
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  bottomSheetTitle: {
    fontSize: hp('2.2%'),
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  closeButton: {
    width: wp('8%'),
    height: wp('8%'),
    borderRadius: wp('4%'),
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: hp('2.5%'),
    color: '#666',
    fontWeight: '300',
  },
  bottomSheetContent: {
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('2%'),
    maxHeight: hp('50%'),
  },
});
