// Import Libraries
import { StyleSheet } from 'react-native';

// Componenets Style
export default StyleSheet.create({
    container: {
        zIndex: 1000,
        position: 'absolute',
        top: 20,
        left: 20,
    },
    menuButton: {
        color: "#FFF",
    },
    root: {
        flex: 1,
    },
    Body: {
        flex: 1,
    },
    InfoBody: {
        flex: 0.5,
    },
    image: {
        flex: 1,
    },
    Overlay: {
        backgroundColor: "rgba(30,26,26,0.4)",
        opacity: 1,
        flex: 1,
    },
    GroupName: {
        color: "rgba(255,255,255,1)",
        fontSize: 24,
        marginTop: 41,
        textAlign: "center",
    },
    button: {
        width: 105,
        height: 40,
        alignSelf: "center",
        backgroundColor: "rgba(255,255,255,1)",
        paddingVertical: 10,
        color: '#fff',
        textAlign: 'center',
        borderRadius: 5
    },
    text: {
        color: "rgba(31,178,204,1)",
        fontSize: 14,
        textAlign: "center"
    },
    Message: {
        color: "rgba(255,255,255,1)",
        fontSize: 16,
        marginTop: 22,
        alignSelf: "center"
    },
    groupFeed: {
        flex: 1,
    }
});