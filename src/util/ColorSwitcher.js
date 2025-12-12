// src/util/ColorSwitcher.js
import React, { createContext, useContext, useState } from 'react';

const ColorContext = createContext();

export const ColorProvider = ({ children }) => {
  const [bgColor, setBgColor] = useState('#0D2B66'); // default (ALL)
  const [textColor, setTextColor] = useState('#fff');

  const categoryColors = {
    ALL: '#15305F',
    GROCERY: '#259E29',
    ELECTRONICS: '#15305F',
    HEALTH: '#675FD3',
  };

  // const categoryColors = {
  //   ALL: '#15305F',
  //   GROCERY: '#15305F',
  //   ELECTRONICS: '#15305F',
  //   HEALTH: '#15305F',
  // };
  const switchColor = category => {
    setBgColor(categoryColors[category]);
  };

  return (
    <ColorContext.Provider value={{ bgColor, textColor, switchColor }}>
      {children}
    </ColorContext.Provider>
  );
};

export const useColor = () => useContext(ColorContext);
