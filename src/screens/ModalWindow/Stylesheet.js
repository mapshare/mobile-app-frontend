// Import Libraries
import { StyleSheet } from "react-native";
import { reponsiveStyle, closeButtonStyle } from "../../util/sharedStyles";

// Componenets Style
const containerStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: reponsiveStyle.wp("100%"),
    height: reponsiveStyle.hp("100%"),
    position: "absolute",
    backgroundColor: "red",
    zIndex: 10
  },

  closeButtonContainer: {
    flex: 1,
    alignItems: "flex-end",
    padding: 10,
    width: reponsiveStyle.wp("100%")
  },

  contentContainer: {
    width: reponsiveStyle.wp("95%"),
    height: reponsiveStyle.hp("95%")
  }
});

export { containerStyles };
