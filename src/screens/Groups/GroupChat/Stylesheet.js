// Import Libraries
import { StyleSheet } from 'react-native';

// Componenets Style
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    paddingHorizontal: 17,
    zIndex: -1,
  },
  btnSend: {
    backgroundColor: "#00BFFF",
    width: 40,
    height: 40,
    borderRadius: 360,
    alignItems: 'center',
    justifyContent: 'center',
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
  iconSend: {
    width: 30,
    height: 30,
    alignSelf: 'center',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  inputs: {
    height: 40,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  balloon: {
    maxWidth: 250,
    minWidth: 50,
    paddingHorizontal: 2,
    paddingVertical: 5,
  },
  itemIn: {
    alignSelf: 'flex-start'
  },
  itemOut: {
    alignSelf: 'flex-end'
  },
  time: {
    alignSelf: 'flex-end',
    fontSize: 12,
    color: "#808080",
  },
  item: {
    marginVertical: 14,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: "#eeeeee",
    borderRadius: 10,
    padding: 5,
  },
  ActiveMemberMenuBtnStyle: {
    alignSelf: "flex-start",
    top: 0,
    left: 0,
    padding: 20,
    flex: 1,
    zIndex:2000
  },
  ActiveMemberMenuIconStyle: {
    color: "#000",
  },
  activeMemberRow: {
    height: 80,
    paddingTop: 10,
    paddingBottom: 10,
    flex: 1,
    flexDirection: "row",
    paddingStart: 20
  },
  flatList: {
  },
  textBox: {
    color: "rgba(255,255,255,1)",
    fontSize: 24,
    fontWeight: 'bold',
    padding: 10,
    paddingStart: 20
  },
  flatListItemSeporator: {
    backgroundColor: '#D3D3D3',
    width: '95%',
    height: 1,
    alignSelf: 'center',
  },
  closeIcon: {
    color: "#FFF",
  },
  closeButton: {
    zIndex: 1,
    padding: 20,
    alignSelf: "flex-start"
  },
  TopBar: {
    flex: .14,
    backgroundColor: '#eeeeee',
    flexDirection: "row",
  },
  TopBarTitle: {
    flex: 1,
    color: "#000",
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    position:"absolute",
    textAlign:"center",
    width:"100%"
  },
  chatArea: {
    flex: .85,
    backgroundColor:"#ddd"
  },
  footer: {
    flex: .1,
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#ddd',
    paddingHorizontal: 10,
    padding: 5,
    backgroundColor:"#ddd",
  },

});  