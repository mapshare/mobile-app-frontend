import React, { Component } from 'react';
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Alert,
  ScrollView,
  SafeAreaView,
  DeviceEventEmitter
} from 'react-native';
import Mapbox from '@react-native-mapbox-gl/maps';
import Geolocation from '@react-native-community/geolocation';
import GroupMenu from './GroupMenu/GroupMenu';
import CreatePostButton from '../Groups/GroupFeed/CreatePostButton';
import GroupFeed from '../Groups/GroupFeed/GroupFeed';

// Componenets Style
import styles from './Stylesheet';
import { Actions, ActionConst } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
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
  getGroupMember
} from '../../actions/groupActions';

import {
  getUser,
} from '../../actions/userActions';

import { getGroupAllMarks } from '../../actions/groupMarkAction';
import { getGroupDefaultMarkCategory } from '../../actions/groupDefaultMarkCategory';
import { getGroupAllCustomMarkCategory } from '../../actions/groupCustomMarkCategory';

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
  }

  componentWillMount() {
    this.registerSequenceStepEvent()
    this.registerFinishSequenceEvent()
  }

  componentDidMount() {

    this.props.getUser({ token: this.props.token });

    // update every 5 seconds
    this.setState({
      interval: setInterval(() => {
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

        this.props.getGroupMember({
          groupId: this.props.getActiveGroupData._id,
          token: this.props.token
        });

        const data = {
          groupMarkId: this.props.getActiveGroupData.groupMarks,
          groupCategoryId: this.props.getActiveGroupData
            .groupCustomMarkCategory,
          token: this.props.token
        };

        this.props.getGroupDefaultMarkCategory(data);
        this.props.getGroupAllCustomMarkCategory(data);
      }, 5000)
    });

    setTimeout(() => {
      let appTourSequence = new AppTourSequence()
      this.appTourTargets.forEach(appTourTarget => {
        appTourSequence.add(appTourTarget)
      })

      AppTour.ShowSequence(appTourSequence)
    }, 1000)
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
    this.props.getActiveGroupSuccess(false);
    this.props.getActiveGroupDataSuccess('');
    this.props.getActiveGroupError('');
    Actions.initial({ type: ActionConst.RESET });
  }

  render() {
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
              source={
                this.props.getActiveGroupData.groupImg
                  ? {
                    uri:
                      'data:image/png;base64,' +
                      this.props.getActiveGroupData.groupImg
                  }
                  : require('../../assests/images/food.jpg')
              }
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
    getGroupAllMarksData: state.groupMarkReducer.getGroupAllMarksData
  };
};

// Redux Setter to use: this.props.(name of any return)
const mapDispatchToProps = dispatch => {
  return {
    getUser: data => dispatch(getUser(data)),
    getActiveGroup: data => dispatch(getActiveGroup(data)),
    getActiveGroupSuccess: data => dispatch(getActiveGroupSuccess(data)),
    getActiveGroupDataSuccess: data =>
      dispatch(getActiveGroupDataSuccess(data)),
    getActiveGroupError: data => dispatch(getActiveGroupError(data)),
    groupExists: data => dispatch(groupExists(data)),
    getGroupAllMarks: data => dispatch(getGroupAllMarks(data)),
    getActiveGroupRefreshDataOnly: data =>
      dispatch(getActiveGroupRefreshDataOnly(data)),
    getGroupMember: data => dispatch(getGroupMember(data)),
    getGroupDefaultMarkCategory: data =>
      dispatch(getGroupDefaultMarkCategory(data)),
    getGroupAllCustomMarkCategory: data =>
      dispatch(getGroupAllCustomMarkCategory(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
