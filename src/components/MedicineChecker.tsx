import React, { useState, useMemo } from 'react';
import { 
  Pill, 
  Search, 
  X, 
  AlertTriangle, 
  ShieldCheck, 
  Volume2, 
  VolumeX, 
  Calendar, 
  ExternalLink,
  BookOpen,
  Filter,
  CheckCircle,
  HelpCircle,
  Bell
} from 'lucide-react';
import { Language, Medicine } from '../types';
import { MEDICINES_DATA } from '../data/medicines';
import { TRANSLATIONS } from '../data/translations';
import { speakHealthcareText, stopHealthcareSpeech } from '../utils/speechVoice';

interface MedicineCheckerProps {
  language: Language;
  initialSearchQuery?: string;
  onSetReminder?: (medName: string) => void;
}

export const MedicineChecker: React.FC<MedicineCheckerProps> = ({
  language,
  initialSearchQuery = '',
  onSetReminder,
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [speakingMedId, setSpeakingMedId] = useState<string | null>(null);
  const t = TRANSLATIONS[language];

  // Derive unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    MEDICINES_DATA.forEach((med) => {
      set.add(med.category[language]);
    });
    return Array.from(set);
  }, [language]);

  // Filtered medicines
  const filteredMedicines = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return MEDICINES_DATA.filter((med) => {
      const matchCategory = 
        selectedCategory === 'all' || med.category[language] === selectedCategory;

      if (!q) return matchCategory;

      const nameMatch = med.genericName.toLowerCase().includes(q);
      const aliasMatch = med.brandAliases.some((alias) => 
        alias.toLowerCase().includes(q)
      );
      const activeMatch = med.activeIngredient[language].toLowerCase().includes(q);
      const useMatch = med.commonUses[language].some((use) => 
        use.toLowerCase().includes(q)
      );

      return matchCategory && (nameMatch || aliasMatch || activeMatch || useMatch);
    });
  }, [searchQuery, selectedCategory, language]);

  // Browser Text-to-Speech function
  const handleSpeak = (med: Medicine) => {
    if (speakingMedId === med.id) {
      stopHealthcareSpeech();
      setSpeakingMedId(null);
      return;
    }

    stopHealthcareSpeech();

    const textToSpeak = language === 'en'
      ? `${med.genericName}. Category: ${med.category.en}. Active ingredient: ${med.activeIngredient.en}. Common uses: ${med.commonUses.en.join('. ')}. Important precautions: ${med.warningsAndPrecautions.en.join('. ')}.`
      : `${med.genericName}۔ زمرہ: ${med.category.ur}۔ فعال جزو: ${med.activeIngredient.ur}۔ عام استعمالات: ${med.commonUses.ur.join('، ')}۔ اہم احتیاطی تدابیر: ${med.warningsAndPrecautions.ur.join('، ')}۔`;

    setSpeakingMedId(med.id);
    speakHealthcareText(textToSpeak, language, {
      onStart: () => setSpeakingMedId(med.id),
      onEnd: () => setSpeakingMedId(null),
      onError: () => setSpeakingMedId(null),
    });
  };

  const handleClear = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    stopHealthcareSpeech();
    setSpeakingMedId(null);
  };

  return (
    <div className="space-y-8 py-2">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-teal-700 font-bold text-xs uppercase tracking-wider">
          <Pill className="w-4 h-4" />
          <span>{language === 'en' ? 'Evidence-Based Database' : 'مصدقہ معلوماتی ذخیرہ'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {t.medicines.title}
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          {t.medicines.subtitle}
        </p>
      </div>

      {/* Mandatory Safety Notice */}
      <div className="rounded-xl border border-teal-200 bg-teal-50/80 p-3.5 text-xs text-teal-900 flex items-start gap-2.5 shadow-2xs">
        <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
        <p className="leading-relaxed font-medium">
          {t.medicines.disclaimerNote}
        </p>
      </div>

      {/* Search Bar & Filters */}
      <div className="space-y-4 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row items-stretch gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.medicines.searchPlaceholder}
              className="w-full pl-10 pr-10 py-3 bg-slate-50 hover:bg-white border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-teal-500 font-medium transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-md cursor-pointer"
                title="Clear input"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {(searchQuery || selectedCategory !== 'all') && (
            <button
              onClick={handleClear}
              className="px-4 py-3 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold text-xs transition cursor-pointer flex items-center justify-center gap-1.5"
            >
              <X className="w-3.5 h-3.5" />
              <span>{t.medicines.clearSearch}</span>
            </button>
          )}
        </div>

        {/* Category Pills Filter */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
            <Filter className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Filter by Category:' : 'زمرہ کے لحاظ سے ترتیب دیں:'}</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {t.medicines.allCategories}
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-1">
        <span>{t.medicines.showingResults.replace('{count}', filteredMedicines.length.toString())}</span>
        <span className="italic">
          {language === 'en' ? 'Data verified against DRAP & WHO guidelines' : 'ڈریپ اور ڈبلیو ایچ او تصدیق شدہ ڈیٹا'}
        </span>
      </div>

      {/* Medicines Cards Grid */}
      {filteredMedicines.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredMedicines.map((med) => {
            const isSpeaking = speakingMedId === med.id;
            return (
              <div
                key={med.id}
                className="rounded-2xl bg-white border border-slate-200 hover:border-teal-300 p-6 shadow-xs hover:shadow-lg transition space-y-5 flex flex-col justify-between"
              >
                {/* Header of Medicine Card */}
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                        {med.genericName}
                      </h2>
                      <p className="text-xs font-semibold text-teal-700 mt-0.5">
                        {med.category[language]}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {/* Set Daily Reminder Button */}
                      {onSetReminder && (
                        <button
                          onClick={() => onSetReminder(med.genericName)}
                          className="p-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 text-xs font-bold bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200"
                          title={language === 'ur' ? 'اس دوا کا روزانہ الرٹ مقرر کریں' : 'Set daily reminder for this medicine'}
                        >
                          <Bell className="w-4 h-4 text-amber-600" />
                          <span className="hidden sm:inline">
                            {language === 'ur' ? 'الرٹ لگائیں' : 'Set Alert'}
                          </span>
                        </button>
                      )}

                      {/* Audio Readout Button */}
                      <button
                        onClick={() => handleSpeak(med)}
                        className={`p-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 text-xs font-bold ${
                          isSpeaking
                            ? 'bg-rose-100 text-rose-700 border border-rose-300 animate-pulse'
                            : 'bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200'
                        }`}
                        title={isSpeaking ? t.medicines.stopAudio : t.medicines.listenInfo}
                      >
                        {isSpeaking ? (
                          <>
                            <VolumeX className="w-4 h-4" />
                            <span>{t.medicines.stopAudio}</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-4 h-4" />
                            <span>{t.medicines.listenInfo}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Brand Aliases Chips */}
                  {med.brandAliases.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[11px] font-semibold text-slate-400">
                        {language === 'en' ? 'Common Brands:' : 'معروف برانڈز:'}
                      </span>
                      {med.brandAliases.map((brand) => (
                        <span
                          key={brand}
                          className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium border border-slate-200"
                        >
                          {brand}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Body Details */}
                <div className="space-y-4 text-xs">
                  {/* Active Ingredient */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <p className="font-bold text-slate-700 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-teal-600" />
                      <span>{t.medicines.activeIngredient}</span>
                    </p>
                    <p className="text-slate-800 font-medium">
                      {med.activeIngredient[language]}
                    </p>
                  </div>

                  {/* Common Uses */}
                  <div className="space-y-1.5">
                    <p className="font-bold text-slate-800 flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{t.medicines.uses}</span>
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-slate-700 pl-1">
                      {med.commonUses[language].map((use, idx) => (
                        <li key={idx} className="leading-relaxed">
                          {use}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Common Side Effects */}
                  <div className="space-y-1.5">
                    <p className="font-bold text-slate-800 flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                      <span>{t.medicines.sideEffects}</span>
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-slate-700 pl-1">
                      {med.commonSideEffects[language].map((effect, idx) => (
                        <li key={idx} className="leading-relaxed">
                          {effect}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Warnings & Precautions */}
                  <div className="p-3.5 rounded-xl bg-amber-50/90 border border-amber-200 text-amber-950 space-y-1.5">
                    <p className="font-bold flex items-center gap-1.5 text-amber-900">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>{t.medicines.warnings}</span>
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-amber-900/90 pl-1">
                      {med.warningsAndPrecautions[language].map((warn, idx) => (
                        <li key={idx} className="leading-relaxed">
                          {warn}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer of Medicine Card: Source & Review Date */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>{t.medicines.source}: <strong>{med.source.verifiedOrganization}</strong></span>
                    {med.source.url && (
                      <a
                        href={med.source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-700 hover:underline inline-flex items-center gap-0.5 ml-1"
                        title="View Official Source Registry"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{t.medicines.lastReviewed}: {med.lastReviewed}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty / Not Found State */
        <div className="rounded-2xl bg-white border border-slate-200 p-8 text-center space-y-4 max-w-xl mx-auto shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900">
              {t.medicines.notFoundTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {t.medicines.notFoundDesc}
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl text-left text-xs space-y-2 border border-slate-200">
            <p className="font-bold text-slate-800">
              {language === 'en' ? 'Important Safety Guidance:' : 'اہم طبی رہنمائی:'}
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-600">
              {t.medicines.notFoundTips.map((tip, idx) => (
                <li key={idx}>{tip}</li>
              ))}
            </ul>
          </div>

          <button
            onClick={handleClear}
            className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-xs transition cursor-pointer"
          >
            {language === 'en' ? 'Reset Search & View All Medicines' : 'تمام ادویات کی فہرست دیکھیں'}
          </button>
        </div>
      )}
    </div>
  );
};
