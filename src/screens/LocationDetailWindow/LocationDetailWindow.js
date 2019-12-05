// Import Libraries
import React, { Component } from 'react';
import { ScrollView, View, Text, Image, Dimensions, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import moment from 'moment';
import { connect } from 'react-redux';

//Redux actions
import { addGroupMark } from '../../actions/groupMarkAction';
import { deleteLocationModalWindow } from "../../actions/modalWindowAction";
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
      locationData: this.props.getGroupMarkData,
      reviewsData: this.props.getLocationReviewsData
    };

    this.avatar = 'https://source.unsplash.com/60x60/?random';

    this.images = [
      { uri: 'https://source.unsplash.com/1024x768/?nature' },
      { uri: 'https://source.unsplash.com/1024x768/?water' },
      { uri: 'https://source.unsplash.com/1024x768/?girl' },
      { uri: 'https://source.unsplash.com/1024x768/?tree' }
    ];

    this.reviews = [
      {
        username: 'Erika',
        date: Date.now(),
        content: 'this is a not bad location',
        pic: { uri: 'https://source.unsplash.com/60x60/?random' }
      },
      {
        username: 'Zafar',
        date: Date.now(),
        content: 'nice location',
        pic: { uri: 'https://source.unsplash.com/60x60/?random' }
      },
      {
        username: 'Corey',
        date: Date.now(),
        content: 'pretty good!',
        pic: { uri: 'https://source.unsplash.com/60x60/?random' }
      },
      {
        username: 'Kc',
        date: Date.now(),
        content: 'nice price good amount and tasty',
        pic: { uri: 'https://source.unsplash.com/60x60/?random' }
      }
    ];
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.getGroupMarkData !== prevProps.getGroupMarkData) {
      this.setState({
        locationData: this.props.getGroupMarkData
      });
    }

    // if (this.props.getLocationReviewsData !== prevProps.getLocationReviewsData) {
    //   this.setState({
    //     reviewsData: this.props.getLocationReviewsData
    //   })
    //   console.log('reviews: ', this.props.getLocationReviewsData)
    // }
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
        <TouchableWithoutFeedback onPress={() => this.setState({ ...this.state, imageOption: false })}>
          <View style={containerStyles.imageContainer}>
            <View style={imageCarouselStyles.imageOptionStyle}>
              <Text style={imageCarouselStyles.textStyles}>
                {data.index + 1}/{this.props.getGroupMarkData.markImages.length}
              </Text>
              {this.props.permisionLevel > 2 &&
                <TouchableOpacity onPress={() => this.props.deleteLocationModalWindow({ type: 'image', status: true })}>
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
          <TouchableOpacity style={locationDetailStyles.optionContainer} onPress={() => { this.props.deleteLocationModalWindow({ type: 'location', status: true }) }}>
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
      priceRange = '$';
    } else if (data === 1) {
      priceRange = '$$';
    } else if (data === 2) {
      priceRange = '$$$';
    } else if (data === 3) {
      priceRange = 'Free';
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

      reviewSet.map((data, index) => {
        reviewViews.push(
          <View style={locationReviewStyles.mainContainer}>
            <Image style={locationReviewStyles.profilePic} source={data.userProfilePic ? { uri: 'data:image/png;base64,' + data.userProfilePic } : { uri: this.avatar }} />
            <View style={locationReviewStyles.contentContainer}>
              <View style={locationReviewStyles.reviewHeaderContainer}>
                <Text style={locationReviewStyles.usernameText}>
                  {data.userFirstName + ' ' + data.userLastName}
                </Text>
                {/* {(this.props.permisionLevel > 2 | this.props.getGroupMemberData == data.reviewCreatedBy) &&
                  <TouchableOpacity onPress={() => { this.props.reviewBottomWindow({status: true, actionType: 'edit', content: data.reviewContent}) }}>
                    <Icon name="wrench" size={18} />
                  </TouchableOpacity>
                } */}
              </View>
              <Text style={locationReviewStyles.contentText}>{data.reviewContent}</Text>
              <Text style={locationReviewStyles.reviewDateStyle}>
                {moment(data.reviewCreatedAt).fromNow()}
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
        <ScrollView
          style={containerStyles.mainContainer}
          showsVerticalScrollIndicator={false}
          onScrollEndDrag={event => {
            this.getPosition(event.nativeEvent.contentOffset.y);
          }}
          scrollEventThrottle={16}
          stickyHeaderIndices={this.state.screenViewPosition && [1]}
        >
          {this.state.locationData &&
            <Carousel
              layout={'default'}
              data={this.state.locationData.markImages}
              renderItem={data => this.renderView(data)}
              sliderWidth={width}
              sliderHeight={height}
              itemWidth={width}
              onSnapToItem={index => this.setState({ activeSlide: index })}
            />
          }
          <View style={infoDescriptionStyles.mainContainer}>
            <View
              style={[
                infoDescriptionStyles.contentContainer,
                this.state.screenViewPosition && infoDescriptionStyles.stickyWidth
              ]}
            >
              <View style={containerStyles.avatarContainer}>
                <Image
                  style={containerStyles.avatarContainer}
                  source={{ uri: this.avatar }}
                />
              </View>
              <View style={containerStyles.infoContainer}>
                <Text style={infoDescriptionStyles.locationNameStyles}>
                  {this.state.locationData && this.state.locationData.mark.markName}
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
              <TouchableOpacity onPress={() => { this.props.reviewBottomWindow({status: true, actionType: 'add'}) }}>
                <Icon name="plus" size={20} />
              </TouchableOpacity>
            </View>
            {this.renderReview(this.state.reviewsData && this.state.reviewsData)}
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
  };
};

// Redux Setter to use: this.props.(name of any return)
const mapDispatchToProps = dispatch => {
  return {
    addGroupMark: bool => dispatch(addGroupMark(bool)),
    deleteLocationModalWindow: data => dispatch(deleteLocationModalWindow(data)),
    reviewBottomWindow: bool => dispatch(reviewBottomWindow(bool))
  };
};

export default LocationDetailWindow = connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationDetailWindow);
