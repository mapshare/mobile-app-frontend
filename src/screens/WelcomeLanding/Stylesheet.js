// Import Libraries
import { StyleSheet } from 'react-native';
import { reponsiveStyle } from '../../util/sharedStyles';

const containerStyles = StyleSheet.create({
  mainContainer: {
    width: reponsiveStyle.wp('100%'),
    height: reponsiveStyle.hp('100%'),
    position: 'absolute',
    zIndex: 30000,
    elevation: 30000,
    justifyContent: 'center',
    alignItems: 'center',
  },

  contentContainer: {
    
    justifyContent: 'center',
    alignItems: 'center',
  },

  welcomeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15
  },

  introContainer: {
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
    fontSize: 50,
    letterSpacing: 2,
    lineHeight: 58
  },

  introText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    //alignSelf:'center'
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    justifyContent: "center"
},
});

export { containerStyles };
