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
    reviewJoinGroupRequests,
    reviewJoinGroupRequestsSuccess,
    getAllJoinGroupRequests,
    allJoinGroupRequestsSuccess,
    banUserFromGroup
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
class JoinGroupRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editingGroupId: "",
            succesModalVisible: false,
            modalVisible: false,
            selectedUser: "",
            // Requred to pervent button spam
            singleActivation: false,
        };
    }

    componentDidMount() {
        const data = {
            token: this.props.token,
            groupId: this.props.currentEditingGroupData._id,
        }
        this.props.allJoinGroupRequestsSuccess(false);
        this.props.getAllJoinGroupRequests(data);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.getAllJoinGroupRequestsStatus !== this.props.getAllJoinGroupRequestsStatus) {
            if (this.props.getAllJoinGroupRequestsStatus) {
                const data = {
                    token: this.props.token,
                    groupId: this.props.currentEditingGroupData._id,
                }
                this.props.allJoinGroupRequestsSuccess(false);
                this.props.getAllJoinGroupRequests(data);
                this.setState({ data: this.props.getAllJoinGroupRequestsData });
            }
        }
    }

    reviewRequest(status) {
        const data = {
            token: this.props.token,
            groupId: this.props.currentEditingGroupData._id,
            status: status,
            pendingUserId: this.state.selectedUser._id,
        }
        this.props.reviewJoinGroupRequestsSuccess(false);
        this.props.reviewJoinGroupRequests(data);
        this.props.allJoinGroupRequestsSuccess(false); 
        this.setModalVisible(!this.state.modalVisible)
    }

    declineAndBanUser(){
        const data = {
            token: this.props.token,
            groupId: this.props.currentEditingGroupData._id,
            status: false,
            pendingUserId: this.state.selectedUser._id,
        }
        this.props.banUserFromGroup(data);
        this.props.reviewJoinGroupRequestsSuccess(false);
        this.props.reviewJoinGroupRequests(data);
        this.props.allJoinGroupRequestsSuccess(false); 
        this.setModalVisible(!this.state.modalVisible)
    }

    setSuccesModalVisible(visible) {
        this.setState({ succesModalVisible: visible }, () => {
            setTimeout(() => {
                this.setState({ succesModalVisible: !visible });
            }, 3000);
        });
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    render() {
        return (
            <View style={styles.modalStyle}>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setModalVisible(!this.state.modalVisible);
                    }}>
                    <TouchableWithoutFeedback
                        disabled={this.state.singleActivation}
                        onPress={() => {
                            this.setState({ singleActivation: true }, () => {
                                this.setModalVisible(!this.state.modalVisible);
                                setTimeout(() => {
                                    this.setState({ singleActivation: false });
                                }, 1000)
                            });
                        }}>
                        <View style={styles.joinRequestModalPopUp}>

                            <View style={styles.joinRequestModalContainer} >
                                <TouchableOpacity style={styles.joinRequestModalItem} onPress={() => this.reviewRequest(true)}>
                                    <Text style={styles.textBox} >Accept</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.joinRequestModalItem} onPress={() => this.reviewRequest(false)}>
                                    <Text style={styles.textBox} >Decline</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.joinRequestModalItem} onPress={() => this.declineAndBanUser()}>
                                    <Text style={styles.textBox} >Ban</Text>
                                </TouchableOpacity>
                                <View style={styles.flatListItemSeporator} />
                                <TouchableOpacity style={styles.joinRequestModalItem} onPress={() => this.setModalVisible(!this.state.modalVisible)}>
                                    <Text style={styles.textBox} >Cancel</Text>
                                </TouchableOpacity>
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
                <SafeAreaView style={styles.content} >
                    <Text style={styles.textBox}>Review Join Requests:</Text>
                    <View style={styles.flatListItemSeporator} />
                    <FlatList
                        data={this.props.getAllJoinGroupRequestsData}
                        renderItem={(request) => {
                            return (
                                <View style={styles.flatListItem}>
                                    <View style={styles.flatListColOne}></View>
                                    <View style={styles.flatListColTwo}>
                                        <Text style={styles.textBoxSmall}>
                                            {request.item.userFirstName + " " + request.item.userLastName + "\n"}
                                            {request.item.userEmail}
                                        </Text>
                                    </View>
                                    <View style={styles.flatListColThree}>
                                        <TouchableOpacity style={styles.bannedIconButton} onPress={() => {
                                            this.setState({ selectedUser: request.item }, () => {
                                                this.setModalVisible(!this.state.modalVisible);
                                            })
                                        }}>
                                            <Icon style={styles.bannedIcon} name="options" size={30} />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                            )
                        }
                        }
                        keyExtractor={item => item._id}
                    />

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
        currentContentStateData: state.groupMenuReducer.currentContentStateData,
        currentContentStatus: state.groupMenuReducer.currentContentStatus,
        currentEditingGroupStatus: state.groupMenuReducer.currentEditingGroupStatus,
        currentEditingGroupData: state.groupMenuReducer.currentEditingGroupData,
        getAllJoinGroupRequestsStatus: state.groupReducer.getAllJoinGroupRequestsStatus,
        getAllJoinGroupRequestsData: state.groupReducer.getAllJoinGroupRequestsData,
        getActiveGroupData: state.groupReducer.getActiveGroupData,
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
        reviewJoinGroupRequests: data => dispatch(reviewJoinGroupRequests(data)),
        reviewJoinGroupRequestsSuccess: data => dispatch(reviewJoinGroupRequestsSuccess(data)),
        getAllJoinGroupRequests: data => dispatch(getAllJoinGroupRequests(data)),
        allJoinGroupRequestsSuccess: data => dispatch(allJoinGroupRequestsSuccess(data)),
        banUserFromGroup: data => dispatch(banUserFromGroup(data)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(JoinGroupRequest);
