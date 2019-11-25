// Import Libraries
import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, Picker } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import { reduxForm, Field, reset } from 'redux-form';

//Redux actions
import { addGroupMark } from '../../../actions/groupMarkAction';
import { displayModalWindow } from '../../../actions/modalWindowAction';

// Componenets Style
import { containerStyles } from './Stylesheet';

import validator from '../validate/validation_wrapper';
import { RenderField } from '../RenderField/RenderField';

// Creating Component
class AddMarkForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photo: null,
      empty: false,
      priceRange: 0
    };
  }

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

  submit = values => {
    const formValues = {
      markName: values.markName,
      markLocations: {
        locationAddress: values.locationAddress,
        loactionPriceRange: this.state.priceRange,
        additionalInformation: values.additionalInformation,
        locationImageSet: [{ locationImageData: this.state.photo }]
      },
      geometry: { coordinates: this.props.coordinates },
      groupMarkCreatedBy: this.props.getUserData._id,
      groupId: this.props.getActiveGroup._id,
      token: this.props.logInToken
    };

    this.props.displayModalWindow(false);
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

        <Text style={containerStyles.textStyle}>Price Range</Text>
        <View style={containerStyles.priceRangeContainer}>
          <Picker
            selectedValue={this.state.priceRange}
            style={containerStyles.priceRangeList}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ priceRange: itemValue })
            }
          >
            <Picker.Item label="$" value="0" />
            <Picker.Item label="$$" value="1" />
            <Picker.Item label="$$$" value="2" />
          </Picker>
        </View>
        <Field
          name="locationReview"
          component={RenderField}
          type="text"
          label="Review"
        />
        <Field
          name="additionalInformation"
          component={RenderField}
          type="textarea"
          label="Description"
        />
        <Text style={containerStyles.textStyle}>Upload an image</Text>
        <View>
          {this.state.empty ? (
            <Image
              source={{ uri: this.state.photo.uri }}
              style={containerStyles.imageStyle}
            />
          ) : (
            <TouchableOpacity
              style={containerStyles.imageUpload}
              onPress={this.choosePhoto}
            >
              <Icon name="plus" size={30}></Icon>
            </TouchableOpacity>
          )}
        </View>
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
    addGroupMark: data => dispatch(addGroupMark(data)),
    displayModalWindow: bool => dispatch(displayModalWindow(bool))
  };
};

AddMarkForm = connect(mapStateToProps, mapDispatchToProps)(AddMarkForm);

export default reduxForm({
  form: 'addMarkRF',
  onSubmitSuccess: clearUpForm,
  validate
})(AddMarkForm);
