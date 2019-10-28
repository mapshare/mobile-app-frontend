import React, { Component } from "react";
import {Text, View, ImageBackground, TouchableOpacity } from "react-native";
import Mapbox from '@react-native-mapbox-gl/maps';

// Componenets Style
import styles from "./Stylesheet"
import { Actions } from "react-native-router-flux";

export default class Home extends Component {

    goMap(){
        Actions.map()
    }

    render() {
        return (
            <View style={styles.root}>
                <View style={styles.Body}>
                    <ImageBackground source={require("../../assests/images/food.jpg")} resizeMode="cover" style={styles.image}>
                        <View style={styles.Overlay}>
                            <Text style={styles.GroupName}>Spartans {"\n"}</Text>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.text}>Group Page</Text>
                            </TouchableOpacity>
                            <Text style={styles.Message}>Did I give you permission to eat, soldier?</Text>
                        </View>
                    </ImageBackground>
                    <Mapbox.MapView 
                    styleURL={Mapbox.StyleURL.Light}
                    zoomLevel={10} 
                    centerCoordinate={[-79.39503177338315, 43.63353993681244]}
                    showUserLocation={true}
                    zoomEnabled={false}
                    scrollEnabled={false}
                    pitchEnabled={false}
                    rotateEnabled={false}
                    attributionEnabled={false}
                    logoEnabled={false}
                    style={styles.Body} 
                    onPress={this.goMap} ></Mapbox.MapView>
                </View>
            </View>
        )
    }
}
