import React, { useState, useContext, useRef } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StatusBar, View, Text, StyleSheet, Dimensions } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MarkerModal from '../components/MarkerModal';

import {
    StyledContainer,
    InnerContainer,
    PageTitleII,
    SubTitle,
    StyledFormArea,
    LeftIcon,
    StyledInputLabel,
    StyledTextInput,
    RightIcon,
    StyledButton,
    ButtonText,
    Colors,
    MsgBox,
    Line,
    ExtraText,
    ExtraView,
    TextLink,
    TextLinkContent,
    WelcomeContainer,
    PageTitle
} from '../components/styles';

// Import CredentialsContext to access stored credentials
import { CredentialsContext } from './../components/CredentialsContext';

//icons
import { Octicons, Ionicons } from '@expo/vector-icons';

//keyboard avoiding view
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

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
    const { tripDetails } = route.params; // Get trip details from navigation parameters
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

    return (
        <StyledContainer>
            <StatusBar style="dark" />
            <InnerContainer>
                <View style={styles.container}>
                    <View style={styles.searchContainer}>
                        <GooglePlacesAutocomplete
                            fetchDetails={true}
                            placeholder='Search'
                            onPress={(data, details = null) => {
                                console.log(JSON.stringify(details?.geometry?.location));
                                moveToLocation(
                                    details?.geometry?.location.lat,
                                    details?.geometry?.location.lng
                                );
                                setSelectedLocation(details?.geometry?.location);
                            }}
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
                        onConfirm={handleConfirmSelection}
                        onCancel={handleCancelSelection}
                    />
                </View>
            </InnerContainer>
        </StyledContainer>
    );
};

export default EditPlan;