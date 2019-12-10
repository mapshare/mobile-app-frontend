import React, { Component } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { connect } from "react-redux";

//Redux actions
import { deleteLocationModalWindow, clickMarkModalWindow, isModalWindowStatus } from "../../actions/modalWindowAction";
import { deleteGroupMark } from "../../actions/groupMarkAction";

// Componenets Style
import { containerStyles } from "./Stylesheet";
import EditGroupMark from "../Forms/EditGroupMark/EditGroupMark";


class ConfirmDelete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photo: null,
      empty: false,
    };
  }

  cancelOnClick = () => {
    this.props.deleteLocationModalWindow({ status: false });
    this.props.isModalWindowStatus(false)
  };

  deleteOnClick = type => {
    if (type === 'location') {
      const data = {
        groupId: this.props.getActiveGroupData._id,
        token: this.props.token,
        markId: this.props.getGroupMarkData.mark._id
      }
      this.props.deleteGroupMark(data);
      this.props.deleteLocationModalWindow({ status: false });
      this.props.clickMarkModalWindow(false)
    } else if (type === 'image') {
      console.log('type image')
      this.props.deleteLocationModalWindow({ status: false });
      this.props.isModalWindowStatus(false)
    }
  };

  choosePhoto = () => {
    let options = {
      title: null,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        this.setState({
          photo: response,
          empty: true
        });
      }
    });
  };

  renderByType = type => {
    switch (type) {
      case 'location':
        return (
          <View style={containerStyles.contentLocation}>
            <View style={containerStyles.textContainer}>
              <Text style={containerStyles.textStyle}>Are you sure to delete this {this.props.type}?</Text>
              <Text style={containerStyles.textStyle}>This action is not reversible.</Text>
            </View>
            <TouchableOpacity
              style={containerStyles.buttonContainer}
              onPress={() => this.deleteOnClick(type)}
            >
              <Text style={containerStyles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={containerStyles.buttonContainer}
              onPress={() => this.cancelOnClick()}
            >
              <Text style={containerStyles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )
      case 'image':
        return (
          <View style={containerStyles.contentImage}>
            <View style={containerStyles.textContainer}>
              <Text style={containerStyles.textStyle}>Add an {this.props.type} or Edit location name</Text>
            </View>
            <EditGroupMark />
            <TouchableOpacity
              style={containerStyles.buttonContainer}
              onPress={() => this.cancelOnClick()}
            >
              <Text style={containerStyles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )
      default:
        return <Text>Invalid Type</Text>
    }
  }

  render() {
    return (
      <View style={containerStyles.container}>
        {this.renderByType(this.props.type)}
      </View>
    );
  }
}

// Redux Getter to use: this.props.(name of any return)
const mapStateToProps = state => {
  return {
    addGroupMarkOnClickStatus: state.groupMarkReducer.addGroupMarkOnClickStatus,
    getGroupMarkData: state.groupMarkReducer.getGroupMarkData,
    getActiveGroupData: state.groupReducer.getActiveGroupData,
    token: state.logInReducer.token,
    type: state.modalWindowReducer.deleteLocation.type
  };
};

// Redux Setter to use: this.props.(name of any return)
const mapDispatchToProps = dispatch => {
  return {
    deleteLocationModalWindow: bool => dispatch(deleteLocationModalWindow(bool)),
    deleteGroupMark: data => dispatch(deleteGroupMark(data)),
    clickMarkModalWindow: bool => dispatch(clickMarkModalWindow(bool)),
    isModalWindowStatus: bool => dispatch(isModalWindowStatus(bool))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmDelete);
