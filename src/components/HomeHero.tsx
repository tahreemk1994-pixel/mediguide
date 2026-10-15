import React, { useState } from 'react';
import { 
  Pill, 
  FileText, 
  Activity, 
  Search, 
  Mic, 
  ShieldAlert, 
  ArrowRight, 
  CheckCircle2, 
  HeartHandshake, 
  Sparkles,
  PhoneCall,
  ExternalLink,
  CloudRain,
  ShieldCheck,
  Flame,
  Zap,
  Globe2,
  Bell
} from 'lucide-react';
import { ActiveTab, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface HomeHeroProps {
  setActiveTab: (tab: ActiveTab) => void;
  language: Language;
  onSearchMedicine: (query: string) => void;
}

export const HomeHero: React.FC<HomeHeroProps> = ({
  setActiveTab,
  language,
  onSearchMedicine,
}) => {
  const [heroSearch, setHeroSearch] = useState('');
  const t = TRANSLATIONS[language];

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = heroSearch.trim();
    if (!q) return;

    // Check if query is about seasonal or pain
    const qLower = q.toLowerCase();
    if (
      qLower.includes('dengue') || 
      qLower.includes('flu') || 
      qLower.includes('winter') || 
      qLower.includes('monsoon') ||
      qLower.includes('bodyache') ||
      qLower.includes('جسم درد') ||
      qLower.includes('ڈینگی') ||
      qLower.includes('فلو')
    ) {
      setActiveTab('seasonal');
    } else {
      onSearchMedicine(q);
      setActiveTab('medicines');
    }
  };

  const handleQuickChip = (term: string, targetTab: ActiveTab = 'medicines') => {
    if (targetTab === 'seasonal') {
      setActiveTab('seasonal');
    } else {
      onSearchMedicine(term);
      setActiveTab('medicines');
    }
  };

  return (
    <div className="space-y-10 py-2 sm:py-6">
      {/* Top Emergency Red-Flag Banner */}
      <div className="rounded-2xl border border-rose-200 bg-rose-50/90 p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-rose-600 text-white shrink-0 mt-0.5">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-rose-950 flex items-center gap-2">
                {language === 'en' ? 'Acute Medical Emergency or Red Flags?' : 'کیا یہ شدید ہنگامی صورتحال ہے؟'}
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-rose-200 text-rose-900 font-semibold">
                  {language === 'en' ? 'Immediate Action' : 'فوری امداد'}
                </span>
              </h3>
              <p className="text-xs text-rose-800 mt-1 max-w-2xl leading-relaxed">
                {language === 'en' 
                  ? 'For sudden severe chest pain, breathing collapse, explosive thunderclap headache, or stroke symptoms, call emergency services immediately.'
                  : 'سینے میں شدید درد، سانس بند ہونے، اچانک شدید ترین سر درد یا فالج کی علامات میں موبائل ایپ استعمال نہ کریں، فوری ایمرجنسی کال کریں۔'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
            <a
              href="tel:1122"
              className="flex items-center justify-center gap-1.5 w-full sm:w-auto px-4 py-2.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold shadow-xs transition cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Call Rescue 1122' : 'ریسکیو 1122 ملائیں'}</span>
            </a>
            <button
              onClick={() => setActiveTab('safety')}
              className="px-3.5 py-2.5 rounded-xl border border-rose-300 hover:bg-rose-100 text-rose-900 text-xs font-semibold transition cursor-pointer"
            >
              {language === 'en' ? 'Triage Guide' : 'رہنمائی'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Welcoming Corporate Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-teal-900 to-cyan-950 text-white p-6 sm:p-10 lg:p-14 shadow-2xl">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-80 h-80 rounded-full bg-teal-500/20 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-72 h-72 rounded-full bg-cyan-500/15 blur-2xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-6">
          {/* Corporate Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-900/80 border border-teal-400/30 text-teal-200 text-xs font-bold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-teal-300" />
            <span>{t.hero.badge}</span>
          </div>

          {/* Heading & Tagline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            {t.tagline}
          </h1>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal max-w-2xl">
            {t.subTagline}
          </p>

          {/* Instant Search Box */}
          <form onSubmit={handleHeroSubmit} className="pt-2">
            <div className="flex flex-col sm:flex-row items-stretch gap-2 bg-white/10 p-1.5 rounded-2xl border border-teal-400/30 backdrop-blur-md shadow-lg">
              <div className="relative flex-1 flex items-center">
                <Search className="w-5 h-5 text-teal-300 absolute left-3.5 pointer-events-none" />
                <input
                  type="text"
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                  placeholder={t.hero.searchPlaceholder}
                  className="w-full pl-10 pr-4 py-3.5 bg-white text-slate-800 placeholder-slate-400 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-teal-400 font-medium"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{t.hero.searchBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Contextual Health Chips */}
            <div className="flex flex-wrap items-center gap-2 pt-3 text-xs text-teal-100/90">
              <span className="font-semibold text-teal-300">{t.hero.quickTopics}</span>
              <button
                type="button"
                onClick={() => handleQuickChip('Severe Bodyache', 'seasonal')}
                className="px-2.5 py-1 rounded-lg bg-teal-900/60 hover:bg-teal-600/80 text-white border border-teal-400/30 transition cursor-pointer text-xs flex items-center gap-1 font-medium"
              >
                <Flame className="w-3 h-3 text-amber-400" />
                <span>{language === 'en' ? 'Severe Bodyache' : 'شدید جسم درد'}</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickChip('Dengue', 'seasonal')}
                className="px-2.5 py-1 rounded-lg bg-rose-950/70 hover:bg-rose-800/80 text-rose-200 border border-rose-400/30 transition cursor-pointer text-xs flex items-center gap-1 font-medium"
              >
                <CloudRain className="w-3 h-3 text-rose-400" />
                <span>{language === 'en' ? 'Dengue & Monsoon' : 'برسات و ڈینگی'}</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickChip('Paracetamol')}
                className="px-2.5 py-1 rounded-lg bg-teal-900/60 hover:bg-teal-600/80 text-white border border-teal-400/30 transition cursor-pointer text-xs font-medium"
              >
                Paracetamol
              </button>
              <button
                type="button"
                onClick={() => handleQuickChip('Ibuprofen')}
                className="px-2.5 py-1 rounded-lg bg-teal-900/60 hover:bg-teal-600/80 text-white border border-teal-400/30 transition cursor-pointer text-xs font-medium"
              >
                Brufen
              </button>
              <button
                type="button"
                onClick={() => handleQuickChip('Winter Flu', 'seasonal')}
                className="px-2.5 py-1 rounded-lg bg-teal-900/60 hover:bg-teal-600/80 text-white border border-teal-400/30 transition cursor-pointer text-xs font-medium"
              >
                {language === 'en' ? 'Winter Flu' : 'موسم سرما فلو'}
              </button>
            </div>
          </form>

          {/* Evidence-based citation quote */}
          <div className="pt-2 flex items-center gap-2 text-[11px] text-teal-200/90 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
            <span>{t.hero.verifiedBy}</span>
          </div>
        </div>
      </section>

      {/* Enterprise Metrics Ribbon */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <p className="text-2xl font-black text-teal-700">12+</p>
          <p className="text-xs font-bold text-slate-800">{language === 'en' ? 'Verified Medicines' : 'مصدقہ ضروری ادویات'}</p>
          <p className="text-[11px] text-slate-500">DRAP & WHO List</p>
        </div>
        <div 
          onClick={() => setActiveTab('seasonal')}
          className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-teal-400 shadow-2xs space-y-1 cursor-pointer transition"
        >
          <p className="text-2xl font-black text-cyan-700">4 Seasons</p>
          <p className="text-xs font-bold text-slate-800">{language === 'en' ? 'Weather Viral Protocols' : 'موسمی وائرل گائیڈز'}</p>
          <p className="text-[11px] text-slate-500">Severe bodyache & flu</p>
        </div>
        <div 
          onClick={() => setActiveTab('voice')}
          className="p-4 rounded-2xl bg-white border border-teal-200 hover:border-teal-400 shadow-2xs space-y-1 cursor-pointer transition bg-teal-50/30"
        >
          <div className="flex items-center gap-1.5">
            <p className="text-2xl font-black text-teal-700">اردو AI</p>
            <Mic className="w-4 h-4 text-teal-600 animate-pulse" />
          </div>
          <p className="text-xs font-bold text-slate-800">{language === 'en' ? 'Urdu Voice Assistant' : 'اردو وائس اسسٹنٹ'}</p>
          <p className="text-[11px] text-slate-500">Bilingual hands-free</p>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <p className="text-2xl font-black text-emerald-700">100%</p>
          <p className="text-xs font-bold text-slate-800">{language === 'en' ? 'Offline Capable' : 'مکمل آف لائن موڈ'}</p>
          <p className="text-[11px] text-slate-500">Service Worker PWA</p>
        </div>
      </section>

      {/* Prominent Feature Cards (4 Cards) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              {language === 'en' ? 'Enterprise Healthcare Suites' : 'بنیادی طبی معلوماتی ٹولز'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              {language === 'en' 
                ? 'Select any of our verified public health intelligence modules.'
                : 'شروع کرنے کے لیے نیچے دیے گئے بنیادی فیچرز میں سے کوئی ایک منتخب کریں۔'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Medicine Checker */}
          <div 
            onClick={() => setActiveTab('medicines')}
            className="group relative rounded-2xl bg-white border border-slate-200 p-6 shadow-xs hover:shadow-xl hover:border-teal-400 transition cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center group-hover:scale-110 transition shadow-xs">
                <Pill className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition">
                {t.hero.featureCards.medicines.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.hero.featureCards.medicines.desc}
              </p>
            </div>
            <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-teal-700">
              <span>{t.hero.featureCards.medicines.cta}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* Card 2: Weather & Seasonal Advisor */}
          <div 
            onClick={() => setActiveTab('seasonal')}
            className="group relative rounded-2xl bg-white border-2 border-teal-300 hover:border-teal-500 p-6 shadow-xs hover:shadow-xl transition cursor-pointer flex flex-col justify-between ring-2 ring-teal-50"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-teal-600 to-cyan-600 text-white flex items-center justify-center group-hover:scale-110 transition shadow-xs">
                <CloudRain className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition">
                  {t.hero.featureCards.seasonal.title}
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.hero.featureCards.seasonal.desc}
              </p>
            </div>
            <div className="pt-4 mt-2 border-t border-teal-100 flex items-center justify-between text-xs font-bold text-teal-700">
              <span>{t.hero.featureCards.seasonal.cta}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* Card 3: Daily Medication Reminders */}
          <div 
            onClick={() => setActiveTab('reminders')}
            className="group relative rounded-2xl bg-white border border-slate-200 p-6 shadow-xs hover:shadow-xl hover:border-amber-400 transition cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center group-hover:scale-110 transition shadow-xs">
                <Bell className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-800 transition">
                {language === 'ur' ? 'دوائیوں کے روزانہ الرٹس' : 'Medication Reminders'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {language === 'ur' 
                  ? 'روزانہ کی ادویات کے الرٹس مقرر کریں اور مکمل طور پر آف لائن خوراک کا ریکارڈ رکھیں۔'
                  : 'Set daily alarms for your prescribed medicines. 100% offline schedule and dose tracker.'}
              </p>
            </div>
            <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-700">
              <span>{language === 'ur' ? 'الرٹس کھولیں' : 'Set Reminders'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* Card 3: Report Explainer */}
          <div 
            onClick={() => setActiveTab('reports')}
            className="group relative rounded-2xl bg-white border border-slate-200 p-6 shadow-xs hover:shadow-xl hover:border-cyan-400 transition cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center group-hover:scale-110 transition shadow-xs">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-cyan-700 transition">
                {t.hero.featureCards.reports.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.hero.featureCards.reports.desc}
              </p>
            </div>
            <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-cyan-700">
              <span>{t.hero.featureCards.reports.cta}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* Card 4: Symptom Guide */}
          <div 
            onClick={() => setActiveTab('symptoms')}
            className="group relative rounded-2xl bg-white border border-slate-200 p-6 shadow-xs hover:shadow-xl hover:border-emerald-400 transition cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition shadow-xs">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition">
                {t.hero.featureCards.symptoms.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.hero.featureCards.symptoms.desc}
              </p>
            </div>
            <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
              <span>{t.hero.featureCards.symptoms.cta}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Voice Assistant Hero Banner */}
      <section className="rounded-3xl border border-teal-200 bg-gradient-to-r from-teal-900 via-teal-800 to-cyan-900 text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-teal-500 text-teal-950 flex items-center justify-center shrink-0 shadow-md">
            <Mic className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold">
                {t.hero.voiceBanner.title}
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-400/20 text-teal-300 border border-teal-400/30">
                English & اردو
              </span>
            </div>
            <p className="text-xs sm:text-sm text-teal-100 mt-1 max-w-xl leading-relaxed">
              {t.hero.voiceBanner.desc}
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('voice')}
          className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-sm shadow-md transition flex items-center justify-center gap-2 shrink-0 cursor-pointer"
        >
          <span>{t.hero.voiceBanner.cta}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>

      {/* Official Health Authority Trust Strip */}
      <section className="rounded-2xl bg-white border border-slate-200 p-6 space-y-3 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
          <HeartHandshake className="w-4 h-4 text-teal-600" />
          <span>{language === 'en' ? 'Evidence-Based Framework & Regulated Public Health Registries' : 'مستند سرکاری طبی ذرائع اور ریگولیٹری ادارے'}</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs text-slate-700">
          <a 
            href="https://www.dra.gov.pk/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-3.5 rounded-xl bg-slate-50 hover:bg-teal-50 border border-slate-100 hover:border-teal-200 transition flex items-center justify-between"
          >
            <div>
              <p className="font-bold text-slate-900">DRAP Pakistan</p>
              <p className="text-[11px] text-slate-500">Drug Regulatory Authority</p>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
          <a 
            href="https://www.who.int/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-3.5 rounded-xl bg-slate-50 hover:bg-teal-50 border border-slate-100 hover:border-teal-200 transition flex items-center justify-between"
          >
            <div>
              <p className="font-bold text-slate-900">World Health Org</p>
              <p className="text-[11px] text-slate-500">WHO Essential Medicines</p>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
          <a 
            href="https://www.nhs.uk/medicines/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-3.5 rounded-xl bg-slate-50 hover:bg-teal-50 border border-slate-100 hover:border-teal-200 transition flex items-center justify-between"
          >
            <div>
              <p className="font-bold text-slate-900">NHS UK Health</p>
              <p className="text-[11px] text-slate-500">Medicines A to Z</p>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
          <a 
            href="https://medlineplus.gov/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-3.5 rounded-xl bg-slate-50 hover:bg-teal-50 border border-slate-100 hover:border-teal-200 transition flex items-center justify-between"
          >
            <div>
              <p className="font-bold text-slate-900">MedlinePlus (NIH)</p>
              <p className="text-[11px] text-slate-500">US National Library of Med</p>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>
      </section>
    </div>
  );
};
