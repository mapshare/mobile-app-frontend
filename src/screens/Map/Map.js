import React, { Component } from "react";
import { View, Button } from "react-native";
import Mapbox from "@react-native-mapbox-gl/maps";
import { connect } from "react-redux";
import Geolocation from "@react-native-community/geolocation";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import MSearch from './Search'
import { MAPBOX } from 'react-native-dotenv';

//Redux actions
import { addGroupMarkOnClick } from "../../actions/groupMarkAction";
import { displayModalWindow } from "../../actions/modalWindowAction";

// Componenets Style
import { containerStyles, mapStyles, annotationStyles } from "./Stylesheet";

// Screens
import ModalWindow from "../ModalWindow/ModalWindow";
import LogInForm from "../Forms/Login/LoginForm";

console.log(MAPBOX)

Mapbox.setAccessToken(
  MAPBOX
);

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
    console.log(loc.lng, loc.lat)

    this.location.longitude = loc.lng;
    this.location.latitude = loc.lat;
    this.setState(this.location);

    this.renderAnnotations()
    this._mapcoord.setCamera({
      centerCoordinate: [this.location.longitude, this.location.latitude],
      zoomLevel: 8
    });
  }

  findCoordinates = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(position);

        this.location.longitude = position.coords.longitude;
        this.location.latitude = position.coords.latitude;
        this.setState(this.location);

        console.log(this.location.latitude);
        console.log(this.location.longitude);
      },
      error => alert(error),
      { enableHighAccuracy: true, timeout: 2000 }
    );
  };

  zoomCoordinates = () => {
    this.findCoordinates()
    this._mapcoord.setCamera({
      centerCoordinate: [this.location.longitude, this.location.latitude],
      zoomLevel: 8
    });
    this.renderAnnotations()
  }

  mapOnClick = data => {
    if (this.props.addGroupMarkOnClickStatus) {
      this.props.displayModalWindow(true);
      this.data = data;
      console.log(this.data);
    }
  };

  addLocationOnClick = () => {
    this.props.addGroupMarkOnClick(!this.props.addGroupMarkOnClickStatus);
  };


  renderAnnotations() {
    console.log("Test")
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
        {this.props.modalWindowStatus ? (
          <ModalWindow modalContent={<LogInForm type="login" />} />
        ) : (
          <View
            style={[
              containerStyles.container,
              this.props.addGroupMarkOnClickStatus
                ? containerStyles.addMarkTrue
                : null
            ]}
          >
            
            <View style={containerStyles.optionsContainer}>
              <View style={containerStyles.hamburgerMenu}></View>
              <View style={containerStyles.addLocation}>
                <Button title="+" onPress={this.addLocationOnClick} />
              </View>
              <View style={containerStyles.geolocation}></View>
            </View>
            <MSearch notifyChange={(loc) => this.getCoordsFromName(loc)}/>
            <Mapbox.MapView
              styleURL={Mapbox.StyleURL.Light}
              onPress={data => this.mapOnClick(data)}
              attributionEnabled={false}
              showUserLocation={true}
              logoEnabled={false}
              style={mapStyles.container}
              onDidFinishLoadingMap={this.findCoordinates}
            >
              <Mapbox.Camera
                ref={Component => (this._mapcoord = Component)}
                centerCoordinate={[
                  this.location.longitude,
                  this.location.latitude
                ]}
                zoomLevel={8}
              >
              </Mapbox.Camera>
            </Mapbox.MapView>
            <Icon
              style={mapStyles.locationButton}
              name="location-pin"
              size={25}
              onPress={this.zoomCoordinates}
            ></Icon>
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
    modalWindowStatus: state.modalWindowReducer.status
  };
};

// Redux Setter to use: this.props.(name of any return)
const mapDispatchToProps = dispatch => {
  return {
    addGroupMarkOnClick: bool => dispatch(addGroupMarkOnClick(bool)),
    displayModalWindow: bool => dispatch(displayModalWindow(bool))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
