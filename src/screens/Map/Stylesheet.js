// Import Libraries
import { StyleSheet } from "react-native";
import { reponsiveStyle } from "../../util/sharedStyles";

// Componenets Style
/*
export default StyleSheet.create({
	container: {
		flex: 1
	},
	map: {
		height: 400,
		marginTop: 80
	},
	annotationContainer: {
		width: 30,
		height: 30,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'white',
		borderRadius: 15
	},
	annotationFill: {
		width: 30,
		height: 30,
		borderRadius: 15,
		backgroundColor: 'blue',
		transform: [{ scale: 0.6 }]
	},
	locationButton: {
		position: 'absolute',
		bottom:10,
		right:10,
	}
});
*/

const containerStyles = StyleSheet.create({
  container: {
    flex: 1
  },

  addMarkTrue: {
    borderWidth: 3,
    borderColor: "red",
    opacity: 0.7,
    zIndex: 2
  },

  optionsContainer: {
    flex: 1,
    position: "absolute",
    alignSelf: "flex-end",
    justifyContent: "space-between",
    alignItems: "center",
    width: reponsiveStyle.wp("10%"),
    height: reponsiveStyle.hp("93%")
  },

  hamburgerMenu: {
    backgroundColor: "red",
    width: reponsiveStyle.wp("10%"),
    height: reponsiveStyle.hp("8%"),
    zIndex: 1
  },

  addLocation: {
    backgroundColor: "red",
    width: reponsiveStyle.wp("10%"),
    height: reponsiveStyle.hp("20%"),
    zIndex: 1
  },

  geolocation: {
    backgroundColor: "red",
    width: reponsiveStyle.wp("10%"),
    height: reponsiveStyle.hp("5%"),
    zIndex: 1
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

const buttonStyles = StyleSheet.create({
  location: {
		position: 'absolute',
		bottom:10,
		right:10,
	}
});

export { containerStyles, mapStyles, annotationStyles, buttonStyles };


