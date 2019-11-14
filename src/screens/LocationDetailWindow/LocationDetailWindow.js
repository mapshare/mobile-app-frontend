// Import Libraries
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Mapbox from '@react-native-mapbox-gl/maps';
import { connect } from 'react-redux';

//Redux actions
import { addGroupMark } from '../../actions/groupMarkAction';

// Componenets Style
import {} from './Stylesheet';

// Creating Component
class LocationDetailWindow extends Component {
  render() {
    return <Text>{JSON.stringify(this.props.getCurrentOnClickMarkData)}</Text>;
  }
}

// Redux Getter to use: this.props.(name of any return)
const mapStateToProps = state => {
  return {
    coordinates: state.groupMarkReducer.coordinates,
    getUserData: state.logInReducer.userData,
    logInToken: state.logInReducer.token,
    getActiveGroup: state.groupReducer.getActiveGroupData,
    getCurrentOnClickMarkData: state.groupMarkReducer.getCurrentOnClickMarkData
  };
};

// Redux Setter to use: this.props.(name of any return)
const mapDispatchToProps = dispatch => {
  return {
    addGroupMark: bool => dispatch(addGroupMark(bool))
  };
};

export default LocationDetailWindow = connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationDetailWindow);
