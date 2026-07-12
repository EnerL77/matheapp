export type Grade = 1 | 2 | 3 | 4 | 5 | 6;

export type Difficulty = 'leicht' | 'mittel' | 'schwer';

export interface Topic {
  id: string;
  name: string;
  grade: Grade[];
  icon: string;
  description: string;
  exampleKeywords: string[];
}

export interface Exercise {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint?: string;
}

export interface UserProgress {
  selectedGrade: Grade | null;
  xp: number;
  level: number;
  streak: number;
  lastPlayedDate: string | null;
  completedTopics: string[];
  badges: string[];
  topicProgress: Record<string, number>;
  totalExercisesDone: number;
  correctAnswers: number;
  coins: number;
}

export type Screen = 'start' | 'home' | 'topics' | 'exercise' | 'result' | 'profile' | 'parent';

export interface RoundResult {
  topic: Topic;
  correct: number;
  total: number;
  xpEarned: number;
  newBadges: string[];
}
