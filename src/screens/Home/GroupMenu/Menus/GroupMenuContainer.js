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
} from "react-native";

//Redux actions
import { connect } from 'react-redux';

// Componenets Style
import styles from "../Stylesheet";
import { Actions } from "react-native-router-flux";

// Group Menu
class GroupMenuContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        Actions.myGroupsMenu();
    }

    render() {
        return (
            <View style={styles.modalStyle}>
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
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GroupMenuContainer);
