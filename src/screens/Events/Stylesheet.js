// Import Libraries
import { StyleSheet } from 'react-native';

// Componenets Style
const styles = StyleSheet.create({
    container:{
      backgroundColor: "#DCDCDC",
    },
    eventList:{
      marginTop:20,
    },
    eventBox: {
      padding:10,
      marginTop:5,
      marginBottom:5,
      flexDirection: 'row',
    },
    eventDate:{
      flexDirection: 'column',
    },
    eventDay:{
      fontSize:50,
      color: "#0099FF",
      fontWeight: "600",
    },
    eventMonth:{
      fontSize:16,
      color: "#0099FF",
      fontWeight: "600",
    },
    eventContent: {
      flex:1,
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginLeft:10,
      backgroundColor: '#FFFFFF',
      padding:10,
      borderRadius:10
    },
    description:{
      fontSize:15,
      color: "#646464",
    },
    eventTime:{
      fontSize:18,
      color:"#151515",
    },
    eventName:{
      fontSize:18,
      color:"#151515",
    },
    userName:{
      fontSize:16,
      color:"#151515",
    },
    eventLocation:{
      fontSize:16,
      color:"#151515",
    },
    addButton: {
      textAlign:"right",
      fontSize: 20,
      //position: 'absolute',
      marginRight: 5,
      //top: 2,
    },
    modalWindow: {
    
      justifyContent:'center',
      marginTop: 20
    },
    modalText: {
      alignSelf: 'center',
      fontSize: 30,
      marginBottom:20
    },
    errorMessage: {
      color: "red"
    },
    inputBox: {
      backgroundColor: '#F5F5F5',
      paddingHorizontal: 10,
      marginLeft: 10,
      marginRight: 10,
      borderRadius: 10,
      marginBottom: 10,
    },
    center: {
      alignSelf: 'center',
    },
    Text: {
      fontSize:18,
      marginBottom:20
    },
    buttonContainer: {
      marginTop: 10,
      height: 45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
      width: 250,
      borderRadius: 30,
      backgroundColor: "#00BFFF",
    },
    logoutButton: {
      marginTop: 10,
      height: 45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
      width: 250,
      borderRadius: 30,
      backgroundColor: "#ff0000",
    },
    spinnerStyle: {
      paddingTop: 60
  },
  emptyEventText: {
    fontSize: 20,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginTop: 20
  },
  emptyEventIcon: {
    marginBottom: 900,
    alignSelf: 'center',
  }
  });

const eventModalWindow = StyleSheet.create({
    modalWindow: {
      
      justifyContent:'center',
      marginTop: 20
    },
    modalText: {
      alignSelf: 'center',
      fontSize: 25,
      marginBottom:10
    },
    inputBox: {
      backgroundColor: '#F5F5F5',
      paddingHorizontal: 10,
      marginLeft: 10,
      marginRight: 10,
      borderRadius: 10,
      marginBottom: 10,
    },
    errorMessage: {
      color: "red",
      marginLeft: 10
    },
    inputBox: {
      backgroundColor: '#F5F5F5',
      paddingHorizontal: 10,
      marginLeft: 10,
      marginRight: 10,
      borderRadius: 10,
      marginBottom: 10,
    },
    center: {
      alignSelf: 'center',
    },
    buttonContainer: {
      marginTop: 10,
      height: 45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
      width: 250,
      borderRadius: 30,
      backgroundColor: "#00BFFF",
    },
    cancelButton: {
      marginTop: 10,
      height: 45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
      width: 250,
      borderRadius: 30,
      backgroundColor: "#ff0000",
    },
    leaveButton: {
      marginTop: 10,
      height: 45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
      width: 250,
      borderRadius: 30,
      backgroundColor: "#ffab00",
    },
    joinButton: {
      marginTop: 10,
      height: 45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
      width: 250,
      borderRadius: 30,
      backgroundColor: "#00ff00",
    },
    editEventButtonContainer: {
      alignItems:'flex-end',
      marginRight: 20,
      marginBottom:10
    },
    Text: {
      fontSize:15
    },
    mText: {
      fontSize:13,
      marginLeft:10,
      marginTop: -5
    },
    memberList: {
      marginLeft:20,
      marginBottom: 5,
    },
    KickUserEvent: {
      color: "red",
      alignSelf:"flex-end",
      marginRight:20,
      marginTop: -25
    },
  })

  export { styles, eventModalWindow };