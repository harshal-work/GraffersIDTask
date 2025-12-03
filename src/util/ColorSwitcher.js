<<<<<<< HEAD
=======
// src/util/ColorSwitcher.js
>>>>>>> cfaff0c6ffec6ab197e4517481802ceb038990cd
import React, { createContext, useContext, useState } from 'react';

const ColorContext = createContext();

export const ColorProvider = ({ children }) => {
<<<<<<< HEAD
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
=======
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
>>>>>>> cfaff0c6ffec6ab197e4517481802ceb038990cd
  };

  return (
    <ColorContext.Provider value={{ bgColor, textColor, switchColor }}>
      {children}
    </ColorContext.Provider>
  );
};

export const useColor = () => useContext(ColorContext);
