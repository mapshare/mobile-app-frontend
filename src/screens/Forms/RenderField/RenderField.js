import React, { Component } from 'react';
import { Text, View, TextInput } from 'react-native';
import { connect } from 'react-redux';

// Componenets Style
import { mainStyles } from './Stylesheet';

class RenderField extends Component {
  renderOnType = (input, type) => {
    const { ...inputProps } = this.props;

    switch (type) {
      case 'text':
        return (
          <TextInput
            style={mainStyles.textInputStyle}
            onChangeText={input.onChange}
            value={input.value}
            {...input.restInput}
            {...inputProps}
          />
        );
      case 'textarea':
        return (
          <TextInput
            style={mainStyles.textareaInputStyle}
            onChangeText={input.onChange}
            value={input.value}
            {...input.restInput}
            {...inputProps}
            textAlignVertical="top"
          />
        );
      case 'addCustomMark':
        return (
          <TextInput
            style={mainStyles.addCustomMarkStyle}
            onChangeText={input.onChange}
            value={input.value}
            {...input.restInput}
            {...inputProps}
          />
        );
      default:
        return <TextInput />;
    }
  };

  render() {
    const {
      meta: { touched, error }
    } = this.props;

    return (
      <View>
        {this.props.type !== 'addCustomMark' && <Text>{this.props.label}</Text>}
        {this.renderOnType(this.props.input, this.props.type)}
        {touched && error && <Text style={mainStyles.errorText}>{error}</Text>}
      </View>
    );
  }
}

export default RenderField;
