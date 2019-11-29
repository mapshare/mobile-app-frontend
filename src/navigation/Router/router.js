import React, { Component } from "react";
import { Platform, StatusBar, TouchableHighlight } from "react-native";
import {
  Router,
  Stack,
  Scene,
  ActionConst,
  View,
  Lightbox,
  Modal,
  Actions
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
import CreatePostModal from "../../screens/Forms/CreatePost/CreatePost";
import EditPostModal from "../../screens/Groups/GroupFeed/EditPostModal";
import EditPostForm from "../../screens/Forms/EditPost/EditPost";
import LoadingScreen from "../../screens/Loading/Loading";
import ModalWindow from '../../screens/ModalWindow/ModalWindow';

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
import BanedUsersList from "../../screens/Home/GroupMenu/Menus/BanedUsersList";

const headerStyle = {
  marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};

//Redux actions
import { connect } from 'react-redux';

import {
  getGroups,
} from '../../actions/groupActions';

//Create a dedicated class that will manage the tabBar icon
class TabIcon extends Component {
  render() {
    return (<Icon name={this.props.name} size={20} color={this.props.focused ? '#087bff' : '#000000'}/>);
  }
}

class App extends Component {
  render() {
    return (
      <Router
        hideNavBar={true}
        titleStyle={{ color: "white" }}
        navigationBarStyle={{ backgroundColor: "#33C1FF" }}
      >

        <Lightbox key="root" hideNavBar>
          {/* Login & SignUp */}
          <Stack key="Auth">
            <Scene
              key="login"
              component={LogIn}
              type={ActionConst.RESET}
              hideNavBar
            />
            <Scene key="signup" component={SignUp} hideNavBar />
          </Stack>

          {/* OLD NAVIGATION */}
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

          {/* INITIAL SELECT GROUP NAVIGATION */}
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

          {/* MAIN NAVIGATION */}
          <Stack
            key="navTab"
            titleStyle={{ color: "white" }}
            navigationBarStyle={{ backgroundColor: "#33C1FF" }}
            tabs={true}>

            <Scene
              title="HOME"
              key="home"
              component={Home}
              hideNavBar
              icon={TabIcon}
              name="home"
            />

            <Scene
              title="DISCOVER"
              key="map"
              component={Map}
              icon={TabIcon}
              name="compass"
              hideNavBar
            />

            <Scene
              title="CHAT"
              key="chat"
              component={Chat}
              icon={TabIcon}
              name="people"
              hideNavBar
            />

            <Scene
              title="EVENTS"
              key="events"
              component={Events}
              icon={TabIcon}
              name="event"
              hideNavBar
            />

            <Scene
              title="MORE"
              key="profile"
              component={Profile}
              icon={TabIcon}
              name="options"
              hideNavBar
            />
          </Stack>

          {/* MANAGE GROUP NAVIGATION */}
          <Scene key='myGroupsMenu' hideNavBar hideTabBar component={MyGroupsMenu} />
          <Scene key="searchGroupMenu" hideNavBar hideTabBar component={SearchGroupMenu} />
          <Scene key="addGroupMenu" hideNavBar hideTabBar component={AddGroupMenu} />
          <Scene key="editGroupMenu" hideNavBar hideTabBar component={EditGroupMenu} />
          <Scene key="editGroupMemberMenu" hideNavBar hideTabBar component={EditGroupMemberMenu} />
          <Scene key="groupMembersListMenu" hideNavBar hideTabBar component={GroupMembersListMenu} />
          <Scene key="joinGroupRequestMenu" hideNavBar hideTabBar component={JoinGroupRequestMenu} />
          <Scene key="changeGroupNameMenu" hideNavBar hideTabBar component={ChangeGroupNameMenu} />
          <Scene key="changeGroupDescriptionMenu" hideNavBar hideTabBar component={ChangeGroupDescriptionMenu} />
          <Scene key="banedUsersList" hideNavBar hideTabBar component={BanedUsersList} />

          {/* MODALS */}
          <Scene key="loadingScreen" component={LoadingScreen} />
          <Scene key="createPostModal" component={CreatePostModal} />
          <Scene key="editPostModal" component={EditPostModal} />
          <Scene key="modalWindow" component={ModalWindow} />
          <Scene key="editPostForm" component={EditPostForm} />
        </Lightbox>
      </Router>
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
    getGroups: data => dispatch(getGroups(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);