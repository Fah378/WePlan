import React from 'react';
import { StatusBar, View, Text, StyleSheet, Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {
    InnerContainer,
    PageTitleIII,
    SubTitle,
    Colors,
    TextLink,
    TextLinkContent,
    PageTitle
} from '../components/styles';

// Import CredentialsContext to access stored credentials
import { CredentialsContext } from './../components/CredentialsContext';

//keyboard avoiding view
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

//colors
const { brand, darklight, primary } = Colors;

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
    const { trip, planID } = route.params;
    const navigation = useNavigation();

    //Function to calculate date
    const generateDayLabels = (startDateStr, endDateStr) => {
        const startDate = new Date(startDateStr);
        let currentDate = new Date(startDate);
        const endDate = new Date(endDateStr);
        const timeDiff = endDate - startDate;
        const daysDiff = Math.round(timeDiff / (1000 * 3600 * 24));
        const dayLabels = [];
        
        for (let i = 1; i <= daysDiff + 1; i++) { // +1 to include the end day
            const dateString = currentDate.toDateString(); // Get the date string
            dayLabels.push({ day: `Day ${i}`, date: dateString }); // Push both day label and date into the array
            currentDate.setDate(currentDate.getDate() + 1); // Increment the date by one day
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
                    {generateDayLabels(trip.startDate, trip.endDate).map((day, index) => (
                        <View key={index} style={{ marginVertical: 5 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <PageTitleIII>{day.day}</PageTitleIII>
                                <Text style={{ marginLeft: 10 }}>{day.date}</Text>
                            </View>
                            <TextLink onPress={() => navigation.navigate('InsertPlan', { trip, selectedDate: day.date, planID })}>
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