// Import Libraries
import React, { Component } from "react"
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage, Keyboard} from 'react-native';
import {Actions} from 'react-native-router-flux';
import axios from 'axios';

// Creating Component
class LogInForm extends Component {
    constructor (props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }

    LoginUser = () => {

        fetch("http://myvmlab.senecacollege.ca:10034/login", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
                body: JSON.stringify({
                    userEmail: this.state.email,
                    userPassword: this.state.password,
                })
        })
        .then((response) => response.text())
        .then((res) => {


            console.log(res.status)
            // If our response is true
            if (res.success == true) {
                var email = res.message;
                // Storing Email Address
                AsyncStorage.setItem('email', email);

                // Redirecting to Home Page
                Actions.Home();

            // If login fail. Show error message    
            } else {
                alert(res.message)
            }
        }).catch((error) => {
            console.error(error);
        })
        .done()
        

    }

    SaveData =async()=>{
        const {email,password} = this.state;
 
        //save data with asyncstorage
        let loginDetails={
            email: email,
            password: password
        }
 
        if(this.props.type !== 'Login')
        {
            AsyncStorage.setItem('loginDetails', JSON.stringify(loginDetails));
 
            Keyboard.dismiss();
            alert("You successfully registered. Email: " + email + ' password: ' + password);
            Actions.login()          
        }
        else if(this.props.type == 'Login')
        {
            try{
                let loginDetails = await AsyncStorage.getItem('loginDetails');
                let ld = JSON.parse(loginDetails);
 
                if (ld.email != null && ld.password != null)
                {
                    if (ld.email == email && ld.password == password)
                    {
                        alert('Go in!');
                    }
                    else
                    {
                        alert('Email and Password does not exist!');
                    }
                }
 
            }catch(error)
            {
                alert(error);
            }
        }
    }
 
    showData = async()=>{
        let loginDetails = await AsyncStorage.getItem('loginDetails');
        let ld = JSON.parse(loginDetails);
        alert('email: '+ ld.email + ' ' + 'password: ' + ld.password);
    }

    render(){
        return (
            <View style = {styles.container}>

                <TextInput style={styles.inputBox}
                onChangeText={(email) => this.setState({email})} 
                value={this.state.email}
                placeholder="Email"
                placeholderTextColor='rgba(225,225,225,0.7)'
                selectionColor="#fff"
                autoCorrect={false}
                returnKeyType="next"
                keyboardType="email-address"
                autoCapitalize="none"
                onSubmitEditing={()=> this.password.focus()}/>

                <TextInput style={styles.inputBox}
                onChangeText={(password) => this.setState({password})}
                value={this.state.password}  
                placeholder="Password"
                secureTextEntry={true}
                placeholderTextColor='rgba(225,225,225,0.7)'
                // returnKeyType="Login"
                ref={(input) => this.password = input}
                />

                <TouchableOpacity style={styles.button}> 
                    <Text style={styles.buttonText} onPress={this.LoginUser}>{this.props.type}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

// Componenets Style
const styles = StyleSheet.create({
    container: {
     padding: 20,
    },
    inputBox:{
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
        backgroundColor: '#2980b6',
        paddingVertical: 12,
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    },
    Text: {
        textAlign: 'center'
    }
});

export default LogInForm
