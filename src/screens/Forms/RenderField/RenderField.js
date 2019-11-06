import React from "react";
import { Text, View, TextInput } from "react-native";

// Componenets Style
import { mainStyles } from "./Stylesheet";

const renderOnType = (input, type) => {
  switch (type) {
    case "text":
      return (
        <TextInput
          style={mainStyles.textInputStyle}
          onChangeText={input.onChange}
          {...input.restInput}
        />
      );
    case "select":
      return (
        <TextInput
          style={mainStyles.textInputStyle}
          onChangeText={input.onChange}
          {...input.restInput}
        />
      );
    case "textarea":
      return (
        <TextInput
          style={mainStyles.textareaInputStyle}
          multiline={true}
          numberOfLines={4}
          onChangeText={input.onChange}
          {...input.restInput}
        />
      );
    case "image":
      return (
        <TextInput
          style={mainStyles.textInputStyle}
          onChangeText={input.onChange}
          {...input.restInput}
        />
      );
    default:
      return <TextInput />;
  }
};

const RenderField = ({ input, label, type, meta: { touched, error } }) => (
  <View>
    <Text>{label}</Text>
    {renderOnType(input, type)}
    {touched && (error && <Text style={mainStyles.errorText}>{error}</Text>)}
  </View>
);

export { RenderField, renderOnType };
