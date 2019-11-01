import React, { Component } from "react";
import { View, Button } from "react-native";
import { connect } from "react-redux";

//Redux actions
import { displayModalWindow } from "../../actions/modalWindowAction";

// Componenets Style
import { containerStyles } from "./Stylesheet";

class ModalWindow extends Component {
  closeButtonOnClick = () => {
    this.props.displayModalWindow(false);
  };

  render() {
    return (
      <View style={containerStyles.mainContainer}>
        <View style={containerStyles.closeButtonContainer}>
          <Button title="x" onPress={this.closeButtonOnClick} />
        </View>
        <View style={containerStyles.contentContainer}>
          {this.props.modalContent}
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
