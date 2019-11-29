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

import {
  getUser,
  getUserDataSuccess,
  updateUser
} from '../../actions/userActions';


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
            <Text style={styles.name}>{this.props.getUserData.userFirstName} {this.props.getUserData.userLastName}</Text>
            <Text style={styles.info}>{this.props.getActiveGroupData.groupName}</Text>
            <Text style={styles.description}>{this.props.getActiveGroupData.groupDescription}{'\n'}</Text>
            
            <TouchableOpacity style={styles.buttonContainer}>
              <Text>Edit Profile</Text>
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
    getUserData: state.userReducer.getUserData,
    getActiveGroupData: state.groupReducer.getActiveGroupData,
    token: state.logInReducer.token,
  };
};

// Redux Setter to use: this.props.(name of any return)
const mapDispatchToProps = dispatch => {
  return {
    getUser: data => dispatch(getUser(data)),
    getUserDataSuccess: data => dispatch(getUserDataSuccess(data)),
    updateUser: data => dispatch(updateUser(data)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);