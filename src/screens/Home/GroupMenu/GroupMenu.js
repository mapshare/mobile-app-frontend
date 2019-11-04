import React, { Component } from "react";
import {
    Text,
    View,
    ImageBackground,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    Modal,
    FlatList,
} from "react-native";

import Icon from "react-native-vector-icons/SimpleLineIcons";

import SearchGroupForm from '../../Forms/SearchGroup/SearchGroupForm';
import AddGroupForm from '../../Forms/AddGroup/AddGroupFrom'

import AddGroup from './Menus/AddGroup'
import EditGroup from './Menus/EditGroup'
import JoinGroupRequest from './Menus/JoinGroupRequest'
import MyGroups from './Menus/MyGroups'
import SearchGroup from './Menus/SearchGroup'


//Redux actions
import { connect } from 'react-redux';
import {
    searchGroup,
    searchGroupSuccess,
    getActiveGroup,
    getActiveGroupError,
    getActiveGroupSuccess,
    requestToJoinGroup,
    requestToJoinGroupSuccess,
    getUserGroupsSuccess,
    getUserGroups,
    getActiveGroupDataSuccess,
} from '../../../actions/groupActions';

import {
    requestClearField,
    requestClearFieldSuccess
} from '../../../actions/SearchGroupFormAction';

import {
    currentContentSuccess,
    setCurrentContentState,
} from '../../../actions/GroupMenuAction';

// Componenets Style
import styles from "./Stylesheet";
import { Actions } from "react-native-router-flux";

// Group Menu
class GroupMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: true,
            currentContentState: 1,
        };
    }

    componentDidMount() {
        this.props.setCurrentContentState(1);
        this.props.getUserGroupsSuccess(false);
        this.props.getUserGroups({ token: this.props.token });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.currentContentStatus !== this.props.currentContentStatus) {
            if (this.props.currentContentStatus) {
                this.setState({ currentContentState: this.props.currentContentStateData });
                this.props.currentContentSuccess(false);
            }
        }

        if (prevProps.getUserGroupsStatus !== this.props.getUserGroupsStatus) {
            if (this.props.getUserGroupsStatus) {
                this.props.getUserGroupsSuccess(false);
                this.props.getUserGroups({ token: this.props.token });
            }
        }

        if (prevProps.onSearchFocusStatus !== this.props.onSearchFocusStatus) {
            if (this.props.onSearchFocusStatus) {
                this.props.setCurrentContentState(2);
            } else {
                if (!this.state.currentContentState == 3)
                    this.props.setCurrentContentState(1);
            }
        }
        // return to my groups after adding group
        if (prevProps.status !== this.props.status) {
            if (this.props.status) {
                this.props.setCurrentContentState(1);
                this.props.getUserGroupsSuccess(false);
            }
        }

        if (prevProps.getActiveGroupStatus !== this.props.getActiveGroupStatus) {
            if (this.props.getActiveGroupStatus) {
                this.setModalVisible(!this.state.modalVisible);
            }
        }

        if (prevProps.leaveGroupStatus !== this.props.leaveGroupStatus) {
            if (this.props.leaveGroupStatus) {
                this.clearActiveGroup();
                this.props.getUserGroupsSuccess(false);
            }
        }

        if (prevProps.deleteGroupStatus !== this.props.deleteGroupStatus) {
            if (this.props.deleteGroupStatus) {
                this.clearActiveGroup();
                this.props.getUserGroupsSuccess(false);
            }
        }
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
        this.props.setCurrentContentState(1);
    }

    separator = () => <View style={styles.flatListItemSeporator} />

    clearActiveGroup() {
        this.props.getActiveGroupSuccess(false);
        this.props.getActiveGroupDataSuccess("");
        this.props.getActiveGroupError("");
        this.props.setCurrentContentState(1);
    }

    controlContentArea(key) {
        switch (key) {
            case 1:
                // Return All Groups that the user is currently a member of
                return (<MyGroups />);
                break;

            case 2:
                // Return Search results
                return (<SearchGroup />);
                break;

            case 3:
                // Return Add Group Form
                return (<AddGroup />);
                break;

            case 4:
                // Return Edit Group Page
                return (<EditGroup />);
                break;

            case 5:
                // Return Manage Group Join Request
                return (<JoinGroupRequest />);
                break;

            default:
                break;
        }
    }


    controlNavArea(key) {
        switch (key) {
            case 1:
                // Return All Groups that the user is currently a member of
                return (
                    <View>
                        <TouchableOpacity style={styles.addGroup} onPress={() => this.props.setCurrentContentState(3)}>
                            <Icon style={styles.closeIcon} name="plus" size={30} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.closeButton} onPress={() => this.setModalVisible(!this.state.modalVisible)}>
                            <Icon style={styles.closeIcon} name="close" size={30} />
                        </TouchableOpacity>
                    </View>
                );
                break;

            case 2:
                // Return Search results
                return (
                    <View>
                        <TouchableOpacity style={styles.closeButton} onPress={() => {
                            this.props.setCurrentContentState(1)
                            Keyboard.dismiss();
                            this.props.requestClearFieldSuccess(false);
                            this.props.requestClearField(true);
                        }}>
                            <Icon style={styles.closeIcon} name="arrow-left-circle" size={30} />
                        </TouchableOpacity>
                    </View>
                );
                break;

            case 3:
                // Return Add Group Form
                return (
                    <View>
                        <TouchableOpacity style={styles.closeButton} onPress={() => {
                            this.props.setCurrentContentState(1)
                            Keyboard.dismiss();
                            this.props.requestClearFieldSuccess(false);
                            this.props.requestClearField(true);
                        }}>
                            <Icon style={styles.closeIcon} name="arrow-left-circle" size={30} />
                        </TouchableOpacity>
                    </View>
                );
                break;


            case 4:
                // Return Edit Group Page
                return (
                    <View>
                        <TouchableOpacity style={styles.closeButton} onPress={() => {
                            this.props.setCurrentContentState(1)
                            Keyboard.dismiss();
                            this.props.requestClearFieldSuccess(false);
                            this.props.requestClearField(true);
                        }}>
                            <Icon style={styles.closeIcon} name="arrow-left-circle" size={30} />
                        </TouchableOpacity>
                    </View>
                );
                break;

            case 5:
                // Return Manage GroupRequest
                return (
                    <View>
                        <TouchableOpacity style={styles.closeButton} onPress={() => {
                            this.props.setCurrentContentState(4)
                            Keyboard.dismiss();
                            this.props.requestClearFieldSuccess(false);
                            this.props.requestClearField(true);
                        }}>
                            <Icon style={styles.closeIcon} name="arrow-left-circle" size={30} />
                        </TouchableOpacity>
                    </View>
                );
                break;

            default:
                break;
        }
    }

    render() {
        return (
            <View style={styles.container} >
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.modalStyle}>

                            {this.controlNavArea(this.state.currentContentState)}
                            <View style={styles.content} >
                                {this.state.currentContentState != 3 &&
                                    this.state.currentContentState != 4 &&
                                    this.state.currentContentState != 5 &&
                                    <SearchGroupForm />}
                                {this.controlContentArea(this.state.currentContentState)}
                            </View>

                        </View>
                    </TouchableWithoutFeedback>
                </Modal>

                <TouchableOpacity onPress={() => this.setModalVisible(!this.state.modalVisible)}>
                    {!this.state.modalVisible &&
                        <Icon style={styles.menuButton} name="menu" size={30} />
                    }
                </TouchableOpacity>
            </View>
        );
    }
}

