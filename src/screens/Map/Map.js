import React, { Component } from 'react';
import { View } from 'react-native';
import Mapbox from '@react-native-mapbox-gl/maps';
import Geolocation from '@react-native-community/geolocation';
import Icon from "react-native-vector-icons/SimpleLineIcons";

// Componenets Style
import { containerStyles, mapStyles, annotationStyles,buttonStyles } from "./Stylesheet";

// Screens
import ModalWindow from "../ModalWindow/ModalWindow";
import LogInForm from "../Forms/Login/LoginForm";

Mapbox.setAccessToken(
  "sk.eyJ1IjoiendhaGFiMTE0IiwiYSI6ImNrMXR2cWRxZDB2MjUzY25zdTZkdHg1MGEifQ.pGh19KR7GqfLCg1qoga5rg"
);

export default class MyComponent extends Component {

  constructor(props) {
    super(props);
    this.data = null;
  }

  // Not Linked yet will add icon for this task

  mapOnClick = data => {
    if (this.props.addGroupMarkOnClickStatus) {
      this.props.displayModalWindow(true);
      this.data = data;
      console.log(this.data);
    }
  };

  // Not Linked yet will add icon for this task

  addLocationOnClick = () => {
    this.props.addGroupMarkOnClick(!this.props.addGroupMarkOnClickStatus);
  };

	location = {
        latitude: 0.0,
        longitude: 0.0
    }

    findCoordinates = () => {
        Geolocation.getCurrentPosition(
            (position) => {

                console.log(position)
                
                this.location.longitude = position.coords.longitude
                this.location.latitude = position.coords.latitude
                this.setState(this.location)

                console.log(this.location.latitude)
                console.log(this.location.longitude)

            },
            error => alert(error),
            {enableHighAccuracy: true, timeout: 2000}
		);
		this._mapcoord.setCamera({centerCoordinate:[this.location.longitude,this.location.latitude], zoomLevel:8})
		
    };
	
	renderAnnotations() {
		return (
			<Mapbox.PointAnnotation
				key="pointAnnotation"
				id="pointAnnotation"
				coordinate={[-79.39503177338315, 43.63353993681244]}>
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
				<Mapbox.MapView
					styleURL={Mapbox.StyleURL.Light}
					attributionEnabled={false}
					showUserLocation={true}
          logoEnabled={false}
					style={mapStyles.container}
					onDidFinishLoadingMap={this.findCoordinates}>
					{this.renderAnnotations()}
					<Mapbox.Camera ref={Component => this._mapcoord = Component} centerCoordinate={[this.location.longitude,this.location.latitude]} zoomLevel={8}></Mapbox.Camera>				
				</Mapbox.MapView>
				<Icon style={buttonStyles.location} name="location-pin" size={25} onPress={this.findCoordinates}></Icon>
			</View>
		);
	}
}

/*
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
*/
