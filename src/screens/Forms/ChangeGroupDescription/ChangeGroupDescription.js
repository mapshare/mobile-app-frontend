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
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

//Redux actions
import { updateGroup, updateGroupSuccess, updateGroupError } from '../../../actions/groupActions';

// Componenets Style
import styles from '../Stylesheet';

import validator from '../validate/validation_wrapper'

// Creating Component
class AddGroupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groupDescription: '',
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
        const data = {
            token: this.props.token,
            groupDescription: this.state.groupDescription,
            groupId: this.props.currentEditingGroupIdData,
        }
        this.props.updateGroupSuccess(false);
        this.props.updateGroup(data);
        Actions.pop();
    };

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    autoFocus={true}
                    style={styles.addGroupInputBox}
                    onChangeText={GroupDescription => this.setState({ groupDescription: GroupDescription })}
                    placeholder="Enter Group Description"
                    placeholderTextColor="#B8B8B8"
                    selectionColor="#fff"
                    autoCorrect={false}
                    returnKeyType="next"
                    autoCapitalize="none"
                    onSubmitEditing={() => this.changeGroupName()}
                />

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
        currentEditingGroupIdData: state.groupMenuReducer.currentEditingGroupIdData,
        updateGroupError: state.groupReducer.updateGroupError,
        token: state.logInReducer.token
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
)(AddGroupForm);
