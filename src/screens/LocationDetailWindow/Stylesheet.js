// Import Libraries
import { StyleSheet } from 'react-native';
import { reponsiveStyle } from '../../util/sharedStyles';

const containerStyles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    margin: 10
  },

  contentContainer: {
    width: reponsiveStyle.wp('10%'),
    height: reponsiveStyle.hp('5%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2196F3'
  },

  imageContainer: {
    width: reponsiveStyle.wp('90%'),
    height: reponsiveStyle.hp('45%'),
    borderRadius: 15
  },

  paginationContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: reponsiveStyle.wp('100%'),
    backgroundColor: 'black'
  },

  avatarContainer: {
    width: reponsiveStyle.wp('15%'),
    height: reponsiveStyle.hp('8%'),
    borderRadius: 50
  },

  infoContainer: {
    width: reponsiveStyle.wp('75%'),
    height: reponsiveStyle.hp('8%'),
    marginHorizontal: 15
  },

  reviewContainer: {
    width: reponsiveStyle.wp('90%'),
    flex: 1,
    marginBottom: 50,
    borderColor: '#2196F3',
    borderTopWidth: 2
  }
});

const imageCarouselStyles = StyleSheet.create({
  imageOptionStyle: {
    width: reponsiveStyle.hp('50%'),
    justifyContent: 'space-between',
    flexDirection: 'row',
    position: 'absolute',
    zIndex: 1,
    padding: 10
  },

  imageOptionBackground: {
    opacity: .3,
    height: reponsiveStyle.hp('4%'),
    width: reponsiveStyle.wp('4%'),
    backgroundColor: 'black',
    alignSelf: 'center',
    position: 'absolute',
  },

  imageContent: {
    width: reponsiveStyle.wp('90%'),
    height: reponsiveStyle.hp('40%'),
    borderRadius: 15
  },

  textStyles: {
    fontSize: 20,
    color: 'black'
  }
});

const infoDescriptionStyles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: reponsiveStyle.wp('90%'),
    height: reponsiveStyle.hp('45%'),
    position: 'absolute'
  },

  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: reponsiveStyle.wp('75%'),
    height: reponsiveStyle.hp('10%'),
    borderRadius: 15,
    backgroundColor: '#2196F3',
    paddingVertical: 5,
    paddingHorizontal: 10
  },

  stickyWidth: {
    width: reponsiveStyle.wp('90%'),
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0
  },

  locationNameStyles: {
    fontSize: 25,
    fontWeight: 'bold'
  }
});

const locationDetailStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: reponsiveStyle.wp('90%'),
    marginBottom: 15
  },

  optionContainer: {
    position: 'absolute',
    alignSelf: 'flex-end',
    margin: 10,
    marginBottom: 0
  },

  infoContainer: {
    width: reponsiveStyle.wp('90%'),
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    marginBottom: 0
  },

  textStyle: {
    marginLeft: 10,
    fontSize: 20
  },

  priceRangeStyle: {
    fontSize: 20,
    paddingLeft: 2
  }
});

const locationReviewStyles = StyleSheet.create({
  titleContainer: {
    display: 'flex',
    width: reponsiveStyle.wp('90%'),
    height: reponsiveStyle.hp('5%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    width: reponsiveStyle.wp('90%'),
    padding: 10
  },

  profilePic: {
    width: reponsiveStyle.wp('10%'),
    height: reponsiveStyle.hp('5%'),
    borderRadius: 50
  },

  contentContainer: {
    marginLeft: 10,
    flex: 1
  },

  usernameText: {
    fontSize: 18,
    fontWeight: 'bold'
  },

  contentText: {
    fontSize: 16
  },

  reviewHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  reviewDateStyle: {
    alignSelf: 'flex-end',
    marginTop: 5,
    fontSize: 14
  }
});

export {
  containerStyles,
  imageCarouselStyles,
  infoDescriptionStyles,
  locationDetailStyles,
  locationReviewStyles
};
