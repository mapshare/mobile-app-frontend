// Import Libraries
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Keyboard
} from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import { connect } from 'react-redux';

//Redux actions
import {
  logInUser,
  logInSuccess,
  logInUserError
} from '../../../actions/logInActions';

// Componenets Style
import styles from '../Stylesheet';

import validator from '../validate/validation_wrapper';

// Creating Component
class LogInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        userEmail: '',
        userPassword: ''
      },
      emailError: '',
      passwordError: ''
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {
    if (prevProps.logInStatus !== this.props.logInStatus) {
      if (this.props.logInStatus) {
        Keyboard.dismiss();
        // Actions.tester();
        // When we setup local storage we would want to load active group before checking if we have one selected
        if (this.props.getActiveGroupStatus) {
          Actions.navTab({ type: ActionConst.RESET });
        } else {
          console.log('initialMyGroups');
          Actions.initial({ type: ActionConst.RESET });
        }
      }
    }

    if (this.props.getLogInError) {
      alert(this.props.getLogInError);
      this.props.logInUserError('');
    }
  }

  LoginUser = async () => {
    const emailError = validator('email', this.state.user.userEmail);
    const passwordError = validator('password', this.state.user.userPassword);

    this.setState(
      {
        emailError: emailError,
        passwordError: passwordError
      },
      () => {
        if (!emailError && !passwordError) {
          this.props.logInSuccess(false);
          this.props.logInUser(this.state.user);
        } else {
          console.log('this.state.emailError ' + this.state.emailError);
          console.log('this.state.passwordError ' + this.state.passwordError);
        }
      }
    );
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
          onChangeText={email =>
            this.setState({ user: { ...this.state.user, userEmail: email } })
          }
          value={this.state.email}
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
          value={this.state.password}
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor="rgba(0,0,0,0.7)"
          returnKeyType="go"
          onSubmitEditing={this.LoginUser}
          ref={input => (this.password = input)}
        />
        {this.state.passwordError ? (
          <Text>{this.state.passwordError}</Text>
        ) : null}

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
    getLogInError: state.logInReducer.logInError,
    getToken: state.logInReducer.token,
    getActiveGroupStatus: state.groupReducer.getActiveGroupStatus
  };
};

// Redux Setter to use: this.props.(name of any return)
const mapDispatchToProps = dispatch => {
  return {
    logInSuccess: bool => dispatch(logInSuccess(bool)),
    logInUser: data => dispatch(logInUser(data)),
    logInUserError: error => dispatch(logInUserError(error))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogInForm);
