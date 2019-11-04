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
    deleteGroup,
    deleteGroupError,
    deleteGroupSuccess,
    leaveGroup,
    leaveGroupError,
    leaveGroupSuccess,
} from '../../../../actions/groupActions';

import {
    requestClearField
} from '../../../../actions/SearchGroupFormAction';

import {
    currentContentSuccess,
    setCurrentContentState,
    currentEditingGroupIdSuccess,
    setCurrentEditingGroupId,
} from '../../../../actions/GroupMenuAction';

// Componenets Style
import styles from "../Stylesheet";
import { Actions } from "react-native-router-flux";

// Group Menu
class EditGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editingGroupId: "",
        };
    }

    componentDidMount() {
        if (this.props.currentEditingGroupIdStatus) {
            this.setState({ editingGroupId: this.props.currentEditingGroupIdData })
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.currentEditingGroupIdStatus !== this.props.currentEditingGroupIdStatus) {
            if (this.props.currentEditingGroupIdStatus) {
                this.setState({ editingGroupId: this.props.currentEditingGroupIdData })
            }
        }
    }

    leaveGroup() {
        const data = {
            token: this.props.token,
            groupId: this.state.editingGroupId,
        }
        this.props.leaveGroupSuccess(false);
        this.props.leaveGroup(data);
    }

    deleteGroup() {
        const data = {
            token: this.props.token,
            groupId: this.state.editingGroupId,
        }
        this.props.deleteGroupSuccess(false);
        this.props.deleteGroup(data);
    }

    manageGroupJoinRequests() {
        this.props.setCurrentContentState(5);
    }

    render() {
        return (
            <View >
                <Text style={styles.textBox}>Edit Group:</Text>

                <View>
                    <View style={styles.flatListItemSeporator} />

                    <TouchableOpacity style={styles.editGroupOptions} onPress={() => this.manageGroupJoinRequests()}>
                        <Text style={styles.textBox} >Group Join Requests</Text>
                    </TouchableOpacity>

                    <View style={styles.flatListItemSeporator} />

                    <TouchableOpacity style={styles.editGroupOptions} onPress={() => this.leaveGroup()}>
                        <Text style={styles.textBox} >Leave Group</Text>
                    </TouchableOpacity>

                    <View style={styles.flatListItemSeporator} />

                    <TouchableOpacity style={styles.editGroupOptions} onPress={() => this.deleteGroup()}>
                        <Text style={styles.textBox} >Delete Group</Text>
                    </TouchableOpacity>

                    <View style={styles.flatListItemSeporator} />
                </View>
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
        getActiveGroupData: state.groupReducer.getActiveGroupData,
        activeGroupError: state.groupReducer.getActiveGroupError,
        getUserGroupsStatus: state.groupReducer.getUserGroupsStatus,
        getUserGroupsData: state.groupReducer.getUserGroupsData,
        getRequestToJoinGroupStatus: state.groupReducer.getRequestToJoinGroupStatus,
        onSearchFocusStatus: state.searchGroupFormReducer.onSearchFocusStatus,
        onAddGroupFormStatus: state.addGroupFormReducer.onAddGroupFormStatus,
        currentContentStateData: state.groupMenuReducer.currentContentStateData,
        currentContentStatus: state.groupMenuReducer.currentContentStatus,
        currentEditingGroupIdStatus: state.groupMenuReducer.currentEditingGroupIdStatus,
        currentEditingGroupIdData: state.groupMenuReducer.currentEditingGroupIdData,
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
        requestClearField: data => dispatch(requestClearField(data)),
        getUserGroupsSuccess: data => dispatch(getUserGroupsSuccess(data)),
        getUserGroups: data => dispatch(getUserGroups(data)),
        setCurrentContentState: data => dispatch(setCurrentContentState(data)),
        currentContentSuccess: data => dispatch(currentContentSuccess(data)),
        setCurrentEditingGroupId: data => dispatch(setCurrentEditingGroupId(data)),
        currentEditingGroupIdSuccess: data => dispatch(currentEditingGroupIdSuccess(data)),
        leaveGroup: data => dispatch(leaveGroup(data)),
        leaveGroupSuccess: data => dispatch(leaveGroupSuccess(data)),
        leaveGroupError: data => dispatch(leaveGroupError(data)),
        deleteGroup: data => dispatch(deleteGroup(data)),
        deleteGroupSuccess: data => dispatch(deleteGroupSuccess(data)),
        deleteGroupError: data => dispatch(deleteGroupError(data)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditGroup);
