// Import Libraries
import React, { Component } from 'react';
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Keyboard,
} from 'react-native';

import { Actions } from 'react-native-router-flux';

// Componenets Style
import styles from '../Stylesheet';

// Creating Component
class CreateGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groupName: '',
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.status !== this.props.status) {
            if (this.props.status) {
                Keyboard.dismiss();
                Actions.manageGroup();
            }
        }

        if (this.props.getCreateGroupError) {
            console.log(this.props.getCreateGroupError)
            alert(this.props.getCreateGroupError);
            this.props.createGroupError("");
        }
    }

    createGroup = async () => {
        const data = {
          token: this.props.token,
          groupName: this.state.groupName,
        }
        alert("Group Created (WIP)")
    };

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.inputBox}
                    onChangeText={GroupName => this.setState({ groupName: GroupName })}
                    placeholder="Name"
                    placeholderTextColor="rgba(0,0,0,0.7)"
                    selectionColor="#fff"
                    autoCorrect={false}
                    returnKeyType="next"
                    autoCapitalize="none"
                    
                />
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText} onPress={this.createGroup}>
                        {this.props.type}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default CreateGroup;
