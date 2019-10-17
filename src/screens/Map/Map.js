import React, { Component } from 'react';
import { View } from 'react-native';
import Mapbox from '@mapbox/react-native-mapbox-gl';

// Componenets Style
import styles from "./Stylesheet"


Mapbox.setAccessToken(
	'sk.eyJ1IjoiendhaGFiMTE0IiwiYSI6ImNrMXR2cWRxZDB2MjUzY25zdTZkdHg1MGEifQ.pGh19KR7GqfLCg1qoga5rg'
);

export default class MyComponent extends Component {
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
					zoomLevel={12}
					centerCoordinate={[-79.39503177338315, 43.63353993681244]}
					style={styles.container}>
					{this.renderAnnotations()}
				</Mapbox.MapView>
			</View>
		);
	}
}