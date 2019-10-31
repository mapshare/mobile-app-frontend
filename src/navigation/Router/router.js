import React, { Component} from "react";
import { Platform, StatusBar } from "react-native";
import {Router, Stack, Scene, ActionConst, View} from 'react-native-router-flux';
import Icon from "react-native-vector-icons/SimpleLineIcons"


import SignUp from "../../screens/SignUp/SignUp";
import LogIn from "../../screens/Login/Login";
import Home from "../../screens/Home/home";
import Tester from "../../screens/Tester Screen/Tester";
import Events from "../../screens/Events/Event";
import Chat from "../../screens/Groups/GroupChat/GroupChat";
import Map from "../../screens/Map/Map"
import Profile from "../../screens/Profile/Profile";
import crtgrp from "../../screens/Groups/CreateGroup/CreateGroup"

const headerStyle = {
  marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};

//Create a dedicated class that will manage the tabBar icon
class TabIcon extends Component{
  render() {
    return (
        <Icon name={this.props.name} size={18}/>
    );
  }
}

export default class App extends Component {

  render() {
    return(
      <Router hideNavBar={true} titleStyle={{color: 'white',}} navigationBarStyle={{backgroundColor: '#33C1FF',}}>
      <Stack key="root" hideNavBar>
        <Scene key="login" component={LogIn} type={ActionConst.RESET} hideNavBar/>
        <Scene key="signup" component={SignUp}/>
        <Scene key="tester" component={Tester} type={ActionConst.RESET} />
        <Scene key="crtgrp" component={crtgrp}/>

        <Router hideNavBar={true} titleStyle={{color: 'white',}} navigationBarStyle={{backgroundColor: '#33C1FF',}}>
          <Stack Key="NavTab" tabs={true} showNavigationBar={false} hideNavBar>
            <Scene key="home" component={Home} icon={TabIcon} name="home" hideNavBar/>
            <Scene key="map" component={Map} icon={TabIcon} name="map" hideNavBar/>
            <Scene key="chat" component={Chat} icon={TabIcon} name="people" hideNavBar/>
            <Scene key="events" component={Events} icon={TabIcon} name="event" hideNavBar/>
            <Scene key="profile" component={Profile} icon={TabIcon} name="options" hideNavBar/>
          </Stack>
        </Router>
        
      </Stack>
    </Router>
    )
  }
}
