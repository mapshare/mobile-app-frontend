// Import Libraries
import { StyleSheet } from 'react-native';
import { reponsiveStyle } from '../../../util/sharedStyles';

const mainStyles = StyleSheet.create({
  textInputStyle: {
    borderColor: 'gray',
    borderWidth: 1,
    height: 40,
    padding: 10,
    fontSize: 16
  },

  textareaInputStyle: {
    borderColor: 'gray',
    borderWidth: 1,
    height: 100,
    padding: 10,
    fontSize: 16
  },

  addCustomMarkStyle: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 50,
    height: 50,
    padding: 15,
    backgroundColor: 'white',
    fontSize: 16
  },

  errorText: {
    color: 'red',
    fontSize: 16
  }
});

export { mainStyles };
