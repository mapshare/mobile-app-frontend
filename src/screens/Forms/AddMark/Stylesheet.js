// Import Libraries
import { StyleSheet } from 'react-native';
import { reponsiveStyle } from '../../../util/sharedStyles';

const containerStyles = StyleSheet.create({
  container: {
    padding: 20
  },

  buttonContainer: {
    marginVertical: 15
  },

  buttonText: {
    backgroundColor: '#2980b6',
    paddingVertical: 12,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700'
  },

  pickerContainer: {
    borderWidth: 1,
    borderColor: 'gray'
  },

  inputAndroid: {
    fontSize: 16,
    color: 'black'
  },

  inputIOS: {
    fontSize: 16,
    color: 'black'
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
