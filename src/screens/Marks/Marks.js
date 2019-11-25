// Import Libraries
import React, { Component } from 'react';
import { View, TouchableHighlight } from 'react-native';
import Mapbox from '@react-native-mapbox-gl/maps';
import { connect } from 'react-redux';

//Redux actions
import { getCurrentOnClickMark } from '../../actions/groupMarkAction';
import { clickMarkModalWindow } from '../../actions/modalWindowAction';

// Componenets Style
import { containerStyles } from './Stylesheet';

// Creating Component
class Marks extends Component {
  constructor(props) {
    super(props);
    this.marksArray = [];
  }

  componentWillMount() {
    this.marksArray = this.props.getGroupAllMarksData;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.addGroupMarkStatus != prevProps.addGroupMarkStatus) {
      this.marksArray = this.props.getGroupAllMarksData;
    }
  }

  onClickMark = (data, event) => {
    if (!this.props.addGroupMarkOnClickStatus) {
      this.props.getCurrentOnClickMark(data);
      this.props.clickMarkModalWindow(true);
    }
  };

  renderMark = (data, index) => {
    const ref = `markId-${index}`;
    const coordinate = this.marksArray[index].geometry.coordinates;

    return (
      <Mapbox.PointAnnotation
        key={ref}
        id={ref}
        coordinate={coordinate}
        onSelected={event => this.onClickMark(data, event)}
      >
        <View style={containerStyles.container}>
          <View style={containerStyles.fill} />
        </View>
      </Mapbox.PointAnnotation>
    );
  };

  renderAnnotations() {
    const marksView = [];

    this.marksArray.map((data, index) => {
      marksView.push(this.renderMark(data, index));
    });

    return marksView;
  }

  render() {
    return <View>{this.renderAnnotations()}</View>;
  }
}

// Redux Getter to use: this.props.(name of any return)
const mapStateToProps = state => {
  return {
    coordinates: state.groupMarkReducer.coordinates,
    getUserData: state.logInReducer.userData,
    logInToken: state.logInReducer.token,
    getActiveGroup: state.groupReducer.getActiveGroupData,
    addGroupMarkOnClickStatus: state.groupMarkReducer.addGroupMarkOnClickStatus,
    getGroupAllMarksData: state.groupMarkReducer.getGroupAllMarksData,
    addGroupMarkStatus: state.groupMarkReducer.addGroupMarkStatus
  };
};

// Redux Setter to use: this.props.(name of any return)
const mapDispatchToProps = dispatch => {
  return {
    getCurrentOnClickMark: data => dispatch(getCurrentOnClickMark(data)),
    clickMarkModalWindow: bool => dispatch(clickMarkModalWindow(bool))
  };
};

export default Marks = connect(mapStateToProps, mapDispatchToProps)(Marks);