// Redux Getter to use: this.props.(name of any return)
const mapStateToProps = state => {
    return {
        status: state.groupReducer.status,
        getSearchData: state.groupReducer.searchData,
        getSearchStatus: state.groupReducer.searchStatus,
        token: state.logInReducer.token,
        getActiveGroupStatus: state.groupReducer.getActiveGroupStatus,
        getActiveGroupData: state.groupReducer.getActiveGroupData,
        activeGroupError: state.groupReducer.getActiveGroupError,
        getUserGroupsStatus: state.groupReducer.getUserGroupsStatus,
        getUserGroupsData: state.groupReducer.getUserGroupsData,
        leaveGroupStatus: state.groupReducer.leaveGroupStatus,
        getLeaveGroupError: state.groupReducer.leaveGroupError,
        deleteGroupStatus: state.groupReducer.deleteGroupStatus,
        getRequestToJoinGroupStatus: state.groupReducer.getRequestToJoinGroupStatus,
        onSearchFocusStatus: state.searchGroupFormReducer.onSearchFocusStatus,
        onAddGroupFormStatus: state.addGroupFormReducer.onAddGroupFormStatus,
        currentContentStateData: state.groupMenuReducer.currentContentStateData,
        currentContentStatus: state.groupMenuReducer.currentContentStatus,
    };
};

// Redux Setter to use: this.props.(name of any return)
const mapDispatchToProps = dispatch => {
    return {
        getActiveGroup: data => dispatch(getActiveGroup(data)),
        getActiveGroupSuccess: data => dispatch(getActiveGroupSuccess(data)),
        getActiveGroupDataSuccess: data => dispatch(getActiveGroupDataSuccess(data)),
        getActiveGroupError: data => dispatch(getActiveGroupError(data)),
        searchGroup: data => dispatch(searchGroup(data)),
        setSearchStatus: data => dispatch(searchGroupSuccess(data)),
        getActiveGroup: data => dispatch(getActiveGroup(data)),
        getActiveGroupSuccess: data => dispatch(getActiveGroupSuccess(data)),
        getActiveGroupError: data => dispatch(getActiveGroupError(data)),
        requestToJoinGroup: data => dispatch(requestToJoinGroup(data)),
        requestToJoinGroupSuccess: data => dispatch(requestToJoinGroupSuccess(data)),
        requestClearField: data => dispatch(requestClearField(data)),
        requestClearFieldSuccess: data => dispatch(requestClearFieldSuccess(data)),
        getUserGroupsSuccess: data => dispatch(getUserGroupsSuccess(data)),
        getUserGroups: data => dispatch(getUserGroups(data)),
        setCurrentContentState: data => dispatch(setCurrentContentState(data)),
        currentContentSuccess: data => dispatch(currentContentSuccess(data)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GroupMenu);
