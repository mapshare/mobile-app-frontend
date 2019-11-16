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
} from "react-native";

import Icon from "react-native-vector-icons/SimpleLineIcons";

//Redux actions
import { connect } from 'react-redux';
import {
    searchGroup,
    searchGroupSuccess,
    getActiveGroup,
    getActiveGroupDataSuccess,
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
    updateGroup,
    updateGroupSuccess,
    updateGroupError
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
import ImagePicker from 'react-native-image-picker';

// Group Menu
class EditGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editingGroupId: "",
            groupImg: '',
            succesModalVisible: false,
        };
    }

    leaveGroup() {
        const data = {
            token: this.props.token,
            groupId: this.state.editingGroupId,
        }
        this.props.leaveGroupSuccess(false);
        this.props.leaveGroup(data);
        Actions.pop();
    }

    deleteGroup() {
        const data = {
            token: this.props.token,
            groupId: this.state.editingGroupId,
        }
        this.props.deleteGroupSuccess(false);
        this.props.deleteGroup(data);
        Actions.pop();
    }

    updateGroupPhoto() {
        console.log('updateGroupPhoto');
        const data = {
            token: this.props.token,
            groupImg: this.state.groupImg,
            groupId: this.props.currentEditingGroupData._id,
        }
        this.props.updateGroupSuccess(false);
        this.props.updateGroup(data);
        this.setSuccesModalVisible(!this.state.succesModalVisible);
    }

    choosePhoto() {
        let options = {
            title: 'Select Image',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                this.setState({
                    groupImg: response.data
                }, () => {
                    this.updateGroupPhoto();
                });
            }
        });
    };

    setSuccesModalVisible(visible) {
        this.setState({ succesModalVisible: visible }, () => {
            setTimeout(() => {
                this.setState({ succesModalVisible: !visible });
            }, 3000);
        });
    }

    render() {
        return (
            <View style={styles.modalStyle}>

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.succesModalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <View style={styles.SuccesModal}>
                        <Text style={styles.textBox}>Success</Text>
                    </View>
                </Modal>

                <View>
                    <TouchableOpacity style={styles.closeButton} onPress={() => Actions.pop()}>
                        <Icon style={styles.closeIcon} name="arrow-left-circle" size={30} />
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.content} >
                    <Text style={styles.textBox}>Edit Group: {this.props.currentEditingGroupData.groupName}</Text>
                    <View>
                        <View style={styles.flatListItemSeporator} />
                        {(this.props.currentEditingGroupData.groupRolePermisionLevel >= 3) &&
                            <View>
                                <TouchableOpacity style={styles.editGroupOptions} onPress={() => Actions.changeGroupNameMenu()}>
                                    <Text style={styles.textBox} >Change Group Name</Text>
                                </TouchableOpacity>

                                <View style={styles.flatListItemSeporator} />
                            </View>
                        }

                        {(this.props.currentEditingGroupData.groupRolePermisionLevel >= 3) &&
                            <View>
                                <TouchableOpacity style={styles.editGroupOptions} onPress={() => Actions.changeGroupDescriptionMenu()}>
                                    <Text style={styles.textBox} >Change Group Description</Text>
                                </TouchableOpacity>
                                <View style={styles.flatListItemSeporator} />
                            </View>
                        }

                        {(this.props.currentEditingGroupData.groupRolePermisionLevel >= 3) &&
                            <View>

                                <TouchableOpacity style={styles.editGroupOptions} onPress={() => { this.choosePhoto() }}>
                                    <Text style={styles.textBox} >Change Group Picture</Text>
                                </TouchableOpacity>
                                <View style={styles.flatListItemSeporator} />
                            </View>
                        }

                        <TouchableOpacity style={styles.editGroupOptions} onPress={() => { Actions.groupMembersListMenu() }}>
                            <Text style={styles.textBox} >Group Members</Text>
                        </TouchableOpacity>

                        <View style={styles.flatListItemSeporator} />

                        {(this.props.currentEditingGroupData.groupRolePermisionLevel >= 3) &&
                            <View>
                                <TouchableOpacity style={styles.editGroupOptions} onPress={() => Actions.joinGroupRequestMenu()}>
                                    <Text style={styles.textBox} >Group Join Requests</Text>
                                </TouchableOpacity>

                                <View style={styles.flatListItemSeporator} />
                            </View>
                        }

                        {(this.props.currentEditingGroupData.groupRolePermisionLevel <= 3) &&
                            <View>
                                <TouchableOpacity style={styles.editGroupOptions} onPress={() => this.leaveGroup()}>
                                    <Text style={styles.textBox} >Leave Group</Text>
                                </TouchableOpacity>

                                <View style={styles.flatListItemSeporator} />
                            </View>
                        }

                        {(this.props.currentEditingGroupData.groupRolePermisionLevel == 4) &&
                            <View>
                                <TouchableOpacity style={styles.editGroupOptions} onPress={() => this.deleteGroup()}>
                                    <Text style={styles.textBox} >Delete Group</Text>
                                </TouchableOpacity>

                                <View style={styles.flatListItemSeporator} />
                            </View>
                        }
                    </View>
                </ScrollView>
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
        currentEditingGroupStatus: state.groupMenuReducer.currentEditingGroupStatus,
        currentEditingGroupData: state.groupMenuReducer.currentEditingGroupData,
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
        setCurrentEditingGroupId: data => dispatch(setCurrentEditingGroupId(data)),
        currentEditingGroupIdSuccess: data => dispatch(currentEditingGroupIdSuccess(data)),
        leaveGroup: data => dispatch(leaveGroup(data)),
        leaveGroupSuccess: data => dispatch(leaveGroupSuccess(data)),
        leaveGroupError: data => dispatch(leaveGroupError(data)),
        deleteGroup: data => dispatch(deleteGroup(data)),
        deleteGroupSuccess: data => dispatch(deleteGroupSuccess(data)),
        deleteGroupError: data => dispatch(deleteGroupError(data)),
        updateGroup: data => dispatch(updateGroup(data)),
        updateGroupSuccess: data => dispatch(updateGroupSuccess(data)),
        updateGroupError: data => dispatch(updateGroupError(data)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditGroup);
