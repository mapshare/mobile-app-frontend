// Import Libraries
import React, { Component } from 'react';
import { ScrollView, View, Text, Image, Dimensions, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import moment from 'moment';
import { connect } from 'react-redux';

//Redux actions
import { addGroupMark } from '../../actions/groupMarkAction';
import { deleteLocationModalWindow, isModalWindow } from "../../actions/modalWindowAction";
import { reviewBottomWindow } from '../../actions/bottomWindowAction'

// Componenets Style
import {
  containerStyles,
  infoDescriptionStyles,
  imageCarouselStyles,
  locationDetailStyles,
  locationReviewStyles
} from './Stylesheet';
import ConfirmDelete from '../ConfirmDelete/ConfirmDelete';

// Creating Component
class LocationDetailWindow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSlide: 0,
      screenViewPosition: false,
      locationImages: [],
      locationData: {},
      reviewsData: [],
      isModalWindow: false
    };

    this.avatar = 'https://source.unsplash.com/60x60/?random';
    this.image = [
      {
        path: '../../assests/images/pin-map-icon.jpg'
      }
    ]
  }

  componentDidMount() {

  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.getGroupMarkData !== prevProps.getGroupMarkData) {
      this.setState({
        locationImages: this.props.getGroupMarkData.markImages,
      });
    }

    if (this.state.locationImages !== prevState.locationImages) {
      this.setState({
        locationData: this.props.getGroupMarkData.mark
      })
    }

    if (this.props.getLocationReviewsData !== prevProps.getLocationReviewsData) {
      console.log('reviewsData')
      this.setState({
        reviewsData: this.props.getLocationReviewsData
      })
    }
  }

  getPosition = scrollPosition => {
    if (scrollPosition > 250) {
      this.setState({
        screenViewPosition: true
      });
    } else if (scrollPosition < 50) {
      this.setState({
        screenViewPosition: false
      });
    }
  };

  renderView = data => {
    if (data) {
      return (
        <TouchableWithoutFeedback>
          <View style={containerStyles.imageContainer}>
            <View style={imageCarouselStyles.imageOptionStyle}>
              <Text style={imageCarouselStyles.textStyles}>
                {data.index + 1}/{this.state.locationImages.length}
              </Text>
              {(this.props.permisionLevel > 2 | this.props.getGroupMemberData.user == this.props.getCurrentOnClickMarkData.groupMarkCreatedBy) &&
                <TouchableOpacity 
                  disabled={this.props.isModalWindowStatus} 
                  onPress={() => {
                    console.log('click')
                    this.props.isModalWindow(true)
                    this.props.deleteLocationModalWindow({ type: 'image', status: true })
                  }}
                >
                  <View style={imageCarouselStyles.imageOptionBackground} />
                  <Icon name="options-vertical" size={25} color="#2196F3" />
                </TouchableOpacity>
              }
            </View>
            <Image style={imageCarouselStyles.imageContent} source={data.item.locationImage ? { uri: 'data:image/png;base64,' + data.item.locationImage } : require('../../assests/images/pin-map-icon.jpg')} />
          </View>
        </TouchableWithoutFeedback>
      );
    }
  }


  renderAddress = data => {
    let parseData = data.split(', ');

    return (
      <View>
        {this.props.permisionLevel > 2 &&
          <TouchableOpacity style={locationDetailStyles.optionContainer}
            disabled={this.props.isModalWindowStatus} 
            onPress={() => {
              this.props.isModalWindow(true)
              this.props.deleteLocationModalWindow({ type: 'location', status: true })
            }}
          >
            <Icon name="trash" size={20} />
          </TouchableOpacity>
        }
        <View style={locationDetailStyles.infoContainer}>
          <Icon name="location-pin" size={20} />
          <Text style={locationDetailStyles.textStyle}>{parseData[0]}</Text>
        </View>
        <View style={locationDetailStyles.infoContainer}>
          <Icon name="directions" size={20} />
          <Text style={locationDetailStyles.textStyle}>
            {parseData[1] + ', ' + parseData[2]}
          </Text>
        </View>
      </View>
    );
  };

  renderPriceRange = data => {
    let priceRange = 'N/A';
    if (data === 0) {
      priceRange = 'Free';
    } else if (data === 1) {
      priceRange = '$'
    } else if (data === 2) {
      priceRange = '$$';
    } else if (data === 3) {
      priceRange = '$$$';
    }

    return (
      <Text style={locationDetailStyles.priceRangeStyle}>
        Price Range: {priceRange}
      </Text>
    );
  };

  renderAdditionalInfo = data => {
    if ('additionalInformation' in data) {
      return (
        <View style={locationDetailStyles.infoContainer}>
          <Icon name="speech" size={20} />
          <Text style={locationDetailStyles.textStyle}>
            {data.additionalInformation}
          </Text>
        </View>
      );
    }
  };

  renderReview = reviewSet => {
    if (reviewSet) {
      let reviewViews = [];
      let profilePic = require('../../assests/images/default-profile.png');

      reviewSet.map((data, index) => {
        if (Object.keys(data.userProfilePic).length) {
          try {
            profilePic = data.userProfilePic ? {
              uri: 'data:image/png;base64,' + data.userProfilePic
            }
              : require('../../assests/images/default-profile.png');
          } catch (error) {
            profilePic = require('../../assests/images/default-profile.png');
          }
        }

        reviewViews.push(
          <View style={locationReviewStyles.mainContainer}>
            <Image style={locationReviewStyles.profilePic} source={profilePic} />
            <View style={locationReviewStyles.contentContainer}>
              <View style={locationReviewStyles.reviewHeaderContainer}>
                <Text style={locationReviewStyles.usernameText}>
                  {data.userFirstName + ' ' + data.userLastName}
                </Text>
                {(this.props.permisionLevel > 2 | this.props.getGroupMemberData.user == data.reviewCreatedBy) &&
                  <TouchableOpacity
                    disabled={this.props.isModalWindowStatus} 
                    onPress={() => {
                      this.props.isModalWindow(true)
                      this.props.reviewBottomWindow({ status: true, actionType: 'edit', content: data.reviewContent, index: index })
                    }} 
                  >
                    <Icon name="wrench" size={18} />
                  </TouchableOpacity>
                }
              </View>
              <Text style={locationReviewStyles.contentText}>{data.reviewContent}</Text>
              <Text style={locationReviewStyles.reviewDateStyle}>
                {moment(parseInt(data.reviewCreatedAt)).fromNow()}
              </Text>
            </View>
          </View>
        );
      });
  
      return reviewViews;
    }
  };

  render() {
    const { width, height } = Dimensions.get('window');

    return (
      <View>
        {this.props.confirmDeleteStatus && <ConfirmDelete/>}
        <ScrollView
          style={containerStyles.mainContainer}
          showsVerticalScrollIndicator={false}
          onScrollEndDrag={event => {
            this.getPosition(event.nativeEvent.contentOffset.y);
          }}
          scrollEventThrottle={16}
          stickyHeaderIndices={this.state.screenViewPosition && [1]}
        >
          <Carousel
            layout={'default'}
            data={this.state.locationImages.length > 0 ? this.state.locationImages : this.image}
            renderItem={data => this.renderView(data)}
            sliderWidth={width}
            sliderHeight={height}
            itemWidth={width}
            onSnapToItem={index => this.setState({ activeSlide: index })}
          />
          <View style={infoDescriptionStyles.mainContainer}>
            <View
              style={[
                infoDescriptionStyles.contentContainer,
                this.state.screenViewPosition && infoDescriptionStyles.stickyWidth
              ]}
            >
              {/* <View style={containerStyles.avatarContainer}>
                <Image
                  style={containerStyles.avatarContainer}
                  source={{ uri: this.avatar }}
                />
              </View> */}
              <View style={containerStyles.infoContainer}>
                <Text style={infoDescriptionStyles.locationNameStyles}>
                  {this.state.locationData && this.state.locationData.markName}
                </Text>
              </View>
            </View>
          </View>
          <View style={locationDetailStyles.mainContainer}>
            {this.renderAddress(
              this.props.getCurrentOnClickMarkData.markLocations.locationAddress
            )}
            <View style={locationDetailStyles.infoContainer}>
              {this.renderPriceRange(
                this.props.getCurrentOnClickMarkData.markLocations
                  .loactionPriceRange
              )}
            </View>
            {this.renderAdditionalInfo(
              this.props.getCurrentOnClickMarkData.markLocations
            )}
          </View>
          <View style={containerStyles.reviewContainer}>
            <View style={locationReviewStyles.titleContainer}>
              <Text style={locationDetailStyles.textStyle}>Location Reviews</Text>
              <TouchableOpacity
                disabled={this.props.isModalWindowStatus} 
                onPress={() => {
                  this.props.isModalWindow(true)
                  this.props.reviewBottomWindow({ status: true, actionType: 'add' })
                }}  
              >
                <Icon name="plus" size={20} />
              </TouchableOpacity>
            </View>
            {this.renderReview(this.state.reviewsData.length > 0 && this.state.reviewsData)}
          </View>
        </ScrollView>
      </View>
    );
  }
}

