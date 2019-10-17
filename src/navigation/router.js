import React, { Component} from "react";
import { Platform, StatusBar } from "react-native";
import {Router, Stack, Scene} from 'react-native-router-flux';


import SignUp from "../screens/SignUp/SignUp";
import LogIn from "../screens/Login/Login";
import Home from "../screens/Home/home";
import Events from "../screens/Events/Event";
import Chat from "../screens/GroupChat/GroupChat";
import Map from "../screens/Map/Map"
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
        <Scene key="events" component={Events} title="Events"/>
        <Scene key="chat" component={Chat} title="Group Chat"/>
        <Scene key="map" component={Map} title="World View :P"/>

      </Stack>
    </Router>
  )
}

export default App;