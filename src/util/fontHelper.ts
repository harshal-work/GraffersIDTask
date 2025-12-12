import { Platform } from 'react-native';

// Map font weight to actual font family names on Android
const fontMap: Record<string, string> = {
  Thin: 'Figtree-Thin',
  ExtraLight: 'Figtree-ExtraLight',
  Light: 'Figtree-Light',
  Regular: 'Figtree-Regular',
  Medium: 'Figtree-Medium',
  SemiBold: 'Figtree-SemiBold',
  Bold: 'Figtree-Bold',
  ExtraBold: 'Figtree-ExtraBold',
  Black: 'Figtree-Black',
};

// On iOS, fontWeight works with base font family
export function getFontFamily(weight: keyof typeof fontMap = 'Regular') {
  if (Platform.OS === 'android') {
    return fontMap[weight] || fontMap.Regular;
  }
  // For iOS, use base family and fontWeight style instead
  return 'Figtree';
}

export function getFontWeight(weight: keyof typeof fontMap = 'Regular') {
  if (Platform.OS === 'android') {
    return undefined; // Android ignores fontWeight with custom fonts
  }
  // Map weight names to numeric fontWeight strings for iOS
  const weightMap: Record<string, string> = {
    Thin: '100',
    ExtraLight: '200',
    Light: '300',
    Regular: '400',
    Medium: '500',
    SemiBold: '600',
    Bold: '700',
    ExtraBold: '800',
    Black: '900',
  };
  return weightMap[weight] || '400';
}
