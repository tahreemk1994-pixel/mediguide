import React from 'react';
import { HeartPulse, ShieldAlert, ExternalLink, Lock } from 'lucide-react';
import { ActiveTab, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface FooterProps {
  language: Language;
  setActiveTab: (tab: ActiveTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ language, setActiveTab }) => {
  const t = TRANSLATIONS[language];

  return (
    <footer className="mt-16 border-t border-slate-200 bg-white text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
              <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center">
                <HeartPulse className="w-5 h-5" />
              </div>
              <span>{t.appName}</span>
            </div>
            <p className="text-slate-500 leading-relaxed max-w-md">
              {t.subTagline}
            </p>
            <div className="flex items-center gap-2 pt-1 text-[11px] text-teal-800 font-semibold">
              <Lock className="w-3.5 h-3.5 text-teal-600" />
              <span>{language === 'en' ? 'Private & Offline-Ready Client App' : 'محفوظ اور آف لائن فعال ایپ'}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-teal-700 transition cursor-pointer"
                >
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('medicines'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-teal-700 transition cursor-pointer"
                >
                  {t.nav.medicines}
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('seasonal'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-teal-700 transition cursor-pointer"
                >
                  {t.nav.seasonal}
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('reminders'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-teal-700 transition cursor-pointer"
                >
                  {t.nav.reminders}
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('reports'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-teal-700 transition cursor-pointer"
                >
                  {t.nav.reports}
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('symptoms'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-teal-700 transition cursor-pointer"
                >
                  {t.nav.symptoms}
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('voice'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-teal-700 transition cursor-pointer"
                >
                  {t.nav.voice}
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('safety'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-teal-700 transition cursor-pointer"
                >
                  {t.nav.safety}
                </button>
              </li>
            </ul>
          </div>

          {/* Emergency & References */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              {language === 'en' ? 'Emergency Services' : 'ہنگامی سروسز'}
            </h4>
            <div className="space-y-1 text-slate-700">
              <p className="font-bold text-rose-700">Rescue: 1122</p>
              <p className="font-semibold text-slate-600">Edhi Ambulance: 115</p>
              <p className="text-[11px] text-slate-500">UK: 999 | US: 911 | EU: 112</p>
            </div>
            <div className="pt-2">
              <p className="font-bold text-slate-800 text-[11px]">
                {t.footer.trustBadges}
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                DRAP, WHO, NHS UK, MedlinePlus
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer Warning Strip in Footer */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 flex items-start gap-2.5 text-[11px] leading-relaxed">
          <ShieldAlert className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <p>{t.footer.disclaimerBrief}</p>
        </div>

        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-400 text-[11px]">
          <p>© {new Date().getFullYear()} {t.footer.copyright}</p>
          <p>{language === 'en' ? 'Built for accessible, privacy-first healthcare literacy.' : 'عوامی طبی آگاہی اور پرائیویسی کے تحفظ کے لیے تیار کردہ۔'}</p>
        </div>
      </div>
    </footer>
  );
};
