import { Grade } from '../types';

interface StartScreenProps {
  onSelectGrade: (grade: Grade) => void;
  onOpenParentView: () => void;
}

const GRADES: { grade: Grade; emoji: string; color: string }[] = [
  { grade: 1, emoji: '🐣', color: 'icon-violet' },
  { grade: 2, emoji: '🐥', color: 'icon-orange' },
  { grade: 3, emoji: '🦊', color: 'icon-pink' },
  { grade: 4, emoji: '🐯', color: 'icon-teal' },
  { grade: 5, emoji: '🦁', color: 'icon-blue' },
  { grade: 6, emoji: '🦉', color: 'icon-violet' },
];

export default function StartScreen({ onSelectGrade, onOpenParentView }: StartScreenProps) {
  return (
    <div className="screen start-screen">
      <div className="mascot">🧮</div>
      <h1 className="app-title">Davids Mathe App</h1>
      <p className="app-subtitle">Wähle deine Klasse und starte das Abenteuer!</p>

      <div className="grade-grid">
        {GRADES.map(({ grade, emoji, color }) => (
          <button key={grade} className="grade-card" onClick={() => onSelectGrade(grade)}>
            <span className={`icon-circle icon-circle--lg ${color}`}>{emoji}</span>
            <span className="grade-label">Klasse {grade}</span>
          </button>
        ))}
      </div>

      <button className="link-button" onClick={onOpenParentView}>
        👨‍👩‍👧 Für Eltern
      </button>
    </div>
  );
}
