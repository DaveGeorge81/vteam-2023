/* eslint-disable react/prop-types */
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from "react-native";
import axios from 'axios';
import { IP } from '@env'
import SessionStorage from 'react-native-session-storage';


export default function Login( { navigation } ) {

    const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");
    const [users, setUsers] = useState([]);


    useEffect(() => {
        // Collect all users from API
            const fetchUsers = async () => {
                await axios({
                    method: 'get',
                    url: `http://${IP}:1337/api/v1/users`,
                }).then((response) => {
                    setUsers(response.data);
                });
            }
            fetchUsers()
            .catch(console.error)
        }, []);

    // Check if user ID exists and store in session. Then move to Map-screen
    const handleButtonPress = () => {
        const data = users.filter((item) => item.name == username).map(({id, name}) => ({id, name}));
        if (data[0] != undefined) {
        alert('Logged in')
        SessionStorage.setItem('@loggedIn', true);
        SessionStorage.setItem('@id', data[0].id);
        navigation.navigate("Map")
        }
        else
            alert('Username or Password is incorrect! Try again!')
        };

    return (
        <TouchableWithoutFeedback onPress={() =>
            Keyboard.dismiss()}>
        <View style={styles.container}>
        <Image style={styles.image} source={require("../assets/login.png")} />
        <StatusBar style="auto" />
        <View style={styles.inputView}>
            <TextInput
            style={styles.TextInput}
            placeholder="Username"
            placeholderTextColor="#003f5c"
            onChangeText={(username) => setUsername(username)}
            />
        </View>
        <View style={styles.inputView}>
            <TextInput
            style={styles.TextInput}
            placeholder="Password"
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            // onChangeText={(password) => setPassword(password)}
            />
        </View>
        <TouchableOpacity style={styles.loginBtn} onPress={handleButtonPress}>
            <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        </View>
        </TouchableWithoutFeedback>
    );
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        marginBottom: 30,
        width: 300,
        height: 300
    },
    inputView: {
        backgroundColor: "#0CA0E3",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },
    // forgot_button: {
    //     height: 30,
    //     marginBottom: 30,
    // },
    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#0B5BE3",
    },
});
