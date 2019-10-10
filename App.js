import React, { Component } from 'react';
import { AppRegistry,StyleSheet,Text ,View} from 'react-native';

// Import Libraries

// import Login from "./src/screens/Login/Login"
// import SignUp from './src/screens/SignUp/SignUp';
import Routes from './src/navigation/router';

import { Router } from 'react-native-router-flux';


export default class signIn extends Component {

    render() {
        return ( 
            <Routes/>
        )
    }
}

AppRegistry.registerComponent('Login', () => signIn);