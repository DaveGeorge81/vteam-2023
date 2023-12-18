import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { globalStyles } from '../styles/global';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function Rent(navigation, route) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [bikeId, setBikeId] = useState("");
    const [openQR, setOpenQR] = useState(false);

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


    return (
        <View>
        <View style={globalStyles.container}>
            <Text style={globalStyles.contentText}>Enter bike id to rent</Text>
            <TextInput style={styles.box} placeholder='bike id' value={bikeId}/>
            <Button title="Rent bike"/>
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