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
      interval: "",
      groupImg: "",
    };
  }

  componentDidMount() {
    // update every 5 seconds
    this.setState({
      interval: setInterval(() => {
        this.checkIfGroupExists(this.props.getActiveGroupData._id);
      }, 5000)
    });

    this.setState({ groupImg: this.props.getActiveGroupData.groupImg });

  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.groupExistsStatus !== this.props.groupExistsStatus) {
      if (!this.props.groupExistsStatus) {
        this.clearActiveGroup();
      }
    }

    if (prevProps.updateGroupStatus !== this.props.updateGroupStatus) {
      if (this.props.updateGroupStatus) {
        const data = {
          token: this.props.token,
          groupId: this.props.getActiveGroupData._id,
        }
        this.props.getActiveGroupSuccess(false);
        this.props.getActiveGroup(data);
      }
    }
  }

  checkIfGroupExists(groupId) {
    const data = {
      token: this.props.token,
      groupId: groupId,
    }
    this.props.groupExists(data);
  }

  clearActiveGroup() {
    this.props.getActiveGroupSuccess(false);
    this.props.getActiveGroupDataSuccess("");
    this.props.getActiveGroupError("");
    Actions.initial({ type: ActionConst.RESET });
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
      error => {
        alert(error);
        console.log(error)
      },
      { enableHighAccuracy: true, timeout: 2000 }
    );
  };

  goMap() {
    Actions.map();
  }

  getGroupImage() {
    if (this.props.getActiveGroupData.groupImg) {
      let data = 'data:image/png;base64,' + this.state.groupImg;
      return ({ uri: data });
    } else {
      return (
        require("../../assests/images/food.jpg")
      );
    }
  }

  render() {
    return (
      <View style={styles.root}>
        <View style={styles.Body}>
          <GroupMenu />
          <View style={styles.InfoBody}>

            <ImageBackground
              source={this.props.getActiveGroupData.groupImg ? { uri: 'data:image/png;base64,' + this.props.getActiveGroupData.groupImg }
                : require("../../assests/images/food.jpg")
              }
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
    updateGroupStatus: state.groupReducer.updateGroupStatus,
    updateGroupData: state.groupReducer.updateGroupStatus,
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
