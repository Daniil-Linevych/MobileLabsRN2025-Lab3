import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import TasksScreen from '../screens/TasksScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Clicker Game' }} />
      <Stack.Screen name="Tasks" component={TasksScreen} options={{ title: 'Tasks' }} />
    </Stack.Navigator>
  );
}