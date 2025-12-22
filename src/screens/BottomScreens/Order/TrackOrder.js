// File: screens/TrackOrder.js
import React from 'react';
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
  Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useColor } from '../../../util/ColorSwitcher';

const { width, height } = Dimensions.get('window');
const MAP_HEIGHT = height * 0.32;
const STATUS_BAR_HEIGHT =
  Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 24;

// compact scale based on 375
const BASE_WIDTH = 375;
const scale = width / BASE_WIDTH;
const rs = size => size * scale;

const ICONS = {
  location: require('../../../assets/location.png'),
  drop: require('../../../assets/drop.png'),
  boy: require('../../../assets/user2.png'),
  tick: require('../../../assets/tick.png'),
  '1st': require('../../../assets/1st.png'),
  '2nd': require('../../../assets/2nd.png'),
  '3rd': require('../../../assets/3rd.png'),
  '4th': require('../../../assets/4th.png'),
};

const deliverySteps = [
  { step: '1st', showTick: true },
  { step: '2nd', showTick: true },
  { step: '3rd', showTick: false },
  { step: '4th', showTick: false },
];

const TrackOrder = () => {
  const navigation = useNavigation();
  const { bgColor, textColor } = useColor();

  const headerTop = STATUS_BAR_HEIGHT + rs(6);
  const markerSize = width * 0.07;
  const boyIconSize = width * 0.13;
  const lineWidth = width * 0.012;
  const horizontalLineLength = width * 0.16;

  const handleCall = () => {
    const phoneNumber = '+911234567890';
    Linking.openURL(`tel:${phoneNumber}`).catch(err =>
      console.log('Error making phone call:', err),
    );
  };

  const handleMessage = () => {
    navigation.navigate('Chat');
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent
      />

      {/* Fixed Map Area */}
      <View style={styles.fixedMapArea}>
        <View style={styles.statusBarOverlay} />
        <Image
          source={require('../../../assets/mapbgg.png')}
          style={styles.mapBg}
        />

        {/* Header */}
        <View style={[styles.header, { top: headerTop }]}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[styles.iconBtn, { backgroundColor: textColor }]}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Image
              source={require('../../../assets/back.png')}
              style={[styles.backIcon, { tintColor: bgColor }]}
            />
          </TouchableOpacity>
          <View style={{ width: rs(30) }} />
        </View>

        {/* Zig-zag line */}
        <View style={styles.absFill}>
          <View
            style={[
              styles.zigzagLine,
              {
                top: MAP_HEIGHT * 0.3,
                left: width / 2 - lineWidth / 2,
                height: MAP_HEIGHT * 0.26,
                width: lineWidth,
                backgroundColor: bgColor,
              },
            ]}
          />
          <View
            style={[
              styles.zigzagLine,
              {
                top: MAP_HEIGHT * 0.56,
                left: width / 2 - horizontalLineLength,
                height: lineWidth,
                width: horizontalLineLength,
                backgroundColor: bgColor,
              },
            ]}
          />
          <View
            style={[
              styles.zigzagLine,
              {
                top: MAP_HEIGHT * 0.56,
                left: width / 2 - horizontalLineLength,
                height: MAP_HEIGHT * 0.26,
                width: lineWidth,
                backgroundColor: bgColor,
              },
            ]}
          />
        </View>

        {/* Icons on line */}
        <View style={[styles.absFill, { alignItems: 'center' }]}>
          {/* Pickup */}
          <View
            style={[
              styles.mapMarkerContainer,
              { top: MAP_HEIGHT * 0.26, left: width / 2 - markerSize / 2 },
            ]}
          >
            <Image
              source={ICONS.location}
              style={[
                styles.mapMarker,
                {
                  width: markerSize,
                  height: markerSize,
                  tintColor: bgColor,
                },
              ]}
            />
          </View>

          {/* Boy */}
          <Image
            source={ICONS.boy}
            style={[
              styles.boyIcon,
              {
                top: MAP_HEIGHT * 0.48,
                left: width / 2 - boyIconSize / 2,
                width: boyIconSize,
                height: boyIconSize,
                borderColor: bgColor,
              },
            ]}
          />

          {/* Drop */}
          <View
            style={[
              styles.mapMarkerContainer,
              {
                top: MAP_HEIGHT * 0.75,
                left: width / 2 - horizontalLineLength - markerSize / 2,
              },
            ]}
          >
            <Image
              source={ICONS.drop}
              style={[
                styles.mapMarkerDrop,
                {
                  width: markerSize * 0.75,
                  height: markerSize * 0.75,
                  tintColor: bgColor,
                },
              ]}
            />
          </View>
        </View>
      </View>

      {/* Scrollable section */}
      <ScrollView
        style={styles.scrollSection}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Order card */}
        <View style={styles.orderCard}>
          <Image
            source={require('../../../assets/mobile2.png')}
            style={styles.foodImg}
          />
          <View style={styles.orderInfoContainer}>
            <View style={styles.rowBetween}>
              <Text style={[styles.orderId, { color: bgColor }]}>#265896</Text>
              <Text style={styles.price}>₹ 2,40,000.00</Text>
            </View>
            <Text style={styles.foodName}>iPhone 17 Plus</Text>
            <Text style={styles.orderInfo}>22 Sep, 9.00 • 2 Items</Text>
            <View style={styles.rowBetween}>
              <View>
                <Text style={styles.estimateLabel}>Estimate Arrival</Text>
                <Text style={styles.estimateTime}>25 min</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.estimateLabel}>Now</Text>
                <Text style={styles.foodStatus}>Packet on the way</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Delivery status icons */}
        <View style={styles.deliveryIconsRow}>
          {deliverySteps.map((item, idx) => (
            <React.Fragment key={item.step}>
              <View style={styles.deliveryStepContainer}>
                <Image
                  source={ICONS[item.step]}
                  style={[
                    styles.deliveryIcon,
                    {
                      tintColor: item.showTick ? bgColor : '#9E9E9E',
                    },
                  ]}
                />
                {item.showTick ? (
                  <View style={[styles.tickWrap, { backgroundColor: bgColor }]}>
                    <Image
                      source={ICONS.tick}
                      style={[styles.tickIcon, { tintColor: textColor }]}
                    />
                  </View>
                ) : (
                  <View style={styles.tickPlaceholder} />
                )}
              </View>
              {idx !== deliverySteps.length - 1 && (
                <View style={styles.connectorLine} />
              )}
            </React.Fragment>
          ))}
        </View>

        <Text style={styles.deliveryText}>Packet In Delivery</Text>

        {/* Order status details */}
        <View style={styles.statusSection}>
          <Text style={styles.statusTitle}>Order Status Details</Text>
          {[
            {
              title: 'Order placed',
              time: '10.40 a.m.',
              date: '12 Aug',
              done: true,
            },
            {
              title: 'Store confirmed',
              time: '10.42 a.m.',
              date: '12 Aug',
              done: true,
            },
            {
              title: 'Preparing Order',
              time: '10.45 a.m.',
              date: '12 Aug',
              done: false,
            },
            {
              title: 'Order Picked',
              time: '10.50 a.m.',
              date: '12 Aug',
              done: false,
            },
            {
              title: 'Out for delivery',
              time: '10.52 a.m.',
              date: '12 Aug',
              done: false,
            },
          ].map((item, index) => (
            <View key={index} style={styles.statusRow}>
              <View style={styles.statusLeft}>
                <View
                  style={[
                    styles.circle,
                    {
                      backgroundColor: item.done ? bgColor : '#C7C7C7',
                    },
                  ]}
                />
                {index < 4 && (
                  <View
                    style={[
                      styles.dottedLine,
                      {
                        borderColor: item.done ? bgColor : '#C7C7C7',
                      },
                    ]}
                  />
                )}
              </View>
              <View style={styles.statusContent}>
                <Text style={styles.statusText}>{item.title}</Text>
                <Text style={styles.statusTime}>{item.time}</Text>
              </View>
              <Text style={styles.statusDate}>{item.date}</Text>
            </View>
          ))}
        </View>

        {/* Delivery agent */}
        <View style={styles.agentSection}>
          <Image
            source={require('../../../assets/user2.png')}
            style={styles.agentImg}
          />
          <View style={styles.agentInfo}>
            <Text style={styles.agentId}>ID: DKS-501F9</Text>
            <Text style={styles.agentName}>Mann Sharma</Text>
          </View>
          <View style={styles.actionBtns}>
            <TouchableOpacity
              style={[styles.callBtn, { backgroundColor: bgColor }]}
              onPress={handleCall}
            >
              <Image
                source={require('../../../assets/call.png')}
                style={[styles.callIcon, { tintColor: textColor }]}
              />
              <Text style={[styles.callText, { color: textColor }]}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.msgBtn, { borderColor: bgColor }]}
              onPress={handleMessage}
            >
              <Image
                source={require('../../../assets/message.png')}
                style={[styles.msgIcon, { tintColor: bgColor }]}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default TrackOrder;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  absFill: { ...StyleSheet.absoluteFillObject, zIndex: 2 },

  fixedMapArea: {
    width: '100%',
    height: MAP_HEIGHT,
    position: 'relative',
    backgroundColor: '#eee',
    zIndex: 9,
    overflow: 'hidden',
  },
  statusBarOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: STATUS_BAR_HEIGHT,
    backgroundColor: 'rgba(255,255,255,0.9)',
    zIndex: 11,
  },
  mapBg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
  },

  header: {
    position: 'absolute',
    left: rs(14),
    right: rs(14),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 10,
    paddingTop: rs(6),
    paddingBottom: rs(6),
  },
  iconBtn: {
    width: rs(32),
    height: rs(32),
    borderRadius: rs(10),
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
    width: rs(16),
    height: rs(16),
    resizeMode: 'contain',
  },
  headerTitle: {
    fontSize: rs(14),
    fontWeight: '700',
    fontFamily: 'Figtree-Bold',
    textAlign: 'center',
    flex: 1,
    marginHorizontal: rs(8),
  },

  zigzagLine: {
    position: 'absolute',
    borderRadius: 2,
    zIndex: 5,
  },

  mapMarkerContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  mapMarker: {
    resizeMode: 'contain',
  },
  mapMarkerDrop: {
    resizeMode: 'contain',
  },
  boyIcon: {
    position: 'absolute',
    borderRadius: 50,
    backgroundColor: '#fff',
    zIndex: 11,
    borderWidth: 2,
    resizeMode: 'contain',
  },

  scrollSection: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: rs(16),
    borderTopRightRadius: rs(16),
    marginTop: -rs(16),
    zIndex: 8,
  },
  scrollContent: {
    paddingBottom: rs(40),
    paddingTop: rs(8),
  },

  orderCard: {
    flexDirection: 'row',
    padding: rs(11),
    backgroundColor: '#fff',
    borderRadius: rs(12),
    marginHorizontal: rs(14),
    marginTop: rs(13),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  orderInfoContainer: {
    flex: 1,
    marginLeft: rs(8),
  },
  foodImg: {
    width: rs(56),
    height: rs(56),
    borderRadius: rs(8),
    resizeMode: 'contain',
  },
  orderId: {
    fontWeight: '500',
    fontSize: rs(11),
    fontFamily: 'Figtree-Medium',
  },
  price: {
    color: '#000',
    fontWeight: '700',
    fontSize: rs(13),
    fontFamily: 'Figtree-Bold',
  },
  foodName: {
    fontWeight: '600',
    fontSize: rs(13),
    color: '#000',
    marginTop: rs(2),
    fontFamily: 'Figtree-SemiBold',
  },
  orderInfo: {
    fontSize: rs(10.5),
    color: '#777',
    marginBottom: rs(4),
    fontFamily: 'Figtree-Medium',
    fontWeight: '500',
  },
  estimateLabel: {
    fontSize: rs(10.5),
    color: '#777',
    fontFamily: 'Figtree-Medium',
    fontWeight: '500',
  },
  estimateTime: {
    color: '#259E29',
    fontSize: rs(11.5),
    fontFamily: 'Figtree-SemiBold',
    fontWeight: '600',
  },
  foodStatus: {
    fontSize: rs(11),
    color: '#000',
    fontFamily: 'Figtree-SemiBold',
    fontWeight: '600',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  deliveryIconsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: rs(18),
    marginHorizontal: rs(16),
  },
  deliveryStepContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  deliveryIcon: {
    width: rs(30),
    height: rs(30),
    resizeMode: 'contain',
  },
  tickWrap: {
    marginTop: rs(4),
    width: rs(18),
    height: rs(18),
    borderRadius: rs(9),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    zIndex: 2,
    elevation: 2,
  },
  tickPlaceholder: {
    marginTop: rs(4),
    width: rs(18),
    height: rs(18),
  },
  tickIcon: {
    width: rs(10),
    height: rs(10),
    resizeMode: 'contain',
  },
  connectorLine: {
    width: rs(32),
    height: rs(2),
    backgroundColor: '#E5E5E5',
    marginHorizontal: rs(6),
  },

  deliveryText: {
    textAlign: 'center',
    color: '#000',
    fontWeight: '600',
    marginTop: rs(7),
    fontSize: rs(11.5),
    fontFamily: 'Figtree-SemiBold',
  },

  statusSection: {
    paddingHorizontal: rs(16),
    marginTop: rs(18),
  },
  statusTitle: {
    fontSize: rs(13),
    fontWeight: '600',
    color: '#000',
    marginBottom: rs(11),
    fontFamily: 'Figtree-SemiBold',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: rs(14),
  },
  statusLeft: {
    alignItems: 'center',
    marginRight: rs(11),
    width: rs(14),
  },
  circle: {
    width: rs(14),
    height: rs(14),
    borderRadius: rs(7),
  },
  dottedLine: {
    height: rs(22),
    borderLeftWidth: 2,
    borderStyle: 'dotted',
    marginTop: rs(1),
  },
  statusContent: { flex: 1 },
  statusText: {
    color: '#000',
    fontWeight: '600',
    fontSize: rs(11.5),
    fontFamily: 'Figtree-SemiBold',
  },
  statusTime: {
    color: '#777',
    fontSize: rs(10.5),
    fontFamily: 'Figtree-Medium',
    fontWeight: '500',
  },
  statusDate: {
    color: '#777',
    fontSize: rs(10.5),
    fontFamily: 'Figtree-Medium',
    fontWeight: '500',
  },

  agentSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: rs(16),
    marginTop: rs(8),
    marginBottom: rs(30),
  },
  agentInfo: {
    flex: 1,
    marginLeft: rs(8),
  },
  agentImg: {
    width: rs(44),
    height: rs(44),
    borderRadius: rs(22),
    resizeMode: 'cover',
  },
  agentId: {
    fontSize: rs(10.5),
    color: '#777',
    fontFamily: 'Figtree-Regular',
    fontWeight: '400',
  },
  agentName: {
    fontSize: rs(12.5),
    color: '#000',
    fontFamily: 'Figtree-SemiBold',
    fontWeight: '600',
  },

  actionBtns: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  callBtn: {
    flexDirection: 'row',
    paddingHorizontal: rs(12),
    paddingVertical: rs(8),
    borderRadius: rs(7),
    marginRight: rs(7),
    alignItems: 'center',
  },
  callIcon: {
    width: rs(13),
    height: rs(13),
    marginRight: rs(4),
    resizeMode: 'contain',
  },
  callText: {
    fontSize: rs(11.5),
    fontFamily: 'Figtree-SemiBold',
    fontWeight: '600',
  },
  msgBtn: {
    backgroundColor: '#fff',
    borderWidth: 1,
    padding: rs(8),
    borderRadius: rs(7),
    alignItems: 'center',
    justifyContent: 'center',
  },
  msgIcon: {
    width: rs(14),
    height: rs(14),
    resizeMode: 'contain',
  },
});
