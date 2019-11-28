// Import Libraries
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Keyboard
} from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";

import validator from "../validate/validation_wrapper";

//Redux actions
import {
  registerUser,
  registerSuccess,
  registerUserError
} from "../../../actions/registerActions";

// Componenets Style
import styles from "../Stylesheet";

// Creating Component
class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        userFirstName: "",
        userLastName: "",
        userEmail: "",
        userPassword: ""
      },
      userFirstNameError: "",
      userLastNameError: "",
      emailError: "",
      passwordError: ""
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.registerStatus !== this.props.registerStatus) {
      if (this.props.registerStatus) {
        Keyboard.dismiss();
        alert(
          "Thank you for Registering to Pin It!\n" +
            "Please check your email to finish setting up your account."
        );

        Actions.login();
      }
    }

    if (this.props.getRegisterError) {
      alert(this.props.getRegisterError);
      this.props.registerUserError("");
    }
  }

  register = async () => {
    const userFirstNameError = validator(
      "firstName",
      this.state.user.userFirstName
    );
    const userLastNameError = validator(
      "lastName",
      this.state.user.userLastName
    );
    const emailError = validator("email", this.state.user.userEmail);
    const passwordError = validator("password", this.state.user.userPassword);

    this.setState(
      {
        userFirstNameError: userFirstNameError,
        userLastNameError: userLastNameError,
        emailError: emailError,
        passwordError: passwordError
      },
      () => {
        if (
          !userFirstNameError &&
          !userLastNameError &&
          !emailError &&
          !passwordError
        ) {
          this.props.registerUser(this.state.user);
        } else {
          /* console.log("this.state.userFirstNameError " + this.state.userFirstNameError)
        console.log("this.state.userLastNameError " + this.state.userLastNameError)
        console.log("this.state.emailError " + this.state.emailError)
        console.log("this.state.passwordError " + this.state.passwordError) */
        }
      }
    );
  };

  showData = async () => {
    let loginDetails = await AsyncStorage.getItem("loginDetails");
    let ld = JSON.parse(loginDetails);
    alert("email: " + ld.email + " " + "password: " + ld.password);
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputBox}
          onChangeText={FirstName =>
            this.setState({
              user: { ...this.state.user, userFirstName: FirstName }
            })
          }
          placeholder="First Name"
          placeholderTextColor="rgba(0,0,0,0.7)"
          selectionColor="#fff"
          autoCorrect={false}
          returnKeyType="next"
          autoCapitalize="none"
          onSubmitEditing={() => this.password.focus()}
        />
        {this.state.userFirstNameError ? (
          <Text>{this.state.userFirstNameError}</Text>
        ) : null}

        <TextInput
          style={styles.inputBox}
          onChangeText={LastName =>
            this.setState({
              user: { ...this.state.user, userLastName: LastName }
            })
          }
          placeholder="Last Name"
          placeholderTextColor="rgba(0,0,0,0.7)"
          selectionColor="#fff"
          autoCorrect={false}
          returnKeyType="next"
          autoCapitalize="none"
          onSubmitEditing={() => this.password.focus()}
        />
        {this.state.userLastNameError ? (
          <Text>{this.state.userLastNameError}</Text>
        ) : null}

        <TextInput
          style={styles.inputBox}
          onChangeText={email =>
            this.setState({ user: { ...this.state.user, userEmail: email } })
          }
          placeholder="Email"
          placeholderTextColor="rgba(0,0,0,0.7)"
          selectionColor="#fff"
          autoCorrect={false}
          returnKeyType="next"
          keyboardType="email-address"
          autoCapitalize="none"
          onSubmitEditing={() => this.password.focus()}
        />
        {this.state.emailError ? <Text>{this.state.emailError}</Text> : null}

        <TextInput
          style={styles.inputBox}
          onChangeText={password =>
            this.setState({
              user: { ...this.state.user, userPassword: password }
            })
          }
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor="rgba(0,0,0,0.7)"
          returnKeyType="go"
          onSubmitEditing={this.register}
          ref={input => (this.password = input)}
        />
        {this.state.passwordError ? (
          <Text>{this.state.passwordError}</Text>
        ) : null}

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText} onPress={this.register}>
            {this.props.type}
          </Text>
        </TouchableOpacity>
      </View>
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
