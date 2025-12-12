import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  Dimensions,
  Platform,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const MAP_HEIGHT = height * 0.32;
const STATUS_BAR_HEIGHT =
  Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 24;
const CIRCLE_SIZE = Math.min(74, width * 0.18);
const PRIMARY_COLOR = '#FF8303';

const IMAGES = {
  mapbg: require('../../../assets/mapbgg.png'),
  location: require('../../../assets/location.png'),
  greendrop: require('../../../assets/drop.png'),
  boy: require('../../../assets/user2.png'),
  c1: require('../../../assets/clock.png'),
  bikee: require('../../../assets/bike.png'),
  o1: require('../../../assets/clock.png'),
  h1: require('../../../assets/office.png'),
  h2: require('../../../assets/ghar.png'),
  tick: require('../../../assets/tick.png'),
  back: require('../../../assets/back.png'),
  upload: require('../../../assets/upload.png'),
};

const CancelOrder = () => {
  const navigation = useNavigation();
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [showCanceledPopup, setShowCanceledPopup] = useState(false);
  const [timeLeft, setTimeLeft] = useState(59);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  const handlePressCancel = () => setShowCancelPopup(true);

  const handleConfirmCancel = () => {
    setShowCancelPopup(false);
    setShowCanceledPopup(true);
    setTimeout(() => {
      setShowCanceledPopup(false);
      navigation.goBack();
    }, 1500);
  };

  const handleKeepOrder = () => navigation.goBack();

  const renderTime = () => {
    const mm = `0${Math.floor(timeLeft / 60)}`;
    const ss = timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60;
    return `${mm}:${ss}`;
  };

  const markerSize = Math.min(34, width * 0.085);
  const startX = width * 0.5 - markerSize / 2;
  const startY = MAP_HEIGHT * 0.32;
  const verticalLength = MAP_HEIGHT * 0.18;
  const horizontalLength = width * 0.27;
  const vertical1Y = startY + verticalLength;
  const horizontalRightX = startX + horizontalLength;
  const vertical2Y = vertical1Y + verticalLength;
  const leftY = vertical2Y;
  const boyX = startX + horizontalLength / 2;
  const boyY = vertical1Y + verticalLength / 2;

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent
      />
      <View style={[styles.fixedMapArea, { height: MAP_HEIGHT }]}>
        <Image source={IMAGES.mapbg} style={styles.mapBg} />
        <View style={[styles.header, { top: STATUS_BAR_HEIGHT + 6 }]}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.iconBtn}
          >
            <Image source={IMAGES.back} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Cancel Order</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.absFill}>
          <Image
            source={IMAGES.location}
            style={[
              styles.markerIcon,
              {
                width: markerSize,
                height: markerSize,
                position: 'absolute',
                top: startY,
                left: startX,
                tintColor: PRIMARY_COLOR,
              },
            ]}
          />
          <View
            style={[
              styles.routeLine,
              {
                position: 'absolute',
                top: startY + markerSize / 2,
                left: startX + markerSize / 2 - 2,
                height: verticalLength,
                width: 4,
              },
            ]}
          />
          <View
            style={[
              styles.routeLine,
              {
                position: 'absolute',
                top: vertical1Y + markerSize / 2,
                left: startX + markerSize / 2,
                height: 4,
                width: horizontalLength,
              },
            ]}
          />
          <View
            style={[
              styles.routeLine,
              {
                position: 'absolute',
                top: vertical1Y + markerSize / 2,
                left: horizontalRightX + markerSize / 2 - 2,
                height: verticalLength,
                width: 4,
              },
            ]}
          />
          <View
            style={[
              styles.routeLine,
              {
                position: 'absolute',
                top: vertical2Y + markerSize / 2,
                left: startX + markerSize / 2,
                height: 4,
                width: horizontalLength,
              },
            ]}
          />
          <Image
            source={IMAGES.boy}
            style={[
              styles.boyIcon,
              {
                width: Math.min(44, width * 0.12),
                height: Math.min(44, width * 0.12),
                borderRadius: Math.min(22, (width * 0.12) / 2),
                position: 'absolute',
                top: boyY,
                left: boyX,
                borderColor: PRIMARY_COLOR,
              },
            ]}
          />
          <Image
            source={IMAGES.greendrop}
            style={[
              styles.markerIcon,
              {
                width: markerSize,
                height: markerSize,
                position: 'absolute',
                top: leftY,
                left: startX,
                tintColor: PRIMARY_COLOR,
              },
            ]}
          />
        </View>
      </View>

      {/* Timer Section */}
      <View style={styles.timerSection}>
        <View style={styles.timerCircleWrap}>
          <View
            style={[
              styles.circleBorder,
              {
                width: CIRCLE_SIZE,
                height: CIRCLE_SIZE,
                borderRadius: CIRCLE_SIZE / 2,
                borderColor: PRIMARY_COLOR,
              },
            ]}
          >
            <Image
              source={IMAGES.c1}
              style={[
                styles.clockIcon,
                { width: CIRCLE_SIZE * 0.52, height: CIRCLE_SIZE * 0.52 },
              ]}
            />
          </View>
          <Text
            style={[
              styles.timeLeftText,
              { fontSize: Math.min(20, width * 0.055) },
            ]}
          >
            {renderTime()}
          </Text>
          <Text
            style={[
              styles.timeSubtext,
              { fontSize: Math.min(13, width * 0.035) },
            ]}
          >
            Time left
          </Text>
        </View>

        <View style={styles.horizontalLine} />

        {/* Order Status Section */}
        <View style={styles.orderStatusSection}>
          <View style={styles.orderStatusRow}>
            <Image
              source={IMAGES.bikee}
              style={[
                styles.bikeImg,
                {
                  width: Math.min(38, width * 0.1),
                  height: Math.min(38, width * 0.1),
                },
              ]}
            />
            <View style={styles.orderStatusTextContainer}>
              <Text
                style={[
                  styles.orderStatusText,
                  { fontSize: Math.min(16, width * 0.045) },
                ]}
              >
                Your order is Delivered
              </Text>
              <Text
                style={[
                  styles.orderStatusTime,
                  { fontSize: Math.min(14, width * 0.038) },
                ]}
              >
                at 5.52 p.m.
              </Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        {/* Store and Address Section */}
        <View style={styles.storeAddressCard}>
          <View style={styles.storeAddressRow}>
            <View style={styles.addressIconContainer}>
              <Image
                source={IMAGES.h1}
                style={[
                  styles.addressIcon,
                  {
                    width: Math.min(24, width * 0.06),
                    height: Math.min(24, width * 0.06),
                  },
                ]}
              />
            </View>
            <View style={styles.addressTextContainer}>
              <Text
                style={[
                  styles.addressLabel,
                  { fontSize: Math.min(14, width * 0.037) },
                ]}
              >
                From :-{' '}
                <Text style={styles.addressValue}>Rahat Grocery Store</Text>
              </Text>
            </View>
          </View>

          <View style={[styles.storeAddressRow, { marginTop: 12 }]}>
            <View style={styles.addressIconContainer}>
              <Image
                source={IMAGES.h2}
                style={[
                  styles.addressIcon,
                  {
                    width: Math.min(24, width * 0.06),
                    height: Math.min(24, width * 0.06),
                  },
                ]}
              />
            </View>
            <View style={styles.addressTextContainer}>
              <Text
                style={[
                  styles.addressLabel,
                  { fontSize: Math.min(14, width * 0.037) },
                ]}
              >
                To :-{' '}
                <Text style={styles.addressValue}>
                  Behria sector 8, building 6.8 Apart 37 D
                </Text>
              </Text>
            </View>
          </View>
        </View>

        {/* Upload Image Section */}
        <View style={styles.uploadSection}>
          <Text
            style={[
              styles.uploadTitle,
              { fontSize: Math.min(15, width * 0.04) },
            ]}
          >
            Upload image
          </Text>
          <Text
            style={[
              styles.uploadSubtitle,
              { fontSize: Math.min(13, width * 0.035) },
            ]}
          >
            Upload img.
          </Text>

          <View style={styles.uploadBox}>
            <Image source={IMAGES.upload} style={styles.uploadIcon} />
            <Text style={styles.uploadBoxText}>Upload</Text>
          </View>
        </View>

        {/* Note Section */}
        <View style={styles.noteSection}>
          <Text
            style={[styles.noteText, { fontSize: Math.min(13, width * 0.035) }]}
          >
            Please note: This order can only be back only when product is
            damaged or defective.
          </Text>
        </View>

        {/* Buttons */}
        <View style={styles.btnRow}>
          <TouchableOpacity
            style={styles.uploadBtn}
            onPress={() => {
              /* Handle upload */
            }}
          >
            <Text
              style={[
                styles.uploadBtnText,
                { fontSize: Math.min(16, width * 0.04) },
              ]}
            >
              Upload
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.keepBtn, { backgroundColor: PRIMARY_COLOR }]}
            onPress={handleKeepOrder}
          >
            <Text
              style={[
                styles.keepBtnText,
                { fontSize: Math.min(16, width * 0.04) },
              ]}
            >
              Keep Order
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Cancel popup */}
      <Modal transparent visible={showCancelPopup} animationType="fade">
        <View style={styles.popupOverlay}>
          <View style={styles.popupBox}>
            <Text style={styles.popupTitle}>Are you sure want to cancel?</Text>
            <View style={styles.popupBtnRow}>
              <TouchableOpacity
                style={[styles.popupBtn, { backgroundColor: PRIMARY_COLOR }]}
                onPress={handleConfirmCancel}
              >
                <Text style={styles.popupBtnText}>OK</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.popupBtn, { backgroundColor: PRIMARY_COLOR }]}
                onPress={() => setShowCancelPopup(false)}
              >
                <Text style={styles.popupBtnText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Canceled popup */}
      <Modal transparent visible={showCanceledPopup} animationType="fade">
        <View style={styles.popupOverlay}>
          <View style={styles.popupBox}>
            <Image source={IMAGES.tick} style={styles.tickIconLarge} />
            <Text style={styles.popupTitle}>Order Canceled</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CancelOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  fixedMapArea: {
    width: '100%',
    backgroundColor: '#f5f4f9',
    position: 'relative',
  },
  mapBg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
  },
  header: {
    position: 'absolute',
    left: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
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
  backIcon: {
    width: 20,
    height: 20,
    tintColor: '#000',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
    letterSpacing: 0.1,
  },
  absFill: { ...StyleSheet.absoluteFillObject },
  markerIcon: { resizeMode: 'contain' },
  boyIcon: {
    borderWidth: 2,
    backgroundColor: '#fff',
    zIndex: 4,
  },
  routeLine: {
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 2,
  },
  timerSection: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    marginTop: -10,
    paddingTop: 20,
  },
  timerCircleWrap: {
    alignItems: 'center',
    marginBottom: 16,
    zIndex: 22,
  },
  circleBorder: {
    borderWidth: 3.5,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginBottom: 7,
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
  clockIcon: {
    resizeMode: 'contain',
    tintColor: PRIMARY_COLOR,
  },
  timeLeftText: {
    fontWeight: '700',
    color: '#222',
    marginTop: -2,
  },
  timeSubtext: {
    color: '#aaa',
    fontWeight: '600',
    marginTop: 0,
  },
  horizontalLine: {
    borderBottomColor: '#e3e3e3',
    borderBottomWidth: 1,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  orderStatusSection: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  orderStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 15,
  },
  bikeImg: {
    resizeMode: 'contain',
    marginRight: 15,
    tintColor: PRIMARY_COLOR,
  },
  orderStatusTextContainer: {
    flex: 1,
  },
  orderStatusText: {
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  orderStatusTime: {
    color: '#666',
    fontWeight: '500',
  },
  scrollArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  storeAddressCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 18,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  storeAddressRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  addressIconContainer: {
    width: 30,
    alignItems: 'center',
  },
  addressIcon: {
    resizeMode: 'contain',
    tintColor: '#666',
  },
  addressTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  addressLabel: {
    color: '#666',
    fontWeight: '500',
    lineHeight: 20,
  },
  addressValue: {
    color: '#222',
    fontWeight: '600',
  },
  uploadSection: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  uploadTitle: {
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  uploadSubtitle: {
    color: '#888',
    marginBottom: 15,
    fontWeight: '500',
  },
  uploadBox: {
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd',
    borderStyle: 'dashed',
    borderRadius: 10,
    padding: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginBottom: 8,
    tintColor: '#888',
  },
  uploadBoxText: {
    color: '#666',
    fontWeight: '500',
    fontSize: 14,
  },
  noteSection: {
    marginHorizontal: 20,
    marginBottom: 25,
  },
  noteText: {
    color: '#F44336',
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 18,
  },
  btnRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  uploadBtn: {
    flex: 1,
    backgroundColor: '#f3f3f3',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 10,
    marginRight: 9,
  },
  uploadBtnText: {
    color: '#000',
    fontWeight: '600',
  },
  keepBtn: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 9,
  },
  keepBtnText: {
    color: '#fff',
    fontWeight: '600',
  },
  popupOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.22)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 25,
    width: width * 0.76,
    alignItems: 'center',
    elevation: 5,
  },
  popupTitle: {
    fontWeight: '700',
    fontSize: 17,
    color: '#222',
    marginBottom: 15,
  },
  popupBtnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  popupBtn: {
    flex: 1,
    marginHorizontal: 6,
    paddingVertical: 11,
    alignItems: 'center',
    borderRadius: 9,
  },
  popupBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  tickIconLarge: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginBottom: 12,
  },
});
