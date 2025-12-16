
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Modal
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useColor } from '../../../util/ColorSwitcher';
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';


const { height,width } = Dimensions.get('window');


  const OrderDetail = ({ route }) => {
  const navigation = useNavigation();
  const { order } = route.params || {};
  const { bgColor } = useColor();
  const [showReturnPopup, setShowReturnPopup] = useState(false);


  return (
    <ScrollView style={styles.container}>
      <StatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent
      />

      {/* ================= Header ================= */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconBtn}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Image
            source={require('../../../assets/back.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>

        <Text style={styles.headerText}>Order Detail</Text>
      </View>

      {/* ================= PHONE CARD ================= */}
      <View style={styles.orderContent}>
        <Image
          source={order?.image || require('../../../assets/mobile2.png')}
          style={styles.productImage}
        />

        <View style={styles.orderText}>
          <Text style={[styles.orderId, { color: bgColor }]}>
            {order?.id}
          </Text>

          <Text style={styles.productName}>
            {order?.name}
          </Text>

          <View style={styles.soldRow}>
            <Text style={[styles.soldBy, { color: bgColor }]}>
              Sold By:{' '}
              <Text style={{ color: '#919291ff' }}>
                {order?.soldBy}
              </Text>
            </Text>

            <Text style={styles.dot}>•</Text>

            <Text
              style={[
                styles.status,
                {
                  color:
                    order?.status === 'Delivered'
                      ? '#34A853'
                      : '#FFA500',
                },
              ]}
            >
              {order?.status}
            </Text>
          </View>
        </View>
      </View>

      {/* ================= DETAILS CARD (SEPARATE) ================= */}
      <View style={styles.detailsCard}>
        <Text style={styles.detailsTitle}>Details</Text>

        <Text style={styles.addressText}>
          6391 Elgin St. Celina, Delaware 10299
        </Text>

        <View style={styles.userRow}>
          <View style={styles.userLeft}>
            <Image
              source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
              style={styles.userAvatar}
            />

            <View>
              <Text style={styles.userId}>ID: DKS-501F9</Text>
              <Text style={styles.userName}>Mann Sharma</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.callBtn} activeOpacity={0.85}>
            <Image
              source={require('../../../assets/call.png')}
              style={styles.callIcon}
            />
            <Text style={styles.callText}>Call</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ================= ORDER ITEM CARD ================= */} 
   <View style={styles.orderTitleContainer}>
  <Text style={styles.orderTitle}>Orders Item’s</Text>
</View>

      <View style={styles.orderCard}>
       {/* Left Image */}   
  <Image
    source={require('../../../assets/mobile3.png')}
    style={styles.itemImage}
  />

  {/* Middle Content */}
  <View style={styles.itemContent}>
    <Text style={styles.itemName}>I Phone 17 Plus</Text>

    <Text style={styles.soldByText}>
      Sold By : <Text style={styles.storeName}>Grocery Store</Text>
    </Text>

    <View style={styles.bottomRow}>
      <Text style={styles.price}>₹124050.00</Text>

      {/* Quantity Controls */}
      <View style={styles.qtyContainer}>
        <TouchableOpacity style={styles.qtyBtn}>
          <Text style={styles.qtyBtnText}>−</Text>
        </TouchableOpacity>

        <Text style={styles.qtyText}>02</Text>

        <TouchableOpacity style={styles.qtyBtnDark}>
          <Text style={styles.qtyBtnTextDark}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>

  {/* Close Icon */}
  <TouchableOpacity style={styles.closeBtn}>
    <Text style={styles.closeText}>✕</Text>
  </TouchableOpacity>
</View>


/* ================= ORDER ITEM CARD 2 ================= */

      <View style={styles.orderCard}>
       {/* Left Image */}   
  <Image
    source={require('../../../assets/mobile3.png')}
    style={styles.itemImage}
  />

  {/* Middle Content */}
  <View style={styles.itemContent}>
    <Text style={styles.itemName}>I Phone 17 Plus</Text>

    <Text style={styles.soldByText}>
      Sold By : <Text style={styles.storeName}>Grocery Store</Text>
    </Text>

    <View style={styles.bottomRow}>
      <Text style={styles.price}>₹124050.00</Text>

      {/* Quantity Controls */}
      <View style={styles.qtyContainer}>
        <TouchableOpacity style={styles.qtyBtn}>
          <Text style={styles.qtyBtnText}>−</Text>
        </TouchableOpacity>

        <Text style={styles.qtyText}>02</Text>

        <TouchableOpacity style={styles.qtyBtnDark}>
          <Text style={styles.qtyBtnTextDark}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>

  {/* Close Icon */}
  <TouchableOpacity style={styles.closeBtn}>
    <Text style={styles.closeText}>✕</Text>
  </TouchableOpacity>
</View>
            
       <LinearGradient
      colors={['#E94E77', '#F6B092', '#8E44AD']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      {/* Top Row */}
      <View style={styles.topRow}>
        <Text style={styles.cardType}>Credit Card</Text>

        <View style={styles.masterCard}>
          <View style={styles.circleRed} />
          <View style={styles.circleYellow} />
        </View>
      </View>

      {/* Card Number */}
      <View style={styles.numberRow}>
        <Text style={styles.cardNumber}>5341</Text>
        <Text style={styles.cardNumber}>1512448</Text>
        <Text style={styles.cardNumber}>54887</Text>
      </View>
    </LinearGradient>
   
   <View style={styles.bottomcontainer}>
      <View style={styles.totalRow}>
        <Text style={styles.totalText}>Total</Text>
        <Text style={styles.amountText}>₹ 59890.00</Text>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
  style={[styles.button, styles.returnButton]}
  onPress={() => setShowReturnPopup(true)}
>
  <Text style={[styles.buttonText, styles.returnButtonText]}>
    RETURN ORDER
  </Text>
</TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.reorderButton]}>
          <Text style={[styles.buttonText, styles.reorderButtonText]}>RE-ORDER</Text>
        </TouchableOpacity>
      </View>
    </View>


    {/* ================= RETURN ORDER POPUP ================= */}
<Modal
  transparent
  visible={showReturnPopup}
  animationType="fade"
>
  <View style={styles.modalOverlay}>
    <View style={styles.modalCard}>

      {/* Icon */}
      <View style={styles.iconCircle}>
        <Image
          source={require('../../../assets/wallet.png')} // wallet/return icon
          style={{ width: 28, height: 28, tintColor: '#fff',backgroundColor: '#051643ff' }}
        />
      </View>

      <Text style={styles.modalTitle}>Return Order</Text>

      <Text style={styles.modalDesc}>
        Order send back are only allowed for damaged items.
        Continue if your order is damaged
      </Text>

      {/* Buttons */}
      <TouchableOpacity
        style={styles.keepBtn}
        onPress={() => setShowReturnPopup(false)}
      >
        <Text style={styles.keepText}>Keep order</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.sendBtn}
        onPress={() => {
          setShowReturnPopup(false);
         // navigation.navigate('ReturnOrder'); // optional
        }}
      >
        <Text style={styles.sendText}>Send Back</Text>
      </TouchableOpacity>

    </View>
  </View>
