import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// CORS: lokal alle Ursprünge erlauben, auf Render nur das Frontend
const allowedOrigins = process.env.NODE_ENV === 'production'
  ? [process.env.FRONTEND_URL || ''].filter(Boolean)
  : ['http://localhost:5173', 'http://localhost:3000'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.length === 0) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error('CORS nicht erlaubt'));
  },
}));

app.use(express.json());

// Health Check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Aufgabe generieren
app.post('/api/generate-exercise', async (req, res) => {
  const { topicName, grade, difficulty } = req.body;

  if (!topicName || !grade || !difficulty) {
    return res.status(400).json({ error: 'topicName, grade und difficulty sind erforderlich' });
  }

  const prompt = `Du bist ein Mathe-Lehrer für deutsche Grundschule. Erstelle GENAU EINE Mathe-Aufgabe.

Thema: ${topicName}
Klassenstufe: Klasse ${grade}
Schwierigkeit: ${difficulty}

WICHTIGE REGELN:
- Die Aufgabe muss altersgerecht für Klasse ${grade} sein
- Verwende deutsche Begriffe
- Bei Klasse 1-2: sehr einfache Zahlen (bis 20 oder 100)
- Bei Klasse 3-4: mittlere Komplexität
- Bei Klasse 5-6: anspruchsvollere Aufgaben mit Dezimalzahlen, Prozent etc.

Antworte NUR mit diesem JSON-Format (kein Markdown, kein Text davor oder danach):
{
  "question": "Die Frage hier",
  "options": ["Antwort A", "Antwort B", "Antwort C", "Antwort D"],
  "correctIndex": 0,
  "explanation": "Kurze Erklärung warum die Antwort richtig ist",
  "hint": "Ein hilfreicher Tipp"
}

correctIndex ist 0-3 (Index der richtigen Antwort in options).
Die falschen Antworten sollen plausibel aber klar falsch sein.`;

  try {
    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      max_tokens: 500,
      response_format: { type: 'json_object' },
      messages: [{ role: 'user', content: prompt }],
    });

    const text = completion.choices[0]?.message?.content ?? '';
    const jsonMatch = text.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      throw new Error('Kein gültiges JSON in der Antwort');
    }

    const exercise = JSON.parse(jsonMatch[0]);
    return res.json(exercise);

  } catch (err) {
    console.error('Fehler bei Aufgabengenerierung:', err);
    // Fallback-Aufgabe
    return res.json({
      question: 'Was ist 7 + 5?',
      options: ['10', '11', '12', '13'],
      correctIndex: 2,
      explanation: '7 + 5 = 12. Zähle von 7 noch 5 weiter: 8, 9, 10, 11, 12.',
      hint: 'Zähle mit den Fingern weiter!',
    });
  }
});

app.listen(PORT, () => {
  console.log(`Backend läuft auf http://localhost:${PORT}`);
});
