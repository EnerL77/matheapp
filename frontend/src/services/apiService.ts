import { Exercise, Grade, Topic, Difficulty } from '../types';

// Frontend und /api-Functions laufen auf derselben Vercel-Domain,
// daher reicht ein relativer Pfad - sowohl lokal (vercel dev) als auch in Produktion.
const API_BASE = '';

export async function generateExercise(
  topic: Topic,
  grade: Grade,
  difficulty: Difficulty = 'mittel'
): Promise<Exercise> {
  const response = await fetch(`${API_BASE}/api/generate-exercise`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      topicName: topic.name,
      grade,
      difficulty,
    }),
  });

  if (!response.ok) {
    throw new Error(`API Fehler: ${response.status}`);
  }

  return response.json();
}
