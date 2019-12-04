import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
  Modal,
  TextInput
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
  disconnectGroupFeed
} from '../../actions/groupFeedAction';

import {
  disconnectGroupChatRoom
} from '../../actions/groupChatRoomAction';

import {
  getUser,
  getUserDataSuccess,
  updateUser,
  updateUserSuccess,
  updateUserError
} from '../../actions/userActions';


class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {
        userFirstName: "",
        userLastName: "",
      },
      userFirstNameError: "",
      userLastNameError: "",
      passwordError: "",
      modalVisible: false
    };
  }

  state = {
    modalVisible: false,
  };

  openModal() {
    this.setState({modalVisible:true});
  }

  closeModal() {
    this.setState({modalVisible:false});
  }

  goLogin() {
    AsyncStorage.setItem('token', "");
    AsyncStorage.setItem('lastActiveGroupId', "");
    this.props.getActiveGroupSuccess(false);
    this.props.getActiveGroupDataSuccess("");
    this.props.getActiveGroupError("");
    this.props.disconnectGroupChatRoom({ socket: this.props.socket });
    this.props.disconnectGroupFeed({ groupFeedSocket: this.props.groupFeedSocket });
    Actions.Auth({ type: ActionConst.RESET })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.updateStatus !== this.props.updateStatus) {
      if (this.props.updateStatus) {
        Keyboard.dismiss();
        alert(
          "Profile Information Updated"
        );
        //Actions.pop();
      }
    }

    //if (this.props.getRegisterError) {
      //alert(this.props.getRegisterError);
      //this.props.registerUserError("");
    //}
  }

  update = async () => {
    const userFirstNameError = validator(
      "firstName",
      this.state.user.userFirstName
    );
    const userLastNameError = validator(
      "lastName",
      this.state.user.userLastName
    );
    
   // const passwordError = validator("password", this.state.user.userPassword);

    this.setState(
      {
        userFirstNameError: userFirstNameError,
        userLastNameError: userLastNameError,
      },
      () => {
        if (
          !userFirstNameError &&
          !userLastNameError
        ) {
          
          const data = {
            userFirstName: this.props.userFirstName,
            userLastName: this.props.userLastName,
            token: this.props.token
          }

          this.props.updateUser(data);
          console.log(data)
        } else {
          /* console.log("this.state.userFirstNameError " + this.state.userFirstNameError)
        console.log("this.state.userLastNameError " + this.state.userLastNameError)
        console.log("this.state.emailError " + this.state.emailError)
        console.log("this.state.passwordError " + this.state.passwordError) */
        }
      }
    );
  };

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

            <TouchableOpacity style={styles.buttonContainer} onPress={() => { this.openModal() }}>
              <Text>Edit Profile</Text>
            </TouchableOpacity>
            <Modal
              visible={this.state.modalVisible}
              animationType={'slide'}
              onRequestClose={() => this.closeModal()}
          >
            <View style={styles.modalWindow} ScrollView>
              <Text style={styles.modalText}>Update Profile</Text>
              <TextInput style={styles.inputBox}
                        onChangeText={FirstName =>
                          this.setState({
                            user: { ...this.state.user, userFirstName: FirstName }
                          })
                        }
                        placeholder="First Name"
                        defaultValue={this.props.getUserData.userFirstName}
                        maxLength={12}
                        placeholderTextColor="rgba(0,0,0,0.7)"
                        selectionColor="#fff"
                        autoCorrect={false}
                        returnKeyType="next"
                        autoCapitalize="none"
                        onSubmitEditing={() => this.lastName.focus()}
                        />
              {this.state.userFirstNameError ? (
                <Text style={styles.errorMessage}>{this.state.userFirstNameError}</Text>
              ) : null}

              <TextInput style={styles.inputBox}
                        onChangeText={LastName =>
                          this.setState({
                            user: { ...this.state.user, userLastName: LastName }
                          })
                        }
                        placeholder="Last Name"
                        defaultValue={this.props.getUserData.userLastName}
                        maxLength={12}
                        placeholderTextColor="rgba(0,0,0,0.7)"
                        selectionColor="#fff"
                        autoCorrect={false}
                        returnKeyType="next"
                        autoCapitalize="none"
                        ref={input => (this.lastName = input)}
                        onSubmitEditing={() => this.update}
                        />
              {this.state.userLastNameError ? (
                <Text style={styles.errorMessage}>{this.state.userLastNameError}</Text>
              ) : null}
              <TouchableOpacity style={[styles.buttonContainer, styles.center]} onPress={() => this.update()}>
                <Text>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.logoutButton, styles.center]} onPress={() => { this.closeModal() }}>
                <Text>Cancel</Text>
            </TouchableOpacity>
            </View>
          </Modal>
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
    socket: state.groupChatRoomReducer.socket,
    groupFeedSocket: state.groupFeedReducer.groupFeedSocket,
  };
};

// Redux Setter to use: this.props.(name of any return)
const mapDispatchToProps = dispatch => {
  return {
    getUser: data => dispatch(getUser(data)),
    getUserDataSuccess: data => dispatch(getUserDataSuccess(data)),
    updateUser: data => dispatch(updateUser(data)),
    getActiveGroup: data => dispatch(getActiveGroup(data)),
    getActiveGroupSuccess: data => dispatch(getActiveGroupSuccess(data)),
    getActiveGroupDataSuccess: data => dispatch(getActiveGroupDataSuccess(data)),
    getActiveGroupError: data => dispatch(getActiveGroupError(data)),
    groupExists: data => dispatch(groupExists(data)),
    getGroupAllMarks: data => dispatch(getGroupAllMarks(data)),
    getActiveGroupRefreshDataOnly: data => dispatch(getActiveGroupRefreshDataOnly(data)),
    getGroupMember: data => dispatch(getGroupMember(data)),
    disconnectGroupFeed: data => dispatch(disconnectGroupFeed(data)),
    disconnectGroupChatRoom: data => dispatch(disconnectGroupChatRoom(data))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);