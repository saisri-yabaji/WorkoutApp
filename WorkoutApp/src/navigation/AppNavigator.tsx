import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '../screens/DashboardScreen';
import WorkoutPlansScreen from '../screens/WorkoutPlansScreen';
import WorkoutDetailsScreen from '../screens/WorkoutDetailsScreen';
import StartWorkoutScreen from '../screens/StartWorkoutScreen';
import ProgressScreen from '../screens/ProgressScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="WorkoutPlans" component={WorkoutPlansScreen} />
      <Stack.Screen name="WorkoutDetails" component={WorkoutDetailsScreen} />
      <Stack.Screen name="StartWorkout" component={StartWorkoutScreen} />
      <Stack.Screen name="Progress" component={ProgressScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />

    </Stack.Navigator>
  );
}
