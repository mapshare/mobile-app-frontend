// Import Libraries
import { StyleSheet } from 'react-native';
import { reponsiveStyle } from '../../../util/sharedStyles';

const containerStyles = StyleSheet.create({
  container: {
    padding: 20
  },

  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  submitButtonContainer: {
    marginVertical: 15,
    width: reponsiveStyle.wp('40%'),
    height: reponsiveStyle.hp('10%')
  },

  cancelButtonContainer: {
    marginVertical: 15,
    width: reponsiveStyle.wp('40%'),
    height: reponsiveStyle.hp('10%')
  },

  buttonText: {
    backgroundColor: '#2980b6',
    paddingVertical: 12,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700'
  },

  priceRangeContainer: {
    borderWidth: 1,
    borderColor: 'gray'
  },

  priceRangeList: {
    width: reponsiveStyle.wp('85%'),
    height: reponsiveStyle.hp('5%')
  },

  imageUpload: {
    width: reponsiveStyle.wp('22%'),
    height: reponsiveStyle.hp('12%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'gray',
    opacity: 0.2,
    marginVertical: 2
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
