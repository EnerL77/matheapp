import { useState, useEffect } from 'react';
import { UserProgress, Grade } from '../types';

const STORAGE_KEY = 'mathe_progress';
export const ROUND_LENGTH = 5;

const DEFAULT_PROGRESS: UserProgress = {
  selectedGrade: null,
  xp: 0,
  level: 1,
  streak: 0,
  lastPlayedDate: null,
  completedTopics: [],
  badges: [],
  topicProgress: {},
  totalExercisesDone: 0,
  correctAnswers: 0,
  coins: 0,
};

export interface RoundOutcome {
  progress: UserProgress;
  xpEarned: number;
  newBadges: string[];
}

/**
 * Pure function: computes the next progress state plus the XP/badges
 * earned for a finished round, without mutating anything.
 */
export function applyRound(progress: UserProgress, topicId: string, correct: number, total: number): RoundOutcome {
  const today = new Date().toDateString();
  const isPerfect = total === ROUND_LENGTH && correct === total;
  const xpEarned = correct * 10 + (isPerfect ? 10 : 0);

  const newXP = progress.xp + xpEarned;
  const newLevel = Math.floor(newXP / 100) + 1;
  const newStreak = progress.lastPlayedDate === today ? progress.streak : progress.streak + 1;

  const progressGain = total > 0 ? Math.round((correct / total) * 20) : 0;
  const newTopicProgress = {
    ...progress.topicProgress,
    [topicId]: Math.min(100, (progress.topicProgress[topicId] || 0) + progressGain),
  };
  const newCompletedTopics = newTopicProgress[topicId] >= 100 && !progress.completedTopics.includes(topicId)
    ? [...progress.completedTopics, topicId]
    : progress.completedTopics;

  const badges = [...progress.badges];
  const newBadges: string[] = [];
  const award = (id: string) => {
    if (!badges.includes(id)) {
      badges.push(id);
      newBadges.push(id);
    }
  };

  if (progress.totalExercisesDone === 0) award('first_exercise');
  if (newStreak >= 3) award('streak_3');
  if (newStreak >= 7) award('streak_7');
  if (newLevel >= 5) award('level_5');
  if (newLevel >= 10) award('level_10');
  if (isPerfect) award('perfect_round');
  const uniqueTopics = new Set([...Object.keys(progress.topicProgress), topicId]);
  if (uniqueTopics.size >= 5) award('explorer');

  const newProgress: UserProgress = {
    ...progress,
    xp: newXP,
    level: newLevel,
    streak: newStreak,
    lastPlayedDate: today,
    badges,
    topicProgress: newTopicProgress,
    completedTopics: newCompletedTopics,
    totalExercisesDone: progress.totalExercisesDone + total,
    correctAnswers: progress.correctAnswers + correct,
    coins: progress.coins + Math.floor(xpEarned / 10),
  };

  return { progress: newProgress, xpEarned, newBadges };
}

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...DEFAULT_PROGRESS, ...JSON.parse(saved) } : DEFAULT_PROGRESS;
    } catch {
      return DEFAULT_PROGRESS;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    const today = new Date().toDateString();
    const lastDate = progress.lastPlayedDate;
    if (lastDate) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      if (lastDate !== today && lastDate !== yesterday.toDateString()) {
        setProgress(p => ({ ...p, streak: 0 }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setGrade = (grade: Grade) => setProgress(p => ({ ...p, selectedGrade: grade }));
  const updateProgress = (newProgress: UserProgress) => setProgress(newProgress);
  const resetProgress = () => setProgress(DEFAULT_PROGRESS);

  return { progress, setGrade, updateProgress, resetProgress };
}
