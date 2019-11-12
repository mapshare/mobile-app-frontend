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

import SearchGroupForm from '../../../Forms/SearchGroup/SearchGroupForm';

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
            userGroups: "",
            groupName: '',
            interval: '',
            changedGroup: false,
        };
    }

    componentDidMount() {
        this.setState({ userGroups: this.props.getUserGroupsData });
        // update active group and user group every 10 seconds
        this.setState({
            interval: setInterval(() => {
                this.props.getUserGroupsSuccess(false);
                this.refreshData();
            }, 10000)
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.interval);
    }

    componentDidUpdate(prevProps) {
        if (this.state.changedGroup) {
            this.setState({ changedGroup: false });
            Actions.pop();
        }
        
        // return to my groups after adding group
        if (prevProps.status !== this.props.status) {
            if (this.props.status) {
                this.props.getUserGroupsSuccess(false);
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
                if (this.props.getActiveGroupData._id == this.props.getCurrentEditingGroupIdData) {
                    this.clearActiveGroup();
                }
                this.props.getUserGroupsSuccess(false);
            }
        }

        if (prevProps.getUserGroupsStatus !== this.props.getUserGroupsStatus) {
            if (this.props.getUserGroupsStatus) {
                this.setState({ userGroups: this.props.getUserGroupsData });
            } else {
                this.props.getUserGroups({ token: this.props.token });
            }
        }

    }

    clearActiveGroup() {
        this.props.getActiveGroupSuccess(false);
        this.props.getActiveGroupDataSuccess("");
        this.props.getActiveGroupError("");
        Actions.initial({ type: ActionConst.RESET });
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
                                <TouchableOpacity onPress={() => this.editGroup(group.item._id)}>
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

    refreshData() {
        const data = {
            token: this.props.token,
            groupId: this.props.getActiveGroupData._id,
        }
        this.props.getActiveGroup(data);
    }

    setGroup = (groupId, groupname) => {
        const data = {
            token: this.props.token,
            groupId: groupId,
        }
        this.setState({ changedGroup: true });
        this.props.getActiveGroup(data);
        this.props.getActiveGroupSuccess(false);
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
                    <TouchableOpacity style={styles.addGroup} onPress={() => Actions.addGroupMenu()}>
                        <Icon style={styles.closeIcon} name="plus" size={30} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.closeButton} onPress={() => {
                        Actions.pop();
                        this.setGroup(this.props.getActiveGroupData._id);
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
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyGroups);
