import React, { Component } from 'react';
import { Text, View, TextInput } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

// Componenets Style
import { mainStyles } from './Stylesheet';

class RenderField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      priceRange: null,
      category: null
    };

    this.pickerItems = [];
  }

  renderOnType = (input, type) => {
    const { ...inputProps } = this.props;
    const {
      input: { onChange, value }
    } = this.props;

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
      case 'priceRange':
        return (
          <View style={mainStyles.pickerContainer}>
            <RNPickerSelect
              onValueChange={value => {
                this.setState({ priceRange: value });
                onChange(value);
              }}
              items={this.props.items}
              placeholder={{
                label: 'Select a priceRange...',
                value: null,
                color: '#9EA0A4'
              }}
              style={mainStyles}
              value={input.vale}
            />
          </View>
        );
      case 'category':
        this.props.items.map((data, index) => {
          if (data.defaultCategoryName) {
            const value = { defaultMarkCategory: data._id };
            this.pickerItems.push({
              label: data.defaultCategoryName,
              value: value
            });
          } else if (data.customMarkCategoryName) {
            const value = { customMarkCategory: data._id };
            this.pickerItems.push({
              label: data.customMarkCategoryName,
              value: value
            });
          }
        });

        return (
          <View style={mainStyles.pickerContainer}>
            <RNPickerSelect
              onValueChange={value => {
                this.setState({ category: value });
                onChange(value);
              }}
              items={this.pickerItems}
              placeholder={{
                label: 'Select a category...',
                value: null,
                color: '#9EA0A4'
              }}
              style={mainStyles}
              value={this.state.category}
            />
          </View>
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
