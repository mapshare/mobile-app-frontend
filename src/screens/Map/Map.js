import React, { Component } from "react";
import { View } from "react-native";
import Mapbox from "@mapbox/react-native-mapbox-gl";

// Componenets Style
import { containerStyles, mapStyles, annotationStyles } from "./Stylesheet";

Mapbox.setAccessToken(
  "sk.eyJ1IjoiendhaGFiMTE0IiwiYSI6ImNrMXR2cWRxZDB2MjUzY25zdTZkdHg1MGEifQ.pGh19KR7GqfLCg1qoga5rg"
);

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coordinates: {}
    };

    this.map = null;
  }

  mapOnClick = data => {
    console.log(data);
  };

  addLocationOnClick = () => {};

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
      <View id="test" style={containerStyles.container}>
        <View style={containerStyles.optionsContainer}>
          <View style={containerStyles.hamburgerMenu}></View>
          <View
            style={containerStyles.addLocation}
            onPress={this.addLocationOnClick}
          ></View>
          <View style={containerStyles.geolocation}></View>
        </View>
        <Mapbox.MapView
          styleURL={Mapbox.StyleURL.Light}
          zoomLevel={12}
          centerCoordinate={[-79.39503177338315, 43.63353993681244]}
          style={mapStyles.container}
          onPress={data => this.mapOnClick(data)}
        >
          {this.renderAnnotations()}
        </Mapbox.MapView>
      </View>
    );
  }
}

export default Map;
