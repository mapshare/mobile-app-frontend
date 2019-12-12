import React, { Component } from 'react';
import { View, TouchableOpacity, Text, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import {
  Actions,
  ActionConst
} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

// Componenets Style
import { containerStyles } from './Stylesheet';

class WelcomeLanding extends Component {
  buttonOnClick = () => {
    console.log("Gologin")
    Actions.signup2();
  }

  render() {
    return (
      <View style={containerStyles.mainContainer}>
        <ImageBackground resizeMode = "cover" style = {containerStyles.backgroundImage} source = {require('../../assests/images/logo.png')}>
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
          <TouchableOpacity style={containerStyles.buttonContainer} onPress={() => {this.buttonOnClick()}}>
            <Text style={containerStyles.buttonText}>START</Text>
          </TouchableOpacity>
          
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
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeLanding);
