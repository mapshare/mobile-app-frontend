import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  Alert,
  FlatList,
  TouchableOpacity,
  Modal,
  ScrollView
} from 'react-native';
import validator from "../Forms/validate/validation_wrapper";
//Redux actions
import { connect } from 'react-redux';

import {getAllGroupEvent, 
        joinGroupEvent, 
        updateGroupEvent, 
        leaveGroupEvent, 
        deleteGroupEvent,} from "../../actions/groupEventAction"

import {getActiveGroup} from "../../actions/groupActions"

// Componenets Style
import {styles, eventModalWindow} from "./Stylesheet"

class EventsView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {
        eventName: "",
        eventDescription: "",
        eventMark: "" // Used for location Name
      },
      eventNameError: "",
      eventDescriptionError: "",
      eventMarkError: "",
      eventModalVisible: false,
      selectedEvent: [],
      eventUpdateModalVisible: false,
      eventDeleteModalVisible: false,
    };
  }

  componentDidMount() {
    const data = {
      token: this.props.token,
      groupId: this.props.getActiveGroupData._id
    }
    this.props.getAllGroupEvent(data);
  }

/*
** Following are the Main controllers for each Modal to Display
** Please note that Each Modal as two controller open and close
*/

//Following two controller is for detials modal for selected event
  eventModalOpen(data) {
    this.setState({
      eventModalVisible:true,
      selectEvent:data
    })
  }

  eventModalClose() {
    this.setState({
      eventModalVisible:false, 
      selectedEvent: []
    });
  }

