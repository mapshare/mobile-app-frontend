// Import Libraries
import React, { Component } from "react"
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage, Keyboard } from 'react-native';
import { Actions } from 'react-native-router-flux';

// Componenets Style
import styles from "./SelectGroup/Stylesheet"

// Creating Component
class ManageGroup extends Component {

    
    goAddGroup() {
        Actions.addGroup()
    }
    
    goSelectGroup() {
        Actions.selectGroup()
    }

    render() {
        return (
            <View style={styles.container}>

                <Text>This is just a Tester Page which allows you to manage groups</Text>

                <TouchableOpacity style={styles.button}> 
                    <Text style={styles.buttonText} onPress={this.goAddGroup}>Add Group</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}> 
                    <Text style={styles.buttonText} onPress={this.goSelectGroup}>Select Group</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default ManageGroup;