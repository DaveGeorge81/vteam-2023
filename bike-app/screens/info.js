import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { globalStyles } from '../styles/global';

export default function Info() {
    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.contentText}>Info page</Text>
        </View>
    )
} 

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     content: {
//         padding: 24
//     }
// });