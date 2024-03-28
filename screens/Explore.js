import React, { useState, useEffect, useContext } from 'react';
import { View, ScrollView, StyleSheet, Text, Modal, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { CredentialsContext } from './../components/CredentialsContext';
import { Octicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Explore = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [places, setPlaces] = useState([]);
  const { storedCredentials } = useContext(CredentialsContext);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [userID, setUserID] = useState(null);
  const navigation = useNavigation();
  const [markerList, setMarkerList] = useState(null);

  // Function to fetch highest reviewed places for a category
  const fetchPlacesByCategory = async (category) => {
    try {
      const categoryMappings = {
        'Tourist attractions': 'tourist attractions in Thailand',
        'Beaches': 'beaches in Thailand',
        'Museums': 'museums in Thailand',
        'Cafes': 'cafes in Thailand',
        'Restaurants': 'restaurants in Thailand',
        'Bars': 'bars in Thailand'
        // Add more categories and their corresponding search queries as needed
      };
  
      const query = categoryMappings[category];
      if (!query) {
        console.error('Invalid category:', category);
        return;
      }
  
      const apiKey = "AIzaSyCHHe34HTyyK0Mw6_cPdOUilkHOb9NRK6s"; // Replace "YOUR_API_KEY" with your actual API key
  
      const response = await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${apiKey}`);
      if (!response.ok) {
        throw new Error("Failed to fetch places");
      }
      const data = await response.json();
      console.log("Response:", data);
      const sortedPlaces = data.results.sort((a, b) => b.user_ratings_total - a.user_ratings_total);
      const top20Places = sortedPlaces.slice(0, 20);
      console.log("Top 20 Places:", top20Places);
      setPlaces(top20Places);
      setSelectedCategory(category);
    } catch (error) {
      console.error("Error fetching places:", error);
      // Handle error
    }
  };  

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      position: 'relative',
    },
    scrollView: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1,
    },
    categoryWrapper: {
      backgroundColor: 'white',
      paddingHorizontal: 10,
      paddingVertical: 5,
      marginRight: 10,
      borderRadius: 5,
    },
    category: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 0,
    },
    categoryList: {
      flexDirection: 'row',
      paddingVertical: 10,
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      marginHorizontal: 10,
    },
    buttonClose: {
      backgroundColor: 'red',
    },
    buttonConfirm: {
      backgroundColor: 'green',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
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

  useEffect(() => {
    // Set userID from storedCredentials when component mounts
    if (storedCredentials) {
      setUserID(storedCredentials._id);
    //   console.log('Stored Credentials:', storedCredentials);
    }
  }, [storedCredentials]);

  const addToWishlist = async (location) => {
    setModalVisible(false); // Close the modal

    if (!selectedLocation) {
      Alert.alert('Error', 'No location selected.');
      return;
    }

    console.log('Stored Credential before call API:', storedCredentials);

    // Assuming storedCredentials has a property 'userID' for user ID
    const userID = storedCredentials._id;
    if (!userID) {
      Alert.alert('Error', 'User ID not found.');
      return;
    }

    // Extract the necessary data from selectedLocation
    const dataToSend = {
      userID: userID,
      locationName: selectedLocation.name,
      place_id: selectedLocation.place_id
    };
    console.log('Data to send:', dataToSend);

    try {
      const response = await fetch('http://172.20.10.3:3000/wishlist/wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      const responseData = await response.json(); // Parse response body
      console.log('Response:', responseData); // Log response data

      if (response.ok) {
        Alert.alert('Success', 'Location added to wishlist!');
      } else {
        Alert.alert('Error', 'Could not add to wishlist. Please try again.');
      }
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'An error occurred. Please try again.');
      }
  };

  // Function to navigate to Wishlist screen
const navigateToWishlist = () => {
  navigation.navigate('Wishlist'); // Navigate to Wishlist screen
};

  return (
    <View style={styles.container}>
      {/* Horizontal scrollable list of categories */}
      <ScrollView horizontal contentContainerStyle={styles.categoryList} style={styles.scrollView}>
        <View style={styles.categoryWrapper}>
          <Text style={styles.category} onPress={() => fetchPlacesByCategory('Tourist attractions')}>Tourist attractions</Text>
        </View>
        <View style={styles.categoryWrapper}>
          <Text style={styles.category} onPress={() => fetchPlacesByCategory('Beaches')}>Beaches</Text>
        </View>
        <View style={styles.categoryWrapper}>
          <Text style={styles.category} onPress={() => fetchPlacesByCategory('Museums')}>Museums</Text>
        </View>
        <View style={styles.categoryWrapper}>
          <Text style={styles.category} onPress={() => fetchPlacesByCategory('Cafes')}>Cafes</Text>
        </View>
        <View style={styles.categoryWrapper}>
          <Text style={styles.category} onPress={() => fetchPlacesByCategory('Restaurants')}>Restaurants</Text>
        </View>
        <View style={styles.categoryWrapper}>
          <Text style={styles.category} onPress={() => fetchPlacesByCategory('Bars')}>Bars</Text>
        </View>
      </ScrollView>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 13.7563,
          longitude: 100.5018,
          latitudeDelta: 10,
          longitudeDelta: 10,
        }}
      >
        {places.map(place => (
          <Marker
            key={place.id}
            coordinate={{
              latitude: place.geometry.location.lat,
              longitude: place.geometry.location.lng
            }}
            title={place.name}
            description={`Rating: ${place.rating}`}
            onPress={() => {
              setSelectedLocation(place); // Set the selected location to this place
              setModalVisible(true);
            }}
          />
        ))}
      </MapView>
      <TouchableOpacity style={styles.shareButton} onPress={navigateToWishlist}>
      <View style={styles.circle} />
      <View style={styles.iconContainer} >
          <Octicons name="bookmark" size={24} color="black" />
      </View>
      </TouchableOpacity>
      <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => {
        setModalVisible(!isModalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Do you want to add this location to your wishlist?</Text>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={[styles.button, styles.buttonConfirm]}
              onPress={() => addToWishlist(selectedLocation)}
            >
              <Text style={styles.textStyle}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!isModalVisible)}
            >
              <Text style={styles.textStyle}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
    </View>
  );
};

export default Explore;