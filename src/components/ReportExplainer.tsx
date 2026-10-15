import React, { useState } from 'react';
import { 
  FileText, 
  AlertCircle, 
  Info, 
  CheckCircle, 
  ArrowUpRight, 
  ArrowDownRight, 
  User, 
  ShieldAlert, 
  HelpCircle,
  Volume2,
  VolumeX
} from 'lucide-react';
import { Language, MedicalReport } from '../types';
import { MEDICAL_REPORTS_DATA } from '../data/reports';
import { TRANSLATIONS } from '../data/translations';
import { speakHealthcareText, stopHealthcareSpeech } from '../utils/speechVoice';

interface ReportExplainerProps {
  language: Language;
}

export const ReportExplainer: React.FC<ReportExplainerProps> = ({ language }) => {
  const [selectedReportId, setSelectedReportId] = useState<string>('cbc');
  const [speakingReport, setSpeakingReport] = useState<boolean>(false);
  const t = TRANSLATIONS[language];

  const currentReport: MedicalReport = 
    MEDICAL_REPORTS_DATA.find((r) => r.id === selectedReportId) || MEDICAL_REPORTS_DATA[0];

  const handleSpeakReport = () => {
    if (speakingReport) {
      stopHealthcareSpeech();
      setSpeakingReport(false);
      return;
    }

    stopHealthcareSpeech();

    const title = currentReport.title[language];
    const itemsSummary = currentReport.items.map((item) => {
      const statusText = item.status === 'normal' 
        ? (language === 'en' ? 'Normal' : 'معمول کے مطابق')
        : item.status === 'high'
        ? (language === 'en' ? 'Above reference range' : 'معمول سے زیادہ')
        : (language === 'en' ? 'Below reference range' : 'معمول سے کم');
      return `${item.name[language]}, ${item.result} ${item.unit}. Status: ${statusText}.`;
    }).join(' ');

    const note = currentReport.clinicalNote[language];
    const fullText = `${title}۔ ${itemsSummary}۔ ${note}`;

    setSpeakingReport(true);
    speakHealthcareText(fullText, language, {
      onStart: () => setSpeakingReport(true),
      onEnd: () => setSpeakingReport(false),
      onError: () => setSpeakingReport(false),
    });
  };

  return (
    <div className="space-y-8 py-2">
      {/* Title & Subtitle */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-cyan-700 font-bold text-xs uppercase tracking-wider">
          <FileText className="w-4 h-4" />
          <span>{language === 'en' ? 'Educational Lab Report Interpreter' : 'فرضی لیب رپورٹ کا تعلیمی جائزہ'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {t.reports.title}
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          {t.reports.subtitle}
        </p>
      </div>

      {/* Mandatory Prominent Fictional Demonstration Banner */}
      <div className="rounded-2xl border border-amber-300 bg-amber-50/90 p-4 sm:p-5 shadow-xs">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h2 className="text-sm font-bold text-amber-950">
              {t.reports.demoNoticeTitle}
            </h2>
            <p className="text-xs text-amber-900 leading-relaxed">
              {t.reports.demoNoticeDesc}
            </p>
          </div>
        </div>
      </div>

      {/* Report Selection Tabs */}
      <div className="space-y-3">
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
          {t.reports.selectReport}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {MEDICAL_REPORTS_DATA.map((report) => {
            const isSelected = report.id === currentReport.id;
            return (
              <button
                key={report.id}
                onClick={() => {
                  setSelectedReportId(report.id);
                  if (speakingReport && 'speechSynthesis' in window) {
                    window.speechSynthesis.cancel();
                    setSpeakingReport(false);
                  }
                }}
                className={`p-3 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-teal-700 border-teal-800 text-white shadow-md'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                <div className="space-y-1">
                  <p className="text-xs font-bold leading-snug line-clamp-2">
                    {report.title[language]}
                  </p>
                  <p className={`text-[10px] ${isSelected ? 'text-teal-200' : 'text-slate-500'}`}>
                    {report.category[language]}
                  </p>
                </div>
                <div className="pt-2 mt-1">
                  <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                    isSelected ? 'bg-teal-800 text-teal-100' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {report.items.length} {language === 'en' ? 'Tests' : 'ٹیسٹ'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Report Card Container */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-md p-5 sm:p-7 space-y-6">
        {/* Report Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div className="space-y-1">
            <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
              {currentReport.category[language]}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              {currentReport.title[language]}
            </h2>
            <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
              {currentReport.description[language]}
            </p>
          </div>

          {/* Audio Listen Button */}
          <button
            onClick={handleSpeakReport}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shrink-0 ${
              speakingReport
                ? 'bg-rose-100 text-rose-700 border border-rose-300 animate-pulse'
                : 'bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200'
            }`}
          >
            {speakingReport ? (
              <>
                <VolumeX className="w-4 h-4" />
                <span>{language === 'en' ? 'Stop Audio' : 'آواز بند کریں'}</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4" />
                <span>{language === 'en' ? 'Listen to Report' : 'رپورٹ سنیں'}</span>
              </>
            )}
          </button>
        </div>

        {/* Fictional Sample Patient Context */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2.5 text-xs text-slate-700">
          <User className="w-4 h-4 text-slate-500 shrink-0" />
          <div>
            <span className="font-bold">{t.reports.patientContext}: </span>
            <span>{currentReport.samplePatientContext[language]}</span>
          </div>
        </div>

        {/* Test Items Table / List */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Info className="w-4 h-4 text-teal-600" />
            <span>{language === 'en' ? 'Sample Test Values & Neutral Interpretations' : 'ٹیسٹ کے نمونہ نتائج اور غیر جانبدارانہ وضاحت'}</span>
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px] bg-slate-50">
                  <th className="py-3 px-3 font-semibold">{t.reports.testName}</th>
                  <th className="py-3 px-3 font-semibold">{t.reports.result}</th>
                  <th className="py-3 px-3 font-semibold">{t.reports.refRange}</th>
                  <th className="py-3 px-3 font-semibold">{t.reports.status}</th>
                  <th className="py-3 px-3 font-semibold min-w-[200px]">{t.reports.explanation}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {currentReport.items.map((item, idx) => {
                  return (
                    <tr key={idx} className="hover:bg-teal-50/30 transition">
                      {/* Name & Abbreviation */}
                      <td className="py-3.5 px-3 align-top font-bold text-slate-900">
                        <div>{item.name[language]}</div>
                        {item.abbreviation && (
                          <span className="text-[10px] font-mono text-slate-400">
                            ({item.abbreviation})
                          </span>
                        )}
                      </td>

                      {/* Result with Unit */}
                      <td className="py-3.5 px-3 align-top whitespace-nowrap">
                        <span className="font-bold text-sm text-slate-900 font-mono">
                          {item.result}
                        </span>{' '}
                        <span className="text-slate-500 text-[11px]">{item.unit}</span>
                      </td>

                      {/* Reference Range */}
                      <td className="py-3.5 px-3 align-top text-slate-600 whitespace-nowrap">
                        <span className="bg-slate-100 px-2 py-0.5 rounded font-mono text-[11px]">
                          {item.referenceRange}
                        </span>
                      </td>

                      {/* Status Badge (Neutral styling as required) */}
                      <td className="py-3.5 px-3 align-top whitespace-nowrap">
                        {item.status === 'normal' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                            <CheckCircle className="w-3 h-3 text-emerald-600" />
                            <span>{t.reports.statusNormal}</span>
                          </span>
                        )}
                        {item.status === 'high' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-900 border border-amber-300">
                            <ArrowUpRight className="w-3 h-3 text-amber-700" />
                            <span>{t.reports.statusHigh}</span>
                          </span>
                        )}
                        {item.status === 'low' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-sky-100 text-sky-900 border border-sky-300">
                            <ArrowDownRight className="w-3 h-3 text-sky-700" />
                            <span>{t.reports.statusLow}</span>
                          </span>
                        )}
                      </td>

                      {/* Plain-Language Explanation */}
                      <td className="py-3.5 px-3 align-top text-slate-700 leading-relaxed">
                        {item.explanation[language]}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Educational Reference Note */}
        <div className="p-4 rounded-xl bg-cyan-50/70 border border-cyan-200 text-cyan-950 space-y-1 text-xs">
          <p className="font-bold flex items-center gap-1.5 text-cyan-900">
            <HelpCircle className="w-4 h-4 text-cyan-700 shrink-0" />
            <span>{t.reports.clinicalNoteTitle}</span>
          </p>
          <p className="leading-relaxed text-cyan-900/90">
            {currentReport.clinicalNote[language]}
          </p>
        </div>

        {/* Closing Disclaimer */}
        <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500 font-medium">
          <ShieldAlert className="w-4 h-4 text-slate-400 shrink-0" />
          <span>{t.reports.disclaimer}</span>
        </div>
      </div>
    </div>
  );
};
