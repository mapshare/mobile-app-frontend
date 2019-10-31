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

//Redux actions
import { searchGroup, searchGroupSuccess, searchGroupError } from '../../../actions/groupActions';

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
        this.searchGroup();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.searchStatus !== this.props.searchStatus) {
            if (this.props.searchStatus) {
                Keyboard.dismiss();
            }
        }

        if (this.props.getSearchGroupError) {
            console.log(this.props.getSearchGroupError)
            alert(this.props.getSearchGroupError);
            this.props.searchGroupError("");
        }
    }

    searchGroup = async () => {
        const data = {
          token: this.props.token,
          groupName: this.state.groupName,
        }
        this.props.searchGroup(data);
    };

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.inputBox}
                    onChangeText={GroupName => this.setState({ groupName: GroupName })}
                    placeholder="Group Name"
                    placeholderTextColor="rgba(225,225,225,0.7)"
                    selectionColor="#fff"
                    autoCorrect={false}
                    returnKeyType="next"
                    autoCapitalize="none"
                    onSubmitEditing={() => this.password.focus()}
                />
                {this.state.searchGroupError ? <Text>{this.state.searchGroupError}</Text> : null}

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText} onPress={this.searchGroup}>
                        {this.props.type}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

// Redux Getter to use: this.props.(name of any return)
const mapStateToProps = state => {
    return {
        searchStatus: state.groupReducer.searchStatus,
        searchData: state.groupReducer.searchData,
        getSearchGroupError: state.groupReducer.searchGroupError,
        token: state.logInReducer.token
    };
};

// Redux Setter to use: this.props.(name of any return)
const mapDispatchToProps = dispatch => {
    return {
        searchGroup: data => dispatch(searchGroup(data)),
        searchGroupError: data => dispatch(searchGroupError(data))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SearchGroupForm);
