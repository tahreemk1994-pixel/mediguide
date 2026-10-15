import React, { useState, useMemo } from 'react';
import { 
  Activity, 
  Search, 
  AlertTriangle, 
  PhoneCall, 
  ShieldAlert, 
  CheckCircle2, 
  UserCheck, 
  X, 
  Volume2, 
  VolumeX, 
  ChevronDown, 
  ChevronUp,
  Flame,
  Wind,
  Zap,
  Info
} from 'lucide-react';
import { Language, Symptom } from '../types';
import { SYMPTOMS_DATA, EMERGENCY_RED_FLAGS } from '../data/symptoms';
import { TRANSLATIONS } from '../data/translations';
import { speakHealthcareText, stopHealthcareSpeech } from '../utils/speechVoice';

interface SymptomGuideProps {
  language: Language;
}

export const SymptomGuide: React.FC<SymptomGuideProps> = ({ language }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSymptomId, setExpandedSymptomId] = useState<string>('headache');
  const [speakingSymptomId, setSpeakingSymptomId] = useState<string | null>(null);
  const t = TRANSLATIONS[language];

  const filteredSymptoms = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return SYMPTOMS_DATA;
    return SYMPTOMS_DATA.filter((s) => {
      const name = s.name[language].toLowerCase();
      const desc = s.description[language].toLowerCase();
      const causes = s.commonCauses[language].some((c) => c.toLowerCase().includes(q));
      return name.includes(q) || desc.includes(q) || causes;
    });
  }, [searchQuery, language]);

  const handleSpeakSymptom = (symptom: Symptom, e: React.MouseEvent) => {
    e.stopPropagation();

    if (speakingSymptomId === symptom.id) {
      stopHealthcareSpeech();
      setSpeakingSymptomId(null);
      return;
    }

    stopHealthcareSpeech();

    const name = symptom.name[language];
    const desc = symptom.description[language];
    const selfCare = symptom.selfCareAdvice[language].join('. ');
    const warnings = symptom.warningSigns[language].join('. ');
    const fullText = language === 'en'
      ? `${name}. ${desc}. Self care: ${selfCare}. Warning signs: ${warnings}.`
      : `${name}۔ ${desc}۔ گھریلو دیکھ بھال: ${selfCare}۔ اہم خطرے کی علامات: ${warnings}۔`;

    setSpeakingSymptomId(symptom.id);
    speakHealthcareText(fullText, language, {
      onStart: () => setSpeakingSymptomId(symptom.id),
      onEnd: () => setSpeakingSymptomId(null),
      onError: () => setSpeakingSymptomId(null),
    });
  };

  return (
    <div className="space-y-8 py-2">
      {/* Title & Subtitle */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider">
          <Activity className="w-4 h-4" />
          <span>{language === 'en' ? 'Everyday Symptom Education' : 'روزمرہ کی علامات سے آگاہی'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {t.symptoms.title}
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          {t.symptoms.subtitle}
        </p>
      </div>

      {/* Prominent Critical Emergency Warning Signs Banner */}
      <div className="rounded-2xl border-2 border-rose-300 bg-gradient-to-br from-rose-50 via-white to-rose-50/70 p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-rose-200">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-rose-600 text-white shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-rose-950">
                {t.symptoms.emergencyBannerTitle}
              </h2>
              <p className="text-xs text-rose-800">
                {t.symptoms.emergencyBannerDesc}
              </p>
            </div>
          </div>

          <a
            href="tel:1122"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold shadow-md transition shrink-0"
          >
            <PhoneCall className="w-4 h-4" />
            <span>{language === 'en' ? 'Emergency 1122' : 'ایمرجنسی 1122 ملائیں'}</span>
          </a>
        </div>

        {/* Emergency Red Flags Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {EMERGENCY_RED_FLAGS.map((rf) => (
            <div
              key={rf.id}
              className="p-3.5 rounded-xl bg-white border border-rose-200 text-xs space-y-1.5 shadow-2xs hover:border-rose-400 transition"
            >
              <div className="flex items-center gap-2 font-bold text-rose-900">
                <Flame className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{rf.title[language]}</span>
              </div>
              <p className="text-slate-700 text-[11px] leading-relaxed">
                {rf.description[language]}
              </p>
              <div className="pt-1 text-[11px] font-semibold text-rose-700 flex items-center gap-1">
                <Zap className="w-3 h-3 text-rose-600 shrink-0" />
                <span>{rf.action[language]}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Non-Diagnostic Clinical Notice */}
      <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-200 text-teal-900 text-xs flex items-center gap-2.5">
        <Info className="w-4 h-4 text-teal-700 shrink-0" />
        <p className="leading-relaxed font-medium">
          {t.symptoms.nonDiagnosticNotice}
        </p>
      </div>

      {/* Search Input */}
      <div className="relative max-w-xl">
        <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t.symptoms.searchPlaceholder}
          className="w-full pl-10 pr-10 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-teal-500 font-medium transition shadow-2xs"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-md cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Symptoms Accordion / Cards List */}
      <div className="space-y-4">
        {filteredSymptoms.map((symptom) => {
          const isExpanded = expandedSymptomId === symptom.id;
          const isSpeaking = speakingSymptomId === symptom.id;

          return (
            <div
              key={symptom.id}
              className={`rounded-2xl border transition overflow-hidden shadow-xs ${
                isExpanded 
                  ? 'border-teal-400 bg-white ring-2 ring-teal-100' 
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              {/* Symptom Card Header */}
              <button
                onClick={() => setExpandedSymptomId(isExpanded ? '' : symptom.id)}
                className="w-full p-5 sm:p-6 text-left flex items-start sm:items-center justify-between gap-4 cursor-pointer focus:outline-hidden"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                      {symptom.name[language]}
                    </h3>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                      {symptom.commonCauses[language].length} {language === 'en' ? 'Causes' : 'وجوہات'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-1 max-w-2xl">
                    {symptom.description[language]}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {/* Speak Button */}
                  <button
                    onClick={(e) => handleSpeakSymptom(symptom, e)}
                    className={`p-2 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                      isSpeaking
                        ? 'bg-rose-100 text-rose-700 border border-rose-300 animate-pulse'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                    title={isSpeaking ? 'Stop Audio' : 'Listen to Symptom Info'}
                  >
                    {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>

                  <div className="p-2 text-slate-400">
                    {isExpanded ? <ChevronUp className="w-5 h-5 text-teal-700" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
              </button>

              {/* Expanded Symptom Content */}
              {isExpanded && (
                <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-100 space-y-5 text-xs animate-fadeIn">
                  {/* Overview */}
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 leading-relaxed">
                    <span className="font-bold">{t.symptoms.description}: </span>
                    <span>{symptom.description[language]}</span>
                  </div>

                  {/* Two-Column Grid: Causes & Self-Care */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Common Causes */}
                    <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
                      <p className="font-bold text-slate-900 flex items-center gap-1.5 text-sm">
                        <Wind className="w-4 h-4 text-cyan-600" />
                        <span>{t.symptoms.causes}</span>
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-slate-700 pl-1 leading-relaxed">
                        {symptom.commonCauses[language].map((cause, idx) => (
                          <li key={idx}>{cause}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Safe Home Self-Care */}
                    <div className="p-4 rounded-xl bg-teal-50/60 border border-teal-200 space-y-2">
                      <p className="font-bold text-teal-950 flex items-center gap-1.5 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-teal-600" />
                        <span>{t.symptoms.selfCare}</span>
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-teal-900 pl-1 leading-relaxed">
                        {symptom.selfCareAdvice[language].map((advice, idx) => (
                          <li key={idx}>{advice}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Warning Signs (Requiring Doctor) */}
                  <div className="p-4 rounded-xl bg-amber-50/90 border border-amber-300 space-y-2">
                    <p className="font-bold text-amber-950 flex items-center gap-1.5 text-sm">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      <span>{t.symptoms.warningSigns}</span>
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-amber-900 pl-1 leading-relaxed">
                      {symptom.warningSigns[language].map((sign, idx) => (
                        <li key={idx}>{sign}</li>
                      ))}
                    </ul>
                  </div>

                  {/* When to Consult Doctor Recommendation */}
                  <div className="p-4 rounded-xl bg-slate-900 text-white space-y-1.5">
                    <p className="font-bold flex items-center gap-1.5 text-teal-300 text-xs">
                      <UserCheck className="w-4 h-4 text-teal-400" />
                      <span>{t.symptoms.consultDoctor}</span>
                    </p>
                    <p className="text-slate-200 text-xs leading-relaxed">
                      {symptom.whenToConsultDoctor[language]}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
