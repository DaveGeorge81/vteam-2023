import { createStackNavigator } from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native';
import { createAppContainer } from '@react-navigation/native'
import Home from "../screens/home"
import MyDrawer from './drawer';
import Login from '../screens/login';

// const screens = {
//     Home: {
//         screen: Home
//     },
//     About: {
//         screen: About
//     }
// }

const HomeStack = createStackNavigator();

export default function MyStack() {
    return (
    <NavigationContainer>
        <HomeStack.Navigator screenOptions={{ headerStyle: { backgroundColor: 'papayawhip' } }}>
            <HomeStack.Screen name="Login" component={Login} options={{ headerStyle: { backgroundColor: '#ccc' } }} />
            <HomeStack.Screen name="Drawer" component={MyDrawer} headerLeft={null} gestureEnabled={false} options={{ headerShown: false }}/>
        </HomeStack.Navigator>
    </NavigationContainer>
    );
}
