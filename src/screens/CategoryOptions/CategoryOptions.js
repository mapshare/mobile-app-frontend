import React, { Component } from 'react';
import { View, TouchableOpacity, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

//Redux actions
import { categoriesOptionOnClick } from '../../actions/groupDefaultMarkCategory';
import { getGroupCustomMarkCategoryDataSuccess } from '../../actions/groupCustomMarkCategory';
import {
  addCustomMarkModalWindow,
  customMarkOptionModalWindow
} from '../../actions/modalWindowAction';
import { setSortGroupMark } from '../../actions/groupMarkAction';

// Componenets Style
import { containerStyles, customCategoryStyles } from './Stylesheet';
import AddCustomMark from '../AddCustomMark/AddCustomMark';
import CustomMarkOptions from '../CustomMarkOptions/CustomMarkOptions';

class CategoryOptions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedDefaultCategories: this.props.getGroupDefaultMarkCategoryData,
      selectedCustomCategories: this.props.getGroupAllCustomMarkCategoryData,
      categoryIsSelected: false
    };

    this.sortSelectedCategories = [];
  }

  // get default category
  getDefaultCategory = (data, index) => {
    const ref = `defaultCategoryId-${index}`;
    let iconColor = this.state.selectedDefaultCategories[index].isSelected
      ? 'green'
      : 'red';
    let iconName = this.state.selectedDefaultCategories[index].isSelected
      ? 'plus'
      : 'minus';

    return (
      <TouchableOpacity
        key={ref}
        style={containerStyles.categoryContainer}
        onPress={() => this.defaultCategoryOnClick(data, index)}
      >
        <Icon name={iconName} size={18} color={iconColor} />
        <Text
          style={[
            containerStyles.categoryText,
            { color: `${data.categoryColor}` }
          ]}
        >
          {data.defaultCategoryName}
        </Text>
      </TouchableOpacity>
    );
  };

  // get custom category
  getCustomCategory = (data, index) => {
    const ref = `customCategoryId-${index}`;
    let iconColor = this.state.selectedCustomCategories[index].isSelected
      ? 'green'
      : 'red';
    let iconName = this.state.selectedCustomCategories[index].isSelected
      ? 'plus'
      : 'minus';

    return (
      <View key={ref} style={containerStyles.categoryContainer}>
        <TouchableOpacity
          style={customCategoryStyles.customCategoryContainer}
          onPress={() => this.customCategoryOnClick(data, index)}
        >
          <Icon name={iconName} size={18} color={iconColor} />
          <Text
            style={[
              containerStyles.categoryText,
              { color: `${data.categoryColor}` }
            ]}
          >
            {data.customMarkCategoryName}
          </Text>
        </TouchableOpacity>
        {this.props.permisionLevel > 2 &&
          <TouchableOpacity
          style={customCategoryStyles.settingIcon}
          onPress={() => this.customCategoryOptionOnClick(data)}
          >
            <Icon name="settings" size={18} />
          </TouchableOpacity>
        }
      </View>
    );
  };

  // default category on click
  defaultCategoryOnClick = (data, index) => {
    this.state.selectedDefaultCategories[index].isSelected = !this.state
      .selectedDefaultCategories[index].isSelected;

    this.setState(
      {
        categoryIsSelected: !this.state.categoryIsSelected
      },
      () => {
        if (!this.state.selectedDefaultCategories[index].isSelected) {
          this.sortSelectedCategories.push(data._id);
        } else {
          let index = this.sortSelectedCategories.indexOf(data._id);
          if (index !== -1) this.sortSelectedCategories.splice(index, 1);
        }
      }
    );
  };

  // custom category on click
  customCategoryOnClick = (data, index) => {
    this.state.selectedCustomCategories[index].isSelected = !this.state
      .selectedCustomCategories[index].isSelected;

    this.setState(
      {
        categoryIsSelected: !this.state.categoryIsSelected
      },
      () => {
        if (!this.state.selectedCustomCategories[index].isSelected) {
          this.sortSelectedCategories.push(data._id);
        } else {
          let index = this.sortSelectedCategories.indexOf(data._id);
          if (index !== -1) this.sortSelectedCategories.splice(index, 1);
        }
      }
    );
  };

  // render default category
  renderDefaultCategories() {
    const defaultCategoryView = [];
    this.props.getGroupDefaultMarkCategoryData.map((data, index) => {
      defaultCategoryView.push(this.getDefaultCategory(data, index));
    });

    return defaultCategoryView;
  }

  // render custom category
  renderCustomCategories() {
    const customCategoryView = [];
    this.props.getGroupAllCustomMarkCategoryData.map((data, index) => {
      customCategoryView.push(this.getCustomCategory(data, index));
    });

    return customCategoryView;
  }

  customCategoryOptionOnClick = data => {
    this.props.customMarkOptionModalWindow(true);
    this.props.getGroupCustomMarkCategoryDataSuccess(data);
  };

  sortOnclick(data) {
    this.props.setSortGroupMark(data, !this.props.sortGroupMarkOnClickFlag);
  }

  render() {
    return (
      <ScrollView>
        <CustomMarkOptions />
        <AddCustomMark />
        {this.props.permisionLevel > 2 &&        
          <TouchableOpacity
            style={containerStyles.buttonContainer}
            onPress={() => this.props.addCustomMarkModalWindow(true)}
          >
            <Text>Create</Text>
            <Text>Category</Text>
          </TouchableOpacity>
        }
        <View>{this.renderDefaultCategories()}</View>
        {this.state.selectedCustomCategories.length > 0 && (
          <View>
            <View style={customCategoryStyles.seperatorLine} />
            <Text style={customCategoryStyles.titleText}>
              Custom Categories
            </Text>
            <View>{this.renderCustomCategories()}</View>
          </View>
        )}
        <TouchableOpacity
          style={containerStyles.sortButtonContainer}
          onPress={() => this.sortOnclick(this.sortSelectedCategories)}
        >
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
      state.groupDefaultMarkCategoryReducer.getGroupDefaultMarkCategoryData,
    getGroupAllCustomMarkCategoryData:
      state.groupCustomMarkCategoryReducer.getGroupAllCustomMarkCategoryData,
    sortGroupMarkOnClickFlag: state.groupMarkReducer.sortGroupMarkOnClickFlag,
    permisionLevel: state.groupReducer.getGroupMemberData.memberRole.groupRolePermisionLevel,
  };
};

// Redux Setter to use: this.props.(name of any return)
const mapDispatchToProps = dispatch => {
  return {
    categoriesOptionOnClick: bool => dispatch(categoriesOptionOnClick(bool)),
    addCustomMarkModalWindow: bool => dispatch(addCustomMarkModalWindow(bool)),
    setSortGroupMark: (data, bool) => dispatch(setSortGroupMark(data, bool)),
    customMarkOptionModalWindow: bool =>
      dispatch(customMarkOptionModalWindow(bool)),
    getGroupCustomMarkCategoryDataSuccess: data =>
      dispatch(getGroupCustomMarkCategoryDataSuccess(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryOptions);
