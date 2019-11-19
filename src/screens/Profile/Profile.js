import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

// Componenets Style
import styles from "./Stylesheet"
import { Actions, ActionConst } from "react-native-router-flux";

export default class Profile extends Component {

  goLogin(){
    Actions.Auth({ type: ActionConst.RESET })
  }

  goTester(){
    Actions.tester()
  }

  render() {
    return (
      <View style={styles.container}>
          <View style={styles.header}></View>
          <Image style={styles.avatar} source={{uri: 'https://ksassets.timeincuk.net/wp/uploads/sites/54/2019/06/image-asset-920x518.jpeg'}}/>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>John Doe</Text>
              <Text style={styles.info}>Spartan Teams</Text>
              <Text style={styles.description}>I'm going in! When I look behind me, you'd better be there!</Text>
              
              <TouchableOpacity style={styles.buttonContainer}>
                <Text>Setting</Text>  
              </TouchableOpacity> 
              <TouchableOpacity style={styles.testerMode} onPress={this.goTester}>
                <Text>Enter Debug Mode</Text> 
              </TouchableOpacity>             
              <TouchableOpacity style={styles.logoutButton} onPress={this.goLogin}>
                <Text>Log Out</Text> 
              </TouchableOpacity>
            </View>
        </View>
      </View>
    );
  }
}