import React, { Component } from 'react';
import { View } from 'react-native';
import Mapbox from '@react-native-mapbox-gl/maps';
import Geolocation from '@react-native-community/geolocation';
import Icon from "react-native-vector-icons/SimpleLineIcons";

// Componenets Style
import styles from "./Stylesheet"


Mapbox.setAccessToken(
	'sk.eyJ1IjoiendhaGFiMTE0IiwiYSI6ImNrMXR2cWRxZDB2MjUzY25zdTZkdHg1MGEifQ.pGh19KR7GqfLCg1qoga5rg'
);


export default class MyComponent extends Component {

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
				<View style={styles.annotationContainer}>
					<View style={styles.annotationFill} />
				</View>
				<Mapbox.Callout title="We did it!!" />
			</Mapbox.PointAnnotation>
		);
	}

	render() {
		return (
			<View style={styles.container}>
				<Mapbox.MapView
					styleURL={Mapbox.StyleURL.Light}
					attributionEnabled={false}
					showUserLocation={true}
                    logoEnabled={false}
					style={styles.container}
					onDidFinishLoadingMap={this.findCoordinates}>
					{this.renderAnnotations()}
					<Mapbox.Camera ref={Component => this._mapcoord = Component} centerCoordinate={[this.location.longitude,this.location.latitude]} zoomLevel={8}></Mapbox.Camera>				
				</Mapbox.MapView>
				<Icon style={styles.locationButton} name="location-pin" size={25} onPress={this.findCoordinates}></Icon>
			</View>
		);
	}
}