</Modal>

    </ScrollView>
  );
};

export default OrderDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  /* ---------- Header ---------- */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 15,
    paddingBottom: 15,
    backgroundColor: '#fff',
  },
  iconBtn: {
    padding: 5,
  },
  backIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: width * 0.30,
  },

  /* ---------- Phone Card ---------- */
  orderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginVertical: 8,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    resizeMode: 'contain',
  },
  orderText: {
    flex: 1,
    paddingLeft: 15,
  },
  orderId: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  productName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
    color: '#000',
  },
  soldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  soldBy: {
    fontSize: 13,
    fontWeight: '500',
  },
  dot: {
    fontSize: 22,
    lineHeight: 18,
    color: '#C4C4C4',
    marginHorizontal: 8,
  },
  status: {
    fontSize: 13,
    fontWeight: '500',
  },

  /* ---------- Details Card ---------- */
  detailsCard: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    paddingHorizontal: 15,
    borderRadius: 14,
  },
  detailsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 6,
  },
  addressText: {
    fontSize: 15,
    color: '#555',
    lineHeight: 20,
    marginBottom: 14,
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
  width: 80,
  height: 80,
  borderRadius: 40,   
  marginRight: 12,
},

  userId: {
    fontSize: 14,
    color: '#c0bfbfff',
    marginBottom: 2,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  callBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E3A6D',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  callIcon: {
    width: 16,
    height: 16,
    tintColor: '#fff',
    marginRight: 6,
  },
  callText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  /* ---------- Order Item Card ---------- */

  orderTitleContainer: {
  paddingHorizontal: 15,
  paddingVertical: 12,
  marginHorizontal: 15,
  backgroundColor: '#fff',
 
},

