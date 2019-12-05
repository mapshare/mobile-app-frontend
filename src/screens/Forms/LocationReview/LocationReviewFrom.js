// Import Libraries
import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Keyboard  } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import { reduxForm, Field, reset } from 'redux-form';

//Redux actions
import { updateGroupMark } from '../../../actions/groupMarkAction';
import { addMarkModalWindow } from '../../../actions/modalWindowAction';
import { reviewBottomWindow } from '../../../actions/bottomWindowAction';

// Componenets Style
import { containerStyles } from './Stylesheet';

import validator from '../validate/validation_wrapper';
import RenderField from '../RenderField/RenderField';

// Creating Component
class LocationReviewForm extends Component {
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
    const review = {
      reviewContent: values.reviewContent,
      reviewCreatedBy: this.props.getUserData._id,
    }
    let markLocations = this.props.getCurrentOnClickMarkData.markLocations
    markLocations.locationReviewSet.push(review)

    const formValues = {
      markLocations: markLocations,
      groupId: this.props.getActiveGroupData._id,
      token: this.props.logInToken,
      markId: this.props.getGroupMarkData.mark._id
    };
    Keyboard.dismiss()
    this.props.reviewBottomWindow(false);
    this.props.updateGroupMark(formValues);
  };

  cancelOnClick() {
    this.props.reviewBottomWindow(false);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <View style={containerStyles.container}>
        <Field
          name="reviewContent"
          component={RenderField}
          type="text"
          label="Review"
          maxLength={50}
        />
        <View style={containerStyles.buttonContainer}>
          <TouchableOpacity
            style={containerStyles.submitButtonContainer}
            onPress={handleSubmit(this.submit)}
          >
            <Text style={containerStyles.buttonText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={containerStyles.cancelButtonContainer}
            onPress={() => this.cancelOnClick()}
          >
            <Text style={containerStyles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

const validate = values => {
  const errors = {};

  errors.reviewContent = validator('reviewContent', values.reviewContent);

  return errors;
};

const clearUpForm = (result, dispatch) => {
  dispatch(reset('locationReviewFormRF'));
};

// Redux Getter to use: this.props.(name of any return)
const mapStateToProps = state => {
  return {
    coordinates: state.groupMarkReducer.coordinates,
    getUserData: state.logInReducer.userData,
    logInToken: state.logInReducer.token,
    getCurrentOnClickMarkData: state.groupMarkReducer.getCurrentOnClickMarkData,
    newMarkAddedFlag: state.groupMarkReducer.newMarkAddedFlag,
    getActiveGroupData: state.groupReducer.getActiveGroupData,
    getGroupMarkData: state.groupMarkReducer.getGroupMarkData
    // initialValues: {
    //   locationAddress: state.groupMarkReducer.getGeocodingLocation
    // }
  };
};

// Redux Setter to use: this.props.(name of any return)
const mapDispatchToProps = dispatch => {
  return {
    updateGroupMark: data => dispatch(updateGroupMark(data)),
    reviewBottomWindow: bool => dispatch(reviewBottomWindow(bool)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    form: 'locationReviewFormRF',
    onSubmitSuccess: clearUpForm,
    enableReinitialize: true,
    validate
  })(LocationReviewForm)
);
