import React, { Component } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/SimpleLineIcons";

//Redux actions
import { displayModalWindow } from "../../actions/modalWindowAction";

// Componenets Style
import { containerStyles } from "./Stylesheet";

import AddMarkForm from "../Forms/AddMark/AddMarkForm";

class ModalWindow extends Component {
  content = type => {
    switch (type) {
      case "addMark":
        return <AddMarkForm />;
      default:
        return console.error("pass an existing modalWindowType");
    }
  };

  closeButtonOnClick = () => {
    this.props.displayModalWindow(false);
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
    displayModalWindow: bool => dispatch(displayModalWindow(bool))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalWindow);
