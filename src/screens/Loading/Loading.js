// Import Libraries
import React, { Component } from "react"
import { Text, View, TextInput, TouchableOpacity, AsyncStorage, Keyboard, ImageBackground } from "react-native"
import { Actions } from "react-native-router-flux";

// Creating Component
class Loading extends Component {
    render() {
        return (
            <View>
                <Text >Loading...</Text>
            </View>
        );
    }
}

export default Loading