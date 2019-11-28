import React, { Component } from 'react';
import { View, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

//Redux actions
import { categoriesOptionOnClick } from '../../actions/groupDefaultMarkCategory';

// Componenets Style
import { containerStyles } from './Stylesheet';

class Categories extends Component {
  categoriesOnClick = () => {
    this.props.categoriesOptionOnClick(
      !this.props.categoriesOptionOnClickStatus
    );
  };

  render() {
    return (
      <View style={containerStyles.mainContainer}>
        <TouchableHighlight onPress={this.categoriesOnClick}>
          <View style={containerStyles.contentContainer}>
            <Icon name="location-pin" size={25} color="white" />
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

// Redux Getter to use: this.props.(name of any return)
const mapStateToProps = state => {
  return {
    categoriesOptionOnClickStatus:
      state.groupDefaultMarkCategoryReducer.categoriesOptionOnClickStatus
  };
};

// Redux Setter to use: this.props.(name of any return)
const mapDispatchToProps = dispatch => {
  return {
    categoriesOptionOnClick: bool => dispatch(categoriesOptionOnClick(bool))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
