// Import Libraries
import React, { Component } from "react"
import { Text, View, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';

// Componenets Style
import styles from "./Stylesheet"

import crtgrp from "../Groups/CreateGroup/CreateGroup"

// Creating Component
class Tester extends Component {

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

    goHome(){
        Actions.home()
    }

    goCreateGroup(){
        Actions.crtgrp()
    }

    render(){
        return (
            <View style = {styles.container}>

                <Text>This is just a Tester Page which Links different screens</Text>

                <TouchableOpacity style={styles.button}> 
                    <Text style={styles.buttonText} onPress={this.goHome}>Group Home</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}> 
                    <Text style={styles.buttonText} onPress={this.goEvents}>Group Events</Text>
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

                <TouchableOpacity style={styles.button}> 
                    <Text style={styles.buttonText} onPress={this.AlertMessage}>Group Search</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}> 
                    <Text style={styles.buttonText} onPress={this.AlertMessage}>Group Page</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}> 
                    <Text style={styles.buttonText} onPress={this.goCreateGroup}>Add/Create Group</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}> 
                    <Text style={styles.buttonText} onPress={this.AlertMessage}>Group Members</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}> 
                    <Text style={styles.buttonText} onPress={this.AlertMessage}>Create Chat Room</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}> 
                    <Text style={styles.buttonText} onPress={this.AlertMessage}>Join Chat Room</Text>
                </TouchableOpacity>

            </View>
        );
    }
}

export default Tester