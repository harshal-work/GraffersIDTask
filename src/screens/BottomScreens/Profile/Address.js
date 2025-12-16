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
  KeyboardAvoidingView,
  Platform,
  Alert,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const responsiveSize = size => (width / 375) * size;

const Address = () => {
  const navigation = useNavigation();

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: 'Home',
      icon: require('../../../assets/ghar.png'), // add icon
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
      address:
        '789 Corporate Avenue, Scheme 54, Vijay Nagar, Indore M.P.',
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
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../../assets/back.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Addresses</Text>
      </View>

      <ScrollView contentContainerStyle={styles.list}>
        <Text style={styles.sectionTitle}>Saved Addresses</Text>

        {addresses.map(item => (
          <View key={item.id} style={styles.card}>
            {/* Left Content */}
            <View style={styles.cardContent}>
              <View style={styles.titleRow}>
                <Image source={item.icon} style={styles.typeIcon} />
                <Text style={styles.typeText}>{item.type}</Text>
              </View>

              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.text}>{item.address}</Text>
              <Text style={styles.landmark}>
                Landmark: <Text style={styles.landmarkText}>{item.landmark}</Text>
              </Text>
              <Text style={styles.phone}>{item.phone}</Text>
            </View>

            {/* Delete Strip */}
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
  style={styles.addBtn}
  onPress={() => setIsAddModalVisible(true)}
>
  <Text style={styles.addText}>+ Add New Address</Text>
</TouchableOpacity>

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
<Modal
  visible={isAddModalVisible}
  animationType="slide"
  transparent
>
  <View style={styles.bottomOverlay}>
    <View style={styles.bottomSheet}>
      
      {/* Header */}
      <View style={styles.sheetHeader}>
        <Text style={styles.sheetTitle}>Add New Address</Text>
        <TouchableOpacity onPress={() => setIsDeleteModalVisible(false)}>
          <Text style={styles.close}>✕</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        
        <Text style={styles.label}>Full Name *</Text>
        <TextInput style={styles.input} placeholder="Enter your name" />

        <Text style={styles.label}>Phone Number *</Text>
        <View style={styles.phoneRow}>
          <View style={styles.countryCode}>
            <Text>+91</Text>
          </View>
          <TextInput
            style={styles.phoneInput}
            placeholder="Enter 10-digit number"
            keyboardType="number-pad"
          />
        </View>

        <Text style={styles.label}>House/Flat/Block No. *</Text>
        <TextInput style={styles.input} placeholder="Enter house/flat/block no." />

        <Text style={styles.label}>Area/Street/Sector *</Text>
        <TextInput style={styles.input} placeholder="Enter area/street/sector" />

        <Text style={styles.label}>Landmark (Optional)</Text>
        <TextInput style={styles.input} placeholder="E.g. Near City Mall" />

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
                addressType === type && styles.typeBoxActive,
              ]}
            >
              <Text
                style={[
                  styles.typeText2,
                  addressType === type && styles.typeTextActive,
                ]}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.saveBtnLarge}>
          <Text style={styles.saveBtnText}>Save Address</Text>
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
  backgroundColor: '#fff',
},

header: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingTop: responsiveSize(40),   // 👈 top padding same for both
  paddingHorizontal: responsiveSize(16),
  height: responsiveSize(80),       // 👈 stable header height
},

backIcon: {
  width: responsiveSize(22),
  height: responsiveSize(22),
},

