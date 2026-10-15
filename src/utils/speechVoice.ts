// MediGuide Enterprise Speech Engine
// Dual-layer audio synthesis:
// 1. Studio-quality Neural Urdu Voice via server-side Gemini TTS (/api/tts)
// 2. High-reliability Web Speech API fallback for offline capability

export interface VoiceSelection {
  voice: SpeechSynthesisVoice | null;
  mode: 'neural-tts' | 'native-urdu' | 'cloud-urdu' | 'standard';
  langTag: string;
  label: string;
}

/**
 * Checks if a string contains Urdu / Arabic script characters
 */
export function hasUrduScript(text: string): boolean {
  if (!text) return false;
  return /[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/.test(text);
}

/**
 * Detects common Roman Urdu healthcare words in queries
 */
const ROMAN_URDU_KEYWORDS = [
  'dard', 'dardh', 'sar', 'sir', 'jism', 'badan', 'bukhar', 'bokhar', 'khansi',
  'gala', 'nazla', 'zukam', 'zukham', 'dawa', 'dawai', 'dawae', 'goli', 'goliyan',
  'khorak', 'pait', 'pet', 'ulti', 'matli', 'dast', 'pani', 'garmi', 'loo',
  'sardi', 'barsaat', 'barish', 'dengue', 'dangi', 'panadol', 'paracetamol',
  'brufen', 'disprin', 'risek', 'nimkol', 'kya', 'kaise', 'kab', 'len', 'le',
  'ilaj', 'batao', 'bataen', 'chahiye', 'madad', 'haddi', 'pattha', 'patthon',
  'alamar', 'schedule', 'reminder', 'waqt', 'sehat', 'tabiat'
];

/**
 * Detects if a user query is in Urdu script or Roman Urdu
 */
export function isUrduOrRomanUrduQuery(query: string): boolean {
  if (!query) return false;
  if (hasUrduScript(query)) return true;

  const lower = query.toLowerCase();
  const words = lower.split(/[^a-z0-9]+/);
  let count = 0;
  for (const word of words) {
    if (ROMAN_URDU_KEYWORDS.includes(word)) {
      count++;
    }
  }
  return count >= 1;
}

/**
 * Normalizes user queries for intent matching
 */
export function normalizeQuery(query: string): string {
  if (!query) return '';
  return query
    .toLowerCase()
    .replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g, '') // Tashkeel
    .replace(/[آأإ]/g, 'ا')
    .replace(/[ةۃ]/g, 'ہ')
    .replace(/[يى]/g, 'ی')
    .replace(/[\s\-_,.:;!?،۔؟]+/g, ' ')
    .trim();
}

/**
 * Helper to test if normalized text contains ANY of the given phrases
 */
export function containsAny(text: string, phrases: string[]): boolean {
  const norm = normalizeQuery(text);
  return phrases.some((p) => {
    const normP = normalizeQuery(p);
    return norm.includes(normP);
  });
}

/**
 * Retrieves speech synthesis voices with guaranteed asynchronous resolution
 */
export function getAvailableVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      resolve([]);
      return;
    }

    const immediate = window.speechSynthesis.getVoices();
    if (immediate.length > 0) {
      resolve(immediate);
      return;
    }

    const handleVoicesChanged = () => {
      const voices = window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = null;
      resolve(voices);
    };

    window.speechSynthesis.onvoiceschanged = handleVoicesChanged;

    setTimeout(() => {
      const fallback = window.speechSynthesis.getVoices();
      resolve(fallback);
    }, 350);
  });
}

export function selectBestVoice(voices: SpeechSynthesisVoice[], targetLang: 'ur' | 'en'): VoiceSelection {
  if (targetLang === 'ur') {
    return {
      voice: null,
      mode: 'neural-tts',
      langTag: 'ur-PK',
      label: 'Gemini Neural Urdu Voice (HD)'
    };
  }

  const englishVoice = voices.find(v => v.lang.toLowerCase().startsWith('en-us')) ||
    voices.find(v => v.lang.toLowerCase().startsWith('en')) ||
    voices.find(v => v.default) ||
    voices[0];

  return {
    voice: englishVoice || null,
    mode: 'standard',
    langTag: englishVoice ? englishVoice.lang : 'en-US',
    label: englishVoice ? englishVoice.name : 'System Voice (en-US)'
  };
}

let activeAudio: HTMLAudioElement | null = null;
let activeUtterance: SpeechSynthesisUtterance | null = null;
let watchdogTimer: any = null;

