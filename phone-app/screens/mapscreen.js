import React, { useState, useEffect} from 'react';
import MapView from 'react-native-maps';
import {Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View, Image} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'
import axios from 'axios';
import { IP } from '@env'
// import { useIsFocused } from '@react-navigation/native';

export default function MapScreen() {

    // let cityCount = 0

    // const isFocused = useIsFocused();

    // const [data, setData] = useState([{id: 0, name: "Halmstad", lon: 12.8574722, lat: 56.6739803, dlon: 0.0421, dlat: 0.0922}])

    const [cities, setCities] = useState([]);

    const [bikeList, setBikeList] = useState([]);

    const [stationList, setStationList] = useState([]);

    const [parkingList, setParkingList] = useState([]);

    useEffect(() => {
        // Passing configuration object to axios
            const fetchData = async () => {
                await axios({
                    method: 'get',
                    url: `http://${IP}:1337/api/v1/cities`,
                }).then((response) => {
                    setCities(response.data);
                    // console.log(response.data);
                });
            }
            fetchData()
            .catch(console.error)
        }, []);

        // useEffect(() => {
        //     newLocation()
        //     }, [isFocused]);

        const [selected, setSelected] = useState("Karlskrona");

        const data = cities.filter((item) => item.name == selected).map(({id, name, lon, lat, dlon, dlat}) => ({id, name, lon, lat, dlon, dlat}));

        const availableBikes = bikeList.filter((item) => item.status_id == 0).map(({id, status_id, lon, lat, battery}) => ({id, status_id, lon, lat, battery}));


        // const [location, setLocation] = useState({name: "Halmstad", latitude: 56.6739803, longitude: 12.8574722}) 

    const [mapRegion, setMapRegion] = useState({
        latitude: 56.193,
        longitude: 15.628,
        latitudeDelta: 0.02,
        longitudeDelta: 0.03,
    })

    useEffect(() => {
        const intervalId = setInterval(() => {
        newLocation();
        }, 10000)
    return () => clearInterval(intervalId);
    },);

    const newLocation = () => {
        setMapRegion({
            latitude: data[0].lat,
            longitude: data[0].lon,
            latitudeDelta: data[0].dlat,
            longitudeDelta: data[0].dlon,
        })
        const endpointBikes = `http://${IP}:1337/api/v1/bikes/city/${data[0].id}`

        const endpointStations = `http://${IP}:1337/api/v1/stations/city/${data[0].id}`

        const endpointParking = `http://${IP}:1337/api/v1/park_zones/city/${data[0].id}`

        const fetchBikes = async () => {
            await axios({
                method: 'get',
                url: endpointBikes,
            }).then((response) => {
                setBikeList(response.data);
                // console.log(response.data);
            });
        }
        fetchBikes()
        .catch(console.error)

        const fetchStations = async () => {
            await axios({
                method: 'get',
                url: endpointStations,
            }).then((response) => {
                setStationList(response.data);
                // console.log(response.data);
            });
        }
        fetchStations()
        .catch(console.error)

        const fetchParking = async () => {
            await axios({
                method: 'get',
                url: endpointParking,
            }).then((response) => {
                setParkingList(response.data);
                // console.log(response.data);
            });
        }
        fetchParking()
        .catch(console.error)

    }


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

    const customMarker = require('../assets/scooter.png');

    const chargeMarker = require('../assets/charging.png');

    const parkingMarker = require('../assets/parking.png');

    const showBikes = () => {
        return availableBikes.map((item) => {
            let id = item.id.toString()
            let battery = `Batteri: ${item.battery}%`
            return (
                <Marker
                    key={item.id}
                    coordinate={{latitude: item.lat, longitude: item.lon}}
                    title={id}
                    description={battery}
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
        return stationList.map((item) => {
            let id = item.id.toString()
            return (
                <Marker
                    key={item.id}
                    coordinate={{latitude: item.lat, longitude: item.lon}}
                    title={id}
                    description="."
                    >
                    <Image 
                        source={chargeMarker}
                        style={styles.markerImage}
                    />
                    </Marker>
            )
        })
    }

    const showParking = () => {
        return parkingList.map((item) => {
            let id = item.id.toString()
            return (
                <Marker
                    key={item.id}
                    coordinate={{latitude: item.lat, longitude: item.lon}}
                    title={id}
                    description="."
                    >
                    <Image 
                        source={parkingMarker}
                        style={styles.markerImage}
                    />
                    </Marker>
            )
        })
    }
    // console.log(bikeList)
    // console.log(availableBikes)
    // console.log(data)
    // console.log(selected)
    // console.log(location[0].name)
    // console.log(mapRegion)
    return (
    <View style={styles.mapPage}>
        <View>
            <SelectList 
            data={cities.map(item => {
                return {key: item.id, value: item.name}
            })}
            placeholder="Select City"
            save="value"
            search={false}
            setSelected={(val) => setSelected(val)} 
            onSelect={() => {
                newLocation();
            }}
            />
        </View>
        <View style={styles.map}>
            <MapView style={styles.map}
            region={mapRegion}
            showsUserLocation={true}
            provider={PROVIDER_GOOGLE}
            customMapStyle={mapJson}
            initialRegion={{
                latitude: 56.193,
                longitude: 15.628,
                latitudeDelta: 0.02,
                longitudeDelta: 0.03,
                }}
            >
            {showBikes()}
            {showStations()}
            {showParking()}
            </MapView>
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '96%',
    },
    markerImage: {
        width: 35,
        height: 35
    },
    mapPage: {
        flexDirection: "column"
    }
});