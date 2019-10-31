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
import { addGroupChatRoom, addGroupChatRoomError } from '../../../actions/groupChatRoomAction';

// Componenets Style
import styles from '../Stylesheet';

import validator from '../validate/validation_wrapper'

// Creating Component
class AddGroupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chatRoomName: '',
            groupChatRoomError: '',
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.getGroupChatRoomStatus !== this.props.getGroupChatRoomStatus) {
            if (this.props.getGroupChatRoomStatus) {
                Keyboard.dismiss();
                Actions.manageGroupChat();
            }
        }

        if (this.props.getGroupChatRoomError) {
            console.log(this.props.getGroupChatRoomError)
            alert(this.props.getGroupChatRoomError);
            this.props.addGroupChatRoomError("");
        }
    }

    createGroupChatRoom = async () => {
        const data = {
            token: this.props.token,
            groupId: this.props.getActiveGroupData._id,
            chatRoomName: this.state.chatRoomName,
        }
        this.props.addGroupChatRoom(data);
    };

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.inputBox}
                    onChangeText={ChatRoomName => this.setState({ chatRoomName: ChatRoomName })}
                    placeholder="Chat Room Name"
                    placeholderTextColor="rgba(225,225,225,0.7)"
                    selectionColor="#fff"
                    autoCorrect={false}
                    returnKeyType="next"
                    autoCapitalize="none"
                    onSubmitEditing={() => this.password.focus()}
                />
                {this.state.groupChatRoomError ? <Text>{this.state.groupChatRoomError}</Text> : null}

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText} onPress={this.createGroupChatRoom}>
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
        getGroupChatRoomStatus: state.groupChatRoomReducer.addGroupChatRoomStatus,
        getGroupChatRoomError: state.groupChatRoomReducer.addGroupChatRoomError,
        getActiveGroupData: state.groupReducer.getActiveGroupData,
        token: state.logInReducer.token
    };
};

// Redux Setter to use: this.props.(name of any return)
const mapDispatchToProps = dispatch => {
    return {
        addGroupChatRoom: data => dispatch(addGroupChatRoom(data)),
        addGroupChatRoomError: data => dispatch(addGroupChatRoomError(data))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AddGroupForm);
