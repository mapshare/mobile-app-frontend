// Import Libraries
import React, { Component } from "react"
import {StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage, Keyboard, ImageBackground} from "react-native"
import LogInForm from '../Forms/Login/LoginForm';
import { Actions } from "react-native-router-flux";

// Creating Component
class LogIn extends Component {

    signup() {
        Actions.signup()
    }

    render(){
        return (
            <View>
                <ImageBackground resizeMode = "cover" style = {styles.backgroundImage} source = {require('../../assests/images/logo.jpg')}>
                        <Text style={styles.title}>Welcome to Pin IT!{"\n"}{"\n"}</Text>
                        <Text style={styles.text}>(Please note that this is WIP apk)</Text>
                        <Text style={styles.text}>Current Build v0.06</Text>
                        <LogInForm type="Login" style={styles.container}/>
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

// Componenets Style
const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        textAlign: 'center',
        color: 'white',
        fontSize: 25
    },
    text: {
        textAlign: 'center',
        color: 'white',
        fontSize: 15
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        justifyContent: "center"
    },
    signupText: {
        textAlign: 'center',
        color: 'white', 
        fontSize:16,
      },
    signupButton: {
        textAlign: 'center',
        color: 'white',
        fontSize:16,
        fontWeight: '500',
    }
});

export default LogIn
