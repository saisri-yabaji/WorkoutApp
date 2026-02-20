import { View, Text, StyleSheet } from 'react-native';
import { useAuthStore } from '../store/authStore';
import { COLORS } from '../theme/colors';

export default function ProgressScreen() {
  const user = useAuthStore(state => state.user)!;

  // Empty state
  if (user.totalWorkouts === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Your Progress</Text>
        <Text style={styles.empty}>
          No workouts completed yet.
        </Text>
        <Text style={styles.subEmpty}>
          Start your first workout to see progress here 💪
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Progress</Text>

      <View style={styles.card}>
        <Text style={styles.label}>🏋️ Total Workouts</Text>
        <Text style={styles.value}>{user.totalWorkouts}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>🔥 Current Streak</Text>
        <Text style={styles.value}>{user.currentStreak} days</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>📅 Last Workout</Text>
        <Text style={styles.value}>
          {user.lastWorkoutDate ?? 'Not started yet'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    padding: 24
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 20
  },
  card: {
    backgroundColor: COLORS.card,
    padding: 20,
    borderRadius: 16,
    marginBottom: 16
  },
  label: {
    color: COLORS.muted,
    fontSize: 14
  },
  value: {
    color: COLORS.primary,
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 4
  },
  empty: {
    color: COLORS.text,
    fontSize: 18,
    marginTop: 40,
    textAlign: 'center'
  },
  subEmpty: {
    color: COLORS.muted,
    marginTop: 10,
    textAlign: 'center'
  }
});
