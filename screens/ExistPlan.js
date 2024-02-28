import React, { useState, useEffect } from 'react';
import { StatusBar, View, Text } from 'react-native';
import {
    InnerContainerII,
    PageTitleII,
    SubTitle,
    StyledContainer,
    Line
} from './../components/styles';

const ExistPlan = () => {
    const [tripDetails, setTripDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await fetch('http://172.20.10.3:3000/plans/plans/65afcaea2532cc4d3c6bfb6a');
                if (!response.ok) {
                    throw new Error('Failed to fetch plans');
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

    return (
        <StyledContainer>
            <StatusBar style="dark" />
            <PageTitleII >List of exist plans</PageTitleII>
            <InnerContainerII>
                {loading && <Text>Loading...</Text>}
                {error && <Text>{error}</Text>}
                {tripDetails.map((trip, index) => (
                    <View key={index}>
                        <Line />
                        <SubTitle>Trip Name: {trip.tripName}</SubTitle>
                        <SubTitle>Start Date: {trip.startDate}</SubTitle>
                        <SubTitle>End Date: {trip.endDate}</SubTitle>
                        <SubTitle>Province: {trip.province}</SubTitle>
                        <SubTitle>Category: {trip.category}</SubTitle>
                        <Line />
                        <Line />
                    </View>
                ))}
            </InnerContainerII>
        </StyledContainer>
    );
};

export default ExistPlan;