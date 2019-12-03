import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import Mapbox from '@react-native-mapbox-gl/maps';
import { connect } from 'react-redux';
import * as Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import MSearch from './Search';
import { MAPBOX } from 'react-native-dotenv';

//Redux actions
import { addMarkModalWindow } from '../../actions/modalWindowAction';
import {
  getGroupAllMarks,
  geocodingLocation
} from '../../actions/groupMarkAction';
import { getGroupById } from '../../actions/groupActions';

// Componenets Style
import { containerStyles, mapStyles, annotationStyles } from './Stylesheet';

// Screens
import ModalWindow from '../ModalWindow/ModalWindow';
import AddMark from '../AddMark/AddMark';
import Categories from '../Categories/Categories';
import Marks from '../Marks/Marks';
import CategoryOptions from '../CategoryOptions/CategoryOptions';

console.log(MAPBOX);

Mapbox.setAccessToken(MAPBOX);

class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newMarkAdded: false
    };

    this.data = null;
    this.location = {
      address: '',
      latitude: 0.0,
      longitude: 0.0,
      zoomLocation: false,
      findLocation: false
    };
  }

  componentDidMount() {
    this.findCoordinates();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.newMarkAddedFlag !== prevProps.newMarkAddedFlag) {
      const data = {
        groupMarkId: this.props.getActiveGroup.groupMarks,
        token: this.props.token
      };
      this.props.getGroupAllMarks(data);

      this.setState({
        newMarkAdded: !this.state.newMarkAdded
      });
    }
  }

  getCoordsFromName(loc) {
    console.log(loc.lng, loc.lat);

    this.location.longitude = loc.geometry.location.lng;
    this.location.latitude = loc.geometry.location.lat;
    this.location.address = loc.formatted_address;
    this.location.findLocation = true;
    this.setState(this.location);

    this._mapcoord.setCamera({
      centerCoordinate: [this.location.longitude, this.location.latitude],
      zoomLevel: 12
    });
  }

  findCoordinates = () => {
    Geolocation.getCurrentPosition(
      position => {
        this.location.longitude = position.coords.longitude;
        this.location.latitude = position.coords.latitude;
        this.location.zoomLocation = true;
        this.setState(this.location);
      },
      error =>
        Alert.alert(
          'Please make sure Location/GPS is Enabled',
          JSON.stringify(error.message)
        ),
      { enableHighAccuracy: false, timeout: 2000 }
    );
  };

  zoomCoordinates = () => {
    this.findCoordinates();
    this._mapcoord.setCamera({
      centerCoordinate: [this.location.longitude, this.location.latitude],
      zoomLevel: 10
    });
  };

  mapOnClick = data => {
    if (this.props.addGroupMarkOnClickStatus) {
      this.props.addMarkModalWindow(true);
      this.props.geocodingLocation(data.geometry.coordinates);
    }
  };

  renderLocationAnnotation() {

    //Zoom to User location

    if (this.location.zoomLocation == true) {
      console.log("zoom");
      this.location.zoomLocation = false;
      return (
        <Mapbox.PointAnnotation
          key="pointAnnotation"
          id="pointAnnotation"
          coordinate={[this.location.longitude, this.location.latitude]}
          title="You are Here!!"
        >
          <View style={annotationStyles.container}>
            <View style={annotationStyles.fill} />
          </View>
          <Mapbox.Callout title="You are Here!!" />
        </Mapbox.PointAnnotation>
      );
    }

  }

  renderSearchAnnotation() {

    //Zoom to searched location

    if (this.location.findLocation == true) {
      this.location.findLocation = false;
      console.log("search")
      return (
        <Mapbox.PointAnnotation
          title={this.location.address}
          key="pointAnnotation1"
          id="pointAnnotation1"
          coordinate={[this.location.longitude, this.location.latitude]}
        >
          <View style={annotationStyles.container}>
            <View style={annotationStyles.fill} />
          </View>
          <Mapbox.Callout title={this.location.address} />
        </Mapbox.PointAnnotation>
      );
    }

  }

  render() {
    return (
      <View style={containerStyles.mainContainer}>
        {this.props.addMarkStatus && <ModalWindow modalContent="addMark" />}
        {this.props.onClickMarkStatus && (
          <ModalWindow modalContent="onClickMark" />
        )}
        <View
          style={[
            containerStyles.container,
            this.props.addGroupMarkOnClickStatus
              ? containerStyles.addMarkTrue
              : null
          ]}
        >
          <View style={containerStyles.optionsContainer}>
            <AddMark />
            <Categories />
          </View>
          <MSearch notifyChange={loc => this.getCoordsFromName(loc)} />
          <Mapbox.MapView
            styleURL={'mapbox://styles/zwahab114/ck33vykpv454o1cpl7irwc7d7'}
            onPress={data => this.mapOnClick(data)}
            attributionEnabled={false}
            showUserLocation={true}
            logoEnabled={false}
            compassEnabled={true}
            loadingEnabled={true}
            style={mapStyles.container}
          >
            {this.renderLocationAnnotation()}
            {this.renderSearchAnnotation()}
            <Marks newMarkAdded={this.state.newMarkAdded} />
            <Mapbox.Camera
              ref={Component => (this._mapcoord = Component)}
              centerCoordinate={[
                this.location.longitude,
                this.location.latitude
              ]}
              zoomLevel={8}
            ></Mapbox.Camera>
          </Mapbox.MapView>
          <Icon
            style={mapStyles.locationButton}
            name="location-pin"
            size={30}
            onPress={this.zoomCoordinates}
          ></Icon>
        </View>
        {this.props.categoriesOptionOnClickStatus && (
          <View style={containerStyles.categoryContainer}>
            <CategoryOptions />
          </View>
        )}
      </View>
    );
  }
}

// Redux Getter to use: this.props.(name of any return)
const mapStateToProps = state => {
  return {
    addGroupMarkOnClickStatus: state.groupMarkReducer.addGroupMarkOnClickStatus,
    addGroupMarkStatus: state.groupMarkReducer.addGroupMarkStatus,
    addMarkStatus: state.modalWindowReducer.addMarkStatus,
    onClickMarkStatus: state.modalWindowReducer.onClickMarkStatus,
    categoriesOptionOnClickStatus:
      state.groupDefaultMarkCategoryReducer.categoriesOptionOnClickStatus,
    token: state.logInReducer.token,
    getActiveGroup: state.groupReducer.getActiveGroupData,
    newMarkAddedFlag: state.groupMarkReducer.newMarkAddedFlag
  };
};

// Redux Setter to use: this.props.(name of any return)
const mapDispatchToProps = dispatch => {
  return {
    addMarkModalWindow: bool => dispatch(addMarkModalWindow(bool)),
    getGroupById: data => dispatch(getGroupById(data)),
    getGroupAllMarks: data => dispatch(getGroupAllMarks(data)),
    geocodingLocation: data => dispatch(geocodingLocation(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
