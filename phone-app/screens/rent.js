import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { globalStyles } from '../styles/global';

export default function Rent() {
    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.contentText}>Enter bike id to rent</Text>
            <TextInput style={styles.box} placeholder='bike id' />
            <Button title="Rent bike"/>
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