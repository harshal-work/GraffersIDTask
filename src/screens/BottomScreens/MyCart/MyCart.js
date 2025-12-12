// screens/MyCart.js
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  Dimensions,
  Platform,
  StatusBar,
} from "react-native";
import { useColor } from "../../../util/ColorSwitcher";

const { width, height } = Dimensions.get('window');

// Responsive sizing
const responsiveSize = (size) => (width / 375) * size;

export default function MyCart({ navigation }) {
  const { bgColor, textColor } = useColor();

  const [qty, setQty] = useState(2);
  const [delivery, setDelivery] = useState("Home");
  const [selectedItems, setSelectedItems] = useState([]);

  const increaseQty = () => setQty(q => q + 1);
  const decreaseQty = () => setQty(q => (q > 1 ? q - 1 : 1));

  const toggleItem = (itemName) => {
    if (selectedItems.includes(itemName)) {
      setSelectedItems(selectedItems.filter(item => item !== itemName));
    } else {
      setSelectedItems([...selectedItems, itemName]);
    }
  };

  // Image mapping for recommended products
  const imageMap = {
    "Cover": require("../../../assets/phone-case.png"),
    "Headphone": require("../../../assets/headphones.png"),
    "Charger": require("../../../assets/phone-charger.png"),
    "Earphone": require("../../../assets/earphone.png"),
  };

  const recommendedProducts = [
    { name: "Cover", image: "Cover" },
    { name: "Headphone", image: "Headphone" },
    { name: "Charger", image: "Charger" },
    { name: "Earphone", image: "Earphone" },
  ];

  return (
    <View style={[styles.container, { backgroundColor: '#FFFFFF' }]}>
      <StatusBar backgroundColor={bgColor} barStyle="light-content" />
      
      {/* HEADER */}
      <View style={[styles.header, { backgroundColor: bgColor }]}>
        <Text style={styles.headerTitle}>My Cart</Text>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* OFFERS SECTION */}
        <View style={styles.offersCard}>
          <Text style={styles.offersTitle}>All the Awesome Things I Picked</Text>
          
          <View style={styles.offerSteps}>
            {/* Step 1 */}
            <View style={styles.offerStep}>
              <View style={styles.stepContent}>
                <View style={styles.stepIconContainer}>
                  <Image 
                    source={require("../../../assets/drop.png")} 
                    style={[styles.stepIcon, { tintColor: bgColor }]} 
                  />
                </View>
                <Text style={styles.stepText}>All picks are awesome</Text>
              </View>
              <View style={[styles.stepLine, { backgroundColor: bgColor }]} />
            </View>
            
            {/* Step 2 */}
            <View style={styles.offerStep}>
              <View style={styles.stepContent}>
                <View style={styles.stepIconContainer}>
                  <Image 
                    source={require("../../../assets/drop.png")} 
                    style={[styles.stepIcon, { tintColor: bgColor }]} 
                  />
                </View>
                <Text style={styles.stepText}>Select 2 more items to get 25% off</Text>
              </View>
              <View style={[styles.stepLine, { backgroundColor: bgColor }]} />
            </View>
            
            {/* Step 3 */}
            <View style={styles.offerStep}>
              <View style={styles.stepContent}>
                <View style={styles.stepIconContainer}>
                  <Image 
                    source={require("../../../assets/drop.png")} 
                    style={[styles.stepIcon, { tintColor: bgColor }]} 
                  />
                </View>
                <Text style={styles.stepText}>Select 4 items to get 30% off</Text>
              </View>
            </View>
          </View>
        </View>

        {/* PRODUCT CARD */}
        <View style={styles.productCard}>
          {/* Remove Icon - Top Right Corner */}
          <TouchableOpacity style={styles.removeBtn}>
            <Text style={styles.remove}>✕</Text>
          </TouchableOpacity>

          <Image
            source={require("../../../assets/mobile2.png")}
            style={styles.productImg}
          />

          <View style={styles.productInfo}>
            <Text style={styles.productName}>I Phone 17 Plus</Text>
            <Text style={styles.soldBy}>Sold By : Grocery Store</Text>
            <Text style={[styles.price, { color: bgColor }]}>₹124,050.00</Text>
            
            {/* Quantity Selector - After price */}
            <View style={styles.qtyContainer}>
              <TouchableOpacity onPress={decreaseQty} style={[styles.qtyBtn, { backgroundColor: bgColor }]}>
                <Text style={styles.qtyBtnTxt}>−</Text>
              </TouchableOpacity>

              <Text style={styles.qtyNumber}>{qty < 10 ? `0${qty}` : qty}</Text>

              <TouchableOpacity onPress={increaseQty} style={[styles.qtyBtn, { backgroundColor: bgColor }]}>
                <Text style={styles.qtyBtnTxt}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Recommended Section */}
        <Text style={styles.recommendedTitle}>More Recommended Product's</Text>

        <View style={styles.recommendedContainer}>
          {recommendedProducts.map((product, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.recoItem}
              onPress={() => toggleItem(product.name)}
            >
              <View style={styles.recoContent}>
                <Image
                  source={imageMap[product.image]}
                  style={styles.recoImg}
                />
                <View style={[
                  styles.checkbox,
                  { borderColor: bgColor },
                  selectedItems.includes(product.name) && [styles.checkboxSelected, { backgroundColor: bgColor }]
                ]}>
                  {selectedItems.includes(product.name) && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </View>
              </View>
              <Text style={styles.recoText}>{product.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.offerNote}>
          with I Phone 17. Select additional item to get 10% discount.*
        </Text>

        {/* Promo Code */}
        <View style={styles.promoSection}>
          <Text style={styles.promoTitle}>Promo Code</Text>
          <View style={styles.promoRow}>
            <TextInput 
              placeholder="Submit" 
              placeholderTextColor="#999"
              style={styles.promoInput} 
            />
            <TouchableOpacity style={[styles.applyBtn, { backgroundColor: bgColor }]}>
              <Text style={styles.applyTxt}>APPLY</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* PRICE BREAKDOWN */}
        <View style={styles.priceSection}>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Subtotal</Text>
            <Text style={styles.priceValue}>₹ 450.00</Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Tax and Fees</Text>
            <Text style={styles.priceValue}>₹ 50.00</Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Offer & Discount</Text>
            <Text style={styles.priceValue}>₹ 20.00</Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Delivery</Text>
            <Text style={styles.priceValue}>₹ 20.00</Text>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total (3 items)</Text>
            <Text style={[styles.totalValue, { color: bgColor }]}>₹83,000.00</Text>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* DELIVERY OPTION */}
        <Text style={styles.sectionTitle}>Select Delivery Option</Text>

        <View style={styles.deliveryOptions}>
          {["Home", "Office", "Other"].map(opt => (
            <TouchableOpacity
              key={opt}
              style={styles.deliveryOption}
              onPress={() => setDelivery(opt)}
            >
              <View style={styles.radioContainer}>
                <View
                  style={[
                    styles.radioOuter,
                    { borderColor: bgColor },
                    delivery === opt && [styles.radioOuterActive, { borderColor: bgColor }],
                  ]}
                >
                  {delivery === opt && <View style={[styles.radioInner, { backgroundColor: bgColor }]} />}
                </View>
                <Text style={styles.radioLabel}>{opt}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* DELIVERY LOCATION */}
        <Text style={styles.sectionTitle}>Delivery Location</Text>

        <View style={styles.locationCard}>
          <View style={styles.locationRow}>
            <View style={styles.radioContainer}>
              <View style={[styles.radioOuter, { borderColor: bgColor }, styles.radioOuterActive, { borderColor: bgColor }]}>
                <View style={[styles.radioInner, { backgroundColor: bgColor }]} />
              </View>
              <Text style={styles.locationText}>CM Block, 2nd Floor, Assam, India</Text>
            </View>
          </View>
          
          <TextInput
            placeholder="landmark/instruction (optional)"
            placeholderTextColor="#999"
            style={styles.landmarkInput}
            multiline
          />
        </View>

        {/* CHECKOUT BUTTON */}
        <TouchableOpacity
          style={[styles.checkoutBtn, { backgroundColor: bgColor }]}
          onPress={() => navigation.navigate("Main")}
        >
          <Text style={styles.checkoutText}>CHECKOUT</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Platform.OS === 'ios' ? responsiveSize(100) : responsiveSize(90),
  },

  /* HEADER */
  header: {
    height: Platform.OS === 'ios' ? responsiveSize(100) : responsiveSize(90),
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: responsiveSize(18),
    justifyContent: "space-between",
    paddingTop: Platform.OS === 'ios' ? responsiveSize(50) : responsiveSize(30),
    paddingBottom: responsiveSize(0),
  },
  headerTitle: { 
    color: "#fff", 
    fontSize: responsiveSize(20), 
    fontWeight: "700",
    textAlign: 'center',
    flex: 1,
    marginHorizontal: responsiveSize(10),
  },

  /* OFFERS SECTION */
  offersCard: {
    marginTop: responsiveSize(15),
    marginHorizontal: responsiveSize(15),
    backgroundColor: "#fff",
    borderRadius: responsiveSize(10),
    padding: responsiveSize(15),
    borderWidth: 1,
    borderColor: "#e0e0e0",
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  offersTitle: {
    fontSize: responsiveSize(16),
    fontWeight: "700",
    color: '#000',
    marginBottom: responsiveSize(20),
    textAlign: 'center',
  },
  offerSteps: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  offerStep: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },
  stepContent: {
    alignItems: 'center',
    width: '100%',
  },
  stepIconContainer: {
    width: responsiveSize(24),
    height: responsiveSize(24),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsiveSize(8),
  },
  stepIcon: {
    width: responsiveSize(18),
    height: responsiveSize(18),
  },
  stepText: {
    fontSize: responsiveSize(10),
    color: '#666',
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: responsiveSize(12),
    paddingHorizontal: responsiveSize(4),
  },
  stepLine: {
    position: 'absolute',
    top: responsiveSize(12),
    left: '50%',
    width: '100%',
    height: 2,
    zIndex: -1,
  },

  /* PRODUCT CARD */
  productCard: {
    marginTop: responsiveSize(15),
    marginHorizontal: responsiveSize(15),
    backgroundColor: "#fff",
    borderRadius: responsiveSize(10),
    padding: responsiveSize(12),
    flexDirection: "row",
    alignItems: "flex-start",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    position: 'relative',
  },
  productImg: { 
    width: responsiveSize(70), 
    height: responsiveSize(90), 
    borderRadius: responsiveSize(6), 
    marginRight: responsiveSize(12) 
  },
  productInfo: { 
    flex: 1,
  },
  productName: { 
    fontSize: responsiveSize(16), 
    fontWeight: "700",
    color: '#000',
    marginBottom: responsiveSize(2),
  },
  soldBy: { 
    color: "#666", 
    fontSize: responsiveSize(12),
    marginBottom: responsiveSize(6),
  },
  price: { 
    fontSize: responsiveSize(16), 
    fontWeight: "700",
    marginBottom: responsiveSize(8),
  },

  /* QUANTITY - After price */
  qtyContainer: {
    flexDirection: "row",
    alignItems: 'center',
  },
  qtyBtn: {
    width: responsiveSize(24),
    height: responsiveSize(24),
    borderRadius: responsiveSize(12),
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
  qtyBtnTxt: { 
    color: "#fff", 
    fontSize: responsiveSize(12), 
    fontWeight: 'bold',
    lineHeight: responsiveSize(14),
  },
  qtyNumber: {
    fontSize: responsiveSize(11),
    fontWeight: "600",
    marginHorizontal: responsiveSize(6),
    color: '#000',
    minWidth: responsiveSize(18),
    textAlign: 'center',
  },

  /* Remove Button - Top Right Corner */
  removeBtn: {
    position: 'absolute',
    top: responsiveSize(8),
    right: responsiveSize(8),
    width: responsiveSize(20),
    height: responsiveSize(20),
    borderRadius: responsiveSize(10),
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  remove: { 
    fontSize: responsiveSize(12), 
    color: "#666",
    fontWeight: '300',
  },

  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginHorizontal: responsiveSize(15),
    marginVertical: responsiveSize(12),
  },

  /* RECOMMENDED */
  recommendedTitle: {
    fontSize: responsiveSize(15),
    fontWeight: "700",
    marginHorizontal: responsiveSize(15),
    marginBottom: responsiveSize(12),
    color: '#000'
  },
  recommendedContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: responsiveSize(15),
    marginBottom: responsiveSize(8),
  },
  recoItem: { 
    alignItems: "center",
    width: responsiveSize(75),
  },
  recoContent: {
    position: 'relative',
    alignItems: 'center',
  },
  recoImg: { 
    width: responsiveSize(60), 
    height: responsiveSize(60), 
    borderRadius: responsiveSize(6),
    marginBottom: responsiveSize(6),
  },
  checkbox: {
    position: 'absolute',
    top: -3,
    right: -3,
    width: responsiveSize(18),
    height: responsiveSize(18),
    borderWidth: 1,
    borderRadius: responsiveSize(3),
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#1d3f72', // Fallback color
  },
  checkmark: {
    color: '#fff',
    fontSize: responsiveSize(10),
    fontWeight: 'bold',
  },
  recoText: { 
    fontSize: responsiveSize(11), 
    textAlign: "center",
    color: '#000',
    fontWeight: '500',
    marginTop: responsiveSize(2),
  },

  offerNote: {
    color: "#666",
    marginHorizontal: responsiveSize(15),
    marginTop: responsiveSize(4),
    marginBottom: responsiveSize(15),
    fontSize: responsiveSize(11),
    fontStyle: "italic",
    textAlign: 'center',
  },

  /* PROMO CODE */
  promoSection: {
    marginHorizontal: responsiveSize(15),
    marginBottom: responsiveSize(15),
  },
  promoTitle: {
    fontSize: responsiveSize(15),
    fontWeight: "700",
    marginBottom: responsiveSize(8),
    color: '#000'
  },
  promoRow: {
    flexDirection: "row",
  },
  promoInput: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    paddingHorizontal: responsiveSize(12),
    borderRadius: responsiveSize(6),
    height: responsiveSize(40),
    fontSize: responsiveSize(13),
    color: '#000',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  applyBtn: {
    paddingHorizontal: responsiveSize(16),
    justifyContent: "center",
    borderRadius: responsiveSize(6),
    marginLeft: responsiveSize(8),
    minWidth: responsiveSize(70),
  },
  applyTxt: { 
    color: "#fff", 
    fontWeight: "700",
    fontSize: responsiveSize(13)
  },

  /* PRICE SECTION */
  priceSection: {
    marginHorizontal: responsiveSize(15),
    marginBottom: responsiveSize(15),
    backgroundColor: '#f8f8f8',
    borderRadius: responsiveSize(8),
    padding: responsiveSize(12),
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: responsiveSize(4),
  },
  priceLabel: { 
    color: "#666",
    fontSize: responsiveSize(13)
  },
  priceValue: { 
    fontWeight: "500",
    fontSize: responsiveSize(13),
    color: '#000'
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: responsiveSize(8),
    paddingTop: responsiveSize(8),
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  totalLabel: { 
    fontSize: responsiveSize(14), 
    fontWeight: "600",
    color: '#000'
  },
  totalValue: { 
    fontSize: responsiveSize(15), 
    fontWeight: "700",
  },

  /* SECTIONS */
  sectionTitle: {
    fontSize: responsiveSize(15),
    fontWeight: "700",
    marginHorizontal: responsiveSize(15),
    marginBottom: responsiveSize(10),
    color: '#000'
  },

  /* DELIVERY OPTIONS */
  deliveryOptions: {
    flexDirection: "row",
    marginHorizontal: responsiveSize(15),
    marginBottom: responsiveSize(15),
  },
  deliveryOption: {
    marginRight: responsiveSize(20),
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioOuter: {
    width: responsiveSize(18),
    height: responsiveSize(18),
    borderRadius: responsiveSize(9),
    borderWidth: 1.5,
    justifyContent: "center",
    alignItems: "center",
    marginRight: responsiveSize(6),
  },
  radioOuterActive: {
    // Border color handled inline
  },
  radioInner: {
    width: responsiveSize(8),
    height: responsiveSize(8),
    borderRadius: responsiveSize(4),
  },
  radioLabel: { 
    fontSize: responsiveSize(13),
    color: '#000'
  },

  /* LOCATION */
  locationCard: {
    marginHorizontal: responsiveSize(15),
    backgroundColor: "#f8f8f8",
    borderRadius: responsiveSize(6),
    padding: responsiveSize(12),
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: responsiveSize(15),
  },
  locationRow: {
    marginBottom: responsiveSize(10),
  },
  locationText: { 
    color: "#000",
    fontSize: responsiveSize(13),
    flex: 1,
  },

  landmarkInput: {
    backgroundColor: "#fff",
    height: responsiveSize(90),
    borderRadius: responsiveSize(6),
    paddingHorizontal: responsiveSize(10),
    fontSize: responsiveSize(12),
    color: '#000',
    borderWidth: 1,
    borderColor: '#ddd',
  },

  /* CHECKOUT BTN */
  checkoutBtn: {
    marginHorizontal: responsiveSize(15),
    height: responsiveSize(45),
    borderRadius: responsiveSize(6),
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginTop: responsiveSize(8),
  },
  checkoutText: { 
    color: "#fff", 
    fontSize: responsiveSize(15), 
    fontWeight: "700" 
  },
});
