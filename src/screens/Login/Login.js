// Import Libraries
import React, { Component } from "react"
import { Text, View, TextInput, TouchableOpacity, AsyncStorage, Keyboard, ImageBackground, Modal } from "react-native"
import LogInForm from '../Forms/Login/LoginForm';
import { Actions, ActionConst } from "react-native-router-flux";

// Componenets Style
import { styles, containerStyles } from "./Stylesheet"

//Redux actions
import { connect } from 'react-redux';
import { logInUserWithToken } from '../../actions/logInActions'

// Creating Component
class LogIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false
        };

    }

    componentDidMount = async () => {
        this.props.logInUserWithToken();
        
        AsyncStorage.getItem('welcomePage').then((result) => {
            if (result === null) {
              AsyncStorage.setItem('welcomePage', JSON.stringify('true'))
              this.setState({
                  modalVisible:true
              })
            }
          })
    }

    signup() {
        Actions.signup()
    }

    openModalWindow() {
        this.setState({
            modalVisible: true
        })
    }

    closeModalWindow() {
        this.setState({
            modalVisible: false
        })
    }

    render() {
        return (
            <View>
                <Modal
                    animationType="fade"
                    animationType="slide"
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.closeModalWindow();
                    }}
                >
                    <View style={containerStyles.mainContainer}>
                        <ImageBackground resizeMode="cover" style={containerStyles.backgroundImage} source={require('../../assests/images/logo.png')}>
                            <View style={containerStyles.contentContainer}>

                                <View style={containerStyles.welcomeContainer}>
                                    <Text style={containerStyles.welcomeText}>Welcome</Text>
                                    <Text style={containerStyles.welcomeText}>To PinIt</Text>
                                </View>
                                <View style={containerStyles.introContainer}>
                                    <Text style={containerStyles.introText}>For travelers, foodies, tourists, you and your friends.</Text>
                                    <Text style={containerStyles.introText}>Who love to explore, experience and share unique</Text>
                                    <Text style={containerStyles.introText}>locations with the people you care the most.</Text>
                                </View>
                                <TouchableOpacity style={containerStyles.buttonContainer} onPress={() => { this.closeModalWindow() }}>
                                    <Text style={containerStyles.buttonText}>START</Text>
                                </TouchableOpacity>

                            </View>
                        </ImageBackground>
                    </View>

                </Modal>
                <ImageBackground resizeMode="cover" style={styles.backgroundImage} source={require('../../assests/images/logo.png')}>
                    <Text style={styles.title}>Welcome to Pin IT!</Text>
                    <LogInForm type="Login" style={styles.container} />
                    <View>
                        <Text style={styles.signupText}>
                            Don't have an account yet?
                            </Text>
                        <TouchableOpacity onPress={this.signup}><Text style={styles.signupButton}>Signup</Text></TouchableOpacity>
                    </View>
                </ImageBackground>
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
        logInUserWithToken: data => dispatch(logInUserWithToken(data)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LogIn);
