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
import {registerUser, registerSuccess} from '../../../actions/registerActions';

// Componenets Style
import styles from '../Stylesheet';

// Creating Component
class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: '',
      lname: '',
      email: '',
      password: '',
    };
  }

  register = async () => {
    try {
      let response = await fetch(
        'http://myvmlab.senecacollege.ca:6556/api/register',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userEmail: this.state.email,
            userPassword: this.state.password,
            userFirstName: this.state.FirstName,
            userLastName: this.state.LastName,
          }),
        },
      );
      let responseJson = await response.json();
      if (responseJson.success == true) {
        Keyboard.dismiss();
        alert(
          'You successfully registered. Email: ' +
            this.state.email +
            ' password: ' +
            this.state.password,
        );
        Actions.login();
      } else {
        throw 'Could not register user.';
      }
    } catch (error) {
      alert('Failed to register user: ' + error);
    }
  };

  saveData = async () => {
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
            // alert('Go in!');
            Actions.Home();
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
          onChangeText={FirstName => this.setState({FirstName})}
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
          onChangeText={LastName => this.setState({LastName})}
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
          onChangeText={email => this.setState({email})}
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
    logInStatus: state.registerReducer.status,
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
