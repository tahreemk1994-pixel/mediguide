import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Send, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  RotateCcw, 
  MessageSquare, 
  Zap, 
  Activity, 
  Flame, 
  PhoneCall, 
  AlertTriangle, 
  Pill, 
  Bell,
  Gauge,
  Play,
  Pause,
  Headphones,
  Check,
  X,
  Loader2,
  Radio
} from 'lucide-react';
import { ActiveTab, Language } from '../types';
import { MEDICINES_DATA } from '../data/medicines';
import { TRANSLATIONS } from '../data/translations';
import { 
  speakHealthcareText, 
  stopHealthcareSpeech, 
  selectBestVoice, 
  getAvailableVoices, 
  normalizeQuery,
  isUrduOrRomanUrduQuery,
  hasUrduScript,
  containsAny
} from '../utils/speechVoice';

interface VoiceAssistantProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  setActiveTab: (tab: ActiveTab) => void;
  onSearchMedicine: (med: string) => void;
}

interface AssistantResponse {
  text: string;
  actionTab?: ActiveTab;
  actionPayload?: string;
  suggestedActionLabel?: string;
  audioBase64?: string;
}

export const VoiceAssistant: React.FC<VoiceAssistantProps> = ({
  language,
  setLanguage,
  setActiveTab,
  onSearchMedicine,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isListeningModalOpen, setIsListeningModalOpen] = useState(false);
  const [listeningSeconds, setListeningSeconds] = useState(0);
  const [micVolume, setMicVolume] = useState(0);
  const [typedInput, setTypedInput] = useState('');
  const [statusText, setStatusText] = useState<string>('');
  const [liveTranscript, setLiveTranscript] = useState<string>('');
  const [speechRecognitionSupported, setSpeechRecognitionSupported] = useState(true);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isProcessingAI, setIsProcessingAI] = useState(false);
  const [voiceModeLabel, setVoiceModeLabel] = useState<string>('Gemini Neural Voice');
  const [lastAnswer, setLastAnswer] = useState<string>('');
  const [lastAnswerAudio, setLastAnswerAudio] = useState<string | null>(null);
  const [activeGuideId, setActiveGuideId] = useState<string | null>(null);

  const [conversation, setConversation] = useState<Array<{ 
    sender: 'user' | 'assistant'; 
    text: string; 
    actionTab?: ActiveTab; 
    actionPayload?: string; 
    actionLabel?: string;
    audioBase64?: string;
  }>>([]);

  const recognitionRef = useRef<any>(null);
  const listeningIntervalRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const t = TRANSLATIONS[language];

  // Play gentle auditory feedback chime via Web Audio API
  const playChime = (frequency = 600, duration = 0.12) => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // AudioContext blocked
    }
  };

  // Start real microphone volume analyser to show active voice reaction
  const startMicAnalyser = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return;
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      analyserRef.current = analyser;

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const checkVolume = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        const avg = sum / bufferLength;
        const normalized = Math.min(100, Math.round((avg / 128) * 100));
        setMicVolume(normalized);
        animFrameRef.current = requestAnimationFrame(checkVolume);
      };

      checkVolume();
    } catch (err) {
      console.warn('Microphone stream access not granted or blocked in iframe:', err);
      setMicVolume(0);
    }
  };

  const stopMicAnalyser = () => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(t => t.stop());
      mediaStreamRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      try {
        audioContextRef.current.close();
      } catch (e) {
        // ignore
      }
      audioContextRef.current = null;
    }
    setMicVolume(0);
  };

  // Detect and update voice capability badge
  useEffect(() => {
    const checkVoice = async () => {
      const voices = await getAvailableVoices();
      const selection = selectBestVoice(voices, language);
      setVoiceModeLabel(selection.label);
    };

    checkVoice();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = checkVoice;
    }
  }, [language]);

  // Initialize Speech Recognition on Mount or Language Change
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechRecognitionSupported(false);
      setStatusText(
        language === 'ur'
          ? 'براؤزر میں براہ راست مائیک کی سہولت محدود ہے۔ نیچے دیے گئے کارڈز پر کلک کریں یا لکھیں، مکمل اردو آواز موصول ہوگی۔'
          : 'Direct speech recognition is limited in this browser window. Please tap quick prompt cards or type below.'
      );
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.maxAlternatives = 3;
      recognition.lang = language === 'ur' ? 'ur-PK' : 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setListeningSeconds(0);
        setLiveTranscript('');
        if (listeningIntervalRef.current) clearInterval(listeningIntervalRef.current);
        listeningIntervalRef.current = setInterval(() => {
          setListeningSeconds((prev) => prev + 1);
        }, 1000);

        playChime(680, 0.15);
        setStatusText(
          language === 'ur'
            ? 'سن رہا ہوں... اپنا طبی سوال واضح طور پر بولیں'
            : 'Listening... Please speak your health query clearly now'
        );
      };

      recognition.onresult = (event: any) => {
        let interim = '';
        let final = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            final += event.results[i][0].transcript;
          } else {
            interim += event.results[i][0].transcript;
          }
        }

        const currentText = final || interim;
        setLiveTranscript(currentText);

        if (final) {
          setIsListening(false);
          setIsListeningModalOpen(false);
          stopMicAnalyser();
          if (listeningIntervalRef.current) clearInterval(listeningIntervalRef.current);

          playChime(850, 0.1);
          setStatusText(
            language === 'ur'
              ? `آپ نے فرمایا: "${final}" — جواب تیار ہے`
              : `You asked: "${final}" — Processing answer`
          );
          handleProcessQuery(final);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition event:', event.error);
        if (event.error === 'not-allowed') {
          setStatusText(
            language === 'ur'
              ? 'مائیک کی اجازت درکار ہے۔ نیچے دیے گئے فوری سوالات پر کلک کریں، آواز میں جواب چلے گا۔'
              : 'Microphone permission blocked. Click any quick question tile below for audio.'
          );
        } else if (event.error === 'no-speech') {
          setStatusText(
            language === 'ur'
              ? 'کوئی آواز نہیں سنی گئی۔ دوبارہ مائیک دبائیں یا نیچے دیے گئے سوالات پر کلک کریں۔'
              : 'No speech detected. Please tap mic again or click a quick prompt below.'
          );
        }
      };

      recognition.onend = () => {
        setIsListening(false);
        if (listeningIntervalRef.current) clearInterval(listeningIntervalRef.current);
      };

      recognitionRef.current = recognition;
    } catch (e) {
      setSpeechRecognitionSupported(false);
      setStatusText(
        language === 'ur'
          ? 'مائیک اس براؤزر میں محدود ہے۔ نیچے دیے گئے سوالات پر کلک کریں۔'
          : 'Voice recognition not supported. Tap quick question tiles.'
      );
    }

    // Default welcome message
    if (conversation.length === 0) {
      const initialWelcome = language === 'ur'
        ? 'السلام علیکم! میں آپ کا میڈی گائیڈ اردو AI وائس اسسٹنٹ ہوں۔ آپ مجھ سے شدید جسم درد، سر درد، سردی کے فلو، ڈینگی یا کسی بھی دوا کے بارے میں بول کر، لکھ کر یا نیچے دیے گئے سوالات پر کلک کر کے فوری آواز میں رہنمائی حاصل کر سکتے ہیں۔'
        : 'Hello! I am your MediGuide AI Health Voice Assistant. Ask me about severe bodyache, headache relief, winter flu, dengue fever, or any medicine hands-free.';

      setConversation([{ sender: 'assistant', text: initialWelcome }]);
      setLastAnswer(initialWelcome);
    }

    return () => {
      if (listeningIntervalRef.current) clearInterval(listeningIntervalRef.current);
      stopMicAnalyser();
      stopHealthcareSpeech();
    };
  }, [language]);

  // Update recognition language dynamically
  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = language === 'ur' ? 'ur-PK' : 'en-US';
    }
  }, [language]);

  const startListening = () => {
    stopSpeaking();
    setIsListeningModalOpen(true);
    setLiveTranscript('');
    startMicAnalyser();

    if (recognitionRef.current) {
      try {
        recognitionRef.current.lang = language === 'ur' ? 'ur-PK' : 'en-US';
        recognitionRef.current.start();
      } catch (err) {
        try {
          recognitionRef.current.stop();
          setTimeout(() => {
            recognitionRef.current?.start();
          }, 200);
        } catch (e) {
          console.warn('Recognition start retry error:', e);
        }
      }
    }
  };

  const handleStopListeningAndSubmit = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // ignore
      }
    }
    stopMicAnalyser();
    setIsListening(false);
    setIsListeningModalOpen(false);

    if (liveTranscript.trim()) {
      handleProcessQuery(liveTranscript.trim());
    } else {
      setStatusText(
        language === 'ur'
          ? 'کوئی آواز موصول نہیں ہوئی۔ نیچے دیے گئے سوالات میں سے کسی ایک پر کلک کریں۔'
          : 'No voice heard. Please click any prompt below.'
      );
    }
  };

  const handleCancelListeningModal = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // ignore
      }
    }
    stopMicAnalyser();
    setIsListening(false);
    setIsListeningModalOpen(false);
  };

  const stopSpeaking = () => {
    stopHealthcareSpeech();
    setIsSpeaking(false);
    setActiveGuideId(null);
  };

  // Robust Speech Output
  const speakText = (text: string, forceLang?: Language, audioBase64?: string) => {
    const speakLang = forceLang || language;
    if (!autoSpeak) return;

    speakHealthcareText(text, speakLang, {
      rate: speechRate,
      audioBase64,
      onStart: () => setIsSpeaking(true),
      onEnd: () => {
        setIsSpeaking(false);
        setActiveGuideId(null);
      },
      onError: () => {
        setIsSpeaking(false);
        setActiveGuideId(null);
      },
    });
  };

  // Test Speech Audio Function
  const handleTestAudio = () => {
    const testPhrase = language === 'ur'
      ? 'السلام علیکم! میڈی گائیڈ کی اردو آواز فعال ہے۔ آپ کا خیر مقدم ہے۔'
      : 'Hello! MediGuide voice assistant is working properly on your device.';

    speakHealthcareText(testPhrase, language, {
      rate: speechRate,
      onStart: () => setIsSpeaking(true),
      onEnd: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
    });
  };

  /**
   * Fast Local Intent Matcher for instantaneous offline responses
   */
  const matchLocalIntent = (rawQuery: string): { response: AssistantResponse; targetLang: Language } => {
    const q = normalizeQuery(rawQuery);
    const isUrdu = language === 'ur' || hasUrduScript(rawQuery) || isUrduOrRomanUrduQuery(rawQuery);
    const respLang: Language = isUrdu ? 'ur' : 'en';

    // Severe Bodyache & Muscle Pain Intent
    if (
      containsAny(q, [
        'جسم درد', 'جسم میں درد', 'ہڈیوں کا درد', 'پٹھوں کا درد', 'بدن درد', 'ہڈی درد', 'پٹھہ', 'کھچاؤ',
        'bodyache', 'body ache', 'body pain', 'badan dard', 'jism dard', 'haddi dard', 'myalgia', 'muscle pain'
      ]) || (q.includes('جسم') && q.includes('درد')) || (q.includes('ہڈی') && q.includes('درد'))
    ) {
      return {
        targetLang: respLang,
        response: {
          text: respLang === 'ur'
            ? 'شدید جسمانی اور ہڈیوں کے درد کے لیے: پیراسیٹامول (500 سے 1000 ملی گرام یعنی 1 یا 2 گولی، 24 گھنٹے میں زیادہ سے زیادہ 4 گرام یعنی 8 گولیاں) سب سے محفوظ بنیادی دوا ہے۔ اگر معدے کا السر نہ ہو تو کھانے کے بعد آئیبوپروفین 400 ملی گرام لی جا سکتی ہے۔ اہم ترین تنبیہ: برسات یا ڈینگی کے موسم میں بروفین یا اسپرین ہرگز نہ لیں، صرف پیراسیٹامول لیں۔'
            : 'For severe bodyache: Paracetamol (500mg-1000mg every 6-8 hrs, max 4000mg/24h) is the safest first-line analgesic. Ibuprofen (400mg) can be taken strictly with food if not contraindicated. In Dengue or monsoon season, strictly avoid Ibuprofen/Aspirin due to hemorrhage danger.',
          actionTab: 'seasonal',
          suggestedActionLabel: respLang === 'ur' ? 'درد اور موسمی امراض کے اصول دیکھیں' : 'Open Pain & Weather Protocols',
        }
      };
    }

    // Severe Headache Intent
    if (
      containsAny(q, [
        'سر درد', 'سر میں درد', 'ادھے سر کا درد', 'مائیگرین', 'شدید سر درد', 'ماتھے میں درد',
        'headache', 'head ache', 'head pain', 'sar dard', 'sir dard', 'sar me dard', 'sir me dard', 'migraine'
      ]) || (q.includes('سر') && q.includes('درد'))
    ) {
      return {
        targetLang: respLang,
        response: {
          text: respLang === 'ur'
            ? 'شدید سر درد کے لیے: سب سے پہلے فوری طور پر دو گلاس صاف پانی پئیں کیونکہ 70 فیصد سر درد پانی کی کمی یا ذہنی دباؤ سے ہوتا ہے۔ پیراسیٹامول 1000 ملی گرام یا کھانے کے بعد آئیبوپروفین 400 ملی گرام لیں اور مدہم روشنی والے پرسکون کمرے میں آرام کریں۔ ہنگامی تنبیہ: اگر سر درد اچانک بجلی کی طرح شدید ہو یا گردن اکڑ جائے تو فوراً 1122 ملائیں۔'
            : 'For severe headache: First drink 2 glasses of water (hydration resolves many tension headaches). Paracetamol 1000mg or Ibuprofen 400mg with food are first-line. Rest in a dim quiet room. Seek emergency help (1122) if headache is sudden thunderclap or accompanied by stiff neck.',
          actionTab: 'seasonal',
          suggestedActionLabel: respLang === 'ur' ? 'سر درد کے اصول دیکھیں' : 'Review Headache Protocols',
        }
      };
    }

    // Dengue & Monsoon Directive
    if (
      containsAny(q, [
        'ڈینگی', 'ڈینگو', 'برسات', 'مچھر', 'پلیٹ لیٹ', 'بروفین منع',
        'dengue', 'dangi', 'monsoon', 'barish', 'breakbone', 'platelet'
      ])
    ) {
      return {
        targetLang: respLang,
        response: {
          text: respLang === 'ur'
            ? 'ڈینگی اور برسات کی جان بچانے والی اہم ترین ہدایت: ڈینگی کے بخار اور شدید جسم درد میں اسپرین، ڈسپرین یا بروفین ہرگز نہ لیں! یہ ادویات خون کو پتلا کر کے جان لیوا اندرونی خون کا سبب بنتی ہیں۔ درد اور بخار کے لیے صرف اور صرف پیراسیٹامول لیں اور جسم میں پانی کی کمی نہ ہونے دیں؛ او آر ایس اور ناریل کا پانی خوب پئیں۔'
            : 'Dengue Monsoon Directive: In Dengue fever with severe bodyache and retro-orbital headache, NEVER take Aspirin, Disprin, or Ibuprofen! They destroy platelets and cause fatal internal hemorrhage. Take ONLY Paracetamol for pain/fever and drink abundant ORS and fluids.',
          actionTab: 'seasonal',
          suggestedActionLabel: respLang === 'ur' ? 'ڈینگی کی مکمل گائیڈ دیکھیں' : 'View Monsoon Dengue Guide',
        }
      };
    }

    // Winter Flu
    if (
      containsAny(q, [
        'فلو', 'سردی', 'نزلہ', 'زکام', 'چھینک', 'سردیوں کا فلو',
        'winter', 'flu', 'nazla', 'zukam', 'zukham', 'influenza', 'cold'
      ])
    ) {
      return {
        targetLang: respLang,
        response: {
          text: respLang === 'ur'
            ? 'سردیوں کے فلو کی رہنمائی: فلو میں اچانک تیز بخار، شدید جسم درد اور خشک کھانسی ہوتی ہے۔ جسم درد کے لیے پیراسیٹامول لیں، دن میں دو بار گرم پانی کی بھاپ لیں اور نیم گرم یخنی پئیں۔ یاد رکھیں، عام فلو وائرل ہوتا ہے جس میں اینٹی بائیوٹکس کا کوئی فائدہ نہیں ہوتا۔'
            : 'Winter Flu Protocol: Characterized by sudden high fever, chills, severe muscle aches, and dry cough. Recommended: Paracetamol for bodyaches, steam inhalation twice daily, and Cetirizine for runny nose. Antibiotics do NOT cure viral flu.',
          actionTab: 'seasonal',
          suggestedActionLabel: respLang === 'ur' ? 'موسم سرما کی گائیڈ دیکھیں' : 'View Winter Health Guide',
        }
      };
    }

    // Paracetamol Dosage
    if (
      containsAny(q, [
        'پیراسیٹامول', 'پیناڈول', 'کالپول', 'فیبرول',
        'paracetamol', 'panadol', 'calpol', 'febrol'
      ])
    ) {
      return {
        targetLang: respLang,
        response: {
          text: respLang === 'ur'
            ? 'پیراسیٹامول کی رہنمائی: بالغ افراد کے لیے خوراک 500 سے 1000 ملی گرام (1 یا 2 گولی) ہر 6 سے 8 گھنٹے بعد ہے۔ 24 گھنٹے میں زیادہ سے زیادہ حد 4,000 ملی گرام (8 گولیاں) ہے۔ اس سے زیادہ لینے سے جگر کو شدید نقصان پہنچ سکتا ہے۔'
            : 'Paracetamol Guidance: Adult dose is 500mg-1000mg (1-2 tablets) every 6-8 hours. The absolute 24-hour ceiling is 4,000 mg (8 tablets). Exceeding this can cause severe liver toxicity.',
          actionTab: 'medicines',
          actionPayload: 'Paracetamol',
          suggestedActionLabel: respLang === 'ur' ? 'پیراسیٹامول کا صفحہ دیکھیں' : 'View Paracetamol Details',
        }
      };
    }

    // Ibuprofen Rules
    if (
      containsAny(q, [
        'بروفین', 'ائیبوپروفین', 'ایبوپروفین',
        'ibuprofen', 'brufen'
      ])
    ) {
      return {
        targetLang: respLang,
        response: {
          text: respLang === 'ur'
            ? 'آئیبوپروفین (بروفین) کی رہنمائی: پٹھوں اور جوڑوں کے درد میں مفید ہے۔ ہمیشہ کھانے یا دودھ کے بعد لیں۔ معدے کے السر، گردوں کے امراض یا ڈینگی کے بخار میں اس سے سخت پرہیز کریں۔'
            : 'Ibuprofen Guidance: Excellent for inflammatory muscle/joint pain. Always take with meals or milk. Strictly avoid in gastric ulcers, kidney disease, or suspected Dengue fever.',
          actionTab: 'medicines',
          actionPayload: 'Ibuprofen',
          suggestedActionLabel: respLang === 'ur' ? 'بروفین کا صفحہ دیکھیں' : 'View Ibuprofen Details',
        }
      };
    }

    // Medication Reminders
    if (
      containsAny(q, [
        'الرٹ', 'الرٹس', 'ریمائنڈر', 'دوا کا وقت', 'شیڈول', 'خوراک کا وقت', 'الارم',
        'reminder', 'reminders', 'alarm', 'schedule', 'dawa ka waqt', 'khorak'
      ])
    ) {
      return {
        targetLang: respLang,
        response: {
          text: respLang === 'ur'
            ? 'دوائیوں کے روزانہ الرٹس: آپ نے میڈی گائیڈ میں اپنی ادویات کے روزانہ الارم سیٹ کیے ہوئے ہیں۔ آپ جب چاہیں نیا الرٹ شامل کر سکتے ہیں، خوراک کو لے لیا (Taken) نشان زد کر سکتے ہیں اور بغیر انٹرنیٹ اپنا مکمل شیڈول دیکھ سکتے ہیں۔'
            : 'Medication Reminders: MediGuide keeps your daily medicine schedule safely stored offline. You can configure custom times, mark doses as taken, and receive browser chimes and alert notifications.',
          actionTab: 'reminders',
          suggestedActionLabel: respLang === 'ur' ? 'دوائیوں کے الرٹس کھولیں' : 'Open Medication Reminders',
        }
      };
    }

    // Default Fallback
    return {
      targetLang: respLang,
      response: {
        text: respLang === 'ur'
          ? `میں نے آپ کی بات نوٹ کر لی ہے۔ شدید جسم درد اور سر درد کے لیے پیراسیٹامول (500 سے 1000 ملی گرام) سب سے محفوظ بنیادی دوا ہے۔ ڈینگی اور برسات میں بروفین یا اسپرین سے سخت پرہیز کریں۔ مزید رہنمائی کے لیے نیچے دیے گئے بٹنوں میں سے کسی ایک پر کلک کریں۔`
          : `I noted your question. For severe bodyache or headache, Paracetamol (500mg-1000mg) is the safest first-line analgesic. Strictly avoid Brufen/Aspirin during Dengue or viral fever. Click any prompt below for detailed protocols.`,
        actionTab: 'seasonal',
        actionPayload: rawQuery,
        suggestedActionLabel: respLang === 'ur' ? 'موسمی امراض و درد گائیڈ دیکھیں' : 'Explore Weather & Pain Guide',
      }
    };
  };

  /**
   * Main query processor:
   * First tries intelligent server-side Gemini endpoint (/api/voice-query) with real neural TTS audio,
   * falls back seamlessly to local medical matcher and speech synthesis if offline.
   */
  const handleProcessQuery = async (query: string) => {
    if (!query.trim()) return;

    const isUrduQuery = hasUrduScript(query) || isUrduOrRomanUrduQuery(query);
    const targetLang: Language = isUrduQuery || language === 'ur' ? 'ur' : 'en';

    if (isUrduQuery && language !== 'ur') {
      setLanguage('ur');
      localStorage.setItem('mediguide_language', 'ur');
    }

    const userMessage = { sender: 'user' as const, text: query };
    setConversation((prev) => [...prev, userMessage]);
    setIsProcessingAI(true);
    stopSpeaking();

    try {
      // Call full-stack server endpoint /api/voice-query
      const res = await fetch('/api/voice-query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, language: targetLang })
      });

      if (res.ok) {
        const data = await res.json();
        const assistantMessage = {
          sender: 'assistant' as const,
          text: data.text,
          actionTab: data.actionTab as ActiveTab,
          actionLabel: data.actionLabel,
          audioBase64: data.audioBase64
        };

        setConversation((prev) => [...prev, assistantMessage]);
        setLastAnswer(data.text);
        setLastAnswerAudio(data.audioBase64 || null);
        setIsProcessingAI(false);

        speakText(data.text, targetLang, data.audioBase64);
        return;
      }
    } catch (err) {
      console.warn('Server voice-query failed, using local offline engine:', err);
    }

    // Local fallback
    const { response } = matchLocalIntent(query);
    const assistantMessage = {
      sender: 'assistant' as const,
      text: response.text,
      actionTab: response.actionTab,
      actionPayload: response.actionPayload,
      actionLabel: response.suggestedActionLabel,
    };

    setConversation((prev) => [...prev, assistantMessage]);
    setLastAnswer(response.text);
    setLastAnswerAudio(null);
    setIsProcessingAI(false);
    speakText(response.text, targetLang);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typedInput.trim()) {
      handleProcessQuery(typedInput.trim());
      setTypedInput('');
    }
  };

  const handleReplayAnswer = () => {
    if (lastAnswer) {
      speakText(lastAnswer, language, lastAnswerAudio || undefined);
    }
  };

  const handleActionClick = (tab?: ActiveTab, payload?: string) => {
    if (!tab) return;
    if (tab === 'medicines' && payload) {
      onSearchMedicine(payload);
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dedicated Spoken Audio Guides for Direct Hands-Free Guidance
  const spokenAudioGuides = [
    {
      id: 'guide-pain',
      titleUrdu: 'شدید جسم درد اور سر درد کی بنیادی رہنمائی',
      titleEn: 'Severe Bodyache & Headache Medicine Protocol',
      duration: '45 سیکنڈ',
      spokenContent: 'شدید جسمانی درد اور سر درد کے لیے پیراسیٹامول 500 سے 1000 ملی گرام سب سے محفوظ دوا ہے۔ 24 گھنٹے میں زیادہ سے زیادہ 8 گولیاں یعنی 4 گرام سے زائد ہرگز نہ لیں۔ سر درد میں سب سے پہلے دو گلاس پانی پئیں کیونکہ پانی کی کمی اکثر سر درد کی بڑی وجہ ہوتی ہے۔',
      targetTab: 'seasonal' as ActiveTab,
      tabLabel: 'مکمل پروٹوکول کھولیں'
    },
    {
      id: 'guide-dengue',
      titleUrdu: 'برسات اور ڈینگی بخار کی جان بچانے والی احتیاط',
      titleEn: 'Dengue & Monsoon Fever Fatal Medicine Warning',
      duration: '40 سیکنڈ',
      spokenContent: 'ڈینگی اور برسات کے موسم میں بخار اور جسم درد کے لیے بروفین، آئیبوپروفین یا اسپرین ہرگز نہ کھائیں! یہ دوائیں خون کو پتلا کر کے جان لیوا اندرونی خون کا باعث بنتی ہیں۔ اس حالت میں صرف پیراسیٹامول لیں اور او آر ایس کا استعمال بڑھائیں۔',
      targetTab: 'seasonal' as ActiveTab,
      tabLabel: 'ڈینگی گائیڈ دیکھیں'
    },
    {
      id: 'guide-flu',
      titleUrdu: 'سردیوں کے فلو اور کھانسی کی درست دیکھ بھال',
      titleEn: 'Winter Flu & Viral Respiratory Advice',
      duration: '35 سیکنڈ',
      spokenContent: 'سردیوں کے موسمی فلو اور نزلہ زکام میں اینٹی بائیوٹکس کا استعمال نہ کریں۔ فلو وائرل بیماری ہے جس میں بستر پر آرام، گرم پانی کی بھاپ، نیم گرم یخنی اور جسم درد کے لیے پیراسیٹامول سب سے بہترین علاج ہے۔',
      targetTab: 'seasonal' as ActiveTab,
      tabLabel: 'سردیوں کی گائیڈ'
    },
    {
      id: 'guide-reminders',
      titleUrdu: 'دوائیوں کے روزانہ الرٹس اور شیڈول لگانے کا طریقہ',
      titleEn: 'Medication Reminders & Dose Alerts Guide',
      duration: '35 سیکنڈ',
      spokenContent: 'میڈی گائیڈ میں آپ اپنی ادویات کے روزانہ الارم لگا سکتے ہیں جو بغیر انٹرنیٹ بھی کام کرتے ہیں۔ مقررہ وقت پر آپ کو آواز اور نوٹیفکیشن موصول ہوگا تاکہ کوئی خوراک چھوٹ نہ جائے۔',
      targetTab: 'reminders' as ActiveTab,
      tabLabel: 'الرٹس کھولیں'
    },
    {
      id: 'guide-emergency',
      titleUrdu: 'ہنگامی علامات اور ریسکیو 1122 ایمرجنسی',
      titleEn: 'Critical Red Flags & Rescue 1122 Guide',
      duration: '30 سیکنڈ',
      spokenContent: 'اگر سینے میں شدید دباؤ یا درد ہو، سانس رکنے لگے، چہرے کا ایک حصہ مڑ جائے یا بے ہوشی طاری ہو تو یہ جان لیوا ایمرجنسی ہے۔ خود سے دوائیاں لینے کے بجائے فوراً ریسکیو 1122 پر کال کریں۔',
      targetTab: 'safety' as ActiveTab,
      tabLabel: 'ایمرجنسی سینٹر'
    }
  ];

  const handlePlaySpokenGuide = (guide: typeof spokenAudioGuides[0]) => {
    if (activeGuideId === guide.id && isSpeaking) {
      stopSpeaking();
      return;
    }

    stopSpeaking();
    setActiveGuideId(guide.id);
    speakHealthcareText(guide.spokenContent, 'ur', {
      rate: speechRate,
      onStart: () => setIsSpeaking(true),
      onEnd: () => {
        setIsSpeaking(false);
        setActiveGuideId(null);
      },
      onError: () => {
        setIsSpeaking(false);
        setActiveGuideId(null);
      }
    });
  };

  // High-frequency Urdu Voice Health Queries
  const urduVoiceQueries = [
    {
      icon: <Flame className="w-4 h-4 text-amber-500" />,
      urduLabel: 'شدید جسم درد اور ہڈیوں کے درد کی دوا',
      enLabel: 'Medicine for severe bodyache',
      query: 'شدید جسم درد کے لیے کیا لیں؟'
    },
    {
      icon: <Activity className="w-4 h-4 text-cyan-500" />,
      urduLabel: 'شدید سر درد کی محفوظ دوا کونسی ہے؟',
      enLabel: 'Safe relief for severe headache',
      query: 'سر درد کی محفوظ دوا کونسی ہے؟'
    },
    {
      icon: <AlertTriangle className="w-4 h-4 text-rose-500" />,
      urduLabel: 'ڈینگی بخار اور برسات میں کونسی دوا نہ لیں؟',
      enLabel: 'Dengue fever medicine warning',
      query: 'برسات اور ڈینگی میں کونسی دوا نہ لیں؟'
    },
    {
      icon: <Sparkles className="w-4 h-4 text-teal-500" />,
      urduLabel: 'سردیوں کے فلو اور کھانسی کی رہنمائی',
      enLabel: 'Winter flu and cough guide',
      query: 'سردیوں کے فلو کے لیے رہنمائی'
    },
    {
      icon: <Zap className="w-4 h-4 text-yellow-500" />,
      urduLabel: 'گرمی میں لو، چکر اور سر درد کا علاج',
      enLabel: 'Summer heatstroke and cramps',
      query: 'گرمی میں لو اور سر درد کا علاج'
    },
    {
      icon: <Pill className="w-4 h-4 text-teal-600" />,
      urduLabel: 'پیراسیٹامول کی محفوظ مقدار کتنی ہے؟',
      enLabel: 'Safe Paracetamol daily limits',
      query: 'پیراسیٹامول کتنی لینی چاہیے؟'
    },
    {
      icon: <ShieldCheck className="w-4 h-4 text-indigo-500" />,
      urduLabel: 'بروفین کب لینی چاہیے اور کن کو پرہیز ہے؟',
      enLabel: 'When to take Brufen / Ibuprofen',
      query: 'بروفین کے بارے میں بتائیں'
    },
    {
      icon: <Bell className="w-4 h-4 text-amber-500" />,
      urduLabel: 'دوائیوں کے روزانہ الرٹس اور شیڈول کھولیں',
      enLabel: 'Daily medication reminders & schedule',
      query: 'میری دوائیوں کے روزانہ الرٹس اور شیڈول دکھائیں'
    },
    {
      icon: <PhoneCall className="w-4 h-4 text-rose-600" />,
      urduLabel: 'ہنگامی حالت میں 1122 اور فوری علامات',
      enLabel: 'Emergency 1122 red flags',
      query: 'ایمرجنسی 1122 کی علامات'
    }
  ];

  return (
    <div className="space-y-8 py-2">
      {/* Title & Language Switcher Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>{language === 'ur' ? 'آسان اردو AI وائس اسسٹنٹ و گائیڈ' : 'Accessible Urdu AI Voice Assistant & Guide'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {t.voice.title}
          </h1>
          <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
            {language === 'ur' 
              ? 'اردو بولنے والے صارفین کے لیے خاص طور پر تیار کردہ طبی وائس اسسٹنٹ۔ مائیک کا بٹن دبا کر بولیں، کسی بھی سوال پر ایک کلک کریں یا براہ راست اردو آواز میں مکمل طبی رہنمائی سنیں۔'
              : 'Enterprise-grade bilingual health voice assistant. Speak naturally in Urdu or English, click ready questions, or listen to spoken health directives.'}
          </p>
        </div>

        {/* In-Assistant Language Switcher & Audio Status */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200 shadow-2xs">
            <button
              onClick={() => {
                setLanguage('ur');
                localStorage.setItem('mediguide_language', 'ur');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                language === 'ur'
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              <span>اردو بولیں / سنیں</span>
              {language === 'ur' && <Check className="w-3.5 h-3.5 text-teal-300" />}
            </button>
            <button
              onClick={() => {
                setLanguage('en');
                localStorage.setItem('mediguide_language', 'en');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                language === 'en'
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              <span>English</span>
              {language === 'en' && <Check className="w-3.5 h-3.5 text-teal-300" />}
            </button>
          </div>

          <button
            onClick={handleTestAudio}
            className="px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer"
            title="Test Voice Output"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>{language === 'ur' ? 'آواز ٹیسٹ کریں' : 'Test Audio'}</span>
          </button>
        </div>
      </div>

      {/* Main Voice Assistant Card */}
      <div className="rounded-3xl bg-white border border-slate-200 shadow-xl p-6 sm:p-8 space-y-6">
        
        {/* Voice Control Primary Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5 pb-6 border-b border-slate-100">
          
          {/* Big Tap to Speak Mic Button */}
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <button
              onClick={startListening}
              className="relative flex items-center justify-center w-20 h-20 rounded-2xl transition-all cursor-pointer shadow-xl bg-gradient-to-tr from-teal-700 via-teal-600 to-cyan-700 hover:from-teal-800 hover:to-cyan-800 text-white hover:scale-105 active:scale-95 group"
              title={t.voice.tapToSpeak}
            >
              <Mic className="w-8 h-8 text-white group-hover:scale-110 transition" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-300 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-teal-400"></span>
              </span>
            </button>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  {language === 'ur' ? 'بولنے کے لیے بٹن دبائیں' : t.voice.tapToSpeak}
                </h3>
                <span className="text-[11px] font-bold bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Radio className="w-3 h-3 text-teal-700 animate-pulse" />
                  <span>{language === 'ur' ? 'اردو AI وائس' : 'Voice AI'}</span>
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1 max-w-md">
                {statusText || (language === 'ur' ? 'بٹن دبائیں اور اردو میں اپنا طبی سوال بولیں، جواب فوراً آواز میں موصول ہوگا' : t.voice.statusReady)}
              </p>
            </div>
          </div>

          {/* Sound Wave Animation Visualizer when speaking or processing */}
          {(isSpeaking || isProcessingAI) && (
            <div className={`flex items-center gap-1.5 h-9 px-4 py-1.5 rounded-full border text-xs font-bold animate-pulse ${
              isProcessingAI ? 'bg-amber-50 border-amber-200 text-amber-800' : 'bg-teal-50 border-teal-200 text-teal-800'
            }`}>
              {isProcessingAI ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-amber-600" />
                  <span>طبی جواب اور آواز تیار ہو رہی ہے...</span>
                </>
              ) : (
                <>
                  <span className="w-1.5 h-4 bg-current rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-6 bg-current rounded-full animate-bounce [animation-delay:0.15s]"></span>
                  <span className="w-1.5 h-3 bg-current rounded-full animate-bounce [animation-delay:0.3s]"></span>
                  <span className="w-1.5 h-5 bg-current rounded-full animate-bounce [animation-delay:0.45s]"></span>
                  <span className="w-1.5 h-3 bg-current rounded-full animate-bounce [animation-delay:0.6s]"></span>
                  <span className="ml-1 text-xs">
                    {language === 'ur' ? 'اردو آواز چل رہی ہے...' : 'Speaking answer...'}
                  </span>
                </>
              )}
            </div>
          )}

          {/* Audio Response Controls, Speed, and Stop Button */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end flex-wrap">
            {lastAnswer && (
              <button
                onClick={handleReplayAnswer}
                className="px-3 py-1.5 rounded-xl border border-teal-200 hover:bg-teal-50 text-teal-800 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
                title="Replay Spoken Answer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-teal-600" />
                <span>{language === 'ur' ? 'دوبارہ سنیں' : 'Replay Audio'}</span>
              </button>
            )}

            <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 cursor-pointer">
              <input
                type="checkbox"
                checked={autoSpeak}
                onChange={(e) => setAutoSpeak(e.target.checked)}
                className="rounded text-teal-600 focus:ring-teal-500 w-4 h-4 cursor-pointer"
              />
              <span>{t.voice.spokenResponseToggle}</span>
            </label>

            {isSpeaking && (
              <button
                onClick={stopSpeaking}
                className="px-3 py-1.5 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-800 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
              >
                <VolumeX className="w-3.5 h-3.5" />
                <span>{t.voice.stopSpeaking}</span>
              </button>
            )}
          </div>
        </div>

        {/* Dedicated Urdu AI Voice Guide Audio Library (براہ راست سنیں) */}
        <div className="space-y-3 pt-1 p-4 rounded-2xl bg-gradient-to-br from-teal-50/80 via-white to-cyan-50/80 border border-teal-200">
          <div className="flex items-center justify-between">
            <p className="text-xs font-black text-teal-950 uppercase tracking-wider flex items-center gap-1.5">
              <Headphones className="w-4 h-4 text-teal-700" />
              <span>{language === 'ur' ? 'اردو AI وائس گائیڈ — اہم طبی موضوعات پر براہ راست اردو آواز میں سنیں:' : 'Urdu AI Voice Guide — Direct Spoken Medical Directives:'}</span>
            </p>
            <span className="text-[11px] font-bold text-teal-700">
              {language === 'ur' ? 'مستند طبی ہدایات' : 'Clinical Protocols'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {spokenAudioGuides.map((guide) => {
              const isPlayingThis = activeGuideId === guide.id && isSpeaking;
              return (
                <div
                  key={guide.id}
                  className={`p-3.5 rounded-xl border transition shadow-2xs flex flex-col justify-between gap-3 ${
                    isPlayingThis
                      ? 'bg-teal-100/90 border-teal-400 ring-2 ring-teal-200'
                      : 'bg-white border-slate-200 hover:border-teal-300'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold">
                      <span>{guide.duration}</span>
                      {isPlayingThis && (
                        <span className="text-teal-700 font-bold flex items-center gap-1 animate-pulse">
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>چل رہا ہے...</span>
                        </span>
                      )}
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 leading-snug">
                      {language === 'ur' ? guide.titleUrdu : guide.titleEn}
                    </h4>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => handlePlaySpokenGuide(guide)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-2xs ${
                        isPlayingThis
                          ? 'bg-rose-600 hover:bg-rose-700 text-white'
                          : 'bg-teal-600 hover:bg-teal-700 text-white'
                      }`}
                    >
                      {isPlayingThis ? (
                        <>
                          <Pause className="w-3.5 h-3.5" />
                          <span>آواز روکیں</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5" />
                          <span>اردو میں سنیں</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveTab(guide.targetTab)}
                      className="text-[11px] text-teal-800 hover:text-teal-950 font-bold hover:underline cursor-pointer flex items-center gap-0.5"
                    >
                      <span>{guide.tabLabel}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dedicated 1-Click Spoken Health Queries */}
        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between">
            <p className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-teal-600" />
              <span>{language === 'ur' ? 'فوری طبی سوالات (کلک کریں، جواب اردو آواز میں سنیں):' : 'Instant 1-Click Spoken Health Queries:'}</span>
            </p>
            <span className="text-[11px] text-teal-700 font-semibold hidden sm:inline">
              {language === 'ur' ? 'مائیک کے بغیر بھی 100٪ فعال' : '100% Works Even Without Microphone'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {urduVoiceQueries.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleProcessQuery(item.query)}
                className="p-3.5 rounded-2xl bg-teal-50/60 hover:bg-teal-100/80 border border-teal-200/80 hover:border-teal-400 text-slate-900 text-xs font-semibold transition text-left cursor-pointer flex flex-col justify-between gap-2 shadow-2xs hover:shadow-xs group"
              >
                <div className="flex items-start gap-2">
                  <div className="p-1.5 rounded-lg bg-white border border-teal-200/60 shrink-0 mt-0.5 group-hover:scale-110 transition">
                    {item.icon}
                  </div>
                  <span className="leading-relaxed font-bold text-slate-900 group-hover:text-teal-900 transition">
                    {language === 'ur' ? item.urduLabel : item.enLabel}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-teal-700 font-bold pt-1 border-t border-teal-200/40">
                  <span className="flex items-center gap-1">
                    <Volume2 className="w-3 h-3 text-teal-600" />
                    <span>{language === 'ur' ? 'اردو میں سنیں' : 'Listen'}</span>
                  </span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Conversation Dialogue Display */}
        <div className="space-y-4 max-h-[440px] overflow-y-auto pr-2 border-t border-slate-100 pt-4">
          {conversation.map((msg, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[90%] sm:max-w-[80%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-xs space-y-2.5 ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-teal-700 to-teal-800 text-white rounded-br-xs'
                    : 'bg-slate-50 border border-slate-200 text-slate-800 rounded-bl-xs'
                }`}
              >
                {msg.sender === 'assistant' && (
                  <div className="flex items-center justify-between border-b border-slate-200/60 pb-1.5">
                    <p className="text-[11px] font-bold text-teal-700 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{language === 'ur' ? 'میڈی گائیڈ اردو AI جواب' : t.voice.assistantSays}</span>
                    </p>
                    <button
                      onClick={() => speakText(msg.text, language, msg.audioBase64)}
                      className="p-1 rounded-md text-teal-700 hover:bg-teal-100 transition cursor-pointer flex items-center gap-1 text-[11px] font-semibold"
                      title="Speak this response"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>{language === 'ur' ? 'آواز سنیں' : 'Listen'}</span>
                    </button>
                  </div>
                )}
                
                <p className="whitespace-pre-line leading-relaxed font-medium">
                  {msg.text}
                </p>

                {/* Optional Jump Action Button */}
                {msg.actionTab && msg.actionLabel && (
                  <div className="pt-2">
                    <button
                      onClick={() => handleActionClick(msg.actionTab, msg.actionPayload)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition shadow-xs cursor-pointer"
                    >
                      <span>{msg.actionLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Alternative Typed Input Box */}
        <form onSubmit={handleFormSubmit} className="pt-2">
          <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-200 focus-within:ring-2 focus-within:ring-teal-500 focus-within:bg-white transition">
            <MessageSquare className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
            <input
              type="text"
              value={typedInput}
              onChange={(e) => setTypedInput(e.target.value)}
              placeholder={language === 'ur' ? 'یا اپنا سوال یہاں اردو یا انگلش میں لکھیں (مثلاً "سر درد"، "فلو"، "پیراسیٹامول")...' : t.voice.typeInputPlaceholder}
              className="w-full py-2.5 px-2 bg-transparent text-slate-800 text-xs sm:text-sm placeholder-slate-400 focus:outline-hidden font-medium"
            />
            <button
              type="submit"
              disabled={!typedInput.trim()}
              className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-40 text-white font-bold text-xs transition cursor-pointer flex items-center gap-1.5 shrink-0"
            >
              <span>{t.voice.send}</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>

        {/* Safe Medical Disclaimer Tag */}
        <div className="pt-2 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-500 font-medium">
          <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
          <span>{t.voice.limitationsNotice}</span>
        </div>
      </div>

      {/* Interactive Live Voice Listening Modal with Real Audio Volume Analyser */}
      {isListeningModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-white shadow-2xl border border-teal-200 space-y-6 text-center">
            
            {/* Close Button */}
            <button
              onClick={handleCancelListeningModal}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Status */}
            <div className="space-y-1">
              <span className="inline-block px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider">
                {language === 'ur' ? 'اردو AI وائس اسسٹنٹ' : 'AI Voice Assistant'}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                {language === 'ur' ? 'آپ کی آواز سن رہا ہوں...' : 'Listening to your voice...'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                {language === 'ur' ? 'اپنا طبی سوال بولیں، جیسے "سر درد کی دوا"، "ڈینگی بخار"، یا "پیراسیٹامول"' : 'Speak your medical question clearly now'}
              </p>
            </div>

            {/* Active Sound Orb & Responsive Voice Volume Bars */}
            <div className="flex flex-col items-center justify-center py-4 space-y-4">
              <div 
                className="relative flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-tr from-teal-600 via-teal-500 to-cyan-500 text-white shadow-2xl transition-transform duration-75"
                style={{
                  transform: `scale(${1 + (micVolume / 100) * 0.35})`,
                  boxShadow: `0 0 ${20 + micVolume * 0.6}px rgba(13, 148, 136, 0.6)`
                }}
              >
                <Mic className="w-12 h-12 text-white animate-pulse" />
              </div>

              {/* Reactive Volume Bars */}
              <div className="flex items-center gap-1.5 h-8">
                {[...Array(12)].map((_, i) => {
                  const factor = Math.sin((i / 12) * Math.PI);
                  const barHeight = Math.max(4, Math.round((micVolume / 100) * 32 * factor + Math.random() * 6));
                  return (
                    <span 
                      key={i} 
                      className="w-1.5 bg-teal-600 rounded-full transition-all duration-75"
                      style={{ height: `${barHeight}px` }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Live Detected Transcript Box */}
            <div className="min-h-16 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-sm leading-relaxed flex items-center justify-center">
              {liveTranscript ? (
                <p className="font-bold text-teal-900">
                  "{liveTranscript}"
                </p>
              ) : (
                <p className="text-slate-400 italic text-xs">
                  {language === 'ur' 
                    ? 'بولیں... الفاظ یہاں لائیو نظر آئیں گے' 
                    : 'Speak now... words will appear here in real time'}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleStopListeningAndSubmit}
                className="px-6 py-3 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold shadow-md transition flex items-center gap-2 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>{language === 'ur' ? 'بات مکمل ہوئی — جواب حاصل کریں' : 'Done Speaking — Get Answer'}</span>
              </button>

              <button
                type="button"
                onClick={handleCancelListeningModal}
                className="px-4 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold transition cursor-pointer"
              >
                <span>{language === 'ur' ? 'منسوخ کریں' : 'Cancel'}</span>
              </button>
            </div>

            {/* Instant Fallback Quick Queries (Right inside the listening dialog) */}
            <div className="pt-2 border-t border-slate-100 text-left">
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                {language === 'ur' ? 'یا براہ راست ان سوالات پر کلک کریں:' : 'Or tap any query below:'}
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    handleCancelListeningModal();
                    handleProcessQuery('شدید جسم درد کے لیے کیا لیں؟');
                  }}
                  className="p-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-900 text-xs font-semibold text-left transition cursor-pointer"
                >
                  🔥 شدید جسم درد کی دوا
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleCancelListeningModal();
                    handleProcessQuery('سر درد کی محفوظ دوا کونسی ہے؟');
                  }}
                  className="p-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-900 text-xs font-semibold text-left transition cursor-pointer"
                >
                  ⚡ شدید سر درد کا علاج
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleCancelListeningModal();
                    handleProcessQuery('برسات اور ڈینگی میں کونسی دوا نہ لیں؟');
                  }}
                  className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-900 text-xs font-semibold text-left transition cursor-pointer"
                >
                  ⚠️ ڈینگی بخار کی احتیاط
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleCancelListeningModal();
                    handleProcessQuery('سردیوں کے فلو کے لیے رہنمائی');
                  }}
                  className="p-2 rounded-xl bg-cyan-50 hover:bg-cyan-100 text-cyan-900 text-xs font-semibold text-left transition cursor-pointer"
                >
                  ❄️ سردیوں کا فلو اور کھانسی
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
