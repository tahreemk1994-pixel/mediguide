import { MedicalReport } from '../types';

export const MEDICAL_REPORTS_DATA: MedicalReport[] = [
  {
    id: 'cbc',
    title: {
      en: 'Complete Blood Count (CBC)',
      ur: 'خون کا تفصیلی معائنہ (سی بی سی رپورٹ)'
    },
    category: {
      en: 'Hematology (Blood Health)',
      ur: 'ہیمیٹولوجی (خون کا تجزیہ)'
    },
    description: {
      en: 'A foundational blood test evaluating the circulating cells: red blood cells (oxygen carriers), white blood cells (immune defenders), and platelets (clotting cells).',
      ur: 'ایک بنیادی ٹیسٹ جو خون کے خلیوں کا جائزہ لیتا ہے: سرخ خلیات (آکسیجن پہنچانے والے)، سفید خلیات (قوت مدافعت)، اور پلیٹلیٹس (خون جمانے والے خلیات)۔'
    },
    samplePatientContext: {
      en: 'Fictional Demo Patient: Adult Male, 34 years old, routine wellness checkup.',
      ur: 'فرضی ڈیمو مریض: بالغ مرد، عمر 34 سال، معمول کا طبی معائنہ۔'
    },
    items: [
      {
        name: {
          en: 'Hemoglobin (Hb)',
          ur: 'ہیموگلوبن (Hb)'
        },
        abbreviation: 'Hb',
        result: '11.8',
        unit: 'g/dL',
        referenceRange: '13.0 - 17.5 g/dL',
        status: 'low',
        explanation: {
          en: 'Protein in red blood cells that transports oxygen from lungs to body tissues. A value below reference range may indicate mild anemia or iron deficiency.',
          ur: 'سرخ خلیات میں موجود پروٹین جو آکسیجن پورے جسم تک پہنچاتی ہے۔ نارمل سے کم ہونا خون کی کمی (انیمیا) کی طرف اشارہ کر سکتا ہے۔'
        }
      },
      {
        name: {
          en: 'Total White Blood Cells (WBC)',
          ur: 'سفید خلیات کی کل تعداد (WBC)'
        },
        abbreviation: 'TLC',
        result: '7,400',
        unit: 'cells/mcL',
        referenceRange: '4,500 - 11,000 cells/mcL',
        status: 'normal',
        explanation: {
          en: 'Immune system cells that defend against infections and pathogens. Normal levels suggest no acute bacterial surge.',
          ur: 'جسم کے مدافعتی خلیات جو بیماریوں اور جراثیموں سے لڑتے ہیں۔ نارمل حد کا مطلب عام مدافعت ہے۔'
        }
      },
      {
        name: {
          en: 'Platelet Count',
          ur: 'پلیٹلیٹس کی تعداد'
        },
        abbreviation: 'PLT',
        result: '235,000',
        unit: 'cells/mcL',
        referenceRange: '150,000 - 450,000 cells/mcL',
        status: 'normal',
        explanation: {
          en: 'Tiny cell fragments essential for normal blood clotting and stopping bleeding after minor injuries.',
          ur: 'خون کے باریک ذرات جو چوٹ لگنے پر خون کو جمنے میں مدد دیتے ہیں۔'
        }
      },
      {
        name: {
          en: 'Red Blood Cell Count (RBC)',
          ur: 'سرخ خلیات کی تعداد (RBC)'
        },
        abbreviation: 'RBC',
        result: '4.2',
        unit: 'million/mcL',
        referenceRange: '4.5 - 5.9 million/mcL',
        status: 'low',
        explanation: {
          en: 'Total number of oxygen-carrying red blood cells per volume of blood.',
          ur: 'خون میں آکسیجن لے جانے والے سرخ خلیوں کی کل مقدار۔'
        }
      },
      {
        name: {
          en: 'Hematocrit (PCV)',
          ur: 'ہیمیٹوکریٹ (خلیات کا تناسب)'
        },
        abbreviation: 'HCT',
        result: '36.5',
        unit: '%',
        referenceRange: '41.0 - 50.0 %',
        status: 'low',
        explanation: {
          en: 'The proportion of total blood volume made up of red blood cells.',
          ur: 'خون کے کل حجم میں سرخ خلیات کا فیصدی تناسب۔'
        }
      }
    ],
    clinicalNote: {
      en: 'DEMONSTRATION ONLY: In this sample, Hemoglobin is slightly below the laboratory reference bracket. A doctor would typically review diet, ferritin levels, and physical symptoms before advising further.',
      ur: 'صرف نمائش کے لیے: اس فرضی رپورٹ میں ہیموگلوبن لیب کی معمول کی حد سے قدرے کم ہے۔ معالج غذائی عادات اور آئرن کے ٹیسٹ دیکھ کر مناسب رہنمائی فرماتے ہیں۔'
    }
  },
  {
    id: 'lft',
    title: {
      en: 'Liver Function Test (LFT)',
      ur: 'جگر کے افعال کا ٹیسٹ (ایل ایف ٹی رپورٹ)'
    },
    category: {
      en: 'Clinical Biochemistry (Hepatic Panel)',
      ur: 'طبی کیمیا (جگر کے ٹیسٹ)'
    },
    description: {
      en: 'A panel of blood tests measuring specific enzymes and proteins produced or processed by liver cells to reflect cellular integrity and bile flow.',
      ur: 'خون کا ٹیسٹ جو جگر کے انزائمز اور پروٹینز کی پیمائش کرتا ہے تاکہ جگر کی صحت کا اندازہ لگایا جا سکے۔'
    },
    samplePatientContext: {
      en: 'Fictional Demo Patient: Adult Female, 42 years old, periodic medical screening.',
      ur: 'فرضی ڈیمو مریض: بالغ خاتون، عمر 42 سال، معمول کا طبی جائزہ۔'
    },
    items: [
      {
        name: {
          en: 'Alanine Aminotransferase (ALT / SGPT)',
          ur: 'ایلانین امائنو ٹرانسفریز (ALT / SGPT)'
        },
        abbreviation: 'ALT',
        result: '58',
        unit: 'U/L',
        referenceRange: '7 - 35 U/L',
        status: 'high',
        explanation: {
          en: 'An enzyme primarily found inside liver cells. Mild elevations can occur from fatty changes, medications, or viral exposure.',
          ur: 'جگر کے خلیوں میں پایا جانے والا بنیادی انزائم۔ اس کا معمولی اضافہ چکنائی (فیٹی لیور) یا بعض ادویات کے اثر سے ہو سکتا ہے۔'
        }
      },
      {
        name: {
          en: 'Aspartate Aminotransferase (AST / SGOT)',
          ur: 'ایسپارٹیٹ امائنو ٹرانسفریز (AST / SGOT)'
        },
        abbreviation: 'AST',
        result: '44',
        unit: 'U/L',
        referenceRange: '10 - 40 U/L',
        status: 'high',
        explanation: {
          en: 'Enzyme found in liver, heart, and muscle tissue. Often assessed in tandem with ALT for a comprehensive cellular view.',
          ur: 'جگر اور پٹھوں میں پایا جانے والا انزائم، جسے ALT کے ساتھ ملا کر پرکھا جاتا ہے۔'
        }
      },
      {
        name: {
          en: 'Total Bilirubin',
          ur: 'بلیروبن کی کل مقدار'
        },
        abbreviation: 'T.Bili',
        result: '0.8',
        unit: 'mg/dL',
        referenceRange: '0.2 - 1.2 mg/dL',
        status: 'normal',
        explanation: {
          en: 'Yellow pigment created during normal breakdown of old red blood cells, processed and excreted by healthy liver.',
          ur: 'خون کے پرانے خلیوں کے ٹوٹنے سے بننے والا زرد مادہ جسے جگر صاف کرتا ہے۔'
        }
      },
      {
        name: {
          en: 'Alkaline Phosphatase (ALP)',
          ur: 'الکلائن فاسفیٹیز (ALP)'
        },
        abbreviation: 'ALP',
        result: '88',
        unit: 'U/L',
        referenceRange: '44 - 147 U/L',
        status: 'normal',
        explanation: {
          en: 'Enzyme related to the bile ducts and bone tissue. Normal levels indicate unobstructed bile drainage in this sample.',
          ur: 'پت کی نالیوں اور ہڈیوں سے وابستہ انزائم، جس کا نارمل ہونا پت کے درست بہاؤ کو ظاہر کرتا ہے۔'
        }
      },
      {
        name: {
          en: 'Serum Albumin',
          ur: 'سیرم البیومن (پروٹین)'
        },
        abbreviation: 'ALB',
        result: '4.2',
        unit: 'g/dL',
        referenceRange: '3.5 - 5.0 g/dL',
        status: 'normal',
        explanation: {
          en: 'The main protein synthesized by the liver, essential for maintaining blood volume and transporting nutrients.',
          ur: 'جگر کی تیار کردہ اہم پروٹین جو خون میں پانی کا توازن اور غذائیت برقرار رکھتی ہے۔'
        }
      }
    ],
    clinicalNote: {
      en: 'DEMONSTRATION ONLY: In this example, liver enzymes (ALT/AST) appear slightly higher than the fictional lab benchmark. Only a physician can interpret this in the context of personal medical history.',
      ur: 'صرف نمائش کے لیے: اس مثال میں جگر کے انزائمز لیب کے پیمانے سے تھوڑے اوپر ہیں۔ مستند ڈاکٹر ہی مکمل طبی پس منظر دیکھ کر رائے دیتے ہیں۔'
    }
  },
  {
    id: 'rft',
    title: {
      en: 'Renal Function Test (RFT / Kidney Panel)',
      ur: 'گردوں کے افعال کا ٹیسٹ (آر ایف ٹی رپورٹ)'
    },
    category: {
      en: 'Renal Health (Kidney Clearance)',
      ur: 'گردوں کی فلٹریشن اور صحت'
    },
    description: {
      en: 'Measures how efficiently the kidneys filter waste products like creatinine and urea nitrogen from the bloodstream.',
      ur: 'یہ ٹیسٹ جانچتا ہے کہ گردے خون سے فاسد مادوں (کریٹنائن اور یوریا) کو کتنی مہارت سے صاف کر رہے ہیں۔'
    },
    samplePatientContext: {
      en: 'Fictional Demo Patient: Adult Male, 56 years old, annual diabetic & renal health review.',
      ur: 'فرضی ڈیمو مریض: بالغ مرد، عمر 56 سال، سالانہ ذیابیطس و گردوں کا جائزہ۔'
    },
    items: [
      {
        name: {
          en: 'Serum Creatinine',
          ur: 'سیرم کریٹنائن'
        },
        abbreviation: 'Creat',
        result: '0.95',
        unit: 'mg/dL',
        referenceRange: '0.70 - 1.30 mg/dL',
        status: 'normal',
        explanation: {
          en: 'Waste byproduct from normal muscle breakdown filtered entirely by healthy kidneys. Stable levels reflect steady filtration.',
          ur: 'پٹھوں کے کام کرنے سے بننے والا فضلہ جسے گردے خارج کرتے ہیں۔ نارمل سطح اچھے فلٹریشن کی عکاسی کرتی ہے۔'
        }
      },
      {
        name: {
          en: 'Blood Urea Nitrogen (BUN)',
          ur: 'بلڈ یوریا نائٹروجن (BUN)'
        },
        abbreviation: 'BUN',
        result: '14.2',
        unit: 'mg/dL',
        referenceRange: '7.0 - 20.0 mg/dL',
        status: 'normal',
        explanation: {
          en: 'Waste compound from dietary protein breakdown. Normal range indicates balanced clearance and adequate hydration.',
          ur: 'پروٹین کے ہضم ہونے سے پیدا ہونے والا فضلہ، جس کا نارمل ہونا پانی کی مناسب مقدار اور توازن کو ظاہر کرتا ہے۔'
        }
      },
      {
        name: {
          en: 'Estimated GFR (eGFR)',
          ur: 'تخمینی فلٹریشن ریٹ (eGFR)'
        },
        abbreviation: 'eGFR',
        result: '>90',
        unit: 'mL/min/1.73m²',
        referenceRange: '> 60 mL/min/1.73m²',
        status: 'normal',
        explanation: {
          en: 'Estimated Glomerular Filtration Rate calculates how many milliliters of blood the kidneys clean per minute.',
          ur: 'گردوں کی صفائی کی رفتار کا فارمولہ، جو ظاہر کرتا ہے کہ گردے کتنا بہتر کام کر رہے ہیں۔'
        }
      },
      {
        name: {
          en: 'Serum Uric Acid',
          ur: 'سیرم یورک ایسڈ'
        },
        abbreviation: 'Uric Acid',
        result: '7.8',
        unit: 'mg/dL',
        referenceRange: '3.5 - 7.2 mg/dL',
        status: 'high',
        explanation: {
          en: 'A natural byproduct of purine metabolism found in certain foods. Slightly high levels may occasionally correlate with joint stiffness or gout risk.',
          ur: 'غذا سے بننے والا تیزابی مادہ، جو زیادہ ہو تو جوڑوں کے درد یا نقرس (Gout) کا باعث بن سکتا ہے۔'
        }
      }
    ],
    clinicalNote: {
      en: 'DEMONSTRATION ONLY: Renal filtration parameters (Creatinine, BUN, eGFR) are well within normal benchmarks, while Uric Acid is modestly elevated. Dietary adjustments and hydration are common points of physician consultation.',
      ur: 'صرف نمائش کے لیے: گردوں کے فلٹر کرنے کے پیرامیٹرز بالکل نارمل ہیں، البتہ یورک ایسڈ قدرے بلند ہے۔ پانی کا زیادہ استعمال اور خوراک میں احتیاط مفید ہوتی ہے۔'
    }
  },
  {
    id: 'glucose',
    title: {
      en: 'Blood Glucose & HbA1c Report',
      ur: 'خون میں شوگر اور تین ماہ کی اوسط (HbA1c رپورٹ)'
    },
    category: {
      en: 'Metabolic & Glycemic Profile',
      ur: 'ذیابیطس اور گلوکوز کا معائنہ'
    },
    description: {
      en: 'Assesses immediate fasting blood sugar alongside glycated hemoglobin (HbA1c), which provides a 90-day rolling average of blood sugar levels.',
      ur: 'نہار منہ شوگر اور پچھلے تین ماہ کی اوسط شوگر (HbA1c) کی سطح کی جانچ۔'
    },
    samplePatientContext: {
      en: 'Fictional Demo Patient: Adult Female, 49 years old, glucose tolerance evaluation.',
      ur: 'فرضی ڈیمو مریض: بالغ خاتون، عمر 49 سال، شوگر کی سطح کا جائزہ۔'
    },
    items: [
      {
        name: {
          en: 'Fasting Blood Sugar (FBS)',
          ur: 'نہار منہ شوگر (فاسٹنگ بلڈ شوگر)'
        },
        abbreviation: 'FBS',
        result: '112',
        unit: 'mg/dL',
        referenceRange: '70 - 99 mg/dL',
        status: 'high',
        explanation: {
          en: 'Glucose level measured after at least 8 hours of overnight fasting. Values between 100-125 mg/dL fall in the prediabetes reference zone.',
          ur: 'رات بھر خالی پیٹ رہنے کے بعد شوگر کی مقدار۔ 100 سے 125 کی سطح پری ڈائبیٹیز کی طرف اشارہ کرتی ہے۔'
        }
      },
      {
        name: {
          en: 'Post-Prandial Blood Sugar (2 hr after meal)',
          ur: 'کھانے کے دو گھنٹے بعد شوگر'
        },
        abbreviation: 'PPBS',
        result: '138',
        unit: 'mg/dL',
        referenceRange: '< 140 mg/dL',
        status: 'normal',
        explanation: {
          en: 'Glucose response measured 2 hours following a meal. Values under 140 mg/dL fall into the non-diabetic range.',
          ur: 'کھانے کے 2 گھنٹے بعد خون میں گلوکوز۔ 140 سے کم ہونا مناسب سمجھا جاتا ہے۔'
        }
      },
      {
        name: {
          en: 'Hemoglobin A1c (HbA1c)',
          ur: 'ہیموگلوبن اے ون سی (HbA1c)'
        },
        abbreviation: 'HbA1c',
        result: '5.9',
        unit: '%',
        referenceRange: '< 5.7 % (Normal), 5.7 - 6.4 % (Prediabetes)',
        status: 'high',
        explanation: {
          en: 'Percentage of red blood cells with glucose attached over their 3-month lifespan. An invaluable indicator for long-term glycemic control.',
          ur: 'پچھلے 3 ماہ کے دوران خون میں شوگر کی اوسط شرح کا بین الاقوامی پیمانہ۔'
        }
      }
    ],
    clinicalNote: {
      en: 'DEMONSTRATION ONLY: The fasting glucose and HbA1c here sit within the prediabetes demonstration bracket. Lifestyle improvements like regular brisk walking and dietary moderation are commonly discussed with a general practitioner.',
      ur: 'صرف نمائش کے لیے: اس مثال میں فاسٹنگ شوگر اور HbA1c پری ڈائبیٹیز کے درجے میں ہیں۔ واک اور متوازن غذا معالجین کا معمول کا مشورہ ہوتا ہے۔'
    }
  },
  {
    id: 'vitamin-lipid',
    title: {
      en: 'Lipid Profile & 25-Hydroxy Vitamin D',
      ur: 'کولیسٹرول اور وٹامن ڈی رپورٹ'
    },
    category: {
      en: 'Cardiovascular & Bone Health',
      ur: 'دل کی صحت اور وٹامن کا توازن'
    },
    description: {
      en: 'Analyzes cholesterol fractions (HDL good cholesterol vs LDL bad cholesterol) alongside circulating Vitamin D levels essential for calcium absorption and bone density.',
      ur: 'خون میں کولیسٹرول کی اقسام (اچھا اور برا کولیسٹرول) اور ہڈیوں کی مضبوطی کے لیے ضروری وٹامن ڈی کی مقدار کا معائنہ۔'
    },
    samplePatientContext: {
      en: 'Fictional Demo Patient: Adult Female, 38 years old, bone health and dietary review.',
      ur: 'فرضی ڈیمو مریض: بالغ خاتون، عمر 38 سال، ہڈیوں اور کولیسٹرول کا سالانہ ٹیسٹ۔'
    },
    items: [
      {
        name: {
          en: 'Total Cholesterol',
          ur: 'ٹوٹل کولیسٹرول'
        },
        abbreviation: 'TC',
        result: '185',
        unit: 'mg/dL',
        referenceRange: '< 200 mg/dL',
        status: 'normal',
        explanation: {
          en: 'The overall amount of cholesterol in the blood. Under 200 mg/dL is generally considered a desirable baseline.',
          ur: 'خون میں تمام اقسام کے کولیسٹرول کی مجموعی مقدار۔ 200 سے کم ہونا مناسب سمجھا جاتا ہے۔'
        }
      },
      {
        name: {
          en: 'LDL Cholesterol (Low-Density Lipoprotein)',
          ur: 'ایل ڈی ایل (نقصان دہ کولیسٹرول)'
        },
        abbreviation: 'LDL',
        result: '110',
        unit: 'mg/dL',
        referenceRange: '< 100 mg/dL (Optimal), 100 - 129 mg/dL (Near optimal)',
        status: 'normal',
        explanation: {
          en: 'Often called "bad cholesterol" because high amounts can form arterial plaques over years.',
          ur: 'اسے "برا کولیسٹرول" کہا جاتا ہے کیونکہ اس کا طویل عرصے تک زیادہ رہنا شریانوں کے لیے موزوں نہیں ہوتا۔'
        }
      },
      {
        name: {
          en: 'HDL Cholesterol (High-Density Lipoprotein)',
          ur: 'ایچ ڈی ایل (مفید کولیسٹرول)'
        },
        abbreviation: 'HDL',
        result: '52',
        unit: 'mg/dL',
        referenceRange: '> 50 mg/dL for females, > 40 mg/dL for males',
        status: 'normal',
        explanation: {
          en: 'The "protective cholesterol" that transports excess lipids back to the liver for excretion.',
          ur: 'مفید کولیسٹرول جو شریانوں سے فالتو چربی کو واپس جگر تک پہنچا کر صاف کرتا ہے۔'
        }
      },
      {
        name: {
          en: '25-Hydroxy Vitamin D',
          ur: 'وٹامن ڈی (25-OH Vitamin D)'
        },
        abbreviation: 'Vit D',
        result: '16.4',
        unit: 'ng/mL',
        referenceRange: '30.0 - 100.0 ng/mL (Sufficiency)',
        status: 'low',
        explanation: {
          en: 'Crucial for calcium absorption, bone strength, and immune resistance. Values below 20 ng/mL indicate vitamin D insufficiency/deficiency.',
          ur: 'ہڈیوں میں کیلشیم کے جذب اور مضبوطی کے لیے ناگزیر وٹامن۔ 20 سے کم ہونا وٹامن ڈی کی کمی کو ظاہر کرتا ہے۔'
        }
      }
    ],
    clinicalNote: {
      en: 'DEMONSTRATION ONLY: In this sample, Vitamin D is below the typical 30 ng/mL sufficiency benchmark. Doctors frequently recommend safe sunlight exposure or prescribed supplements.',
      ur: 'صرف نمائش کے لیے: اس مثال میں وٹامن ڈی مطلوبہ 30 کی سطح سے کم ہے۔ ڈاکٹرز دھوپ میں بیٹھنے اور مناسب سپلیمنٹس کا مشورہ دیتے ہیں۔'
    }
  }
];
