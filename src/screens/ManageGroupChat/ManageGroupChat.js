// Import Libraries
import React, { Component } from "react"
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage, Keyboard } from 'react-native';
import { Actions } from 'react-native-router-flux';

// Componenets Style
import styles from "./Stylesheet"

//Redux actions
import { connect } from 'react-redux';
import {
} from '../../actions/groupActions';

// Creating Component
class ManageGroupChat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeChatRoom: "None"
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.getActiveGroupChatRoomStatus !== this.props.getActiveGroupChatRoomStatus) {
            if (this.props.getActiveGroupChatRoomStatus) {
                this.setState({ activeChatRoom: this.props.getActiveGroupChatRoomData.chatRoomName });
            }
        }
    }

    goAddChat() {
        Actions.addChatRoom()
    }
    
    goSelectChat() {
        Actions.selectChatRoom()
    }

    goGroupChat() {
        Actions.groupChat()
    }

    render() {
        return (
            <View style={styles.container}>

                <Text>This is just a Tester Page which allows you to manage groups</Text>

                <Text>Active Chat Room: {this.state.activeChatRoom}</Text>


                <TouchableOpacity style={styles.button}> 
                    <Text style={styles.buttonText} onPress={this.goAddChat}>Add Chat Room</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}> 
                    <Text style={styles.buttonText} onPress={this.goSelectChat}>Select Chat Room</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}> 
                    <Text style={styles.buttonText} onPress={this.goGroupChat}>Group Chat</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

// Redux Getter to use: this.props.(name of any return)
const mapStateToProps = state => {
    return {
        getActiveGroupChatRoomData: state.groupChatRoomReducer.getActiveGroupChatRoomData,
        getActiveGroupChatRoomStatus: state.groupChatRoomReducer.getActiveGroupChatRoomStatus,
        token: state.logInReducer.token
    };
};

// Redux Setter to use: this.props.(name of any return)
const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ManageGroupChat);
