// Import Libraries
import { StyleSheet } from 'react-native';
import { reponsiveStyle, closeButtonStyle } from '../../util/sharedStyles';

// Componenets Style
const containerStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: reponsiveStyle.wp('100%'),
    height: reponsiveStyle.hp('90%'),
    position: 'absolute',
    padding: 10,
    backgroundColor: 'white',
    zIndex: 20000,
    elevation:20000,
  },

  closeButtonContainer: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    width: reponsiveStyle.wp('8%')
  },

  AddEventButtonContainer: {
    alignSelf: 'flex-start',
    marginTop: -30,
  },

  contentContainer: {
    width: reponsiveStyle.wp('95%')
  },

  deleteTypeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: reponsiveStyle.wp('100%'),
    height: reponsiveStyle.hp('100%'),
    position: 'absolute',
    padding: 10,
    backgroundColor: 'black',
    zIndex: 10,
    opacity: .5
  },
  Text: {
    fontSize:20
  }
});

const eventModalWindow = StyleSheet.create({
  modalWindow: {
    
    justifyContent:'center',
    marginTop: 20
  },
  modalText: {
    alignSelf: 'center',
    fontSize: 30,
    marginBottom:20
  },
  inputBox: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  errorMessage: {
    color: "red",
    marginLeft: 20
  },
  inputBox: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  center: {
    alignSelf: 'center',
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#00BFFF",
  },
  cancelButton: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#ff0000",
  },
})

export { containerStyles, eventModalWindow };
