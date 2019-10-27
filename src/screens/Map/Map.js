import React, { Component } from "react";
import { View, Button } from "react-native";
import Mapbox from "@react-native-mapbox-gl/maps";
import { connect } from "react-redux";

//Redux actions
import { addGroupMarkOnClick } from "../../actions/groupMarkAction";
import { displayModalWindow } from "../../actions/modalWindowAction";

// Componenets Style
import { containerStyles, mapStyles, annotationStyles } from "./Stylesheet";

// Screens
import ModalWindow from "../ModalWindow/ModalWindow";
import LogInForm from "../Forms/Login/LoginForm";

Mapbox.setAccessToken(
  "sk.eyJ1IjoiendhaGFiMTE0IiwiYSI6ImNrMXR2cWRxZDB2MjUzY25zdTZkdHg1MGEifQ.pGh19KR7GqfLCg1qoga5rg"
);

class Map extends Component {
  constructor(props) {
    super(props);
    this.data = null;
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
            <Mapbox.MapView
              styleURL={Mapbox.StyleURL.Light}
              zoomLevel={3}
              centerCoordinate={[-79.39503177338315, 43.63353993681244]}
              style={mapStyles.container}
              onPress={data => this.mapOnClick(data)}
            >
              {this.renderAnnotations()}
            </Mapbox.MapView>
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
