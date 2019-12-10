import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, ScrollView, Modal, Text, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import validator from "../Forms/validate/validation_wrapper";

//Redux actions
import {
  addMarkModalWindow,
  clickMarkModalWindow
} from '../../actions/modalWindowAction';

import {
  getCurrentOnClickMark,
} from '../../actions/groupMarkAction';

import {addGroupEvent,
  } from "../../actions/groupEventAction"

import {getActiveGroup} from "../../actions/groupActions"

// Componenets Style
import { containerStyles, eventModalWindow } from './Stylesheet';

import AddMarkForm from '../Forms/AddMark/AddMarkForm';
import LocationDetailWindow from '../LocationDetailWindow/LocationDetailWindow';
import ConfirmDelete from '../ConfirmDelete/ConfirmDelete';
import { Actions, ActionConst } from 'react-native-router-flux';

class ModalWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        eventName: "",
        eventDescription: "",
        eventMark: "" // Used location
      },
      eventNameError: "",
      eventDescriptionError: "",
      eventMarkError: "",
      modalVisible: false,
      CreatingNewEvent: false,
    };
  }

  eventModalOpen() {
    if (this.props.getCurrentOnClickMarkData.markLocations.locationAddress !== null) {
      this.state.user.eventMark = this.props.getCurrentOnClickMarkData.markLocations.locationAddress
    }else {
      this.state.user.eventMark = ""
    }
    this.setState({modalVisible:true});
  }

  eventModalClose() {
    this.setState({modalVisible:false});
    this.state.eventNameError = null;
    this.state.eventDescriptionError = null;
    this.state.eventMarkError = null;
  }

  eventModal() {
    return (
      <Modal
              visible={this.state.modalVisible}
              animationType={'slide'}
              onRequestClose={() => this.eventModalClose()}
              >
            <View style={eventModalWindow.modalWindow} ScrollView>
              <Text style={eventModalWindow.modalText}>Create Event</Text>
              <TextInput style={eventModalWindow.inputBox}
                        onChangeText={eventName =>
                          this.setState({
                            user: { ...this.state.user, eventName: eventName }
                          })
                        }
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

              <TextInput style={eventModalWindow.inputBox}
                        placeholder="Event Location"
                        defaultValue={this.state.user.eventMark}
                        placeholderTextColor="rgba(0,0,0,0.7)"
                        selectionColor="#fff"
                        autoCorrect={false}
                        returnKeyType="next"
                        autoCapitalize="none" 
                        editable={false}
                        multiline={true}   
                        />

              <TextInput style={[eventModalWindow.inputBox, eventModalWindow.inputBoxDescription]}
                        onChangeText={eventDescription =>
                          this.setState({
                            user: { ...this.state.user, eventDescription: eventDescription }
                          })
                        }
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
                        onSubmitEditing={() => this.createEvent()}
                        />
              {this.state.eventDescriptionError ? (
                <Text style={eventModalWindow.errorMessage}>{this.state.eventDescriptionError}</Text>
              ) : null}
              <TouchableOpacity style={[eventModalWindow.buttonContainer, eventModalWindow.center]} onPress={() => {this.createEvent()}} >
                <Text>Create</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[eventModalWindow.cancelButton, eventModalWindow.center]} onPress={() => { this.eventModalClose() }}>
                <Text>Cancel</Text>
            </TouchableOpacity>
            </View>
          </Modal>
    )
  }

  createEvent = async () => {

    const eventNameError = validator ("eventNamePresent", this.state.user.eventName);
    const eventDescriptionError = validator ("additionalInformation", this.state.user.eventDescription);
    
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
          
          const data = {
            eventName: this.state.user.eventName,
            eventDescription: this.state.user.eventDescription,
            eventMark: this.props.getCurrentOnClickMarkData._id,
            groupId: this.props.getActiveGroupData._id,
            token: this.props.token
          }

          this.props.addGroupEvent(data);
          this.eventModalClose();
          this.closeButtonOnClick();
          

        } 
      }
    );

  }

  content = type => {
    switch (type) {
      case 'addMark':
        return <AddMarkForm />;
      case 'onClickMark':
        return <LocationDetailWindow />;
      default:
        return console.error('pass an existing modalWindowType');
    }
  };

  closeButtonOnClick = () => {
    if (this.props.modalContent === 'addMark') {
      this.props.addMarkModalWindow(false);
    } else if (this.props.modalContent === 'onClickMark') {
      this.props.clickMarkModalWindow(false);
    }
  };

  async creatingNewMarker(data) {
    await AsyncStorage.getItem('CreatingNewEvent').then((result) => {
      if (result === null) {
        AsyncStorage.setItem('CreatingNewEvent', JSON.stringify(data))
      }else {
        AsyncStorage.setItem('CreatingNewEvent', JSON.stringify(data))
      }
      this.setState({
        creatingNewEvent: result
      })
    })
  }

  render() { 
    
    this.creatingNewMarker(false)
    return (
      <View style={containerStyles.mainContainer}>
        <TouchableOpacity
          style={containerStyles.closeButtonContainer}
          onPress={this.closeButtonOnClick}
        >
          <Icon name="close" size={30} />
        </TouchableOpacity>
        {!this.state.creatingNewEvent &&
        <TouchableOpacity
          style={containerStyles.AddEventButtonContainer}
          onPress={() => this.eventModalOpen()}
        >
          <Text style={containerStyles.Text}>Add Event</Text>
        </TouchableOpacity>
        }
        {this.eventModal()}
        <ScrollView style={containerStyles.contentContainer}>
          {this.content(this.props.modalContent)}
        </ScrollView>
      </View>

    );
  }
}

// Redux Getter to use: this.props.(name of any return)
const mapStateToProps = state => {
  return {
    getActiveGroupData: state.groupReducer.getActiveGroupData,
    token: state.logInReducer.token,
    modalWindowStatus: state.modalWindowReducer.status,
    getCurrentOnClickMarkData: state.groupMarkReducer.getCurrentOnClickMarkData,
    deleteLocation: state.modalWindowReducer.deleteLocation

  };
};

// Redux Setter to use: this.props.(name of any return)
const mapDispatchToProps = dispatch => {
  return {
    addGroupEvent: data => dispatch(addGroupEvent(data)),
    getActiveGroup: data => dispatch(getActiveGroup(data)),
    getCurrentOnClickMark: data => dispatch(getCurrentOnClickMark(data)),
    addMarkModalWindow: bool => dispatch(addMarkModalWindow(bool)),
    clickMarkModalWindow: bool => dispatch(clickMarkModalWindow(bool))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalWindow);
