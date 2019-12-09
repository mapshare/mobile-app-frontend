// Import Libraries
import React, { Component } from "react"
import { View } from 'react-native';
import {ImageBackground} from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';

// Componenets Style
import styles from "./Stylesheet";

export default class Loading extends Component {

    state = {
        visible: true,
    };

    render() {
        return (
            <View style={styles.container}>
                <Spinner
                   ref={Component => (this._loading = Component)}
                   visible={this.state.visible}
                   textContent={'Please wait...'}
                   textStyle={styles.spinnerTextStyle}>
                   </Spinner>
            </View>
        )
    }
}