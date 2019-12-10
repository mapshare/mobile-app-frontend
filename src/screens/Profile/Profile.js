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
        userOldPasword: "",
        userNewPassword: "",
        userCNewPassword: "",
        userImages: "",
        userCurrentImage: ""
      },
      userFirstNameError: "",
      userLastNameError: "",
      passwordError: "",
      userNewPasswordError: "",
      userCNewPasswordError: "",
      generalError: "",
      modalVisible: false,
      pwdModalVisible: false,

    };
  }

  profileModalOpen() {
    this.state.user.userFirstName = this.props.getUserData.userFirstName;
    this.state.user.userLastName = this.props.getUserData.userLastName;

    if (this.props.getUserData.userProfilePic) {
      this.state.user.userImages = { uri: 'data:image/png;base64,' + this.props.getUserData.userProfilePic}
      this.state.user.userCurrentImage = this.props.getUserData.userProfilePic
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
    this.state.generalError = null;
  }

  pwdModalClose() {
    this.setState({pwdModalVisible:false});
    this.state.userNewPasswordError = null;
    this.state.userCNewPasswordError = null;
  }

  pwdModalOpen() {
    this.setState({pwdModalVisible:true})
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
    this.props.socket.disconnect();
    this.props.groupFeedSocket.disconnect();
    Actions.Auth({ type: ActionConst.RESET })
  }

  update = async () => {

    let updateRecord = false;

    let userFirstNameError = validator(
      "firstName",
      this.state.user.userFirstName
    );
    let userLastNameError = validator(
      "lastName",
      this.state.user.userLastName
    );

   if (this.state.user.userFirstName === this.props.getUserData.userFirstName ) {
      userFirstNameError = null
    }else {
      updateRecord = true;
    }

    console.log(this.state.user.userFirstName, this.props.getUserData.userFirstName)
    if (this.state.user.userFirstName === this.props.getUserData.userFirstName) {
      userLastNameError = null  
    }else {
      updateRecord = true;
    }

    if (this.props.getUserData.userProfilePic !== this.state.user.userCurrentImage) {
      updateRecord = true;
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
              userProfilePic: this.state.user.userImages.data,
              token: this.props.token
            }
            this.props.updateUser(data);
  
            Alert.alert(
              "Profile Information Updated"
            );
            updateRecord = false;
            this.profileModalClose();
          } else {
            this.setState({
              generalError: "Please Update Record to Save Changes!"
            })
          }

        } 
      }
    );
  };

  //Updating User Password
  updatePasword = async () => {

    const userNewPasswordError = validator("password", this.state.user.userNewPassword);
    const userCNewPasswordError = validator("password", this.state.user.userCNewPassword);
    
    

    this.setState(
      {
        userNewPasswordError: userNewPasswordError,
        userCNewPasswordError: userCNewPasswordError
      },
      () => {
        if (
          !userNewPasswordError &&
          !userCNewPasswordError
        ) {
          if (this.state.user.userNewPassword === this.state.user.userCNewPassword) {
            const data = {
              userPassword: this.state.user.userNewPassword,
              token: this.props.token
            }

            this.props.updateUser(data);
            Alert.alert(
              "Password Updated"
            );
            console.log(data)
            this.profileModalClose();
            this.goLogin();
          } else {
            this.setState({
              userCNewPasswordError: "The Password didn't match. Please try again"
            })
          }
        } 
      }
    );
  }

  render() {
    let userImageSource = require('../../assests/images/default-profile.png');
    //console.log(this.props.getUserData.userProfilePic)
    try {
      if (this.props.getUserData.userProfilePic) {
        userImageSource = this.props.getUserData.userProfilePic ? {
          uri: 'data:image/png;base64,' + this.props.getUserData.userProfilePic 
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
            <TouchableOpacity style={[styles.buttonContainer, styles.center]} onPress={() => this.pwdModalOpen()}>
                <Text>Change Password</Text>
            </TouchableOpacity>


            <Modal
              visible={this.state.pwdModalVisible}
              animationType={'slide'}
              onRequestClose={() => this.pwdModalClose()}
            ><View style={styles.modalWindow}>
              <Text style={styles.modalText}>Change Password</Text>
              <TextInput style={styles.inputBox}
                        placeholder="Old Password"
                        onChangeText={OldPassword =>
                          this.setState({
                            user: { ...this.state.user, userOldPasword: OldPassword }
                          })
                        }
                        //defaultValue={this.props.getUserData.userPassword}
                        placeholderTextColor="rgba(0,0,0,0.7)"
                        selectionColor="#fff"
                        maxLength={256}
                        autoCorrect={false}
                        returnKeyType="next"
                        autoCapitalize="none"
                        secureTextEntry={true}
                        />
              <TextInput style={styles.inputBox}
                        onChangeText={NewPassword =>
                          this.setState({
                            user: { ...this.state.user, userNewPassword: NewPassword }
                          })
                        }
                        placeholder="New Password"
                        placeholderTextColor="rgba(0,0,0,0.7)"
                        selectionColor="#fff"
                        autoCorrect={false}
                        returnKeyType="next"
                        autoCapitalize="none"
                        onSubmitEditing={() => this.ConfirmNewPassword.focus()}
                        />
              {this.state.userNewPasswordError ? (
                <Text style={styles.errorMessage}>{this.state.userNewPasswordError}</Text>
              ) : null}
              <TextInput style={styles.inputBox}
                        onChangeText={CNewPassword =>
                          this.setState({
                            user: { ...this.state.user, userCNewPassword: CNewPassword }
                          })
                        }
                        placeholder="Confirm New Password"
                        placeholderTextColor="rgba(0,0,0,0.7)"
                        selectionColor="#fff"
                        maxLength={256}
                        autoCorrect={false}
                        returnKeyType="next"
                        autoCapitalize="none"
                        ref={input => (this.ConfirmNewPassword = input)}
                        onSubmitEditing={() => this.updatePasword()}
                        />
              {this.state.userCNewPasswordError ? (
                <Text style={styles.errorMessage}>{this.state.userCNewPasswordError}</Text>
              ) : null}
              <TouchableOpacity style={[styles.buttonContainer, styles.center]} onPress={() => this.updatePasword()}>
                <Text>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.logoutButton, styles.center]} onPress={() => { this.pwdModalClose() }}>
                <Text>Cancel</Text>
            </TouchableOpacity>
              </View>
              </Modal>


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
              <TextInput style={styles.inputBox}
                        placeholder="Email"
                        defaultValue={this.props.getUserData.userEmail}
                        placeholderTextColor="rgba(0,0,0,0.7)"
                        selectionColor="#fff"
                        autoCorrect={false}
                        autoCapitalize="none"
                        editable={false}
                        />
              <Text style={styles.message}>**Email Address cannot be modified</Text>
              {this.state.generalError ? (
                <Text style={styles.errorMessage}>{this.state.generalError}</Text>
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