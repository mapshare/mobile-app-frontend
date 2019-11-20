// Import Libraries
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    AsyncStorage,
    Keyboard,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import Icon from "react-native-vector-icons/SimpleLineIcons";

//Redux actions
import {
    searchGroup,
    searchGroupSuccess,
    searchGroupError,
    searchGroupDataSuccess,
} from '../../../actions/groupActions';


import {
    onSearchFocus,
    onSearchFocusSuccess,
    requestClearFieldSuccess
} from '../../../actions/SearchGroupFormAction';

// Componenets Style
import styles from '../Stylesheet';

import validator from '../validate/validation_wrapper'

// Creating Component
class SearchGroupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groupName: '',
            searchGroupError: '',
        };
    }
    componentDidMount(){
        this.searchGroupName();
    }

    componentWillUnmount() {
        this.searchGroupName("")
    }

    componentDidUpdate(prevProps) {
        if (prevProps.searchStatus !== this.props.searchStatus) {
            if (this.props.searchStatus) {
                Keyboard.dismiss();
            }
        }

        if (prevProps.requestClearFieldStatus !== this.props.requestClearFieldStatus) {
            if (this.props.requestClearFieldStatus) {
                this.setState({ groupName: "" });
            }
        }

        if (this.props.getSearchGroupError) {
            this.props.searchGroupError("");
        }

        if (prevProps.getGroupsSuccess !== this.props.getGroupsSuccess) {
            if (this.props.getGroupsSuccess) {
                this.searchGroupName();
            }
        }
    }

    searchGroupName() {
        try {
            let searchRegex = new RegExp('^.*' + this.state.groupName + '.*$', 'gim');
            let searchResult = this.props.getGroupsData.filter(
                (group) => {
                    return (group.groupName.search(searchRegex) != -1) ? true : false;
                }
            );
            this.props.setSearchStatus(false);
            this.props.searchGroup(searchResult);
        } catch (error) {
            this.props.setSearchStatus(false);
            this.props.searchGroup([]);

        }

    }

    formFocus(value) {
        this.props.onSearchFocusSuccess(false);
        this.props.onSearchFocus({ focus: value });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.searchBox}>
                    <View style={styles.searchBoxItem}>
                        <Icon style={styles.searchIcon} name="magnifier" size={25} />
                        <TextInput
                            autoFocus={this.props.keyboardEnabled}
                            onFocus={() => this.formFocus(true)}
                            onBlur={() => this.formFocus(false)}
                            style={{ fontSize: 25, paddingLeft: 15 }}
                            onChangeText={GroupName => {
                                this.setState({ groupName: GroupName }, () => {
                                    this.searchGroupName();
                                });
                            }}
                            value={this.state.groupName}
                            placeholder="Search For New Group"
                            placeholderTextColor="#B8B8B8"
                            selectionColor="#fff"
                            autoCorrect={false}
                            returnKeyType="next"
                            autoCapitalize="none"
                            onSubmitEditing={() => this.searchGroupName(this.state.groupName)}
                            editable={this.props.enabled}
                        />
                        {this.state.searchGroupError ? <Text>{this.state.searchGroupError}</Text> : null}
                    </View>
                </View>
            </View>
        );
    }
}

// Redux Getter to use: this.props.(name of any return)
const mapStateToProps = state => {
    return {
        searchStatus: state.groupReducer.searchStatus,
        searchData: state.groupReducer.searchData,
        getGroupsData: state.groupReducer.getGroupsData,
        getSearchGroupError: state.groupReducer.searchGroupError,
        token: state.logInReducer.token,
        getGroupsSuccess: state.groupReducer.getGroupsSuccess,
        requestClearFieldStatus: state.searchGroupFormReducer.requestClearFieldStatus,
    };
};

// Redux Setter to use: this.props.(name of any return)
const mapDispatchToProps = dispatch => {
    return {
        searchGroup: data => dispatch(searchGroup(data)),
        searchGroupError: data => dispatch(searchGroupError(data)),
        onSearchFocus: data => dispatch(onSearchFocus(data)),
        onSearchFocusSuccess: data => dispatch(onSearchFocusSuccess(data)),
        requestClearFieldSuccess: data => dispatch(requestClearFieldSuccess(data)),
        setSearchStatus: data => dispatch(searchGroupSuccess(data)),
        searchGroupDataSuccess: data => dispatch(searchGroupDataSuccess(data)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SearchGroupForm);
