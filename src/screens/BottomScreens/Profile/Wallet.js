import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  StatusBar,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useColor } from '../../../util/ColorSwitcher';

const { width, height } = Dimensions.get('window');

// Swiggy-style tighter scaling
const rs = size => (width / 400) * size;

const isIOS = Platform.OS === 'ios';

const fontScale = size => (isIOS ? size * 0.95 : size);

const scaleSize = size => (isIOS ? size * 1.02 : size);

const transactions = [
  {
    id: 1,
    title: 'i Phone 17 Plus',
    date: '22 Sep, 9.00 • 3 Items',
    amount: '₹ 50,000',
    type: 'Orders',
  },
  {
    id: 2,
    title: 'MacBook Pro',
    date: '21 Sep, 14.30 • 1 Item',
    amount: '₹ 1,20,000',
    type: 'Orders',
  },
  {
    id: 3,
    title: 'Amazon Purchase',
    date: '20 Sep, 11.15 • 5 Items',
    amount: '₹ 15,000',
    type: 'Shopping',
  },
  {
    id: 4,
    title: 'Netflix Subscription',
    date: '19 Sep, 16.00 • Monthly',
    amount: '₹ 649',
    type: 'Entertainment',
  },
  {
    id: 5,
    title: 'Swiggy Order',
    date: '18 Sep, 19.30 • Food',
    amount: '₹ 850',
    type: 'Food',
  },
  {
    id: 6,
    title: 'Uber Ride',
    date: '17 Sep, 08.45 • Travel',
    amount: '₹ 320',
    type: 'Travel',
  },
];

const MyWallet = () => {
  const navigation = useNavigation();
  const { bgColor, textColor } = useColor();

  const getCardColor = () => {
    if (
      bgColor === '#15305F' ||
      bgColor === '#000000' ||
      bgColor === '#1a1a2e'
    ) {
      return bgColor;
    }
    return '#032F27'; //032F27 15305F
  };

  return (
    <View style={[styles.container, { backgroundColor: '#FFFFFF' }]}>
      <StatusBar backgroundColor={bgColor} barStyle="light-content" />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: bgColor }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.iconBtn, { backgroundColor: '#FFFFFF' }]}
        >
          <Image
            source={require('../../../assets/back.png')}
            style={[styles.icon, { tintColor: bgColor }]}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>My E-Wallet</Text>

        <View style={styles.headerRight}>
          <TouchableOpacity
            style={[
              styles.iconBtn,
              { backgroundColor: '#FFFFFF', marginRight: rs(6) },
            ]}
          >
            <Image
              source={require('../../../assets/s1.png')}
              style={[styles.icon, { tintColor: bgColor }]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.iconBtn, { backgroundColor: '#FFFFFF' }]}
          >
            <Image
              source={require('../../../assets/options.png')}
              style={[styles.icon, { tintColor: bgColor }]}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Wallet Card */}
        <View style={[styles.walletCard, { backgroundColor: getCardColor() }]}>
          <View style={styles.cardTop}>
            <View>
              <Text style={styles.name}>Harshal Sharma</Text>
              <Text style={styles.number}>1234 5678 9012 3456</Text>
            </View>

            <Image
              source={require('../../../assets/splash.png')}
              style={styles.logo}
            />
          </View>

          <Text style={styles.balanceLabel}>Your balance</Text>

          <View style={styles.balanceRow}>
            <Text style={styles.balance}>₹ 70,000</Text>

            <TouchableOpacity
              style={[styles.topUpBtn, { backgroundColor: '#FFFFFF' }]}
            >
              <Text style={[styles.topUpText, { color: '#000000' }]}>
                Top Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Transaction History */}
        <View style={styles.historyHeader}>
          <Text style={[styles.historyTitle, { color: '#000000' }]}>
            Transaction History
          </Text>
          <TouchableOpacity>
            <Text style={[styles.seeAll, { color: bgColor }]}>See All</Text>
          </TouchableOpacity>
        </View>

        {transactions.map(item => (
          <View key={item.id} style={styles.transactionRow}>
            <Image
              source={require('../../../assets/mobile2.png')}
              style={styles.transactionImage}
            />

            <View style={styles.transactionCenter}>
              <Text style={[styles.transactionTitle, { color: '#000000' }]}>
                {item.title}
              </Text>
              <Text style={styles.transactionSub}>{item.date}</Text>
            </View>

            <View style={styles.transactionRight}>
              <Text style={[styles.amount, { color: '#000000' }]}>
                {item.amount}
              </Text>
              <Text style={[styles.orderType, { color: bgColor }]}>
                {item.type}
              </Text>
            </View>
          </View>
        ))}

        {/* Extra padding for bottom tab */}
        <View style={{ height: rs(72) }} />
      </ScrollView>
    </View>
  );
};

