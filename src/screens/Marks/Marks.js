// Import Libraries
import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import Mapbox from '@react-native-mapbox-gl/maps';
import { connect } from 'react-redux';

//Redux actions
import {
  getCurrentOnClickMark,
  getGroupAllMarks,
  getGroupMarkById,
  getLocationReviews
} from '../../actions/groupMarkAction';
import { clickMarkModalWindow } from '../../actions/modalWindowAction';

// Componenets Style
import { containerStyles } from './Stylesheet';

// Creating Component
class Marks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortMarkArray: this.props.sortGroupMarkData
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.sortGroupMarkOnClickFlag !== prevProps.sortGroupMarkOnClickFlag
    ) {
      this.setState({
        sortMarkArray: this.props.sortGroupMarkData
      });
    }
  }

  onClickMark = (data, event) => {
    if (!this.props.addGroupMarkOnClickStatus) {
      const getMarkData = {
        groupId: this.props.getActiveGroupData._id,
        token: this.props.token,
        markId: data._id
      }
      this.props.getGroupMarkById(getMarkData)
      this.props.getLocationReviews(getMarkData)
      this.props.getCurrentOnClickMark(data);
      this.props.clickMarkModalWindow(true);
    }
  };

  renderMark = (data, index) => {
    const ref = `markId-${index}`;
    const coordinate = this.props.getGroupAllMarksData[index].geometry
      .coordinates;
    let markColor;

    if (data.defaultMarkCategory) {
      this.props.getGroupDefaultMarkCategoryData.map((category, index) => {
        if (data.defaultMarkCategory === category._id) {
          markColor = category.categoryColor;
        }
      });
    } else if (data.customMarkCategory) {
      this.props.getGroupAllCustomMarkCategoryData.map((category, index) => {
        if (data.customMarkCategory === category._id) {
          markColor = category.categoryColor;
        }
      });
    }

    return (
      <Mapbox.PointAnnotation
        key={ref}
        id={ref}
        coordinate={coordinate}
        onSelected={event => this.onClickMark(data, event)}
      >
        <View key={ref} style={containerStyles.container}>
          <View
            style={[containerStyles.fill, { backgroundColor: `${markColor}` }]}
          />
        </View>
      </Mapbox.PointAnnotation>
    );
  };

  renderAnnotations(data) {
    const marksView = [];

    data.map((data, index) => {
      if (
        !(
          this.state.sortMarkArray.includes(data.defaultMarkCategory) ||
          this.state.sortMarkArray.includes(data.customMarkCategory)
        )
      ) {
        marksView.push(this.renderMark(data, index));
      }
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
    sortGroupMarkData: state.groupMarkReducer.sortGroupMarkData,
    sortGroupMarkOnClickFlag: state.groupMarkReducer.sortGroupMarkOnClickFlag,
    getGroupDefaultMarkCategoryData:
      state.groupDefaultMarkCategoryReducer.getGroupDefaultMarkCategoryData,
    getGroupAllCustomMarkCategoryData:
      state.groupCustomMarkCategoryReducer.getGroupAllCustomMarkCategoryData
  };
};

// Redux Setter to use: this.props.(name of any return)
const mapDispatchToProps = dispatch => {
  return {
    getCurrentOnClickMark: data => dispatch(getCurrentOnClickMark(data)),
    clickMarkModalWindow: bool => dispatch(clickMarkModalWindow(bool)),
    getGroupAllMarks: data => dispatch(getGroupAllMarks(data)),
    getGroupMarkById: data => dispatch(getGroupMarkById(data)),
    getLocationReviews: data => dispatch(getLocationReviews(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Marks);
