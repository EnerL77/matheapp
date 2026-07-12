import { useState } from 'react';
import { TOPICS } from '../data/curriculum';
import { UserProgress } from '../types';
import ProgressBar from './ui/ProgressBar';

interface ParentViewProps {
  progress: UserProgress;
  onBack: () => void;
  onResetProgress: () => void;
  onChangeGrade: () => void;
}

const ICON_COLORS = ['icon-violet', 'icon-teal', 'icon-orange', 'icon-pink', 'icon-blue'];

export default function ParentView({ progress, onBack, onResetProgress, onChangeGrade }: ParentViewProps) {
  const [confirmReset, setConfirmReset] = useState(false);

  const accuracy = progress.totalExercisesDone > 0
    ? Math.round((progress.correctAnswers / progress.totalExercisesDone) * 100)
    : 0;

  const handleReset = () => {
    if (confirmReset) {
      onResetProgress();
      setConfirmReset(false);
    } else {
      setConfirmReset(true);
    }
  };

  return (
    <div className="screen parent-screen">
      <header className="topic-header">
        <button className="icon-button" onClick={onBack} title="Zurück">⬅️</button>
        <div className="topic-header-title">
          <h2>👨‍👩‍👧 Elternbereich</h2>
          <p>Übersicht über den Lernfortschritt</p>
        </div>
        <div style={{ width: '2.5rem' }} />
      </header>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-value">📚 Klasse {progress.selectedGrade ?? '-'}</span>
          <span className="stat-label">Ausgewählte Klasse</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">🏆 Level {progress.level}</span>
          <span className="stat-label">Aktuelles Level</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">📝 {progress.totalExercisesDone}</span>
          <span className="stat-label">Aufgaben gelöst</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">🎯 {accuracy}%</span>
          <span className="stat-label">Treffergenauigkeit</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">🔥 {progress.streak}</span>
          <span className="stat-label">Tage-Streak</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">🥇 {progress.badges.length}</span>
          <span className="stat-label">Abzeichen</span>
        </div>
      </div>

      <h3 className="section-title">Einstellungen</h3>
      <div className="settings-row">
        <span className="settings-row-label">📚 Klasse {progress.selectedGrade ?? '-'}</span>
        <button className="secondary-button" onClick={onChangeGrade}>Klasse ändern</button>
      </div>

      <h3 className="section-title">Themenübersicht</h3>
      <div className="topic-progress-list">
        {TOPICS.map((topic, index) => (
          <div key={topic.id} className="topic-progress-row">
            <span className={`icon-circle icon-circle--sm ${ICON_COLORS[index % ICON_COLORS.length]}`}>{topic.icon}</span>
            <div className="topic-progress-info">
              <span>{topic.name} <small>(Klasse {topic.grade.join('-')})</small></span>
              <ProgressBar value={progress.topicProgress[topic.id] || 0} />
            </div>
          </div>
        ))}
      </div>

      <div className="parent-danger-zone">
        <h3 className="section-title">Fortschritt zurücksetzen</h3>
        <p>Setzt Level, XP, Abzeichen und alle gespeicherten Fortschritte zurück.</p>
        <button className={`danger-button ${confirmReset ? 'danger-confirm' : ''}`} onClick={handleReset}>
          {confirmReset ? 'Wirklich alles zurücksetzen?' : '🗑️ Fortschritt zurücksetzen'}
        </button>
        {confirmReset && (
          <button className="link-button" onClick={() => setConfirmReset(false)}>Abbrechen</button>
        )}
      </div>
    </div>
  );
}
