import React, { Component } from 'react';
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Alert,
  ScrollView,
  SafeAreaView,
  DeviceEventEmitter,
  AsyncStorage
} from 'react-native';

import GroupMenu from './GroupMenu/GroupMenu';
import CreatePostButton from '../Groups/GroupFeed/CreatePostButton';
import GroupFeed from '../Groups/GroupFeed/GroupFeed';

// Componenets Style
import styles from './Stylesheet';
import { Actions, ActionConst } from 'react-native-router-flux';

import { AppTour, AppTourSequence, AppTourView } from 'react-native-app-tour'

//Redux actions
import { connect } from 'react-redux';
import {
  getActiveGroup,
  getActiveGroupError,
  getActiveGroupSuccess,
  getActiveGroupDataSuccess,
  groupExists,
  getActiveGroupRefreshDataOnly,
  getGroupMember,
  getAllGroupMember,
} from '../../actions/groupActions';

import {
  getUser,
} from '../../actions/userActions';

import {
  disconnectGroupFeed
} from '../../actions/groupFeedAction';

import {
  disconnectGroupChatRoom
} from '../../actions/groupChatRoomAction';

import { getGroupAllMarks } from '../../actions/groupMarkAction';

class Home extends Component {
  constructor(props) {
    super(props);
    this.location = {
      latitude: 0.0,
      longitude: 0.0
    };
    this.state = {
      interval: '',
      groupImg: ''
    };
    this.appTourTargets = []
    this.firstLaunch = false
  }

  componentWillMount() {
    this.registerSequenceStepEvent()
    this.registerFinishSequenceEvent()
  }

