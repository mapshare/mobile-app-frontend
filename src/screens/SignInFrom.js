// Import Libraries
import React, { Component } from "react"
import { View, Text, TextInput, TouchableOpacity,StyleSheet} from 'react-native';
// Creating Component
class SignInForm extends Component {
    render(){
        return (
            <View style = {styles.container}>
                <TextInput style = {styles.input} autoCapitalize="none" onSubmitEditing={() => this.passwordInput.focus()} autoCorrect={false} keyboardType='email-address' returnKeyType="next" placeholder='Email' placeholderTextColor='rgba(225,225,225,0.7)'/>
                <TextInput style = {styles.input} returnKeyType="go" ref={(input)=> this.passwordInput = input} placeholder='Password' placeholderTextColor='rgba(225,225,225,0.7)' secureTextEntry/>
                <TouchableOpacity style = {styles.buttonContainer} onPress={this.handleLoginPress}>
                    <Text style = {styles.buttonText} >LOGIN</Text>    
                </TouchableOpacity> 
            </View>
        );
    }
}

handleLoginPress = () =>{
    console.log("Login Button Pressed")
}

// Componenets Style
const styles = StyleSheet.create({
    container: {
     padding: 20,
    },
    input:{
        height: 40,
        backgroundColor: 'rgba(225,225,225,0.2)',
        marginBottom: 10,
        padding: 10,
        color: '#fff'
    },
    buttonContainer:{
        backgroundColor: '#2980b6',
        paddingVertical: 15
    },
    buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    },
});

export default SignInForm
