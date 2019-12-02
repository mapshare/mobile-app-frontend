import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  TextInput,
  FlatList,
  Button,
  KeyboardAvoidingView
} from "react-native";

import Moment from 'moment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

// Componenets Style
import styles from "./Stylesheet";
//Redux actions
import { connect } from 'react-redux';
import {
  connectToGroupChatSuccess,
  connectToGroupChatDataSuccess,
  connectToGroupChatError,
  joinGroupChatRoomSuccess,
  connectToGroupChat,
  joinGroupChatRoom,
  sendMessageToGroupChatRoom,
  sendMessageToGroupChatRoomSuccess,
  newMessageStatus,
  disconnectGroupChatRoom,
  disconnectGroupChatRoomSuccess,
} from '../../../actions/groupChatRoomAction';
import {
  getGroupMember,
  getGroupMemberSuccess
} from '../../../actions/groupActions';

import validator from '../../Forms/validate/validation_wrapper'

class GroupChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      groupMember: "",
      newMessage: "",
      chatRoomId: "",
      newMessageError: ""
    };
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps) {
  }

  sendMessage() {
    const newMessageError = validator('chatMessage', this.state.newMessage);

    this.setState({ newMessageError: newMessageError });
    if (!newMessageError) {
      const trimedMessage = this.state.newMessage.slice(0, 100).trim();
      const messageData = {
        socket: this.props.socket,
        messageBody: trimedMessage,
      }
      this.setState({ newMessage: "" })
      this.props.sendMessageToGroupChatRoomSuccess(false)
      this.props.sendMessageToGroupChatRoom(messageData)
    }
  }

  renderDate = (utcdate) => {
    return (
      <Text style={styles.time}>
        {Moment(utcdate).format('LT')}
      </Text>
    );
  }

  render() {
    return (
      
      <View style={styles.container} >
        
        <FlatList style={styles.list}
          inverted
          data={this.props.chatLogData.data}
          keyExtractor={(item) => { return item._id; }}
          renderItem={({ item }) => {
            let inMessage = item.messageCreatedBy === this.props.getGroupMemberData._id;
            let itemStyle = inMessage ? styles.itemIn : styles.itemOut;
            return (
              <View style={[styles.item, itemStyle]}>
                <View style={[styles.balloon]}>
                  <Text>{item.messageCreatedByName} {this.renderDate(item.messageCreatedAt)}</Text>
                  <Text>{item.messageBody}</Text>
                </View>
              </View>
            )
          }} />
          
        <View style={styles.footer}>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
              placeholder="Write a message..."
              underlineColorAndroid='transparent'
              onChangeText={(newMessage) => this.setState({ newMessage })}
              value={this.state.newMessage}
              maxLength={100}
              onSubmitEditing={() => this.sendMessage()}
            />
          </View>

          <TouchableOpacity style={styles.btnSend} onPress={() => this.sendMessage()}>
            <Image source={{ uri: "https://png.icons8.com/small/75/ffffff/filled-sent.png" }} style={styles.iconSend} />
          </TouchableOpacity>
        </View>
        
      </View>
      
    );
  }
}

// Redux Getter to use: this.props.(name of any return)
const mapStateToProps = state => {
  return {
    socket: state.groupChatRoomReducer.socket,
    token: state.logInReducer.token,
    getActiveGroupStatus: state.groupReducer.getActiveGroupStatus,
    getActiveGroupData: state.groupReducer.getActiveGroupData,
    getGroupMemberData: state.groupReducer.getGroupMemberData,
    connectToGroupChatStatus: state.groupChatRoomReducer.connectToGroupChatStatus,
    getActiveGroupChatRoomData: state.groupChatRoomReducer.getActiveGroupChatRoomData,
    joinGroupChatRoomStatus: state.groupChatRoomReducer.joinGroupChatRoomStatus,
    joinGroupChatRoomData: state.groupChatRoomReducer.joinGroupChatRoomData,
    chatLogData: state.groupChatRoomReducer.chatLogData,
    socket: state.groupChatRoomReducer.socket,
    newMessageData: state.groupChatRoomReducer.newMessageData,
    getNewMessageStatus: state.groupChatRoomReducer.getNewMessageStatus,
    getGroupMemberStatus: state.groupReducer.getGroupMemberStatus,
    disconnectGroupChatRoomStatus: state.groupChatRoomReducer.disconnectGroupChatRoomStatus,
  };
};

// Redux Setter to use: this.props.(name of any return)
const mapDispatchToProps = dispatch => {
  return {
    connectToGroupChat: data => dispatch(connectToGroupChat(data)),
    connectToGroupChatSuccess: data => dispatch(connectToGroupChatSuccess(data)),
    joinGroupChatRoom: data => dispatch(joinGroupChatRoom(data)),
    joinGroupChatRoomSuccess: data => dispatch(joinGroupChatRoomSuccess(data)),
    getGroupMember: data => dispatch(getGroupMember(data)),
    sendMessageToGroupChatRoom: data => dispatch(sendMessageToGroupChatRoom(data)),
    sendMessageToGroupChatRoomSuccess: data => dispatch(sendMessageToGroupChatRoomSuccess(data)),
    newMessageStatus: data => dispatch(newMessageStatus(data)),
    getGroupMemberSuccess: data => dispatch(getGroupMemberSuccess(data)),
    disconnectGroupChatRoom: data => dispatch(disconnectGroupChatRoom(data)),
    disconnectGroupChatRoomSuccess: data => dispatch(disconnectGroupChatRoomSuccess(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GroupChat);
