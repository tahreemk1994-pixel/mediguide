import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

const ai = new GoogleGenAI({});

// In-memory cache for fast, instant audio playback of high-frequency healthcare phrases
const ttsCache = new Map<string, string>();

/**
 * Text-to-Speech endpoint powered by Gemini TTS (gemini-3.8-flash-lite-tts)
 * Produces authentic, natural spoken audio (WAV, 24kHz) in Urdu and English.
 */
app.post('/api/tts', async (req, res) => {
  try {
    const { text, language = 'ur' } = req.body;
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text is required' });
    }

    const cleanText = text.replace(/[*_#`~[\]]/g, '').trim().slice(0, 1000);
    const cacheKey = `${language}:${cleanText}`;

    if (ttsCache.has(cacheKey)) {
      return res.json({ audioBase64: ttsCache.get(cacheKey), format: 'audio/wav', cached: true });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash-lite-tts',
      contents: [{
        role: 'user',
        parts: [{
          text: cleanText,
          speechMetadata: {
            style: language === 'ur'
              ? 'Clear, calm, empathetic and professional healthcare assistant in Urdu'
              : 'Clear, reassuring and professional medical voice assistant'
          }
        }]
      }],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' }
          }
        }
      }
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) {
      return res.status(500).json({ error: 'No audio generated' });
    }

    if (ttsCache.size > 150) {
      const firstKey = ttsCache.keys().next().value;
      if (firstKey) ttsCache.delete(firstKey);
    }
    ttsCache.set(cacheKey, base64Audio);

    return res.json({ audioBase64: base64Audio, format: 'audio/wav', cached: false });
  } catch (err: any) {
    console.error('TTS API error:', err);
    return res.status(500).json({ error: 'TTS generation failed', details: err?.message });
  }
});

/**
 * AI Voice Assistant intelligent query endpoint (gemini-3.8-flash)
 * Accurately analyzes any spoken or typed query, returns clinical advice and spoken WAV audio.
 */
app.post('/api/voice-query', async (req, res) => {
  try {
    const { query, language = 'ur' } = req.body;
    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }

    const systemPrompt = language === 'ur'
      ? `آپ "میڈی گائیڈ" کے مستند، ہمدرد اور پیشہ ور پاکستانی اردو ہیلتھ اسسٹنٹ ہیں۔
صارف کے طبی سوالات (جیسے شدید جسم درد، سر درد، موسمی فلو، ڈینگی کے بخار، پیراسیٹامول، بروفین یا ادویات کے محفوظ استعمال) کا جواب آسان، عام فہم اور مستند اردو میں دیں۔
ضروری ہدایات:
1. جواب 2 سے 3 جملوں میں مختصر، واضح اور تسلی بخش ہو۔
2. شدید جسم یا سر درد کے لیے پیراسیٹامول (زیادہ سے زیادہ 4 گرام روزانہ) کو پہلی ترجیح بتائیں۔
3. ڈینگی یا وائرل بخار میں بروفین یا اسپرین سے سختی سے منع کریں کیونکہ یہ خون پتلا کرتی ہیں۔
4. اگر جان لیوا علامات (سینے میں شدید درد، دم گھٹنا، بے ہوشی) ہوں تو فوراً ریسکیو 1122 کال کرنے کا مشورہ دیں۔
5. غیر ضروری میڈیکل اصطلاحات کے بجائے سادہ اردو زبان استعمال کریں۔`
      : `You are the MediGuide bilingual healthcare assistant. Provide concise, 2-3 sentence evidence-based guidance. Recommend Paracetamol as first-line for severe bodyache/headache (max 4000mg/24h), strictly warn against Ibuprofen/Aspirin in Dengue/monsoon fever, and advise Rescue 1122 for emergencies.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: [{
        role: 'user',
        parts: [{ text: query }]
      }],
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.2,
      }
    });

    const replyText = response.text?.trim() || (language === 'ur' 
      ? 'شدید جسم درد اور سر درد کے لیے پیراسیٹامول محفوظ ترین دوا ہے۔ ڈینگی میں بروفین سے پرہیز کریں۔'
      : 'For severe bodyache and headache, Paracetamol is the safest first-line analgesic.');

    // Determine relevant action tab
    const lowerQuery = query.toLowerCase();
    let actionTab = 'seasonal';
    let actionLabel = language === 'ur' ? 'موسمی امراض و درد گائیڈ دیکھیں' : 'View Pain Protocols';

    if (lowerQuery.includes('reminder') || lowerQuery.includes('الرٹ') || lowerQuery.includes('شیڈول') || lowerQuery.includes('وقت')) {
      actionTab = 'reminders';
      actionLabel = language === 'ur' ? 'دوائیوں کے الرٹس کھولیں' : 'Open Reminders';
    } else if (lowerQuery.includes('paracetamol') || lowerQuery.includes('brufen') || lowerQuery.includes('پیراسیٹامول') || lowerQuery.includes('بروفین') || lowerQuery.includes('دوا')) {
      actionTab = 'medicines';
      actionLabel = language === 'ur' ? 'ضروری ادویات کا صفحہ دیکھیں' : 'View Medicines';
    } else if (lowerQuery.includes('1122') || lowerQuery.includes('ایمرجنسی') || lowerQuery.includes('سینے')) {
      actionTab = 'safety';
      actionLabel = language === 'ur' ? 'ایمرجنسی سینٹر دیکھیں' : 'Emergency Center';
    } else if (lowerQuery.includes('cbc') || lowerQuery.includes('رپورٹ') || lowerQuery.includes('خون') || lowerQuery.includes('شوگر')) {
      actionTab = 'reports';
      actionLabel = language === 'ur' ? 'لیب رپورٹس کھولیں' : 'Open Reports';
    }

    // Generate spoken audio for this response
    let audioBase64: string | null = null;
    try {
      const cleanSpoken = replyText.replace(/[*_#`~[\]]/g, '').trim().slice(0, 1000);
      const cacheKey = `${language}:${cleanSpoken}`;

      if (ttsCache.has(cacheKey)) {
        audioBase64 = ttsCache.get(cacheKey)!;
      } else {
        const ttsResp = await ai.models.generateContent({
          model: 'gemini-3.8-flash-lite-tts',
          contents: [{
            role: 'user',
            parts: [{
              text: cleanSpoken,
              speechMetadata: {
                style: language === 'ur'
                  ? 'Clear, calm, empathetic healthcare voice in Urdu'
                  : 'Clear and reassuring medical voice'
              }
            }]
          }],
          config: {
            responseModalities: ['AUDIO'],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName: 'Kore' }
              }
            }
          }
        });
        audioBase64 = ttsResp.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data || null;
        if (audioBase64) {
          ttsCache.set(cacheKey, audioBase64);
        }
      }
    } catch (e) {
      console.warn('TTS on query failed, falling back to client speech', e);
    }

    return res.json({
      text: replyText,
      audioBase64,
      actionTab,
      actionLabel,
      language
    });
  } catch (err: any) {
    console.error('Voice query API error:', err);
    return res.status(500).json({ error: 'Voice query failed', details: err?.message });
  }
});

// Dev vs Prod Vite mounting
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(port), '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
  });
}

startServer();
