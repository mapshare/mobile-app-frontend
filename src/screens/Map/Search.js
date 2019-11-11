import React from 'react'
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete'
import { View, Button } from "react-native";
import { mapStyles } from "./Stylesheet";

class MSearch extends React.Component {

    render() {

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
                    this.googlePlacesAutocomplete._handleChangeText('') // use _handleChangeText to set the text that you want
                }
                }
                
                query={{
                    key: 'AIzaSyA90q5qhly6LCK4saJ8jBFrMP-z4Ekgk-8',
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