headerTitle: {
  position: 'absolute',
  left: 0,
  right: 0,
  textAlign: 'center',
  fontSize: responsiveSize(18),
  fontWeight: '600',
  paddingTop: responsiveSize(40),
},


  list: {
    padding: responsiveSize(16),
    paddingBottom: responsiveSize(30),
  },

  sectionTitle: {
    fontSize: responsiveSize(16),
    fontWeight: '600',
    marginBottom: responsiveSize(12),
  },

  card: {
    flexDirection: 'row',
    backgroundColor: '#F7F7F7',
    borderRadius: responsiveSize(14),
    marginBottom: responsiveSize(14),
    overflow: 'hidden',
    elevation: 3,
  },

  cardContent: {
    flex: 1,
    padding: responsiveSize(14),
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveSize(6),
  },

  typeIcon: {
    width: responsiveSize(18),
    height: responsiveSize(18),
    marginRight: responsiveSize(6),
  },

  typeText: {
    fontSize: responsiveSize(15),
    fontWeight: '600',
    color: '#15305F',
  },

  name: {
    fontSize: responsiveSize(15),
    fontWeight: '600',
    marginBottom: responsiveSize(4),
  },

  text: {
    fontSize: responsiveSize(14),
    color: '#333',
    lineHeight: responsiveSize(20),
  },

  landmark: {
    marginTop: responsiveSize(6),
    fontSize: responsiveSize(13),
    fontStyle: 'italic',
  },

  landmarkText: {
    color: '#555',
  },

  phone: {
    marginTop: responsiveSize(6),
    fontSize: responsiveSize(14),
    fontWeight: '500',
  },

  deleteStrip: {
    width: responsiveSize(56),
    backgroundColor: '#FFE6E6',
    justifyContent: 'center',
    alignItems: 'center',
  },

  deleteIcon: {
    width: responsiveSize(22),
    height: responsiveSize(22),
    tintColor: '#E53935',
  },

  addBtn: {
    marginTop: responsiveSize(24),
    backgroundColor: '#15305F',
    paddingVertical: responsiveSize(14),
    borderRadius: responsiveSize(10),
    alignItems: 'center',
  },

  addText: {
    color: '#fff',
    fontSize: responsiveSize(16),
    fontWeight: '600',
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
    padding: responsiveSize(20),
    borderRadius: responsiveSize(12),
  },

  popupText: {
    fontSize: responsiveSize(16),
    marginBottom: responsiveSize(16),
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  yes: {
    fontSize: responsiveSize(16),
    color: 'red',
  },

  no: {
    fontSize: responsiveSize(16),
    color: '#007AFF',
  },
  bottomOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.4)',
  justifyContent: 'flex-end',
},

bottomSheet: {
  backgroundColor: '#fff',
  borderTopLeftRadius: responsiveSize(24),
  borderTopRightRadius: responsiveSize(24),
  padding: responsiveSize(16),
  maxHeight: '90%',
},

sheetHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: responsiveSize(10),
},

sheetTitle: {
  fontSize: responsiveSize(18),
  fontWeight: '600',
},

close: {
  fontSize: responsiveSize(22),
},

label: {
  fontSize: responsiveSize(14),
  fontWeight: '500',
  marginTop: responsiveSize(14),
},

input: {
  backgroundColor: '#F3F3F3',
  borderRadius: responsiveSize(10),
  padding: responsiveSize(12),
  marginTop: responsiveSize(6),
},

phoneRow: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: responsiveSize(6),
},

countryCode: {
  backgroundColor: '#F3F3F3',
  padding: responsiveSize(12),
  borderRadius: responsiveSize(10),
  marginRight: responsiveSize(8),
},

phoneInput: {
  flex: 1,
  backgroundColor: '#F3F3F3',
  padding: responsiveSize(12),
  borderRadius: responsiveSize(10),
},

typeRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: responsiveSize(12),
},

typeBox: {
  flex: 1,
  backgroundColor: '#F3F3F3',
  paddingVertical: responsiveSize(14),
  borderRadius: responsiveSize(14),
  alignItems: 'center',
  marginHorizontal: responsiveSize(4),
},

typeBoxActive: {
  borderWidth: 2,
  borderColor: '#15305F',
  backgroundColor: '#FFF6EF',
},

typeText2: {
  fontSize: responsiveSize(15),
  color: '#666',
},

typeTextActive: {
  color: '#15305F',
  fontWeight: '600',
},

saveBtnLarge: {
  backgroundColor: '#15305F',
  paddingVertical: responsiveSize(16),
  borderRadius: responsiveSize(14),
  alignItems: 'center',
  marginVertical: responsiveSize(24),
},

saveBtnText: {
  color: '#fff',
  fontSize: responsiveSize(18),
  fontWeight: '600',
},

});
