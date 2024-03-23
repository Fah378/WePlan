import React, { useState, useContext, useRef } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StatusBar, View, Text, StyleSheet, Dimensions } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MarkerModal from '../components/MarkerModal';

import {
    StyledContainer,
    InnerContainer,
    Colors
} from '../components/styles';

//colors
const { brand, darklight, primary } = Colors;

//API client
import axios from 'axios';

//async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GOOGLE_MAPS_API_KEY } from '../config/constants/TripDetails';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start', // Align components at the start of the container
        alignItems: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        flex: 1, // Let the map container flex to occupy remaining space
        zIndex: 0
    },
    searchContainer: {
        position: 'absolute',
        top: 10, // Adjust top positioning as needed
        left: 10, // Adjust left positioning as needed
        width: '90%', // Adjust width as needed
        zIndex: 1, // Set a higher z-index than the map
        backgroundColor: 'transparent', // Set background color to transparent
        padding: 5, // Add padding for spacing
    },
});

const EditPlan = ({ route }) => {
    console.log('Route params:', route.params);
    const { trip } = route.params;
    const mapRef = useRef(null);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // Function to handle confirming selection and pinning the marker
    const handleConfirmSelection = () => {
        // Perform actions to pin the marker permanently
        setShowModal(false); // Close the modal
    };

    // Function to handle cancelling selection
    const handleCancelSelection = () => {
        setShowModal(false); // Close the modal
    };

    // Function to handle tapping on the marker
    const handleMarkerPress = () => {
        setShowModal(true); // Show the modal
    };

    // Function to move to a specific location on the map
    async function moveToLocation(latitude, longitude) {
        mapRef.current.animateToRegion(
            {
                latitude,
                longitude,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
            },
            2000,
        );
    }

    const handlePress = (data, details = null) => {
        if (details && details.geometry && details.geometry.location) {
            console.log("Selected location details:", {
                name: details.name,
                lat_lng: `${details.geometry.location.lat},${details.geometry.location.lng}`
            });
    
            setSelectedLocation({
                name: details.name,
                lat: details.geometry.location.lat,
                lng: details.geometry.location.lng,
            });
    
            moveToLocation(details.geometry.location.lat, details.geometry.location.lng);
        } else {
            console.error('Selected location is undefined or null.');
        }
    };      

    return (
        <StyledContainer>
            <StatusBar style="dark" />
            <InnerContainer>
            <View style={styles.container}>
                <View style={styles.searchContainer}>
                <GooglePlacesAutocomplete
                    fetchDetails={true}
                    placeholder='Search'
                    onPress={handlePress}
                    query={{
                        key: GOOGLE_MAPS_API_KEY,
                        language: 'en',
                    }}
                    onFail={error => console.log(error)}
                />
                </View>
                <MapView
                    ref={mapRef}
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    region={{
                        latitude: 13.7563,
                        longitude: 100.5018,
                        latitudeDelta: 5,
                        longitudeDelta: 5,
                    }}
                >
                {selectedLocation && (
                    <Marker
                        coordinate={{
                            latitude: selectedLocation.lat,
                            longitude: selectedLocation.lng,
                        }}
                        title="Selected Location"
                        description="This is the selected location"
                        onPress={handleMarkerPress} // Handle tap on the marker
                    />                        
                )}
                </MapView>
                <MarkerModal
                    visible={showModal}
                    onConfirm={() => handleConfirmSelection(selectedLocation)}
                    onCancel={handleCancelSelection}
                />
            </View>
            </InnerContainer>
        </StyledContainer>
    );
};

export default EditPlan;