orderTitle: {
  fontSize: 16,
  fontWeight: '600',
  color: '#000',
},

  orderCard: {
  flexDirection: 'row',
  backgroundColor: '#fff',
  borderRadius: 18,
  padding: 14,
  marginHorizontal: 15,
  marginBottom: 15,
  elevation: 2,
  shadowColor: '#000',
  shadowOpacity: 0.05,
  shadowRadius: 6,
  shadowOffset: { width: 0, height: 2 },
},

itemImage: {
  width: 80,
  height: 80,
  borderRadius: 16,
  resizeMode: 'contain',
  backgroundColor: '#F3F3F3',
},

itemContent: {
  flex: 1,
  paddingLeft: 14,
},

itemName: {
  fontSize: 16,
  fontWeight: '700',
  color: '#000',
  marginBottom: 4,
},

soldByText: {
  fontSize: 13,
  color: '#6B7280',
  marginBottom: 10,
},

storeName: {
  color: '#1E3A6D',
  fontWeight: '500',
},

bottomRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},

price: {
  fontSize: 16,
  fontWeight: '700',
  color: '#000',
},

qtyContainer: {
  flexDirection: 'row',
  alignItems: 'center',
},

qtyBtn: {
  width: 32,
  height: 32,
  borderRadius: 16,
  borderWidth: 1,
  borderColor: '#1E3A6D',
  justifyContent: 'center',
  alignItems: 'center',
},

qtyBtnText: {
  fontSize: 18,
  color: '#1E3A6D',
  fontWeight: '600',
},

qtyText: {
  marginHorizontal: 12,
  fontSize: 15,
  fontWeight: '600',
  color: '#000',
},

qtyBtnDark: {
  width: 32,
  height: 32,
  borderRadius: 16,
  backgroundColor: '#1E3A6D',
  justifyContent: 'center',
  alignItems: 'center',
},

qtyBtnTextDark: {
  fontSize: 18,
  color: '#fff',
  fontWeight: '600',
},

closeBtn: {
  position: 'absolute',
  top: 10,
  right: 10,
},

closeText: {
  fontSize: 18,
  color: '#1E3A6D',
  fontWeight: '600',
},
  /* ---------- Credit Card ---------- */
  card: {
    height: 100,
    borderRadius: 15,
    marginHorizontal: 12,
    marginVertical: 15,
    padding: 20,
    justifyContent: 'space-between',
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  cardType: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '400',
  },

  masterCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  circleRed: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#EB001B',
    position: 'absolute',
    right: 12,
  },

  circleYellow: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F79E1B',
  },

  numberRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  cardNumber: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    letterSpacing: 1,
  },
  /* ---------- Bottom Section ---------- */
  bottomcontainer: {
    padding: 20,
    backgroundColor: '#fff',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  totalText: {
    fontSize: 16,
    color: '#000',
  },
   amountText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    paddingVertical: 18,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  returnButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d7d6d6ff',
  },
  reorderButton: {
    backgroundColor: '#152a5b',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
  },
   returnButtonText: {
    color: '#000',
  },
  reorderButtonText: {
    color: '#fff',
  },
  /* ---------- Return Order Popup ---------- */
  modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.45)',
  justifyContent: 'center',
  alignItems: 'center',
},

modalCard: {
  width: '75%',
  backgroundColor: '#fff',
  borderRadius: 20,
  padding: 20,
  alignItems: 'center',
},

iconCircle: {
  width: 80,
  height: 80,
  borderRadius: 40,
  backgroundColor: '#051643ff',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 10,
},

modalTitle: {
  fontSize: 18,
  fontWeight: '700',
  marginBottom: 8,
  color: '#000',
},

modalDesc: {
  fontSize: 13,
  color: '#666',
  textAlign: 'center',
  marginBottom: 20,
},

keepBtn: {
  width: '100%',
  backgroundColor: '#F58220',
  paddingVertical: 14,
  borderRadius: 30,
  marginBottom: 12,
},

keepText: {
  color: '#fff',
  fontWeight: '600',
  textAlign: 'center',
},

sendBtn: {
  width: '100%',
  backgroundColor: '#EFEFEF',
  paddingVertical: 14,
  borderRadius: 30,
},

sendText: {
  color: '#555',
  fontWeight: '600',
  textAlign: 'center',
},

});