  componentDidMount() {
    try {
      this.props.getUser({ token: this.props.token });

      this.props.getAllGroupMember({
        groupId: this.props.getActiveGroupData._id,
        token: this.props.token
      });

      this.props.getGroupMember({
        groupId: this.props.getActiveGroupData._id,
        token: this.props.token
      });
    } catch (error) {
      console.log("Home component mount Error: " + error);
    }

    // update every 25 seconds
    this.setState({
      interval: setInterval(() => {
        try {
          this.checkIfGroupExists(this.props.getActiveGroupData._id);
          this.props.getActiveGroupRefreshDataOnly({
            groupId: this.props.getActiveGroupData._id,
            token: this.props.token
          });

          this.props.getUser({ token: this.props.token });

          this.props.getGroupAllMarks({
            groupMarkId: this.props.getActiveGroupData.groupMarks,
            token: this.props.token
          });

          this.props.getAllGroupMember({
            groupId: this.props.getActiveGroupData._id,
            token: this.props.token
          });

          this.props.getGroupMember({
            groupId: this.props.getActiveGroupData._id,
            token: this.props.token
          });
        } catch (error) {
          console.log("Home Interval Error: " + error);
        }
      }, 11000)
    });

    // Check First Launch and store state in launched using AsyncStorage
    AsyncStorage.getItem('Launched').then((result) => {
      console.log(result)
      if (result === null){
        AsyncStorage.setItem('Launched', JSON.stringify('true')).then(() => AsyncStorage.getItem('Launched')
        .then((result)=>console.log('Launched:',result)))
        this.firstLaunch = true;
      } else {
        this.firstLaunch = false;
      }
    }).then(() => {
      if (this.firstLaunch) {
        setTimeout(() => {
          let appTourSequence = new AppTourSequence()
          this.appTourTargets.forEach(appTourTarget => {
            appTourSequence.add(appTourTarget)
          })
    
          AppTour.ShowSequence(appTourSequence)
        }, 1000)
      }
    })
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  loadingScreen() { }

  componentDidUpdate(prevProps) {
    // Checks if Active Group Still Exists.
    // If Active Group has been deleted then clear users active group.
    if (prevProps.groupExistsStatus !== this.props.groupExistsStatus) {
      if (!this.props.groupExistsStatus) {
        this.clearActiveGroup();
      }
    }
  }

  registerSequenceStepEvent = () => {
    if (this.sequenceStepListener) {
      this.sequenceStepListener.remove()
    }
    this.sequenceStepListener = DeviceEventEmitter.addListener(
      'onShowSequenceStepEvent',

    )
  }

  registerFinishSequenceEvent = () => {
    if (this.finishSequenceListener) {
      this.finishSequenceListener.remove()
    }
    this.finishSequenceListener = DeviceEventEmitter.addListener(
      'onFinishSequenceEvent',

    )
  }

  checkIfGroupExists(groupId) {
    const data = {
      token: this.props.token,
      groupId: groupId
    };
    this.props.groupExists(data);
  }

  clearActiveGroup() {
    AsyncStorage.setItem('lastActiveGroupId', "");
    this.props.disconnectGroupChatRoom({ socket: this.props.socket });
    this.props.disconnectGroupFeed({ groupFeedSocket: this.props.groupFeedSocket });
    this.props.getActiveGroupSuccess(false);
    this.props.getActiveGroupDataSuccess('');
    this.props.getActiveGroupError('');
    Actions.initial({ type: ActionConst.RESET });
  }

  render() {
    let groupImageSource = require('../../assests/images/food.jpg');
    try {
      groupImageSource = this.props.getActiveGroupData.groupImg ? {
        uri: 'data:image/png;base64,' + this.props.getActiveGroupData.groupImg
      }
        : require('../../assests/images/food.jpg');
    } catch (error) {
      groupImageSource = require('../../assests/images/food.jpg');
    }
    return (
      <View style={styles.root}>
        <View style={styles.Body}>
          <GroupMenu
            style={styles.image}
            addAppTourTarget={appTourTarget => {
              this.appTourTargets.push(appTourTarget)
            }} />
          <CreatePostButton
            style={styles.image}
            addAppTourTarget={appTourTarget => {
              this.appTourTargets.push(appTourTarget)
            }} />
          <View style={styles.InfoBody}>
            <ImageBackground
              source={groupImageSource}
              resizeMode="cover"
              style={styles.image}
            >
              <View style={styles.Overlay}>
                <Text style={styles.GroupName}>
                  {this.props.getActiveGroupData.groupName}
                  {'\n'}
                </Text>
                <Text style={styles.Message}>
                  {this.props.getActiveGroupData.groupDescription}
                </Text>
              </View>
            </ImageBackground>
          </View>
          <SafeAreaView style={styles.groupFeed}>
            <GroupFeed />
          </SafeAreaView>
        </View>
      </View>
    );
  }
}

// Redux Getter to use: this.props.(name of any return)
const mapStateToProps = state => {
  return {
    getUserData: state.userReducer.getUserData,
    getActiveGroupData: state.groupReducer.getActiveGroupData,
    getActiveGroupStatus: state.groupReducer.getActiveGroupStatus,
    token: state.logInReducer.token,
    groupExistsStatus: state.groupReducer.groupExistsStatus,
    updateGroupStatus: state.groupReducer.updateGroupStatus,
    updateGroupData: state.groupReducer.updateGroupStatus,
    loadingData: state.groupReducer.loadingData,
    getGroupAllMarksData: state.groupMarkReducer.getGroupAllMarksData,
    socket: state.groupChatRoomReducer.socket,
    groupFeedSocket: state.groupFeedReducer.groupFeedSocket,
  };
};

// Redux Setter to use: this.props.(name of any return)
const mapDispatchToProps = dispatch => {
  return {
    getUser: data => dispatch(getUser(data)),
    getActiveGroup: data => dispatch(getActiveGroup(data)),
    getActiveGroupSuccess: data => dispatch(getActiveGroupSuccess(data)),
    getActiveGroupDataSuccess: data => dispatch(getActiveGroupDataSuccess(data)),
    getActiveGroupError: data => dispatch(getActiveGroupError(data)),
    groupExists: data => dispatch(groupExists(data)),
    getGroupAllMarks: data => dispatch(getGroupAllMarks(data)),
    getActiveGroupRefreshDataOnly: data => dispatch(getActiveGroupRefreshDataOnly(data)),
    getGroupMember: data => dispatch(getGroupMember(data)),
    disconnectGroupFeed: data => dispatch(disconnectGroupFeed(data)),
    disconnectGroupChatRoom: data => dispatch(disconnectGroupChatRoom(data)),
    getAllGroupMember: data => dispatch(getAllGroupMember(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);