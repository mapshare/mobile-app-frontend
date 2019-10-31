// Import Libraries
import React, { Component } from "react"
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage, Keyboard, ImageBackground } from 'react-native';
import { Actions } from 'react-native-router-flux';
import AddGroupForm from '../../Forms/AddGroup/AddGroupFrom'
// Componenets Style
import styles from "./Stylesheet"

// Creating Component
class AddGroup extends Component {

    render() {
        return (
            <View >
                <ImageBackground resizeMode="cover" style={styles.backgroundImage} source={require('../../../assests/images/logo.png')}>

                    <Text>Tester Page which allows you to manage groups</Text>
                    <AddGroupForm type="AddGroupForm" style={styles.container} />
                </ImageBackground>
            </View>
        );
    }
}

export default AddGroup;