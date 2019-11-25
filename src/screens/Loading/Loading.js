// Import Libraries
import React, { Component } from "react"
import { View } from 'react-native';
import {ImageBackground} from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';

// Componenets Style
import styles from "./Stylesheet";

export default class Loading extends Component {

    render() {
        console.log("HERE LOADING SCREEN")
        return (
            <View style={styles.container}>
                <Spinner
                   visible={true}
                   textContent={'Please wait...'}
                   textStyle={styles.spinnerTextStyle}>
<<<<<<< HEAD
                       
=======
>>>>>>> 78dbd0ac3b63a41e49b7d34de5f727da66a2210c
                   </Spinner>
            </View>
        )
    }
}