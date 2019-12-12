import React, { Component } from 'react';
import { View, TouchableHighlight, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

//Redux actions
import { addGroupMarkOnClick } from '../../actions/groupMarkAction';

// Componenets Style
import { containerStyles } from './Stylesheet';

class AddMark extends Component {
  addLocationOnClick = () => {
    this.props.addGroupMarkOnClick(!this.props.addGroupMarkOnClickStatus);
  };

  async creatingNewMarker(data) {
    await AsyncStorage.getItem('CreatingNewEvent').then((result) => {
      if (result === null) {
        AsyncStorage.setItem('CreatingNewEvent', JSON.stringify(data))
      }else {
        AsyncStorage.setItem('CreatingNewEvent', JSON.stringify(data))
      }
      console.log(result);
    })
  }

  render() {
    return (
      <View style={containerStyles.mainContainer}>
        <TouchableHighlight onPress={() => this.addLocationOnClick()}>
          <View style={containerStyles.contentContainer}>
            <Icon name="plus" size={25} color="white" />
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

// Redux Getter to use: this.props.(name of any return)
const mapStateToProps = state => {
  return {
    addGroupMarkOnClickStatus: state.groupMarkReducer.addGroupMarkOnClickStatus
  };
};

// Redux Setter to use: this.props.(name of any return)
const mapDispatchToProps = dispatch => {
  return {
    addGroupMarkOnClick: bool => dispatch(addGroupMarkOnClick(bool))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddMark);
