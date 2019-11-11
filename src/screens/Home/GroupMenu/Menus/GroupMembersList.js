import React, { Component } from "react";
import {
    Text,
    View,
    TouchableOpacity,
    FlatList,
    ScrollView,
} from "react-native";

import Icon from "react-native-vector-icons/SimpleLineIcons";

//Redux actions
import { connect } from 'react-redux';
import {
    getActiveGroup,
    getUserGroupsSuccess,
    getUserGroups,
    getAllGroupMember,
    getAllGroupMemberSuccess
} from '../../../../actions/groupActions';


import {
    setCurrentEditingGroupMember,
    currentEditingGroupMemberSuccess
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
            interval: '',
        };
    }

    componentDidMount() {
        this.props.getAllGroupMemberSuccess(false);
        // update every 5 seconds
        this.setState({
            interval: setInterval(() => {
                this.props.getAllGroupMemberSuccess(false);
            }, 5000)
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.interval);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.getAllGroupMemberStatus !== this.props.getAllGroupMemberStatus) {
            if (this.props.getAllGroupMemberStatus) {
                this.setState({ data: this.props.getAllGroupMemberData });
            } else {
                const data = {
                    token: this.props.token,
                    groupId: this.props.getActiveGroupData._id,
                }
                this.props.getAllGroupMember(data);
                this.props.getUserGroupsSuccess(false);
            }
        }
    }

    editGroupMember(data) {
        Actions.editGroupMemberMenu();
        this.props.currentEditingGroupMemberSuccess(false);
        this.props.setCurrentEditingGroupMember(data);
    }

    separator = () => <View style={styles.flatListItemSeporator} />

    showGroupMembers() {
        let activeGroupId = "";
        if (this.props.getActiveGroupData != undefined) {
            activeGroupId = this.props.getActiveGroupData._id;
        }
        return (
            <FlatList
                ItemSeparatorComponent={this.separator}
                data={this.state.data}
                renderItem={(group) => {
                    return (
                        <View style={styles.flatListItem}>

                            <View style={styles.flatListColOneWide}>
                                <Text style={styles.textBoxRoles}>
                                    {group.item.groupMemberRole.groupRoleName}
                                </Text>
                            </View>
                            <View style={styles.flatListColTwoSmall}>
                                <Text style={[styles.flatListItemText, (activeGroupId == group.item._id) ? styles.activeGroupColour : ""]}>
                                    {group.item.userFirstName + " " + group.item.userLastName}
                                </Text>
                            </View>

                            <View style={styles.flatListColThree}>
                                {(this.props.getActiveGroupData.groupRole.groupRolePermisionLevel >= 3) &&
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
                <ScrollView style={styles.content} >
                    <Text style={styles.textBox}>Members:</Text>
                    <View style={styles.flatListItemSeporator} />
                    {this.showGroupMembers()}
                    <View style={styles.flatListItemSeporator} />
                </ScrollView>
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
    };
};

// Redux Setter to use: this.props.(name of any return)
const mapDispatchToProps = dispatch => {
    return {
        getActiveGroup: data => dispatch(getActiveGroup(data)),
        getUserGroupsSuccess: data => dispatch(getUserGroupsSuccess(data)),
        getUserGroups: data => dispatch(getUserGroups(data)),
        getAllGroupMember: data => dispatch(getAllGroupMember(data)),
        getAllGroupMemberSuccess: data => dispatch(getAllGroupMemberSuccess(data)),
        setCurrentEditingGroupMember: data => dispatch(setCurrentEditingGroupMember(data)),
        currentEditingGroupMemberSuccess: data => dispatch(currentEditingGroupMemberSuccess(data)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyGroups);
