import { createStackNavigator } from '@react-navigation/stack'
import Info from '../screens/info'

const InfoStack = createStackNavigator();

export default function OtherStack() {
    return (
    <InfoStack.Navigator screenOptions={{ headerStyle: { backgroundColor: 'papayawhip' } }}>
        <InfoStack.Screen name="Info" component={Info} />
    </InfoStack.Navigator>
    );
}
