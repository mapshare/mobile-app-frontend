// Import Libraries
import { StyleSheet } from 'react-native';
import { reponsiveStyle } from '../../util/sharedStyles';

const containerStyles = StyleSheet.create({
  mainContainer: {
    zIndex: 1
  },

  contentContainer: {
    width: reponsiveStyle.wp('10%'),
    height: reponsiveStyle.hp('5%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2196F3'
  },

  buttonContainer: {
    margin: 10,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    borderRadius: 50
  },

  buttonTextStyle: {
    marginHorizontal: 5,
    fontSize: 20
  },

  categoryContainer: {
    margin: 5,
    padding: 2,
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row'
  },

  categoryText: {
    marginHorizontal: 5,
    fontSize: 16
  },

  sortButtonContainer: {
    flexDirection: 'row',
    margin: 10,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    borderRadius: 50
  }
});

const customCategoryStyles = StyleSheet.create({
  customCategoryContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row'
  },

  seperatorLine: {
    borderTopWidth: 2,
    borderTopColor: 'gray',
    marginHorizontal: 10,
    marginVertical: 5
  },

  titleText: {
    marginHorizontal: 10,
    fontSize: 14
  },

  settingIcon: {
    paddingLeft: 10,
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    justifyContent: 'center'
  }
});

export { containerStyles, customCategoryStyles };
