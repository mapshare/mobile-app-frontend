import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import configureStore from './src/reduxStore/configureStore';
import SplashScreen from 'react-native-splash-screen'

// Import Libraries

import Routes from './src/navigation/Router/router';

const store = configureStore();

export default class signIn extends Component {

  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('Login', () => signIn);
