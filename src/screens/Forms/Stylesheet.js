// Import Libraries
import { StyleSheet } from 'react-native';

// Componenets Style
export default StyleSheet.create({
    container: {
        padding: 20,
    },
    inputBox: {
        height: 40,
        backgroundColor: 'rgba(225,225,225,0.2)',
        marginBottom: 10,
        padding: 10,
        color: '#000'
    },
    buttonContainer: {
        backgroundColor: '#2980b6',
        paddingVertical: 15
    },
    buttonText: {
        backgroundColor: '#2980b6',
        paddingVertical: 12,
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    },
    Text: {
        textAlign: 'center'
    },
    searchBox: {
        justifyContent: 'center',
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 10,
        borderRadius: 10
    },
    searchBoxItem: {
        flexDirection: "row",
        alignContent: 'stretch',
        alignItems: 'center',
    },
    searchIcon: {
        color: '#B8B8B8',
    },
    addGroupInputBox: {
        justifyContent: 'center',
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 10,
        borderRadius: 10,
        marginBottom:10,
    },
    SuccesModal: {
        backgroundColor: "rgba(50,50,50,.8)",
        position: 'absolute',
        alignItems:'center',
        alignSelf: 'center',
        borderRadius:10,
        width: '50%',
        bottom: 100
    },
    textBox: {
        color: "rgba(255,255,255,1)",
        fontSize: 24,
        fontWeight: 'bold',
        padding: 10
    },
});
