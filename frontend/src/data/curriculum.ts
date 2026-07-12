import { Topic } from '../types';

export const TOPICS: Topic[] = [
  { id: 'zaehlen', name: 'Zählen & Mengen', grade: [1, 2], icon: '🔢', description: 'Zahlen bis 100 kennenlernen', exampleKeywords: ['Zahlen', 'Mengen', 'zählen'] },
  { id: 'addition-grundlagen', name: 'Addition (Grundlagen)', grade: [1, 2], icon: '➕', description: 'Einfache Additionsaufgaben', exampleKeywords: ['plus', 'zusammenzählen', 'addieren'] },
  { id: 'subtraktion-grundlagen', name: 'Subtraktion (Grundlagen)', grade: [1, 2], icon: '➖', description: 'Einfache Subtraktionsaufgaben', exampleKeywords: ['minus', 'wegnehmen', 'subtrahieren'] },
  { id: 'zahlenstrahl', name: 'Zahlenstrahl', grade: [1, 2], icon: '📏', description: 'Zahlen auf dem Zahlenstrahl', exampleKeywords: ['Zahlenstrahl', 'Reihenfolge'] },
  { id: 'geometrie-grundlagen', name: 'Formen & Figuren', grade: [1, 2], icon: '🔷', description: 'Grundlegende geometrische Formen', exampleKeywords: ['Kreis', 'Quadrat', 'Dreieck'] },
  { id: 'einmaleins', name: 'Einmaleins', grade: [3, 4], icon: '✖️', description: 'Multiplikation bis 10×10', exampleKeywords: ['Einmaleins', 'Multiplikation', 'mal'] },
  { id: 'schriftliche-addition', name: 'Schriftliches Addieren', grade: [3, 4], icon: '📝', description: 'Große Zahlen schriftlich addieren', exampleKeywords: ['schriftlich addieren', 'Übertrag'] },
  { id: 'schriftliche-subtraktion', name: 'Schriftliches Subtrahieren', grade: [3, 4], icon: '📝', description: 'Große Zahlen schriftlich subtrahieren', exampleKeywords: ['schriftlich subtrahieren'] },
  { id: 'division', name: 'Division', grade: [3, 4], icon: '➗', description: 'Teilen und Reste', exampleKeywords: ['dividieren', 'teilen', 'Rest'] },
  { id: 'brueche-einfuehrung', name: 'Brüche (Einführung)', grade: [3, 4], icon: '½', description: 'Einfache Brüche verstehen', exampleKeywords: ['Brüche', 'Hälfte', 'Viertel'] },
  { id: 'zeitrechnung', name: 'Zeitrechnung', grade: [3, 4], icon: '⏰', description: 'Uhrzeit und Zeitspannen', exampleKeywords: ['Uhr', 'Zeit', 'Stunden', 'Minuten'] },
  { id: 'sachaufgaben', name: 'Sachaufgaben', grade: [3, 4], icon: '📖', description: 'Textaufgaben lösen', exampleKeywords: ['Sachaufgabe', 'Textaufgabe'] },
  { id: 'dezimalzahlen', name: 'Dezimalzahlen', grade: [5, 6], icon: '🔡', description: 'Rechnen mit Kommazahlen', exampleKeywords: ['Dezimalzahlen', 'Komma', 'Nachkommastellen'] },
  { id: 'prozent', name: 'Prozentrechnung', grade: [5, 6], icon: '💯', description: 'Prozente berechnen', exampleKeywords: ['Prozent', '%', 'Prozentwert'] },
  { id: 'negative-zahlen', name: 'Negative Zahlen', grade: [5, 6], icon: '🌡️', description: 'Rechnen mit negativen Zahlen', exampleKeywords: ['negative Zahlen', 'Minus vor der Zahl'] },
  { id: 'flaechen', name: 'Flächen & Umfang', grade: [5, 6], icon: '📐', description: 'Flächen und Umfänge berechnen', exampleKeywords: ['Fläche', 'Umfang', 'Quadratmeter'] },
  { id: 'volumen', name: 'Volumen', grade: [5, 6], icon: '📦', description: 'Rauminhalt berechnen', exampleKeywords: ['Volumen', 'Rauminhalt', 'Kubikmeter'] },
  { id: 'brueche-erweitert', name: 'Brüche (Erweitert)', grade: [5, 6], icon: '🔢', description: 'Brüche kürzen, erweitern, rechnen', exampleKeywords: ['Brüche kürzen', 'erweitern', 'gemischte Zahlen'] },
];

export const BADGES = [
  { id: 'first_exercise', name: 'Erste Aufgabe!', icon: '🌟', description: 'Deine erste Aufgabe gelöst' },
  { id: 'streak_3', name: '3-Tage-Streak', icon: '🔥', description: '3 Tage in Folge gelernt' },
  { id: 'streak_7', name: '7-Tage-Streak', icon: '🚀', description: '7 Tage in Folge gelernt' },
  { id: 'level_5', name: 'Level 5', icon: '🏅', description: 'Level 5 erreicht' },
  { id: 'level_10', name: 'Level 10', icon: '🥇', description: 'Level 10 erreicht' },
  { id: 'perfect_round', name: 'Perfekte Runde', icon: '💎', description: '5 Aufgaben ohne Fehler' },
  { id: 'explorer', name: 'Entdecker', icon: '🗺️', description: '5 verschiedene Themen ausprobiert' },
];
