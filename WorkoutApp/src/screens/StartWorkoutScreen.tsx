import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { COLORS } from '../theme/colors';
import { useAuthStore } from '../store/authStore';
import { calculateStreak } from '../utils/streakLogic';
import { saveData } from '../storage/storage';

export default function StartWorkoutScreen({ route, navigation }: any) {
  const workout = route?.params?.workout;

  // 🔐 SAFETY CHECK
  if (!workout || !workout.exercises?.length) {
    return (
      <View style={styles.container}>
        <Text style={{ color: COLORS.text }}>
          Workout data not found.
        </Text>
      </View>
    );
  }

  const user = useAuthStore(state => state.user)!;
  const setUser = useAuthStore.setState;

  // ✅ Explicit typing
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(
    workout.exercises[0].duration
  );
  const [completed, setCompleted] = useState<boolean>(false);

  const exercise = workout.exercises[currentIndex];

  // ⏱ TIMER LOGIC (TYPE-SAFE)
  useEffect(() => {
    if (completed) return;

    const timer = setInterval(() => {
      setTimeLeft((prev: number) => {
        if (prev <= 1) {
          moveToNextExercise();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIndex, completed]);

  const moveToNextExercise = () => {
    if (currentIndex < workout.exercises.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setTimeLeft(workout.exercises[nextIndex].duration);
    } else {
      setCompleted(true);
    }
  };

  const finishWorkout = async () => {
    const today = new Date().toDateString();
    if (user.lastWorkoutDate === today) return;

    const updatedUser = {
      ...user,
      totalWorkouts: user.totalWorkouts + 1,
      currentStreak: calculateStreak(
        user.lastWorkoutDate,
        user.currentStreak
      ),
      lastWorkoutDate: today
    };

    await saveData(user.email, updatedUser);
    setUser({ user: updatedUser });

    navigation.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }]
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.workoutTitle}>
        {workout.level} Workout
      </Text>

      {!completed ? (
        <>
          <Text style={styles.progress}>
            Exercise {currentIndex + 1} of {workout.exercises.length}
          </Text>

          <View style={styles.card}>
            <Text style={styles.exerciseName}>
              {exercise.name}
            </Text>
            <Text style={styles.timer}>
              {timeLeft}s
            </Text>
          </View>
        </>
      ) : (
        <>
          <Text style={styles.doneText}>
            Workout Completed 🎉
          </Text>

          <TouchableOpacity
            style={styles.finishButton}
            onPress={finishWorkout}
          >
            <Text style={styles.finishText}>
              Finish Workout
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center'
  },
  workoutTitle: {
    fontSize: 22,
    color: COLORS.text,
    fontWeight: 'bold',
    marginBottom: 20
  },
  progress: {
    color: COLORS.muted,
    marginBottom: 10
  },
  card: {
    backgroundColor: COLORS.card,
    width: '100%',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center'
  },
  exerciseName: {
    fontSize: 24,
    color: COLORS.text,
    fontWeight: 'bold',
    marginBottom: 20
  },
  timer: {
    fontSize: 48,
    color: COLORS.primary,
    fontWeight: 'bold'
  },
  doneText: {
    fontSize: 24,
    color: COLORS.primary,
    fontWeight: 'bold',
    marginBottom: 30
  },
  finishButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 20
  },
  finishText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000'
  }
});
