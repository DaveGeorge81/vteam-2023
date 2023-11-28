import { createStackNavigator } from '@react-navigation/stack'
import Home from "../screens/home"
import About from "../screens/about"

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
    <HomeStack.Navigator screenOptions={{ headerStyle: { backgroundColor: 'papayawhip' } }}>
        <HomeStack.Screen name="Home" component={Home} options={{ headerStyle: { backgroundColor: '#ccc' } }} />
        <HomeStack.Screen name="About" component={About} />
    </HomeStack.Navigator>
    );
}
