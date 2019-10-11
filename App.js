import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import configureStore from './src/reduxStore/configureStore';

// Import Libraries

// import Login from "./src/screens/Login/Login"
// import SignUp from './src/screens/SignUp/SignUp';
import Routes from './src/navigation/router';

const store = configureStore();

export default class signIn extends Component {
  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('Login', () => signIn);
