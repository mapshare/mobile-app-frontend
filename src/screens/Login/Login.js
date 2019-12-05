// Import Libraries
import React, { Component } from "react"
import {Text, View, TextInput, TouchableOpacity, AsyncStorage, Keyboard, ImageBackground} from "react-native"
import LogInForm from '../Forms/Login/LoginForm';
import { Actions, ActionConst } from "react-native-router-flux";

// Componenets Style
import styles from "./Stylesheet"

//Redux actions
import { connect } from 'react-redux';
import { logInUserWithToken } from '../../actions/logInActions'

// Creating Component
class LogIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount = async () => {
        this.props.logInUserWithToken();
    }

    signup() {
        Actions.signup()
    }

    render(){
        return (
            <View>
                <ImageBackground resizeMode = "cover" style = {styles.backgroundImage} source = {require('../../assests/images/logo.png')}>
                        <Text style={styles.title}>Welcome to Pin IT!</Text>
                        <Text style={styles.text}>(Please note that this is WIP apk)</Text>
                        <Text style={styles.text}>Current Build v4.24</Text>
                        <LogInForm type="Login" style={styles.container} />
                        <View>
                            <Text style={styles.signupText}>
                                Don't have an account yet?
                            </Text>
                            <TouchableOpacity onPress={this.signup}><Text style={styles.signupButton}>Signup</Text></TouchableOpacity>
                        </View>
                </ImageBackground>
            </View>
        );
    }
}

// Redux Getter to use: this.props.(name of any return)
const mapStateToProps = state => {
    return {
    };
};

// Redux Setter to use: this.props.(name of any return)
const mapDispatchToProps = dispatch => {
    return {
        logInUserWithToken: data => dispatch(logInUserWithToken(data)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LogIn);
