import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { globalStyles } from '../styles/global';

export default function Home( { navigation }) {

    const pressHandler = () => {
        navigation.navigate("Account Info")

    }
    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.contentText}>Home page</Text>
            <Button title="Go to Account info page" onPress={pressHandler}/>
        </View>
    )
} 

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 24
//     },
//     content: {
//         padding: 24
//     }
// });