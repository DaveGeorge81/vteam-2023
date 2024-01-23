/* eslint-disable react/prop-types */
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Button, Image } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import React from "react";
import SessionStorage from 'react-native-session-storage';


export default function SignOut( { navigation } ) {

    const logout = () => {
        // setUserInfo(undefined);
        GoogleSignin.revokeAccess();
        GoogleSignin.signOut();
        SessionStorage.setItem('@loggedIn', false);
        navigation.navigate("Sign in")
    };
    return (
        <View style={styles.container}>
        <Image style={styles.image} source={require("../assets/login.png")} />
            <View>
            <Button title="Logout" onPress={logout} />
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