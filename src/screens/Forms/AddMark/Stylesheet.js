// Import Libraries
import { StyleSheet } from "react-native";
import { reponsiveStyle } from "../../../util/sharedStyles";

const containerStyles = StyleSheet.create({
  container: {
    padding: 20
  },

  buttonContainer: {
    marginVertical: 15
  },

  buttonText: {
    backgroundColor: "#2980b6",
    paddingVertical: 12,
    color: "#fff",
    textAlign: "center",
    fontWeight: "700"
  }
});

export { containerStyles };
