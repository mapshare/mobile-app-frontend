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
    ScrollView,
    SafeAreaView
} from "react-native";

import Icon from "react-native-vector-icons/SimpleLineIcons";

import SearchGroupForm from '../../../Forms/SearchGroup/SearchGroupFormDummy';

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
    getGroupsSuccess,
    getGroups
} from '../../../../actions/groupActions';

import {
    requestClearField
} from '../../../../actions/SearchGroupFormAction';

import {
    currentContentSuccess,
    setCurrentContentState,
    currentEditingGroupStatus,
    currentEditingGroupData,
    setCurrentEditingGroup,
} from '../../../../actions/GroupMenuAction';

// Componenets Style
import styles from "../Stylesheet";
import { Actions, ActionConst } from "react-native-router-flux";

// Group Menu
class MyGroups extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userGroups: "",
            groupName: '',
            interval: '',
        };
    }

    componentDidMount() {
        this.props.getUserGroupsSuccess(false);
        this.props.getUserGroups({ token: this.props.token });
        // update active group and user group every 10 seconds
        this.setState({
            interval: setInterval(() => {
                this.props.getGroupsSuccess(false);
                this.props.getUserGroups({ token: this.props.token });
                this.props.getGroups({ token: this.props.token });
            }, 10000)
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.interval);
    }

    separator = () => <View style={styles.flatListItemSeporator} />

    showMyGroups() {
        let activeGroupId = "";
        if (this.props.getActiveGroupData != undefined) {
            activeGroupId = this.props.getActiveGroupData._id;
        }
        return (
            <FlatList
                ItemSeparatorComponent={this.separator}
                data={this.props.getUserGroupsData}
                renderItem={(group) => {
                    return (
                        <TouchableOpacity style={styles.flatListItem} onPress={() => this.setGroup(group.item._id, group.item.groupName)}>

                            <View style={styles.flatListColOne}>
                                {activeGroupId == group.item._id &&
                                    <Icon style={styles.activeGroupIcon} name="arrow-right" size={20} />
                                }
                            </View>
                            <View style={styles.flatListColTwo}>
                                <Text style={[styles.flatListItemText, (activeGroupId == group.item._id) ? styles.activeGroupColour : ""]}>
                                    {group.item.groupName}
                                </Text>
                                <Text style={[styles.textBoxSmall, (activeGroupId == group.item._id) ? styles.activeGroupColour : ""]}>
                                    Owner: {group.item.createdBy.userFirstName + " " + group.item.createdBy.userLastName}
                                </Text>
                            </View>

                            <View style={styles.flatListColThree}>
                                <TouchableOpacity style={styles.editGroupIconPadding} onPress={() => this.editGroup(group.item)}>
                                    <Icon style={styles.editGroupIcon} name="note" size={30} />
                                </TouchableOpacity>
                            </View>

                        </TouchableOpacity>
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
        this.props.getActiveGroup(data);
        this.props.getActiveGroupSuccess(false);
    }

    editGroup = async (group) => {
        this.props.currentEditingGroupStatus(false);
        this.props.setCurrentEditingGroup(group);
        Actions.editGroupMenu({ currentEditingGroup: group });
    }

    render() {
        return (
            <View style={styles.modalStyle}>
                <View>
                    <TouchableOpacity style={styles.addGroup} onPress={() => Actions.addGroupMenu()}>
                        <Icon style={styles.closeIcon} name="plus" size={30} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.closeButton} onPress={() => {
                        Actions.pop();
                    }}>
                        <Icon style={styles.closeIcon} name="close" size={30} />
                    </TouchableOpacity>
                </View>
                <SafeAreaView style={[styles.content, { flex: 1 }]} >
                    <TouchableWithoutFeedback onPress={() => Actions.searchGroupMenu()}>
                        <View>
                            <SearchGroupForm enabled={false} keyboardEnabled={false} />
                        </View>
                    </TouchableWithoutFeedback>
                    <Text style={styles.textBox}>My Groups:</Text>
                    <View style={styles.flatListItemSeporator} />
                    {this.showMyGroups()}
                    <View style={styles.flatListItemSeporator} />
                </SafeAreaView>
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
        getCurrentEditingGroupStatus: state.groupMenuReducer.currentEditingGroupStatus,
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
        currentEditingGroupStatus: data => dispatch(currentEditingGroupStatus(data)),
        currentEditingGroupData: data => dispatch(currentEditingGroupData(data)),
        setCurrentEditingGroup: data => dispatch(setCurrentEditingGroup(data)),
        getGroupsSuccess: data => dispatch(getGroupsSuccess(data)),
        getGroups: data => dispatch(getGroups(data)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyGroups);
