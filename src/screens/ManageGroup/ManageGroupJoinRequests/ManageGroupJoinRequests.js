// Import Libraries
import React, { Component } from "react"
import { Modal, TouchableHighlight, StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage, Keyboard, ImageBackground, FlatList } from 'react-native';
import { Actions } from 'react-native-router-flux';


// Componenets Style
import styles from "./Stylesheet";


//Redux actions
import { connect } from 'react-redux';
import {
    searchGroup,
    searchGroupSuccess,
    getActiveGroup,
    getActiveGroupError,
    getActiveGroupSuccess,
    reviewJoinGroupRequests,
    reviewJoinGroupRequestsSuccess,
    getAllJoinGroupRequests,
    allJoinGroupRequestsSuccess
} from '../../../actions/groupActions';

// Creating Component
class ManageGroupJoinRequests extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: "",
            modalVisible: false,
            selectedPendingUserId: ""
        };
    }
    componentDidMount(){
        const data = {
            token: this.props.token,
            groupId: this.props.getActiveGroupData._id,
        }
        this.props.allJoinGroupRequestsSuccess(false);
        this.props.getAllJoinGroupRequests(data);
    }
    componentDidUpdate(prevProps) {
        if (prevProps.getAllJoinGroupRequestsStatus !== this.props.getAllJoinGroupRequestsStatus) {
            if (this.props.getAllJoinGroupRequestsStatus) {
                const data = {
                    token: this.props.token,
                    groupId: this.props.getActiveGroupData._id,
                }
                this.props.allJoinGroupRequestsSuccess(false);
                this.props.getAllJoinGroupRequests(data);
                this.setState({ data: this.props.getAllJoinGroupRequestsData });
            }
        }
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    selectPendingUser(visible, selectedPendingUserId) {
        this.setState({ modalVisible: visible });
        this.setState({ selectedPendingUserId: selectedPendingUserId });
    }

    reviewRequest(status) {
        const data = {
            token: this.props.token,
            groupId: this.props.getActiveGroupData._id,
            status: status,
            pendingUserId: this.state.selectedPendingUserId,
        }
        this.props.reviewJoinGroupRequestsSuccess(false);
        this.props.reviewJoinGroupRequests(data);
        this.setModalVisible(!this.state.modalVisible)
    }

    render() {
        return (
            <View >
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <View style={{ marginTop: 22 }}>
                        <View>
                            <Text style={styles.buttonText}>Would you like to request to join group {this.state.requestedGroupToJoinName}?</Text>
                            <TouchableOpacity style={styles.button} onPress={() => this.reviewRequest(true)}>
                                <Text style={styles.buttonText}>YES</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.button} onPress={() => this.reviewRequest(false)}>
                                <Text style={styles.buttonText}>NO</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <ImageBackground resizeMode="cover" style={styles.backgroundImage} source={require('../../../assests/images/logo.png')}>
                    <FlatList
                        data={this.state.data}
                        renderItem={(request) => {
                            return (
                                <TouchableOpacity style={styles.button} onPress={() => this.selectPendingUser(!this.state.modalVisible, request.item._id)}>
                                    <Text style={styles.buttonText}>
                                        {request.item.userFirstName + " " + request.item.userLastName + "\n"}
                                        {request.item.userEmail}
                                    </Text>
                                </TouchableOpacity>
                            )
                        }
                        }
                        keyExtractor={item => item._id}
                    />
                </ImageBackground>
            </View>
        );
    }
}

// Redux Getter to use: this.props.(name of any return)
const mapStateToProps = state => {
    return {
        token: state.logInReducer.token,
        getAllJoinGroupRequestsStatus: state.groupReducer.getAllJoinGroupRequestsStatus,
        getAllJoinGroupRequestsData: state.groupReducer.getAllJoinGroupRequestsData,
        getActiveGroupData: state.groupReducer.getActiveGroupData,
    };
};

// Redux Setter to use: this.props.(name of any return)
const mapDispatchToProps = dispatch => {
    return {
        reviewJoinGroupRequests: data => dispatch(reviewJoinGroupRequests(data)),
        reviewJoinGroupRequestsSuccess: data => dispatch(reviewJoinGroupRequestsSuccess(data)),
        getAllJoinGroupRequests: data => dispatch(getAllJoinGroupRequests(data)),
        allJoinGroupRequestsSuccess: data => dispatch(allJoinGroupRequestsSuccess(data)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ManageGroupJoinRequests);
