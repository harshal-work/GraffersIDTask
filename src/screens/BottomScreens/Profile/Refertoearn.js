import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  Platform,
  Alert,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useColor } from '../../../util/ColorSwitcher';

const { width, height } = Dimensions.get('window');

// Swiggy-style tighter scaling
const rs = size => (width / 400) * size;

const isIOS = Platform.OS === 'ios';

const fontScale = size => (isIOS ? size * 0.95 : size);

const ReferToEarn = () => {
  const navigation = useNavigation();
  const { bgColor, textColor } = useColor();
  const referralCode = 'XYJLHG';

  const handleCopy = () => {
    Alert.alert('Copied', 'Referral code copied');
  };

  const handleShare = () => {
    Alert.alert('Share', 'Share referral code');
  };

  const handleWhatsapp = () => {
    Alert.alert('Whatsapp', 'Invite via Whatsapp');
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={bgColor} barStyle="light-content" />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: bgColor }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconBtn}
        >
          <Image
            source={require('../../../assets/back.png')}
            style={[styles.icon, { tintColor: bgColor }]}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Refer to Earn</Text>
        <View style={{ width: rs(40) }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Referral Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Invitation Code</Text>

          <View style={styles.codeBox}>
            <Text style={styles.codeText}>{referralCode}</Text>

            <View style={styles.iconRow}>
              <TouchableOpacity onPress={handleCopy}>
                <Image
                  source={require('../../../assets/copy.png')}
                  style={styles.icon}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={handleShare}>
                <Image
                  source={require('../../../assets/share1.png')}
                  style={[styles.icon, { marginLeft: rs(10) }]}
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.whatsappBtn, { backgroundColor: bgColor }]}
            onPress={handleWhatsapp}
          >
            <Image
              source={require('../../../assets/whatsapp.png')}
              style={styles.whatsappIcon}
            />
            <Text style={[styles.whatsappText, { color: textColor }]}>
              Invite Via Whatsapp
            </Text>
          </TouchableOpacity>

          <View style={styles.infoRow}>
            <Text style={styles.infoText}>
              How to invite friend's and win award
            </Text>
            <Image
              source={require('../../../assets/help.png')}
              style={styles.helpIcon}
            />
          </View>
        </View>

        {/* Bottom Cards */}
        <View style={styles.bottomRow}>
          <TouchableOpacity style={styles.bottomCard}>
            <Image
              source={require('../../../assets/earned.png')}
              style={styles.bottomImage}
            />
            <Text style={styles.bottomText}>Earned Reward's</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.bottomCard}>
            <Image
              source={require('../../../assets/earned.png')}
              style={styles.bottomImage}
            />
            <Text style={styles.bottomText}>Track Referral's</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ReferToEarn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    backgroundColor: '#FFFFFF',
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

  content: {
    paddingHorizontal: rs(13),
    paddingBottom: isIOS ? rs(80) : rs(70),
    paddingTop: rs(8),
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: rs(12),
    padding: rs(13),
    elevation: 2,
    marginTop: rs(8),
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

  cardTitle: {
    fontSize: fontScale(rs(13)),
    fontWeight: '500',
    marginBottom: rs(8),
  },

  codeBox: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#ccc',
    borderRadius: rs(9),
    paddingHorizontal: rs(12),
    paddingVertical: rs(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  codeText: {
    fontSize: fontScale(rs(14)),
    fontWeight: '600',
    letterSpacing: 0.8,
  },

  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  icon: {
    width: rs(18),
    height: rs(18),
    tintColor: '#000',
  },

  whatsappBtn: {
    borderRadius: rs(10),
    height: rs(44),
    marginTop: rs(14),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  whatsappIcon: {
    width: rs(19),
    height: rs(19),
    marginRight: rs(8),
  },

  whatsappText: {
    fontSize: fontScale(rs(13)),
    fontWeight: '600',
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: rs(12),
  },

  infoText: {
    fontSize: fontScale(rs(12)),
    color: '#444',
  },

  helpIcon: {
    width: rs(16),
    height: rs(16),
    tintColor: '#F57C00',
  },

  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: rs(20),
  },

  bottomCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: rs(12),
    paddingVertical: rs(15),
    alignItems: 'center',
    elevation: 2,
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

  bottomImage: {
    width: rs(38),
    height: rs(38),
    marginBottom: rs(8),
  },

  bottomText: {
    fontSize: fontScale(rs(12.5)),
    fontWeight: '500',
  },
});
