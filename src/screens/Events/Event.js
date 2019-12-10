import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  Alert,
  FlatList,
  TouchableOpacity,
  Modal,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import validator from "../Forms/validate/validation_wrapper";
import Icon from 'react-native-vector-icons/SimpleLineIcons';

//Redux actions
import { connect } from 'react-redux';

import {getAllGroupEvent, 
        joinGroupEvent, 
        updateGroupEvent, 
        leaveGroupEvent, 
        deleteGroupEvent,
        KickUserEvent,
        kickUserGroupEvent} from "../../actions/groupEventAction"

import {getActiveGroup} from "../../actions/groupActions"

// Componenets Style
import {styles, eventModalWindow} from "./Stylesheet"
import { Actions } from 'react-native-router-flux';

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
    this.state.user.eventName = data.eventName;
    this.state.user.eventDescription = data.eventDescription;
  }

  eventModalClose() {
    this.setState({
      eventName: "",
      eventDescription: "",
      eventModalVisible:false, 
      selectedEvent: []
    });
  }

//Following two controller is for update event modal
  eventUpdateModalOpen() {
    this.setState({eventUpdateModalVisible:true}); 
  }

  eventUpdateModalClose() {
    this.setState({
      eventUpdateModalVisible:false,
      eventNameError: null,
      eventDescriptionError: null,
    });
  }


  eventModal() {
    if (this.state.eventModalVisible) {
      
      
    let data = this.state.selectEvent;

    let counter = 0;
    let createdby = ""
    let alreadyMember = false;
    let eventHasMembers = false;

    try {
      eventHasMembers = data.eventMembers.length == 0;
    } catch (error) {
      eventHasMembers = false
    }

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

    data.eventMembers.forEach(element => {
      if (element.mbrId === data.eventCreatedBy) {
        createdby = element.userFirstName + " " + element.userLastName;
      }
    });

    return(
      <Modal visible={this.state.eventModalVisible}
             onRequestClose={() => [this.eventModalClose(), alreadyMember = false]}>
        <ScrollView>
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
                        multiline={true}
                        />
              <Text style={eventModalWindow.mText}>Event Description:</Text>
              <TextInput style={[eventModalWindow.inputBox, eventModalWindow.inputBoxDescription]}
                        defaultValue={data.eventDescription}
                        //numberOfLines={4}
                        maxLength={150}
                        placeholderTextColor="rgba(0,0,0,0.7)"
                        editable={false}
                        multiline={true}
                        />
              
                <Text style={eventModalWindow.mText}>Current Members:</Text>
                
                {data.eventMembers.map((item) =>
                {
                  counter = counter + 1
                return (
                  <View style={eventModalWindow.memberList}>
                  <Text style={eventModalWindow.memberList}
                        placeholderTextColor="rgba(0,0,0,0.7)"
                        editable={false}
                        numberOfLines={4}
                        ScrollView
                >{counter + ": " + item.userFirstName + " " + item.userLastName}
                </Text>
                {((data.eventCreatedBy === this.props.getGroupMemberData._id || permission >= 3) && (this.props.getGroupMemberData._id !== item.mbrId)) && 
                  <TouchableOpacity style={eventModalWindow.KickUserEvent} onPress={()=>this.removeUserFromEvent(data,item.usrId) }><Text style={{color:"red"}}>Kick User</Text></TouchableOpacity>}
                </View>
                )
                })}
              
              {eventHasMembers &&
              <Text style={eventModalWindow.memberList}>None</Text>
              }

              {createdby !== "" &&
              <Text style={eventModalWindow.mText}>{'\n'}Event Hosted By: {createdby}</Text>
              }

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
        </ScrollView>
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
                        onChangeText={eventName =>
                          this.setState({
                            user: { ...this.state.user, eventName: eventName }
                          })
                        }
                        defaultValue={data.eventName}
                        placeholder="Event Name"
                        maxLength={15}
                        placeholderTextColor="rgba(0,0,0,0.7)"
                        selectionColor="#fff"
                        autoCorrect={false}
                        returnKeyType="next"
                        autoCapitalize="none"
                        onSubmitEditing={() => this.eventDescription.focus()}
                        />
              {this.state.eventNameError ? (
                <Text style={eventModalWindow.errorMessage}>{this.state.eventNameError}</Text>
              ) : null}
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
                        multiline={true}
                        />
              <Text style={eventModalWindow.mText}>Event Description:</Text>
              <TextInput style={[eventModalWindow.inputBox, eventModalWindow.inputBoxDescription]}
                        onChangeText={eventDescription =>
                          this.setState({
                            user: { ...this.state.user, eventDescription: eventDescription }
                          })
                        }
                        defaultValue={data.eventDescription}
                        placeholder="Event Description"
                        multiline = {true}
                        //numberOfLines={4}
                        maxLength={150}
                        placeholderTextColor="rgba(0,0,0,0.7)"
                        selectionColor="#fff"
                        autoCorrect={false}
                        returnKeyType="next"
                        autoCapitalize="none"
                        ref={input => (this.eventDescription = input)}
                        onSubmitEditing={() => this.updateEvent(data)}
                        />
              {this.state.eventDescriptionError ? (
                <Text style={eventModalWindow.errorMessage}>{this.state.eventDescriptionError}</Text>
              ) : null}
              <TouchableOpacity style={[eventModalWindow.buttonContainer, eventModalWindow.center]} onPress={() => this.updateEvent(data)}>
                <Text>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[eventModalWindow.cancelButton, eventModalWindow.center]} onPress={() => { this.eventUpdateModalClose() }}>
                <Text>Cancel</Text>
             </TouchableOpacity>
            </View>
      </Modal>
    )
  }

  updateEvent(data) {

    let updateRecord = false;

    let eventNameError = validator ("eventNamePresent", this.state.user.eventName);
    let eventDescriptionError = validator ("additionalInformation", this.state.user.eventDescription);
    
    if (this.state.user.eventName === data.eventName ) {
      eventNameError = null
    }else {
      updateRecord = true;
    }

    console.log(this.state.user.eventDescription)
    if (this.state.user.eventDescription === data.eventDescription) {
      eventDescriptionError = null  
    }else {
      updateRecord = true;
    }

    this.setState(
      {
        eventNameError: eventNameError,
        eventDescriptionError: eventDescriptionError,
      },
      () => {
        if (
          !eventNameError &&
          !eventDescriptionError
        ) {
          if (updateRecord === true) {
            const selectEvent = {
              eventName: this.state.user.eventName,
              eventDescription: this.state.user.eventDescription,
              eventId: data._id,
              groupId: this.props.getActiveGroupData._id,
              token: this.props.token
            }
            
            this.props.updateGroupEvent(selectEvent);
            this.eventUpdateModalClose();
            this.eventModalClose();
          } else {
            this.setState({
              eventDescriptionError: "Please Update Record to Save Changes!"
            })
          }
        } 
      }
    );
  }

  removeUserFromEvent(data,user) {
    console.log("Kick")
    const selectEvent = {
      token: this.props.token,
      groupId: this.props.getActiveGroupData._id,
      usrId: user,
      eventId: data._id,
    }
    this.props.KickUserEvent(selectEvent);
    this.eventModalClose();
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
    const selectEvent = {
      token: this.props.token,
      groupId: this.props.getActiveGroupData._id,
      eventId: data._id,
    }
    this.props.leaveGroupEvent(selectEvent);
    this.eventModalClose();
  }

  joinEvent(data) {
    const selectEvent = {
      token: this.props.token,
      groupId: this.props.getActiveGroupData._id,
      eventId: data._id,
    }
    this.props.joinGroupEvent(selectEvent);
    this.eventModalClose();
  }

  render() {
    
    let groupEventEmpty = false;
    try {
      groupEventEmpty = this.props.getAllGroupEventData.length == 0;
    } catch (error) {
      groupEventEmpty = false;
    }

    return (
      <View style={styles.container}>
        {!Array.isArray(this.props.getAllGroupEventData) &&
           <ActivityIndicator style={styles.spinnerStyle} size="large" color="#000"/>
        }
        {groupEventEmpty &&
          <View>
            <Text style={styles.emptyEventText}> {"\n"} There is currently no events for this group. {"\n"} Create the first event Now! {"\n"} </Text>
            <TouchableOpacity style={styles.emptyEventIcon} onPress={() => {Actions.map()}}>
              <Icon name="compass" size={55}/>
            </TouchableOpacity>
          </View>
        }

        {Array.isArray(this.props.getAllGroupEventData) &&
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
        }
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
    KickUserEvent: data => dispatch(kickUserGroupEvent(data))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventsView);