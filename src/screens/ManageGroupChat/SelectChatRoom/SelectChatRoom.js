// Import Libraries
import React, { Component } from "react"
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage, Keyboard, ImageBackground, FlatList } from 'react-native';
import { Actions } from 'react-native-router-flux';

import SearchChatRoom from '../../Forms/SearchChatRoom/SearchChatRoom';

// Componenets Style
import styles from "./Stylesheet"


//Redux actions
import { connect } from 'react-redux';
import {
    searchGroupChatRoom,
    searchGroupChatRoomSuccess,
    getActiveGroupChatRoom,
    getActiveGroupChatRoomSuccess,
    connectToGroupChatSuccess
} from '../../../actions/groupChatRoomAction';

function Item({ title }) {
    return (
        <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
}

// Creating Component
class SelectGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ""
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.searchGroupChatRoomStatus !== this.props.searchGroupChatRoomStatus) {
            if (this.props.searchGroupChatRoomStatus) {
                this.props.searchGroupChatRoomSuccess(false);
                this.setState({ data: this.props.searchGroupChatRoomData });
            }
        }

        if (prevProps.getActiveGroupChatRoomStatus !== this.props.getActiveGroupChatRoomStatus) {
            if (this.props.getActiveGroupChatRoomStatus) {
                Actions.pop();
            }
        }
    }


    setGroupChatRoom = (chatRoomId) => {
        const data = {
            token: this.props.token,
            groupId: this.props.getActiveGroupData._id,
            chatRoomId: chatRoomId
        }
        this.props.connectToGroupChatSuccess(false);
        this.props.getActiveGroupChatRoomSuccess(false);
        this.props.getActiveGroupChatRoom(data);
    };

    render() {
        return (
            <View >
                <ImageBackground resizeMode="cover" style={styles.backgroundImage} source={require('../../../assests/images/logo.png')}>
                    <SearchChatRoom type="SearchChatRoom" style={styles.container} />

                    <FlatList
                        data={this.state.data}
                        renderItem={(group) => {
                            return (
                                <TouchableOpacity style={styles.button} onPress={() => this.setGroupChatRoom(group.item._id)}>
                                    <Text style={styles.buttonText}>
                                        {group.item.chatRoomName}
                                    </Text>
                                </TouchableOpacity>
                            )
                        }
                        }
                        keyExtractor={item => item._id}
                    />
                </ImageBackground>
            </View>
        );
    }
}

// Redux Getter to use: this.props.(name of any return)
const mapStateToProps = state => {
    return {
        searchGroupChatRoomData: state.groupChatRoomReducer.searchGroupChatRoomData,
        searchGroupChatRoomStatus: state.groupChatRoomReducer.searchGroupChatRoomStatus,
        getActiveGroupChatRoomStatus: state.groupChatRoomReducer.getActiveGroupChatRoomStatus,
        getActiveGroupData: state.groupReducer.getActiveGroupData,
        getActiveGroupChatRoomData: state.groupChatRoomReducer.getActiveGroupChatRoomData,
        token: state.logInReducer.token
    };
};

// Redux Setter to use: this.props.(name of any return)
const mapDispatchToProps = dispatch => {
    return {
        searchGroupChatRoom: data => dispatch(searchGroupChatRoom(data)),
        searchGroupChatRoomSuccess: data => dispatch(searchGroupChatRoomSuccess(data)),
        getActiveGroupChatRoom: data => dispatch(getActiveGroupChatRoom(data)),
        getActiveGroupChatRoomSuccess: data => dispatch(getActiveGroupChatRoomSuccess(data)),
        connectToGroupChatSuccess: data => dispatch(connectToGroupChatSuccess(data)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SelectGroup);
