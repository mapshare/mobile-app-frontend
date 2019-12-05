import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

//Redux actions
import {
  addMarkModalWindow,
  clickMarkModalWindow
} from '../../actions/modalWindowAction';

// Componenets Style
import { containerStyles } from './Stylesheet';

import AddMarkForm from '../Forms/AddMark/AddMarkForm';
import LocationDetailWindow from '../LocationDetailWindow/LocationDetailWindow';
import LocationReviewFrom from '../Forms/LocationReview/LocationReviewFrom';

class BottomWindow extends Component {
  constructor(props) {
    super(props);
  }

  content = type => {
    switch (type) {
      case 'review':
        return <LocationReviewFrom />
      default:
        return console.error('pass an existing bottomWindowType');
    }
  };

  closeButtonOnClick = () => {

  };

  render() {
    return (
      <View style={containerStyles.mainContainer}>
        <View style={containerStyles.contentContainer}>
          {this.content(this.props.bottomWindowType)}
        </View>
      </View>

    );
  }
}

// Redux Getter to use: this.props.(name of any return)
const mapStateToProps = state => {
  return {

  };
};

// Redux Setter to use: this.props.(name of any return)
const mapDispatchToProps = dispatch => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BottomWindow);
