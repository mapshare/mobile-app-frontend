import React, { Component } from 'react';
import { View, Modal, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

//Redux actions
import { addCustomMarkModalWindow } from '../../actions/modalWindowAction';

// Componenets Style
import { containerStyles } from './Stylesheet';
import AddCustomMarkForm from '../Forms/AddCustomMarkForm/AddCustomMarkForm';

class AddCustomMark extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  closeButtonOnClick = () => {
    this.props.addCustomMarkModalWindow(false);
  };

  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.addCustomMarkStatus}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}
      >
        <View style={containerStyles.mainContainer}>
          <TouchableOpacity
            style={containerStyles.closeButtonContainer}
            onPress={this.closeButtonOnClick}
          >
            <Icon name="close" size={30} color="white" />
          </TouchableOpacity>
          <View>
            <AddCustomMarkForm />
          </View>
        </View>
      </Modal>
    );
  }
}

// Redux Getter to use: this.props.(name of any return)
const mapStateToProps = state => {
  return {
    addCustomMarkStatus: state.modalWindowReducer.addCustomMarkStatus
  };
};

// Redux Setter to use: this.props.(name of any return)
const mapDispatchToProps = dispatch => {
  return {
    addCustomMarkModalWindow: bool => dispatch(addCustomMarkModalWindow(bool))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCustomMark);