/**
 * Universal, guaranteed speech function for MediGuide
 * Prioritizes high-definition neural voice from backend (/api/tts),
 * with graceful browser speech synthesis fallback for offline mode.
 */
export async function speakHealthcareText(
  text: string,
  targetLang: 'ur' | 'en',
  options: {
    rate?: number;
    pitch?: number;
    audioBase64?: string;
    onStart?: () => void;
    onEnd?: () => void;
    onError?: (err: any) => void;
  } = {}
): Promise<void> {
  // Stop any currently playing speech immediately
  stopHealthcareSpeech();

  const cleanText = text
    .replace(/[*_#`~[\]]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (!cleanText) {
    options.onEnd?.();
    return;
  }

  // 1. If audioBase64 is directly supplied or can be fetched from server
  if (options.audioBase64) {
    try {
      playBase64Audio(options.audioBase64, options);
      return;
    } catch (err) {
      console.warn('Direct base64 audio failed, trying API/client', err);
    }
  }

  // 2. Fetch neural spoken audio from /api/tts
  if (typeof window !== 'undefined' && navigator.onLine !== false) {
    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: cleanText, language: targetLang })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.audioBase64) {
          playBase64Audio(data.audioBase64, options);
          return;
        }
      }
    } catch (apiErr) {
      console.warn('Server TTS unavailable, falling back to local SpeechSynthesis', apiErr);
    }
  }

  // 3. Fallback: Browser Web Speech API (Offline or Server Error)
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }

      const voices = await getAvailableVoices();
      const nativeUrdu = voices.find(v => 
        v.lang.toLowerCase().startsWith('ur') || 
        v.name.toLowerCase().includes('urdu')
      );

      const utterance = new SpeechSynthesisUtterance(cleanText);
      if (nativeUrdu) {
        utterance.voice = nativeUrdu;
        utterance.lang = nativeUrdu.lang;
      } else {
        utterance.lang = targetLang === 'ur' ? 'ur-PK' : 'en-US';
      }

      utterance.rate = options.rate !== undefined ? options.rate : (targetLang === 'ur' ? 0.90 : 0.98);
      utterance.pitch = options.pitch !== undefined ? options.pitch : 1.0;

      activeUtterance = utterance;

      utterance.onstart = () => {
        options.onStart?.();
      };

      utterance.onend = () => {
        activeUtterance = null;
        options.onEnd?.();
      };

      utterance.onerror = (e) => {
        activeUtterance = null;
        console.warn('SpeechSynthesis error:', e);
        options.onError?.(e);
      };

      window.speechSynthesis.speak(utterance);
      return;
    } catch (e) {
      console.error('Speech synthesis fallback failed:', e);
      options.onError?.(e);
      return;
    }
  }

  options.onError?.(new Error('No audio playback available'));
}

/**
 * Plays a base64 WAV audio string cleanly with start/end handlers
 */
function playBase64Audio(
  base64Data: string,
  options: {
    rate?: number;
    onStart?: () => void;
    onEnd?: () => void;
    onError?: (err: any) => void;
  }
) {
  try {
    const audioUrl = `data:audio/wav;base64,${base64Data}`;
    const audio = new Audio(audioUrl);
    
    if (options.rate && options.rate !== 1) {
      audio.playbackRate = options.rate;
    }

    activeAudio = audio;

    audio.onplay = () => {
      options.onStart?.();
    };

    audio.onended = () => {
      activeAudio = null;
      options.onEnd?.();
    };

    audio.onerror = (e) => {
      activeAudio = null;
      console.warn('Audio playback error', e);
      options.onError?.(e);
    };

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn('Audio play was prevented or failed:', err);
        options.onError?.(err);
      });
    }
  } catch (err) {
    console.error('Failed to initialize Audio', err);
    options.onError?.(err);
  }
}

/**
 * Immediately cancels all ongoing speech synthesis and audio playback
 */
export function stopHealthcareSpeech(): void {
  // Stop active HTML Audio element
  if (activeAudio) {
    try {
      activeAudio.pause();
      activeAudio.currentTime = 0;
    } catch (e) {
      // ignore
    }
    activeAudio = null;
  }

  // Stop browser SpeechSynthesis
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {
      // ignore
    }
  }

  if (watchdogTimer) {
    clearInterval(watchdogTimer);
    watchdogTimer = null;
  }
  activeUtterance = null;
}
