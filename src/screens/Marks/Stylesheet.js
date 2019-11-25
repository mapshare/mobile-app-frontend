// Import Libraries
import { StyleSheet } from 'react-native';
import { reponsiveStyle } from '../../util/sharedStyles';

// Componenets Style
const containerStyles = StyleSheet.create({
  container: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 15
  },

  fill: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'blue',
    transform: [{ scale: 0.6 }]
  }
});

export { containerStyles };
