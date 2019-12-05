// Import Libraries
import { StyleSheet } from 'react-native';
import { reponsiveStyle } from '../../util/sharedStyles';

const containerStyles = StyleSheet.create({
  mainContainer: {
    zIndex: 1
  },

  contentContainer: {
    width: reponsiveStyle.wp('10%'),
    height: reponsiveStyle.hp('5%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2196F3'
  }
});

export { containerStyles };
