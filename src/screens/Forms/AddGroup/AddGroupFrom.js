// Import Libraries
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    AsyncStorage,
    Keyboard,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

//Redux actions
import { createGroup, createGroupSuccess, createGroupError } from '../../../actions/groupActions';

// Componenets Style
import styles from '../Stylesheet';

import validator from '../validate/validation_wrapper'

// Creating Component
class AddGroupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groupName: '',
            createGroupError: '',
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
        this.props.createGroup(data);
    };

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.inputBox}
                    onChangeText={GroupName => this.setState({ groupName: GroupName })}
                    placeholder="Group Name"
                    placeholderTextColor="rgba(225,225,225,0.7)"
                    selectionColor="#fff"
                    autoCorrect={false}
                    returnKeyType="next"
                    autoCapitalize="none"
                    onSubmitEditing={() => this.password.focus()}
                />
                {this.state.createGroupError ? <Text>{this.state.createGroupError}</Text> : null}

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText} onPress={this.createGroup}>
                        {this.props.type}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

// Redux Getter to use: this.props.(name of any return)
const mapStateToProps = state => {
    return {
        status: state.groupReducer.status,
        groupData: state.groupReducer.groupData,
        getCreateGroupError: state.groupReducer.createGroupError,
        token: state.logInReducer.token
    };
};

// Redux Setter to use: this.props.(name of any return)
const mapDispatchToProps = dispatch => {
    return {
        createGroup: data => dispatch(createGroup(data)),
        createGroupError: data => dispatch(createGroupError(data))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AddGroupForm);
