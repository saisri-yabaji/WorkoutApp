import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useAuthStore } from '../store/authStore';
import { COLORS } from '../theme/colors';

export default function DashboardScreen({ navigation }: any) {
  const user = useAuthStore(state => state.user)!;

  return (
    <ScrollView style={styles.container}>
      {/* Welcome */}
      <Text style={styles.welcome}>Welcome, {user.name} 👋</Text>

      {/* Stats */}
      <View style={styles.card}>
        <Text style={styles.label}>🔥 Current Streak</Text>
        <Text style={styles.value}>{user.currentStreak}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>🏋️ Total Workouts</Text>
        <Text style={styles.value}>{user.totalWorkouts}</Text>
      </View>

      {/* ACTION BUTTONS */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('WorkoutPlans')}
        >
          <Text style={styles.buttonText}>Start Workout</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('Progress')}
        >
          <Text style={styles.secondaryText}>View Progress</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.secondaryText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    padding: 20
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 20
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16
  },
  label: {
    color: COLORS.muted,
    fontSize: 14
  },
  value: {
    color: COLORS.primary,
    fontSize: 28,
    fontWeight: 'bold'
  },
  actions: {
    marginTop: 30
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 14,
    marginBottom: 12
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000'
  },
  secondaryButton: {
    backgroundColor: COLORS.card,
    padding: 14,
    borderRadius: 14,
    marginBottom: 10
  },
  secondaryText: {
    textAlign: 'center',
    color: COLORS.text,
    fontSize: 15
  }
});
