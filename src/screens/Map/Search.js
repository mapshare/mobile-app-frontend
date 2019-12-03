import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { View, Button } from "react-native";
import { mapStyles } from "./Stylesheet";
import { SEARCH } from 'react-native-dotenv';

class MSearch extends React.Component {

    render() {
        console.log(SEARCH)
        return (
            
            <View style={mapStyles.searchBar}>
                <GooglePlacesAutocomplete
                ref={c => this.googlePlacesAutocomplete = c}
                placeholder='Search'
                enablePoweredByContainer={false}
                minLength={2} // minimum length of text to search
                autoFocus={false}
                returnKeyType={'search'} // Can be left out for default return key 
                listViewDisplayed='auto'    // true/false/undefined
                fetchDetails={true}
                onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                    this.props.notifyChange(details);
                    //console.log(details.formatted_address)
                    this.googlePlacesAutocomplete._handleChangeText('') // use _handleChangeText to set the text that you want
                }

                }
                styles={{
                    container:{
                        //backgroundColor: 'rgba(255,255,255,255)',
                        
                    },
                    textInputContainer: {
                      backgroundColor: 'rgba(0,0,0,0)',
                      borderColor: 'rgba(255,255,255,255)',
                      borderTopWidth: 0,
                      borderBottomWidth:0
                    },
                    textInput: {
                      marginLeft: 0,
                      marginRight: 0,
                      height: 38,
                      color: '#5d5d5d',
                      fontSize: 18
                    },
                    listView: {
                        //position: 'absolute',
                        top: 10,
                        left: 1,
                        right: 8,
                        backgroundColor: 'white',
                        borderRadius: 5,
                        flex: 1,
                        elevation: 3,
                      },
                    predefinedPlacesDescription: {
                      color: '#1faadb'
                    },
                  }}
                query={{
                    key: SEARCH,
                    language: 'en'
                }}

                nearbyPlacesAPI='GooglePlacesSearch'
                debounce={300}
                />
            </View>   
        )
    }
}

export default MSearch