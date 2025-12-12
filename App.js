import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { ColorProvider } from './src/util/ColorSwitcher';

export default function App() {
  return (
    <ColorProvider>
      <AppNavigator />
    </ColorProvider>
  );
}
