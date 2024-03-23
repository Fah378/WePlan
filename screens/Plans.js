import React, { useState, useEffect, useContext} from 'react';
import { StatusBar, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
    InnerContainer,
    StyledButton,
    ButtonText,
    TripPanel,
    TripPanelText,
    SubTitle,
    StyledContainerII
} from '../components/styles'; // Import StyledButton and ButtonText

// Import CredentialsContext to access stored credentials
import { CredentialsContext } from '../components/CredentialsContext';

//keyboard avoiding view
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

const Plans = () => {
    const { storedCredentials } = useContext(CredentialsContext);
    const [tripDetails, setTripDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await fetch(`http://172.20.10.3:3000/plans/plans/${storedCredentials._id}`, {});
    
                if (!response.ok) {
                    throw new Error(`Failed to fetch plans: ${response.status} ${response.statusText}`);
                }
    
                const data = await response.json();
                // Format dates to display only the date part
                const formattedTripDetails = data.tripDetails.map(trip => ({
                    ...trip,
                    startDate: formatDate(trip.startDate),
                    endDate: formatDate(trip.endDate),
                }));
                setTripDetails(formattedTripDetails);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching plans:', error);
                setError('Failed to fetch plans. Please try again later.');
                setLoading(false);
            }
        };
    
        fetchPlans();
    }, []);

    // Function to format date to display only the date part
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0]; // Extracts only the date part
    };

    // Function to navigate to TripDetails screen with trip details
    const navigateToTripDetails = (trip) => {
        navigation.navigate('TripDetails', { trip: trip });
    };

    // Function to navigate to Create screen
    const navigateToCreate = () => {
        navigation.navigate('Create');
    };

    return (
        <KeyboardAvoidingWrapper>
            <StyledContainerII>
                <StatusBar style="dark" />
                <TouchableOpacity onPress={navigateToCreate}>
                    <StyledButton onPress={() => 
                    { navigation.navigate('Create')} } 
                    style={{ marginTop: 30 }
                    }>
                        <ButtonText>Create New Plan</ButtonText>
                    </StyledButton>
                </TouchableOpacity>
                <InnerContainer>
                    {loading && <Text>Loading...</Text>}
                    {error && <Text>{error}</Text>}
                    {tripDetails.map((trip, index) => (
                        <TripPanel key={index} onPress={() => navigateToTripDetails(trip)}>
                            <TripPanelText>
                                <Text> 
                                    <SubTitle>{trip.tripName}</SubTitle>
                                </Text>
                                <Text>{'\n'}</Text>
                                <Text>
                                    <SubTitle>{trip.startDate} - {trip.endDate}</SubTitle>
                                </Text>
                            </TripPanelText>
                        </TripPanel>                
                    ))}
                </InnerContainer>
            </StyledContainerII>
        </KeyboardAvoidingWrapper>
    );
};

export default Plans;