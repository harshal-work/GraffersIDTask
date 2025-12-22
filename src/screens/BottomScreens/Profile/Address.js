import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Modal,
  TextInput,
  Platform,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useColor } from '../../../util/ColorSwitcher';

const { width, height } = Dimensions.get('window');

// slightly smaller base
const responsiveSize = size => (width / 400) * size;

const isIOS = Platform.OS === 'ios';

const fontScale = size => (isIOS ? size * 0.95 : size);
const scaleSize = size => (isIOS ? size * 1.02 : size);

const Address = () => {
  const navigation = useNavigation();
  const { bgColor, textColor } = useColor();

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: 'Home',
      icon: require('../../../assets/ghar.png'),
      name: 'Harshal Sharma',
      address:
        '320 Koregaon park lane to, 4 opposite to B.M.W. showroom, Indore M.P.',
      landmark: 'Near BMW Showroom',
      phone: '+91 98765 43210',
    },
    {
      id: 2,
      type: 'Office',
      icon: require('../../../assets/office.png'),
      name: 'Vinsta Plus Application',
      address: '789 Corporate Avenue, Scheme 54, Vijay Nagar, Indore M.P.',
      landmark: 'Behind City Mall',
      phone: '+91 98765 43210',
    },
  ]);

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState(null);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [addressType, setAddressType] = useState('Home');

  const handleDeletePress = id => {
    setAddressToDelete(id);
    setIsDeleteModalVisible(true);
  };

  const confirmDelete = () => {
    setAddresses(prev => prev.filter(a => a.id !== addressToDelete));
    setIsDeleteModalVisible(false);
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

        <Text style={styles.headerTitle}>My Addresses</Text>

        <View style={{ width: responsiveSize(32) }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Saved Addresses</Text>

        {addresses.map(item => (
          <View key={item.id} style={styles.card}>
            <View style={styles.cardContent}>
              <View style={styles.titleRow}>
                <Image source={item.icon} style={styles.typeIcon} />
                <Text style={styles.typeText}>{item.type}</Text>
              </View>

              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.text}>{item.address}</Text>
              <Text style={styles.landmark}>
                Landmark:{' '}
                <Text style={styles.landmarkText}>{item.landmark}</Text>
              </Text>
              <Text style={styles.phone}>{item.phone}</Text>
            </View>

            <TouchableOpacity
              style={styles.deleteStrip}
              onPress={() => handleDeletePress(item.id)}
            >
              <Image
                source={require('../../../assets/delete.png')}
                style={styles.deleteIcon}
              />
            </TouchableOpacity>
          </View>
        ))}

        {/* Add Button */}
        <TouchableOpacity
          style={[styles.addBtn, { backgroundColor: bgColor }]}
          onPress={() => setIsAddModalVisible(true)}
        >
          <Text style={[styles.addText, { color: textColor }]}>
            + Add New Address
          </Text>
        </TouchableOpacity>

        <View style={{ height: responsiveSize(64) }} />
      </ScrollView>

      {/* Delete Modal */}
      <Modal transparent visible={isDeleteModalVisible}>
        <View style={styles.overlay}>
          <View style={styles.popup}>
            <Text style={styles.popupText}>Delete this address?</Text>
            <View style={styles.row}>
              <TouchableOpacity onPress={confirmDelete}>
                <Text style={styles.yes}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsDeleteModalVisible(false)}>
                <Text style={styles.no}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Add Address Bottom Sheet */}
      <Modal visible={isAddModalVisible} animationType="slide" transparent>
        <View style={styles.bottomOverlay}>
          <View style={styles.bottomSheet}>
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>Add New Address</Text>
              <TouchableOpacity
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                onPress={() => setIsAddModalVisible(false)}
              >
                <Text style={styles.close}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.label}>Full Name *</Text>
              <TextInput style={styles.input} placeholder="Enter your name" />

              <Text style={styles.label}>Phone Number *</Text>
              <View style={styles.phoneRow}>
                <View style={styles.countryCode}>
                  <Text style={styles.phoneCodeText}>+91</Text>
                </View>
                <TextInput
                  style={styles.phoneInput}
                  placeholder="Enter 10-digit number"
                  keyboardType="number-pad"
                />
              </View>

              <Text style={styles.label}>House/Flat/Block No. *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter house/flat/block no."
              />

              <Text style={styles.label}>Area/Street/Sector *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter area/street/sector"
              />

              <Text style={styles.label}>Landmark (Optional)</Text>
              <TextInput
                style={styles.input}
                placeholder="E.g. Near City Mall"
              />

              <Text style={styles.label}>City *</Text>
              <TextInput style={styles.input} placeholder="Enter city" />

              <Text style={styles.label}>Pincode *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter 6-digit pincode"
                keyboardType="number-pad"
              />

              <Text style={styles.label}>Save Address As *</Text>

              <View style={styles.typeRow}>
                {['Home', 'Office', 'Other'].map(type => (
                  <TouchableOpacity
                    key={type}
                    onPress={() => setAddressType(type)}
                    style={[
                      styles.typeBox,
                      addressType === type && [
                        styles.typeBoxActive,
                        { borderColor: bgColor },
                      ],
                    ]}
                  >
                    <Text
                      style={[
                        styles.typeText2,
                        addressType === type && [
                          styles.typeTextActive,
                          { color: bgColor },
                        ],
                      ]}
                    >
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                style={[styles.saveBtnLarge, { backgroundColor: bgColor }]}
              >
                <Text style={[styles.saveBtnText, { color: textColor }]}>
                  Save Address
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Address;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: isIOS ? responsiveSize(80) : responsiveSize(70),
    paddingHorizontal: responsiveSize(14),
    paddingTop: responsiveSize(8),
  },

  header: {
    height: isIOS ? responsiveSize(90) : responsiveSize(82),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveSize(14),
    justifyContent: 'space-between',
    paddingTop: isIOS ? responsiveSize(44) : responsiveSize(26),
    paddingBottom: 0,
  },
  headerTitle: {
    color: '#fff',
    fontSize: responsiveSize(16),
    fontWeight: '700',
    textAlign: 'center',
    flex: 1,
    marginHorizontal: responsiveSize(8),
  },
  iconBtn: {
    width: responsiveSize(34),
    height: responsiveSize(34),
    borderRadius: responsiveSize(10),
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
  icon: {
    width: responsiveSize(16),
    height: responsiveSize(16),
    resizeMode: 'contain',
  },

  sectionTitle: {
    fontSize: fontScale(responsiveSize(13)),
    fontWeight: '600',
    marginBottom: responsiveSize(10),
  },

  card: {
    flexDirection: 'row',
    backgroundColor: '#F7F7F7',
    borderRadius: scaleSize(responsiveSize(12)),
    marginBottom: responsiveSize(10),
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },

  cardContent: {
    flex: 1,
    padding: responsiveSize(11),
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveSize(4),
  },

  typeIcon: {
    width: responsiveSize(15),
    height: responsiveSize(15),
    marginRight: responsiveSize(5),
    resizeMode: 'contain',
  },

  typeText: {
    fontSize: fontScale(responsiveSize(12.5)),
    fontWeight: '600',
    color: '#15305F',
  },

  name: {
    fontSize: fontScale(responsiveSize(12.5)),
    fontWeight: '600',
    marginBottom: responsiveSize(3),
  },

  text: {
    fontSize: fontScale(responsiveSize(11.5)),
    color: '#333',
    lineHeight: responsiveSize(16),
  },

  landmark: {
    marginTop: responsiveSize(4),
    fontSize: fontScale(responsiveSize(11)),
    fontStyle: 'italic',
  },

  landmarkText: {
    color: '#555',
  },

  phone: {
    marginTop: responsiveSize(4),
    fontSize: fontScale(responsiveSize(11.5)),
    fontWeight: '500',
  },

  deleteStrip: {
    width: responsiveSize(48),
    backgroundColor: '#FFE6E6',
    justifyContent: 'center',
    alignItems: 'center',
  },

  deleteIcon: {
    width: responsiveSize(18),
    height: responsiveSize(18),
    tintColor: '#E53935',
    resizeMode: 'contain',
  },

  addBtn: {
    paddingVertical: responsiveSize(11),
    borderRadius: scaleSize(responsiveSize(10)),
    alignItems: 'center',
    marginTop: responsiveSize(18),
  },

  addText: {
    fontSize: fontScale(responsiveSize(13)),
    fontWeight: '600',
    letterSpacing: 0.3,
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  popup: {
    width: '80%',
    backgroundColor: '#fff',
    padding: responsiveSize(16),
    borderRadius: responsiveSize(10),
  },

  popupText: {
    fontSize: fontScale(responsiveSize(13)),
    marginBottom: responsiveSize(12),
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  yes: {
    fontSize: fontScale(responsiveSize(13)),
    color: 'red',
  },

  no: {
    fontSize: fontScale(responsiveSize(13)),
    color: '#007AFF',
  },

  bottomOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },

  bottomSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: responsiveSize(20),
    borderTopRightRadius: responsiveSize(20),
    padding: responsiveSize(14),
    maxHeight: '90%',
  },

  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsiveSize(8),
  },

  sheetTitle: {
    fontSize: fontScale(responsiveSize(15)),
    fontWeight: '600',
  },

  close: {
    fontSize: responsiveSize(18),
  },

  label: {
    fontSize: fontScale(responsiveSize(12)),
    fontWeight: '500',
    marginTop: responsiveSize(11),
  },

  input: {
    backgroundColor: '#F3F3F3',
    borderRadius: scaleSize(responsiveSize(10)),
    padding: responsiveSize(10),
    marginTop: responsiveSize(5),
    fontSize: fontScale(responsiveSize(11.5)),
  },

  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsiveSize(5),
  },

  countryCode: {
    backgroundColor: '#F3F3F3',
    padding: responsiveSize(10),
    borderRadius: scaleSize(responsiveSize(10)),
    marginRight: responsiveSize(7),
  },

  phoneCodeText: {
    fontSize: fontScale(responsiveSize(11.5)),
  },

  phoneInput: {
    flex: 1,
    backgroundColor: '#F3F3F3',
    padding: responsiveSize(10),
    borderRadius: scaleSize(responsiveSize(10)),
    fontSize: fontScale(responsiveSize(11.5)),
  },

  typeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: responsiveSize(10),
  },

  typeBox: {
    flex: 1,
    backgroundColor: '#F3F3F3',
    paddingVertical: responsiveSize(11),
    borderRadius: scaleSize(responsiveSize(12)),
    alignItems: 'center',
    marginHorizontal: responsiveSize(3),
  },

  typeBoxActive: {
    borderWidth: 2,
  },

  typeText2: {
    fontSize: fontScale(responsiveSize(12.5)),
    color: '#666',
  },

  typeTextActive: {
    fontWeight: '600',
  },

  saveBtnLarge: {
    paddingVertical: responsiveSize(13),
    borderRadius: scaleSize(responsiveSize(12)),
    alignItems: 'center',
    marginVertical: responsiveSize(18),
  },

  saveBtnText: {
    fontSize: fontScale(responsiveSize(14)),
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});
