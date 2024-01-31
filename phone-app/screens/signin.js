/* eslint-disable react/prop-types */
import { StatusBar } from "expo-status-bar";
import { globalStyles } from '../styles/global';
import { StyleSheet, Text, View, Image } from "react-native";
import { GoogleSignin, GoogleSigninButton } from "@react-native-google-signin/google-signin";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { IP } from '@env'
import qs from 'qs'
import SessionStorage from 'react-native-session-storage';


export default function SignIn( { navigation } ) {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState();

    const configureGoogleSignIn = () => {
        GoogleSignin.configure({
            iosClientId: "284749733362-269tm8p2t0u3ehljm7v5i2v97vlpqs81.apps.googleusercontent.com",
            androidClientId: "284749733362-5dk58bfp76000dbckjfndl1gr3de3gbm.apps.googleusercontent.com",
        });
    };

    const fetchUsers = async () => {
        await axios({
            method: 'get',
            url: `http://${IP}:1337/api/v1/users`,
        }).then((response) => {
            setUsers(response.data);
        });
    }

    // create new user
    const createUser = async (user) => {
        let body = {
            name: user.email,
            balance: 0,
            recurring_withdraw: 0
        }

        const configurationObject = {
            method: "POST",
            url: `http://${IP}:1337/api/v1/users`,
            data: qs.stringify(body),
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }}

        await axios(configurationObject)
        .then((response) => {
            if (response.status === 201) {
            alert(` user: ${user.email} created!`);
            SessionStorage.setItem('@id', response.data.newId);
            SessionStorage.setItem('@loggedIn', true);
            SessionStorage.setItem('@name', user.name);
            console.log(response.data.newId)
            // setIsLoading(false);
            } else {
                console.log("not working")
            throw new Error("An error has occurred");
            }
        })
    };

    useEffect(() => {
        fetchUsers()
        .catch(console.error)
        configureGoogleSignIn();
    }, []);

    const signIn = async () => {

    try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        // setUserInfo(userInfo);
        await fetchUsers()
        console.log(userInfo)
        const data = users.filter((item) => item.name == userInfo.user.email).map(({id, name}) => ({id, name}));
        console.log(data[0])
        if (data[0] === undefined) {
            createUser(userInfo.user);
            }
        else {
            SessionStorage.setItem('@loggedIn', true);
            SessionStorage.setItem('@id', data[0].id);
            SessionStorage.setItem('@name', userInfo.user.name);
        }
        setError();
        } catch (e) {
        setError(e);
        }
        navigation.navigate("Sign out")
    };


    return (
        <View style={styles.container}>
        <Text>{JSON.stringify(error)}</Text>
        <Image style={styles.image} source={require("../assets/login.png")} />
            <View>
            <GoogleSigninButton
            size={GoogleSigninButton.Size.Standard}
            color={GoogleSigninButton.Color.Dark}
            onPress={()=> signIn()}
            />
            <Text style={globalStyles.note}>* If not already registered a user will be created.</Text>
            </View>
        <StatusBar style="auto" />
    </View>
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
});