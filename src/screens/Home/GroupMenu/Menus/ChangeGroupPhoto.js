import {
    Text,
    View,
    ImageBackground,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    Modal,
    FlatList, Button, Image
} from "react-native";

import React, { Component } from "react";
import Icon from "react-native-vector-icons/SimpleLineIcons";


//Redux actions
import { connect } from 'react-redux';
import { updateGroup, updateGroupSuccess, updateGroupError } from '../../../../actions/groupActions';


// Componenets Style
import styles from "../Stylesheet";
import { Actions } from "react-native-router-flux";

// Group Menu
class ChangeGroupPhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groupImg: ''
        }
    }

    componentDidMount(prevProps) {
        this.handleChoosePhoto();
    }

    updateGroupPhoto() {
        const data = {
            token: this.props.token,
            groupImg: this.state.groupImg,
            groupId: this.props.currentEditingGroupIdData,
        }
        this.props.updateGroupSuccess(false);
        this.props.updateGroup(data);
    }

    handleChoosePhoto() {
        let options = {
            title: 'Select Image',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                this.setState({
                    groupImg: response.data
                }, () => {
                    this.updateGroupPhoto();
                });
            }
        });
    };

    render() {
        return (
            <View>
            </View>
        );
    }
}

// Redux Getter to use: this.props.(name of any return)
const mapStateToProps = state => {
    return {
    };
};

// Redux Setter to use: this.props.(name of any return)
const mapDispatchToProps = dispatch => {
    return {
        updateGroup: data => dispatch(updateGroup(data)),
        updateGroupSuccess: data => dispatch(updateGroupSuccess(data)),
        updateGroupError: data => dispatch(updateGroupError(data)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChangeGroupPhoto);
