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
    addPostInputBox: {
        justifyContent: 'center',
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 10,
        top: 10,
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
    },body: {
        backgroundColor: "rgba(110,110,110,0.9)",
        flex: 1,
        alignSelf: 'stretch',
        position: "absolute",
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    cancelPost: {
        top: 20,
        left: 20,
        position: 'absolute',
    },
    cancelPostButton: {

    },
    cancelPostIcon: {
        color: "#F00",
    },
    CreatePost: {
        top: 20,
        right: 20,
        position: 'absolute',
    },
    CreatePostButton: {

    },
    CreatePostIcon: {
        color: "#0F0",
    },
    postImagePreview: {
        width: '20%',
        height: '20%',
    },
    previewImage: {
        backgroundColor: "rgba(0,0,0,0.9)",
        resizeMode: "cover" ,
        aspectRatio: 1.1, 
    },
    postCaptionForm:{
        width: '60%',
    },
    row: {
        flex: 1,
        flexDirection: "row",
        top:"20%",
        justifyContent: 'space-evenly',
        alignContent: 'space-around'
    },
    errorMessage: {
        color: "red"
    },
});
