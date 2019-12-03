// Import Libraries
import { StyleSheet } from 'react-native';
import { reponsiveStyle } from '../../util/sharedStyles';

// Componenets Style
const containerStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row'
  },

  container: {
    flex: 1
  },

  addMarkTrue: {
    borderWidth: 3,
    borderColor: 'red',
    opacity: 0.7,
    zIndex: 2
  },

  modalWindow: {
    display: 'none'
  },

  optionsContainer: {
    flex: 1,
    position: 'absolute',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    width: reponsiveStyle.wp('10%'),
    height: reponsiveStyle.hp('93%')
  },

  categoryContainer: {
    width: reponsiveStyle.wp('35%'),
    backgroundColor: 'white'
  }
});

const mapStyles = StyleSheet.create({
  container: {
    flex: 1
  },

  locationButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  searchBar: {
    marginLeft: 5,
    marginRight: 60,
    flexDirection: 'row',
    flexGrow: 1,
    flexShrink: 0,
    elevation: 9999,
    position: 'absolute',
    zIndex: 9999,
    borderTopWidth: 0,
    borderBottomWidth: 0
    //borderRadius: 100,
  }
});

const annotationStyles = StyleSheet.create({
  container: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 15
  },

  fill: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'blue',
    transform: [{ scale: 0.6 }]
  }
});

const buttonStyles = StyleSheet.create({});

export { containerStyles, mapStyles, annotationStyles };
