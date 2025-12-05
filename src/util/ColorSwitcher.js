<<<<<<< HEAD
// src/util/ColorSwitcher.js
=======
>>>>>>> 865f4032a1f9d3ec46ab79bfb377e3beba6833e2
import React, { createContext, useContext, useState } from 'react';

const ColorContext = createContext();

export const ColorProvider = ({ children }) => {
<<<<<<< HEAD
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
  const switchColor = (category) => {
    setBgColor(categoryColors[category]);
=======
  const [bgColor, setBgColor] = useState('#15305F');
  const [textColor, setTextColor] = useState('#FFFFFF');

  const switchColor = (color) => {
    setBgColor(color);
    // Set text color based on bg color for contrast
    if (color === '#259E29') {
      setTextColor('#FFFFFF');
    } else if (color === '#675FD3') {
      setTextColor('#FFFFFF');
    } else {
      setTextColor('#FFFFFF');
    }
>>>>>>> 865f4032a1f9d3ec46ab79bfb377e3beba6833e2
  };

  return (
    <ColorContext.Provider value={{ bgColor, textColor, switchColor }}>
      {children}
    </ColorContext.Provider>
  );
};

export const useColor = () => useContext(ColorContext);
