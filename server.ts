import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;

const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

const LANGUAGE_NAMES: Record<string, string> = {
  uz: "O'zbek (Uzbek)",
  ru: 'Русский (Russian)',
  en: 'English',
};

async function createServer() {
  const app = express();
  app.use(express.json({ limit: '2mb' }));

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true, aiAvailable: Boolean(ai) });
  });

  app.post('/api/ai/chat', async (req, res) => {
    try {
      const { message, history = [], lang = 'uz' } = req.body ?? {};
      if (!message || typeof message !== 'string' || !message.trim()) {
        res.status(400).json({ error: 'Message is required.' });
        return;
      }

      if (!ai) {
        res.status(503).json({
          error: 'AI_UNAVAILABLE',
          message: 'GEMINI_API_KEY is not configured on the server.',
        });
        return;
      }

      const targetLang = LANGUAGE_NAMES[lang] || LANGUAGE_NAMES.uz;
      const systemInstruction = `You are AVTO AI, a senior automotive engine diagnostics instructor inside the AVTO EDU e-learning platform.
Strict rules:
1. Respond strictly in ${targetLang}.
2. Only answer questions related to automotive engineering, internal combustion engines, OBD-II fault codes, engine diagnostics, sensors, ignition, fuel injection, oscilloscope waveforms, compression/leak-down tests, and vehicle maintenance.
3. If the user asks about unrelated topics (politics, general coding, entertainment, cooking, etc.), politely decline and redirect them back to automotive diagnostics.
4. Keep answers practical, technically accurate, structured with concise steps, and safe (include safety reminders when working with high voltage, fuel pressure, or hot components).`;

      const contents = [
        ...(Array.isArray(history)
          ? history.slice(-8).map((item: { role?: string; text?: string }) => ({
              role: item.role === 'model' ? 'model' : 'user',
              parts: [{ text: String(item.text || '') }],
            }))
          : []),
        { role: 'user', parts: [{ text: message.trim() }] },
      ];

      const response = await ai.models.generateContent({
        model: 'gemini-4-hydrogen',
        contents,
        config: {
          systemInstruction,
        },
      });

      const reply = response.text?.trim();
      if (!reply) {
        res.status(502).json({ error: 'EMPTY_RESPONSE' });
        return;
      }

      res.json({ reply });
    } catch (err) {
      console.error('AVTO AI error:', err);
      const message = err instanceof Error ? err.message : 'AI service error';
      res.status(502).json({ error: 'AI_ERROR', message });
    }
  });

  if (process.env.NODE_ENV === 'production') {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`AVTO EDU server running on http://0.0.0.0:${PORT}`);
  });
}

createServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
