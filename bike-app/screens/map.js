import React from 'react';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import { StyleSheet, View, Image } from 'react-native';

export default function Map() {

    const mapJson = [
        {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
            {
            "visibility": "off"
            }
        ]
        },
        {
        "featureType": "poi",
        "stylers": [
            {
            "visibility": "off"
            }
        ]
        },
        {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
            {
            "visibility": "off"
            }
        ]
        },
        {
        "featureType": "transit",
        "stylers": [
            {
            "visibility": "off"
            }
        ]
        }
    ];

    const markerList = [
        {
        title: "bike1",
        location: {
            latitude: 56.6739833,
            longitude: 12.8574718,
        },
        description: "First bike"
        },
        {
        title: "bike2",
        location: {
            latitude: 56.6720011,
            longitude: 12.8574720,
        },
        description: "Second bike"
        },
    ];

    const chargeList = [
        {
        title: "charge1",
        location: {
            latitude: 56.6736718,
            longitude: 12.8561238,
        },
        description: "Charging station"
        },
    ];

    const customMarker = require('../assets/scooter.png');

    const chargeMarker = require('../assets/charging.png');

    const showMarkers = () => {
        return markerList.map((item, index) => {
            return (
                <Marker
                    key={index}
                    coordinate={item.location}
                    title={item.title}
                    description={item.description}
                    >
                    <Image 
                        source={customMarker}
                        style={styles.markerImage}
                    />
                    </Marker>
            )
        })
    }

    const showStations = () => {
        return chargeList.map((item, index) => {
            return (
                <Marker
                    key={index}
                    coordinate={item.location}
                    title={item.title}
                    description={item.description}
                    >
                    <Image 
                        source={chargeMarker}
                        style={styles.markerImage}
                    />
                    </Marker>
            )
        })
    }

    return (
    <View style={styles.container}>
        <MapView style={styles.map}
        customMapStyle={mapJson}
        initialRegion={{
        latitude: 56.6739803,
        longitude: 12.8574722,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
            }}
        >
        {showMarkers()}
        {showStations()}
        </MapView>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    markerImage: {
        width: 35,
        height: 35
    }
});