// import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import React from "react";
import Home from "./screens/home"
import Navigator from "./routes/drawer"
// import Drawer from "./routes/drawer";


export default function App() {
  return (
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>

  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
