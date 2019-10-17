import React, { Component } from 'react';
import { AppRegistry,StyleSheet,Text ,View} from 'react-native';

// Import Libraries

import Routes from './src/navigation/router';

export default class signIn extends Component {

    render() {
        return ( 
            <Routes/>
        )
    }
}

AppRegistry.registerComponent('Login', () => signIn);