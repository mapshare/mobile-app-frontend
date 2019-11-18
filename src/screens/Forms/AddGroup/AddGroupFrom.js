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
import { createGroup, createGroupSuccess, createGroupError } from '../../../actions/groupActions';
import { addGroupSuccess, addGroupFormSuccess } from '../../../actions/AddGroupFormAction';

// Componenets Style
import styles from '../Stylesheet';

import validator from '../validate/validation_wrapper'

// Creating Component
class AddGroupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groupName: '',
            createGroupError: '',
            currentlyCreatingGroup: false,
            succesModalVisible: false,
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.status !== this.props.status) {
            if (this.props.status) {
                Keyboard.dismiss();
                this.props.addGroupFormSuccess(false);
                this.props.addGroupSuccess({ success: true });
                this.setState({ currentlyCreatingGroup: false });
            }
        }

        if (this.props.getCreateGroupError) {
            alert(this.props.getCreateGroupError);
            this.props.createGroupError("");
        }
    }

    createGroup = async () => {
        if (!this.state.currentlyCreatingGroup) {
            this.setState({ currentlyCreatingGroup: true });
            const data = {
                token: this.props.token,
                groupName: this.state.groupName,
            }
            this.props.createGroupSuccess(false);
            this.props.createGroup(data);
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
                    autoCapitalize="none"
                    onSubmitEditing={() => this.createGroup()}
                />
                {this.state.createGroupError ? <Text>{this.state.createGroupError}</Text> : null}

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText} onPress={this.createGroup}>
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
        getCreateGroupError: state.groupReducer.createGroupError,
        token: state.logInReducer.token
    };
};

// Redux Setter to use: this.props.(name of any return)
const mapDispatchToProps = dispatch => {
    return {
        createGroup: data => dispatch(createGroup(data)),
        createGroupSuccess: data => dispatch(createGroupSuccess(data)),
        createGroupError: data => dispatch(createGroupError(data)),
        addGroupSuccess: data => dispatch(addGroupSuccess(data)),
        addGroupFormSuccess: data => dispatch(addGroupFormSuccess(data)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AddGroupForm);
