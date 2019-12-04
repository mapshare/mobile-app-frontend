// Import Libraries
import React, { Component } from 'react';
import { View } from 'react-native';
import Mapbox from '@react-native-mapbox-gl/maps';
import { connect } from 'react-redux';

//Redux actions
import {
  getCurrentOnClickMark,
  getGroupAllMarks,
  getGroupMarkById
} from '../../actions/groupMarkAction';
import { clickMarkModalWindow } from '../../actions/modalWindowAction';

// Componenets Style
import { containerStyles } from './Stylesheet';

// Creating Component
class Marks extends Component {
  constructor(props) {
    super(props);
  }

  onClickMark = (data, event) => {
    if (!this.props.addGroupMarkOnClickStatus) {
      const getMarkData = {
        groupId: this.props.getActiveGroupData._id,
        token: this.props.token,
        markId: data._id
      }
      this.props.getGroupMarkById(getMarkData)
      this.props.getCurrentOnClickMark(data);
      this.props.clickMarkModalWindow(true);
    }
  };

  renderMark = (data, index) => {
    const ref = `markId-${index}`;
    const coordinate = this.props.getGroupAllMarksData[index].geometry
      .coordinates;

    return (
      <Mapbox.PointAnnotation
        key={ref}
        id={ref}
        coordinate={coordinate}
        onSelected={event => this.onClickMark(data, event)}
      >
        <View key={ref} style={containerStyles.container}>
          <View style={containerStyles.fill} />
        </View>
      </Mapbox.PointAnnotation>
    );
  };

  renderAnnotations(data) {
    const marksView = [];

    data.map((data, index) => {
      marksView.push(this.renderMark(data, index));
    });

    return marksView;
  }

  render() {
    return (
      <View>{this.renderAnnotations(this.props.getGroupAllMarksData)}</View>
    );
  }
}

// Redux Getter to use: this.props.(name of any return)
const mapStateToProps = state => {
  return {
    getActiveGroupData: state.groupReducer.getActiveGroupData,
    addGroupMarkOnClickStatus: state.groupMarkReducer.addGroupMarkOnClickStatus,
    getGroupAllMarksData: state.groupMarkReducer.getGroupAllMarksData,
    addGroupMarkStatus: state.groupMarkReducer.addGroupMarkStatus,
    token: state.logInReducer.token,
  };
};

// Redux Setter to use: this.props.(name of any return)
const mapDispatchToProps = dispatch => {
  return {
    getCurrentOnClickMark: data => dispatch(getCurrentOnClickMark(data)),
    clickMarkModalWindow: bool => dispatch(clickMarkModalWindow(bool)),
    getGroupAllMarks: data => dispatch(getGroupAllMarks(data)),
    getGroupMarkById: data => dispatch(getGroupMarkById(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Marks);
