// Import Libraries
import { StyleSheet } from 'react-native';
import { reponsiveStyle, closeButtonStyle } from '../../util/sharedStyles';

// Componenets Style
const containerStyles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: 11,
  },

  contentContainer: {
    width: reponsiveStyle.wp('100%'),
    height: reponsiveStyle.hp('25%'),
    backgroundColor: 'white',
    borderColor: '#2980b6',
    borderWidth: 2
  }
});

export { containerStyles };
