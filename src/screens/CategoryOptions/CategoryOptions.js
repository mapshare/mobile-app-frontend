import React, { Component } from 'react';
import { View, TouchableOpacity, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

//Redux actions
import { categoriesOptionOnClick } from '../../actions/groupDefaultMarkCategory';
import { addCustomMarkModalWindow } from '../../actions/modalWindowAction';

// Componenets Style
import { containerStyles } from './Stylesheet';
import AddCustomMark from '../AddCustomMark/AddCustomMark';

class CategoryOptions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCategories: this.props.getGroupDefaultMarkCategoryData,
      categoryIsSelected: false
    };
  }

  getCategory = (data, index) => {
    const ref = `categoryId-${index}`;
    let iconColor = this.state.selectedCategories[index].isSelected
      ? 'red'
      : 'green';
    let iconName = this.state.selectedCategories[index].isSelected
      ? 'minus'
      : 'plus';

    return (
      <TouchableOpacity
        key={ref}
        style={containerStyles.categoryContainer}
        onPress={() => this.categoryOnClick(data, index)}
      >
        <Icon name={iconName} size={18} color={iconColor} />
        <Text style={containerStyles.categoryText}>
          {data.defaultCategoryName}
        </Text>
      </TouchableOpacity>
    );
  };

  categoryOnClick = (data, index) => {
    this.state.selectedCategories[index].isSelected = !this.state
      .selectedCategories[index].isSelected;

    this.setState({
      categoryIsSelected: !this.state.categoryIsSelected
    });
  };

  renderCategories() {
    const categoryView = [];
    this.props.getGroupDefaultMarkCategoryData.map((data, index) => {
      categoryView.push(this.getCategory(data, index));
    });

    return categoryView;
  }

  render() {
    return (
      <ScrollView>
        <AddCustomMark />
        <TouchableOpacity
          style={containerStyles.buttonContainer}
          onPress={() => this.props.addCustomMarkModalWindow(true)}
        >
          <Text>Create</Text>
          <Text>Category</Text>
        </TouchableOpacity>
        <View>{this.renderCategories()}</View>
        <TouchableOpacity style={containerStyles.sortButtonContainer}>
          <Icon name="check" size={20} color="white" />
          <Text style={containerStyles.buttonTextStyle}>Sort</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

// Redux Getter to use: this.props.(name of any return)
const mapStateToProps = state => {
  return {
    categoriesOptionOnClickStatus:
      state.groupDefaultMarkCategoryReducer.categoriesOptionOnClickStatus,
    getGroupDefaultMarkCategoryData:
      state.groupDefaultMarkCategoryReducer.getGroupDefaultMarkCategoryData
  };
};

// Redux Setter to use: this.props.(name of any return)
const mapDispatchToProps = dispatch => {
  return {
    categoriesOptionOnClick: bool => dispatch(categoriesOptionOnClick(bool)),
    addCustomMarkModalWindow: bool => dispatch(addCustomMarkModalWindow(bool))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryOptions);
