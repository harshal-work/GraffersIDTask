<<<<<<< HEAD
// ...existing code...
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useColor } from '../../../util/ColorSwitcher';

export default function Home() {
  const { bgColor, textColor, switchColor } = useColor();
  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}> 
      <TouchableOpacity style={[styles.button, { backgroundColor: '#15305F' }]} onPress={() => switchColor('#15305F')}>
        <Text style={[styles.buttonText, { color: textColor }]}>#15305F</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: '#259E29' }]} onPress={() => switchColor('#259E29')}>
        <Text style={[styles.buttonText, { color: textColor }]}>#259E29</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: '#675FD3' }]} onPress={() => switchColor('#675FD3')}>
        <Text style={[styles.buttonText, { color: textColor }]}>#675FD3</Text>
      </TouchableOpacity>
      <Text style={[styles.title, { color: textColor }]}>Home Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 16,
    margin: 10,
    borderRadius: 8,
    width: 200,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 30,
  },
});
=======
// File: src/screens/BottomScreens/Home/Home.js
import React, { useState } from 'react';
import { View, StatusBar, Platform } from 'react-native';

import AllHome from './AllHome';
import GroceryHome from './GroceryHome';
import ElectronicsHome from './ElectronicsHome';
import HealthHome from './HealthHome';

export default function Home() {
  const [activeTab, setActiveTab] = useState('ALL');

  const Screen = () => {
    switch (activeTab) {
      case 'GROCERY': 
        return <GroceryHome activeTab={activeTab} setActiveTab={setActiveTab} />;
      case 'ELECTRONICS': 
        return <ElectronicsHome activeTab={activeTab} setActiveTab={setActiveTab} />;
      case 'HEALTH': 
        return <HealthHome activeTab={activeTab} setActiveTab={setActiveTab} />;
      default: 
        return <AllHome activeTab={activeTab} setActiveTab={setActiveTab} />;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* StatusBar configuration for both platforms - Make it fully transparent and translucent */}
      <StatusBar 
        backgroundColor="transparent" 
        translucent={true}
        barStyle="light-content"
      />
      
      {/* Remove SafeAreaView completely for iOS to match Android behavior */}
      <View style={{ 
        flex: 1,
        // For iOS, we need to push content down by the status bar height
        // This is handled in each individual screen component
      }}>
        <Screen />
      </View>
    </View>
  );
}
>>>>>>> cfaff0c6ffec6ab197e4517481802ceb038990cd
