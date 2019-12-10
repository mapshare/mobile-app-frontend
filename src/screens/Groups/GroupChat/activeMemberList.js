import React, { Component } from "react";
import {
    View,
    TouchableOpacity,
    FlatList,
    Text,
    Modal,
    SafeAreaView
} from "react-native";

import Icon from "react-native-vector-icons/SimpleLineIcons";

//Redux actions
import { connect } from 'react-redux';
import {
} from '../../../actions/groupActions';

// Componenets Style
import styles from "./Stylesheet";
import { Actions } from "react-native-router-flux";

// active Member Menu Btn
class ActiveMemberMenuBtn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // Requred to pervent button spam
            singleActivation: false,
        };
    }

    separator = () => <View style={styles.flatListItemSeporator} />

    render() {
        let uniqueActiveMembersData = []
        let oflineMembersData = [];
        try {
            // Filter out duplicate Members
            for (let i = 0; i < this.props.activeMembersData.length; i++) {
                let found = uniqueActiveMembersData.find((element) => {
                    return (this.props.activeMembersData[i].memberId == element.memberId);
                });
                if (!found) {
                    uniqueActiveMembersData.push(this.props.activeMembersData[i]);
                }
            }

            // Filter online and offline Members
            for (let i = 0; i < this.props.getAllGroupMemberData.length; i++) {
                let found = uniqueActiveMembersData.find((element) => {
                    return (this.props.getAllGroupMemberData[i]._id == element.memberId);
                });
                if (!found) {
                    oflineMembersData.push(this.props.getAllGroupMemberData[i]);
                }
            }
            
        } catch (error) {
            uniqueActiveMembersData = []
            oflineMembersData = [];
            console.log("Problem while loading active Member list");
        }
        return (
            <Modal
                animationType="fade"
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    Actions.pop();
                }}>
                <SafeAreaView style={styles.modalStyle} >
                    <TouchableOpacity style={styles.closeButton} onPress={() => {
                        Actions.pop();
                    }}>
                        <Icon style={styles.closeIcon} name="close" size={30} />
                    </TouchableOpacity>
                    <Text style={styles.textBox}>Online Members:</Text>
                    <View style={styles.flatListItemSeporator} />
                    <SafeAreaView>
                        <FlatList style={styles.flatList}
                            ItemSeparatorComponent={this.separator}
                            data={uniqueActiveMembersData}
                            keyExtractor={(item) => { return item._id; }}
                            renderItem={({ item }) => {
                                return (
                                    <View style={styles.activeMemberRow}>
                                        <Text style={styles.textBox}>
                                            {item.userFirstName} {item.userLastName}
                                        </Text>
                                    </View>
                                );
                            }} />
                    </SafeAreaView>
                    <Text style={styles.textBox}>Offline Members:</Text>
                    <View style={styles.flatListItemSeporator} />
                    <SafeAreaView>
                        <FlatList style={styles.flatList}
                            ItemSeparatorComponent={this.separator}
                            data={oflineMembersData}
                            keyExtractor={(item) => { return item._id; }}
                            renderItem={({ item }) => {
                                return (
                                    <View style={styles.activeMemberRow}>
                                        <Text style={styles.textBox}>
                                            {item.userFirstName} {item.userLastName}
                                        </Text>
                                    </View>
                                );
                            }} />
                    </SafeAreaView>
                </SafeAreaView>
            </Modal>
        );
    }
}

// Redux Getter to use: this.props.(name of any return)
const mapStateToProps = state => {
    return {
        activeMembersData: state.groupChatRoomReducer.activeMembersData,
        getAllGroupMemberData: state.groupReducer.getAllGroupMemberData,
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
)(ActiveMemberMenuBtn);
