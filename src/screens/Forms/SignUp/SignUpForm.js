// Import Libraries
import React, { Component } from "react"
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage, Keyboard} from 'react-native';
import {Actions} from 'react-native-router-flux';

// Creating Component
class LogInForm extends Component {
    constructor (props) {
        super(props);
        this.state = {
            fname: "",
            lname: "",
            email: "",
            password: ""
        }
    }
    saveData =async()=>{
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
                        // alert('Go in!');
                        Actions.Home()
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
                onChangeText={(FirstName) => this.setState({FirstName})} 
                placeholder="First Name"
                placeholderTextColor='rgba(225,225,225,0.7)'
                selectionColor="#fff"
                autoCorrect={false}
                returnKeyType="next"
                autoCapitalize="none"
                onSubmitEditing={()=> this.password.focus()}/>

                <TextInput style={styles.inputBox}
                onChangeText={(LastName) => this.setState({LastName})} 
                placeholder="Last Name"
                placeholderTextColor='rgba(225,225,225,0.7)'
                selectionColor="#fff"
                autoCorrect={false}
                returnKeyType="next"
                autoCapitalize="none"
                onSubmitEditing={()=> this.password.focus()}/>

                <TextInput style={styles.inputBox}
                onChangeText={(email) => this.setState({email})} 
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
                placeholder="Password"
                secureTextEntry={true}
                placeholderTextColor='rgba(225,225,225,0.7)'
                // returnKeyType="Login"
                ref={(input) => this.password = input}
                />

                <TouchableOpacity style={styles.button}> 
                    <Text style={styles.buttonText} onPress={this.saveData}>{this.props.type}</Text>
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
