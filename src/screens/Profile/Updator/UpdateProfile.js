import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import styles from "./Stylesheet"

const Form = t.form.Form;

const User = t.struct({
  email: '',
  username: '',
  password: '',
  terms: ''
});

export default class UpdateProfile extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Form type={User} /> {/* Notice the addition of the Form component */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
});