import React, { Component } from "react";
import {
    View,
    TouchableOpacity,
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

    goActiveMemberList() {
        Actions.activeMemberList();
    }

    render() {
        return (
            <View>
                <TouchableOpacity
                    disabled={this.state.singleActivation}
                    onPress={() => {
                        this.setState({ singleActivation: true }, () => {
                            this.goActiveMemberList();
                            setTimeout(() => {
                                this.setState({ singleActivation: false });
                            }, 1000)
                        });
                    }}
                    style={styles.ActiveMemberMenuBtnStyle}>
                    <Icon style={styles.ActiveMemberMenuIconStyle} name="menu" size={30} />
                </TouchableOpacity>
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
)(ActiveMemberMenuBtn);
