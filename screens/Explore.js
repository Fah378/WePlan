import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

const Explore = () => {
    const [markerList, setMarkerList] = useState([
        {
            id: 1,
            latitude: 12.5697,
            longitude: 99.9627,
            title: 'หาดหัวหิน',
            description: 'See more this location'
        },
        {
            id: 2,
            latitude: 18.817038215363123,
            longitude: 98.89177267421128,
            title: 'ดอยสุเทพ',
            description: 'See more this location'
        },
        {
            id: 3,
            latitude: 15.61347988566265,
            longitude: 105.43428108974972,
            title: 'อุทยานแห่งชาติผาแต้ม',
            description: 'See more this location'
        },
        {
            id: 4,
            latitude: 13.76882404234513,
            longitude: 100.5328575571093,
            title: 'พระราชวังพญาไท',
            description: 'See more this location'
        },
        {
            id: 5,
            latitude: 7.371728536838803,
            longitude: 99.29866854921077,
            title: 'เกาะมุก',
            description: 'See more this location'
        }
    ]);

    // Calculate the initial region based on marker coordinates
    const initialRegion = {
        latitude: markerList.reduce((acc, curr) => acc + curr.latitude, 0) / markerList.length,
        longitude: markerList.reduce((acc, curr) => acc + curr.longitude, 0) / markerList.length,
        latitudeDelta: 10,
        longitudeDelta: 10,
    };

    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={initialRegion} // Set initial region here
            >
                {markerList.map(marker => (
                    <Marker
                        key={marker.id}
                        coordinate={{
                            latitude: marker.latitude,
                            longitude: marker.longitude
                        }}
                        title={marker.title}
                        description={marker.description}
                    />
                ))}
            </MapView>
        </View>
    );
};

export default Explore;