import React, { useState, useEffect, useRef } from 'react';
import MapView from 'react-native-maps';
import {Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View, Image } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'
import axios from 'axios';
import { IP } from '@env'
// import { Geolocation } from '@react-native-community/geolocation';


export default function Map({ navigation, route }) {

    let cityCount = 0

    const [quote, setQuote] = useState([]);

    const [mapObj, setMapObj] = useState([]);

    useEffect(() => {
    // Passing configuration object to axios
        const fetchData = async () => {
        const data = await axios({
            method: 'get',
            url: `http://${IP}:3000/cities`,
        }).then((response) => {
            setQuote(response.data);
            // console.log(response.data);
        });
        }
        fetchData()
        .catch(console.error)
    }, []);


    const [selected, setSelected] = React.useState([]);

    const data = quote.filter((item) => item.name == selected).map(({name, longitude, latitude}) => ({name, longitude, latitude}));


    const [initialRegion, setInitialRegion] = useState(null);

    const [location, setLocation] = useState([{latitude: 56.6739803, longitude: 12.8574722}]) 


    // function getLocation(){
    //     Geolocation.getCurrentPosition(position => {
    //         const region = {
    //             latitude: position.coords.latitude,
    //             longitude: position.coords.longitude,
    //             latitudeDelta: 0.0043,
    //             longitudeDelta: 0.0034
    //         };
    //         map.current.animateToRegion(region, 500);
    //         });
    //     };

    const mapRef = useRef(null);
    const [region, setRegion] = useState({
        latitude: 56.6739803,
        longitude: 12.8574722,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        });

        const onRegionChange=()=>{
            mapRef?.current?.animateToRegion({
                latitude: location.latitude,
                longitude: location.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta:0.0421,
                });
        }

    useEffect(() => {
            setInitialRegion({
                latitude: 56.6739803,
                longitude: 12.8574722,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
        
        }, []);


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

    console.log(data)
    return (
    <View style={{flexDirection: "column"}}>
        <View style={styles.top}>
            <SelectList 
            defaultOption={{ key: 1, value:'Available cities', disabled:true }}
            setSelected={(val) => setSelected(val)} 
            data={quote.map(item => {
                cityCount ++;
                return {key: cityCount, value: item.name}
            })}
            save="value"
            search={false}
            onSelect={() => {
                setLocation(data);
            }}
            //     navigation.navigate('Map', mapObj)}}
            />
        </View>
        <View style={styles.map}>
            <MapView style={styles.map}
            // ref={mapRef}
            // onRegionChangeComplete={onRegionChange}
            // region={region}
            showsUserLocation={true}
            provider={PROVIDER_GOOGLE}
            customMapStyle={mapJson}
            initialRegion={initialRegion}
            // initialRegion={{
            // latitude: latitude,
            // longitude: longitude,
            // latitude: route.params.latitude,
            // longitude: route.params.longitude,
            // latitude: 56.6739803,
            // longitude: 12.8574722,
            // latitudeDelta: 0.0922,
            // longitudeDelta: 0.0421,
            //     }}
            >
            {showMarkers()}
            {showStations()}
            </MapView>
        </View>
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

    // React.useEffect(() => {
    //     const focusHandler = navigation.addListener('focus', () => {
    //         alert('Refreshed');
    //     });
    //     return focusHandler;
    // }, [navigation]);