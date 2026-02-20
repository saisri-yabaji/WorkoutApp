export const calculateStreak = (
  lastDate: string | null,
  currentStreak: number
) => {
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();

  if (lastDate === yesterday) return currentStreak + 1;
  return 1;
};
