import React, { Component } from 'react';
import { View, Modal, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

//Redux actions
import { customMarkOptionModalWindow } from '../../actions/modalWindowAction';

// Componenets Style
import { containerStyles } from './Stylesheet';
import CustomMarkOptionsForm from '../Forms/CustomMarkOptionsForm/CustomMarkOptionsForm';

class CustomMarkOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  closeButtonOnClick = () => {
    this.props.customMarkOptionModalWindow(false);
  };

  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.customMarkOptionStatus}
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
            <CustomMarkOptionsForm />
          </View>
        </View>
      </Modal>
    );
  }
}

// Redux Getter to use: this.props.(name of any return)
const mapStateToProps = state => {
  return {
    customMarkOptionStatus: state.modalWindowReducer.customMarkOptionStatus
  };
};

// Redux Setter to use: this.props.(name of any return)
const mapDispatchToProps = dispatch => {
  return {
    customMarkOptionModalWindow: bool =>
      dispatch(customMarkOptionModalWindow(bool))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomMarkOptions);
