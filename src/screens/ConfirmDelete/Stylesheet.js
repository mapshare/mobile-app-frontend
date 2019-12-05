// Import Libraries
import { StyleSheet } from 'react-native';
import { reponsiveStyle } from '../../util/sharedStyles';

const containerStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: reponsiveStyle.wp('100%'),
    height: reponsiveStyle.hp('100%'),
    position: 'absolute',
    padding: 10,
    zIndex: 25000,
    elevation: 25000
  },

  contentLocation: {
    width: reponsiveStyle.wp('80%'),
    height: reponsiveStyle.hp('40%'),
    backgroundColor: 'black',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 50
  },

  contentImage: {
    width: reponsiveStyle.wp('80%'),
    height: reponsiveStyle.hp('60%'),
    backgroundColor: 'black',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 50
  },

  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  textStyle: {
    fontSize: 16,
    color: 'white'
  },

  buttonContainer: {
    width: reponsiveStyle.wp('60%'),
    height: reponsiveStyle.hp('10%'),
  },

  deleteButtonText: {
    backgroundColor: 'red',
    paddingVertical: 12,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 18,
    borderRadius: 50
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
});

export { containerStyles };
