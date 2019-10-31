// Import Libraries
import { StyleSheet } from 'react-native';

// Componenets Style
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