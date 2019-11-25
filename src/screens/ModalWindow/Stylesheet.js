// Import Libraries
import { StyleSheet } from 'react-native';
import { reponsiveStyle, closeButtonStyle } from '../../util/sharedStyles';

// Componenets Style
const containerStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: reponsiveStyle.wp('100%'),
    height: reponsiveStyle.hp('100%'),
    position: 'absolute',
    padding: 10,
    backgroundColor: 'white',
    zIndex: 10
  },

  closeButtonContainer: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    width: reponsiveStyle.wp('8%')
  },

  contentContainer: {
    width: reponsiveStyle.wp('95%'),
    height: reponsiveStyle.hp('92%')
  }
});

export { containerStyles };
