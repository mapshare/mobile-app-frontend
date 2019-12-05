// Import Libraries
import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, Picker } from 'react-native';
import { ColorPicker } from 'react-native-color-picker';
import { connect } from 'react-redux';
import { reduxForm, Field, reset } from 'redux-form';

//Redux actions
import { addCustomMarkModalWindow } from '../../../actions/modalWindowAction';
import { addGroupCustomMarkCategory } from '../../../actions/groupCustomMarkCategory';

// Componenets Style
import { containerStyles } from './Stylesheet';

import validator from '../validate/validation_wrapper';
import RenderField from '../RenderField/RenderField';

// Creating Component
class AddCustomMarkForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryColor: '',
      saveColor: false
    };
  }

  submit = values => {
    if (this.state.categoryColor && this.state.saveColor) {
      const formValues = {
        customMarkCategoryName: values.customMarkCategoryName.trim(),
        categoryColor: this.state.categoryColor,
        groupId: this.props.getActiveGroup._id,
        token: this.props.logInToken
      };

      this.props.addCustomMarkModalWindow(false);
      this.props.addGroupCustomMarkCategory(formValues);
    }
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <View style={containerStyles.container}>
        <Field
          name="customMarkCategoryName"
          component={RenderField}
          type="addCustomMark"
          label="Create Custom Mark"
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
          <Text style={containerStyles.buttonText}>Save Category</Text>
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
  dispatch(reset('addCustomMarkRF'));
};

// Redux Getter to use: this.props.(name of any return)
const mapStateToProps = state => {
  return {
    logInToken: state.logInReducer.token,
    getActiveGroup: state.groupReducer.getActiveGroupData
  };
};

// Redux Setter to use: this.props.(name of any return)
const mapDispatchToProps = dispatch => {
  return {
    addCustomMarkModalWindow: bool => dispatch(addCustomMarkModalWindow(bool)),
    addGroupCustomMarkCategory: data =>
      dispatch(addGroupCustomMarkCategory(data))
  };
};

AddCustomMarkForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCustomMarkForm);

export default reduxForm({
  form: 'addCustomMarkRF',
  onSubmitSuccess: clearUpForm,
  validate
})(AddCustomMarkForm);
