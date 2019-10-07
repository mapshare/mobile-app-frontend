// Import Libraries
import React, { Component } from "react"
import {View, Text, StyleSheet, ImageBackground, Image} from "react-native"
import SignInForm from './SignInFrom';

// Creating Component
class SignIn extends Component {
    render(){
        return (
            <View>
                <ImageBackground resizeMode = "cover" style = {styles.backgroundImage} source = {require('../../src/assests/images/logo.png')}>
                        <Text style={styles.title}>Welcome to Pin IT!{"\n"}{"\n"}</Text>
                        <Text style={styles.text}>(Please note that this is WIP apk)</Text>
                        <Text style={styles.text}>Current Build v0.06</Text>
                        <SignInForm style={styles.container}/>
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
    }
});

export default SignIn
