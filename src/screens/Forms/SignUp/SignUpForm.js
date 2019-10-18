// Import Libraries
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Keyboard,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

//Redux actions
import { registerUser, registerSuccess } from '../../../actions/registerActions';

// Componenets Style
import styles from '../Stylesheet';

// Creating Component
class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userFirstName: '',
      userLastName: '',
      userEmail: '',
      userPassword: '',
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.registerStatus !== this.props.registerStatus) {
      if (this.props.registerStatus) {
        Keyboard.dismiss();
        alert(
          'Thank you for Registering to Pin It!\n' +
          'Please check your email to finish setting up your account.'
        );

        Actions.login();
      }
    }
  }

  register = async () => {
    this.props.registerUser(this.state);
  };

  showData = async () => {
    let loginDetails = await AsyncStorage.getItem('loginDetails');
    let ld = JSON.parse(loginDetails);
    alert('email: ' + ld.email + ' ' + 'password: ' + ld.password);
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputBox}
          onChangeText={FirstName => this.setState({ userFirstName: FirstName })}
          placeholder="First Name"
          placeholderTextColor="rgba(225,225,225,0.7)"
          selectionColor="#fff"
          autoCorrect={false}
          returnKeyType="next"
          autoCapitalize="none"
          onSubmitEditing={() => this.password.focus()}
        />

        <TextInput
          style={styles.inputBox}
          onChangeText={LastName => this.setState({ userLastName: LastName })}
          placeholder="Last Name"
          placeholderTextColor="rgba(225,225,225,0.7)"
          selectionColor="#fff"
          autoCorrect={false}
          returnKeyType="next"
          autoCapitalize="none"
          onSubmitEditing={() => this.password.focus()}
        />

        <TextInput
          style={styles.inputBox}
          onChangeText={email => this.setState({ userEmail: email })}
          placeholder="Email"
          placeholderTextColor="rgba(225,225,225,0.7)"
          selectionColor="#fff"
          autoCorrect={false}
          returnKeyType="next"
          keyboardType="email-address"
          autoCapitalize="none"
          onSubmitEditing={() => this.password.focus()}
        />

        <TextInput
          style={styles.inputBox}
          onChangeText={password => this.setState({ userPassword: password })}
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor="rgba(225,225,225,0.7)"
          // returnKeyType="Login"
          ref={input => (this.password = input)}
        />

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
    registerStatus: state.registerReducer.status,
  };
};

// Redux Setter to use: this.props.(name of any return)
const mapDispatchToProps = dispatch => {
  return {
    registerSuccess: bool => dispatch(registerSuccess(bool)),
    registerUser: data => dispatch(registerUser(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUpForm);
