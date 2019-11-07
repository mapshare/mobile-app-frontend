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
import GroupMenu from "./GroupMenu/GroupMenu";

// Componenets Style
import styles from "./Stylesheet";
import { Actions, ActionConst } from "react-native-router-flux";
import Icon from "react-native-vector-icons/SimpleLineIcons";

//Redux actions
import { connect } from 'react-redux';
import {
  getActiveGroup,
  getActiveGroupError,
  getActiveGroupSuccess,
  getActiveGroupDataSuccess,
  groupExists
} from '../../actions/groupActions';

class Home extends Component {
  constructor(props) {
    super(props);
    this.location = {
      latitude: 0.0,
      longitude: 0.0
    };
    this.state = {
      interval: ""
    };
  }

  componentDidMount() {
    // update every 5 seconds'
    this.setState({
      interval: setInterval(function () {
        this.checkIfGroupExists();
      }
        .bind(this), 5000)
    });

  }

  componentDidUpdate(prevProps) {
    if (prevProps.groupExistsStatus !== this.props.groupExistsStatus) {
      if (!this.props.groupExistsStatus) {
        this.setState({ interval: clearInterval(this.state.interval) });
        Actions.initial({ type: ActionConst.RESET });
      }
    }
  }

  checkIfGroupExists() {
    const data = {
      token: this.props.token,
      groupId: this.props.getActiveGroupData._id,
    }
    this.props.groupExists(data);
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
                <Text style={styles.GroupName}>{this.props.getActiveGroupData.groupName}{"\n"}</Text>
                <Text style={styles.Message}>
                  {this.props.getActiveGroupData.groupDescription}
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
    token: state.logInReducer.token,
    groupExistsStatus: state.groupReducer.groupExistsStatus,
  };
};

// Redux Setter to use: this.props.(name of any return)
const mapDispatchToProps = dispatch => {
  return {
    getActiveGroup: data => dispatch(getActiveGroup(data)),
    getActiveGroupSuccess: data => dispatch(getActiveGroupSuccess(data)),
    getActiveGroupDataSuccess: data => dispatch(getActiveGroupDataSuccess(data)),
    getActiveGroupError: data => dispatch(getActiveGroupError(data)),
    groupExists: data => dispatch(groupExists(data)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
