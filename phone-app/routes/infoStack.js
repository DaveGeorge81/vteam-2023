import { createStackNavigator } from '@react-navigation/stack'
import History from '../screens/history'

const InfoStack = createStackNavigator();

export default function OtherStack() {
    return (
    <InfoStack.Navigator screenOptions={{ headerStyle: { backgroundColor: 'papayawhip' } }}>
        <InfoStack.Screen name="History" component={History} />
    </InfoStack.Navigator>
    );
}