export default MyWallet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: isIOS ? rs(80) : rs(70),
    paddingHorizontal: rs(13),
    paddingTop: rs(8),
  },

  /* Header - Swiggy compact */
  header: {
    height: isIOS ? rs(90) : rs(82),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: rs(16),
    justifyContent: 'space-between',
    paddingTop: isIOS ? rs(44) : rs(26),
    paddingBottom: rs(0),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  headerTitle: {
    color: '#fff',
    fontSize: fontScale(rs(16)),
    fontWeight: '700',
    textAlign: 'center',
    flex: 1,
    marginHorizontal: rs(10),
  },
  iconBtn: {
    width: rs(36),
    height: rs(36),
    borderRadius: rs(10),
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
  icon: {
    width: rs(18),
    height: rs(18),
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  /* Wallet Card - Compact */
  walletCard: {
    marginHorizontal: rs(13),
    borderRadius: scaleSize(rs(16)),
    padding: rs(15),
    marginBottom: rs(20),
    marginTop: rs(12),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  name: {
    color: '#fff',
    fontSize: fontScale(rs(15)),
    fontWeight: '700',
    marginBottom: rs(3),
  },
  number: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: fontScale(rs(12)),
    fontWeight: '500',
    letterSpacing: 0.4,
  },
  logo: {
    width: rs(40),
    height: rs(40),
    borderRadius: rs(10),
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: rs(3),
  },
  balanceLabel: {
    color: 'rgba(255, 255, 255, 0.85)',
    marginTop: rs(18),
    fontSize: fontScale(rs(12)),
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: rs(6),
  },
  balance: {
    fontSize: fontScale(rs(26)),
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 0.4,
  },
  topUpBtn: {
    paddingHorizontal: rs(18),
    paddingVertical: rs(8),
    borderRadius: scaleSize(rs(16)),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  topUpText: {
    fontWeight: '700',
    fontSize: fontScale(rs(13)),
    letterSpacing: 0.2,
  },

  /* History - Compact */
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: rs(13),
    marginBottom: rs(10),
    marginTop: rs(3),
    paddingVertical: rs(6),
  },
  historyTitle: {
    fontSize: fontScale(rs(15)),
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  seeAll: {
    fontSize: fontScale(rs(13)),
    fontWeight: '600',
    letterSpacing: 0.2,
  },

  /* Transaction Row - Compact */
  transactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: rs(13),
    paddingVertical: rs(12),
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#FFFFFF',
  },
  transactionImage: {
    width: rs(42),
    height: rs(42),
    borderRadius: rs(21),
    backgroundColor: '#f5f5f5',
  },
  transactionCenter: {
    flex: 1,
    marginLeft: rs(12),
    justifyContent: 'center',
  },
  transactionTitle: {
    fontSize: fontScale(rs(13.5)),
    fontWeight: '600',
    marginBottom: rs(3),
  },
  transactionSub: {
    fontSize: fontScale(rs(11.5)),
    color: '#666',
    fontWeight: '400',
  },
  transactionRight: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  amount: {
    fontSize: fontScale(rs(14)),
    fontWeight: '700',
    marginBottom: rs(3),
  },
  orderType: {
    fontSize: fontScale(rs(11)),
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
});
