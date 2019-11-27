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
    getGroupsSuccess,
    getGroups
} from '../../../../actions/groupActions';

import {
    requestClearField,
    requestClearFieldSuccess
} from '../../../../actions/SearchGroupFormAction';


import {
    setCurrentEditingGroup,
    currentEditingGroupStatus
} from '../../../../actions/GroupMenuAction';

import Icon from "react-native-vector-icons/SimpleLineIcons";
import SearchGroupForm from '../../../Forms/SearchGroup/SearchGroupForm';
// Componenets Style
import styles from "../Stylesheet";
import { Actions } from "react-native-router-flux";

// Group Menu
class SearchGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: "",
        };
    }

    separator = () => <View style={styles.flatListItemSeporator} />

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

    joinGroup(groupId) {
        const data = {
            token: this.props.token,
            groupId: groupId,
        }
        this.props.requestToJoinGroupSuccess(false);
        this.props.requestToJoinGroup(data);
        Actions.pop();
    }

    setGroup = (groupId) => {
        const data = {
            token: this.props.token,
            groupId: groupId,
        }
        this.props.getActiveGroupSuccess(false);
        this.props.getActiveGroup(data);
    }

    editGroup(group) {
        this.props.currentEditingGroupStatus(false);
        this.props.setCurrentEditingGroup(group);
        Actions.editGroupMenu({ currentEditingGroup: group });
    }

    showSearchResults() {
        let activeGroupId = "";
        if (this.props.getActiveGroupData != undefined) {
            activeGroupId = this.props.getActiveGroupData._id;
        }
        return (
            <FlatList
                keyboardShouldPersistTaps='always'
                ItemSeparatorComponent={this.separator}
                data={this.props.getSearchData}
                renderItem={(group) => {
                    if (group.item.isMember) {
                        return (<TouchableOpacity style={styles.flatListItem} onPress={() => this.setGroup(group.item._id, group.item.groupName)}>

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
                                    Owner: {group.item.createdBy.userFirstName}
                                    <Text style={[styles.idTextBox, (activeGroupId == group.item._id) ? styles.activeGroupColour : ""]}>
                                        {" #" + group.item.createdBy._id.slice(0, 6)}
                                    </Text>
                                </Text>
                            </View>

                            <View style={styles.flatListColThree}>
                                <TouchableOpacity style={styles.editGroupIconPadding} onPress={() => this.editGroup(group.item)}>
                                    <Icon style={styles.editGroupIcon} name="note" size={30} />
                                </TouchableOpacity>
                            </View>

                        </TouchableOpacity>
                        )
                    } else {
                        return (
                            <View style={styles.flatListItem}>

                                <View style={styles.flatListColOneWideTwo}>
                                </View>

                                <View style={styles.flatListColTwo}>
                                    <Text style={styles.flatListItemText}>
                                        {group.item.groupName}
                                    </Text>
                                    <Text style={styles.textBoxSmall}>
                                        Owner: {group.item.createdBy.userFirstName}
                                        <Text style={styles.idTextBox}>
                                            {" #" + group.item.createdBy._id.slice(0, 6)}
                                        </Text>
                                    </Text>
                                </View>

                                <View style={styles.flatListColThreeWide} >
                                    {!group.item.isMember &&
                                        !group.item.isPending &&
                                        <TouchableOpacity style={styles.editGroupIconPadding} onPress={() => this.joinGroup(group.item._id)}>
                                            <View style={styles.flatListItemButton} >
                                                <Text style={styles.flatListItemButtonText}>Join</Text>
                                            </View>
                                        </TouchableOpacity>}
                                    {group.item.isPending &&
                                        <Text style={styles.flatListItemButtonText}>Pending</Text>
                                    }
                                </View>

                            </View>
                        )
                    }
                }
                }
                keyExtractor={item => item._id}
            />
        );
    }

    render() {
        return (
            <View style={styles.modalStyle}>
                <View>
                    <TouchableOpacity style={styles.closeButton} onPress={() => {
                        Actions.pop();
                        Keyboard.dismiss();
                        this.props.requestClearFieldSuccess(false);
                        this.props.requestClearField(true);
                    }}>
                        <Icon style={styles.closeIcon} name="arrow-left-circle" size={30} />
                    </TouchableOpacity>
                </View>
                <SafeAreaView style={[styles.content, { flex: 1 }]} >
                    <SearchGroupForm keyboardEnabled={true} />
                    <View style={styles.flatListItemSeporator} />
                    {this.showSearchResults()}
                    <View style={styles.flatListItemSeporator} />
                </SafeAreaView>
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
        requestClearFieldSuccess: data => dispatch(requestClearFieldSuccess(data)),
        getUserGroupsSuccess: data => dispatch(getUserGroupsSuccess(data)),
        getUserGroups: data => dispatch(getUserGroups(data)),
        currentEditingGroupStatus: data => dispatch(currentEditingGroupStatus(data)),
        setCurrentEditingGroup: data => dispatch(setCurrentEditingGroup(data)),
        getGroupsSuccess: data => dispatch(getGroupsSuccess(data)),
        getGroups: data => dispatch(getGroups(data)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchGroup);
