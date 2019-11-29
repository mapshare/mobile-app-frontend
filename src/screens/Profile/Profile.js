import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  AsyncStorage
} from 'react-native';

// Componenets Style
import styles from "./Stylesheet"
import { Actions, ActionConst } from "react-native-router-flux";

//Redux actions
import { connect } from 'react-redux';
import {
  getActiveGroup,
  getActiveGroupError,
  getActiveGroupSuccess,
  getActiveGroupDataSuccess,
  groupExists,
  getActiveGroupRefreshDataOnly
} from '../../actions/groupActions';


class Profile extends Component {

  constructor(props) {
    super(props);
  }

  goLogin() {
    AsyncStorage.setItem('token', "");
    AsyncStorage.setItem('lastActiveGroupId', "");
    this.props.getActiveGroupSuccess(false);
    this.props.getActiveGroupDataSuccess("");
    this.props.getActiveGroupError("");
    Actions.Auth({ type: ActionConst.RESET })
  }

  goTester() {
    Actions.tester()
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}></View>
        <Image style={styles.avatar} source={{ uri: 'https://ksassets.timeincuk.net/wp/uploads/sites/54/2019/06/image-asset-920x518.jpeg' }} />
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>John Doe</Text>
            <Text style={styles.info}>Spartan Teams</Text>
            <Text style={styles.description}>I'm going in! When I look behind me, you'd better be there!</Text>

            <TouchableOpacity style={styles.buttonContainer}>
              <Text>Setting</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.testerMode} onPress={this.goTester}>
              <Text>Enter Debug Mode</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutButton} onPress={() => { this.goLogin() }}>
              <Text>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
    loadingData: state.groupReducer.loadingData
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
    getActiveGroupRefreshDataOnly: data => dispatch(getActiveGroupRefreshDataOnly(data)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);