// Import Libraries
import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import { reduxForm, Field, reset } from 'redux-form';

//Redux actions
import { addGroupMark, newMarkAdded, addGroupMarkOnClick } from '../../../actions/groupMarkAction';
import { addMarkModalWindow } from '../../../actions/modalWindowAction';

// Componenets Style
import { containerStyles } from './Stylesheet';

import validator from '../validate/validation_wrapper';
import RenderField from '../RenderField/RenderField';
import { PRICE_RANGE } from '../../../data/constants';

// Creating Component
class AddMarkForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photo: null,
      empty: false,
      address: this.props.getGeocodingLocation,
      categories: []
    };
  }

  componentDidMount() {
    let allCategories = this.props.getGroupDefaultMarkCategoryData;
    allCategories = allCategories.concat(
      this.props.getGroupAllCustomMarkCategoryData
    );

    this.setState({
      ...this.state,
      categories: allCategories
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.getGeocodingLocation !== prevProps.getGeocodingLocation) {
      this.setState({
        address: this.props.getGeocodingLocation
      });
    }
  }

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
      markName: values.markName.trim(),
      categoryId: values.categoryId,
      markLocations: {
        locationAddress: values.locationAddress.trim(),
        loactionPriceRange: values.loactionPriceRange,
        additionalInformation: values.additionalInformation.trim(),
        locationImageData: this.state.photo && this.state.photo.data
      },
      geometry: { coordinates: this.props.coordinates },
      groupMarkCreatedBy: this.props.getUserData._id,
      groupId: this.props.getActiveGroup._id,
      token: this.props.logInToken
    };

    console.log(formValues)
    this.props.addMarkModalWindow(false);
    this.props.addGroupMarkOnClick(false);
    this.props.addGroupMark(formValues);
    this.props.newMarkAdded(!this.props.newMarkAddedFlag);
    this.creatingNewMarker(false);
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
        <Field
          name="loactionPriceRange"
          component={RenderField}
          type="priceRange"
          label="Price Range"
          items={PRICE_RANGE}
        />
        <Field
          name="categoryId"
          component={RenderField}
          type="category"
          label="Category"
          items={this.state.categories}
        />
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

  errors.markName = validator('markName', values.markName);

  errors.locationAddress = validator('locationAddress', values.locationAddress);

  errors.loactionPriceRange = validator(
    'loactionPriceRange',
    values.loactionPriceRange
  );

  errors.categoryId = validator('categoryId', values.categoryId);

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
    getGroupDefaultMarkCategoryData:
      state.groupDefaultMarkCategoryReducer.getGroupDefaultMarkCategoryData,
    getGroupAllCustomMarkCategoryData:
      state.groupCustomMarkCategoryReducer.getGroupAllCustomMarkCategoryData,
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
    newMarkAdded: bool => dispatch(newMarkAdded(bool)),
    addGroupMarkOnClick: bool => dispatch(addGroupMarkOnClick(bool))
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
