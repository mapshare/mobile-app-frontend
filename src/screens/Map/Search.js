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
                    this.props.notifyChange(details.geometry.location);
                    console.log(details)
                    this.googlePlacesAutocomplete._handleChangeText('') // use _handleChangeText to set the text that you want
                }
                }
            
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