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
    requestToJoinGroup,
    requestToJoinGroupSuccess,
    getUserGroupsSuccess,
    getUserGroups
} from '../../../../actions/groupActions';

import {
    requestClearField
} from '../../../../actions/SearchGroupFormAction';

import {
    currentContentSuccess,
    setCurrentContentState,
    currentEditingGroupIdStatus,
    currentEditingGroupIdData,
    setCurrentEditingGroupId
} from '../../../../actions/GroupMenuAction';

// Componenets Style
import styles from "../Stylesheet";
import { Actions } from "react-native-router-flux";

// Group Menu
class MyGroups extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userGroups: "",
            editingGroupId: "",
            groupName: '',
        };
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps) {
        if (prevProps.getUserGroupsStatus !== this.props.getUserGroupsStatus) {
            if (this.props.getUserGroupsStatus) {
                this.setState({ userGroups: this.props.getUserGroupsData });
            }
        }
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
                data={this.state.userGroups}
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
        this.setState({ requestedGroupToJoinName: groupname });
        this.setState({ requestedGroupToJoinId: groupId });
    }

    editGroup(groupId) {
        this.props.setCurrentContentState(4);
        this.props.setCurrentEditingGroupId(groupId);
    }

    render() {
        return (
            <View >
                <Text style={styles.textBox}>My Groups:</Text>
                <View style={styles.flatListItemSeporator} />
                {this.showMyGroups()}
                <View style={styles.flatListItemSeporator} />
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
        currentEditingGroupIdSuccess: data => dispatch(currentEditingGroupIdSuccess(data)),
        currentEditingGroupIdData: data => dispatch(currentEditingGroupIdData(data)),
        setCurrentEditingGroupId: data => dispatch(setCurrentEditingGroupId(data)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyGroups);
