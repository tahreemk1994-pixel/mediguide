import React, { useState, useEffect, useRef } from 'react';
import { ActiveTab, Language, MedicationReminder, DoseLog } from './types';
import { Navbar } from './components/Navbar';
import { HomeHero } from './components/HomeHero';
import { MedicineChecker } from './components/MedicineChecker';
import { SeasonalAdvisor } from './components/SeasonalAdvisor';
import { MedicationReminders } from './components/MedicationReminders';
import { ReportExplainer } from './components/ReportExplainer';
import { SymptomGuide } from './components/SymptomGuide';
import { VoiceAssistant } from './components/VoiceAssistant';
import { SafetyCentre } from './components/SafetyCentre';
import { Footer } from './components/Footer';
import { useOnlineStatus } from './hooks/useOnlineStatus';
import { WifiOff, Mic, BellRing, Check, X } from 'lucide-react';
import { stopHealthcareSpeech } from './utils/speechVoice';

const STORAGE_KEY_REMINDERS = 'mediguide_medication_reminders';
const STORAGE_KEY_LOGS = 'mediguide_dose_history';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [medicineSearchQuery, setMedicineSearchQuery] = useState<string>('');
  const [dueDoseAlert, setDueDoseAlert] = useState<{ reminder: MedicationReminder; time: string } | null>(null);
  const notifiedTimesRef = useRef<Set<string>>(new Set());

  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('mediguide_language');
      if (saved === 'ur' || saved === 'en') return saved;
    }
    return 'ur';
  });

  const isOnline = useOnlineStatus();

  // Stop any active speech on tab change
  useEffect(() => {
    stopHealthcareSpeech();
  }, [activeTab]);

  // Synchronize document dir and lang attributes
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ur' ? 'rtl' : 'ltr';
    if (language === 'ur') {
      document.body.classList.add('font-urdu');
    } else {
      document.body.classList.remove('font-urdu');
    }
  }, [language]);

  // Background Medication Alarm & Dose Checker
  useEffect(() => {
    const checkScheduledDoses = () => {
      try {
        const rawReminders = localStorage.getItem(STORAGE_KEY_REMINDERS);
        const rawLogs = localStorage.getItem(STORAGE_KEY_LOGS);
        if (!rawReminders) return;

        const reminders: MedicationReminder[] = JSON.parse(rawReminders);
        const logs: DoseLog[] = rawLogs ? JSON.parse(rawLogs) : [];

        const now = new Date();
        const currentHHMM = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        const todayDateStr = now.toISOString().split('T')[0];
        const dayOfWeek = now.getDay();

        reminders.filter(r => r.isActive).forEach((rem) => {
          const appliesToday = rem.frequency === 'daily' ||
            (rem.frequency === 'specific_days' && rem.daysOfWeek.includes(dayOfWeek)) ||
            rem.frequency === 'as_needed';

          if (appliesToday && rem.times.includes(currentHHMM)) {
            const notificationKey = `${rem.id}-${todayDateStr}-${currentHHMM}`;
            // If already notified for this exact minute, skip duplicate sound
            if (!notifiedTimesRef.current.has(notificationKey)) {
              // Check if already logged as taken today
              const alreadyTaken = logs.some(
                l => l.reminderId === rem.id && l.scheduledTime === currentHHMM && l.date === todayDateStr && l.status === 'taken'
              );

              if (!alreadyTaken) {
                notifiedTimesRef.current.add(notificationKey);
                setDueDoseAlert({ reminder: rem, time: currentHHMM });

                // Play audible alert
                try {
                  const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
                  if (AudioCtx) {
                    const ctx = new AudioCtx();
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = 'triangle';
                    osc.frequency.setValueAtTime(587.33, ctx.currentTime);
                    osc.frequency.setValueAtTime(880, ctx.currentTime + 0.15);
                    gain.gain.setValueAtTime(0.15, ctx.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start();
                    osc.stop(ctx.currentTime + 0.5);
                  }
                } catch (e) {
                  // AudioContext muted
                }

                // Push browser notification if granted
                if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
                  new Notification(
                    language === 'ur' ? `دوا لینے کا وقت: ${rem.medicineName}` : `Medication Due: ${rem.medicineName}`,
                    {
                      body: language === 'ur'
                        ? `${rem.dosage} — وقت: ${currentHHMM}. خوراک لینا نہ بھولیں!`
                        : `${rem.dosage} scheduled for ${currentHHMM}. Time to take your medication!`,
                      icon: '/icon.svg'
                    }
                  );
                }
              }
            }
          }
        });
      } catch (e) {
        console.warn('Medication alarm check error', e);
      }
    };

    checkScheduledDoses();
    const interval = setInterval(checkScheduledDoses, 20000); // Check every 20s
    return () => clearInterval(interval);
  }, [language]);

  const handleSearchMedicineFromOtherTabs = (query: string) => {
    setMedicineSearchQuery(query);
    setActiveTab('medicines');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickLaunchUrduVoice = () => {
    if (language !== 'ur') {
      setLanguage('ur');
      localStorage.setItem('mediguide_language', 'ur');
    }
    setActiveTab('voice');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMarkDueDoseTaken = () => {
    if (!dueDoseAlert) return;
    try {
      const now = new Date();
      const todayDateStr = now.toISOString().split('T')[0];
      const rawLogs = localStorage.getItem(STORAGE_KEY_LOGS);
      const logs: DoseLog[] = rawLogs ? JSON.parse(rawLogs) : [];

      const newLog: DoseLog = {
        id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        reminderId: dueDoseAlert.reminder.id,
        medicineName: dueDoseAlert.reminder.medicineName,
        scheduledTime: dueDoseAlert.time,
        date: todayDateStr,
        takenAt: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'taken'
      };

      localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify([...logs, newLog]));
      setDueDoseAlert(null);
    } catch (e) {
      setDueDoseAlert(null);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col bg-slate-50 text-slate-800 ${language === 'ur' ? 'font-urdu' : ''}`}>
      {/* Navbar with corporate brand, tabs, lang toggle, PWA install */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
        setLanguage={setLanguage}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'home' && (
          <HomeHero
            setActiveTab={setActiveTab}
            language={language}
            onSearchMedicine={handleSearchMedicineFromOtherTabs}
          />
        )}

        {activeTab === 'medicines' && (
          <MedicineChecker
            language={language}
            initialSearchQuery={medicineSearchQuery}
            onSetReminder={() => {
              setActiveTab('reminders');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'seasonal' && (
          <SeasonalAdvisor
            language={language}
            setActiveTab={setActiveTab}
            onSelectMedicine={handleSearchMedicineFromOtherTabs}
          />
        )}

        {activeTab === 'reminders' && (
          <MedicationReminders
            language={language}
            onSelectMedicineForDetails={handleSearchMedicineFromOtherTabs}
          />
        )}

        {activeTab === 'reports' && (
          <ReportExplainer language={language} />
        )}

        {activeTab === 'symptoms' && (
          <SymptomGuide language={language} />
        )}

        {activeTab === 'voice' && (
          <VoiceAssistant
            language={language}
            setLanguage={setLanguage}
            setActiveTab={setActiveTab}
            onSearchMedicine={handleSearchMedicineFromOtherTabs}
          />
        )}

        {activeTab === 'safety' && (
          <SafetyCentre language={language} />
        )}
      </main>

      {/* Footer */}
      <Footer language={language} setActiveTab={setActiveTab} />

      {/* Live Due Dose Notification Toast Banner */}
      {dueDoseAlert && (
        <div className="fixed top-20 right-4 left-4 sm:left-auto sm:right-6 sm:w-96 z-50 p-4 rounded-2xl bg-slate-900 text-white shadow-2xl border-2 border-amber-400 animate-bounce">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold shrink-0 mt-0.5 animate-pulse">
                <BellRing className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                    {language === 'ur' ? 'دوا لینے کا وقت!' : 'Medication Due Now!'}
                  </span>
                  <span className="text-xs font-mono font-bold text-white bg-slate-800 px-1.5 py-0.2 rounded">
                    {dueDoseAlert.time}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white">
                  {dueDoseAlert.reminder.medicineName}
                </h4>
                <p className="text-xs text-slate-300">
                  {dueDoseAlert.reminder.dosage}
                </p>
              </div>
            </div>

            <button
              onClick={() => setDueDoseAlert(null)}
              className="p-1 text-slate-400 hover:text-white rounded cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
            <button
              onClick={() => {
                setActiveTab('reminders');
                setDueDoseAlert(null);
              }}
              className="text-xs text-teal-400 hover:underline font-bold cursor-pointer"
            >
              {language === 'ur' ? 'شیڈول دیکھیں' : 'View Schedule'}
            </button>
            <button
              onClick={handleMarkDueDoseTaken}
              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-1 cursor-pointer shadow-xs"
            >
              <Check className="w-3.5 h-3.5" />
              <span>{language === 'ur' ? 'دوا لے لی ہے' : 'Mark as Taken'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating One-Tap Urdu Voice Assistant Quick Trigger Button */}
      {activeTab !== 'voice' && (
        <button
          onClick={handleQuickLaunchUrduVoice}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-teal-700 to-cyan-800 hover:from-teal-600 hover:to-cyan-700 text-white shadow-2xl hover:scale-105 transition-all cursor-pointer border border-teal-400/40 group"
          title="Launch Urdu AI Voice Assistant"
        >
          <div className="relative">
            <Mic className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-teal-300 rounded-full animate-ping"></span>
          </div>
          <span className="text-xs font-bold font-sans tracking-wide">
            {language === 'en' ? 'Urdu Voice AI' : 'اردو وائس اسسٹنٹ'}
          </span>
        </button>
      )}

      {/* Persistent Non-Intrusive Offline Mode Badge Toast */}
      {!isOnline && (
        <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-xl bg-amber-600 px-3.5 py-2 text-xs font-semibold text-white shadow-xl animate-bounce">
          <WifiOff className="w-4 h-4" />
          <span>
            {language === 'en'
              ? 'Offline Mode Active — Using cached health data'
              : 'آف لائن موڈ فعال ہے — محفوظ شدہ ڈیٹا استعمال ہو رہا ہے'}
          </span>
        </div>
      )}
    </div>
  );
}
