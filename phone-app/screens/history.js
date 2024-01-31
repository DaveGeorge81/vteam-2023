import React, { useState, useEffect } from 'react';
import { Text, View, FlatList } from 'react-native';
import { globalStyles } from '../styles/global';
import axios from 'axios';
import { IP } from '@env'
import { useIsFocused } from '@react-navigation/native';
import SessionStorage from 'react-native-session-storage';

export default function History() {

    const [userData, setUserData] = useState({balance: 0.000});
    const [rides, setRides] = useState([]);

    const isFocused = useIsFocused();
    const userID = SessionStorage.getItem('@id');
    const userName = SessionStorage.getItem('@name');

    useEffect(() => {
    // Collect user data from API
        const fetchUser = async () => {
            await axios({
                method: 'get',
                url: `http://${IP}:1337/api/v1/users/${userID}`,
            }).then((response) => {
                setUserData(response.data);
            });
        }
        // Collect all rides for selected user from API
        const fetchRides = async () => {
            await axios({
                method: 'get',
                url: `http://${IP}:1337/api/v1/rides/user/${userID}`,
            }).then((response) => {
                setRides(response.data);
            });
            }
        fetchUser()
        fetchRides()
        .catch(console.error)
    }, [isFocused]);

    return (
        <View>
            <Text style={globalStyles.topHeader}>Welcome {userName}!</Text>
            <Text style={globalStyles.smallHeader}>Your current balance is:  </Text>
            <View>
                <Text style={globalStyles.balance}>{userData.balance.toFixed(2)}kr</Text>
            </View>
            <Text style={globalStyles.smallHeader}>Rent history:</Text>
            <FlatList
                data={rides}
                renderItem={( {item} ) => (
                    <View style={globalStyles.rentHistory}>
                    <Text>{item.start_time}</Text> 
                    <Text>Cost:</Text>
                    {item.price ? <Text>{item.price.toFixed(2)}kr</Text> : <Text>----.----</Text>}
                    <Text>Dur(min):</Text>
                    {item.duration ? <Text>{item.duration}</Text> : <Text>----.----</Text>}
                    </View>
                ) }/>
        </View>
    )
}
