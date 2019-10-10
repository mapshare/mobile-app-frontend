import React, { Component} from "react";
import { Platform, StatusBar } from "react-native";
import {Router, Stack, Scene} from 'react-native-router-flux';


import SignUp from "../screens/SignUp/SignUp";
import LogIn from "../screens/Login/Login";
import Home from "../screens/Home/Home";
// import Profile from "";

const headerStyle = {
  marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};

const App = () => {
  return (
    <Router hideNavBar={true} titleStyle={{color: 'white',}} navigationBarStyle={{backgroundColor: '#33C1FF',}}>
      <Stack key="root">
        <Scene key="login" component={LogIn} title="Login"/>
        <Scene key="signup" component={SignUp} title="SignUp"/>
        <Scene key="home" component={Home} title="Home"/>

      </Stack>
    </Router>
  )
}

export default App;