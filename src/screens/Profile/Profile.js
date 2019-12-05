import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
  Modal,
  TextInput,
  Alert
} from 'react-native';

// Componenets Style
import styles from "./Stylesheet"
import { Actions, ActionConst } from "react-native-router-flux";
import validator from "../Forms/validate/validation_wrapper";
import ImagePicker from 'react-native-image-picker';

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
        userImages: ""
      },
      userFirstNameError: "",
      userLastNameError: "",
      passwordError: "",
      modalVisible: false
    };
  }

  profileModalOpen() {
    this.state.user.userFirstName = this.props.getUserData.userFirstName;
    this.state.user.userLastName = this.props.getUserData.userLastName;

    if (Object.keys(this.props.getUserData.userImages).length !== 0) {
      this.state.user.userImages = { uri: 'data:image/png;base64,' + this.props.getUserData.userImages}
    } else {
      this.state.user.userImages = require('../../assests/images/default-profile.png');
    }

    this.setState({modalVisible:true});
  }

  profileModalClose() {
    this.setState({modalVisible:false});
    this.state.userFirstNameError = null;
    this.state.userLastNameError = null;
    this.state.user.userImages = null;
  }

  choosePhoto() {
    this.setState({ isImagePickerActive: true }, () => {

        let options = {
            title: null,
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {

              this.state.user.userImages = response;

            }
        });
        setTimeout(() => { this.setState({ isImagePickerActive: false }); }, 1000)
    });
};

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

  update = async () => {

    let userImageSource = require('../../assests/images/default-profile.png');
    let updateRecord = false;

    let userFirstNameError = validator(
      "firstName",
      this.state.user.userFirstName
    );
    let userLastNameError = validator(
      "lastName",
      this.state.user.userLastName
    );
    console.log(this.state.user.userFirstName, '=',this.props.getUserData.userFirstName)
   // const passwordError = validator("password", this.state.user.userPassword);

   if (this.state.user.userFirstName === this.props.getUserData.userFirstName ) {
      userFirstNameError = null
    }else {
      updateRecord = true;
    }

    if (this.state.user.userFirstName === this.props.getUserData.userFirstName) {
      userLastNameError = null  
    }else {
      updateRecord = true;
    }

    console.log (this.props.getUserData.userImages , '=', this.state.user.userImages)

    if (this.props.getUserData.userImages !== this.state.user.userImages) {
      updateRecord = true;
    }

    if (this.state.user.userImages === userImageSource) {
      updateRecord = false;
    }

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
          
          if (updateRecord === true) {
            const data = {
              userFirstName: this.state.user.userFirstName,
              userLastName: this.state.user.userLastName,
              userImages: this.state.user.userImages.data,
              token: this.props.token
            }
            console.log(data)
            this.props.updateUser(data);
  
            Alert.alert(
              "Profile Information Updated"
            );
            updateRecord = false;
            this.profileModalClose();
          }

        } 
      }
    );
  };

  render() {
    let userImageSource = require('../../assests/images/default-profile.png');
    try {
      if (Object.keys(this.props.getUserData.userImages).length !== 0) {
        userImageSource = this.props.getUserData.userImages ? {
          uri: 'data:image/png;base64,' + this.props.getUserData.userImages
        }
          : require('../../assests/images/default-profile.png');
      }else {
        userImageSource = require('../../assests/images/default-profile.png');
      }
    } catch (error) {
      userImageSource = require('../../assests/images/default-profile.png');
    }
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}></View>
        <Image style={styles.avatar} source={userImageSource}/>
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>{this.props.getUserData.userFirstName} {this.props.getUserData.userLastName}</Text>
            <Text style={styles.info}>{this.props.getActiveGroupData.groupName}</Text>
            <Text style={styles.description}>{this.props.getActiveGroupData.groupDescription}{'\n'}</Text>

            <TouchableOpacity style={styles.buttonContainer} onPress={() => { this.profileModalOpen() }}>
              <Text>Edit Profile</Text>
            </TouchableOpacity>
            <Modal
              visible={this.state.modalVisible}
              animationType={'slide'}
              onRequestClose={() => this.profileModalClose()}
          >
            <View style={styles.modalWindow} ScrollView>
              <Text style={styles.modalText}>Update Profile</Text>
              <Image style={styles.image} source={this.state.user.userImages} />
              <TouchableOpacity style={styles.center} onPress={() => this.choosePhoto()}><Text style={styles.Text}>Change Image</Text></TouchableOpacity>
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
                        onSubmitEditing={() => this.update()}
                        />
              {this.state.userLastNameError ? (
                <Text style={styles.errorMessage}>{this.state.userLastNameError}</Text>
              ) : null}
              <TouchableOpacity style={[styles.buttonContainer, styles.center]} onPress={() => this.update()}>
                <Text>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.logoutButton, styles.center]} onPress={() => { this.profileModalClose() }}>
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
    updateStatus: state.userReducer.status,
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