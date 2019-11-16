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
    SafeAreaView
} from "react-native";

// Componenets Style
import styles from "./Stylesheet";

//Redux actions
import { connect } from 'react-redux';
import {
    connectToGroupFeed,
    groupFeedStatus,
} from '../../../actions/groupFeedAction';

class GroupFeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postData: "",
            loading: false,
        };
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps) {
    }

    separator = () => <View style={styles.flatListItemSeporator} />

    render() {
        return (
            <SafeAreaView style={styles.groupPostContainer}>

                <View style={styles.flatListItemSeporator} />
                <FlatList style={styles.list}
                    ItemSeparatorComponent={this.separator}
                    data={this.props.getGroupFeedData}
                    keyExtractor={(item) => { return item._id; }}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.groupPost}>
                                <View style={styles.groupPostHeader}>
                                    <Image
                                        style={styles.groupPostProfilePic}
                                        source={{ uri: 'data:image/png;base64,' + item.userProfilePic }}
                                    />
                                    <Text style={styles.postText}>{item.userFirstName + " " + item.userLastName}</Text>
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
                                    <View style={styles.footerPartThree}></View>
                                </View>
                            </View>
                        );
                    }} />

                <View style={styles.flatListItemSeporator} />
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
