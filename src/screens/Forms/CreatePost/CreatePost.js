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
    Image
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from "react-native-vector-icons/SimpleLineIcons";

//Redux actions
import { connect } from 'react-redux';
import {
    sendPostToGroupFeed,
} from '../../../actions/groupFeedAction';


// Componenets Style
import styles from '../Stylesheet';

import validator from '../validate/validation_wrapper'

// Creating Component
class AddPostCaption extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postCaption: '',
            succesModalVisible: false
        };
    }

    componentDidUpdate(prevProps) {
    }

    createPost() {
        const data = {
            postImage: this.props.imageData,
            postCaption: this.state.postCaption,
            groupFeedSocket: this.props.groupFeedSocket,
        }
        this.props.sendPostToGroupFeed(data);
        Actions.pop();
    }

    setSuccesModalVisible(visible) {
        this.setState({ succesModalVisible: visible }, () => {
            setTimeout(() => {
                this.setState({ succesModalVisible: !visible });
            }, 3000);
        });
    }

    render() {
        return (
            <View style={styles.body} >
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

                <View style={styles.cancelPost}>
                    <TouchableOpacity style={styles.cancelPostButton} onPress={() => {
                        Actions.pop();
                        Keyboard.dismiss();
                    }}>
                        <Icon style={styles.cancelPostIcon} name="arrow-left-circle" size={30} />
                    </TouchableOpacity>
                </View>
                <View style={styles.CreatePost}>
                    <TouchableOpacity style={styles.CreatePostButton} onPress={() => {
                        this.createPost();
                    }}>
                        <Icon style={styles.CreatePostIcon} name="check" size={30} />
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <View style={styles.postImagePreview}>
                        <Image
                            style={styles.previewImage}
                            source={{ uri: 'data:image/png;base64,' + this.props.imageData }}
                        />
                    </View>
                    <View style={styles.postCaptionForm}>
                        <TextInput
                            autoFocus={true}
                            style={styles.addPostInputBox}
                            onChangeText={Caption => this.setState({ postCaption: Caption })}
                            placeholder="Enter Caption"
                            placeholderTextColor="#B8B8B8"
                            selectionColor="#fff"
                            autoCorrect={false}
                            multiline={true}
                            returnKeyType="next"
                            autoCapitalize="none"
                            onSubmitEditing={() => { }}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

// Redux Getter to use: this.props.(name of any return)
const mapStateToProps = state => {
    return {
        token: state.logInReducer.token,
        imageData: state.addPostReducer.imageData,
        captionData: state.addPostReducer.captionData,
        groupFeedSocket: state.groupFeedReducer.groupFeedSocket,
    };
};

// Redux Setter to use: this.props.(name of any return)
const mapDispatchToProps = dispatch => {
    return {
        sendPostToGroupFeed: data => dispatch(sendPostToGroupFeed(data)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AddPostCaption);
