import React, { Component} from "react";
import { Platform, StatusBar } from "react-native";
import {Router, Stack, Scene, ActionConst, Tabs} from 'react-native-router-flux';


import SignUp from "../screens/SignUp/SignUp";
import LogIn from "../screens/Login/Login";
import Home from "../screens/Home/home";
import Tester from "../screens/Tester Screen/Tester";
import Events from "../screens/Events/Event";
import Chat from "../screens/Groups/GroupChat/GroupChat";
import Map from "../screens/Map/Map"
import Profile from "../screens/Profile/Profile";

const headerStyle = {
  marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};

const App = () => {
  return (
    <Router hideNavBar={true} titleStyle={{color: 'white',}} navigationBarStyle={{backgroundColor: '#33C1FF',}}>
      <Stack key="root">
        <Scene key="login" component={LogIn} title="Login" headerMode="none"/>
        <Scene key="signup" component={SignUp} title="SignUp" headerMode="none"/>
        <Scene key="tester" component={Tester} title="Debug Page" type={ActionConst.RESET}/>
        <Stack Key="NavTab" tabs={true} showNavigationBar={false}>
          <Scene key="home" component={Home} title="Home"/>
          <Scene key="map" component={Map} title="Map"/>
          <Scene key="chat" component={Chat} title="Chat"/>
          <Scene key="events" component={Events} title="Events"/>
          <Scene key="profile" component={Profile} title="Profile"/>
        </Stack>
      </Stack>
    </Router>
  )
}

export default App;