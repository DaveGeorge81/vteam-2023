import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/global';
import axios from 'axios';
import { IP } from '@env'
import { SelectList } from 'react-native-dropdown-select-list'

export default function Info({ navigation }) {

    const [quote, setQuote] = useState([]);

    const [mapObj, setMapObj] = useState([]);

    useEffect(() => {
    // Passing configuration object to axios
        const fetchData = async () => {
        const data = await axios({
            method: 'get',
            url: `http://${IP}:3000/cities`,
        }).then((response) => {
            setQuote(response.data);
            // console.log(response.data);
        });
        }
        fetchData()
        .catch(console.error)
    }, []);


    const [selected, setSelected] = React.useState([]);

    const data = quote.filter((item) => item.name == selected).map(({longitude, latitude}) => ({longitude, latitude}));
    // const data = [
    //     {key:'1', value:'Mobiles', disabled:true},
    //     {key:'2', value:'Appliances'},
    //     {key:'3', value:'Cameras'},
    //     {key:'4', value:'Computers', disabled:true},
    //     {key:'5', value:'Vegetables'},
    //     {key:'6', value:'Diary Products'},
    //     {key:'7', value:'Drinks'},
    // ]

    cityCount = 1;
    // const cities = quote.map(item => {
    //     cityCount ++;
    //     return {key: cityCount, 
    //             value: item.name,
    //             latitude: item.latitude,
    //             longitude: item.longitude}})


    // console.log(selected)
    // console.log(mapObj)
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
        <View>
            <Text style={globalStyles.contentText}>Info Page</Text>
            <Text>hejsan</Text>
            <FlatList
            data={quote}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={() => navigation.navigate('Map', item)}>
                    <Text>{ item.name }</Text>
                    <Text>{ item.latitude }</Text>
                </TouchableOpacity>
            )}
            />
        </View>
        // <View style={globalStyles.container}>
        //     <Text style={globalStyles.contentText}>Info Page</Text>
        //     <Text>hejsan</Text>
        //     <FlatList
        //     data={quote}
        //     renderItem={({ item }) => (
        //         <TouchableOpacity onPress={() => navigation.navigate('Map', item)}>
        //             <Text>{ item.name }</Text>
        //             <Text>{ item.latitude }</Text>
        //         </TouchableOpacity>
        //     )}
        //     />
        // </View>
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