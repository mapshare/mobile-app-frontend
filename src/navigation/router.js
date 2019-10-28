import React, { Component} from "react";
import { Platform, StatusBar } from "react-native";
import {Router, Stack, Scene} from 'react-native-router-flux';


import SignUp from "../screens/SignUp/SignUp";
import LogIn from "../screens/Login/Login";
import Home from "../screens/Home/home";
import Events from "../screens/Events/Event";
import ManageGroupChat from "../screens/ManageGroupChat/ManageGroupChat";
import AddChatRoom from "../screens/ManageGroupChat/AddChatRoom/AddChatRoom";
import GroupChat from "../screens/ManageGroupChat/GroupChat/GroupChat";
import SelectChatRoom from "../screens/ManageGroupChat/SelectChatRoom/SelectChatRoom";
import Map from "../screens/Map/Map"
import Profile from "../screens/Profile/Profile";
import ManageGroup from "../screens/ManageGroup/ManageGroup";
import SelectGroup from "../screens/ManageGroup/SelectGroup/SelectGroup";
import AddGroup from "../screens/ManageGroup/AddGroup/AddGroup";

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
        <Scene key="map" component={Map} title="World View :P"/>
        <Scene key="profile" component={Profile} title="Profile"/>
        <Scene key="manageGroup" component={ManageGroup} title="ManageGroup"/>
        <Scene key="selectGroup" component={SelectGroup} title="SelectGroup"/>
        <Scene key="addGroup" component={AddGroup} title="AddGroup"/>
        <Scene key="manageGroupChat" component={ManageGroupChat} title="ManageGroupChat"/>
        <Scene key="selectChatRoom" component={SelectChatRoom} title="SelectChatRoom"/>
        <Scene key="groupChat" component={GroupChat} title="GroupChat"/>
        <Scene key="addChatRoom" component={AddChatRoom} title="AddChatRoom"/>

      </Stack>
    </Router>
  )
}

export default App;