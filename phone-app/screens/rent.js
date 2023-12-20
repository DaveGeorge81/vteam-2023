import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { globalStyles } from '../styles/global';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios';
import qs from 'qs'
import { IP } from '@env'


export default function Rent(navigation, route) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [bikeId, setBikeId] = useState("");
    const [openQR, setOpenQR] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Scooter with id: ${data} has been scanned! Tap on "Rent scooter" to rent.`);
    setBikeId(data)
    setOpenQR(false)
    };

    if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
    return <Text>No access to camera</Text>;
    }

    const handleButtonPress = () => {
        console.log('Input Value:', bikeId);
        // Implement any desired actions with the input value here
        setIsLoading(true);

        // let body = { name: `${bikeId}`,
        //     balance: 500,
        //     bank_account: 4000,
        //     recurring_withdraw:0}

        // const configurationObject = {
        //     method: "POST",
        //     url: `http://${IP}:1337/api/v1/users`,
        //     data: qs.stringify(body),
        //     headers: {
        //         'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        //     }}

        // let body = { id: bikeId,
        //     name: "JaneDoe",
        //     balance: 66,
        //     bank_account: 1100,
        //     recurring_withdraw: 150,}

        // const configurationObject = {
        //     method: "put",
        //     url: `http://${IP}:1337/api/v1/users`,
        //     data: qs.stringify(body),
        //     headers: {
        //         'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        //     }}

        let body = { id: bikeId,
            user_id: 0,
            status_id: 0,
            station_id:0,
            park_id: 0,}

        const configurationObject = {
            method: "put",
            url: `http://${IP}:1337/api/v1/bikes/user_status_station_park`,
            data: qs.stringify(body),
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }}

        axios(configurationObject)
        .then((response) => {
            if (response.status === 200) {
            alert(` You have updated: ${JSON.stringify(response.data)}`);
            setIsLoading(false);
            } else {
            throw new Error("An error has occurred");
            }
        })
        .catch((error) => {
            alert("An error has occurred");
            setIsLoading(false);
            console.log(response)
        });
        setBikeId("")

    };


    return (
        <TouchableWithoutFeedback onPress={() =>
            Keyboard.dismiss()}>
            <View>
            <View style={globalStyles.container}>
                <Text style={globalStyles.contentText}>Enter bike id to rent</Text>
                <TextInput style={styles.box} placeholder='bike id' onChangeText={text => setBikeId(text)} value={bikeId} />
                <Button title="Rent bike" onPress={handleButtonPress}/>
            </View>
            <View style={globalStyles.scanner}>
            {scanned ? <Button title={'Tap to Scan QR-code'} onPress={() => {
                setScanned(false); setOpenQR(true)}}/> : <Button title={'Tap to scan QR-code'} onPress={() => setOpenQR(true)} />}
                {openQR && <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
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