import React, { useEffect, useState } from 'react';
import { StatusBar, 
    View, 
    Text, 
    StyleSheet, 
    Dimensions, 
    TouchableOpacity,
    Modal 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import {
    InnerContainer,
    PageTitleIII,
    SubTitle,
    Colors,
    TextLink,
    TextLinkContent,
    PageTitle
} from '../components/styles';

import { Octicons } from '@expo/vector-icons';

// Import CredentialsContext to access stored credentials
import { CredentialsContext } from './../components/CredentialsContext';

//keyboard avoiding view
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

//colors
const { brand, darklight, primary } = Colors;

const styles = StyleSheet.create({
    shareButton: {
        position: 'absolute',
        bottom: 40,
        right: 40,
    },
    circle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'white',
        position: 'absolute',
        bottom: -10,
        right: -10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        left: 0,
        width: 28, // Adjust width to match circle
        height: 30, // Adjust height to match circle
    },
});


const TripDetails = ({ route }) => {
    const { trip, planID } = route.params;
    const navigation = useNavigation();
    const [details, setDetails] = useState([]);
    const [showModal, setShowModal] = useState(false);

    // Define fetchDetails before using it
    const fetchDetails = async () => {
        try {
            const response = await axios.get(`http://172.20.10.3:3000/details/seedetails/${planID}`);
            setDetails(response.data.plansDetails);
        } catch (error) {
            console.error('Failed to fetch details', error);
        }
    };

    useEffect(() => {
        fetchDetails();
    }, [planID]);

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

     // Function to render plan details under a specific day
     const renderPlanDetails = (date) => {
        // Filter details that belong to the given date
        const filteredDetails = details.filter(detail => new Date(detail.date).toDateString() === date);
        return filteredDetails.map((detail, index) => (
            <View key={index} style={{ marginLeft: 15, marginTop: 5 }}>
                <Text style={{ color: '#000' }}>{detail.locationName}</Text>
            </View>
        ));
    };

    // Modify the navigateToInsertPlan function to accept a day parameter
    const navigateToInsertPlan = (day) => {
        navigation.navigate('InsertPlan', {
            trip,
            planID,
            selectedDate: day.date,
            refreshDetails: fetchDetails,
            onGoBack: () => fetchDetails() // This is the callback function
        });
    };    

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const handleShareConfirm = async () => {
        // Call the API to toggle the plan to public
        try {
            const response = await axios.put(`http://172.20.10.3:3000/plans/plans/${route.params.planID}/togglePublic`);
            console.log('Toggle public status response:', response.data);
    
            // Execute the callback function passed from props
            if (typeof props.onPlanMadePublic === 'function') {
                props.onPlanMadePublic(); // This function should update the plan details in Home screen
            }
    
            // Optionally, you can perform additional actions after successful API call
        } catch (error) {
            console.error('Error toggling public status:', error);
            // Handle error
        }
    
        // Close the modal
        setShowModal(false);
    };
    
    
    return (
        <KeyboardAvoidingWrapper>
            <View style={styles.container}>
                <StatusBar style="dark" />
                <InnerContainer style={{ flex: 1 }}>
                    <PageTitle style={{ marginTop: 20 }}>{trip.tripName}</PageTitle>
                    <SubTitle>{trip.startDate} - {trip.endDate}</SubTitle>
                    <SubTitle>
                        {`Duration: ${generateDayLabels(trip.startDate, trip.endDate).length - 1} days`}
                    </SubTitle>
                    <View style={{ alignItems: 'flex-start', width: '100%', flex: 1 }}>
                        {generateDayLabels(trip.startDate, trip.endDate).map((day, index) => (
                            <View key={index} style={{ marginVertical: 10 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <PageTitleIII>{day.day}</PageTitleIII>
                                    <Text style={{ marginLeft: 10 }}>{day.date}</Text>
                                </View>
                                {renderPlanDetails(day.date)}
                                <TextLink onPress={() => navigateToInsertPlan(day)} style={{ marginTop: 15 }}>
                                    <TextLinkContent style={{ marginLeft: 15 }}>+ Add new destination</TextLinkContent>
                                </TextLink>
                            </View>
                        ))}
                    </View>
                    <TouchableOpacity onPress={toggleModal} style={styles.shareButton}>
                        <View style={styles.circle} />
                        <View style={styles.iconContainer}>
                            <Octicons name="share" size={24} color="black" />
                        </View>
                    </TouchableOpacity>
                </InnerContainer>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showModal}
                    onRequestClose={() => setShowModal(false)}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                        <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10 }}>
                            <Text>Do you want to publish this plan?</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                                <TouchableOpacity onPress={handleShareConfirm}>
                                    <Text style={{ color: 'blue', marginRight: 10 }}>Yes</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={toggleModal}>
                                    <Text style={{ color: 'red' }}>No</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </KeyboardAvoidingWrapper>
    );    
};

export default TripDetails;