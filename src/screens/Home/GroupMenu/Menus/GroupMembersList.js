import React, { Component } from "react";
import {
    Text,
    View,
    TouchableOpacity,
    FlatList,
    ScrollView,
    SafeAreaView
} from "react-native";

import Icon from "react-native-vector-icons/SimpleLineIcons";

//Redux actions
import { connect } from 'react-redux';
import {
    getActiveGroup,
    getUserGroupsSuccess,
    getUserGroups,
    getAllGroupMember,
    getAllGroupMemberDataSuccess,
    getAllGroupMemberSuccess,
    getGroups,
    getEditingGroupMember,
    getEditingGroupMemberSuccess
} from '../../../../actions/groupActions';


import {
    setCurrentEditingGroupMember,
    currentEditingGroupMemberSuccess,
} from '../../../../actions/GroupMenuAction';

// Componenets Style
import styles from "../Stylesheet";
import { Actions } from "react-native-router-flux";

// Group Menu
class MyGroups extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: "",
            groupName: '',
            permission: 0
        };
    }


    componentDidMount() {
        
        const data = {
            token: this.props.token,
            groupId: this.props.getCurrentEditingGroupData._id,
        }
        this.props.getEditingGroupMember(data);

        try {
            this.setState({ permission: this.props.getEditingGroupMemberData.memberRole.groupRolePermisionLevel });
        } catch (error) {
            
        }

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
                try {
                    this.setState({ permission: this.props.getEditingGroupMemberData.memberRole.groupRolePermisionLevel });
                } catch (error) {
                    
                }
            }, 5000)
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.interval);
    }

    editGroupMember(data) {
        Actions.editGroupMemberMenu();
        this.props.currentEditingGroupMemberSuccess(false);
        this.props.setCurrentEditingGroupMember(data);
    }

    separator = () => <View style={styles.flatListItemSeporator} />

    showGroupMembers() {
        return (
            <FlatList
                ItemSeparatorComponent={this.separator}
                data={this.props.getAllGroupMemberData}
                renderItem={(group) => {
                    return (
                        <View style={styles.flatListItem}>

                            <View style={styles.flatListColOneWide}>
                                <Text style={styles.textBoxRoles}>
                                    {group.item.groupMemberRole.groupRoleName}
                                </Text>
                            </View>
                            <View style={styles.flatListColTwoSmall}>
                                <Text style={styles.flatListItemText}>
                                    {group.item.userFirstName + " " + group.item.userLastName}
                                </Text>
                            </View>

                            <View style={styles.flatListColThree}>
                                {(this.state.permission >= 3) &&
                                    (group.item.groupMemberRole.groupRolePermisionLevel <= 3) &&
                                    <TouchableOpacity onPress={() => this.editGroupMember(group.item)}>
                                        <Icon style={styles.editGroupIcon} name="note" size={30} />
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
            <View style={styles.modalStyle}>
                <View>
                    <TouchableOpacity style={styles.closeButton} onPress={() => Actions.pop()}>
                        <Icon style={styles.closeIcon} name="arrow-left-circle" size={30} />
                    </TouchableOpacity>
                </View>
                <SafeAreaView style={styles.content} >
                    <Text style={styles.textBox}>Members:</Text>
                    <View style={styles.flatListItemSeporator} />
                    {this.showGroupMembers()}
                    <View style={styles.flatListItemSeporator} />
                </SafeAreaView>
            </View>
        );
    }
}

// Redux Getter to use: this.props.(name of any return)
const mapStateToProps = state => {
    return {
        token: state.logInReducer.token,
        getActiveGroupData: state.groupReducer.getActiveGroupData,
        getAllGroupMemberStatus: state.groupReducer.getAllGroupMemberStatus,
        getAllGroupMemberData: state.groupReducer.getAllGroupMemberData,
        getEditingGroupMemberData: state.groupReducer.getEditingGroupMemberData,
        getCurrentEditingGroupData: state.groupMenuReducer.currentEditingGroupData,
    };
};

// Redux Setter to use: this.props.(name of any return)
const mapDispatchToProps = dispatch => {
    return {
        getActiveGroup: data => dispatch(getActiveGroup(data)),
        getUserGroupsSuccess: data => dispatch(getUserGroupsSuccess(data)),
        getUserGroups: data => dispatch(getUserGroups(data)),
        getAllGroupMemberSuccess: data => dispatch(getAllGroupMemberSuccess(data)),
        setCurrentEditingGroupMember: data => dispatch(setCurrentEditingGroupMember(data)),
        currentEditingGroupMemberSuccess: data => dispatch(currentEditingGroupMemberSuccess(data)),
        getAllGroupMemberDataSuccess: data => dispatch(getAllGroupMemberDataSuccess(data)),
        getGroups: data => dispatch(getGroups(data)),
        getAllGroupMember: data => dispatch(getAllGroupMember(data)),
        getEditingGroupMember: data => dispatch(getEditingGroupMember(data)),
        getEditingGroupMemberSuccess: data => dispatch(getEditingGroupMemberSuccess(data)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyGroups);
