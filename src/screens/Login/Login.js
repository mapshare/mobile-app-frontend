// Import Libraries
import React, { Component } from "react"
import {Text, View, TextInput, TouchableOpacity, AsyncStorage, Keyboard, ImageBackground} from "react-native"
import LogInForm from '../Forms/Login/LoginForm';
import { Actions } from "react-native-router-flux";

// Componenets Style
import styles from "./Stylesheet"

// Creating Component
class LogIn extends Component {

    signup() {
        Actions.signup()
    }


    render(){
        return (
            <View>
                <ImageBackground resizeMode = "cover" style = {styles.backgroundImage} source = {require('../../assests/images/logo.png')}>
                        <Text style={styles.title}>Welcome to Pin IT!{"\n"}{"\n"}</Text>
                        <Text style={styles.text}>(Please note that this is WIP apk)</Text>
                        <Text style={styles.text}>Current Build v2.22</Text>
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

export default LogIn
