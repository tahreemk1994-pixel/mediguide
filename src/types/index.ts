export type Language = 'en' | 'ur';

export interface Medicine {
  id: string;
  genericName: string;
  brandAliases: string[];
  category: {
    en: string;
    ur: string;
  };
  activeIngredient: {
    en: string;
    ur: string;
  };
  commonUses: {
    en: string[];
    ur: string[];
  };
  commonSideEffects: {
    en: string[];
    ur: string[];
  };
  warningsAndPrecautions: {
    en: string[];
    ur: string[];
  };
  source: {
    name: string;
    url?: string;
    verifiedOrganization: string;
  };
  lastReviewed: string;
}

export interface ReportItem {
  name: {
    en: string;
    ur: string;
  };
  abbreviation?: string;
  result: string | number;
  unit: string;
  referenceRange: string;
  status: 'normal' | 'high' | 'low';
  explanation: {
    en: string;
    ur: string;
  };
}

export interface MedicalReport {
  id: string;
  title: {
    en: string;
    ur: string;
  };
  category: {
    en: string;
    ur: string;
  };
  description: {
    en: string;
    ur: string;
  };
  samplePatientContext: {
    en: string;
    ur: string;
  };
  items: ReportItem[];
  clinicalNote: {
    en: string;
    ur: string;
  };
}

export interface Symptom {
  id: string;
  name: {
    en: string;
    ur: string;
  };
  severityLevel: 'mild' | 'moderate' | 'urgent';
  description: {
    en: string;
    ur: string;
  };
  commonCauses: {
    en: string[];
    ur: string[];
  };
  selfCareAdvice: {
    en: string[];
    ur: string[];
  };
  warningSigns: {
    en: string[];
    ur: string[];
  };
  whenToConsultDoctor: {
    en: string;
    ur: string;
  };
}

export type WeatherSeasonId = 'winter' | 'monsoon' | 'summer' | 'spring';

export interface RecommendedMedicineInfo {
  name: {
    en: string;
    ur: string;
  };
  purpose: {
    en: string;
    ur: string;
  };
  activeIngredient: {
    en: string;
    ur: string;
  };
  safetyNote: {
    en: string;
    ur: string;
  };
}

export interface SeasonalDisease {
  id: string;
  name: {
    en: string;
    ur: string;
  };
  seasonId: WeatherSeasonId;
  seasonName: {
    en: string;
    ur: string;
  };
  keySymptoms: {
    en: string[];
    ur: string[];
  };
  severeBodyacheHeadacheNotice: {
    en: string;
    ur: string;
  };
  recommendedMedicines: RecommendedMedicineInfo[];
  strictlyAvoid: {
    en: string[];
    ur: string[];
  };
  homeCareAndHydration: {
    en: string[];
    ur: string[];
  };
  redFlagWarning: {
    en: string;
    ur: string;
  };
}

export interface PainProtocol {
  condition: {
    en: string;
    ur: string;
  };
  severity: 'mild' | 'moderate' | 'severe';
  recommendedFirstLine: {
    en: string;
    ur: string;
  };
  dosageSafetyRules: {
    en: string[];
    ur: string[];
  };
  contraindications: {
    en: string[];
    ur: string[];
  };
  urgentDoctorThreshold: {
    en: string;
    ur: string;
  };
}

export type FoodRelation = 'before_meal' | 'with_meal' | 'after_meal' | 'anytime';

export interface MedicationReminder {
  id: string;
  medicineName: string;
  dosage: string;
  times: string[]; // 'HH:MM' 24-hour format
  frequency: 'daily' | 'specific_days' | 'as_needed';
  daysOfWeek: number[]; // 0 = Sun, 1 = Mon, ..., 6 = Sat
  foodRelation: FoodRelation;
  notes?: string;
  isActive: boolean;
  createdAt: string;
}

export interface DoseLog {
  id: string;
  reminderId: string;
  medicineName: string;
  scheduledTime: string; // 'HH:MM'
  date: string; // 'YYYY-MM-DD'
  takenAt: string;
  status: 'taken' | 'skipped';
}

export type ActiveTab = 'home' | 'medicines' | 'seasonal' | 'reminders' | 'reports' | 'symptoms' | 'voice' | 'safety';
