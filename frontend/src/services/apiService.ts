import { Exercise, Grade, Topic, Difficulty } from '../types';

// Im Dev-Modus: /api wird durch Vite-Proxy zu localhost:3002 weitergeleitet
// In Produktion: VITE_API_URL zeigt auf den Render-Backend-Service
const API_BASE = import.meta.env.VITE_API_URL
  ? `https://${import.meta.env.VITE_API_URL}`
  : '';

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
