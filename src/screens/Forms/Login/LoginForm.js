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
import { logInUser, logInSuccess } from '../../../actions/logInActions';

// Componenets Style
import styles from '../Stylesheet';

// Creating Component
class LogInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.logInStatus !== this.props.logInStatus) {
      if (this.props.logInStatus) {
        Keyboard.dismiss();
        Actions.home();
      }
    }
  }

  LoginUser = async () => {
    this.props.logInUser({
      userEmail: this.state.email,
      userPassword: this.state.password,
    })
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
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
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
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor="rgba(225,225,225,0.7)"
          // returnKeyType="Login"
          ref={input => (this.password = input)}
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText} onPress={this.LoginUser}>
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
    getUserData: state.logInReducer.userData,
    logInStatus: state.logInReducer.status,
    getToken: state.logInReducer.token,
  };
};

// Redux Setter to use: this.props.(name of any return)
const mapDispatchToProps = dispatch => {
  return {
    logInSuccess: bool => dispatch(logInSuccess(bool)),
    logInUser: data => dispatch(logInUser(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LogInForm);
