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
            modalVisible: false,
            currentContentState: 1,
        };
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps) {
    }

    goMyGroupMenu() {
        this.props.getUserGroupsSuccess(false);
        this.props.getUserGroups({ token: this.props.token });
        Actions.groupsMenu();
    }
    render() {
        return (
            <View style={styles.container} >
                <TouchableOpacity onPress={() => this.goMyGroupMenu()}>
                    <Icon style={styles.menuButton} name="menu" size={30} />
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
