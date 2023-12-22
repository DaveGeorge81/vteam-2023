import { createDrawerNavigator } from '@react-navigation/drawer';
import React from "react";
import Fees from '../screens/fees';
import Rent from "../screens/rent"
import History from '../screens/history';
import MapScreen from '../screens/mapscreen'
import Login from '../screens/login';

const Drawer = createDrawerNavigator();

// Drawer menu with items
function MyDrawer() {
    return (
        <Drawer.Navigator>
        <Drawer.Screen name="Login" component={Login} headerLeft={null} gestureEnabled={false} options={{ headerShown: false, drawerLabel: () => null, title: null, drawerItemStyle: { height: 0 } }}/>
        <Drawer.Screen name="Map" component={MapScreen} />
        <Drawer.Screen name="Current fees" component={Fees} />
        <Drawer.Screen name="Rent bike" component={Rent} />
        <Drawer.Screen name="Account Info" component={History} />
        </Drawer.Navigator>
    );
}

export default MyDrawer;

