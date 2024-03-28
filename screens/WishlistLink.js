import React, { useContext, useState, useEffect } from 'react';
import { StatusBar, FlatList, Text, TouchableOpacity, Modal, View, StyleSheet } from 'react-native';
import { InnerContainer, StyledFormArea, SubTitle, PageTitle } from '../components/styles';
import { useNavigation } from '@react-navigation/native';
import { CredentialsContext } from '../components/CredentialsContext';
import MarkerModal from '../components/MarkerModal';

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        elevation: 5,
    },
    modalText: {
        marginBottom: 20,
        fontSize: 16,
    },
    modalButtonContainer: {
        flexDirection: 'row',
    },
    modalButton: {
        marginHorizontal: 10,
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'black',
    },
});

const WishlistLink = () => {
    const navigation = useNavigation();
    const { storedCredentials } = useContext(CredentialsContext);
    const [wishlist, setWishlist] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                if (storedCredentials && storedCredentials._id) {
                    const response = await fetch(`http://172.20.10.3:3000/wishlist/see-wishlist/${storedCredentials._id}`);
                    const data = await response.json();
                    if (response.ok) {
                        setWishlist(data.wishlist);
                    } else {
                        console.error('Failed to fetch wishlist:', data.error);
                    }
                }
            } catch (error) {
                console.error('Error fetching wishlist:', error);
            }
        };

        fetchWishlist();
    }, [storedCredentials]);

    const handleLocationPress = (selectedLocation) => {
        setSelectedLocation(selectedLocation);
        setShowModal(true);
    };

    const handleAddToPlan = () => {
        // Here you can navigate to the InsertPlan screen with the selected location
        navigation.navigate('InsertPlan', { selectedLocation });
        setShowConfirmationModal(false);
    };

    const handleCancel = () => {
        setShowConfirmationModal(false);
    };

    return (
        <>
            <StatusBar style="dark" />
            <InnerContainer>
                <StyledFormArea>
                    <FlatList
                        data={wishlist}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => handleLocationPress(item)}>
                                <SubTitle>{item.locationName}</SubTitle>
                            </TouchableOpacity>
                        )}
                    />
                </StyledFormArea>
            </InnerContainer>
            <MarkerModal
                visible={showModal}
                animationType="slide"
                onConfirm={handleConfirmSelection}
                onCancel={handleCancelSelection}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Do you want to add this location to your plan?</Text>
                        <View style={styles.modalButtonContainer}>
                            <TouchableOpacity style={styles.modalButton} onPress={handleAddToPlan}>
                                <Text>Add to Plan</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButton} onPress={handleCancel}>
                                <Text>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </MarkerModal>
            {/* Render MarkerModal component */}
            <MarkerModal
                visible={showModal}
                onConfirm={handleConfirmSelection}
                onCancel={handleCancel}
            />
        </>
    );
};

export default WishlistLink;