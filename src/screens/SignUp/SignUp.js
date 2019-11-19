// Import Libraries
import React, { Component } from "react"
import {StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage, Keyboard, ImageBackground} from "react-native"
import SignUpForm from '../Forms/SignUp/SignUpForm';
import { Actions } from "react-native-router-flux";

// Componenets Style
import styles from "./Stylesheet"

// Creating Component
class SignUp extends Component {

    goBack() {
        Actions.pop()
    }

    render(){
        return (
            <View>
                <ImageBackground resizeMode = "cover" style = {styles.backgroundImage} source = {require('../../assests/images/logo.png')}>
                        <Text style={styles.title}>Welcome to Pin IT!{"\n"}{"\n"}</Text>
                        <Text style={styles.text}>(Please note that this is WIP apk)</Text>
                        <Text style={styles.text}>Current Build v2.1</Text>

                        <SignUpForm type="Signup" style={styles.container}/>
                        <View>
                            <Text style={styles.signupText}>
                                Already have an account yet?
                            </Text>
                            <TouchableOpacity onPress={this.goBack}><Text style={styles.signupButton}>Sign in</Text></TouchableOpacity>
                        </View>
                </ImageBackground>
            </View>
        );
    }
}

export default SignUp
