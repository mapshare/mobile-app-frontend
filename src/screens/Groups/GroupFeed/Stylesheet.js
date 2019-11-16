// Import Libraries
import { StyleSheet } from 'react-native';
import { whileStatement } from '@babel/types';

// Componenets Style
export default StyleSheet.create({
    container: {
        zIndex: 1000,
        position: 'absolute',
        top: 20,
        right: 20,
    },
    cameraIcon: {
        color: "#FFF",
    },
    body: {
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
        resizeMode: "cover",
        aspectRatio: 1.1,
    },
    postCaptionForm: {
        width: '60%',
    },
    flatListColOne: {
        width: '10%'
    },
    flatListColOneWide: {
        width: '30%',
    },
    flatListColOneWideTwo: {
        width: '20%',
    },
    flatListColTwo: {
        width: '60%'
    },
    flatListColTwoSmall: {
        width: '50%',
    },
    flatListColThree: {
        width: '20%',
    },
    flatListColThreeWide: {
        width: '30%',
    },
    flatListColFour: {
        width: '20%',
    },
    content: {
        zIndex: 1,
        marginTop: 50,
    },
    addGroupText: {
        color: "rgba(255,255,255,1)",
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 41,
        textAlign: "center",
    },
    row: {
        flex: 1,
        flexDirection: "row",
        top: "20%",
        justifyContent: 'space-evenly',
        alignContent: 'space-around'
    },
    groupPostContainer: {

    },
    groupPost: {
        flex: 1,
        justifyContent: 'space-between',
    },
    postText:{
        fontSize: 16,
        fontWeight: 'bold',
    },
    groupPostHeader: {
        flex: 1,
        width: '100%',
        height: 50,
        justifyContent:"center",
        paddingStart: 20
    },
    groupPostBody: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    groupPostImage: {
        backgroundColor: "rgba(0,0,0,0.9)",
        resizeMode: "cover",
        aspectRatio: 1.5,
    },
    groupPostFooter:{
        flex: 1,
        justifyContent:"center",
        paddingStart: 20,
        paddingEnd: 20
    },
    flatListItemSeporator: {
        backgroundColor: '#808080',
        width: '100%',
        height: 1,
        alignSelf: 'center',
    },
    footerPartOne:{
        height: 20,
    },
    footerPartTwo:{
        height: 40,
    },
    footerPartThree:{
        height: 40,
    }
});