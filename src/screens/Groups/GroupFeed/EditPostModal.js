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

// Componenets Style
import styles from "./Stylesheet";
import { Actions } from "react-native-router-flux";
import ImagePicker from 'react-native-image-picker';

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

    }
    deletePost() {

    }
    hidePost() {

    }
    reportPost() {

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
                            {/* If creator of the post show edit and delete button */}
                            {(true) &&
                                <TouchableOpacity style={styles.editGroupPopupRow} onPress={() => this.editPost()}>
                                    <Text style={styles.editGroupPopupText} >Edit</Text>
                                </TouchableOpacity>
                            }
                            {(true) &&
                                <TouchableOpacity style={styles.editGroupPopupRow} onPress={() => this.deletePost()}>
                                    <Text style={styles.editGroupPopupText} >Delete</Text>
                                </TouchableOpacity>
                            }
                            <TouchableOpacity style={styles.editGroupPopupRow} onPress={() => this.hidePost()}>
                                <Text style={styles.editGroupPopupText} >Hide</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.editGroupPopupRow} onPress={() => this.reportPost()}>
                                <Text style={styles.editGroupPopupText} >Report</Text>
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
    };
};

// Redux Setter to use: this.props.(name of any return)
const mapDispatchToProps = dispatch => {
    return {
        setImage: data => dispatch(setImage(data)),
        imageStatus: data => dispatch(imageStatus(data)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditPostModalGroup);
