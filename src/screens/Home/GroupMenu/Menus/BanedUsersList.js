import React, { Component } from "react";
import {
    Text,
    View,
    TouchableOpacity,
    FlatList,
    ScrollView,
    SafeAreaView,
    Modal,
    TouchableWithoutFeedback
} from "react-native";

import Icon from "react-native-vector-icons/SimpleLineIcons";

//Redux actions
import { connect } from 'react-redux';
import {
    getBannedUsers,
    unBanUserFromGroup,
} from '../../../../actions/groupActions';

// Componenets Style
import styles from "../Stylesheet";
import { Actions } from "react-native-router-flux";

// BanedUsersList
class BanedUsersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            interval: "",
            modalVisible: false,
        };
    }


    componentDidMount() {
        const data = {
            token: this.props.token,
            groupId: this.props.getCurrentEditingGroupData._id,
        }
        this.props.getBannedUsers(data);

        // update every 5 seconds
        this.setState({
            interval: setInterval(() => {
                const data = {
                    token: this.props.token,
                    groupId: this.props.getCurrentEditingGroupData._id,
                }
                this.props.getBannedUsers(data);
            }, 5000)
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.interval);
    }

    pardonUser() {
        const data = {
            token: this.props.token,
            userId: this.state.pardoningUser,
            groupId: this.props.getCurrentEditingGroupData._id,
        }
        this.props.unBanUserFromGroup(data)
        Actions.editGroupMenu();
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    separator = () => <View style={styles.flatListItemSeporator} />

    render() {
        return (
            <View style={styles.modalStyle}>

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Actions.pop();
                    }}>
                    <View style={styles.modalStyle}>

                        <View style={styles.content} >
                            <Text style={styles.textBox}>Are you sure you want to pardon this user?</Text>

                            <View style={styles.flatListItemSeporator} />
                            <TouchableOpacity style={styles.groupRolePicker} onPress={() => this.pardonUser()}>
                                <Text style={styles.textBox} >YES</Text>
                            </TouchableOpacity>
                            <View style={styles.flatListItemSeporator} />
                            <TouchableOpacity style={styles.groupRolePicker} onPress={() => this.setModalVisible(!this.state.modalVisible)}>
                                <Text style={styles.textBox} >NO</Text>
                            </TouchableOpacity>
                            <View style={styles.flatListItemSeporator} />
                        </View>

                    </View>
                </Modal>

                <View>
                    <TouchableOpacity style={styles.closeButton} onPress={() => Actions.pop()}>
                        <Icon style={styles.closeIcon} name="arrow-left-circle" size={30} />
                    </TouchableOpacity>
                </View>
                <SafeAreaView style={styles.content} >
                    <Text style={styles.textBox}>Banned Users:</Text>
                    <View style={styles.flatListItemSeporator} />

                    <FlatList
                        ItemSeparatorComponent={this.separator}
                        data={this.props.bannedUserData}
                        renderItem={(users) => {
                            return (
                                <View style={styles.flatListItem}>

                                    <View style={styles.flatListColOne}>
                                    </View>
                                    <View style={styles.flatListColTwo}>
                                        <Text style={styles.flatListItemText}>
                                            {users.item.userFirstName + " " + users.item.userLastName}
                                        </Text>
                                    </View>

                                    <View style={styles.flatListColThree}>
                                        <TouchableOpacity style={styles.bannedIconButton} onPress={() => {
                                            this.setState({ pardoningUser: users.item._id }, () => {
                                                this.setModalVisible(!this.state.modalVisible);
                                            })
                                        }}>
                                            <Icon style={styles.bannedIcon} name="options" size={30} />
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            )
                        }
                        }
                        keyExtractor={item => item._id}
                    />

                    <View style={styles.flatListItemSeporator} />
                </SafeAreaView>
            </View>
        );
    }
}

// Redux Getter to use: this.props.(name of any return)
const mapStateToProps = state => {
    return {
        token: state.logInReducer.token,
        bannedUserData: state.groupReducer.bannedUserData,
        getCurrentEditingGroupData: state.groupMenuReducer.currentEditingGroupData,
    };
};

// Redux Setter to use: this.props.(name of any return)
const mapDispatchToProps = dispatch => {
    return {
        getBannedUsers: data => dispatch(getBannedUsers(data)),
        unBanUserFromGroup: data => dispatch(unBanUserFromGroup(data)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BanedUsersList);
