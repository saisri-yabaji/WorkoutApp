export interface User {
  name: string;
  email: string;
  totalWorkouts: number;
  currentStreak: number;
  lastWorkoutDate: string | null;
}
