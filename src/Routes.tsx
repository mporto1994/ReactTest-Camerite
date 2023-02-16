import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import CameraList from './pages/List/CameraList';
import CameraForm from './pages/Form/CameraForm';

const Stack = createStackNavigator();

export default function MainRoutes() {
    return (
        <NavigationContainer >
            <Stack.Navigator initialRouteName='CameraList'>
                <Stack.Screen name="CameraList" component={CameraList} options={{ headerShown: false }} />
                <Stack.Screen name="CameraForm" component={CameraForm} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
