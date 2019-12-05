// Import Libraries
import { StyleSheet } from 'react-native';
import { reponsiveStyle } from '../../../util/sharedStyles';

const containerStyles = StyleSheet.create({
  container: {

  },

  buttonContainer: {
    width: reponsiveStyle.wp('60%'),
  },

  buttonText: {
    backgroundColor: 'green',
    paddingVertical: 12,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 18,
    borderRadius: 50
  },

  imageContainer: {
    marginBottom: 20
  },

  imageUpload: {
    width: reponsiveStyle.wp('22%'),
    height: reponsiveStyle.hp('12%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: 'white',
    opacity: 0.2,
  },

  imageStyle: {
    width: reponsiveStyle.wp('22%'),
    height: reponsiveStyle.hp('12%'),
    marginVertical: 2
  },

  textStyle: {
    marginVertical: 2
  }
});

export { containerStyles };
