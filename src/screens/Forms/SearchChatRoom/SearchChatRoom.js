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
import { searchGroupChatRoom, searchGroupChatRoomError } from '../../../actions/groupChatRoomAction';

// Componenets Style
import styles from '../Stylesheet';

import validator from '../validate/validation_wrapper'

// Creating Component
class SearchGroupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groupName: '',
            searchGroupChatRoomError: '',
        };
    }

    componentDidMount(){
        this.searchGroupChatRoom();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.getSearchGroupChatRoomStatus !== this.props.getSearchGroupChatRoomStatus) {
            if (this.props.getSearchGroupChatRoomStatus) {
                Keyboard.dismiss();
            }
        }

        if (this.props.getSearchGroupChatRoomError) {
            console.log(this.props.getSearchGroupChatRoomError)
            alert(this.props.getSearchGroupChatRoomError);
            this.props.searchGroupChatRoomError("");
        }
    }

    searchGroupChatRoom = async () => {
        const data = {
          token: this.props.token,
          groupId: this.props.getActiveGroupData._id,
          chatRoomName: this.state.chatRoomName,
        }
        this.props.searchGroupChatRoom(data);
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
                {this.state.searchGroupError ? <Text>{this.state.searchGroupError}</Text> : null}

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText} onPress={this.searchGroupChatRoom}>
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
        getSearchGroupChatRoomStatus: state.groupChatRoomReducer.searchGroupChatRoomStatus,
        getSearchGroupChatRoomError: state.groupChatRoomReducer.searchGroupChatRoomError,
        getActiveGroupData: state.groupReducer.getActiveGroupData,
        token: state.logInReducer.token
    };
};

// Redux Setter to use: this.props.(name of any return)
const mapDispatchToProps = dispatch => {
    return {
        searchGroupChatRoom: data => dispatch(searchGroupChatRoom(data)),
        searchGroupChatRoomError: data => dispatch(searchGroupChatRoomError(data))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SearchGroupForm);
