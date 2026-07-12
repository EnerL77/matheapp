import { UserProgress } from '../types';

interface HomeScreenProps {
  progress: UserProgress;
  onContinue: () => void;
  onOpenProfile: () => void;
  onOpenParentView: () => void;
}

export default function HomeScreen({ progress, onContinue, onOpenProfile, onOpenParentView }: HomeScreenProps) {
  return (
    <div className="screen home-screen">
      <div className="mascot">🧮</div>
      <h1 className="app-title">Hallo David! 👋</h1>
      <p className="app-subtitle">Bereit für neue Matheaufgaben?</p>

      <div className="stats-bar">
        <span className="stat-chip">⭐ Level {progress.level}</span>
        <span className="stat-chip">✨ {progress.xp} XP</span>
        <span className="stat-chip">🪙 {progress.coins}</span>
        <span className="stat-chip">🔥 {progress.streak} Tage</span>
      </div>

      <button className="primary-button home-cta" onClick={onContinue}>
        🚀 Weiter üben
      </button>

      <div className="home-links">
        <button className="link-button" onClick={onOpenProfile}>👤 Mein Profil</button>
        <button className="link-button" onClick={onOpenParentView}>👨‍👩‍👧 Für Eltern</button>
      </div>
    </div>
  );
}