//Following two controller is for update event modal
  eventUpdateModalOpen() {
    this.setState({eventUpdateModalVisible:true}); 
  }

  eventUpdateModalClose() {
    this.setState({eventUpdateModalVisible:false});
  }


  eventModal() {
    if (this.state.eventModalVisible) {
      let data = this.state.selectEvent
    let counter = 0;
    let alreadyMember = false;
    let permission = 0;
    try {
      permission = this.props.getGroupMemberData.memberRole.groupRolePermisionLevel;
    } catch(error) {
      permission = 0;
    }

    data.eventMembers.forEach(element => {
      if (element.mbrId === this.props.getGroupMemberData._id) {
        alreadyMember = true
      }
    });

    return(
      <Modal visible={this.state.eventModalVisible}
             onRequestClose={() => [this.eventModalClose(), alreadyMember = false]}>
        <View style={eventModalWindow.modalWindow}>
              <Text style={eventModalWindow.modalText}>Event Details</Text>
              {(data.eventCreatedBy === this.props.getGroupMemberData._id || permission >= 3) &&
              <TouchableOpacity style={eventModalWindow.editEventButtonContainer} onPress={() => this.eventUpdateModalOpen()} >
                <Text style={eventModalWindow.Text}>Edit Event</Text>
              </TouchableOpacity>
              }
              <Text style={eventModalWindow.mText}>Event Name:</Text>
              <TextInput style={eventModalWindow.inputBox}
                        defaultValue={data.eventName}
                        maxLength={15}
                        placeholderTextColor="rgba(0,0,0,0.7)"
                        editable={false}
                        />
              <Text style={eventModalWindow.mText}>Event Location:</Text>
              <TextInput style={eventModalWindow.inputBox}
                        defaultValue={data.markLocations.locationAddress}
                        placeholderTextColor="rgba(0,0,0,0.7)"
                        editable={false}
                        />
              <Text style={eventModalWindow.mText}>Event Description:</Text>
              <TextInput style={[eventModalWindow.inputBox, eventModalWindow.inputBoxDescription]}
                        defaultValue={data.eventDescription}
                        numberOfLines={4}
                        maxLength={150}
                        placeholderTextColor="rgba(0,0,0,0.7)"
                        editable={false}
                        />
              
                <Text style={eventModalWindow.mText}>Current Members:</Text>
                <ScrollView>
                {data.eventMembers.map((item) =>
                {
                  counter = counter + 1
                return (
                  <Text style={eventModalWindow.memberList}
                        placeholderTextColor="rgba(0,0,0,0.7)"
                        editable={false}
                        numberOfLines={4}
                        ScrollView
                        >{counter + ": " + item.userFirstName + " " + item.userLastName}</Text>
                )
                })}
              </ScrollView>

              <TouchableOpacity 
              style={[(alreadyMember === true ? eventModalWindow.leaveButton : eventModalWindow.joinButton), eventModalWindow.center]} onPress={() => {alreadyMember === true ? this.leaveEvent(data) : this.joinEvent(data)}}>
                <Text>{alreadyMember == true ? "Leave" : "Join"}</Text>
              </TouchableOpacity>

              {(data.eventCreatedBy === this.props.getGroupMemberData._id || permission >= 3) &&
              <TouchableOpacity style={[eventModalWindow.cancelButton, eventModalWindow.center]} onPress={() => this.eventDelete(data)} >
                <Text>Delete Event</Text>
              </TouchableOpacity>
              }
              <TouchableOpacity style={[eventModalWindow.buttonContainer, eventModalWindow.center]} onPress={() => {this.eventModalClose(), alreadyMember = false} }>
                <Text>Cancel</Text>
             </TouchableOpacity>
            </View>
        {this.eventUpdateModal(data)}
      </Modal>
    )
    }
  }

  eventUpdateModal(data) {

    return(
      <Modal visible={this.state.eventUpdateModalVisible}
             onRequestClose={() => this.eventUpdateModalClose()}>
        <View style={eventModalWindow.modalWindow} ScrollView>
              <Text style={eventModalWindow.modalText}>Update Event Details</Text>
              <Text style={eventModalWindow.mText}>Event Name:</Text>
              <TextInput style={eventModalWindow.inputBox}
                        defaultValue={data.eventName}
                        placeholder="Event Name"
                        maxLength={15}
                        placeholderTextColor="rgba(0,0,0,0.7)"
                        selectionColor="#fff"
                        autoCorrect={false}
                        returnKeyType="next"
                        autoCapitalize="none"
                        //editable={false}
                        />
              <Text style={eventModalWindow.mText}>Event Location:</Text>
              <TextInput style={eventModalWindow.inputBox}
                        defaultValue={data.markLocations.locationAddress}
                        placeholder="Event Location"
                        placeholderTextColor="rgba(0,0,0,0.7)"
                        selectionColor="#fff"
                        autoCorrect={false}
                        returnKeyType="next"
                        autoCapitalize="none"
                        editable={false}
                        />
              <Text style={eventModalWindow.mText}>Event Description:</Text>
              <TextInput style={[eventModalWindow.inputBox, eventModalWindow.inputBoxDescription]}
                        defaultValue={data.eventDescription}
                        placeholder="Event Description"
                        multiline = {true}
                        numberOfLines={4}
                        maxLength={150}
                        placeholderTextColor="rgba(0,0,0,0.7)"
                        selectionColor="#fff"
                        autoCorrect={false}
                        returnKeyType="next"
                        autoCapitalize="none"
                        //editable={false}
                        />
              <TouchableOpacity style={[eventModalWindow.buttonContainer, eventModalWindow.center]} >
                <Text>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[eventModalWindow.cancelButton, eventModalWindow.center]} onPress={() => { this.eventUpdateModalClose() }}>
                <Text>Cancel</Text>
             </TouchableOpacity>
            </View>
      </Modal>
    )
  }

  eventDelete(data) {
    const selectEvent = {
      token: this.props.token,
      groupId: this.props.getActiveGroupData._id,
      eventId: data._id,
    }
    this.props.deleteGroupEvent(selectEvent);
    this.eventModalClose();
  }

  leaveEvent(data) {
    console.log("leave");
    const selectEvent = {
      token: this.props.token,
      groupId: this.props.getActiveGroupData._id,
      eventId: data._id,
    }
    this.props.leaveGroupEvent(selectEvent);
    this.eventModalClose();
  }

  joinEvent(data) {
    console.log("join");
    const selectEvent = {
      token: this.props.token,
      groupId: this.props.getActiveGroupData._id,
      eventId: data._id,
    }
    this.props.joinGroupEvent(selectEvent);
    this.eventModalClose();
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.getAllGroupEventData}
          style={styles.eventList}
          renderItem={(data) => {
            return (
              <View>
              <TouchableOpacity onPress={() => this.eventModalOpen(data.item)} >
                {this.eventModal()}
                <View style={styles.eventBox} >
                  <View style={styles.eventContent}>
                    <Text  style={styles.eventName}>Event: {data.item.eventName}</Text>
                    <Text  style={styles.eventLocation}>Location: {data.item.markLocations.locationAddress}</Text>
                    <Text  style={styles.description}>Description: {data.item.eventDescription}</Text>
                  </View>
                </View>
              </TouchableOpacity>
              </View>
            )
          }}/>
      </View>
    );
  }
}

// Redux Getter to use: this.props.(name of any return)
const mapStateToProps = state => {
  return {
    getActiveGroupData: state.groupReducer.getActiveGroupData,
    getGroupMemberData: state.groupReducer.getGroupMemberData,
    getAllGroupEventData: state.groupEventReducer.getAllGroupEventData,
    token: state.logInReducer.token,
  };
};

// Redux Setter to use: this.props.(name of any return)
const mapDispatchToProps = dispatch => {
  return {
    getAllGroupEvent: data => dispatch(getAllGroupEvent(data)),
    getActiveGroup: data => dispatch(getActiveGroup(data)),
    updateGroupEvent: data => dispatch(updateGroupEvent(data)),
    deleteGroupEvent: data => dispatch(deleteGroupEvent(data)),
    joinGroupEvent: data => dispatch(joinGroupEvent(data)),
    leaveGroupEvent: data => dispatch(leaveGroupEvent(data)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventsView);