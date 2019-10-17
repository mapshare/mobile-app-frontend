// Import Libraries
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Keyboard,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

//Redux actions
import {logInUser, logInSuccess} from '../../../actions/logInActions';

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

  LoginUser = async () => {
    try {
      let response = await fetch(
        'http://myvmlab.senecacollege.ca:6556/api/login',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userEmail: this.state.email,
            userPassword: this.state.password,
          }),
        },
      );
      let token = await response.headers.get('authentication');
      if (token) {
        Keyboard.dismiss();
        alert(
          'You successfully LogedIn. Email: ' +
            this.state.email +
            ' password: ' +
            this.state.password +
            ' token: ' +
            token,
        );
        Actions.home();
      } else {
        throw 'Incorrect Login Credentials.';
      }
    } catch (error) {
      alert('Failed to login user: ' + error);
    }
  };

  SaveData = async () => {
    const {email, password} = this.state;

    //save data with asyncstorage
    let loginDetails = {
      email: email,
      password: password,
    };

    if (this.props.type !== 'Login') {
      AsyncStorage.setItem('loginDetails', JSON.stringify(loginDetails));

      Keyboard.dismiss();
      alert(
        'You successfully registered. Email: ' +
          email +
          ' password: ' +
          password,
      );
      Actions.login();
    } else if (this.props.type == 'Login') {
      try {
        let loginDetails = await AsyncStorage.getItem('loginDetails');
        let ld = JSON.parse(loginDetails);

        if (ld.email != null && ld.password != null) {
          if (ld.email == email && ld.password == password) {
            alert('BackEnd Server Connection Error');
          } else {
            alert('Email and Password does not exist!');
          }
        }
      } catch (error) {
        alert(error);
      }
    }
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
          onChangeText={email => this.setState({email})}
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
          onChangeText={password => this.setState({password})}
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

export default LogInForm;
