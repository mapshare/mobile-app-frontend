// Import Libraries
import { StyleSheet } from "react-native";
import { reponsiveStyle } from "../../../util/sharedStyles";

const mainStyles = StyleSheet.create({
  textInputStyle: {
    borderColor: "gray",
    borderWidth: 1,
    height: 40,
    padding: 10
  },

  textareaInputStyle: {
    borderColor: "gray",
    borderWidth: 1,
    height: 100,
    padding: 10
  },

  errorText: {
    color: "red"
  }
});

export { mainStyles };
