import { BADGES, TOPICS } from '../data/curriculum';
import { UserProgress } from '../types';
import { useSoundSettings } from '../hooks/useSound';
import ProgressBar from './ui/ProgressBar';

interface ProfileScreenProps {
  progress: UserProgress;
  onBack: () => void;
}

export default function ProfileScreen({ progress, onBack }: ProfileScreenProps) {
  const { muted, toggleMuted } = useSoundSettings();
  const xpIntoLevel = progress.xp % 100;
  const accuracy = progress.totalExercisesDone > 0
    ? Math.round((progress.correctAnswers / progress.totalExercisesDone) * 100)
    : 0;

  const practicedTopics = TOPICS.filter(t => (progress.topicProgress[t.id] || 0) > 0);
  const ICON_COLORS = ['icon-violet', 'icon-teal', 'icon-orange', 'icon-pink', 'icon-blue'];

  return (
    <div className="screen profile-screen">
      <header className="topic-header">
        <button className="icon-button" onClick={onBack} title="Zurück">⬅️</button>
        <div className="topic-header-title">
          <h2>👤 Mein Profil</h2>
        </div>
        <div style={{ width: '2.5rem' }} />
      </header>

      <div className="profile-level-card">
        <span className="icon-circle icon-circle--lg icon-orange">🏆</span>
        <div>
          <h3>Level {progress.level}</h3>
          <ProgressBar value={xpIntoLevel} label={`${xpIntoLevel} / 100 XP bis Level ${progress.level + 1}`} />
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-value">✨ {progress.xp}</span>
          <span className="stat-label">Gesamt-XP</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">🪙 {progress.coins}</span>
          <span className="stat-label">Münzen</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">🔥 {progress.streak}</span>
          <span className="stat-label">Tage-Streak</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">🎯 {accuracy}%</span>
          <span className="stat-label">Treffergenauigkeit</span>
        </div>
      </div>

      <h3 className="section-title">Einstellungen</h3>
      <div className="settings-row">
        <span className="settings-row-label">{muted ? '🔇' : '🔊'} Soundeffekte</span>
        <button
          className={`toggle-switch ${muted ? '' : 'toggle-on'}`}
          onClick={toggleMuted}
          aria-pressed={!muted}
          title={muted ? 'Ton einschalten' : 'Ton ausschalten'}
        />
      </div>

      <h3 className="section-title">Abzeichen</h3>
      <div className="badges-grid">
        {BADGES.map(badge => {
          const earned = progress.badges.includes(badge.id);
          return (
            <div key={badge.id} className={`badge-tile ${earned ? 'badge-earned' : 'badge-locked'}`} title={badge.description}>
              <span className={`icon-circle icon-circle--md ${earned ? 'icon-orange' : ''}`}>{earned ? badge.icon : '🔒'}</span>
              <span className="badge-name">{badge.name}</span>
            </div>
          );
        })}
      </div>

      {practicedTopics.length > 0 && (
        <>
          <h3 className="section-title">Fortschritt nach Thema</h3>
          <div className="topic-progress-list">
            {practicedTopics.map((topic, index) => (
              <div key={topic.id} className="topic-progress-row">
                <span className={`icon-circle icon-circle--sm ${ICON_COLORS[index % ICON_COLORS.length]}`}>{topic.icon}</span>
                <div className="topic-progress-info">
                  <span>{topic.name}</span>
                  <ProgressBar value={progress.topicProgress[topic.id] || 0} />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
