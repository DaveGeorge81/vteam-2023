import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/global';
import axios from 'axios';
import { IP } from '@env'
import { useIsFocused } from '@react-navigation/native';
import SessionStorage from 'react-native-session-storage';

export default function History({ navigation }) {

    const [userData, setUserData] = useState([]);
    const [rides, setRides] = useState([]);

    const isFocused = useIsFocused();
    const userID = SessionStorage.getItem('@id');
    useEffect(() => {
    // Passing configuration object to axios
        const fetchUser = async () => {
        const data = await axios({
            method: 'get',
            url: `http://${IP}:1337/api/v1/users/${userID}`,
        }).then((response) => {
            setUserData(response.data);
            // console.log(response.data);
        });
        }

        const fetchRides = async () => {
            const data = await axios({
                method: 'get',
                url: `http://${IP}:1337/api/v1/rides/user/${userID}`,
            }).then((response) => {
                setRides(response.data);
                // console.log(response.data);
            });
            }
        fetchUser()
        fetchRides()
        .catch(console.error)
    }, [isFocused]);

    return (
        <View>
            <Text style={globalStyles.contentText}>History Page</Text>
            <Text>Hello {userData.name}!</Text>
            <Text>Your current balance is: {userData.balance}kr </Text>
            <Text>Rent history:</Text>
            <FlatList
                data={rides}
                renderItem={( {item} ) => (
                    <Text>Date: {item.start_time} Duration: {item.duration}min Cost: {item.price}kr</Text>
                ) }/>
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

{/* <SelectList 
// defaultOption={{ key: 1, value:'Available cities', disabled:true }}
setSelected={(val) => setSelected(val)} 
data={quote.map(item => {
    cityCount ++;
    return {key: cityCount, value: item.name}
})}
save="value"
search={false}
onSelect={() => {
    setMapObj(data); 
    navigation.navigate(('Map', mapObj))
}}
//     navigation.navigate('Map', mapObj)}}
/> */}

{/* <FlatList
data={quote}
renderItem={({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Map', item)}>
        <Text>{ item.name }</Text>
        <Text>{ item.latitude }</Text>
    </TouchableOpacity>
)}
/> */}