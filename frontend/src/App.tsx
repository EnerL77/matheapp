import { useState } from 'react';
import { Difficulty, Grade, Screen, Topic } from './types';
import { applyRound, RoundOutcome, useProgress } from './hooks/useProgress';
import StartScreen from './components/StartScreen';
import HomeScreen from './components/HomeScreen';
import TopicSelector from './components/TopicSelector';
import ExerciseScreen from './components/ExerciseScreen';
import ResultScreen from './components/ResultScreen';
import ProfileScreen from './components/ProfileScreen';
import ParentView from './components/ParentView';

function getDifficulty(topicProgressValue: number): Difficulty {
  if (topicProgressValue < 40) return 'leicht';
  if (topicProgressValue < 80) return 'mittel';
  return 'schwer';
}

export default function App() {
  const { progress, setGrade, updateProgress, resetProgress } = useProgress();
  const [screen, setScreen] = useState<Screen>(progress.selectedGrade ? 'home' : 'start');
  const [previousScreen, setPreviousScreen] = useState<Screen>('start');
  const [currentTopic, setCurrentTopic] = useState<Topic | null>(null);
  const [roundOutcome, setRoundOutcome] = useState<(RoundOutcome & { correct: number; total: number }) | null>(null);

  const handleSelectGrade = (grade: Grade) => {
    setGrade(grade);
    setScreen('topics');
  };

  const handleSelectTopic = (topic: Topic) => {
    setCurrentTopic(topic);
    setScreen('exercise');
  };

  const handleOpenParentView = (from: Screen) => {
    setPreviousScreen(from);
    setScreen('parent');
  };

  const handleOpenProfile = (from: Screen) => {
    setPreviousScreen(from);
    setScreen('profile');
  };

  const handleFinishExercise = (result: { correct: number; total: number }) => {
    if (!currentTopic) return;
    const outcome = applyRound(progress, currentTopic.id, result.correct, result.total);
    updateProgress(outcome.progress);
    setRoundOutcome({ ...outcome, correct: result.correct, total: result.total });
    setScreen('result');
  };

  const handleResetProgress = () => {
    resetProgress();
    setScreen('start');
  };

  return (
    <div className="app-shell">
      {screen === 'start' && (
        <StartScreen
          onSelectGrade={handleSelectGrade}
          onOpenParentView={() => handleOpenParentView('start')}
        />
      )}

      {screen === 'home' && progress.selectedGrade && (
        <HomeScreen
          progress={progress}
          onContinue={() => setScreen('topics')}
          onOpenProfile={() => handleOpenProfile('home')}
          onOpenParentView={() => handleOpenParentView('home')}
        />
      )}

      {screen === 'topics' && progress.selectedGrade && (
        <TopicSelector
          grade={progress.selectedGrade}
          progress={progress}
          onSelectTopic={handleSelectTopic}
          onBack={() => setScreen('home')}
          onOpenProfile={() => handleOpenProfile('topics')}
        />
      )}

      {screen === 'exercise' && currentTopic && progress.selectedGrade && (
        <ExerciseScreen
          topic={currentTopic}
          grade={progress.selectedGrade}
          difficulty={getDifficulty(progress.topicProgress[currentTopic.id] || 0)}
          onFinish={handleFinishExercise}
          onExit={() => setScreen('topics')}
        />
      )}

      {screen === 'result' && currentTopic && roundOutcome && (
        <ResultScreen
          topic={currentTopic}
          correct={roundOutcome.correct}
          total={roundOutcome.total}
          xpEarned={roundOutcome.xpEarned}
          newBadges={roundOutcome.newBadges}
          onContinue={() => setScreen('topics')}
          onRetry={() => setScreen('exercise')}
        />
      )}

      {screen === 'profile' && (
        <ProfileScreen progress={progress} onBack={() => setScreen(previousScreen)} />
      )}

      {screen === 'parent' && (
        <ParentView
          progress={progress}
          onBack={() => setScreen(previousScreen)}
          onResetProgress={handleResetProgress}
          onChangeGrade={() => setScreen('start')}
        />
      )}
    </div>
  );
}
