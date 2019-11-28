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

// Componenets Style
import styles from "./Stylesheet"

export default class EventsView extends Component {

  eventClickListener = (viewId) => {
    Alert.alert("alert", "Event Details WIP");
  }

  render() {
    return (
      <View style={styles.container} {...alert("alert", "Event Details WIP")}>
        <FlatList enableEmptySections={true}
          data={[{day:1, month: 'Sep'}, 
                 {day:2, month: 'Jan'}, 
                 {day:3, month: 'Aug'}, 
                 {day:4, month: 'Dec'}, 
                 {day:5, month: 'Jul'}, 
                 {day:6, month: 'Oct'}, 
                 {day:7, month: 'Sep'},
                 {day:8, month: 'Jan'},
                 {day:9, month: 'May'},]}
          style={styles.eventList}
          renderItem={(event) => {
            return (
              <TouchableOpacity onPress={() => this.eventClickListener("row")}>
                <View style={styles.eventBox}>
                  <View style={styles.eventDate}>
                     <Text  style={styles.eventDay}>{event.day}</Text>
                     <Text  style={styles.eventMonth}>{event.month}</Text>
                  </View>
                  <View style={styles.eventContent}>
                    <Text  style={styles.eventTime}>TBD</Text>
                    <Text  style={styles.userName}>John Doe</Text>
                    <Text  style={styles.description}>Event location WIP!!</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
          }}/>
      </View>
    );
  }
}