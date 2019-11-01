// Import Libraries
import React, { Component } from "react"
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage, Keyboard } from 'react-native';
import { Actions } from 'react-native-router-flux';

// Componenets Style
import styles from "./SelectGroup/Stylesheet"

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
    deleteGroup,
    deleteGroupError,
    deleteGroupSuccess,
    leaveGroup,
    leaveGroupError,
    leaveGroupSuccess,
} from '../../actions/groupActions';

// Creating Component
class ManageGroup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeGroup: ""
        };
    }

    componentDidMount() {
        if (this.props.getActiveGroupStatus) {
            this.setState({ activeGroup: this.props.getActiveGroupData.groupName });
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.getActiveGroupStatus !== this.props.getActiveGroupStatus) {
            if (this.props.getActiveGroupStatus) {
                this.setState({ activeGroup: this.props.getActiveGroupData.groupName });
            } else {
                this.setState({ activeGroup: "" });
            }
        }

        if (prevProps.leaveGroupStatus !== this.props.leaveGroupStatus) {
            if (this.props.leaveGroupStatus) {
                this.clearActiveGroup();
            }
        }

        if (prevProps.deleteGroupStatus !== this.props.deleteGroupStatus) {
            if (this.props.deleteGroupStatus) {
                this.clearActiveGroup();
            }
        }

        if (prevProps.getLeaveGroupError !== this.props.getLeaveGroupError) {
            if (this.props.getLeaveGroupError) {
                alert(this.props.getLeaveGroupError.error)
                this.props.leaveGroupError("");
            }
        }
    }

    goAddGroup() {
        Actions.addGroup()
    }

    goSelectGroup() {
        Actions.selectGroup()
    }

    goManageGroupJoinRequests() {
        Actions.manageGroupJoinRequests()
    }

    clearActiveGroup() {
        this.props.getActiveGroupSuccess(false);
        this.props.getActiveGroupDataSuccess("");
        this.props.getActiveGroupError("");
    }

    leaveGroup() {
        const data = {
            token: this.props.token,
            groupId: this.props.getActiveGroupData._id,
        }
        this.props.leaveGroupSuccess(false);
        this.props.leaveGroup(data);
    }

    deleteGroup() {
        const data = {
            token: this.props.token,
            groupId: this.props.getActiveGroupData._id,
        }
        this.props.deleteGroupSuccess(false);
        this.props.deleteGroup(data);
    }

    render() {
        return (
            <View style={styles.container}>

                <Text>This is just a Tester Page which allows you to manage groups your current group is: {this.state.activeGroup}</Text>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText} onPress={this.goAddGroup}>Add Group</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText} onPress={this.goSelectGroup}>Select Group</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText} onPress={this.goManageGroupJoinRequests}>Manage Group Join Requests</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText} onPress={() => this.leaveGroup()}>Leave Group - {this.state.activeGroup}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText} onPress={() => this.deleteGroup()}>Delete Group - {this.state.activeGroup}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}


// Redux Getter to use: this.props.(name of any return)
const mapStateToProps = state => {
    return {
        getActiveGroupStatus: state.groupReducer.getActiveGroupStatus,
        getActiveGroupData: state.groupReducer.getActiveGroupData,
        activeGroupError: state.groupReducer.getActiveGroupError,
        leaveGroupStatus: state.groupReducer.leaveGroupStatus,
        getLeaveGroupError: state.groupReducer.leaveGroupError,
        deleteGroupStatus: state.groupReducer.deleteGroupStatus,
        token: state.logInReducer.token,
    };
};

// Redux Setter to use: this.props.(name of any return)
const mapDispatchToProps = dispatch => {
    return {
        getActiveGroup: data => dispatch(getActiveGroup(data)),
        getActiveGroupSuccess: data => dispatch(getActiveGroupSuccess(data)),
        getActiveGroupDataSuccess: data => dispatch(getActiveGroupDataSuccess(data)),
        getActiveGroupError: data => dispatch(getActiveGroupError(data)),
        leaveGroup: data => dispatch(leaveGroup(data)),
        leaveGroupSuccess: data => dispatch(leaveGroupSuccess(data)),
        leaveGroupError: data => dispatch(leaveGroupError(data)),
        deleteGroup: data => dispatch(deleteGroup(data)),
        deleteGroupSuccess: data => dispatch(deleteGroupSuccess(data)),
        deleteGroupError: data => dispatch(deleteGroupError(data)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ManageGroup);
