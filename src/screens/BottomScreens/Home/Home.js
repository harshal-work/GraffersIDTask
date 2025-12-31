// File: src/screens/BottomScreens/Home/Home.js
import React, { useState } from 'react';
import { View, StatusBar } from 'react-native';

import AllHome from './AllHome';
// import GroceryHome from './GroceryHome';
// import ElectronicsHome from './ElectronicsHome';
// import HealthHome from './HealthHome';

export default function Home() {
  const [activeTab, setActiveTab] = useState('ALL');

  return (
    <View style={{ flex: 1 }}>
      {/* Transparent StatusBar */}
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle="light-content"
      />

      <View style={{ flex: 1 }}>
        <AllHome activeTab={activeTab} setActiveTab={setActiveTab} />
      </View>
    </View>
  );
}
