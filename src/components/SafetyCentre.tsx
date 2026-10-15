import React from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  PhoneCall, 
  Lock, 
  ExternalLink, 
  UserCheck, 
  Pill, 
  FileCheck2, 
  Eye, 
  HeartHandshake,
  CheckCircle2
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface SafetyCentreProps {
  language: Language;
}

export const SafetyCentre: React.FC<SafetyCentreProps> = ({ language }) => {
  const t = TRANSLATIONS[language];
  const s = t.safety;

  return (
    <div className="space-y-10 py-2">
      {/* Title & Subtitle */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-teal-700 font-bold text-xs uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>{language === 'en' ? 'Standards & Legal Disclaimers' : 'طبی معیار اور قانونی رہنمائی'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {s.title}
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          {s.subtitle}
        </p>
      </div>

      {/* Primary Medical Disclaimer Box */}
      <section className="rounded-2xl border-2 border-rose-300 bg-rose-50/70 p-6 sm:p-7 space-y-3 shadow-xs">
        <div className="flex items-center gap-2.5 text-rose-900 font-bold text-base sm:text-lg">
          <AlertTriangle className="w-6 h-6 text-rose-600 shrink-0" />
          <h2>{s.disclaimerHeading}</h2>
        </div>
        <p className="text-xs sm:text-sm text-rose-950 leading-relaxed">
          {s.disclaimerText}
        </p>
      </section>

      {/* Two-Column: When to Consult Physician & Emergency Helplines */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* When to Consult Doctor */}
        <section className="rounded-2xl bg-white border border-slate-200 p-6 space-y-4 shadow-xs">
          <div className="flex items-center gap-2.5 text-slate-900 font-bold text-base">
            <UserCheck className="w-5 h-5 text-teal-600" />
            <h2>{s.whenToConsultHeading}</h2>
          </div>
          <ul className="space-y-2.5 text-xs text-slate-700">
            {s.whenToConsultPoints.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2 leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Emergency Helplines */}
        <section className="rounded-2xl bg-slate-900 text-white p-6 space-y-4 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 text-rose-400 font-bold text-base">
              <PhoneCall className="w-5 h-5 text-rose-400" />
              <h2>{s.emergencyHeading}</h2>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-300">
              {s.emergencyPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5"></span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-2">
            <a
              href="tel:1122"
              className="w-full text-center py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition shadow-xs"
            >
              {language === 'en' ? 'Dial Rescue 1122' : 'ریسکیو 1122 ڈائل کریں'}
            </a>
          </div>
        </section>
      </div>

      {/* Safe Medicine Use & Counterfeit Prevention */}
      <section className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-7 space-y-4 shadow-xs">
        <div className="flex items-center gap-2.5 text-slate-900 font-bold text-base">
          <Pill className="w-5 h-5 text-cyan-600" />
          <h2>{s.medicineSafetyHeading}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700">
          {s.medicineSafetyPoints.map((point, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <p className="font-medium leading-relaxed">{point}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trusted Official Medical Sources */}
      <section className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-7 space-y-4 shadow-xs">
        <div className="flex items-center gap-2.5 text-slate-900 font-bold text-base">
          <HeartHandshake className="w-5 h-5 text-teal-600" />
          <h2>{s.officialReferencesHeading}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {s.officialReferences.map((ref, idx) => (
            <a
              key={idx}
              href={ref.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 rounded-xl border border-slate-200 hover:border-teal-400 bg-slate-50/50 hover:bg-teal-50/30 transition flex items-start justify-between gap-3 text-xs"
            >
              <div className="space-y-1">
                <p className="font-bold text-slate-900 group-hover:text-teal-800 transition">
                  {ref.name}
                </p>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  {ref.desc}
                </p>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-teal-700 shrink-0 mt-0.5" />
            </a>
          ))}
        </div>
      </section>

      {/* Privacy Policy & Cybersecurity Architecture Checklist */}
      <section className="rounded-2xl bg-white border border-teal-200 p-6 sm:p-7 space-y-4 shadow-xs">
        <div className="flex items-center gap-2.5 text-slate-900 font-bold text-base">
          <Lock className="w-5 h-5 text-teal-600" />
          <h2>{s.privacyHeading}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {s.privacyPoints.map((point, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-teal-50/50 border border-teal-100 flex items-start gap-2.5">
              <FileCheck2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
              <p className="text-slate-800 leading-relaxed">{point}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
