import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from "react-native";
import axios from 'axios';
import { IP } from '@env'
// import { useNavigation } from '@react-navigation/native';
import SessionStorage from 'react-native-session-storage';


export default function Login( { navigation } ) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [users, setUsers] = useState([]);
    // const [userId, setUserId] = useState(0);


    useEffect(() => {
        // Passing configuration object to axios
            const fetchUsers = async () => {
            const data = await axios({
                method: 'get',
                url: `http://${IP}:1337/api/v1/users`,
            }).then((response) => {
                setUsers(response.data);
                // console.log(response.data);
            });
            }
            fetchUsers()
            .catch(console.error)
        }, []);

    const handleButtonPress = () => {
        const data = users.filter((item) => item.name == username).map(({id, name}) => ({id, name}));
        if (data[0] != undefined) {
        // setUserId(data[0].id)
        alert('Logged in')
        SessionStorage.setItem('@loggedIn', true);
        SessionStorage.setItem('@id', data[0].id);
        // const navigation = useNavigation()
        // navigation.dispatch(StackActions.replace('App'))
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
            onChangeText={(password) => setPassword(password)}
            />
        </View>
        <TouchableOpacity>
            <Text style={styles.forgot_button}>Forgot Password?</Text>
        </TouchableOpacity>
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
    forgot_button: {
        height: 30,
        marginBottom: 30,
    },
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
