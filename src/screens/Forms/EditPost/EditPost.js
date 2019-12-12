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
import Icon from 'react-native-vector-icons/SimpleLineIcons';

//Redux actions
import { connect } from 'react-redux';
import {
    sendPostToGroupFeed,
    updatePostInGroupFeed
} from '../../../actions/groupFeedAction';

// Componenets Style
import styles from '../Stylesheet';

import validator from '../validate/validation_wrapper';
import ImagePicker from 'react-native-image-picker';

// Creating Component
class EditPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postCaption: '',
            postImage: '',
            editPostError: '',
            // Requred to pervent button spam
            singleActivation: false,
        };
    }

    componentDidMount() {
        try {
            this.setState({ postCaption: this.props.editingPost.postCaption });
            this.setState({ postImage: this.props.editingPost.postImage });
        } catch (error) { }
    }

    editPost() {
        const editPostError = validator('postCaption', this.state.postCaption.slice(0, 100).trim());
        this.setState({ editPostError: editPostError }, () => {
            if (!editPostError) {
                const data = {
                    postId: this.props.editingPost._id,
                    postImage: this.state.postImage,
                    postCaption: this.state.postCaption.slice(0, 100).trim(),
                    groupFeedSocket: this.props.groupFeedSocket
                };
                this.props.updatePostInGroupFeed(data);
                Actions.pop();
            }
        });
    }

    updatePostCaption(postCaption) {
        const addPostError = validator('postCaption', postCaption.slice(0, 100).trim());
        const trimedCaption = postCaption.slice(0, 100).replace(/\n/g, '');
        this.setState({ postCaption: trimedCaption, addPostError: addPostError ? addPostError : "" });
    }

    choosePhoto() {
        let options = {
            title: null,
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };

        ImagePicker.showImagePicker(options, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                this.setState({ postImage: response.data });
            }
        });
    }

    render() {
        return (
            <View style={styles.body}>
                <View style={styles.cancelPost}>
                    <TouchableOpacity
                        style={styles.cancelPostButton}
                        onPress={() => {
                            Actions.pop();
                            Keyboard.dismiss();
                        }}
                    >
                        <Icon
                            style={styles.cancelPostIcon}
                            name="arrow-left-circle"
                            size={30}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.CreatePost}>
                    <TouchableOpacity
                        style={styles.CreatePostButton}
                        onPress={() => {
                            this.editPost();
                        }}
                    >
                        <Icon style={styles.CreatePostIcon} name="check" size={30} />
                    </TouchableOpacity>
                </View>

                <View style={styles.row}>
                    <View style={styles.postImagePreview}>
                        <TouchableOpacity
                            onPress={() => {
                                this.choosePhoto();
                            }}
                        >
                            <Image
                                style={styles.previewImage}
                                source={{ uri: 'data:image/png;base64,' + this.state.postImage, width: 120, height: 120, scale: 1.1 }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.postCaptionForm}>
                        <TextInput
                            autoFocus={true}
                            style={styles.addPostInputBox}
                            onChangeText={Caption => this.updatePostCaption(Caption)}
                            value={this.state.postCaption}
                            placeholder="Enter Caption"
                            placeholderTextColor="#B8B8B8"
                            selectionColor="#fff"
                            autoCorrect={false}
                            multiline={true}
                            maxLength={100}
                            returnKeyType="next"
                            autoCapitalize="none"
                            onSubmitEditing={() => { }}
                        />
                        {this.state.addPostError ? <Text>{this.state.addPostError}</Text> : null}
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
        groupFeedSocket: state.groupFeedReducer.groupFeedSocket
    };
};

// Redux Setter to use: this.props.(name of any return)
const mapDispatchToProps = dispatch => {
    return {
        updatePostInGroupFeed: data => dispatch(updatePostInGroupFeed(data))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(EditPost);
