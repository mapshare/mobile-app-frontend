import React, { Component } from 'react';
import { AppRegistry,StyleSheet,Text ,View} from 'react-native';

// Import Libraries

import Login from "./src/screens/SignIn"

export default class signIn extends Component {
    state = {
        signIn: false,
        checkedSignIn: false
    }

    componentDidMount() {
        isSignedIn().then(res => this.setState({signIn: res, checkedSignIn: true})).catch(() => alert ("Error checking/setting signIn Status"))
    }

    render() {
        return (
            <Login />
        )
    }
}

AppRegistry.registerComponent('Login', () => signIn);