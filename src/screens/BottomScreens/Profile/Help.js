import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useColor } from '../../../util/ColorSwitcher';

const { width } = Dimensions.get('window');
const rs = size => (width / 400) * size;

const isIOS = Platform.OS === 'ios';

const fontScale = size => (isIOS ? size * 0.95 : size);

const HelpScreen = () => {
  const navigation = useNavigation();
  const { bgColor, textColor } = useColor();

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

        <Text style={styles.headerTitle}>Help</Text>
        <View style={{ width: rs(32) }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Help & Support</Text>

        <Text style={styles.paragraph}>
          This is a dummy help screen. You can add FAQs, contact information,
          troubleshooting steps, or any support-related content here.
        </Text>

        <View style={styles.box}>
          <Text style={styles.boxText}>✔ App Usage Guide</Text>
        </View>

        <View style={styles.box}>
          <Text style={styles.boxText}>✔ Troubleshooting Tips</Text>
        </View>

        <View style={styles.box}>
          <Text style={styles.boxText}>✔ Contact Support</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default HelpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  /* Header */
  header: {
    height: isIOS ? rs(90) : rs(82),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: rs(14),
    justifyContent: 'space-between',
    paddingTop: isIOS ? rs(44) : rs(26),
    paddingBottom: 0,
  },
  headerTitle: {
    color: '#fff',
    fontSize: fontScale(rs(16)),
    fontWeight: '700',
    textAlign: 'center',
    flex: 1,
    marginHorizontal: rs(8),
  },
  iconBtn: {
    width: rs(34),
    height: rs(34),
    borderRadius: rs(10),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
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
    width: rs(16),
    height: rs(16),
    resizeMode: 'contain',
  },

  content: {
    paddingHorizontal: rs(16),
    paddingBottom: isIOS ? rs(80) : rs(70),
    paddingTop: rs(8),
  },

  title: {
    fontSize: fontScale(rs(17)),
    marginBottom: rs(10),
    color: '#000',
    fontWeight: '700',
  },

  paragraph: {
    fontSize: fontScale(rs(11.5)),
    marginBottom: rs(14),
    lineHeight: rs(18),
    color: '#444',
  },

  box: {
    padding: rs(12),
    borderRadius: rs(10),
    marginBottom: rs(8),
    backgroundColor: '#F7F7F7',
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

  boxText: {
    fontSize: fontScale(rs(11.5)),
    color: '#171717ff',
    fontWeight: '700',
    marginLeft: rs(4),
  },
});
