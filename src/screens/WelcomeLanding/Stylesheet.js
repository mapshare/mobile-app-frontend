// Import Libraries
import { StyleSheet } from 'react-native';
import { reponsiveStyle } from '../../util/sharedStyles';

const containerStyles = StyleSheet.create({
  mainContainer: {
    width: reponsiveStyle.wp('100%'),
    height: reponsiveStyle.hp('100%'),
    backgroundColor: '#2196F3',
    position: 'absolute',
    zIndex: 30000,
    elevation: 30000,
    justifyContent: 'center',
    alignItems: 'center',
  },

  contentContainer: {
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
  },

  welcomeContainer: {
    width: reponsiveStyle.wp('90%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15
  },

  introContainer: {
    width: reponsiveStyle.wp('90%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50
  },


  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 30,
    borderWidth: 2,
    borderColor: 'gray',
    backgroundColor: 'yellow',
    paddingHorizontal: 120,
    paddingVertical: 15,
    borderRadius: 14,
  },

  welcomeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 55,
    letterSpacing: 2,
    lineHeight: 58
  },

  introText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15
  }
});

export { containerStyles };
