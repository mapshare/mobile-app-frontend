import React, { Component } from "react";
import {
    Text,
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    Modal,
    Picker,
    ScrollView,
} from "react-native";

import Icon from "react-native-vector-icons/SimpleLineIcons";

//Redux actions
import { connect } from 'react-redux';
import {
    getAllGroupMember,
    getAllGroupMemberSuccess,
    updateGroupMember,
    updateGroupMemberSuccess,
    leaveGroup,
    leaveGroupSuccess,
} from '../../../../actions/groupActions';

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
            permisionLevel: '',
            modalVisible: false,
            succesModalVisible: false,
        };
    }

    componentDidMount() {
        this.setState({ permisionLevel: this.props.currentEditingGroupMemberData.groupMemberRole.groupRolePermisionLevel })
    }

    deleteGroupMember() {
        const data = {
            token: this.props.token,
            memberId: this.props.currentEditingGroupMemberData._id,
            groupId: this.props.getCurrentEditingGroupData._id,
        }
        this.props.leaveGroupSuccess(false);
        this.props.leaveGroup(data);
        Actions.pop();
    }

    changeRole() {
        const data = {
            token: this.props.token,
            memberId: this.props.currentEditingGroupMemberData._id,
            groupRolePermisionLevel: this.state.permisionLevel,
            groupId: this.props.getCurrentEditingGroupData._id,
        }
        this.props.updateGroupMemberSuccess(false);
        this.props.updateGroupMember(data);
        this.props.getAllGroupMemberSuccess(false);

        const data2 = {
            token: this.props.token,
            groupId: this.props.getCurrentEditingGroupData._id,
        }
        this.props.getAllGroupMember(data2);
        this.setSuccesModalVisible(!this.state.succesModalVisible);
        Actions.pop();
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    setSuccesModalVisible(visible) {
        this.setState({ succesModalVisible: visible },()=>{
            setTimeout(()=>{
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
                    visible={this.state.succesModalVisible}>
                    <View style={styles.SuccesModal}>
                        <Text style={styles.textBox}>Success</Text>
                    </View>
                </Modal>

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
                                <Text style={styles.textBox}>Are you sure you want to remove this member?</Text>

                                <View style={styles.flatListItemSeporator} />
                                <TouchableOpacity style={styles.groupRolePicker} onPress={() => this.deleteGroupMember()}>
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

                <View>
                    <TouchableOpacity style={styles.closeButton} onPress={() => Actions.pop()}>
                        <Icon style={styles.closeIcon} name="arrow-left-circle" size={30} />
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.content} >
                    <Text style={styles.textBox}>{this.props.currentEditingGroupMemberData.userFirstName + " " + this.props.currentEditingGroupMemberData.userLastName}:</Text>

                    <View style={styles.flatListItemSeporator} />

                    <View style={styles.groupRolePicker} >
                        <View style={styles.flatListColOneWide}>
                            <Text style={styles.textBox} >Role:</Text>
                        </View>
                        <View style={styles.flatListColTwoSmall}>
                            <Picker
                                selectedValue={this.state.permisionLevel}
                                style={styles.groupRolePickerItem}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({ permisionLevel: itemValue })
                                }>
                                <Picker.Item label="Member" value={0} key={0} />
                                <Picker.Item label="Admin" value={3} key={3} />
                            </Picker>
                        </View>
                    </View>
                    <View style={styles.flatListItemSeporator} />
                    <TouchableOpacity style={styles.groupRolePicker} onPress={() => this.changeRole()}>
                        <Text style={styles.textBox} >Save Changes</Text>
                    </TouchableOpacity>
                    <View style={styles.flatListItemSeporator} />
                </ScrollView>
                <View style={styles.pinBottom} >
                    <View style={styles.flatListItemSeporator} />
                    <TouchableOpacity style={styles.groupRolePicker} onPress={() => this.setModalVisible(!this.state.modalVisible)}>
                        <Text style={styles.textBox} >Remove Member</Text>
                    </TouchableOpacity>
                    <View style={styles.flatListItemSeporator} />
                </View>
            </View>
        );
    }
}

// Redux Getter to use: this.props.(name of any return)
const mapStateToProps = state => {
    return {
        token: state.logInReducer.token,
        getActiveGroupData: state.groupReducer.getActiveGroupData,
        getCurrentEditingGroupData: state.groupMenuReducer.currentEditingGroupData,
        currentEditingGroupMemberData: state.groupMenuReducer.currentEditingGroupMemberData,
    };
};

// Redux Setter to use: this.props.(name of any return)
const mapDispatchToProps = dispatch => {
    return {
        getAllGroupMember: data => dispatch(getAllGroupMember(data)),
        getAllGroupMemberSuccess: data => dispatch(getAllGroupMemberSuccess(data)),
        updateGroupMember: data => dispatch(updateGroupMember(data)),
        updateGroupMemberSuccess: data => dispatch(updateGroupMemberSuccess(data)),
        leaveGroup: data => dispatch(leaveGroup(data)),
        leaveGroupSuccess: data => dispatch(leaveGroupSuccess(data)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyGroups);
