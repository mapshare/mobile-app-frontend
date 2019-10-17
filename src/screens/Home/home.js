// Import Libraries
import React, { Component } from "react"
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage, Keyboard} from 'react-native';
import {Actions} from 'react-native-router-flux';

// Componenets Style
import styles from "./Stylesheet"

// Creating Component
class Home extends Component {

    AlertMessage() {
        alert("WIP")
    }

    goEvents() {
        Actions.events()
    }

    goMap() {
        Actions.map()
    }

    goChat() {
        Actions.chat()
    }

    goProfile() {
        Actions.profile()
    }

    render(){
        return (
            <View style = {styles.container}>

                <Text>This is just a Tester Page which Links different screens</Text>

                <TouchableOpacity style={styles.button}> 
                    <Text style={styles.buttonText} onPress={this.goEvents}>Events</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}> 
                    <Text style={styles.buttonText} onPress={this.goMap}>Map</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}> 
                    <Text style={styles.buttonText} onPress={this.goProfile}>Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}> 
                    <Text style={styles.buttonText} onPress={this.goChat}>Group Chat</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}> 
                    <Text style={styles.buttonText} onPress={this.AlertMessage}>Group Feed</Text>
                </TouchableOpacity>

            </View>
        );
    }
}

export default Home