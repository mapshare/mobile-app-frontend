import React, { Component } from 'react';
import { AppRegistry,StyleSheet,Text ,View} from 'react-native';

// Import Libraries

import Login from "./src/screens/SignIn"

export default class signIn extends Component {

    render() {
        return (
            <Login />
        )
    }
}

AppRegistry.registerComponent('Login', () => signIn);