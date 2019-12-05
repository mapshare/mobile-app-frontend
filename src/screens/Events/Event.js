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

import {getAllGroupEvent,} from "../../actions/groupEventAction"

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

    const data = {
      token: this.props.token,
      groupId: this.props.getActiveGroupData._id
    }

    let temp = this.props.getAllGroupEvent(data);

    console.log(this.props.getAllGroupEventData)
    
  }

  eventModalClose() {
    this.setState({modalVisible:false});
  }

  eventModal() {
    return(
      <Modal visible={this.state.modalVisible}
             onRequestClose={() => this.eventModalClose()}>
        <Text>This is Detail Modal</Text>
      </Modal>
    )
  }

  updateEvent() {

  }

  render() {
    console.log(this.props.getAllGroupEventData)
    return (
      <View style={styles.container}>
        <FlatList enableEmptySections={true}
          data={[{day:28, month: 'Nov'}, 
                ]}
          style={styles.eventList}
          renderItem={(event) => {
            return (
              <View>
              <TouchableOpacity onLongPress={() => console.log(this.props.getAllGroupEventData)} onPress={() => this.eventModalOpen()}>
                {this.eventModal()}
                <View style={styles.eventBox} >
                  <View style={styles.eventContent}>
                    <Text  style={styles.eventName}>Birthday</Text>
                    <Text  style={styles.eventLocation}>Location: Toronto</Text>
                    <Text  style={styles.description}>Free Food</Text>
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
    getAllGroupEventData: state.groupEventReducer.getAllGroupEventData,
    token: state.logInReducer.token,
  };
};

// Redux Setter to use: this.props.(name of any return)
const mapDispatchToProps = dispatch => {
  return {
    getAllGroupEvent: data => dispatch(getAllGroupEvent(data)),
    getActiveGroup: data => dispatch(getActiveGroup(data)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventsView);