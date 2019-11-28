import React from 'react';
import { Text, View, TextInput } from 'react-native';

// Componenets Style
import { mainStyles } from './Stylesheet';

const renderOnType = (input, type, props) => {
  const { ...inputProps } = props;
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

const RenderField = ({ input, label, type, meta: { touched, error } }) => (
  <View>
    {type !== 'addCustomMark' && <Text>{label}</Text>}
    {renderOnType(input, type)}
    {touched && error && <Text style={mainStyles.errorText}>{error}</Text>}
  </View>
);

export { RenderField, renderOnType };
