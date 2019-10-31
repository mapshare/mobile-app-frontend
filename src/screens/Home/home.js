// Import Libraries
import React, { Component } from "react"
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage, Keyboard } from 'react-native';
import { Actions } from 'react-native-router-flux';

// Componenets Style
import styles from "./Stylesheet"

//Redux actions
import { connect } from 'react-redux';
import {
} from '../../actions/groupActions';

// Creating Component
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeGroup: "None"
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.getActiveGroupStatus !== this.props.getActiveGroupStatus) {
            if (this.props.getActiveGroupStatus) {
                this.setState({ activeGroup: this.props.getActiveGroupData.groupName });
            }
        }
    }

    AlertMessage() {
        alert("WIP")
    }

    goEvents() {
        Actions.events()
    }

    goManageGroup() {
        Actions.manageGroup()
    }

    goMap() {
        Actions.map()
    }

    goChat() {
        Actions.manageGroupChat()
    }

    goProfile() {
        Actions.profile()
    }

    render() {
        return (
            <View style={styles.container}>

                <Text>This is just a Tester Page which Links different screens</Text>

                <Text>Active Group: {this.state.activeGroup}</Text>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText} onPress={this.goManageGroup}>Manage Group</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText} onPress={this.goEvents}>Events</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText} onPress={this.goMap}>Map</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText} onPress={this.goProfile}>Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText} onPress={this.goChat}>Manage Group Chat</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText} onPress={this.AlertMessage}>Group Feed</Text>
                </TouchableOpacity>

            </View>
        );
    }
}


// Redux Getter to use: this.props.(name of any return)
const mapStateToProps = state => {
    return {
        getActiveGroupData: state.groupReducer.getActiveGroupData,
        getActiveGroupStatus: state.groupReducer.getActiveGroupStatus,
        token: state.logInReducer.token
    };
};

// Redux Setter to use: this.props.(name of any return)
const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Home);
