import React, { Component } from "react";
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    TextInput,
    FlatList,
    Button,
    SafeAreaView,
    ActivityIndicator,
} from "react-native";

// Componenets Style
import styles from "./Stylesheet";

import Icon from "react-native-vector-icons/SimpleLineIcons";
import Moment from 'moment';
import CreatePostButton from './CreatePostButton';

//Redux actions
import { connect } from 'react-redux';
import {
    connectToGroupFeed,
    groupFeedStatus,
} from '../../../actions/groupFeedAction';
import { Actions, Modal } from "react-native-router-flux";

class GroupFeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // Requred to pervent button spam
            singleActivation: false,
        };
    }

    separator = () => <View style={styles.flatListItemSeporator} />

    editPost(post) {
        Actions.editPostModal({ editingPost: post });
    }

    render() {
        let permission = 0;
        try {
            permission = this.props.getGroupMemberData.memberRole.groupRolePermisionLevel;
        } catch (error) {
            permission = 0;
        }

        let groupFeedEmpty = false;
        try {
            groupFeedEmpty = this.props.getGroupFeedData.length == 0;
        } catch (error) {
            groupFeedEmpty = false;
        }

        return (
            <SafeAreaView style={styles.groupPostContainer}>
                <View style={styles.flatListItemSeporator} />
                {!Array.isArray(this.props.getGroupFeedData) &&

                    <ActivityIndicator style={styles.spinnerStyle} size="large" color="#000" />
                }
                {groupFeedEmpty &&
                    <View>
                        <Text style={styles.emptyFeedText}> {"\n"} There is currently no posts for this group. {"\n"} Create the first post Now! {"\n"} {"\n"} </Text>
                        <CreatePostButton
                            inline={true}
                            size={60}
                            style={styles.createPostButtonInline} />
                    </View>
                }
                {Array.isArray(this.props.getGroupFeedData) &&
                    <FlatList style={styles.list}
                        data={this.props.getGroupFeedData}
                        keyExtractor={(item) => { return item._id; }}
                        renderItem={({ item }) => {

                            let profilePic = require('../../../assests/images/default-profile.png');
                            try {
                                profilePic = item.userProfilePic ? {
                                    uri: 'data:image/png;base64,' + item.userProfilePic
                                }
                                    : require('../../../assests/images/default-profile.png');
                            } catch (error) {
                                profilePic = require('../../../assests/images/default-profile.png');
                            }

                            return (
                                <View style={styles.groupPost}>
                                    <View style={styles.groupPostHeader}>
                                        <View style={styles.headerColOne}>
                                            <Image
                                                style={styles.profilePicImage}
                                                source={profilePic}
                                            />
                                        </View>
                                        <View style={styles.headerColTwo}>
                                            <Text style={styles.postText}>{item.userFirstName + " " + item.userLastName}</Text>
                                        </View>
                                        <View style={styles.headerColThree}>

                                            {/* If creator of the post or Admin/Owner show option menu for edit and delete */}
                                            {(item.postCreatedBy == this.props.getGroupMemberData._id ||
                                                permission >= 3) &&

                                                <TouchableOpacity
                                                    style={styles.optionsIconPadding}
                                                    disabled={this.state.singleActivation}
                                                    onPress={() => {
                                                        this.setState({ singleActivation: true }, () => {
                                                            this.editPost(item);
                                                            setTimeout(() => {
                                                                this.setState({ singleActivation: false });
                                                            }, 1000)
                                                        });
                                                    }}>
                                                    <Icon style={styles.optionsIcon} name="options" size={20} />
                                                </TouchableOpacity>
                                            }
                                        </View>
                                    </View>
                                    <View style={styles.groupPostBody}>
                                        <Image
                                            style={styles.groupPostImage}
                                            source={{ uri: 'data:image/png;base64,' + item.postImage }}
                                        />
                                    </View>
                                    <View style={styles.groupPostFooter}>
                                        <View style={styles.footerPartOne}></View>
                                        <View style={styles.footerPartTwo}>
                                            <Text style={styles.postText}>{item.userFirstName + " " + item.userLastName} {item.postCaption}</Text>

                                        </View>
                                        <View style={styles.footerPartThree}>
                                            <Text style={styles.time}>
                                                {"\n" + Moment(item.postCreatedAt).calendar() + "\n"}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            );
                        }} />
                }
            </SafeAreaView>
        );
    }
}

// Redux Getter to use: this.props.(name of any return)
const mapStateToProps = state => {
    return {
        token: state.logInReducer.token,
        getActiveGroupData: state.groupReducer.getActiveGroupData,
        getGroupMemberData: state.groupReducer.getGroupMemberData,
        getGroupFeedSocket: state.groupFeedReducer.groupFeedSocket,
        getGroupFeedStatus: state.groupFeedReducer.groupFeedStatus,
        getGroupFeedData: state.groupFeedReducer.groupFeedData,
        groupFeedSocket: state.groupFeedReducer.groupFeedSocket,
        getActiveGroupStatus: state.groupReducer.getActiveGroupStatus,
    };
};

// Redux Setter to use: this.props.(name of any return)
const mapDispatchToProps = dispatch => {
    return {
        connectToGroupFeed: data => dispatch(connectToGroupFeed(data)),
        groupFeedStatus: data => dispatch(groupFeedStatus(data)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(GroupFeed);
