// Import Libraries
import React, { Component } from "react"
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage, Keyboard, ImageBackground, FlatList } from 'react-native';
import { Actions } from 'react-native-router-flux';

import SearchGroupForm from '../../Forms/SearchGroup/SearchGroupForm';

// Componenets Style
import styles from "./Stylesheet"


//Redux actions
import { connect } from 'react-redux';
import {
    searchGroup,
    searchGroupSuccess,
    getActiveGroup,
    getActiveGroupError,
    getActiveGroupSuccess
} from '../../../actions/groupActions';

function Item({ title }) {
    return (
        <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
}

// Creating Component
class SelectGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ""
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.getSearchStatus !== this.props.getSearchStatus) {
            if (this.props.getSearchStatus) {
                this.props.setSearchStatus(false);
                this.setState({ data: this.props.getSearchData });
            }
        }
    }


    setGroup = (groupId) => {
        const data = {
            token: this.props.token,
            groupId: groupId,
        }
        this.props.getActiveGroupSuccess(false);
        this.props.getActiveGroup(data);
    };

    render() {
        return (
            <View >
                <ImageBackground resizeMode="cover" style={styles.backgroundImage} source={require('../../../assests/images/logo.png')}>
                    <SearchGroupForm type="SearchGroupForm" style={styles.container} />

                    <FlatList
                        data={this.state.data}
                        renderItem={(group) => {
                            return (
                                <TouchableOpacity style={styles.button} onPress={() => this.setGroup(group.item._id)}>
                                    <Text style={styles.buttonText}>
                                        {group.item.groupName}
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
        getSearchData: state.groupReducer.searchData,
        getSearchStatus: state.groupReducer.searchStatus,
        token: state.logInReducer.token
    };
};

// Redux Setter to use: this.props.(name of any return)
const mapDispatchToProps = dispatch => {
    return {
        searchGroup: data => dispatch(searchGroup(data)),
        setSearchStatus: data => dispatch(searchGroupSuccess(data)),
        getActiveGroup: data => dispatch(getActiveGroup(data)),
        getActiveGroupSuccess: data => dispatch(getActiveGroupSuccess(data)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SelectGroup);
