// Import Libraries
import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, Picker } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import { reduxForm, Field, reset } from 'redux-form';

//Redux actions
import { updateGroupMark } from '../../../actions/groupMarkAction';
import { deleteLocationModalWindow } from '../../../actions/modalWindowAction';

// Componenets Style
import { containerStyles } from './Stylesheet';

import validator from '../validate/validation_wrapper';
import RenderField from '../RenderField/RenderField';

// Creating Component
class EditGroupMark extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photo: null,
      empty: false
    };
  }

  componentDidMount() {
    // console.log(this.props.groupMarkReducer.getGroupMarkData.mark.markName)
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
      locationImageData: this.state.photo && this.state.photo.data,
      groupId: this.props.getActiveGroupData._id,
      token: this.props.token,
      markId: this.props.getGroupMarkData.mark._id
    };

    this.props.deleteLocationModalWindow({ status: false });
    this.props.updateGroupMark(formValues);
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
          <Text style={containerStyles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const validate = values => {
  const errors = {};

  errors.markName = validator('markName', values.markName);

  return errors;
};

const clearUpForm = (result, dispatch) => {
  dispatch(reset('editGroupMarkRF'));
};

// Redux Getter to use: this.props.(name of any return)
const mapStateToProps = state => {
  return {
    coordinates: state.groupMarkReducer.coordinates,
    getGroupMarkData: state.groupMarkReducer.getGroupMarkData,
    getActiveGroupData: state.groupReducer.getActiveGroupData,
    token: state.logInReducer.token,
    initialValues: {
      markName: state.groupMarkReducer.getGroupMarkData.mark.markName
    }
  };
};

// Redux Setter to use: this.props.(name of any return)
const mapDispatchToProps = dispatch => {
  return {
    deleteLocationModalWindow: data => (dispatch(deleteLocationModalWindow(data))),
    updateGroupMark: data => (dispatch(updateGroupMark(data)))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    form: 'editGroupMarkRF',
    onSubmitSuccess: clearUpForm,
    enableReinitialize: true,
    validate
  })(EditGroupMark)
);
