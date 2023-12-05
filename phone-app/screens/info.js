import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { globalStyles } from '../styles/global';
import axios from 'axios';
import { IP } from '@env'

export default function Info() {

    const [quote, setQuote] = useState('');

    // Passing configuration object to axios
    axios({
        method: 'get',
        url: `http://${IP}:3000/all`,
    }).then((response) => {
        setQuote(response.data[1].name);
        console.log(response.data[0].name);
    });
    // useEffect(() => {
    //     const options = {
    //         method: 'GET',
    //     };
    //     fetch('http://10.0.2.2:3000/all', options)
    //         .then(response => response.json())
    //         .then(data => setQuote(data.fruits))
    //         .catch(error => console.error(error));
    //     }, []);
    // console.log(quote)
    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.contentText}>Info Page</Text>
            <Text>{quote}</Text>
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