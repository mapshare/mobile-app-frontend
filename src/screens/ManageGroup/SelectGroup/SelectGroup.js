// Import Libraries
import React, { Component } from "react"
import { Modal, TouchableHighlight, StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage, Keyboard, ImageBackground, FlatList } from 'react-native';
import { Actions } from 'react-native-router-flux';

import SearchGroupForm from '../../Forms/SearchGroup/SearchGroupForm';

// Componenets Style
import styles from "./Stylesheet"


//Redux actions
import { connect } from 'react-redux';
import {
    searchGroup,
    searchGroupSuccess,
    getActiveGroup,
    getActiveGroupError,
    getActiveGroupSuccess,
    requestToJoinGroup,
    requestToJoinGroupSuccess
} from '../../../actions/groupActions';

// Creating Component
class SelectGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: "",
            modalVisible: false,
            requestedGroupToJoinName: "",
            requestedGroupToJoinId: "",
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.getSearchStatus !== this.props.getSearchStatus) {
            if (this.props.getSearchStatus) {
                this.props.setSearchStatus(false);
                this.setState({ data: this.props.getSearchData });
            }
        }


        if (prevProps.getActiveGroupStatus !== this.props.getActiveGroupStatus) {
            if (this.props.getActiveGroupStatus) {
                Actions.pop();
            }
        }

        if (this.props.activeGroupError) {
            this.setModalVisible(true);
            this.props.getActiveGroupError("");
        }
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    setGroup = (groupId, groupname) => {
        const data = {
            token: this.props.token,
            groupId: groupId,
        }
        this.props.getActiveGroupSuccess(false);
        this.props.getActiveGroup(data);
        this.setState({ requestedGroupToJoinName: groupname });
        this.setState({ requestedGroupToJoinId: groupId });
    };

    joinGroup() {
        const data = {
            token: this.props.token,
            groupId: this.state.requestedGroupToJoinId,
        }
        this.props.requestToJoinGroupSuccess(false);
        this.props.requestToJoinGroup(data);
        this.setModalVisible(!this.state.modalVisible)
    }

    render() {
        return (
            <View >
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <View style={{ marginTop: 22 }}>
                        <View>
                            <Text style={styles.buttonText}>Would you like to request to join group {this.state.requestedGroupToJoinName}?</Text>
                            <TouchableOpacity style={styles.button} onPress={() => this.joinGroup()}>
                                <Text style={styles.buttonText}>YES</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.button} onPress={() => this.setModalVisible(!this.state.modalVisible)}>
                                <Text style={styles.buttonText}>NO</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <ImageBackground resizeMode="cover" style={styles.backgroundImage} source={require('../../../assests/images/logo.png')}>
                    <SearchGroupForm type="SearchGroupForm" style={styles.container} />

                    <FlatList
                        data={this.state.data}
                        renderItem={(group) => {
                            return (
                                <TouchableOpacity style={styles.button} onPress={() => this.setGroup(group.item._id, group.item.groupName)}>
                                    <Text style={styles.buttonText}>
                                        {group.item.groupName}
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
        getSearchData: state.groupReducer.searchData,
        getSearchStatus: state.groupReducer.searchStatus,
        token: state.logInReducer.token,
        getActiveGroupStatus: state.groupReducer.getActiveGroupStatus,
        activeGroupError: state.groupReducer.getActiveGroupError,
        getRequestToJoinGroupStatus: state.groupReducer.getRequestToJoinGroupStatus,
    };
};

// Redux Setter to use: this.props.(name of any return)
const mapDispatchToProps = dispatch => {
    return {
        searchGroup: data => dispatch(searchGroup(data)),
        setSearchStatus: data => dispatch(searchGroupSuccess(data)),
        getActiveGroup: data => dispatch(getActiveGroup(data)),
        getActiveGroupSuccess: data => dispatch(getActiveGroupSuccess(data)),
        getActiveGroupError: data => dispatch(getActiveGroupError(data)),
        requestToJoinGroup: data => dispatch(requestToJoinGroup(data)),
        requestToJoinGroupSuccess: data => dispatch(requestToJoinGroupSuccess(data)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SelectGroup);
