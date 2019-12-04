// Import Libraries
import { StyleSheet } from 'react-native';

// Componenets Style

export default StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    backgroundColor: "#00BFFF",
    height: 200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130,
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: '600',
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600"
  },
  info: {
    fontSize: 16,
    color: "#00BFFF",
    marginTop: 10
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: 'center'
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
  testerMode: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#FFBF00",
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
  image: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf:'center'
  },
});