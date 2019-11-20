import React, { Component } from 'react';
import { View } from 'react-native';
import Mapbox from '@react-native-mapbox-gl/maps';
import { connect } from 'react-redux';
import * as Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import MSearch from './Search';
import { MAPBOX } from 'react-native-dotenv';

//Redux actions
import { addMarkModalWindow } from '../../actions/modalWindowAction';
import { setCoordinates } from '../../actions/groupMarkAction';
import { getGroupById } from '../../actions/groupActions';

// Componenets Style
import { containerStyles, mapStyles, annotationStyles } from './Stylesheet';

// Screens
import ModalWindow from '../ModalWindow/ModalWindow';
import AddMark from '../AddMark/AddMark';
import Marks from '../Marks/Marks';

console.log(MAPBOX);

Mapbox.setAccessToken(MAPBOX);

class Map extends Component {
  constructor(props) {
    super(props);

    this.data = null;
    this.location = {
      latitude: 0.0,
      longitude: 0.0
    };
  }

  getCoordsFromName(loc) {
    console.log(loc.lng, loc.lat);

    this.location.longitude = loc.lng;
    this.location.latitude = loc.lat;
    this.setState(this.location);

    // this.renderAnnotations()
    this._mapcoord.setCamera({
      centerCoordinate: [this.location.longitude, this.location.latitude],
      zoomLevel: 8
    });
  }

  findCoordinates = () => {
    Geolocation.getCurrentPosition(
      position => {
        this.location.longitude = position.coords.longitude;
        this.location.latitude = position.coords.latitude;
        this.setState(this.location);
      },
      error =>
        alert(
          'Please make sure Location/GPS is Enabled',
          JSON.stringify(error)
        ),
      { enableHighAccuracy: false, timeout: 2000 }
    );
  };

  zoomCoordinates = () => {
    this.findCoordinates();
    this._mapcoord.setCamera({
      centerCoordinate: [this.location.longitude, this.location.latitude],
      zoomLevel: 8
    });
    this.renderAnnotations();
  };

  mapOnClick = data => {
    if (this.props.addGroupMarkOnClickStatus) {
      this.props.addMarkModalWindow(true);
      this.props.setCoordinates(data.geometry.coordinates);
    }
  };

  renderAnnotations() {
    console.log('Test');
    return (
      <Mapbox.PointAnnotation
        key="pointAnnotation"
        id="pointAnnotation"
        coordinate={[this.location.longitude, this.location.latitude]}
      >
        <View style={annotationStyles.container}>
          <View style={annotationStyles.fill} />
        </View>
        <Mapbox.Callout title="We did it!!" />
      </Mapbox.PointAnnotation>
    );
  }

  render() {
    return (
      <View style={containerStyles.container}>
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
          </View>
          <MSearch notifyChange={loc => this.getCoordsFromName(loc)} />
          <Mapbox.MapView
            styleURL={'mapbox://styles/zwahab114/ck33vykpv454o1cpl7irwc7d7'}
            onPress={data => this.mapOnClick(data)}
            attributionEnabled={false}
            showUserLocation={true}
            logoEnabled={false}
            compassEnabled={true}
            style={mapStyles.container}
            onDidFinishLoadingMap={this.findCoordinates}
          >
            <Marks />
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
            size={25}
            onPress={this.zoomCoordinates}
          ></Icon>
        </View>
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
    logInToken: state.logInReducer.token
  };
};

// Redux Setter to use: this.props.(name of any return)
const mapDispatchToProps = dispatch => {
  return {
    addMarkModalWindow: bool => dispatch(addMarkModalWindow(bool)),
    setCoordinates: data => dispatch(setCoordinates(data)),
    getGroupById: data => dispatch(getGroupById(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
