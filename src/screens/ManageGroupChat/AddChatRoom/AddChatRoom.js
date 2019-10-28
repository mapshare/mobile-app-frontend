// Import Libraries
import React, { Component } from "react"
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage, Keyboard, ImageBackground } from 'react-native';
import { Actions } from 'react-native-router-flux';
import AddChatRoomForm from '../../Forms/AddChatRoom/AddChatRoomForm'
// Componenets Style
import styles from "./Stylesheet"

// Creating Component
class AddChatRoom extends Component {

    render() {
        return (
            <View >
                <ImageBackground resizeMode="cover" style={styles.backgroundImage} source={require('../../../assests/images/logo.png')}>
                    <AddChatRoomForm type="AddChatRoomForm" style={styles.container} />
                </ImageBackground>
            </View>
        );
    }
}

export default AddChatRoom;