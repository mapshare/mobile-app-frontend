// Import Libraries
import { StyleSheet } from 'react-native';
import { whileStatement } from '@babel/types';

// Componenets Style
export default StyleSheet.create({
    container: {
        zIndex: 1000,
        position: 'absolute',
        top: 0,
        right: 0,
    },
    cameraIcon: {
        color: "#FFF",
    },
    optionsIcon: {
        color: "#000",
        justifyContent: "center",
        alignSelf: "flex-end",
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
        padding:20,
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
    headerColOne: {
        flex: .20,
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    headerColTwo: {
        flex: .60,
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    headerColThree: {
        flex: .20,
        justifyContent: "flex-start",
        alignItems: "center",
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
    groupPostContainer: {

    },
    groupPost: {
        flex: 1,
        justifyContent: 'space-between',
    },
    postText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    groupPostHeader: {
        flex: 1,
        flexDirection: "row",
        height: 50,
        justifyContent: "flex-start",
        alignItems: "center",
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
    groupPostFooter: {
        flex: 1,
        justifyContent: "center",
        paddingStart: 20,
        paddingEnd: 20
    },
    flatListItemSeporator: {
        backgroundColor: '#808080',
        width: '100%',
        height: 1,
        alignSelf: 'center',
    },
    footerPartOne: {
        flex: .2,
    },
    footerPartTwo: {
        flex: .4,
    },
    footerPartThree: {
        flex: .4,
    },
    editGroupPost: {
        flex: 1,
        justifyContent: "flex-end",
    },
    editGroupPostPopup: {
        flex: .3,
        alignItems: "center",
        justifyContent: "flex-end",
        zIndex: 100000,
        backgroundColor: "rgba(50,50,50,.8)",
    },
    roundCorners: {
        borderRadius: 10
    },
    editGroupPopupRow: {
        flex: .4,
        alignSelf: "stretch",
        alignItems: "center",
        justifyContent: "center",
    },
    editGroupPopupText: {
        fontSize: 20,
        color: "#FFF",
    },
    optionsIconPadding:{
        padding:15
    }
});