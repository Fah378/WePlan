import React, { useState, useContext, useEffect} from 'react';
import { View, StyleSheet, Modal, Text, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { CredentialsContext } from './../components/CredentialsContext';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
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
});

const Explore = () => {
  const [markerList, setMarkerList] = useState([
    {
      id: 1,
      latitude: 12.5697,
      longitude: 99.9627,
      title: 'หาดหัวหิน',
      description: 'Select this location',
    },
    {
      id: 2,
      latitude: 18.817038215363123,
      longitude: 98.89177267421128,
      title: 'ดอยสุเทพ',
      description: 'Select this location',
    },
    {
      id: 3,
      latitude: 15.61347988566265,
      longitude: 105.43428108974972,
      title: 'อุทยานแห่งชาติผาแต้ม',
      description: 'Select this location',
    },
    {
      id: 4,
      latitude: 13.76882404234513,
      longitude: 100.5328575571093,
      title: 'พระราชวังพญาไท',
      description: 'Select this location',
    },
    {
      id: 5,
      latitude: 7.371728536838803,
      longitude: 99.29866854921077,
      title: 'เกาะมุก',
      description: 'Select this location',
    },
  ]);

  // Calculate the initial region based on marker coordinates
  const initialRegion = {
    latitude: markerList.reduce((acc, curr) => acc + curr.latitude, 0) / markerList.length,
    longitude: markerList.reduce((acc, curr) => acc + curr.longitude, 0) / markerList.length,
    latitudeDelta: 10,
    longitudeDelta: 10,
  };

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const { storedCredentials } = useContext(CredentialsContext);

  useEffect(() => {
    // Set userID from storedCredentials when component mounts
    if (storedCredentials) {
      setUserID(storedCredentials._id);
    //   console.log('Stored Credentials:', storedCredentials);
    }
  }, [storedCredentials]);

  const [userID, setUserID] = useState(null);

    // Update the addToWishlist function to remove locationID from dataToSend
    const addToWishlist = async (location) => {
        setModalVisible(false); // Close the modal

        console.log('Stored Credential before call API:', storedCredentials);
        // Assuming storedCredentials has a property 'userID' for user ID
        const userID = storedCredentials._id;
        if (!userID) {
            Alert.alert('Error', 'User ID not found.');
            return;
        }

        // Prepare the data to be sent
        const dataToSend = {
            userID: storedCredentials._id,
            locationName: location.title,
            lat: location.latitude,
            lng: location.longitude
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

  return (
    <View style={styles.container}>
      <MapView provider={PROVIDER_GOOGLE} style={styles.map} initialRegion={initialRegion}>
        {markerList.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.title}
            description={marker.description}
            onPress={() => {
              setSelectedLocation(marker);
              setModalVisible(true);
            }}
          />
        ))}
      </MapView>

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