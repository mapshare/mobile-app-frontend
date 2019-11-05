import React, { Component } from "react";
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Alert
} from "react-native";
import Mapbox from "@react-native-mapbox-gl/maps";
import Geolocation from "@react-native-community/geolocation";
import { connect } from "react-redux";
import GroupMenu from "./GroupMenu/GroupMenu";

// Componenets Style
import styles from "./Stylesheet";
import { Actions } from "react-native-router-flux";

class Home extends Component {
  constructor(props) {
    super(props);
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
  };

  goMap() {
    Actions.map();
  }

  render() {
    return (
      <View style={styles.root}>
        <View style={styles.Body}>
        <GroupMenu />
          <View style={styles.InfoBody}>
            <ImageBackground
              source={require("../../assests/images/food.jpg")}
              resizeMode="cover"
              style={styles.image}
            >
              <View style={styles.Overlay}>
                <Text style={styles.GroupName}>Spartans {"\n"}</Text>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.text}>Group Page</Text>
                </TouchableOpacity>
                <Text style={styles.Message}>
                  Did I give you permission to eat, soldier?
                </Text>
              </View>
            </ImageBackground>
          </View>
          <Mapbox.MapView
            styleURL={Mapbox.StyleURL.Light}
            showUserLocation={true}
            zoomEnabled={false}
            scrollEnabled={false}
            pitchEnabled={false}
            rotateEnabled={false}
            attributionEnabled={false}
            logoEnabled={false}
            style={styles.Body}
            onDidFinishLoadingMap={this.findCoordinates}
            onPress={this.goMap}
          >
            <Mapbox.Camera
              centerCoordinate={[
                this.location.longitude,
                this.location.latitude
              ]}
              zoomLevel={8}
            />
          </Mapbox.MapView>
        </View>
      </View>
    );
  }
}

// Redux Getter to use: this.props.(name of any return)
const mapStateToProps = state => {
  return {
    getActiveGroupData: state.groupReducer.getActiveGroupData,
    getActiveGroupStatus: state.groupReducer.getActiveGroupStatus,
    token: state.logInReducer.token
  };
};

// Redux Setter to use: this.props.(name of any return)
const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);