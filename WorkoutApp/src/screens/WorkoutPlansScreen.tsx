import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { WORKOUTS } from '../data/workouts';
import { COLORS } from '../theme/colors';

export default function WorkoutPlansScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      {WORKOUTS.map(workout => (
        <TouchableOpacity
          key={workout.id}
          style={styles.card}
          onPress={() =>
            navigation.navigate('WorkoutDetails', { workout })
          }
        >
          <Image source={{ uri: workout.image }} style={styles.image} />
          <View style={styles.overlay}>
            <Text style={styles.title}>{workout.level}</Text>
            <Text style={styles.subtitle}>
              {workout.duration} min • {workout.calories} kcal
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    padding: 16
  },
  card: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden'
  },
  image: {
    height: 160,
    width: '100%'
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    padding: 12,
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: '100%'
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
  },
  subtitle: {
    color: COLORS.muted
  }
});
