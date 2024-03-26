import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const Explore = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [places, setPlaces] = useState([]);

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
      setPlaces(data.results);
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
  });

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
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
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
          />
        ))}
      </MapView>
    </View>
  );
};

export default Explore;