// Redux Getter to use: this.props.(name of any return)
const mapStateToProps = state => {
  return {
    coordinates: state.groupMarkReducer.coordinates,
    getUserData: state.logInReducer.userData,
    logInToken: state.logInReducer.token,
    getActiveGroup: state.groupReducer.getActiveGroupData,
    getCurrentOnClickMarkData: state.groupMarkReducer.getCurrentOnClickMarkData,
    getGroupMarkData: state.groupMarkReducer.getGroupMarkData,
    permisionLevel: state.groupReducer.getGroupMemberData.memberRole.groupRolePermisionLevel,
    getLocationReviewsData: state.groupMarkReducer.getLocationReviewsData,
    getGroupMemberData: state.groupReducer.getGroupMemberData,
    confirmDeleteStatus: state.modalWindowReducer.deleteLocation.status,
    isModalWindowStatus: state.modalWindowReducer.isModalWindowStatus
  };
};

// Redux Setter to use: this.props.(name of any return)
const mapDispatchToProps = dispatch => {
  return {
    addGroupMark: bool => dispatch(addGroupMark(bool)),
    deleteLocationModalWindow: data => dispatch(deleteLocationModalWindow(data)),
    reviewBottomWindow: bool => dispatch(reviewBottomWindow(bool)),
    isModalWindow: bool => dispatch(isModalWindow(bool))
  };
};

export default LocationDetailWindow = connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationDetailWindow);
