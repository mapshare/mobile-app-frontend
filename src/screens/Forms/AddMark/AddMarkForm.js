// Import Libraries
import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, Picker } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import { reduxForm, Field, reset } from 'redux-form';

//Redux actions
import { addGroupMark, newMarkAdded } from '../../../actions/groupMarkAction';
import { addMarkModalWindow } from '../../../actions/modalWindowAction';

// Componenets Style
import { containerStyles } from './Stylesheet';

import validator from '../validate/validation_wrapper';
import RenderField from '../RenderField/RenderField';

// Creating Component
class AddMarkForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photo: null,
      empty: false,
      priceRange: 0,
      address: this.props.getGeocodingLocation
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.getGeocodingLocation !== prevProps.getGeocodingLocation) {
      this.setState({
        address: this.props.getGeocodingLocation
      });
    }
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
        locationImageData: this.state.photo && this.state.photo.data
      },
      geometry: { coordinates: this.props.coordinates },
      groupMarkCreatedBy: this.props.getUserData._id,
      groupId: this.props.getActiveGroup._id,
      token: this.props.logInToken
    };

    this.props.addMarkModalWindow(false);
    this.props.addGroupMark(formValues);
    this.props.newMarkAdded(!this.props.newMarkAddedFlag);
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
          maxLength={20}
        />
        <Field
          name="locationAddress"
          component={RenderField}
          type="text"
          label="Location Address"
          maxLength={60}
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
            <Picker.Item label="Free" value="3" />
          </Picker>
        </View>
        <Field
          name="additionalInformation"
          component={RenderField}
          type="textarea"
          label="Description"
          maxLength={150}
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
  console.log('values: ', values);

  errors.markName = validator('markName', values.markName);

  errors.locationAddress = validator('locationAddress', values.locationAddress);

  if (!values.loactionPriceRange) {
    errors.loactionPriceRange = validator(
      'loactionPriceRange',
      values.loactionPriceRange
    );
  }

  errors.additionalInformation = validator(
    'additionalInformation',
    values.additionalInformation
  );

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
    getActiveGroup: state.groupReducer.getActiveGroupData,
    newMarkAddedFlag: state.groupMarkReducer.newMarkAddedFlag,
    initialValues: {
      locationAddress: state.groupMarkReducer.getGeocodingLocation
    }
  };
};

// Redux Setter to use: this.props.(name of any return)
const mapDispatchToProps = dispatch => {
  return {
    addGroupMark: data => dispatch(addGroupMark(data)),
    addMarkModalWindow: bool => dispatch(addMarkModalWindow(bool)),
    newMarkAdded: bool => dispatch(newMarkAdded(bool))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    form: 'addMarkRF',
    onSubmitSuccess: clearUpForm,
    enableReinitialize: true,
    validate
  })(AddMarkForm)
);
