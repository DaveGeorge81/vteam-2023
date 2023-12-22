/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableWithoutFeedback, Keyboard, Vibration } from 'react-native';
import { globalStyles } from '../styles/global';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios';
import qs from 'qs'
import { IP } from '@env'
import { useIsFocused } from '@react-navigation/native';
import SessionStorage from 'react-native-session-storage';


export default function Rent( {navigation} ) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [bikeId, setBikeId] = useState("");
    const [openQR, setOpenQR] = useState(false);
    const [rides, setRides] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);
    const userID = SessionStorage.getItem('@id');
    const isFocused = useIsFocused();

    useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();

    const fetchRides = async () => {
        await axios({
            method: 'get',
            url: `http://${IP}:1337/api/v1/rides/user/${userID}`,
        }).then((response) => {
            setRides(response.data);
            // console.log(response.data);
        });
        }
    fetchRides()
    .catch(console.error)
    }, [isFocused]);

    const handleBarCodeScanned = ({ data }) => {
    Vibration.vibrate(100);
    setScanned(true);
    // alert(`Scooter with id: ${data} has been scanned! Tap on "Rent scooter" to rent.`);
    setBikeId(data)
    setOpenQR(false)
    };

    if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
    return <Text>No access to camera</Text>;
    }

    const data = rides.filter((item) => item.duration == null).map(({duration}) => ({duration}));

    const rentBike = () => {
        // console.log('Input Value:', bikeId);
        // Implement any desired actions with the input value here
        // setIsLoading(true);

        let body = {
            user_id: userID,
            bike_id: bikeId}

        const configurationObject = {
            method: "POST",
            url: `http://${IP}:1337/api/v1/rides`,
            data: qs.stringify(body),
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }}

        axios(configurationObject)
        .then((response) => {
            if (response.status === 201) {
            alert(` Ride started with bike: ${bikeId}`);
            // setIsLoading(false);
            } else {
            throw new Error("An error has occurred");
            }
        })
        setBikeId("")
        navigation.navigate("Account Info")

    };

    const returnBike = () => {
        // console.log('Input Value:', bikeId);
        // Implement any desired actions with the input value here
        // setIsLoading(true);

        let body = {user_id: userID}

        const configurationObject = {
            method: "PUT",
            url: `http://${IP}:1337/api/v1/rides`,
            data: qs.stringify(body),
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }}

        axios(configurationObject)
        .then((response) => {
            if (response.status === 200) {
            alert(` Ride stopped`);
            // setIsLoading(false);
            } else {
            throw new Error("An error has occurred");
            }
        })
        navigation.navigate("Account Info")

    };

    console.log(data[0]);

    return (
        <TouchableWithoutFeedback onPress={() =>
            Keyboard.dismiss()}>
            <View>
            {!data[0] ? <View style={globalStyles.container}>
                <Text style={globalStyles.contentText}>Enter bike id to rent</Text>
                <TextInput style={styles.box} placeholder='bike id:' onChangeText={text => setBikeId(text)} value={bikeId} />
                <Button title="Rent bike" onPress={rentBike}/>
            </View> : <View style={globalStyles.container}>
                <Button title="Return bike" onPress={returnBike}/>
            </View>}
            <View style={globalStyles.scanner}>
            {scanned ? <Button title={'Tap to Scan QR-code'} onPress={() => {
                setScanned(false); setOpenQR(true)}}/> : <Button title={'Tap to scan QR-code'} onPress={() => setOpenQR(true)} />}
                {openQR && <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={globalStyles.qr}
                    />}
            </View>
            <View>
            {openQR && <Button title={'Tap to close scanner'} onPress={() => setOpenQR(false)} />}
            </View>
            </View>
        </TouchableWithoutFeedback>
    )
} 

const styles = StyleSheet.create({
    box: {
        borderWidth: 1,
        borderColor: "#777",
        padding: 8,
        margin: 5
    },
});