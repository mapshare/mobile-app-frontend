// Import Libraries
import { StyleSheet } from 'react-native';
import { reponsiveStyle } from '../../../util/sharedStyles';

const containerStyles = StyleSheet.create({
  container: {
    padding: 20
  },

  buttonContainer: {
    width: reponsiveStyle.wp('60%'),
    height: reponsiveStyle.hp('10%'),
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

  imageUpload: {
    width: reponsiveStyle.wp('22%'),
    height: reponsiveStyle.hp('12%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: 'white',
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
