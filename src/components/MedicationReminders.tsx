import React, { useState, useEffect, useMemo } from 'react';
import { 
  Bell, 
  BellRing, 
  Clock, 
  Plus, 
  CheckCircle2, 
  AlertCircle, 
  Trash2, 
  Edit3, 
  X, 
  Calendar, 
  Pill, 
  Utensils, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  ShieldCheck, 
  Check, 
  Pause, 
  Play, 
  CheckCheck,
  ChevronRight,
  HelpCircle
} from 'lucide-react';
import { Language, MedicationReminder, DoseLog, FoodRelation } from '../types';
import { MEDICINES_DATA } from '../data/medicines';
import { TRANSLATIONS } from '../data/translations';
import { speakHealthcareText, stopHealthcareSpeech } from '../utils/speechVoice';

interface MedicationRemindersProps {
  language: Language;
  onSelectMedicineForDetails?: (medName: string) => void;
}

const STORAGE_KEY_REMINDERS = 'mediguide_medication_reminders';
const STORAGE_KEY_LOGS = 'mediguide_dose_history';

// Default initial sample reminders so users have clear offline examples
const DEFAULT_SAMPLE_REMINDERS: MedicationReminder[] = [
  {
    id: 'sample-paracetamol',
    medicineName: 'Paracetamol (Panadol)',
    dosage: '1 Tablet (500mg)',
    times: ['08:00', '20:00'],
    frequency: 'daily',
    daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
    foodRelation: 'after_meal',
    notes: 'Take after meals with a full glass of water. For fever & bodyache.',
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'sample-omeprazole',
    medicineName: 'Omeprazole (Risek / Prilosec)',
    dosage: '1 Capsule (20mg)',
    times: ['07:30'],
    frequency: 'daily',
    daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
    foodRelation: 'before_meal',
    notes: 'Take 30 minutes before breakfast with plain water. Swallow whole.',
    isActive: true,
    createdAt: new Date().toISOString()
  }
];

