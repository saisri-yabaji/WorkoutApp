import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useAuthStore } from '../store/authStore';
import { COLORS } from '../theme/colors';

export default function ProfileScreen() {
  const { user, logout } = useAuthStore();

  const confirmLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: logout }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{user?.name}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{user?.email}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>🏋️ Total Workouts</Text>
        <Text style={styles.value}>{user?.totalWorkouts}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>🔥 Current Streak</Text>
        <Text style={styles.value}>{user?.currentStreak} days</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={confirmLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
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
    padding: 18,
    borderRadius: 16,
    marginBottom: 14
  },
  label: {
    color: COLORS.muted,
    fontSize: 13
  },
  value: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 4
  },
  logoutButton: {
    backgroundColor: '#EF4444',
    padding: 16,
    borderRadius: 16,
    marginTop: 30
  },
  logoutText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16
  }
});
