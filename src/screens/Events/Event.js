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
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

// Componenets Style
import styles from "./Stylesheet"
import { Actions } from 'react-native-router-flux';

export default class EventsView extends Component {

  eventClickListener = (viewId) => {
    Alert.alert("Note", "Event Details WIP");
  }

  notice() {
    Alert.alert("Note", "Event Manager WIP - ETA 11/30/2019")
  }

  render() {
    return (
      <View style={styles.container} {...Alert.alert("Note", "Event Manager WIP - ETA 11/30/2019")}>
        <FlatList enableEmptySections={true}
          data={[{day:28, month: 'Nov'}, 
                ]}
          style={styles.eventList}
          renderItem={(event) => {
            return (
              <View>
              <TouchableOpacity onPress={this.notice}>
              <Text
              style={styles.addButton}
              >Add Event</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.eventClickListener("row")}>
                <View style={styles.eventBox} >
                  <View style={styles.eventDate}>
                     <Text  style={styles.eventDay}>{event.day}</Text>
                     <Text  style={styles.eventMonth}>{event.month}</Text>
                  </View>
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