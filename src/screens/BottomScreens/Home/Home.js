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
