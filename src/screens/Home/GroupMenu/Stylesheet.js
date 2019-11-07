// Import Libraries
import { StyleSheet } from 'react-native';
import { whileStatement } from '@babel/types';

// Componenets Style
export default StyleSheet.create({
    container: {
        zIndex: 1000,
        position: 'absolute',
        top: 20,
        left: 20,
    },
    GroupName: {
        color: "#FFF",
        backgroundColor: "rgba(190,190,190,0.8)",
    },
    menuButton: {
        color: "#FFF",
    },
    modalStyle: {
        backgroundColor: "rgba(110,110,110,0.9)",
        flex: 1,
        alignSelf:'stretch',
        position: "absolute",
        top: 0,
        left: 0,
        width:'100%',
        height:'100%',
    },
    closeButton: {
        zIndex: 1,
        position: 'absolute',
        top: 20,
        left: 20,
    },
    addGroup: {
        zIndex: 1,
        position: 'absolute',
        top: 20,
        right: 20,
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
    activeGroupIcon: {
        color: "#000",
        width: '60%'
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
    flatListColTwo: {
        width: '60%'
    },
    flatListColTwoSmall: {
        width: '50%',
    },
    flatListColThree: {
        width: '20%',
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
    flatListItem: {
        height: 55,
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
        paddingStart:20
    },
    editGroupOptions: {
        paddingStart:50
    },
});