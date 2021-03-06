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
    ActivityIndicator,
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
    updateGroupError,
    getAllGroupMember,
    getEditingGroupMember,
    getAllGroupMemberDataSuccess,
    getEditingGroupMemberSuccess,
    getEditingGroupMemberDataSuccess
} from '../../../../actions/groupActions';

import {
    requestClearField
} from '../../../../actions/SearchGroupFormAction';

import {
    currentContentSuccess,
    setCurrentContentState,
    currentEditingGroupIdSuccess,
    setCurrentEditingGroupId,
    currentEditingGroupData,
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
            modalVisible: false,
            // Requred to pervent button spam
            singleActivation: false,
        };
    }

    componentDidMount() {
        // Rest list content to make sure old data is not displayed
        this.props.getAllGroupMemberDataSuccess([])
        const data = {
            token: this.props.token,
            groupId: this.props.getCurrentEditingGroupData._id,
        }
        this.props.getAllGroupMember(data);
        this.props.getEditingGroupMember(data);

        // update every 5 seconds
        this.setState({
            interval: setInterval(() => {
                const data = {
                    token: this.props.token,
                    groupId: this.props.getCurrentEditingGroupData._id,
                }
                this.props.getEditingGroupMemberSuccess(false);
                this.props.getEditingGroupMember(data);
                this.props.getAllGroupMember(data);
            }, 5000)
        });
    }

    componentWillUnmount() {
        this.props.getEditingGroupMemberDataSuccess({})
        clearInterval(this.state.interval);
    }

    leaveGroup() {
        const data = {
            token: this.props.token,
            groupId: this.props.getCurrentEditingGroupData._id,
            activeGroupId: this.props.getActiveGroupData._id,
        }
        this.props.leaveGroupSuccess(false);
        this.props.leaveGroup(data);
        Actions.pop();
    }

    deleteGroup() {
        const data = {
            token: this.props.token,
            groupId: this.props.getCurrentEditingGroupData._id,
            activeGroupId: this.props.getActiveGroupData._id,
        }
        this.props.deleteGroupSuccess(false);
        this.props.deleteGroup(data);
    }

    updateGroupPhoto() {
        const data = {
            token: this.props.token,
            groupImg: this.state.groupImg,
            groupId: this.props.getCurrentEditingGroupData._id,
            activeGroupId: this.props.getActiveGroupData._id,
        }
        this.props.updateGroupSuccess(false);
        this.props.updateGroup(data);
    }

    updateGroupPrivacy(privacySetting) {
        const data = {
            token: this.props.token,
            groupIsPublic: privacySetting,
            groupId: this.props.getCurrentEditingGroupData._id,
            activeGroupId: this.props.getActiveGroupData._id,
        }
        this.props.updateGroupSuccess(false);
        this.props.updateGroup(data);
    }

    choosePhoto() {
        let options = {
            title: null,
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

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    setSuccesModalVisible(visible) {
        this.setState({ succesModalVisible: visible }, () => {
            setTimeout(() => {
                this.setState({ succesModalVisible: !visible });
            }, 3000);
        });
    }

    render() {
        let permission = 0;
        let loading = false;
        try {
            permission = this.props.getEditingGroupMemberData.memberRole.groupRolePermisionLevel;
        } catch (error) {
            loading = true;
        }
        return (
            <View style={styles.modalStyle}>

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Actions.pop();
                    }}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.modalStyle}>

                            <View style={styles.content} >
                                <Text style={styles.textBox}>Are you sure you want to delete this Group?</Text>

                                <View style={styles.flatListItemSeporator} />
                                <TouchableOpacity style={styles.groupRolePicker} onPress={() => this.deleteGroup()}>
                                    <Text style={styles.textBox} >YES</Text>
                                </TouchableOpacity>
                                <View style={styles.flatListItemSeporator} />
                                <TouchableOpacity style={styles.groupRolePicker} onPress={() => this.setModalVisible(!this.state.modalVisible)}>
                                    <Text style={styles.textBox} >NO</Text>
                                </TouchableOpacity>
                                <View style={styles.flatListItemSeporator} />
                            </View>

                        </View>
                    </TouchableWithoutFeedback>
                </Modal>

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
                {(!loading) ?
                    <ScrollView style={styles.content} >
                        <Text style={styles.textBox}>Edit Group: {this.props.getCurrentEditingGroupData.groupName}</Text>
                        <View>
                            <View style={styles.flatListItemSeporator} />
                            {(permission >= 3) &&
                                <View>
                                    <TouchableOpacity style={styles.editGroupOptions} onPress={() => Actions.changeGroupNameMenu()}>
                                        <Text style={styles.textBox} >Change Group Name</Text>
                                    </TouchableOpacity>

                                    <View style={styles.flatListItemSeporator} />
                                </View>
                            }

                            {(permission >= 3) &&
                                <View>
                                    <TouchableOpacity style={styles.editGroupOptions} onPress={() => Actions.changeGroupDescriptionMenu()}>
                                        <Text style={styles.textBox} >Change Group Description</Text>
                                    </TouchableOpacity>
                                    <View style={styles.flatListItemSeporator} />
                                </View>
                            }

                            {(permission >= 3) &&
                                <View>

                                    <TouchableOpacity style={styles.editGroupOptions}
                                        disabled={this.state.singleActivation}
                                        onPress={() => {
                                            this.setState({ singleActivation: true }, () => {
                                                this.choosePhoto();
                                                setTimeout(() => {
                                                    this.setState({ singleActivation: false });
                                                }, 1000)
                                            });
                                        }}>
                                        <Text style={styles.textBox} >Change Group Picture</Text>
                                    </TouchableOpacity>
                                    <View style={styles.flatListItemSeporator} />
                                </View>
                            }

                            <TouchableOpacity style={styles.editGroupOptions} onPress={() => { Actions.groupMembersListMenu() }}>
                                <Text style={styles.textBox} >Group Members</Text>
                            </TouchableOpacity>

                            <View style={styles.flatListItemSeporator} />

                            {(permission >= 3 && !this.props.getCurrentEditingGroupData.groupIsPublic) &&
                                <View>
                                    <TouchableOpacity style={styles.editGroupOptions} onPress={() => Actions.joinGroupRequestMenu()}>
                                        <Text style={styles.textBox} >Review Join Requests</Text>
                                    </TouchableOpacity>

                                    <View style={styles.flatListItemSeporator} />
                                </View>
                            }

                            {(permission >= 3) &&
                                <View>
                                    <TouchableOpacity style={styles.editGroupOptions} onPress={() => Actions.banedUsersList()}>
                                        <Text style={styles.textBox} >Banned Users</Text>
                                    </TouchableOpacity>

                                    <View style={styles.flatListItemSeporator} />
                                </View>
                            }

                            {(permission >= 3 && !this.props.getCurrentEditingGroupData.groupIsPublic) &&
                                <View>
                                    <TouchableOpacity style={styles.editGroupOptions} onPress={() => { this.updateGroupPrivacy(true); }}>
                                        <Text style={styles.textBox} >Make Group Public</Text>
                                    </TouchableOpacity>

                                    <View style={styles.flatListItemSeporator} />
                                </View>
                            }

                            {(permission >= 3 && this.props.getCurrentEditingGroupData.groupIsPublic) &&
                                <View>
                                    <TouchableOpacity style={styles.editGroupOptions} onPress={() => { this.updateGroupPrivacy(false); }}>
                                        <Text style={styles.textBox} >Make Group Private</Text>
                                    </TouchableOpacity>

                                    <View style={styles.flatListItemSeporator} />
                                </View>
                            }

                            {(permission <= 3) &&
                                <View>
                                    <TouchableOpacity style={styles.editGroupOptions} onPress={() => this.leaveGroup()}>
                                        <Text style={styles.textBox} >Leave Group</Text>
                                    </TouchableOpacity>

                                    <View style={styles.flatListItemSeporator} />
                                </View>
                            }

                            {(permission == 4) &&
                                <View>
                                    <TouchableOpacity style={styles.editGroupOptions} onPress={() => this.setModalVisible(!this.state.modalVisible)}>
                                        <Text style={styles.textBox} >Delete Group</Text>
                                    </TouchableOpacity>

                                    <View style={styles.flatListItemSeporator} />
                                </View>
                            }
                        </View>
                    </ScrollView>
                    :
                    <View style={styles.centerSpinner}>
                        <ActivityIndicator style={styles.spinnerStyle} size="large" color="#000" />
                    </View>
                }
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
        getCurrentEditingGroupData: state.groupMenuReducer.currentEditingGroupData,
        getEditingGroupMemberData: state.groupReducer.getEditingGroupMemberData,
        getEditingGroupMemberStatus: state.groupReducer.getEditingGroupMemberStatus,
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
        getAllGroupMember: data => dispatch(getAllGroupMember(data)),
        getEditingGroupMember: data => dispatch(getEditingGroupMember(data)),
        getAllGroupMemberDataSuccess: data => dispatch(getAllGroupMemberDataSuccess(data)),
        getEditingGroupMemberSuccess: data => dispatch(getEditingGroupMemberSuccess(data)),
        getEditingGroupMemberDataSuccess: data => dispatch(getEditingGroupMemberDataSuccess(data)),
        currentEditingGroupData: data => dispatch(currentEditingGroupData(data)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditGroup);
