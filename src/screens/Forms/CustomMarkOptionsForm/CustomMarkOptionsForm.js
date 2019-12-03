// Import Libraries
import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, Picker } from 'react-native';
import { ColorPicker } from 'react-native-color-picker';
import { connect } from 'react-redux';
import { reduxForm, Field, reset } from 'redux-form';

//Redux actions
import { customMarkOptionModalWindow } from '../../../actions/modalWindowAction';
import {
  updateGroupCustomMarkCategory,
  deleteGroupCustomMarkCategory
} from '../../../actions/groupCustomMarkCategory';

// Componenets Style
import { containerStyles } from './Stylesheet';

import validator from '../validate/validation_wrapper';
import RenderField from '../RenderField/RenderField';

// Creating Component
class CustomMarkOptionsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryColor: this.props.getGroupCustomMarkCategoryData.categoryColor,
      saveColor: true
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.getGroupCustomMarkCategoryData !==
      prevProps.getGroupCustomMarkCategoryData
    ) {
      this.setState({
        categoryColor: this.props.getGroupCustomMarkCategoryData.categoryColor
      });
    }
  }

  submit = values => {
    if (this.state.categoryColor && this.state.saveColor) {
      const formValues = {
        customMarkCategoryName: values.customMarkCategoryName,
        categoryColor: this.state.categoryColor,
        groupId: this.props.getActiveGroup._id,
        token: this.props.logInToken,
        categoryId: this.props.getGroupCustomMarkCategoryData._id
      };

      this.props.customMarkOptionModalWindow(false);
      this.props.updateGroupCustomMarkCategory(formValues);
    }
  };

  deleteOnClick() {
    const data = {
      groupId: this.props.getActiveGroup._id,
      token: this.props.logInToken,
      categoryId: this.props.getGroupCustomMarkCategoryData._id
    };

    this.props.deleteGroupCustomMarkCategory(data);
    this.props.customMarkOptionModalWindow(false);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <View style={containerStyles.container}>
        <Field
          name="customMarkCategoryName"
          component={RenderField}
          type="addCustomMark"
          label="Edit Custom Mark"
        />
        <Text style={containerStyles.colorPickerText}>
          *Tap on the circle to save the color for the category
        </Text>
        <View style={containerStyles.colorPickerContainer}>
          <ColorPicker
            onColorSelected={color =>
              this.setState({ categoryColor: color, saveColor: true })
            }
            onColorChange={() =>
              this.state.saveColor && this.setState({ saveColor: false })
            }
            style={{ flex: 1 }}
          />
        </View>
        {this.state.categoryColor && this.state.saveColor ? (
          <Text style={containerStyles.colorPickerSuccess}>
            Saved Succesfully!
          </Text>
        ) : (
          <Text style={containerStyles.colorPickerError}>
            Please save the picked color.
          </Text>
        )}
        <TouchableOpacity
          style={containerStyles.buttonContainer}
          onPress={handleSubmit(this.submit)}
        >
          <Text style={containerStyles.buttonText}>Update Category</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={containerStyles.buttonContainer}
          onPress={() => this.deleteOnClick()}
        >
          <Text style={containerStyles.deleteButtonText}>Delete Category</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const validate = values => {
  const errors = {};

  errors.customMarkCategoryName = validator(
    'customMarkCategoryName',
    values.customMarkCategoryName
  );

  return errors;
};

const clearUpForm = (result, dispatch) => {
  dispatch(reset('CustomMarkOptionsRF'));
};

// Redux Getter to use: this.props.(name of any return)
const mapStateToProps = state => {
  return {
    logInToken: state.logInReducer.token,
    getActiveGroup: state.groupReducer.getActiveGroupData,
    getGroupCustomMarkCategoryData:
      state.groupCustomMarkCategoryReducer.getGroupCustomMarkCategoryData,
    initialValues: {
      customMarkCategoryName:
        state.groupCustomMarkCategoryReducer.getGroupCustomMarkCategoryData
          .customMarkCategoryName
    }
  };
};

// Redux Setter to use: this.props.(name of any return)
const mapDispatchToProps = dispatch => {
  return {
    updateGroupCustomMarkCategory: data =>
      dispatch(updateGroupCustomMarkCategory(data)),
    customMarkOptionModalWindow: bool =>
      dispatch(customMarkOptionModalWindow(bool)),
    deleteGroupCustomMarkCategory: data =>
      dispatch(deleteGroupCustomMarkCategory(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    form: 'CustomMarkOptionsRF',
    onSubmitSuccess: clearUpForm,
    enableReinitialize: true,
    validate
  })(CustomMarkOptionsForm)
);
