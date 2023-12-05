import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from "../screens/home"
import Rent from "../screens/rent"
import Info from '../screens/info';
import Map from '../screens/map';

const Drawer = createDrawerNavigator();

function MyDrawer() {
    return (
        <Drawer.Navigator>
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Rent bike" component={Rent} />
        <Drawer.Screen name="Info" component={Info} />
        <Drawer.Screen name="Map" component={Map} />
        </Drawer.Navigator>
    );
}

export default MyDrawer;

