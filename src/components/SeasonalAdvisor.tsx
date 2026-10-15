import React, { useState } from 'react';
import { 
  CloudRain, 
  Snowflake, 
  SunMedium, 
  Wind, 
  AlertTriangle, 
  ShieldAlert, 
  Pill, 
  CheckCircle2, 
  Ban, 
  Droplet, 
  Volume2, 
  VolumeX, 
  HeartHandshake, 
  ArrowRight,
  Flame,
  Activity,
  Zap,
  Info
} from 'lucide-react';
import { Language, WeatherSeasonId, SeasonalDisease, PainProtocol, ActiveTab } from '../types';
import { WEATHER_SEASONS, SEASONAL_DISEASES, PAIN_PROTOCOLS } from '../data/seasonalHealth';
import { TRANSLATIONS } from '../data/translations';
import { speakHealthcareText, stopHealthcareSpeech } from '../utils/speechVoice';

interface SeasonalAdvisorProps {
  language: Language;
  setActiveTab: (tab: ActiveTab) => void;
  onSelectMedicine: (medName: string) => void;
}

export const SeasonalAdvisor: React.FC<SeasonalAdvisorProps> = ({
  language,
  setActiveTab,
  onSelectMedicine,
}) => {
  const [selectedSeason, setSelectedSeason] = useState<WeatherSeasonId>('winter');
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const t = TRANSLATIONS[language];
  const s = t.seasonal;

  const currentSeasonMeta = WEATHER_SEASONS.find((w) => w.id === selectedSeason) || WEATHER_SEASONS[0];
  const currentDiseases = SEASONAL_DISEASES.filter((d) => d.seasonId === selectedSeason);

  const renderSeasonIcon = (iconName: string, className: string) => {
    switch (iconName) {
      case 'Snowflake':
        return <Snowflake className={className} />;
      case 'CloudRain':
        return <CloudRain className={className} />;
      case 'SunMedium':
        return <SunMedium className={className} />;
      case 'Wind':
        return <Wind className={className} />;
      default:
        return <Activity className={className} />;
    }
  };

  const handleSpeakDisease = (disease: SeasonalDisease) => {
    if (speakingId === disease.id) {
      stopHealthcareSpeech();
      setSpeakingId(null);
      return;
    }

    stopHealthcareSpeech();

    const name = disease.name[language];
    const painNotice = disease.severeBodyacheHeadacheNotice[language];
    const medList = disease.recommendedMedicines.map((m) => `${m.name[language]}: ${m.purpose[language]}`).join('. ');
    const avoid = disease.strictlyAvoid[language].join('. ');

    const fullText = language === 'en'
      ? `${name}. Severe bodyache and headache advice: ${painNotice}. Recommended medicines: ${medList}. Prohibited medicines: ${avoid}.`
      : `${name}۔ شدید جسم درد اور سر درد کی رہنمائی: ${painNotice}۔ تجویز کردہ دوائیں: ${medList}۔ ممنوعہ ادویات: ${avoid}۔`;

    setSpeakingId(disease.id);
    speakHealthcareText(fullText, language, {
      onStart: () => setSpeakingId(disease.id),
      onEnd: () => setSpeakingId(null),
      onError: () => setSpeakingId(null),
    });
  };

  const handleSpeakPainProtocol = (protocol: PainProtocol, idx: number) => {
    const idKey = `pain-${idx}`;

    if (speakingId === idKey) {
      stopHealthcareSpeech();
      setSpeakingId(null);
      return;
    }

    stopHealthcareSpeech();

    const condition = protocol.condition[language];
    const firstLine = protocol.recommendedFirstLine[language];
    const rules = protocol.dosageSafetyRules[language].join('. ');

    const fullText = language === 'en'
      ? `${condition}. Recommended first line: ${firstLine}. Safety rules: ${rules}.`
      : `${condition}۔ بنیادی تجویز کردہ دوا: ${firstLine}۔ خوراک اور حفاظتی اصول: ${rules}۔`;

    setSpeakingId(idKey);
    speakHealthcareText(fullText, language, {
      onStart: () => setSpeakingId(idKey),
      onEnd: () => setSpeakingId(null),
      onError: () => setSpeakingId(null),
    });
  };

  return (
    <div className="space-y-10 py-2">
      {/* Executive Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider">
          <Activity className="w-3.5 h-3.5 text-teal-600" />
          <span>{language === 'en' ? 'Clinical Weather Intelligence' : 'موسمی و موسمیاتی طبی رہنمائی'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {s.title}
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          {s.subtitle}
        </p>
      </div>

      {/* Critical Monsoon / Dengue Alert Banner */}
      <div className="rounded-2xl border-2 border-rose-300 bg-rose-50/90 p-4 sm:p-5 shadow-xs flex items-start gap-3">
        <ShieldAlert className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h2 className="text-sm font-bold text-rose-950">
            {language === 'en' ? 'Critical Viral Fever Directive (Dengue & Monsoon Alert)' : 'اہم ترین طبی ہدایت برائے ڈینگی و موسمی وائرل بخار'}
          </h2>
          <p className="text-xs text-rose-900 leading-relaxed font-medium">
            {s.monsoonDengueWarning}
          </p>
        </div>
      </div>

      {/* Interactive Weather Conditions Selector Bar */}
      <div className="space-y-3">
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
          {s.selectSeasonPrompt}
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {WEATHER_SEASONS.map((season) => {
            const isSelected = selectedSeason === season.id;
            return (
              <button
                key={season.id}
                onClick={() => {
                  setSelectedSeason(season.id);
                  if (speakingId && 'speechSynthesis' in window) {
                    window.speechSynthesis.cancel();
                    setSpeakingId(null);
                  }
                }}
                className={`p-4 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-br from-teal-700 to-cyan-800 border-teal-800 text-white shadow-lg ring-2 ring-teal-500/30'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-teal-300'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-white/20 text-white' : 'bg-teal-50 text-teal-700'}`}>
                    {renderSeasonIcon(season.iconName, 'w-5 h-5')}
                  </div>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                    isSelected ? 'bg-teal-900/60 text-teal-100' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {season.tempRange[language]}
                  </span>
                </div>
                <div className="pt-3">
                  <h3 className="font-bold text-sm leading-tight">
                    {season.name[language]}
                  </h3>
                  <p className={`text-[11px] mt-1 line-clamp-2 leading-relaxed ${
                    isSelected ? 'text-teal-100' : 'text-slate-500'
                  }`}>
                    {season.climateDescription[language]}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Season Detail & Viral Disease Guidance */}
      <div className="space-y-6">
        {currentDiseases.map((disease) => {
          const isSpeaking = speakingId === disease.id;

          return (
            <div
              key={disease.id}
              className="rounded-3xl bg-white border border-slate-200 shadow-md p-6 sm:p-8 space-y-6"
            >
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-teal-50 text-teal-800 border border-teal-200">
                      {disease.seasonName[language]}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      {language === 'en' ? 'Seasonal Viral Profile' : 'موسمی وائرل بیماری'}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                    {disease.name[language]}
                  </h2>
                </div>

                {/* Listen Audio Button */}
                <button
                  onClick={() => handleSpeakDisease(disease)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shrink-0 ${
                    isSpeaking
                      ? 'bg-rose-100 text-rose-700 border border-rose-300 animate-pulse'
                      : 'bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200'
                  }`}
                >
                  {isSpeaking ? (
                    <>
                      <VolumeX className="w-4 h-4" />
                      <span>{language === 'en' ? 'Stop Audio' : 'آواز بند کریں'}</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4" />
                      <span>{language === 'en' ? 'Listen Spoken Advice' : 'طبی رہنمائی سنیں'}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Key Symptoms */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-teal-600" />
                  <span>{language === 'en' ? 'Prominent Symptoms & Onset' : 'نمایاں علامات و کیفیت'}</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {disease.keySymptoms[language].map((sym, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-800 flex items-start gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span className="leading-relaxed font-medium">{sym}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Severe Bodyache & Headache Clinical Advice Box */}
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-1.5 text-xs text-amber-950">
                <p className="font-bold flex items-center gap-2 text-amber-900 text-sm">
                  <Flame className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{language === 'en' ? 'Severe Bodyache & Headache Clinical Action' : 'شدید جسمانی درد اور سر درد کی خصوصی رہنمائی'}</span>
                </p>
                <p className="leading-relaxed font-medium text-amber-900/95">
                  {disease.severeBodyacheHeadacheNotice[language]}
                </p>
              </div>

              {/* Recommended First-Line Reference Medicines */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-teal-800 flex items-center gap-1.5">
                  <Pill className="w-3.5 h-3.5 text-teal-600" />
                  <span>{s.recommendedMedicines}</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {disease.recommendedMedicines.map((med, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-white border border-teal-200 hover:border-teal-400 shadow-2xs space-y-3 flex flex-col justify-between transition"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-bold text-slate-900 text-sm">
                            {med.name[language]}
                          </h4>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-teal-100 text-teal-800">
                            Safe OTC
                          </span>
                        </div>
                        <p className="text-xs text-teal-900 font-medium leading-relaxed">
                          {med.purpose[language]}
                        </p>
                        <div className="p-2 rounded-lg bg-slate-50 text-[11px] text-slate-600 font-mono">
                          {med.activeIngredient[language]}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-100 space-y-2">
                        <p className="text-[11px] text-slate-500 leading-relaxed italic">
                          {med.safetyNote[language]}
                        </p>
                        <button
                          onClick={() => {
                            onSelectMedicine(med.name.en.split(' ')[0]);
                            setActiveTab('medicines');
                          }}
                          className="w-full text-center py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 text-[11px] font-bold transition flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <span>{language === 'en' ? 'View Medicine Profile' : 'دوا کی مکمل معلومات'}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prohibited Medicines & Safe Hydration Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Strictly Avoid */}
                <div className="p-4 rounded-2xl bg-rose-50/80 border border-rose-200 text-rose-950 space-y-2">
                  <h3 className="font-bold flex items-center gap-2 text-rose-900 text-sm">
                    <Ban className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{s.strictlyAvoid}</span>
                  </h3>
                  <ul className="space-y-1.5 pl-1">
                    {disease.strictlyAvoid[language].map((avoid, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 leading-relaxed font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-600 mt-1.5 shrink-0"></span>
                        <span>{avoid}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Home Hydration & Supportive Care */}
                <div className="p-4 rounded-2xl bg-cyan-50/80 border border-cyan-200 text-cyan-950 space-y-2">
                  <h3 className="font-bold flex items-center gap-2 text-cyan-900 text-sm">
                    <Droplet className="w-4 h-4 text-cyan-600 shrink-0" />
                    <span>{s.homeHydration}</span>
                  </h3>
                  <ul className="space-y-1.5 pl-1">
                    {disease.homeCareAndHydration[language].map((care, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 leading-relaxed font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-600 mt-1.5 shrink-0"></span>
                        <span>{care}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Red Flag Warning */}
              <div className="p-4 rounded-2xl bg-slate-900 text-white flex items-start gap-3 text-xs">
                <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-bold text-rose-300 uppercase tracking-wider text-[11px]">
                    {s.redFlag}
                  </span>
                  <p className="text-slate-200 leading-relaxed">
                    {disease.redFlagWarning[language]}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dedicated Section: Severe Bodyache & Headache Relief Protocols */}
      <section className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 text-white p-6 sm:p-9 space-y-6 shadow-xl">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Evidence-Based Pain Architecture' : 'درد سے نجات کے مصدقہ پروٹوکولز'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            {s.severePainHeader}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {s.severePainSub}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          {PAIN_PROTOCOLS.map((protocol, idx) => {
            const isSpeaking = speakingId === `pain-${idx}`;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white/10 border border-white/15 p-5 sm:p-6 space-y-4 backdrop-blur-md flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-bold text-base text-white">
                      {protocol.condition[language]}
                    </h3>
                    <button
                      onClick={() => handleSpeakPainProtocol(protocol, idx)}
                      className={`p-2 rounded-xl transition cursor-pointer shrink-0 ${
                        isSpeaking
                          ? 'bg-rose-500 text-white animate-pulse'
                          : 'bg-white/15 hover:bg-white/25 text-teal-300'
                      }`}
                      title="Audio"
                    >
                      {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Recommended First Line */}
                  <div className="p-3 rounded-xl bg-teal-500/20 border border-teal-400/30 text-teal-100">
                    <span className="font-bold block text-teal-300 text-[11px] uppercase tracking-wider">
                      {language === 'en' ? 'First-Line Recommendation:' : 'پہلا اور محفوظ ترین علاج:'}
                    </span>
                    <p className="mt-1 font-semibold leading-relaxed">
                      {protocol.recommendedFirstLine[language]}
                    </p>
                  </div>

                  {/* Dosage & Safety Rules */}
                  <div className="space-y-1.5">
                    <span className="font-bold text-slate-300 text-[11px] uppercase tracking-wider">
                      {language === 'en' ? 'Dosage & Safety Limits:' : 'خوراک اور حفاظتی حد:'}
                    </span>
                    <ul className="space-y-1 text-slate-200">
                      {protocol.dosageSafetyRules[language].map((rule, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-2 leading-relaxed">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                          <span>{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Contraindications */}
                  <div className="space-y-1 text-rose-200">
                    <span className="font-bold text-rose-300 text-[11px] uppercase tracking-wider">
                      {language === 'en' ? 'When to Avoid:' : 'کن صورتوں میں پرہیز کریں:'}
                    </span>
                    <ul className="space-y-1">
                      {protocol.contraindications[language].map((con, cIdx) => (
                        <li key={cIdx} className="flex items-start gap-1.5 leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0 mt-1.5"></span>
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Urgent Doctor Threshold */}
                <div className="pt-3 border-t border-white/10 text-amber-200 text-[11px] leading-relaxed">
                  <strong className="text-amber-300">{language === 'en' ? 'Urgent threshold: ' : 'فوری ایمرجنسی علامت: '}</strong>
                  {protocol.urgentDoctorThreshold[language]}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
