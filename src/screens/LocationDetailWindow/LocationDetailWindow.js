// Import Libraries
import React, { Component } from 'react';
import { ScrollView, View, Text, Image, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import moment from 'moment';
import { connect } from 'react-redux';

//Redux actions
import { addGroupMark } from '../../actions/groupMarkAction';

// Componenets Style
import {
  containerStyles,
  infoDescriptionStyles,
  imageCarouselStyles,
  locationDetailStyles,
  locationReviewStyles
} from './Stylesheet';

// Creating Component
class LocationDetailWindow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSlide: 0,
      screenViewPosition: false
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

  componentDidMount() {}

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

  renderView(data) {
    return (
      <View style={containerStyles.imageContainer}>
        <View style={imageCarouselStyles.imageOptionStyle}>
          <Text style={imageCarouselStyles.textStyles}>
            {data.index + 1}/{this.images.length}
          </Text>
          <Icon name="options-vertical" size={25} color="#2196F3" />
        </View>
        <Image style={imageCarouselStyles.imageContent} source={data.item} />
      </View>
    );
  }

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

  renderReview = () => {
    let reviewViews = [];

    this.reviews.map((data, index) => {
      reviewViews.push(
        <View style={locationReviewStyles.mainContainer}>
          <Image style={locationReviewStyles.profilePic} source={data.pic} />
          <View style={locationReviewStyles.contentContainer}>
            <View style={locationReviewStyles.reviewHeaderContainer}>
              <Text style={locationReviewStyles.usernameText}>
                {data.username}
              </Text>
              <Icon name="wrench" size={18} />
            </View>
            <Text style={locationReviewStyles.contentText}>{data.content}</Text>
            <Text style={locationReviewStyles.reviewDateStyle}>
              {moment(parseInt(data.date)).fromNow()}
            </Text>
          </View>
        </View>
      );
    });

    return reviewViews;
  };

  render() {
    const { width, height } = Dimensions.get('window');

    return (
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
          data={this.images}
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
            <View style={containerStyles.avatarContainer}>
              <Image
                style={containerStyles.avatarContainer}
                source={{ uri: this.avatar }}
              />
            </View>
            <View style={containerStyles.infoContainer}>
              <Text style={infoDescriptionStyles.locationNameStyles}>
                {this.props.getCurrentOnClickMarkData.markName}
              </Text>
              <Text style={infoDescriptionStyles.textStyles}>
                {this.props.getCurrentOnClickMarkData.groupMarkCreatedBy}
              </Text>
            </View>
          </View>
        </View>
        <View style={locationDetailStyles.mainContainer}>
          <View style={locationDetailStyles.infoContainer}>
            <Icon name="location-pin" size={20} />
            <Text style={locationDetailStyles.textStyle}>
              {
                this.props.getCurrentOnClickMarkData.markLocations
                  .locationAddress
              }
            </Text>
          </View>
          <View style={locationDetailStyles.infoContainer}>
            <Text style={locationDetailStyles.priceRangeStyle}>
              Price range: $
            </Text>
          </View>
          {this.renderAdditionalInfo(
            this.props.getCurrentOnClickMarkData.markLocations
          )}
        </View>
        <View style={containerStyles.reviewContainer}>
          <View style={locationReviewStyles.titleContainer}>
            <Icon name="note" size={20} />
            <Text style={locationDetailStyles.textStyle}>Location Reviews</Text>
          </View>
          {this.renderReview()}
        </View>
      </ScrollView>
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
    getCurrentOnClickMarkData: state.groupMarkReducer.getCurrentOnClickMarkData
  };
};

// Redux Setter to use: this.props.(name of any return)
const mapDispatchToProps = dispatch => {
  return {
    addGroupMark: bool => dispatch(addGroupMark(bool))
  };
};

export default LocationDetailWindow = connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationDetailWindow);
