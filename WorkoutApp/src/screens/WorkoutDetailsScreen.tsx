import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';

export default function WorkoutDetailsScreen({ route, navigation }: any) {
  const { workout } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: workout.image }} style={styles.image} />

      <Text style={styles.title}>{workout.level} Workout</Text>
      <Text style={styles.meta}>
        ⏱ {workout.duration} min • 🔥 {workout.calories} kcal
      </Text>

      <Text style={styles.section}>Exercises</Text>
      {workout.exercises.map((ex: any, i: number) => (
        <Text key={i} style={styles.exercise}>
          • {ex.name} ({ex.duration}s)
        </Text>
      ))}

      <Button
        title="Start Workout"
        onPress={() =>
          navigation.navigate('StartWorkout', { workout })
        }
        color={COLORS.primary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    padding: 16
  },
  image: {
    height: 200,
    borderRadius: 16,
    marginBottom: 16
  },
  title: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: 'bold'
  },
  meta: {
    color: COLORS.muted,
    marginBottom: 16
  },
  section: {
    color: COLORS.text,
    fontSize: 18,
    marginBottom: 8
  },
  exercise: {
    color: COLORS.muted,
    marginBottom: 4
  }
});
