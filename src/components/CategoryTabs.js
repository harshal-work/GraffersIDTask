// File: src/components/CategoryTabs.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { useColor } from '../util/ColorSwitcher';

export default function CategoryTabs({ active, setActive }) {
  const { bgColor, switchColor } = useColor();

  const tabs = [
    { id: 'ALL', label: 'All', icon: require('../assets/all.png') },
    {
      id: 'GROCERY',
      label: 'Groceries',
      icon: require('../assets/grocery.png'),
    },
    {
      id: 'ELECTRONICS',
      label: 'Electronics',
      icon: require('../assets/electronics.png'),
    },
    { id: 'HEALTH', label: 'Health', icon: require('../assets/health.png') },
  ];

  return (
    <View style={styles.container}>
      {tabs.map(t => (
        <TouchableOpacity
          key={t.id}
          onPress={() => {
            setActive(t.id);
            switchColor(t.id);
          }}
          style={styles.tabWrapper}
          activeOpacity={0.8}
        >
          <Image
            source={t.icon}
            style={[styles.icon, active === t.id && { tintColor: bgColor }]}
            resizeMode="contain"
          />
          <Text style={[styles.label, active === t.id && { color: bgColor }]}>
            {t.label}
          </Text>
          {active === t.id && (
            <View style={[styles.underline, { backgroundColor: bgColor }]} />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  tabWrapper: { alignItems: 'center', flex: 1 },
  icon: {
    width: 24,
    height: 24,
    marginBottom: 4,
    tintColor: '#999',
  },
  label: {
    fontSize: 11,
    color: '#777',
  },
  underline: {
    height: 2.5,
    width: 24,
    marginTop: 4,
    borderRadius: 2,
  },
});
