import { Grade, Topic, UserProgress } from '../types';
import { TOPICS } from '../data/curriculum';
import ProgressBar from './ui/ProgressBar';

interface TopicSelectorProps {
  grade: Grade;
  progress: UserProgress;
  onSelectTopic: (topic: Topic) => void;
  onBack: () => void;
  onOpenProfile: () => void;
}

const ICON_COLORS = ['icon-violet', 'icon-teal', 'icon-orange', 'icon-pink', 'icon-blue'];

export default function TopicSelector({ grade, progress, onSelectTopic, onBack, onOpenProfile }: TopicSelectorProps) {
  const topics = TOPICS.filter(t => t.grade.includes(grade));

  return (
    <div className="screen topic-screen">
      <header className="topic-header">
        <button className="icon-button" onClick={onBack} title="Zurück">
          ⬅️
        </button>
        <div className="topic-header-title">
          <h2>Klasse {grade}</h2>
          <p>Wähle ein Thema zum Üben</p>
        </div>
        <button className="icon-button profile-button" onClick={onOpenProfile} title="Profil">
          👤
        </button>
      </header>

      <div className="stats-bar">
        <span className="stat-chip">⭐ Level {progress.level}</span>
        <span className="stat-chip">✨ {progress.xp} XP</span>
        <span className="stat-chip">🪙 {progress.coins}</span>
        <span className="stat-chip">🔥 {progress.streak} Tage</span>
      </div>

      <div className="topic-grid">
        {topics.map((topic, index) => {
          const topicXp = progress.topicProgress[topic.id] || 0;
          return (
            <button key={topic.id} className="topic-card" onClick={() => onSelectTopic(topic)}>
              <div className={`icon-circle icon-circle--md ${ICON_COLORS[index % ICON_COLORS.length]}`}>{topic.icon}</div>
              <div className="topic-info">
                <h3>{topic.name}</h3>
                <p>{topic.description}</p>
                <ProgressBar value={topicXp} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
