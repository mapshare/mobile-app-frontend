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
        if (prevProps.getSearchStatus !== this.props.getSearchStatus) {
            if (this.props.getSearchStatus) {
                this.setState({ data: this.props.getSearchData });
            }
        }
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

    showSearchResults() {
        return (
            <FlatList
                ItemSeparatorComponent={this.separator}
                data={this.state.data}
                renderItem={(group) => {
                    return (
                        <View style={styles.flatListItem} >

                            <View style={styles.flatListColOne}>
                            </View>

                            <View style={styles.flatListColTwo}>
                                <Text style={styles.flatListItemText}>
                                    {group.item.groupName}
                                </Text>
                            </View>

                            <View style={styles.flatListColThree} >
                                {!group.item.isMember &&
                                    <TouchableOpacity style={styles.flatListItemButton} onPress={() => this.joinGroup(group.item._id)}>
                                        <Text style={styles.flatListItemButtonText}>Join</Text>
                                    </TouchableOpacity>}
                            </View>

                        </View>
                    )
                }
                }
                keyExtractor={item => item._id}
            />
        );
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
                        <View style={styles.content} >
                            <SearchGroupForm />
                            <View style={styles.flatListItemSeporator} />
                            {this.showSearchResults()}
                            <View style={styles.flatListItemSeporator} />
                        </View>
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