export const MedicationReminders: React.FC<MedicationRemindersProps> = ({
  language,
  onSelectMedicineForDetails,
}) => {
  const [reminders, setReminders] = useState<MedicationReminder[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_REMINDERS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Error reading reminders from localStorage', e);
    }
    return DEFAULT_SAMPLE_REMINDERS;
  });

  const [doseLogs, setDoseLogs] = useState<DoseLog[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LOGS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Error reading dose logs from localStorage', e);
    }
    return [];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReminderId, setEditingReminderId] = useState<string | null>(null);

  // Form State
  const [formMedName, setFormMedName] = useState('');
  const [formDosage, setFormDosage] = useState('');
  const [formTimes, setFormTimes] = useState<string[]>(['08:00']);
  const [formFoodRelation, setFormFoodRelation] = useState<FoodRelation>('after_meal');
  const [formNotes, setFormNotes] = useState('');
  const [formFrequency, setFormFrequency] = useState<'daily' | 'specific_days' | 'as_needed'>('daily');
  const [formDays, setFormDays] = useState<number[]>([0, 1, 2, 3, 4, 5, 6]);

  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      return Notification.permission;
    }
    return 'default';
  });

  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [currentTimeStr, setCurrentTimeStr] = useState<string>('');

  const t = TRANSLATIONS[language];
  const r = t.reminders;

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_REMINDERS, JSON.stringify(reminders));
    } catch (e) {
      console.warn('Error saving reminders to localStorage', e);
    }
  }, [reminders]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(doseLogs));
    } catch (e) {
      console.warn('Error saving dose logs to localStorage', e);
    }
  }, [doseLogs]);

  // Update current time string ('HH:MM') every minute
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      setCurrentTimeStr(`${hours}:${mins}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 15000); // Check every 15s
    return () => clearInterval(interval);
  }, []);

  const todayDateStr = useMemo(() => {
    const now = new Date();
    return now.toISOString().split('T')[0];
  }, []);

  const todayDayOfWeek = useMemo(() => {
    return new Date().getDay(); // 0 = Sun, 1 = Mon...
  }, []);

  // Play gentle alert chime
  const playAlertChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch (e) {
      // Audio context muted
    }
  };

  // Request browser notification permission
  const handleRequestNotifications = async () => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      try {
        const perm = await Notification.requestPermission();
        setNotificationPermission(perm);
        if (perm === 'granted') {
          playAlertChime();
          new Notification(
            language === 'ur' ? 'میڈی گائیڈ الرٹس فعال ہو گئے ہیں' : 'MediGuide Dose Alerts Activated',
            {
              body: language === 'ur' ? 'آپ کی دوائیوں کے الرٹس بروقت موصول ہوں گے۔' : 'You will receive daily reminders for your scheduled medicines.',
              icon: '/icon.svg'
            }
          );
        }
      } catch (e) {
        console.warn('Notification permission error:', e);
      }
    }
  };

  // Check active reminders due for today
  const todayDoses = useMemo(() => {
    const list: Array<{
      reminderId: string;
      medicineName: string;
      dosage: string;
      time: string;
      foodRelation: FoodRelation;
      notes?: string;
      isTaken: boolean;
      takenAt?: string;
    }> = [];

    reminders.filter(r => r.isActive).forEach((rem) => {
      // Check if scheduled for today
      const appliesToday = rem.frequency === 'daily' || 
        (rem.frequency === 'specific_days' && rem.daysOfWeek.includes(todayDayOfWeek)) ||
        rem.frequency === 'as_needed';

      if (appliesToday) {
        rem.times.forEach((tStr) => {
          const log = doseLogs.find(
            (l) => l.reminderId === rem.id && l.scheduledTime === tStr && l.date === todayDateStr && l.status === 'taken'
          );
          list.push({
            reminderId: rem.id,
            medicineName: rem.medicineName,
            dosage: rem.dosage,
            time: tStr,
            foodRelation: rem.foodRelation,
            notes: rem.notes,
            isTaken: !!log,
            takenAt: log?.takenAt
          });
        });
      }
    });

    // Sort chronologically by time
    return list.sort((a, b) => a.time.localeCompare(b.time));
  }, [reminders, doseLogs, todayDayOfWeek, todayDateStr]);

  // Adherence calculation for today
  const totalTodayDoses = todayDoses.length;
  const takenTodayDoses = todayDoses.filter(d => d.isTaken).length;
  const adherencePercent = totalTodayDoses > 0 ? Math.round((takenTodayDoses / totalTodayDoses) * 100) : 0;

  // Next upcoming dose
  const nextUpcomingDose = useMemo(() => {
    if (!currentTimeStr) return null;
    return todayDoses.find(d => !d.isTaken && d.time >= currentTimeStr) || todayDoses.find(d => !d.isTaken) || null;
  }, [todayDoses, currentTimeStr]);

  // Mark dose as taken or toggle
  const handleToggleDoseTaken = (reminderId: string, scheduledTime: string, currentTaken: boolean) => {
    playAlertChime();
    if (currentTaken) {
      // Untake (remove log)
      setDoseLogs((prev) =>
        prev.filter((l) => !(l.reminderId === reminderId && l.scheduledTime === scheduledTime && l.date === todayDateStr))
      );
    } else {
      // Mark as taken
      const rem = reminders.find(r => r.id === reminderId);
      const newLog: DoseLog = {
        id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        reminderId,
        medicineName: rem ? rem.medicineName : 'Medicine',
        scheduledTime,
        date: todayDateStr,
        takenAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'taken'
      };
      setDoseLogs((prev) => [...prev, newLog]);
    }
  };

  // Toggle Reminder Active/Inactive
  const handleToggleReminderActive = (id: string) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isActive: !r.isActive } : r))
    );
  };

  // Delete Reminder
  const handleDeleteReminder = (id: string) => {
    if (window.confirm(language === 'ur' ? 'کیا آپ واقعی اس الرٹ کو ختم کرنا چاہتے ہیں؟' : 'Are you sure you want to delete this medication reminder?')) {
      setReminders((prev) => prev.filter((r) => r.id !== id));
      setDoseLogs((prev) => prev.filter((l) => l.reminderId !== id));
    }
  };

  // Open Modal for Add
  const handleOpenAddModal = () => {
    setEditingReminderId(null);
    setFormMedName('');
    setFormDosage('1 Tablet (500mg)');
    setFormTimes(['08:00', '20:00']);
    setFormFoodRelation('after_meal');
    setFormNotes('');
    setFormFrequency('daily');
    setFormDays([0, 1, 2, 3, 4, 5, 6]);
    setIsModalOpen(true);
  };

  // Open Modal for Edit
  const handleOpenEditModal = (rem: MedicationReminder) => {
    setEditingReminderId(rem.id);
    setFormMedName(rem.medicineName);
    setFormDosage(rem.dosage);
    setFormTimes([...rem.times]);
    setFormFoodRelation(rem.foodRelation);
    setFormNotes(rem.notes || '');
    setFormFrequency(rem.frequency);
    setFormDays([...rem.daysOfWeek]);
    setIsModalOpen(true);
  };

  // Quick pick from curated medicines database
  const handleQuickPickMedicine = (medName: string) => {
    setFormMedName(medName);
  };

  // Add another time slot to the form
  const handleAddTimeSlot = () => {
    setFormTimes((prev) => [...prev, '12:00']);
  };

  const handleRemoveTimeSlot = (index: number) => {
    if (formTimes.length <= 1) return;
    setFormTimes((prev) => prev.filter((_, i) => i !== index));
  };

  const handleTimeChange = (index: number, val: string) => {
    setFormTimes((prev) => {
      const copy = [...prev];
      copy[index] = val;
      return copy;
    });
  };

  // Save Reminder form submit
  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formMedName.trim() || formTimes.length === 0) return;

    // Clean and sort times
    const cleanTimes = Array.from(new Set(formTimes.map(t => t.trim()))).filter(Boolean).sort();

    if (editingReminderId) {
      setReminders((prev) =>
        prev.map((r) =>
          r.id === editingReminderId
            ? {
                ...r,
                medicineName: formMedName.trim(),
                dosage: formDosage.trim() || '1 Dose',
                times: cleanTimes,
                foodRelation: formFoodRelation,
                notes: formNotes.trim(),
                frequency: formFrequency,
                daysOfWeek: formDays
              }
            : r
        )
      );
    } else {
      const newRem: MedicationReminder = {
        id: `rem-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        medicineName: formMedName.trim(),
        dosage: formDosage.trim() || '1 Dose',
        times: cleanTimes,
        foodRelation: formFoodRelation,
        notes: formNotes.trim(),
        frequency: formFrequency,
        daysOfWeek: formDays,
        isActive: true,
        createdAt: new Date().toISOString()
      };
      setReminders((prev) => [newRem, ...prev]);
    }

    playAlertChime();
    setIsModalOpen(false);
  };

  // Speech narration for reminder instructions
  const handleSpeakReminder = (rem: MedicationReminder) => {
    if (speakingId === rem.id) {
      stopHealthcareSpeech();
      setSpeakingId(null);
      return;
    }

    stopHealthcareSpeech();

    const timesText = rem.times.join(', ');
    const foodText = r.foodOptions[rem.foodRelation];
    const textToSpeak = language === 'ur'
      ? `${rem.medicineName}۔ خوراک: ${rem.dosage}۔ وقت: ${timesText}۔ کھانے کے ساتھ: ${foodText}۔ ${rem.notes || ''}`
      : `${rem.medicineName}. Dose: ${rem.dosage}. Scheduled times: ${timesText}. Food relation: ${foodText}. ${rem.notes || ''}`;

    setSpeakingId(rem.id);
    speakHealthcareText(textToSpeak, language, {
      onStart: () => setSpeakingId(rem.id),
      onEnd: () => setSpeakingId(null),
      onError: () => setSpeakingId(null),
    });
  };

  return (
    <div className="space-y-8 py-2">
      {/* Executive Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider">
            <Bell className="w-3.5 h-3.5 text-teal-600" />
            <span>{language === 'ur' ? 'دوائیوں کے روزانہ الرٹس' : 'Daily Dose Intelligence'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {r.title}
          </h1>
          <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
            {r.subtitle}
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto shrink-0 flex-wrap">
          {notificationPermission !== 'granted' && (
            <button
              onClick={handleRequestNotifications}
              className="px-3.5 py-2.5 rounded-xl border border-teal-300 bg-teal-50/70 hover:bg-teal-100 text-teal-800 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <BellRing className="w-4 h-4 text-teal-600" />
              <span>{r.enableNotifications}</span>
            </button>
          )}

          <button
            onClick={handleOpenAddModal}
            className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-700 to-cyan-800 hover:from-teal-800 hover:to-cyan-900 text-white text-xs font-bold shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{r.addReminder}</span>
          </button>
        </div>
      </div>

      {/* Adherence & Next Dose Metrics Ribbon */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Next Dose Card */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-teal-600" />
              <span>{r.nextDose}</span>
            </span>
            {nextUpcomingDose && (
              <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-teal-100 text-teal-800">
                {nextUpcomingDose.time}
              </span>
            )}
          </div>
          {nextUpcomingDose ? (
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900">
                {nextUpcomingDose.medicineName}
              </h3>
              <p className="text-xs text-slate-600 font-medium">
                {nextUpcomingDose.dosage} • {r.foodOptions[nextUpcomingDose.foodRelation]}
              </p>
            </div>
          ) : (
            <p className="text-xs text-slate-500 italic">
              {language === 'ur' ? 'آج کے لیے تمام خوراکیں مکمل ہیں یا شیڈول نہیں ہیں۔' : 'All scheduled doses for today completed!'}
            </p>
          )}
        </div>

        {/* Today's Adherence Rate */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCheck className="w-4 h-4 text-emerald-600" />
              <span>{r.adherenceToday}</span>
            </span>
            <span className="text-sm font-black text-emerald-700">
              {adherencePercent}%
            </span>
          </div>
          <div className="space-y-1.5">
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div 
                className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${adherencePercent}%` }}
              ></div>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              {r.dosesCompleted.replace('{taken}', String(takenTodayDoses)).replace('{total}', String(totalTodayDoses))}
            </p>
          </div>
        </div>

        {/* Offline & Privacy Guarantee */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-teal-900 to-slate-900 text-white shadow-2xs space-y-2 flex flex-col justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-teal-400" />
            <h4 className="font-bold text-sm text-teal-100">
              {language === 'ur' ? '100٪ آف لائن رازداری' : '100% Offline & Private'}
            </h4>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {language === 'ur'
              ? 'آپ کی دوائیوں کا شیڈول کسی سرور پر نہیں جاتا۔ یہ مکمل طور پر آپ کے فون کے لوکل اسٹوریج میں محفوظ ہے۔'
              : 'Your schedule never leaves your device. All alarms operate strictly offline in your browser.'}
          </p>
        </div>
      </div>

      {/* Today's Dosing Checklist */}
      <div className="rounded-3xl bg-white border border-slate-200 shadow-md p-6 sm:p-7 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="space-y-0.5">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-teal-600" />
              <span>{r.todaySchedule}</span>
            </h2>
            <p className="text-xs text-slate-500">
              {new Date().toLocaleDateString(language === 'ur' ? 'ur-PK' : 'en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
            {totalTodayDoses} {language === 'ur' ? 'خوراکیں' : 'Doses'}
          </span>
        </div>

        {todayDoses.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {todayDoses.map((dose, idx) => {
              const isDueNow = !dose.isTaken && currentTimeStr && Math.abs(
                parseInt(dose.time.split(':')[0]) * 60 + parseInt(dose.time.split(':')[1]) -
                (parseInt(currentTimeStr.split(':')[0]) * 60 + parseInt(currentTimeStr.split(':')[1]))
              ) <= 45;

              return (
                <div
                  key={`${dose.reminderId}-${dose.time}-${idx}`}
                  className={`py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition rounded-xl px-3 ${
                    dose.isTaken 
                      ? 'bg-slate-50/60 opacity-80' 
                      : isDueNow 
                      ? 'bg-amber-50/80 border border-amber-200' 
                      : 'hover:bg-teal-50/30'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    {/* Time Badge */}
                    <div className={`p-2.5 rounded-xl font-mono text-xs font-bold shrink-0 text-center min-w-[64px] ${
                      dose.isTaken
                        ? 'bg-slate-200 text-slate-600'
                        : isDueNow
                        ? 'bg-amber-500 text-white animate-pulse'
                        : 'bg-teal-700 text-white shadow-2xs'
                    }`}>
                      {dose.time}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className={`text-base font-bold ${dose.isTaken ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                          {dose.medicineName}
                        </h4>
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                          {dose.dosage}
                        </span>
                        {isDueNow && (
                          <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 animate-pulse">
                            {r.alertDueNow}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 flex items-center gap-2">
                        <Utensils className="w-3.5 h-3.5 text-slate-400" />
                        <span>{r.foodOptions[dose.foodRelation]}</span>
                        {dose.notes && (
                          <>
                            <span>•</span>
                            <span className="italic">{dose.notes}</span>
                          </>
                        )}
                      </p>
                      {dose.isTaken && dose.takenAt && (
                        <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>{r.taken} at {dose.takenAt}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Mark as Taken Button */}
                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <button
                      onClick={() => handleToggleDoseTaken(dose.reminderId, dose.time, dose.isTaken)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-2xs ${
                        dose.isTaken
                          ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800 border border-emerald-300'
                          : 'bg-teal-600 hover:bg-teal-700 text-white shadow-xs'
                      }`}
                    >
                      <Check className="w-4 h-4" />
                      <span>{dose.isTaken ? r.taken : r.markTaken}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-slate-500 space-y-2">
            <Clock className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-sm font-semibold">{r.noRemindersYet}</p>
            <p className="text-xs max-w-md mx-auto">{r.noRemindersDesc}</p>
          </div>
        )}
      </div>

      {/* All Scheduled Medications List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
            <Pill className="w-5 h-5 text-teal-600" />
            <span>{r.allReminders} ({reminders.length})</span>
          </h2>
          <button
            onClick={handleOpenAddModal}
            className="text-xs font-bold text-teal-700 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{r.addReminder}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reminders.map((rem) => {
            const isSpeaking = speakingId === rem.id;

            return (
              <div
                key={rem.id}
                className={`p-5 rounded-2xl border transition bg-white shadow-xs space-y-4 flex flex-col justify-between ${
                  rem.isActive ? 'border-slate-200 hover:border-teal-300' : 'border-slate-200 bg-slate-50/70 opacity-70'
                }`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                        <span>{rem.medicineName}</span>
                        {!rem.isActive && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-600">
                            {r.statusPaused}
                          </span>
                        )}
                      </h3>
                      <p className="text-xs text-teal-800 font-semibold mt-0.5">
                        {rem.dosage}
                      </p>
                    </div>

                    <div className="flex items-center gap-1">
                      {/* Audio Narration Button */}
                      <button
                        onClick={() => handleSpeakReminder(rem)}
                        className={`p-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                          isSpeaking 
                            ? 'bg-rose-100 text-rose-700 animate-pulse' 
                            : 'bg-teal-50 text-teal-800 hover:bg-teal-100'
                        }`}
                        title="Listen to schedule"
                      >
                        {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </button>

                      {/* Edit Button */}
                      <button
                        onClick={() => handleOpenEditModal(rem)}
                        className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                        title={r.editReminder}
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDeleteReminder(rem.id)}
                        className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                        title={r.deleteReminder}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Scheduled Times Badges */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] font-semibold text-slate-500 mr-1">
                      {r.alertTimes}:
                    </span>
                    {rem.times.map((timeStr) => (
                      <span
                        key={timeStr}
                        className="px-2.5 py-1 rounded-lg bg-teal-50 border border-teal-200 text-teal-900 font-mono text-xs font-bold"
                      >
                        {timeStr}
                      </span>
                    ))}
                  </div>

                  {/* Food Relation & Notes */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1 text-slate-700">
                    <p className="font-medium flex items-center gap-1.5">
                      <Utensils className="w-3.5 h-3.5 text-slate-500" />
                      <span>{r.foodOptions[rem.foodRelation]}</span>
                    </p>
                    {rem.notes && (
                      <p className="text-slate-600 italic pl-5">
                        "{rem.notes}"
                      </p>
                    )}
                  </div>
                </div>

                {/* Footer Controls: Toggle Active / Inactive */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <button
                    onClick={() => handleToggleReminderActive(rem.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                      rem.isActive
                        ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        : 'bg-teal-600 hover:bg-teal-700 text-white'
                    }`}
                  >
                    {rem.isActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    <span>{rem.isActive ? r.statusPaused : r.statusActive}</span>
                  </button>

                  {onSelectMedicineForDetails && (
                    <button
                      onClick={() => onSelectMedicineForDetails(rem.medicineName.split(' ')[0])}
                      className="text-teal-700 hover:underline font-bold text-xs cursor-pointer flex items-center gap-1"
                    >
                      <span>{language === 'ur' ? 'دوا کی معلومات' : 'Drug Guide'}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add / Edit Reminder Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Bell className="w-5 h-5 text-teal-600" />
                <span>{editingReminderId ? r.editReminder : r.addReminder}</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveForm} className="space-y-4 text-xs">
              {/* Medicine Name with Quick Suggestions */}
              <div className="space-y-1.5">
                <label className="block font-bold text-slate-800">
                  {r.medicineName} *
                </label>
                <input
                  type="text"
                  required
                  value={formMedName}
                  onChange={(e) => setFormMedName(e.target.value)}
                  placeholder={r.medicineNamePlaceholder}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 font-medium text-slate-900"
                />

                {/* Quick picker chips from database */}
                <div className="space-y-1 pt-1">
                  <span className="text-[11px] text-slate-500 font-semibold">{r.quickAddFromDatabase}</span>
                  <div className="flex flex-wrap gap-1.5">
                    {['Paracetamol', 'Ibuprofen (Brufen)', 'Metformin', 'Omeprazole', 'Cetirizine', 'Amoxicillin'].map((med) => (
                      <button
                        key={med}
                        type="button"
                        onClick={() => handleQuickPickMedicine(med)}
                        className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-teal-100 hover:text-teal-900 text-slate-700 text-[11px] font-medium border border-slate-200 transition cursor-pointer"
                      >
                        {med}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dosage Strength */}
              <div className="space-y-1.5">
                <label className="block font-bold text-slate-800">
                  {r.dosage} *
                </label>
                <input
                  type="text"
                  required
                  value={formDosage}
                  onChange={(e) => setFormDosage(e.target.value)}
                  placeholder={r.dosagePlaceholder}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 font-medium text-slate-900"
                />
              </div>

              {/* Alert Times (Multiple Time Slots) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-800">
                    {r.alertTimes} *
                  </label>
                  <button
                    type="button"
                    onClick={handleAddTimeSlot}
                    className="text-teal-700 font-bold hover:underline flex items-center gap-1 cursor-pointer text-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{r.addTime}</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {formTimes.map((timeVal, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 bg-slate-50 p-1.5 rounded-xl border border-slate-200">
                      <Clock className="w-4 h-4 text-teal-600 ml-1 shrink-0" />
                      <input
                        type="time"
                        required
                        value={timeVal}
                        onChange={(e) => handleTimeChange(idx, e.target.value)}
                        className="w-full bg-transparent font-mono text-xs font-bold text-slate-900 focus:outline-hidden"
                      />
                      {formTimes.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveTimeSlot(idx)}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Food Relation */}
              <div className="space-y-1.5">
                <label className="block font-bold text-slate-800">
                  {r.foodRelation}
                </label>
                <select
                  value={formFoodRelation}
                  onChange={(e) => setFormFoodRelation(e.target.value as FoodRelation)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 font-medium text-slate-900 cursor-pointer"
                >
                  <option value="after_meal">{r.foodOptions.after_meal}</option>
                  <option value="before_meal">{r.foodOptions.before_meal}</option>
                  <option value="with_meal">{r.foodOptions.with_meal}</option>
                  <option value="anytime">{r.foodOptions.anytime}</option>
                </select>
              </div>

              {/* Doctor Instructions / Notes */}
              <div className="space-y-1.5">
                <label className="block font-bold text-slate-800">
                  {r.notes}
                </label>
                <textarea
                  rows={2}
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  placeholder={r.notesPlaceholder}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 font-medium text-slate-900"
                ></textarea>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-100 transition cursor-pointer"
                >
                  {r.cancel}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold transition shadow-xs cursor-pointer"
                >
                  {r.saveReminder}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
