// Import Libraries
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    AsyncStorage,
    Keyboard,
    Modal,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

//Redux actions
import { updateGroup, updateGroupSuccess, updateGroupError } from '../../../actions/groupActions';

// Componenets Style
import styles from '../Stylesheet';

import validator from '../validate/validation_wrapper'

// Creating Component
class changeGroupNameForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groupName: '',
            succesModalVisible: false,
            changeGroupNameError: "",
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.status !== this.props.status) {
            if (this.props.status) {
                Keyboard.dismiss();
            }
        }
    }

    changeGroupName = async () => {
        let changeGroupNameError = "";
        changeGroupNameError = validator('groupNamePresent', this.state.groupName);
        !changeGroupNameError ? changeGroupNameError = validator('groupNameMinLength', this.state.groupName) : false;
        !changeGroupNameError ? changeGroupNameError = validator('groupNameMaxLength', this.state.groupName) : false;
        this.setState({ changeGroupNameError: changeGroupNameError });

        if (!changeGroupNameError) {
            const data = {
                token: this.props.token,
                groupName: this.state.groupName.trim(),
                groupId: this.props.currentEditingGroupData._id,
                activeGroupId: this.props.getActiveGroupData._id,
            }

            this.props.updateGroupSuccess(false);
            this.props.updateGroup(data);
            this.setSuccesModalVisible(!this.state.succesModalVisible);
            Actions.pop();
        }
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
            <View style={styles.container}>

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

                <TextInput
                    autoFocus={true}
                    style={styles.addGroupInputBox}
                    onChangeText={GroupName => this.setState({ groupName: GroupName })}
                    placeholder="Enter Group Name"
                    placeholderTextColor="#B8B8B8"
                    selectionColor="#fff"
                    autoCorrect={false}
                    returnKeyType="next"
                    maxLength={15}
                    autoCapitalize="none"
                    onSubmitEditing={() => this.changeGroupName()}
                />
                {this.state.changeGroupNameError ? <Text>{this.state.changeGroupNameError}</Text> : null}

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText} onPress={() => this.changeGroupName()}>
                        {this.props.type}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

// Redux Getter to use: this.props.(name of any return)
const mapStateToProps = state => {
    return {
        status: state.groupReducer.status,
        groupData: state.groupReducer.groupData,
        currentEditingGroupData: state.groupMenuReducer.currentEditingGroupData,
        updateGroupError: state.groupReducer.updateGroupError,
        token: state.logInReducer.token,
        getActiveGroupData: state.groupReducer.getActiveGroupData,
    };
};

// Redux Setter to use: this.props.(name of any return)
const mapDispatchToProps = dispatch => {
    return {
        updateGroup: data => dispatch(updateGroup(data)),
        updateGroupSuccess: data => dispatch(updateGroupSuccess(data)),
        updateGroupError: data => dispatch(updateGroupError(data)),
        addGroupSuccess: data => dispatch(addGroupSuccess(data)),
        addGroupFormSuccess: data => dispatch(addGroupFormSuccess(data)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(changeGroupNameForm);
