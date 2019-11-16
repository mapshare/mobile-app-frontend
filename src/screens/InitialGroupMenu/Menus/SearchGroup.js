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
    getUserGroups
} from '../../../actions/groupActions';

import {
    requestClearField,
    requestClearFieldSuccess
} from '../../../actions/SearchGroupFormAction';

import Icon from "react-native-vector-icons/SimpleLineIcons";
import SearchGroupForm from '../../Forms/SearchGroup/SearchGroupForm';

// Componenets Style
import styles from "../Stylesheet";
import { Actions } from "react-native-router-flux";

// Group Menu
class SearchGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: "",
            modalVisible: true,
            requestedGroupToJoinName: "",
            requestedGroupToJoinId: "",
            currentContentState: 1,
            editingGroupId: "",
            groupName: '',
        };
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps) {
    }

    separator = () => <View style={styles.flatListItemSeporator} />


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
                keyExtractor={item => item._id}
                renderItem={(group) => {
                    if (group.item.isMember) {
                        return (<TouchableOpacity style={styles.flatListItem} onPress={() => this.setGroup(group.item._id)}>

                            <View style={styles.flatListColOne}>
                                {activeGroupId == group.item._id &&
                                    <Icon style={styles.activeGroupIcon} name="arrow-right" size={20} />
                                }
                            </View>
                            <View style={styles.flatListColTwo}>
                                <Text style={[styles.flatListItemText, (activeGroupId == group.item._id) ? styles.activeGroupColour : ""]}>
                                    {group.item.groupName}
                                </Text>
                                <Text style={styles.textBoxSmall}>
                                    Created By: {group.item.createdBy.userFirstName} {group.item.createdBy.userLastName}
                                </Text>
                            </View>

                            <View style={styles.flatListColThree}>
                            </View>

                        </TouchableOpacity>
                        )
                    } else {
                        return (
                            <View style={styles.flatListItem} >

                                <View style={styles.flatListColOne}>
                                </View>

                                <View style={styles.flatListColTwo}>
                                    <Text style={styles.flatListItemText}>
                                        {group.item.groupName}
                                    </Text>
                                    <Text style={styles.textBoxSmall}>
                                        Created By: {group.item.createdBy.userFirstName} {group.item.createdBy.userLastName}
                                    </Text>
                                </View>

                                <View style={styles.flatListColThree} >
                                    {!group.item.isMember &&
                                        !group.item.isPending &&
                                        <TouchableOpacity style={styles.flatListItemButton} onPress={() => this.joinGroup(group.item._id)}>
                                            <Text style={styles.flatListItemButtonText}>Join</Text>
                                        </TouchableOpacity>}
                                    {group.item.isPending &&
                                        <Text style={styles.flatListItemButtonText}>Pending</Text>
                                    }
                                </View>

                            </View>
                        );
                    }
                }}
            />);
    }

    render() {
        return (
            <View style={styles.body}>
                <ImageBackground resizeMode="cover" style={styles.backgroundImage} source={require('../../../assests/images/logo.png')}>

                    <View style={styles.container} >
                        <TouchableOpacity style={styles.closeButton} onPress={() => {
                            Keyboard.dismiss();
                            Actions.pop();
                            this.props.requestClearFieldSuccess(false);
                            this.props.requestClearField(true);
                        }}>
                            <Icon style={styles.closeIcon} name="arrow-left-circle" size={30} />
                        </TouchableOpacity>
                        <SafeAreaView style={[styles.content]} >
                            <SearchGroupForm keyboardEnabled={true} />
                            <View style={styles.flatListItemSeporator} />
                            {this.showSearchResults()}
                            <View style={styles.flatListItemSeporator} />
                        </SafeAreaView>
                    </View>
                </ImageBackground>
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
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchGroup);
