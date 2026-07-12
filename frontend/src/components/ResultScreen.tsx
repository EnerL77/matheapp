import { useEffect } from 'react';
import { BADGES } from '../data/curriculum';
import { Topic } from '../types';
import { playSound } from '../hooks/useSound';

interface ResultScreenProps {
  topic: Topic;
  correct: number;
  total: number;
  xpEarned: number;
  newBadges: string[];
  onContinue: () => void;
  onRetry: () => void;
}

export default function ResultScreen({ topic, correct, total, xpEarned, newBadges, onContinue, onRetry }: ResultScreenProps) {
  const percent = total > 0 ? correct / total : 0;
  const stars = percent >= 0.9 ? 3 : percent >= 0.6 ? 2 : percent >= 0.3 ? 1 : 0;

  const message =
    percent >= 0.9 ? 'Fantastisch! Du bist ein Mathe-Held! 🌟' :
    percent >= 0.6 ? 'Super gemacht! Weiter so! 💪' :
    percent >= 0.3 ? 'Guter Versuch! Übung macht den Meister. 📚' :
    'Nicht aufgeben! Versuch es nochmal. 🌱';

  useEffect(() => {
    playSound('complete');
  }, []);

  return (
    <div className="screen result-screen">
      <h2 className="result-title">{topic.icon} {topic.name}</h2>

      <div className="stars-row">
        {[0, 1, 2].map(i => (
          <span key={i} className={`star ${i < stars ? 'star-filled' : ''}`}>⭐</span>
        ))}
      </div>

      <p className="result-message">{message}</p>

      <div className="result-stats">
        <div className="result-stat">
          <span className="result-stat-value">{correct} / {total}</span>
          <span className="result-stat-label">Richtige Antworten</span>
        </div>
        <div className="result-stat">
          <span className="result-stat-value">+{xpEarned}</span>
          <span className="result-stat-label">Erfahrungspunkte</span>
        </div>
      </div>

      {newBadges.length > 0 && (
        <div className="new-badges">
          <h3>Neue Abzeichen!</h3>
          <div className="badges-row">
            {newBadges.map(id => {
              const badge = BADGES.find(b => b.id === id);
              if (!badge) return null;
              return (
                <div key={id} className="badge-item" title={badge.description}>
                  <span className="icon-circle icon-circle--md icon-orange">{badge.icon}</span>
                  <span className="badge-name">{badge.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="result-actions">
        <button className="secondary-button" onClick={onRetry}>🔁 Nochmal üben</button>
        <button className="primary-button" onClick={onContinue}>Weiter zu den Themen</button>
      </div>
    </div>
  );
}
