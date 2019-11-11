import React, { Component } from "react";
import { View } from "react-native";
import Mapbox from "@react-native-mapbox-gl/maps";
import { connect } from "react-redux";
import Geolocation from "@react-native-community/geolocation";
import Icon from "react-native-vector-icons/SimpleLineIcons";

//Redux actions
import { addMarkModalWindow } from "../../actions/modalWindowAction";
import { setCoordinates } from "../../actions/groupMarkAction";

// Componenets Style
import { containerStyles, mapStyles, annotationStyles } from "./Stylesheet";

// Screens
import ModalWindow from "../ModalWindow/ModalWindow";
import AddMark from "../AddMark/AddMark";

Mapbox.setAccessToken(
  "sk.eyJ1IjoiendhaGFiMTE0IiwiYSI6ImNrMXR2cWRxZDB2MjUzY25zdTZkdHg1MGEifQ.pGh19KR7GqfLCg1qoga5rg"
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
    this._mapcoord.setCamera({
      centerCoordinate: [this.location.longitude, this.location.latitude],
      zoomLevel: 8
    });
  };

  mapOnClick = data => {
    if (this.props.addGroupMarkOnClickStatus) {
      this.props.addMarkModalWindow(true);
      this.props.setCoordinates(data.geometry.coordinates);
    }
  };

  renderAnnotations() {
    return (
      <Mapbox.PointAnnotation
        key="pointAnnotation"
        id="pointAnnotation"
        coordinate={[-79.39503177338315, 43.63353993681244]}
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
        {this.props.modalWindowStatus && <ModalWindow modalContent="addMark" />}
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
          <Mapbox.MapView
            styleURL={Mapbox.StyleURL.Light}
            onPress={data => this.mapOnClick(data)}
            attributionEnabled={false}
            showUserLocation={true}
            logoEnabled={false}
            style={mapStyles.container}
            onDidFinishLoadingMap={this.findCoordinates}
          >
            {this.renderAnnotations()}
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
            onPress={this.findCoordinates}
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
    modalWindowStatus: state.modalWindowReducer.status
  };
};

// Redux Setter to use: this.props.(name of any return)
const mapDispatchToProps = dispatch => {
  return {
    addMarkModalWindow: bool => dispatch(addMarkModalWindow(bool)),
    setCoordinates: data => dispatch(setCoordinates(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
