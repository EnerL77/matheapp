import { useEffect, useState, useCallback } from 'react';
import { Difficulty, Exercise, Grade, Topic } from '../types';
import { generateExercise } from '../services/apiService';
import { ROUND_LENGTH } from '../hooks/useProgress';
import { playSound, useSoundSettings } from '../hooks/useSound';
import LivesDisplay from './ui/LivesDisplay';

interface ExerciseScreenProps {
  topic: Topic;
  grade: Grade;
  difficulty: Difficulty;
  onFinish: (result: { correct: number; total: number }) => void;
  onExit: () => void;
}

const MAX_LIVES = 3;

export default function ExerciseScreen({ topic, grade, difficulty, onFinish, onExit }: ExerciseScreenProps) {
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [lives, setLives] = useState(MAX_LIVES);
  const [correctCount, setCorrectCount] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const { muted, toggleMuted } = useSoundSettings();

  const loadExercise = useCallback(async () => {
    setLoading(true);
    setError(null);
    setSelectedIndex(null);
    setShowHint(false);
    try {
      const ex = await generateExercise(topic, grade, difficulty);
      setExercise(ex);
    } catch {
      setError('Die Aufgabe konnte nicht geladen werden. Bitte versuche es erneut.');
    } finally {
      setLoading(false);
    }
  }, [topic, grade, difficulty]);

  useEffect(() => {
    loadExercise();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionIndex]);

  const handleAnswer = (index: number) => {
    if (selectedIndex !== null || !exercise) return;
    setSelectedIndex(index);
    if (index === exercise.correctIndex) {
      playSound('correct');
      setCorrectCount(c => c + 1);
    } else {
      playSound('incorrect');
      setLives(l => Math.max(0, l - 1));
    }
  };

  const handleNext = () => {
    const isLastQuestion = questionIndex + 1 >= ROUND_LENGTH;
    const outOfLives = selectedIndex !== exercise?.correctIndex && lives - 1 <= 0;

    if (isLastQuestion || outOfLives) {
      onFinish({ correct: correctCount, total: questionIndex + 1 });
    } else {
      setQuestionIndex(i => i + 1);
    }
  };

  return (
    <div className="screen exercise-screen">
      <header className="exercise-header">
        <button className="icon-button" onClick={onExit} title="Abbrechen">
          ✖️
        </button>
        <div className="exercise-progress-label">
          Aufgabe {questionIndex + 1} / {ROUND_LENGTH}
        </div>
        <LivesDisplay lives={lives} maxLives={MAX_LIVES} />
        <button
          className="icon-button"
          onClick={toggleMuted}
          title={muted ? 'Ton einschalten' : 'Ton ausschalten'}
        >
          {muted ? '🔇' : '🔊'}
        </button>
      </header>

      <div className="topic-tag">
        {topic.icon} {topic.name}
      </div>

      {loading && <div className="loading-box">⏳ Aufgabe wird geladen...</div>}

      {error && (
        <div className="error-box">
          <p>{error}</p>
          <button className="primary-button" onClick={loadExercise}>Erneut versuchen</button>
        </div>
      )}

      {!loading && !error && exercise && (
        <div className="exercise-card">
          <h2 className="question-text">{exercise.question}</h2>

          <div className="options-grid">
            {exercise.options.map((option, index) => {
              let className = 'option-button';
              if (selectedIndex !== null) {
                if (index === exercise.correctIndex) className += ' correct';
                else if (index === selectedIndex) className += ' incorrect';
              }
              return (
                <button
                  key={index}
                  className={className}
                  onClick={() => handleAnswer(index)}
                  disabled={selectedIndex !== null}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {selectedIndex === null && exercise.hint && (
            <div className="hint-area">
              {showHint ? (
                <p className="hint-text">💡 {exercise.hint}</p>
              ) : (
                <button className="link-button" onClick={() => setShowHint(true)}>
                  💡 Tipp anzeigen
                </button>
              )}
            </div>
          )}

          {selectedIndex !== null && (
            <div className={`feedback-box ${selectedIndex === exercise.correctIndex ? 'feedback-correct' : 'feedback-incorrect'}`}>
              <p className="feedback-title">
                {selectedIndex === exercise.correctIndex ? '🎉 Richtig!' : '❌ Leider falsch'}
              </p>
              <p className="feedback-explanation">{exercise.explanation}</p>
              <button className="primary-button" onClick={handleNext}>
                {questionIndex + 1 >= ROUND_LENGTH ? 'Ergebnis ansehen' : 'Weiter'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
