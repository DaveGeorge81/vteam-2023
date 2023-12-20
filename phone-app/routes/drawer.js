import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from "../screens/home"
import Rent from "../screens/rent"
import History from '../screens/history';
import Map from '../screens/map';
import MapScreen from '../screens/mapscreen'
import Login from '../screens/login';

const Drawer = createDrawerNavigator();

function MyDrawer() {
    return (
        <Drawer.Navigator>
        <Drawer.Screen name="Login" component={Login} headerLeft={null} gestureEnabled={false} options={{ headerShown: false, drawerLabel: () => null, title: null, drawerItemStyle: { height: 0 } }}/>
        <Drawer.Screen name="Map" component={MapScreen} />
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Rent bike" component={Rent} />
        <Drawer.Screen name="Account Info" component={History} />
        {/* <Drawer.Screen name="Map" component={Map} /> */}
        </Drawer.Navigator>
    );
}

export default MyDrawer;

