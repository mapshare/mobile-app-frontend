import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Alert,
  Image,
  ListView,
  FlatList,
  TouchableOpacity,
  Modal
} from 'react-native';
import validator from "../Forms/validate/validation_wrapper";
//Redux actions
import { connect } from 'react-redux';

import {addGroupEvent,
addGroupEventSuccess,
getGroupEvent,
updateGroupEvent} from "../../actions/groupEventAction"

import {getActiveGroup} from "../../actions/groupActions"

// Componenets Style
import styles from "./Stylesheet"

class EventsView extends Component {

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
    };
  }

  eventModalOpen() {
    this.setState({modalVisible:true});
  }

  eventModalClose() {
    this.setState({modalVisible:false});
    this.state.eventNameError = null;
    this.state.eventDescriptionError = null;
    this.state.eventMarkError = null;
  }

  // Creating New Event
  creatEvent = async () => {

    const eventNameError = validator ("eventNamePresent", this.state.user.eventName);
    const eventDescriptionError = validator ("additionalInformation", this.state.user.eventDescription);
    const eventMarkError = validator ("markName", this.state.user.eventMark);
    
    this.setState(
      {
        eventNameError: eventNameError,
        eventDescriptionError: eventDescriptionError,
        eventMarkError: eventMarkError,
      },
      () => {
        if (
          !eventNameError &&
          !eventDescriptionError &&
          !eventMarkError
        ) {
          
          const data = {
            eventName: this.state.user.eventName,
            eventDescription: this.state.user.eventDescription,
            eventMark: this.state.user.eventMark,
            token: this.props.token
          }

          this.props.addGroupEvent(data);

          this.eventModalClose();

          console.log(data)

        } 
      }
    );

  }

  test() {
    console.log('Long Press')
  }

  // Updating Existing Event
  update = async () => {

  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList enableEmptySections={true}
          data={[{day:28, month: 'Nov'}, 
                ]}
          style={styles.eventList}
          renderItem={(event) => {
            return (
              <View>
              <TouchableOpacity onPress={() => this.eventModalOpen()}>
              <Text
              style={styles.addButton}
              >Add Event</Text>
              </TouchableOpacity>
              <Modal
              visible={this.state.modalVisible}
              animationType={'slide'}
              onRequestClose={() => this.eventModalClose()}
              >
            <View style={styles.modalWindow} ScrollView>
              <Text style={styles.modalText}>Create Event</Text>
              <TextInput style={styles.inputBox}
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
                        onSubmitEditing={() => this.eventMark.focus()}
                        />
              {this.state.eventNameError ? (
                <Text style={styles.errorMessage}>{this.state.eventNameError}</Text>
              ) : null}

              <TextInput style={styles.inputBox}
                        onChangeText={eventMark =>
                          this.setState({
                            user: { ...this.state.user,eventMark: eventMark }
                          })
                        }
                        placeholder="Event Location"
                        maxLength={15}
                        placeholderTextColor="rgba(0,0,0,0.7)"
                        selectionColor="#fff"
                        autoCorrect={false}
                        returnKeyType="next"
                        autoCapitalize="none"
                        ref={input => (this.eventMark = input)}
                        onSubmitEditing={() => this.eventDescription.focus()}
                        />
              {this.state.eventMarkError ? (
                <Text style={styles.errorMessage}>{this.state.eventMarkError}</Text>
              ) : null}

              <TextInput style={[styles.inputBox, styles.inputBoxDescription]}
                        onChangeText={eventDescription =>
                          this.setState({
                            user: { ...this.state.user, eventDescription: eventDescription }
                          })
                        }
                        placeholder="Event Description"
                        //multiline = {true}
                        numberOfLines={4}
                        maxLength={30}
                        placeholderTextColor="rgba(0,0,0,0.7)"
                        selectionColor="#fff"
                        autoCorrect={false}
                        returnKeyType="next"
                        autoCapitalize="none"
                        ref={input => (this.eventDescription = input)}
                        onSubmitEditing={() => this.creatEvent()}
                        />
              {this.state.eventDescriptionError ? (
                <Text style={styles.errorMessage}>{this.state.eventDescriptionError}</Text>
              ) : null}
              <TouchableOpacity style={[styles.buttonContainer, styles.center]} onPress={() => {this.creatEvent()}} >
                <Text>Create</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.logoutButton, styles.center]} onPress={() => { this.eventModalClose() }}>
                <Text>Cancel</Text>
            </TouchableOpacity>
            </View>
          </Modal>
              <TouchableOpacity /*onPress={() => this.eventClickListener("row")}*/ onLongPress={() => this.test()}>
                <View style={styles.eventBox} >
                  <View style={styles.eventContent}>
                    <Text  style={styles.eventTime}>3:26 AM</Text>
                    <Text  style={styles.userName}>Organizer: Wahab Zafar</Text>
                    <Text  style={styles.description}>85 RobinStone Drive</Text>
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
    token: state.logInReducer.token,
  };
};

// Redux Setter to use: this.props.(name of any return)
const mapDispatchToProps = dispatch => {
  return {
    addGroupEvent: data => dispatch(addGroupEvent(data)),
    getActiveGroup: data => dispatch(getActiveGroup(data)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventsView);