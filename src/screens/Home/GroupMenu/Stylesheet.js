// Import Libraries
import { StyleSheet } from 'react-native';
import { whileStatement } from '@babel/types';

// Componenets Style
export default StyleSheet.create({
    container: {
        zIndex: 1000,
        position: 'absolute',
    },
    GroupName: {
        color: "#FFF",
        backgroundColor: "rgba(190,190,190,0.8)",
    },
    menuButton: {
        color: "#FFF",
    },
    menuButtonPadding: {
        padding:20,
    },
    modalStyle: {
        backgroundColor: "rgba(110,110,110,0.9)",
        flex: 1,
        alignSelf: 'stretch',
        position: "absolute",
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    closeButton: {
        zIndex: 1,
        position: 'absolute',
        padding:20,
    },
    addGroup: {
        zIndex: 1,
        position: 'absolute',
        top: 0,
        right: 0,
        padding:20,
    },
    closeIcon: {
        color: "#FFF",
    },
    activeGroupColour: {
        color: "#000",
    },
    editGroupIcon: {
        paddingStart: 40,
        color: "#FFF",
    },
    editGroupIconPadding:{
        paddingVertical:25,
    },
    activeGroupIcon: {
        color: "#000",
    },
    acceptIcon: {
        color: "#0F0",
        width: '60%'
    },
    declineIcon: {
        color: "#F00",
        width: '60%'
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
        marginTop: 80,
    },
    addGroupText: {
        color: "rgba(255,255,255,1)",
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 41,
        textAlign: "center",
    },
    flatListItem: {
        height: 80,
        paddingTop: 10,
        paddingBottom: 10,
        flex: 1,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-evenly',
        alignContent: 'space-around'
    },
    flatListItemText: {
        color: "rgba(255,255,255,1)",
        fontSize: 24,
        fontWeight: 'bold',
    },
    flatListItemSeporator: {
        backgroundColor: '#D3D3D3',
        width: '95%',
        height: 1,
        alignSelf: 'center',
    },
    flatListItemButton: {
        backgroundColor: '#32CD32',
        paddingStart: 10,
        paddingEnd: 10,
        borderRadius: 10,
        alignSelf: 'center',
    },
    flatListItemButtonText: {
        color: "rgba(255,255,255,1)",
        fontSize: 24,
        fontWeight: 'bold',
    },
    textBox: {
        color: "rgba(255,255,255,1)",
        fontSize: 24,
        fontWeight: 'bold',
        padding: 10
    },
    textBoxSmall: {
        color: "rgba(255,255,255,1)",
        fontSize: 16,
        fontWeight: 'bold',
    },
    textBoxRoles: {
        color: "rgba(255,255,255,1)",
        fontSize: 16,
        fontWeight: 'bold',
        paddingStart: 20
    },
    editGroupOptions: {
        paddingStart: 50
    },
    groupRolePicker: {
        height: 55,
        paddingTop: 30,
        paddingBottom: 30,
        flex: 1,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-evenly',
        alignContent: 'space-around'
    },
    groupRolePickerItem: {
        height: 30,
        color: '#FFF',
    },
    editMemberOption: {
        height: 50,
        alignSelf: 'center',
        width: '60%',
        justifyContent: 'center',
    },
    pinBottom: {
        position: 'absolute',
        alignSelf: 'center',
        width: '100%',
        bottom: 20,
        zIndex: 1000
    },
    centerText: {
        width: '100%',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    SuccesModal: {
        backgroundColor: "rgba(50,50,50,.8)",
        position: 'absolute',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 10,
        width: '50%',
        bottom: 100
    }
});