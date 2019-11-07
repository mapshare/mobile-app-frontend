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

import SearchGroupForm from '../../../Forms/SearchGroup/SearchGroupForm';
import AddGroupForm from '../../../Forms/AddGroup/AddGroupFrom'

//Redux actions
import { connect } from 'react-redux';
import {
    searchGroup,
    searchGroupSuccess,
    getActiveGroup,
    getActiveGroupError,
    getActiveGroupSuccess,
    getActiveGroupDataSuccess,
    requestToJoinGroup,
    requestToJoinGroupSuccess,
    getUserGroupsSuccess,
    getUserGroups,
    getAllGroupMember,
    getAllGroupMemberSuccess
} from '../../../../actions/groupActions';

import {
    requestClearField
} from '../../../../actions/SearchGroupFormAction';

import {
    currentContentSuccess,
    setCurrentContentState,
    currentEditingGroupIdStatus,
    currentEditingGroupIdData,
    setCurrentEditingGroupId,
    currentEditingGroupIdSuccess
} from '../../../../actions/GroupMenuAction';

// Componenets Style
import styles from "../Stylesheet";
import { Actions, ActionConst } from "react-native-router-flux";

// Group Menu
class MyGroups extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: "",
            groupName: '',
            interval: '',
        };
    }

    componentDidMount() {
        this.props.getAllGroupMemberSuccess(false);
    }


    componentDidUpdate(prevProps) {
        if (prevProps.getAllGroupMemberStatus !== this.props.getAllGroupMemberStatus) {
            if (this.props.getAllGroupMemberStatus) {
                this.setState({ data: this.props.getAllGroupMemberData });
            } else {
                const data = {
                    token: this.props.token,
                    groupId: this.props.getActiveGroupData._id,
                }
                this.props.getAllGroupMember(data);
                this.props.getUserGroupsSuccess(false);
            }
        }
    }

    separator = () => <View style={styles.flatListItemSeporator} />

    showGroupMembers() {
        let activeGroupId = "";
        if (this.props.getActiveGroupData != undefined) {
            activeGroupId = this.props.getActiveGroupData._id;
        }
        return (
            <FlatList
                ItemSeparatorComponent={this.separator}
                data={this.state.data}
                renderItem={(group) => {
                    return (
                        <TouchableOpacity style={styles.flatListItem} onPress={() => this.setGroup(group.item._id, group.item.groupName)}>

                            <View style={styles.flatListColOneWide}>
                                <Text style={styles.textBoxRoles}>
                                    {group.item.groupMemberRole.groupRoleName}
                                    </Text>
                            </View>
                            <View style={styles.flatListColTwoSmall}>
                                <Text style={[styles.flatListItemText, (activeGroupId == group.item._id) ? styles.activeGroupColour : ""]}>
                                    {group.item.userFirstName + " " + group.item.userLastName}
                                </Text>
                            </View>

                            <View style={styles.flatListColThree}>
                                {!group.item.isAdmin &&
                                    <TouchableOpacity onPress={() => this.editGroup(group.item._id)}>
                                        <Icon style={styles.editGroupIcon} name="note" size={30} />
                                    </TouchableOpacity>}
                            </View>

                        </TouchableOpacity >
                    )
                }
                }
                keyExtractor={item => item._id}
            />
        );
    }

    setGroup = (groupId, groupname) => {
        const data = {
            token: this.props.token,
            groupId: groupId,
        }
        this.props.getActiveGroupSuccess(false);
        this.props.getActiveGroup(data);
    }

    editGroup(groupId) {
        Actions.editGroupMenu();
        this.props.currentEditingGroupIdSuccess(false);
        this.props.setCurrentEditingGroupId(groupId);
    }

    render() {
        return (
            <View style={styles.modalStyle}>
                <View>
                    <TouchableOpacity style={styles.closeButton} onPress={() => Actions.pop()}>
                        <Icon style={styles.closeIcon} name="arrow-left-circle" size={30} />
                    </TouchableOpacity>
                </View>
                <View style={styles.content} >
                    <Text style={styles.textBox}>Members:</Text>
                    <View style={styles.flatListItemSeporator} />
                    {this.showGroupMembers()}
                    <View style={styles.flatListItemSeporator} />
                </View>
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
        getRequestToJoinGroupStatus: state.groupReducer.getRequestToJoinGroupStatus,
        onSearchFocusStatus: state.searchGroupFormReducer.onSearchFocusStatus,
        onAddGroupFormStatus: state.addGroupFormReducer.onAddGroupFormStatus,
        leaveGroupStatus: state.groupReducer.leaveGroupStatus,
        getLeaveGroupError: state.groupReducer.leaveGroupError,
        deleteGroupStatus: state.groupReducer.deleteGroupStatus,
        getCurrentEditingGroupIdData: state.groupMenuReducer.currentEditingGroupIdData,
        getAllGroupMemberStatus: state.groupReducer.getAllGroupMemberStatus,
        getAllGroupMemberData: state.groupReducer.getAllGroupMemberData,
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
        getActiveGroupDataSuccess: data => dispatch(getActiveGroupDataSuccess(data)),
        requestToJoinGroup: data => dispatch(requestToJoinGroup(data)),
        requestToJoinGroupSuccess: data => dispatch(requestToJoinGroupSuccess(data)),
        requestClearField: data => dispatch(requestClearField(data)),
        getUserGroupsSuccess: data => dispatch(getUserGroupsSuccess(data)),
        getUserGroups: data => dispatch(getUserGroups(data)),
        setCurrentContentState: data => dispatch(setCurrentContentState(data)),
        currentContentSuccess: data => dispatch(currentContentSuccess(data)),
        currentEditingGroupIdSuccess: data => dispatch(currentEditingGroupIdSuccess(data)),
        currentEditingGroupIdData: data => dispatch(currentEditingGroupIdData(data)),
        setCurrentEditingGroupId: data => dispatch(setCurrentEditingGroupId(data)),
        getAllGroupMember: data => dispatch(getAllGroupMember(data)),
        getAllGroupMemberSuccess: data => dispatch(getAllGroupMemberSuccess(data)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyGroups);
