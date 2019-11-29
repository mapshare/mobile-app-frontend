// Import Libraries
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Keyboard,
  Modal,
  Alert
} from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";

import validator from "../../Forms/validate/validation";

//Redux actions
import {
  registerUser,
  registerSuccess,
  registerUserError
} from "../../../actions/registerActions";

// Componenets Style
import styles from "./Stylesheet";

// Creating Component
class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        userFirstName: "",
        userLastName: "",
      },
      userFirstNameError: "",
      userLastNameError: "",
    };
  }

  componentDidUpdate(prevProps) {
    
  }

  goprofile() {
      Actions.profile();
  }

  register = async () => {
    
  };

  showData = async () => {
    let loginDetails = await AsyncStorage.getItem("loginDetails");
    let ld = JSON.parse(loginDetails);
    alert("email: " + ld.email + " " + "password: " + ld.password);
  };

  render() {
    return (
      <Modal>
      <View style={styles.container}>
        <TextInput
          style={styles.inputBox}
          onChangeText={FirstName =>
            this.setState({
              user: { ...this.state.user, userFirstName: FirstName }
            })
          }
          placeholder="First Name"
          maxLength={12}
          placeholderTextColor="rgba(0,0,0,0.7)"
          selectionColor="#fff"
          autoCorrect={false}
          returnKeyType="next"
          autoCapitalize="none"
          onSubmitEditing={() => this.lastName.focus()}
        />
        {Alert.alert("Note", "FrontEnd WIP - ETA 11/29/2019 @ 11:00 PM EST")}
        {this.state.userFirstNameError ? (
          <Text style={styles.errorMessage}>{this.state.userFirstNameError}</Text>
        ) : null}

        <TextInput
          style={styles.inputBox}
          onChangeText={LastName =>
            this.setState({
              user: { ...this.state.user, userLastName: LastName }
            })
          }
          placeholder="Last Name"
          maxLength={12}
          placeholderTextColor="rgba(0,0,0,0.7)"
          selectionColor="#fff"
          autoCorrect={false}
          returnKeyType="go"
          autoCapitalize="none"
          ref={input => (this.lastName = input)}
          onSubmitEditing={() => this.register}
        />
        {this.state.userLastNameError ? (
          <Text style={styles.errorMessage}>{this.state.userLastNameError}</Text>
        ) : null}

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText} onPress={this.register}>
            Update Setting
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText} onPress={this.goprofile}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View></Modal> 
    );
  }
}

// Redux Getter to use: this.props.(name of any return)
const mapStateToProps = state => {
  return {
    getUserData: state.registerReducer.userData,
    getRegisterError: state.registerReducer.registerError,
    registerStatus: state.registerReducer.status
  };
};

// Redux Setter to use: this.props.(name of any return)
const mapDispatchToProps = dispatch => {
  return {
    registerSuccess: bool => dispatch(registerSuccess(bool)),
    registerUser: data => dispatch(registerUser(data)),
    registerUserError: data => dispatch(registerUserError(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpForm);
