// Import Libraries
import { StyleSheet } from 'react-native';
import { reponsiveStyle } from '../../util/sharedStyles';

const containerStyles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'black',
    height: reponsiveStyle.hp('100%'),
    opacity: 0.8
  },

  closeButtonContainer: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
    width: reponsiveStyle.wp('8%'),
    opacity: 1
  },

  contentContainer: {
    width: reponsiveStyle.wp('95%')
  }
});

export { containerStyles };
