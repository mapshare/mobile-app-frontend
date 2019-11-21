import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
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

class ModalWindow extends Component {
  content = type => {
    switch (type) {
      case 'addMark':
        return <AddMarkForm />;
      case 'onClickMark':
        return <LocationDetailWindow />;
      default:
        return console.error('pass an existing modalWindowType');
    }
  };

  closeButtonOnClick = () => {
    if (this.props.modalContent === 'addMark') {
      this.props.addMarkModalWindow(false);
    } else if (this.props.modalContent === 'onClickMark') {
      this.props.clickMarkModalWindow(false);
    }
  };

  render() {
    return (
      <View style={containerStyles.mainContainer}>
        <TouchableOpacity
          style={containerStyles.closeButtonContainer}
          onPress={this.closeButtonOnClick}
        >
          <Icon name="close" size={30} />
        </TouchableOpacity>
        <View style={containerStyles.contentContainer}>
          {this.content(this.props.modalContent)}
        </View>
      </View>
    );
  }
}

// Redux Getter to use: this.props.(name of any return)
const mapStateToProps = state => {
  return {
    modalWindowStatus: state.modalWindowReducer.status
  };
};

// Redux Setter to use: this.props.(name of any return)
const mapDispatchToProps = dispatch => {
  return {
    addMarkModalWindow: bool => dispatch(addMarkModalWindow(bool)),
    clickMarkModalWindow: bool => dispatch(clickMarkModalWindow(bool))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalWindow);
