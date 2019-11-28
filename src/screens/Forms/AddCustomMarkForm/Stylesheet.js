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
    fontWeight: '700',
    fontSize: 18,
    borderRadius: 50
  },

  textStyle: {
    marginVertical: 2
  },

  colorPickerContainer: {
    width: reponsiveStyle.wp('90%'),
    height: reponsiveStyle.hp('30%'),
    padding: 15,
    justifyContent: 'center'
  },

  colorPickerText: {
    fontSize: 16,
    color: 'white',
    marginTop: 10
  },

  colorPickerError: {
    fontSize: 16,
    color: 'red',
    marginVertical: 10
  },

  colorPickerSuccess: {
    fontSize: 16,
    color: 'green',
    marginVertical: 10
  }
});

export { containerStyles };
