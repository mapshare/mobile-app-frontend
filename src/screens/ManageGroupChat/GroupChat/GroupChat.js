import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  TextInput,
  FlatList,
  Button
} from 'react-native';

// Componenets Style
import styles from "./Stylesheet"

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
  sendMessageToGroupChatRoomSuccess
} from '../../../actions/groupChatRoomAction';
import {
  getGroupMember
} from '../../../actions/groupActions';

/*[
        { _id: 1, messageCreatedAt: "9:50 am", type: 'in', messageBody: "Temp Data in" },
        { _id: 2, messageCreatedAt: "9:50 am", type: 'out', messageBody: "Temp Data out" },
        { _id: 3, messageCreatedAt: "9:50 am", type: 'in', messageBody: "Temp Data in" },
        { _id: 4, messageCreatedAt: "9:50 am", type: 'in', messageBody: "Temp Data in" },
      ]
[
        { id: 1, messageCreatedAt: "9:50 am", type: 'in', messageBody: "Temp Data in" },
        { id: 2, messageCreatedAt: "9:50 am", type: 'out', messageBody: "Temp Data out" },
        { id: 3, messageCreatedAt: "9:50 am", type: 'in', messageBody: "Temp Data in" },
        { id: 4, messageCreatedAt: "9:50 am", type: 'in', messageBody: "Temp Data in" },
      ]
*/
class GroupChat extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      groupMember: "",
      newMessage: ""
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.connectToGroupChatStatus !== this.props.connectToGroupChatStatus) {
      if (this.props.connectToGroupChatStatus) {
        const joinData = {
          socket: this.props.socket,
          groupId: this.props.getActiveGroupData._id,
          chatRoomId: this.props.getActiveGroupChatRoomData._id
        }
        this.props.joinGroupChatRoom(joinData);
      }
    }

    if (prevProps.joinGroupChatRoomStatus !== this.props.joinGroupChatRoomStatus) {
      if (this.props.joinGroupChatRoomStatus) {
        this.setState({ data: this.props.joinGroupChatRoomData });
      }
    }


    if (prevProps.joinGroupChatRoomStatus !== this.props.joinGroupChatRoomStatus) {
      if (this.props.joinGroupChatRoomStatus) {
        this.setState({ data: this.props.joinGroupChatRoomData });
      }
    }
  }

  componentDidMount() {
    const data = {
      token: this.props.token,
      groupId: this.props.getActiveGroupData._id,
    }
    // maybe disconnect then connect
    this.props.joinGroupChatRoomSuccess(false);
    this.props.connectToGroupChatSuccess(false);
    this.props.connectToGroupChat(data);
    //this.setState({ groupMember: this.props.getGroupMemberData })
  }

  sendMessage() {
    const messageData = {
      socket: this.props.socket,
      messageBody: this.state.newMessage,
    }
    this.props.sendMessageToGroupChatRoomSuccess(false)
    this.props.sendMessageToGroupChatRoom(messageData)
  }

  renderDate = (date) => {
    return (
      <Text style={styles.time}>
        {date}
      </Text>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList style={styles.list}
          data={this.state.data}
          keyExtractor={(item) => {
            return item._id;
          }}
          renderItem={(message) => {
            const item = message.item;
            let inMessage = item.messageCreatedBy == this.state.groupMember;
            let itemStyle = inMessage ? styles.itemIn : styles.itemOut;
            <View style={[styles.item, itemStyle]}>
              {!inMessage && this.renderDate(item.messageCreatedAt)}
              <View style={[styles.balloon]}>
                <Text>{item.messageBody}</Text>
              </View>
              {inMessage && this.renderDate(item.messageCreatedAt)}
            </View>
            return (
              <View style={[styles.item, itemStyle]}>
                <View style={[styles.balloon]}>
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
            />
          </View>

          <TouchableOpacity style={styles.btnSend} onPress={this.sendMessage.bind(this)}>
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
    getActiveGroupData: state.groupReducer.getActiveGroupData,
    getGroupMemberData: state.groupReducer.getGroupMemberData,
    connectToGroupChatStatus: state.groupChatRoomReducer.connectToGroupChatStatus,
    getActiveGroupChatRoomData: state.groupChatRoomReducer.getActiveGroupChatRoomData,
    joinGroupChatRoomStatus: state.groupChatRoomReducer.joinGroupChatRoomStatus,
    joinGroupChatRoomData: state.groupChatRoomReducer.joinGroupChatRoomData,
    socket: state.groupChatRoomReducer.socket,
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

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GroupChat);
