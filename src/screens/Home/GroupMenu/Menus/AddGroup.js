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
} from "react-native";

import AddGroupForm from '../../../Forms/AddGroup/AddGroupFrom'
import Icon from "react-native-vector-icons/SimpleLineIcons";


//Redux actions
import { connect } from 'react-redux';
import {
    getUserGroupsSuccess,
} from '../../../../actions/groupActions';

// Componenets Style
import styles from "../Stylesheet";
import { Actions } from "react-native-router-flux";

// Group Menu
class AddGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidUpdate(prevProps) {
        
    }

    render() {
        return (
            <View style={styles.modalStyle}>
                <View>
                    <TouchableOpacity style={styles.closeButton} onPress={() => {
                        Actions.pop({refresh:{}});
                        Keyboard.dismiss();
                    }}>
                        <Icon style={styles.closeIcon} name="arrow-left-circle" size={30} />
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.content} keyboardShouldPersistTaps='always'>
                    <Text style={styles.addGroupText}>Add a New Group</Text>
                    <AddGroupForm type="Add Group" />
                </ScrollView>
            </View>
        );
    }
}

// Redux Getter to use: this.props.(name of any return)
const mapStateToProps = state => {
    return {
        status: state.groupReducer.status,
    };
};

// Redux Setter to use: this.props.(name of any return)
const mapDispatchToProps = dispatch => {
    return {
        getUserGroupsSuccess: data => dispatch(getUserGroupsSuccess(data)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddGroup);
