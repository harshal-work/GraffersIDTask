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
