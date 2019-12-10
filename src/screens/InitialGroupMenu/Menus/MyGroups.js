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
    SafeAreaView,
    AsyncStorage
} from "react-native";

import Icon from "react-native-vector-icons/SimpleLineIcons";
import SearchGroupForm from '../../Forms/SearchGroup/SearchGroupFormDummy';
import { AppTour, AppTourSequence, AppTourView } from 'react-native-app-tour'


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
    getGroups,
    getGroupsSuccess
} from '../../../actions/groupActions';

import {
    requestClearField
} from '../../../actions/SearchGroupFormAction';

import {
    currentContentSuccess,
    setCurrentContentState,
    currentEditingGroupIdStatus,
    currentEditingGroupIdData,
    setCurrentEditingGroupId
} from '../../../actions/GroupMenuAction';

// Componenets Style
import styles from "../Stylesheet";
import { Actions, ActionConst, } from "react-native-router-flux";

// Group Menu
class MyGroups extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userGroups: "",
            interval: '',
            // Requred to pervent button spam
            singleActivation: false,
        };
    }

    componentDidMount() {
        this.props.getUserGroupsSuccess(false);
        this.props.getUserGroups({ token: this.props.token });
        this.props.getGroups({ token: this.props.token });
        
        // update every 10 seconds
        this.setState({
            interval: setInterval(async () => {
                this.props.getGroupsSuccess(false);
                this.props.getUserGroups({ token: this.props.token });
                this.props.getGroups({ token: this.props.token });
            }, 10000)
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.interval);
    }

    componentDidUpdate(prevProps) {
        if (this.props.getActiveGroupStatus) {
            Actions.navTab({ type: ActionConst.REPLACE });
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
                data={this.props.getUserGroupsData}
                renderItem={(group) => {
                    return (
                        <TouchableOpacity style={styles.flatListItem} onPress={() => this.setGroup(group.item._id)}>

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
                                <Text style={[styles.textBoxSmall, (activeGroupId == group.item._id) ? styles.activeGroupColour : ""]}>
                                    Status: {group.item.groupIsPublic ? "Public" : "Private"}
                                </Text>
                            </View>

                            <View style={styles.flatListColThree}>
                            </View>

                        </TouchableOpacity>
                    )
                }
                }
                keyExtractor={item => item._id}
            />
        );
    }

    setGroup = (groupId) => {
        const data = {
            token: this.props.token,
            groupId: groupId,
        }
        this.props.getActiveGroupSuccess(false);
        this.props.getActiveGroup(data);
    }

    render() {
        return (
            <View style={styles.body}>
                <ImageBackground resizeMode="cover" style={styles.backgroundImage} source={require('../../../assests/images/logo.png')}>

                    <View style={styles.container} >

                        <Text style={styles.textBoxCenterTop}>SELECT GROUP</Text>
                        <TouchableOpacity
                            disabled={this.state.singleActivation}
                            style={styles.addGroup}
                            onPress={() => {
                                this.setState({ singleActivation: true }, () => {
                                    Actions.initialAddGroup();
                                    setTimeout(() => {
                                        this.setState({ singleActivation: false });
                                    }, 1000)
                                });
                            }}
                            >
                            <Icon style={styles.closeIcon} name="plus" size={30} 
                            />
                        </TouchableOpacity>

                        
                        <TouchableOpacity
                            disabled={this.state.singleActivation}
                            style={styles.logOutButton}
                            onPress={() => {
                                this.setState({ singleActivation: true }, () => {
                                    AsyncStorage.setItem('token', "");
                                    AsyncStorage.setItem('lastActiveGroupId', "");
                                    Actions.Auth({ type: ActionConst.RESET });

                                    setTimeout(() => {
                                        this.setState({ singleActivation: false });
                                    }, 1000)
                                });
                            }}
                            >
                            <Icon style={styles.logOutIcon} name="logout" size={30} 
                            />
                        </TouchableOpacity>
                        

                        <SafeAreaView style={styles.content} >
                            <TouchableWithoutFeedback
                                disabled={this.state.singleActivation}
                                onPress={() => {
                                    this.setState({ singleActivation: true }, () => {
                                        Actions.initialSearchGroup();
                                        setTimeout(() => {
                                            this.setState({ singleActivation: false });
                                        }, 1000)
                                    });
                                }}>
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
                </ImageBackground>
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
        getGroups: data => dispatch(getGroups(data)),
        getGroupsSuccess: data => dispatch(getGroupsSuccess(data)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyGroups);
