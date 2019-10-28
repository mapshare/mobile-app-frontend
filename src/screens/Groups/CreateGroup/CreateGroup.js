// Import Libraries
import React, { Component } from "react"
import {View} from 'react-native';

import GroupForm from '../../Forms/CreateGroup//GroupForm'

// Componenets Style
import styles from "./Stylesheet"

// Creating Component
class CreateGroup extends Component {

    render() {
        return (
            <View >
                    <GroupForm type="GroupForm" style={styles.container} />
            </View>
        );
    }
}

export default CreateGroup;