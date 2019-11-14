// Import Libraries
import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { reduxForm, Field, reset } from 'redux-form';

//Redux actions
import { addGroupMark } from '../../../actions/groupMarkAction';

// Componenets Style
import { containerStyles } from './Stylesheet';

import validator from '../validate/validation_wrapper';
import { RenderField } from '../RenderField/RenderField';

// Creating Component
class AddMarkForm extends Component {
  submit = values => {
    const formValues = {
      markName: values.markName,
      markLocations: {
        locationAddress: values.locationAddress,
        loactionPriceRange: values.loactionPriceRange,
        additionalInformation: values.additionalInformation
      },
      geometry: { coordinates: this.props.coordinates },
      groupMarkCreatedBy: this.props.getUserData._id,
      groupId: this.props.getActiveGroup._id,
      token: this.props.logInToken
    };

    this.props.addGroupMark(formValues);
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <View style={containerStyles.container}>
        <Field
          name="markName"
          component={RenderField}
          type="text"
          label="Location Name"
        />
        <Field
          name="locationAddress"
          component={RenderField}
          type="text"
          label="Location Address"
        />
        <Field
          name="loactionPriceRange"
          component={RenderField}
          type="text"
          label="Price"
        />
        <Field
          name="locationReview"
          component={RenderField}
          type="textarea"
          label="Review"
        />
        <Field
          name="additionalInformation"
          component={RenderField}
          type="textarea"
          label="Description"
        />
        <Field
          name="image"
          component={RenderField}
          type="text"
          label="Upload"
        />
        <TouchableOpacity
          style={containerStyles.buttonContainer}
          onPress={handleSubmit(this.submit)}
        >
          <Text style={containerStyles.buttonText}>Add Location</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const validate = values => {
  const errors = {};

  if (!values.markName) {
    errors.markName = validator('markName', values.markName);
  }
  if (!values.locationAddress) {
    errors.locationAddress = validator(
      'locationAddress',
      values.locationAddress
    );
  }
  if (!values.loactionPriceRange) {
    errors.loactionPriceRange = validator(
      'loactionPriceRange',
      values.loactionPriceRange
    );
  }
  if (!values.locationReview) {
    errors.locationReview = validator('locationReview', values.locationReview);
  }

  return errors;
};

const clearUpForm = (result, dispatch) => {
  dispatch(reset('addMarkRF'));
};

// Redux Getter to use: this.props.(name of any return)
const mapStateToProps = state => {
  return {
    coordinates: state.groupMarkReducer.coordinates,
    getUserData: state.logInReducer.userData,
    logInToken: state.logInReducer.token,
    getActiveGroup: state.groupReducer.getActiveGroupData
  };
};

// Redux Setter to use: this.props.(name of any return)
const mapDispatchToProps = dispatch => {
  return {
    addGroupMark: bool => dispatch(addGroupMark(bool))
  };
};

AddMarkForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddMarkForm);

export default reduxForm({
  form: 'addMarkRF',
  onSubmitSuccess: clearUpForm,
  validate
})(AddMarkForm);
