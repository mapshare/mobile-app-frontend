// Import Libraries
import { StyleSheet } from "react-native";
import sharedStyles from "../../util/sharedStyles";

// Componenets Style
const containerStyles = StyleSheet.create({
  container: {
    flex: 1
  },

  optionsContainer: {
    flex: 1,
    position: "absolute",
    alignSelf: "flex-end",
    justifyContent: "space-between",
    alignItems: "center",
    width: sharedStyles.wp("10%"),
    height: sharedStyles.hp("93%"),
    zIndex: 1
  },

  hamburgerMenu: {
    backgroundColor: "red",
    width: sharedStyles.wp("10%"),
    height: sharedStyles.hp("8%")
  },

  addLocation: {
    backgroundColor: "red",
    width: sharedStyles.wp("10%"),
    height: sharedStyles.hp("20%")
  },

  geolocation: {
    backgroundColor: "red",
    width: sharedStyles.wp("10%"),
    height: sharedStyles.hp("5%")
  }
});

const mapStyles = StyleSheet.create({
  container: {
    flex: 1
  }
});

const annotationStyles = StyleSheet.create({
  container: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 15
  },

  fill: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "blue",
    transform: [{ scale: 0.6 }]
  }
});

export { containerStyles, mapStyles, annotationStyles };
