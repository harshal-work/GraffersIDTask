import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Modal,
  Linking,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useColor } from '../../../util/ColorSwitcher';
import { ScrollView } from 'react-native-gesture-handler';

const { height, width } = Dimensions.get('window');

// compact scaling based on 375 width
const BASE_WIDTH = 375;
const scale = width / BASE_WIDTH;
const rs = size => size * scale;

const OrderDetail = ({ route }) => {
  const navigation = useNavigation();
  const { order } = route.params || {};
  const { bgColor, textColor } = useColor();
  const [showReturnPopup, setShowReturnPopup] = useState(false);

  const handleCall = () => {
    const phoneNumber = '+911234567890';
    Linking.openURL(`tel:${phoneNumber}`).catch(err => {
      console.log('Error making phone call:', err);
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent
      />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: '#fff' }]}>
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

        <View style={styles.headerTitleContainer}>
          <Text style={[styles.headerText, { color: '#000' }]}>
            Order Detail
          </Text>
        </View>

        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={{ paddingBottom: rs(16) }}
      >
        {/* Phone Card */}
        <View style={styles.orderContent}>
          <Image
            source={order?.image || require('../../../assets/mobile2.png')}
            style={styles.productImage}
          />

          <View style={styles.orderText}>
            <Text style={[styles.orderId, { color: bgColor }]}>
              {order?.id}
            </Text>

            <Text style={[styles.productName, { color: '#000' }]}>
              {order?.name}
            </Text>

            <View style={styles.soldRow}>
              <Text style={[styles.soldBy, { color: bgColor }]}>
                Sold By:{' '}
                <Text style={{ color: '#919291' }}>{order?.soldBy}</Text>
              </Text>

              <Text style={styles.dot}>•</Text>

              <Text
                style={[
                  styles.status,
                  {
                    color:
                      order?.status === 'Delivered' ? '#34A853' : '#FFA500',
                  },
                ]}
              >
                {order?.status}
              </Text>
            </View>
          </View>
        </View>

        {/* Details Card */}
        <View style={[styles.detailsCard, { backgroundColor: '#f8f8f8' }]}>
          <Text style={[styles.detailsTitle, { color: '#000' }]}>Details</Text>

          <Text style={[styles.addressText, { color: '#555' }]}>
            6391 Elgin St. Celina, Delaware 10299
          </Text>

          <View style={styles.userRow}>
            <View style={styles.userLeft}>
              <Image
                source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
                style={styles.userAvatar}
              />

              <View>
                <Text style={[styles.userId, { color: '#c0bfbf' }]}>
                  ID: DKS-501F9
                </Text>
                <Text style={[styles.userName, { color: '#000' }]}>
                  Mann Sharma
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.callBtn, { backgroundColor: bgColor }]}
              onPress={handleCall}
              activeOpacity={0.85}
            >
              <Image
                source={require('../../../assets/call.png')}
                style={[styles.callIcon, { tintColor: textColor }]}
              />
              <Text style={[styles.callText, { color: textColor }]}>Call</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Order Items title */}
        <View style={styles.orderTitleContainer}>
          <Text style={[styles.orderTitle, { color: '#000' }]}>
            Orders Item's
          </Text>
        </View>

        {/* Order Item Card 1 */}
        <View style={[styles.orderCard, { backgroundColor: '#fff' }]}>
          <Image
            source={require('../../../assets/mobile3.png')}
            style={styles.itemImage}
          />

          <View style={styles.itemContent}>
            <Text style={[styles.itemName, { color: '#000' }]}>
              I Phone 17 Plus
            </Text>

            <Text style={[styles.soldByText, { color: '#6B7280' }]}>
              Sold By :{' '}
              <Text style={[styles.storeName, { color: bgColor }]}>
                Grocery Store
              </Text>
            </Text>

            <View style={styles.bottomRow}>
              <Text style={[styles.price, { color: '#000' }]}>₹124050.00</Text>

              <View style={styles.qtyContainer}>
                <TouchableOpacity
                  style={[styles.qtyBtn, { borderColor: bgColor }]}
                >
                  <Text style={[styles.qtyBtnText, { color: bgColor }]}>−</Text>
                </TouchableOpacity>

                <Text style={[styles.qtyText, { color: '#000' }]}>02</Text>

                <TouchableOpacity
                  style={[styles.qtyBtnDark, { backgroundColor: bgColor }]}
                >
                  <Text style={[styles.qtyBtnTextDark, { color: textColor }]}>
                    +
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.closeBtn}>
            <Text style={[styles.closeText, { color: bgColor }]}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* Order Item Card 2 */}
        <View style={[styles.orderCard, { backgroundColor: '#fff' }]}>
          <Image
            source={require('../../../assets/mobile3.png')}
            style={styles.itemImage}
          />

          <View style={styles.itemContent}>
            <Text style={[styles.itemName, { color: '#000' }]}>
              I Phone 17 Plus
            </Text>

            <Text style={[styles.soldByText, { color: '#6B7280' }]}>
              Sold By :{' '}
              <Text style={[styles.storeName, { color: bgColor }]}>
                Grocery Store
              </Text>
            </Text>

            <View style={styles.bottomRow}>
              <Text style={[styles.price, { color: '#000' }]}>₹124050.00</Text>

              <View style={styles.qtyContainer}>
                <TouchableOpacity
                  style={[styles.qtyBtn, { borderColor: bgColor }]}
                >
                  <Text style={[styles.qtyBtnText, { color: bgColor }]}>−</Text>
                </TouchableOpacity>

                <Text style={[styles.qtyText, { color: '#000' }]}>02</Text>

                <TouchableOpacity
                  style={[styles.qtyBtnDark, { backgroundColor: bgColor }]}
                >
                  <Text style={[styles.qtyBtnTextDark, { color: textColor }]}>
                    +
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.closeBtn}>
            <Text style={[styles.closeText, { color: bgColor }]}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Section */}
        <View style={styles.bottomcontainer}>
          <View style={styles.totalRow}>
            <Text style={[styles.totalText, { color: '#000' }]}>Total</Text>
            <Text style={[styles.amountText, { color: '#000' }]}>
              ₹ 59890.00
            </Text>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, styles.returnButton]}
              onPress={() => setShowReturnPopup(true)}
            >
              <Text
                style={[
                  styles.buttonText,
                  styles.returnButtonText,
                  { color: '#000' },
                ]}
              >
                RETURN ORDER
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                styles.reorderButton,
                { backgroundColor: bgColor },
              ]}
            >
              <Text
                style={[
                  styles.buttonText,
                  styles.reorderButtonText,
                  { color: textColor },
                ]}
              >
                RE-ORDER
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Return Order Popup */}
      <Modal transparent visible={showReturnPopup} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalCard, { backgroundColor: '#fff' }]}>
            <View style={[styles.iconCircle, { backgroundColor: bgColor }]}>
              <Image
                source={require('../../../assets/wallet.png')}
                style={{
                  width: rs(22),
                  height: rs(22),
                  tintColor: textColor,
                  resizeMode: 'contain',
                }}
              />
            </View>

            <Text style={[styles.modalTitle, { color: '#000' }]}>
              Return Order
            </Text>

            <Text style={[styles.modalDesc, { color: '#666' }]}>
              Order send back are only allowed for damaged items. Continue if
              your order is damaged
            </Text>

            <TouchableOpacity
              style={[styles.keepBtn, { backgroundColor: '#F58220' }]}
              onPress={() => setShowReturnPopup(false)}
            >
              <Text style={[styles.keepText, { color: '#fff' }]}>
                Keep order
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.sendBtn, { backgroundColor: '#EFEFEF' }]}
              onPress={() => {
                setShowReturnPopup(false);
              }}
            >
              <Text style={[styles.sendText, { color: '#555' }]}>
                Send Back
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default OrderDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollArea: {
    flex: 1,
    backgroundColor: '#fff',
  },

  /* Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? rs(52) : rs(36),
    paddingHorizontal: rs(14),
    paddingBottom: rs(10),
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1.5 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
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
        shadowOffset: { width: 0, height: 1.5 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  backIcon: {
    width: rs(16),
    height: rs(16),
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: rs(14),
    fontWeight: '700',
    fontFamily: 'Figtree-Bold',
    textAlign: 'center',
  },
  headerSpacer: {
    width: rs(32),
  },

  /* Phone Card */
  orderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: rs(11),
    backgroundColor: '#fff',
    marginHorizontal: rs(14),
    marginVertical: rs(11),
    borderRadius: rs(10),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1.5 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  productImage: {
    width: rs(64),
    height: rs(64),
    borderRadius: rs(6),
    resizeMode: 'contain',
  },
  orderText: {
    flex: 1,
    paddingLeft: rs(10),
  },
  orderId: {
    fontSize: rs(11),
    fontWeight: '600',
    fontFamily: 'Figtree-SemiBold',
    marginBottom: rs(2),
  },
  productName: {
    fontSize: rs(13),
    fontWeight: '700',
    fontFamily: 'Figtree-Bold',
    marginBottom: rs(2),
  },
  soldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: rs(3),
  },
  soldBy: {
    fontSize: rs(11),
    fontWeight: '500',
    fontFamily: 'Figtree-Medium',
  },
  dot: {
    fontSize: rs(16),
    lineHeight: rs(14),
    color: '#C4C4C4',
    marginHorizontal: rs(6),
  },
  status: {
    fontSize: rs(11),
    fontWeight: '500',
    fontFamily: 'Figtree-Medium',
  },

  /* Details Card */
  detailsCard: {
    marginHorizontal: rs(14),
    paddingHorizontal: rs(13),
    paddingVertical: rs(13),
    borderRadius: rs(11),
    marginBottom: rs(14),
  },
  detailsTitle: {
    fontSize: rs(13),
    fontWeight: '600',
    fontFamily: 'Figtree-SemiBold',
    marginBottom: rs(4),
  },
  addressText: {
    fontSize: rs(11.5),
    fontFamily: 'Figtree-Regular',
    lineHeight: rs(16),
    marginBottom: rs(10),
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  userAvatar: {
    width: rs(44),
    height: rs(44),
    borderRadius: rs(22),
    marginRight: rs(9),
  },
  userId: {
    fontSize: rs(10.5),
    fontFamily: 'Figtree-Regular',
    marginBottom: rs(1),
  },
  userName: {
    fontSize: rs(13),
    fontWeight: '600',
    fontFamily: 'Figtree-SemiBold',
  },
  callBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: rs(12),
    paddingVertical: rs(8),
    borderRadius: rs(8),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1.5 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  callIcon: {
    width: rs(13),
    height: rs(13),
    marginRight: rs(4),
  },
  callText: {
    fontSize: rs(11.5),
    fontWeight: '600',
    fontFamily: 'Figtree-SemiBold',
  },

  /* Order Item Card */
  orderTitleContainer: {
    paddingHorizontal: rs(14),
    paddingVertical: rs(4),
    marginBottom: rs(6),
  },
  orderTitle: {
    fontSize: rs(13),
    fontWeight: '600',
    fontFamily: 'Figtree-SemiBold',
  },
  orderCard: {
    flexDirection: 'row',
    borderRadius: rs(12),
    padding: rs(11),
    marginHorizontal: rs(14),
    marginBottom: rs(11),
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1.5 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  itemImage: {
    width: rs(64),
    height: rs(64),
    borderRadius: rs(9),
    resizeMode: 'contain',
    backgroundColor: '#F3F3F3',
  },
  itemContent: {
    flex: 1,
    paddingLeft: rs(10),
  },
  itemName: {
    fontSize: rs(13),
    fontWeight: '700',
    fontFamily: 'Figtree-Bold',
    marginBottom: rs(2),
  },
  soldByText: {
    fontSize: rs(11),
    fontFamily: 'Figtree-Medium',
    marginBottom: rs(7),
  },
  storeName: {
    fontWeight: '500',
    fontFamily: 'Figtree-Medium',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: rs(13),
    fontWeight: '700',
    fontFamily: 'Figtree-Bold',
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyBtn: {
    width: rs(26),
    height: rs(26),
    borderRadius: rs(13),
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyBtnText: {
    fontSize: rs(14),
    fontWeight: '600',
    fontFamily: 'Figtree-SemiBold',
  },
  qtyText: {
    marginHorizontal: rs(9),
    fontSize: rs(12.5),
    fontWeight: '600',
    fontFamily: 'Figtree-SemiBold',
  },
  qtyBtnDark: {
    width: rs(26),
    height: rs(26),
    borderRadius: rs(13),
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyBtnTextDark: {
    fontSize: rs(14),
    fontWeight: '600',
    fontFamily: 'Figtree-SemiBold',
  },
  closeBtn: {
    position: 'absolute',
    top: rs(7),
    right: rs(7),
  },
  closeText: {
    fontSize: rs(14),
    fontWeight: '600',
    fontFamily: 'Figtree-SemiBold',
  },

  /* Bottom Section */
  bottomcontainer: {
    paddingHorizontal: rs(14),
    paddingVertical: rs(14),
    backgroundColor: '#fff',
    marginTop: rs(6),
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: rs(13),
  },
  totalText: {
    fontSize: rs(13),
    fontFamily: 'Figtree-SemiBold',
    fontWeight: '600',
  },
  amountText: {
    fontSize: rs(15),
    fontWeight: '700',
    fontFamily: 'Figtree-Bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    paddingVertical: rs(11),
    borderRadius: rs(8),
    alignItems: 'center',
    marginHorizontal: rs(4),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1.5 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  returnButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  reorderButton: {},
  buttonText: {
    fontSize: rs(11.5),
    fontWeight: '600',
    fontFamily: 'Figtree-SemiBold',
  },
  returnButtonText: {
    color: '#000',
  },
  reorderButtonText: {
    color: '#fff',
  },

  /* Return Order Popup */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: rs(16),
  },
  modalCard: {
    width: '100%',
    maxWidth: width * 0.85,
    borderRadius: rs(16),
    padding: rs(18),
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  iconCircle: {
    width: rs(52),
    height: rs(52),
    borderRadius: rs(26),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: rs(11),
  },
  modalTitle: {
    fontSize: rs(14),
    fontWeight: '700',
    fontFamily: 'Figtree-Bold',
    marginBottom: rs(7),
    textAlign: 'center',
  },
  modalDesc: {
    fontSize: rs(11.5),
    fontFamily: 'Figtree-Medium',
    textAlign: 'center',
    marginBottom: rs(14),
    lineHeight: rs(16),
  },
  keepBtn: {
    width: '100%',
    paddingVertical: rs(11),
    borderRadius: rs(8),
    marginBottom: rs(9),
    alignItems: 'center',
  },
  keepText: {
    fontWeight: '600',
    fontFamily: 'Figtree-SemiBold',
    fontSize: rs(12.5),
  },
  sendBtn: {
    width: '100%',
    paddingVertical: rs(11),
    borderRadius: rs(8),
    alignItems: 'center',
  },
  sendText: {
    fontWeight: '600',
    fontFamily: 'Figtree-SemiBold',
    fontSize: rs(12.5),
  },
});
