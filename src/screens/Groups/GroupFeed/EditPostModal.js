import React, { Component } from "react";
import {
    Text,
    View,
    ImageBackground,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    Modal,
    FlatList,
    ScrollView,
    Image
} from "react-native";

import Icon from "react-native-vector-icons/SimpleLineIcons";

//Redux actions
import { connect } from 'react-redux';
import {
    setImage,
    imageStatus,
} from '../../../actions/addPostActions';
import {
    deletePostGroupFeed
} from '../../../actions/groupFeedAction';


// Componenets Style
import styles from "./Stylesheet";
import { Actions } from "react-native-router-flux";
import ImagePicker from 'react-native-image-picker';
import { continueStatement } from "@babel/types";

// Group Menu
class EditPostModalGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps) {
    }

    editPost() {
        Actions.pop();
        Actions.editPostForm({ editingPost: this.props.editingPost });
    }

    deletePost() {
        const data = {
            postId: this.props.editingPost._id,
            groupFeedSocket: this.props.groupFeedSocket,
        }
        this.props.deletePostGroupFeed(data);
        Actions.pop();
    }

    render() {
        return (
            <Modal
                animationType="fade"
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    Actions.pop();
                }}>
                <TouchableWithoutFeedback onPress={() => Actions.pop()}>
                    <View style={styles.editGroupPost}>
                        <View style={styles.editGroupPostPopup}>
                            <TouchableOpacity style={styles.editGroupPopupRow} onPress={() => this.editPost()}>
                                <Text style={styles.editGroupPopupText} >Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.editGroupPopupRow} onPress={() => this.deletePost()}>
                                <Text style={styles.editGroupPopupText} >Delete</Text>
                            </TouchableOpacity>
                            <View style={styles.flatListItemSeporator} />
                            <TouchableOpacity style={styles.editGroupPopupRow} onPress={() => Actions.pop()}>
                                <Text style={styles.editGroupPopupText} >Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    }
}

// Redux Getter to use: this.props.(name of any return)
const mapStateToProps = state => {
    return {
        groupFeedSocket: state.groupFeedReducer.groupFeedSocket,
        getGroupFeedData: state.groupFeedReducer.groupFeedData,
    };
};

// Redux Setter to use: this.props.(name of any return)
const mapDispatchToProps = dispatch => {
    return {
        setImage: data => dispatch(setImage(data)),
        imageStatus: data => dispatch(imageStatus(data)),
        deletePostGroupFeed: data => dispatch(deletePostGroupFeed(data)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditPostModalGroup);
