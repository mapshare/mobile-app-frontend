import React, { Component } from "react";
import { Platform, StatusBar } from "react-native";
import {
  Router,
  Stack,
  Scene,
  ActionConst,
  View,
  Lightbox
} from "react-native-router-flux";
import Icon from "react-native-vector-icons/SimpleLineIcons";

import SignUp from "../../screens/SignUp/SignUp";
import LogIn from "../../screens/Login/Login";
import Home from "../../screens/Home/Home";
import Tester from "../../screens/Tester Screen/Tester";
import Events from "../../screens/Events/Event";
import Map from "../../screens/Map/Map";
import Profile from "../../screens/Profile/Profile";
import ManageGroupChat from "../../screens/ManageGroupChat/ManageGroupChat";
import AddChatRoom from "../../screens/ManageGroupChat/AddChatRoom/AddChatRoom";
import GroupChat from "../../screens/ManageGroupChat/GroupChat/GroupChat";
import SelectChatRoom from "../../screens/ManageGroupChat/SelectChatRoom/SelectChatRoom";
import ManageGroup from "../../screens/ManageGroup/ManageGroup";
import SelectGroup from "../../screens/ManageGroup/SelectGroup/SelectGroup";
import AddGroup from "../../screens/ManageGroup/AddGroup/AddGroup";
import ManageGroupJoinRequests from "../../screens/ManageGroup/ManageGroupJoinRequests/ManageGroupJoinRequests";
import Chat from "../../screens/Groups/GroupChat/GroupChat";

// InitialGroupMenu
import InitialAddGroup from "../../screens/InitialGroupMenu/Menus/AddGroup";
import InitialMyGroups from "../../screens/InitialGroupMenu/Menus/MyGroups";
import InitialSearchGroup from "../../screens/InitialGroupMenu/Menus/SearchGroup";

// GroupMenu
import MyGroupsMenu from "../../screens/Home/GroupMenu/Menus/MyGroups";
import SearchGroupMenu from "../../screens/Home/GroupMenu/Menus/SearchGroup";
import AddGroupMenu from "../../screens/Home/GroupMenu/Menus/AddGroup";
import EditGroupMenu from "../../screens/Home/GroupMenu/Menus/EditGroup";
import EditGroupMemberMenu from "../../screens/Home/GroupMenu/Menus/EditGroupMember";
import GroupMembersListMenu from "../../screens/Home/GroupMenu/Menus/GroupMembersList";
import JoinGroupRequestMenu from "../../screens/Home/GroupMenu/Menus/JoinGroupRequest";
import ChangeGroupNameMenu from "../../screens/Home/GroupMenu/Menus/ChangeGroupName";
import ChangeGroupDescriptionMenu from "../../screens/Home/GroupMenu/Menus/ChangeGroupDescription";


const headerStyle = {
  marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};

//Create a dedicated class that will manage the tabBar icon
class TabIcon extends Component {
  render() {
    return <Icon name={this.props.name} size={18} />;
  }
}

export default class App extends Component {
  render() {
    return (
      <Router
        hideNavBar={true}
        titleStyle={{ color: "white" }}
        navigationBarStyle={{ backgroundColor: "#33C1FF" }}
      >
        <Stack key="root" hideNavBar>
          <Scene
            key="login"
            component={LogIn}
            type={ActionConst.RESET}
            hideNavBar
          />
          <Scene key="signup" component={SignUp} />
          <Scene key="tester" component={Tester} type={ActionConst.RESET} />
          <Scene
            key="manageGroup"
            component={ManageGroup}
            title="ManageGroup"
          />
          <Scene
            key="selectGroup"
            component={SelectGroup}
            title="SelectGroup"
          />
          <Scene key="addGroup" component={AddGroup} title="AddGroup" />
          <Scene
            key="manageGroupChat"
            component={ManageGroupChat}
            title="ManageGroupChat"
          />
          <Scene
            key="selectChatRoom"
            component={SelectChatRoom}
            title="SelectChatRoom"
          />
          <Scene key="groupChat" component={GroupChat} title="GroupChat" />
          <Scene
            key="addChatRoom"
            component={AddChatRoom}
            title="AddChatRoom"
          />
          <Scene
            key="manageGroupJoinRequests"
            component={ManageGroupJoinRequests}
            title="ManageGroupJoinRequests"
          />
          <Stack key="initial" hideNavBar>
            <Scene
              key="initialMyGroups"
              component={InitialMyGroups}
              name="initialMyGroups"
              type={ActionConst.RESET}
              hideNavBar
            />

            <Scene
              key="initialAddGroup"
              component={InitialAddGroup}
              name="initialAddGroup"
              hideNavBar
            />

            <Scene
              key="initialSearchGroup"
              duration={0}
              component={InitialSearchGroup}
              name="initialSearchGroup"
              hideNavBar
            />
          </Stack>

          <Stack
            hideNavBar
            key="groupsMenu">
            <Scene key='myGroupsMenu' component={MyGroupsMenu} />
            <Scene key="searchGroupMenu" component={SearchGroupMenu} />
            <Scene key="addGroupMenu" component={AddGroupMenu} />
            <Scene key="editGroupMenu" component={EditGroupMenu} />
            <Scene key="editGroupMemberMenu" component={EditGroupMemberMenu} />
            <Scene key="groupMembersListMenu" component={GroupMembersListMenu} />
            <Scene key="joinGroupRequestMenu" component={JoinGroupRequestMenu} />
            <Scene key="changeGroupNameMenu" component={ChangeGroupNameMenu} />
            <Scene key="changeGroupDescriptionMenu" component={ChangeGroupDescriptionMenu} />
          </Stack>

          <Stack key="navTab"
            titleStyle={{ color: "white" }}
            navigationBarStyle={{ backgroundColor: "#33C1FF" }}
            tabs={true}>

            <Scene
              key="home"
              component={Home}
              hideNavBar
              icon={TabIcon}
              name="home"
            />

            <Scene
              key="map"
              component={Map}
              icon={TabIcon}
              name="map"
              hideNavBar
            />
            <Scene
              key="chat"
              component={Chat}
              icon={TabIcon}
              name="people"
              hideNavBar
            />
            <Scene
              key="events"
              component={Events}
              icon={TabIcon}
              name="event"
              hideNavBar
            />
            <Scene
              key="profile"
              component={Profile}
              icon={TabIcon}
              name="options"
              hideNavBar
            />
          </Stack>
        </Stack >
      </Router >
    );
  }
}
