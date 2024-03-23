import React, { useState, useContext, useRef } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StatusBar, View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MarkerModal from '../components/MarkerModal';
import { useNavigation } from '@react-navigation/native';

import {
    StyledContainer,
    InnerContainer,
    PageTitleIII,
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

const TripDetails = ({ route }) => {
    const { trip } = route.params; // Get trip details from navigation parameters
    const navigation = useNavigation();
    const mapRef = useRef(null);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleConfirmSelection = async () => {
        // Delay execution to ensure state update
        setTimeout(async () => {
            console.log("Selected location in confirm:", selectedLocation);
    
            // Prepare data for API request
            const requestData = {
                locationName: selectedLocation.name, // Use location name for locationName
                date: '2024-03-20T12:00:00Z',
                lat: selectedLocation.lat,
                lng: selectedLocation.lng,
                plansID: '65eac7cddbff381a8f1bf22f', // You need to provide plansID here
            };
    
            try {
                // Call the API endpoint to post data
                const response = await axios.post('http://172.20.10.3:3000/details/details', requestData);
                console.log('Response from API:', response.data);
    
                // Optionally update state or perform other actions upon successful post
            } catch (error) {
                console.error('Error posting data to API:', error);
                // Handle error
            }
    
            // Perform actions to pin the marker permanently
            setShowModal(false); // Close the modal
        }, 50); // Delay of 50 milliseconds 
    };    
    

    // Function to handle cancelling selection
    const handleCancelSelection = () => {
        setShowModal(false); // Close the modal
    };

    // Function to handle tapping on the marker
    const handleMarkerPress = () => {
        console.log("Selected location:", selectedLocation);
        setShowModal(true); // Show the modal
    };

    //Function to calculate date
    const generateDayLabels = (startDateStr, endDateStr) => {
        const startDate = new Date(startDateStr);
        const endDate = new Date(endDateStr);
        const timeDiff = endDate - startDate;
        const daysDiff = Math.round(timeDiff / (1000 * 3600 * 24));
        const dayLabels = [];
    
        for (let i = 1; i <= daysDiff + 1; i++) { // +1 to include the end day
            dayLabels.push(`Day ${i}`);
        }
    
        return dayLabels;
    };    

    return (
    <KeyboardAvoidingWrapper>
        <View style={styles.container}>
            <StatusBar style="dark" />
            <InnerContainer>
                <PageTitle style={{ marginTop: 20 }}>{trip.tripName}</PageTitle>
                <SubTitle>{trip.startDate} - {trip.endDate}</SubTitle>
                <SubTitle>
                    {`Duration: ${generateDayLabels(trip.startDate, trip.endDate).length - 1} days`}
                </SubTitle>
                <View style={{ alignItems: 'flex-start', width: '100%' }}>
                    {generateDayLabels(trip.startDate, trip.endDate).map((dayLabel, index) => (
                        <View key={index} style={{ marginVertical: 5 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <PageTitleIII>{dayLabel}</PageTitleIII>
                            </View>
                            <TextLink onPress={() => navigation.navigate('EditPlan', { trip: trip })}>
                                <TextLinkContent style={{ marginLeft: 15 }}>+ Add new destination</TextLinkContent>
                            </TextLink>
                        </View>
                    ))}
                </View>
            </InnerContainer>
        </View>
    </KeyboardAvoidingWrapper>
    );
};

export default TripDetails;