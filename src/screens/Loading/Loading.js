// Import Libraries
import React, { Component } from "react"
import { Text, View, TextInput, TouchableOpacity, AsyncStorage, Keyboard, ImageBackground } from "react-native"
import { Actions } from "react-native-router-flux";

// Creating Component
class Loading extends Component {
    render() {
        console.log("HERE LOADING SCREEN")
        return (
            <View style={{
                backgroundColor: "#F00",
                flex: 1,
                width: "100%",
                height: "100%",
                top:0,
                position:"absolute"
            }}>
                <Text style={{
                    color:"#000"
                }} >Loading...</Text>
            </View>
        );
    }
}

export default Loading