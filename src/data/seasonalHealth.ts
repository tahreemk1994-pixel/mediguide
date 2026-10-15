import { SeasonalDisease, PainProtocol, WeatherSeasonId } from '../types';

export const WEATHER_SEASONS: {
  id: WeatherSeasonId;
  name: { en: string; ur: string };
  tempRange: { en: string; ur: string };
  climateDescription: { en: string; ur: string };
  iconName: string;
}[] = [
  {
    id: 'winter',
    name: {
      en: 'Winter / Cold Weather',
      ur: 'موسم سرما (سرد اور خشک موسم)'
    },
    tempRange: {
      en: '< 15°C (Cool & Dry Air)',
      ur: '15 ڈگری سے کم (سرد و خشک ہوا)'
    },
    climateDescription: {
      en: 'Cold temperatures and low humidity dry out respiratory mucous membranes, encouraging rapid viral replication of influenza and rhinoviruses.',
      ur: 'سرد اور خشک ہوا سانس کی نالیوں کی جھلیوں کو خشک کر دیتی ہے جس سے فلو اور نزلہ کے وائرس تیزی سے پھیلتے ہیں۔'
    },
    iconName: 'Snowflake'
  },
  {
    id: 'monsoon',
    name: {
      en: 'Monsoon / Rainy Season',
      ur: 'موسم برسات (بارشیں اور نمی)'
    },
    tempRange: {
      en: '25°C - 35°C (High Humidity)',
      ur: '25 تا 35 ڈگری (شدید نمی اور حبس)'
    },
    climateDescription: {
      en: 'Stagnant rainwater and humid atmosphere facilitate rapid mosquito breeding (Aedes aegypti) and water contamination.',
      ur: 'کھڑا بارش کا پانی اور نمی مچھروں (ڈینگی، ملیریا) کی افزائش اور پانی سے پیدا ہونے والی وائرل بیماریوں کا سبب بنتے ہیں۔'
    },
    iconName: 'CloudRain'
  },
  {
    id: 'summer',
    name: {
      en: 'Summer / Heatwave',
      ur: 'موسم گرما (شدید گرمی اور لو)'
    },
    tempRange: {
      en: '> 38°C (Extreme Heat)',
      ur: '38 ڈگری سے زیادہ (تپش اور لو)'
    },
    climateDescription: {
      en: 'Intense ultraviolet rays, dehydration from excessive sweating, and rapid bacterial/viral spoilage in unrefrigerated food.',
      ur: 'شدید دھوپ، پسینے کے اخراج سے نمکیات اور پانی کی کمی اور کھانوں میں تیزی سے جراثیموں کی افزائش۔'
    },
    iconName: 'SunMedium'
  },
  {
    id: 'spring',
    name: {
      en: 'Spring / Pollen Season',
      ur: 'موسم بہار (پولن اور الرجی کا موسم)'
    },
    tempRange: {
      en: '18°C - 26°C (Breezy & Pollen Surge)',
      ur: '18 تا 26 ڈگری (ہوائیں اور پولن کا اخراج)'
    },
    climateDescription: {
      en: 'Blooming trees and grasses release airborne pollen, causing airway hyper-responsiveness, sinus congestion, and allergic viral susceptibility.',
      ur: 'درختوں اور گھاس کا پولن ہوا میں پھیلنے سے سانس کی الرجی، سائنوس کا سر درد اور نزلہ زکام بڑھ جاتا ہے۔'
    },
    iconName: 'Wind'
  }
];

export const SEASONAL_DISEASES: SeasonalDisease[] = [
  {
    id: 'influenza-flu',
    name: {
      en: 'Seasonal Influenza (Flu & Viral Bronchitis)',
      ur: 'موسمی انفلوئنزا (فلو اور شدید وائرل بخار)'
    },
    seasonId: 'winter',
    seasonName: {
      en: 'Winter',
      ur: 'موسم سرما'
    },
    keySymptoms: {
      en: [
        'Sudden high fever (above 38.5°C / 101°F) with shivering and chills',
        'Severe deep generalized body aches (muscle soreness and joint pain)',
        'Throbbing frontal headache and painful eye movement',
        'Dry persistent cough and severe fatigue'
      ],
      ur: [
        'اچانک تیز بخار (101 ڈگری فارن ہائیٹ سے زیادہ) کپکپاہٹ اور سردی کے ساتھ',
        'پورے جسم، پٹھوں اور ہڈیوں میں شدید درد اور بے چینی',
        'پیشانی میں تیز سر درد اور آنکھوں کو حرکت دیتے وقت درد',
        'خشک مسلسل کھانسی اور نقاہت'
      ]
    },
    severeBodyacheHeadacheNotice: {
      en: 'Flu bodyaches stem from intense systemic cytokines. Paracetamol is the safest first-line analgesic. Ibuprofen may be taken with food only if stomach ulcers and renal issues are absent.',
      ur: 'فلو میں جسم اور سر کا شدید درد وائرل مدافعت کے ردعمل کی وجہ سے ہوتا ہے۔ پیراسیٹامول سب سے محفوظ دوا ہے۔ معدے کے السر نہ ہونے کی صورت میں کھانے کے بعد آئیبوپروفین لی جا سکتی ہے۔'
    },
    recommendedMedicines: [
      {
        name: {
          en: 'Paracetamol (Acetaminophen / Panadol / Calpol)',
          ur: 'پیراسیٹامول (پیناڈول / فیبرول)'
        },
        purpose: {
          en: 'First-line relief for severe bodyaches, fever reduction, and throbbing headache.',
          ur: 'شدید جسمانی درد، ہڈیوں کے درد اور سر درد میں آرام کے لیے بنیادی دوا۔'
        },
        activeIngredient: {
          en: 'Paracetamol 500 mg tablets (Adults: 500mg-1000mg every 6-8 hrs, Max 4000mg/24h)',
          ur: 'پیراسیٹامول 500 ملی گرام (24 گھنٹے میں زیادہ سے زیادہ 4 گرام)'
        },
        safetyNote: {
          en: 'Never exceed 4,000 mg in 24 hours. Check other flu powders to avoid duplicate paracetamol poisoning.',
          ur: '24 گھنٹے میں 8 گولیوں سے زیادہ کبھی نہ لیں۔ دیگر فلو کے ساشے کے ساتھ ملا کر نہ پیئیں۔'
        }
      },
      {
        name: {
          en: 'Ibuprofen (Brufen)',
          ur: 'آئیبوپروفین (بروفین)'
        },
        purpose: {
          en: 'Relief of intense inflammatory joint/muscle bodyache and headache if paracetamol is insufficient.',
          ur: 'اگر پیراسیٹامول سے پٹھوں اور جوڑوں کے درد میں کمی نہ آئے تو سوزش کم کرنے کے لیے۔'
        },
        activeIngredient: {
          en: 'Ibuprofen 400 mg (Take strictly with or after meals)',
          ur: 'آئیبوپروفین 400 ملی گرام (ہمیشہ کھانے یا دودھ کے بعد لیں)'
        },
        safetyNote: {
          en: 'Avoid if you have history of stomach ulcers, asthma sensitivity to NSAIDs, or kidney disease.',
          ur: 'معدے میں السر، گردوں کے امراض یا دمہ کے مریض اس سے پرہیز کریں۔'
        }
      },
      {
        name: {
          en: 'Cetirizine / Chlorpheniramine',
          ur: 'سیٹیریزین / الرجیکس'
        },
        purpose: {
          en: 'Reduces excessive runny nose, watery eyes, and sneezing caused by viral inflammation.',
          ur: 'بہتی ناک، چھینکوں اور آنکھوں کے پانی کو روکنے کے لیے۔'
        },
        activeIngredient: {
          en: 'Cetirizine 10 mg (Once daily, preferably at bedtime)',
          ur: 'سیٹیریزین 10 ملی گرام (روزانہ ایک بار، رات کے وقت)'
        },
        safetyNote: {
          en: 'May cause mild drowsiness. Avoid driving or machine operation.',
          ur: 'ہلکی غنودگی ہو سکتی ہے، گاڑی چلانے کے دوران احتیاط کریں۔'
        }
      }
    ],
    strictlyAvoid: {
      en: [
        'Do NOT take antibiotics (e.g. Amoxicillin, Azithromycin) for viral flu without confirmed bacterial secondary infection.',
        'Do NOT give Aspirin (Disprin) to children or teenagers with flu symptoms (risk of lethal Reye Syndrome).'
      ],
      ur: [
        'وائرل فلو میں اینٹی بائیوٹکس کا از خود استعمال نہ کریں؛ اینٹی بائیوٹکس وائرس پر اثر نہیں کرتیں۔',
        'بچوں اور نوجوانوں کو فلو اور بخار میں اسپرین (ڈسپرین) ہرگز نہ دیں کیونکہ یہ خطرناک سنڈروم کا باعث بن سکتی ہے۔'
      ]
    },
    homeCareAndHydration: {
      en: [
        'Drink 8-10 glasses of warm water, chicken bone broth, and green tea with honey and ginger.',
        'Steam inhalation with plain hot water twice daily to loosen nasal passages.',
        'Strict bed rest for 48-72 hours to prevent viral post-exhaustion.'
      ],
      ur: [
        'کثرت سے نیم گرم پانی، یخنی، شہد اور ادرک کا قہوہ پئیں۔',
        'ناک کی نالیوں کو کھولنے کے لیے دن میں دو بار گرم پانی کی بھاپ لیں۔',
        'کم از کم دو سے تین دن مکمل آرام کریں تاکہ مدافعتی نظام بحال ہو۔'
      ]
    },
    redFlagWarning: {
      en: 'EMERGENCY: Difficulty breathing, chest pain when coughing, bluish lips, or fever remaining above 39.5°C after 3 days requires immediate hospital emergency visit.',
      ur: 'ہنگامی خطرہ: اگر سانس لینے میں تکلیف ہو، کھانسی پر سینے میں درد ہو، ہونٹ نیلے پڑیں یا بخار 3 دن تک نہ ٹوٹے تو فوراً ہسپتال پہنچیں۔'
    }
  },
  {
    id: 'dengue-viral-fever',
    name: {
      en: 'Dengue Viral Fever ("Breakbone Fever")',
      ur: 'ڈینگی وائرل بخار (ہڈی توڑ بخار)'
    },
    seasonId: 'monsoon',
    seasonName: {
      en: 'Monsoon',
      ur: 'موسم برسات'
    },
    keySymptoms: {
      en: [
        'Sudden extremely high fever (104°F / 40°C)',
        'Excruciating retro-orbital headache (severe pain behind the eyeballs)',
        'Severe "breakbone" bodyache (intense joint and bone agony)',
        'Flushed facial rash and nausea'
      ],
      ur: [
        'اچانک تیز ترین بخار (104 ڈگری فارن ہائیٹ تک)',
        'آنکھوں کے پیچھے ناقابل برداشت شدید سر درد',
        'ہڈیوں اور جوڑوں میں شدید ترین اینٹھن اور درد (ہڈی توڑ بخار)',
        'جسم پر سرخ دھبے، متلی اور شدید نقاہت'
      ]
    },
    severeBodyacheHeadacheNotice: {
      en: 'CRITICAL SAFETY DIRECTIVE: In Dengue season, NEVER take Aspirin, Disprin, or Ibuprofen for severe bodyache or headache! They disrupt blood clotting and precipitate fatal internal bleeding. Paracetamol is the ONLY safe analgesic.',
      ur: 'انتہائی اہم طبی ہدایت: برسات اور ڈینگی کے موسم میں شدید جسم درد یا سر درد کے لیے اسپرین، ڈسپرین یا بروفین ہرگز نہ لیں! یہ خون کو پتلا کر کے اندرونی خون بہنے کا باعث بن سکتی ہیں۔ صرف پیراسیٹامول محفوظ ہے۔'
    },
    recommendedMedicines: [
      {
        name: {
          en: 'Paracetamol (Acetaminophen ONLY)',
          ur: 'صرف اور صرف پیراسیٹامول (پیناڈول)'
        },
        purpose: {
          en: 'The ONLY globally permitted over-the-counter painkiller and fever reducer in suspected Dengue fever.',
          ur: 'ڈینگی اور ملیریا کے شبہ میں جسم درد اور بخار کے لیے واحد محفوظ اور منظور شدہ دوا۔'
        },
        activeIngredient: {
          en: 'Paracetamol 500 mg (500mg-1000mg every 6 hours, max 3000-4000mg/day)',
          ur: 'پیراسیٹامول 500 ملی گرام (ہر 6 گھنٹے بعد، زیادہ سے زیادہ 4 گرام یومیہ)'
        },
        safetyNote: {
          en: 'Keep doses spaced by at least 6 hours. Do not exceed 4,000 mg in 24 hours.',
          ur: 'خوراکوں کے درمیان کم از کم 6 گھنٹے کا وقفہ رکھیں اور مقررہ حد سے زیادہ نہ لیں۔'
        }
      },
      {
        name: {
          en: 'Oral Rehydration Salts (WHO formula ORS / Nimkol)',
          ur: 'او آر ایس / نمکول (ORS)'
        },
        purpose: {
          en: 'Mandatory continuous electrolyte hydration to prevent vascular plasma leakage and dengue shock.',
          ur: 'خون کی شریانوں سے پلازما کے اخراج کو روکنے اور بلڈ پریشر مستحکم رکھنے کے لیے لازمی محلول۔'
        },
        activeIngredient: {
          en: 'Balanced Sodium, Potassium, Glucose, Citrate electrolyte powder',
          ur: 'متوازن نمکیات اور گلوکوز کا محلول'
        },
        safetyNote: {
          en: 'Mix precisely with 1 liter clean drinking water. Sip continuously throughout the day.',
          ur: 'ہدایت کے مطابق ایک لیٹر صاف پانی میں گھولیں اور دن بھر تھوڑا تھوڑا پیتے رہیں۔'
        }
      }
    ],
    strictlyAvoid: {
      en: [
        'STRICTLY FORBIDDEN: Aspirin, Disprin, Ibuprofen (Brufen), Diclofenac (Caflam/Voltaren), Mefenamic Acid (Ponstan). These induce fatal hemorrhagic shock!',
        'Do not take intramuscular pain injections.'
      ],
      ur: [
        'سخت ممنوع: اسپرین، ڈسپرین، بروفین، پونسٹان، والٹارین یا درد کے ٹیکے ہرگز نہ لگوائیں! یہ خطرناک اندرونی خون بہنے کا سبب بن سکتے ہیں۔'
      ]
    },
    homeCareAndHydration: {
      en: [
        'Monitor daily Complete Blood Count (CBC) to track Platelet count and Hematocrit (PCV).',
        'Drink fresh coconut water, ORS, fresh apple juice, and soups (at least 2.5 - 3 liters daily).',
        'Use mosquito nets and repellent lotions (DEET) day and night.'
      ],
      ur: [
        'روزانہ سی بی سی (CBC) ٹیسٹ کروا کر پلیٹلیٹس اور خون کے گاڑھے پن (HCT) کی جانچ کریں۔',
        'تازہ ناریل کا پانی، او آر ایس، سیب کا جوس اور یخنی کثرت سے پئیں (دن میں ڈھائی سے 3 لیٹر)۔',
        'دن اور رات مچھر دانی اور مچھر بھگانے والے لوشن کا استعمال کریں۔'
      ]
    },
    redFlagWarning: {
      en: 'EMERGENCY: Bleeding from gums or nose, black stools, persistent vomiting, severe belly pain, or sudden dizziness indicates Dengue Shock Syndrome. Rush to hospital immediately!',
      ur: 'ہنگامی خطرہ: مسوڑھوں یا ناک سے خون آنا، قے میں خون، پاخانہ سیاہ آنا یا شدید چکر ڈینگی شاک کی علامت ہے۔ فوراً ہسپتال پہنچیں!'
    }
  },
  {
    id: 'heat-exhaustion-summer',
    name: {
      en: 'Heat Exhaustion, Sunstroke & Summer Gastroenteritis',
      ur: 'ہیٹ اسٹروک، لو لگنا اور موسم گرما کی معدے کی خرابی'
    },
    seasonId: 'summer',
    seasonName: {
      en: 'Summer',
      ur: 'موسم گرما'
    },
    keySymptoms: {
      en: [
        'Intense pounding headache from cerebral vasodilation and dehydration',
        'Severe painful heat cramps in calves, thighs, and abdominal muscles',
        'Profuse sweating, dizziness, rapid pulse, and dark yellow urine',
        'Watery diarrhea and nausea from food heat spoilage'
      ],
      ur: [
        'شدید گرمی اور پانی کی کمی سے سر میں ہتھوڑے بجنے جیسا سر درد',
        'پنڈلیوں، رانوں اور پیٹ کے پٹھوں میں شدید دردناک اینٹھن (Heat Cramps)',
        'شدید پسینہ، چکر آنا، دل کی تیز دھڑکن اور پیشاب کا گہرا پیلا ہونا',
        'باسی یا گرم کھانے سے پیٹ خراب ہونا، اسہال اور متلی'
      ]
    },
    severeBodyacheHeadacheNotice: {
      en: 'Heat cramps and summer headaches are caused by acute electrolyte depletion (loss of sodium and potassium), NOT inflammation. Taking painkillers without water will NOT solve heat cramps and damages kidneys. Immediate electrolyte fluid replacement is essential.',
      ur: 'گرمی کے سر درد اور پٹھوں کی اینٹھن کی بنیادی وجہ نمکیات اور پانی کا اخراج ہے۔ پانی اور او آر ایس کے بغیر صرف درد کی گولی کھانے سے گردوں پر بوجھ پڑتا ہے۔ پہلے فوری او آر ایس پینا لازمی ہے۔'
    },
    recommendedMedicines: [
      {
        name: {
          en: 'Oral Rehydration Salts (ORS) & Electrolyte Solution',
          ur: 'او آر ایس / نمکول (ORS)'
        },
        purpose: {
          en: 'Immediately replenishes lost sodium, potassium, and glucose to resolve severe muscle cramps and heat headache.',
          ur: 'جسم کے ضائع شدہ نمکیات بحال کر کے پٹھوں کے درد اور گرمی کے سر درد کو فوراً دور کرتا ہے۔'
        },
        activeIngredient: {
          en: 'WHO Osmolarity ORS solution (1-2 liters chilled or room temp water)',
          ur: 'ڈبلیو ایچ او فارمولہ او آر ایس (صاف ٹھنڈے یا معتدل پانی میں)'
        },
        safetyNote: {
          en: 'Drink slowly in continuous sips. Do not gulp large quantities in one second.',
          ur: 'ایک دم بہت سارا پینے کے بجائے گھونٹ گھونٹ کر کے پئیں۔'
        }
      },
      {
        name: {
          en: 'Paracetamol 500 mg (Only after hydration)',
          ur: 'پیراسیٹامول 500 ملی گرام (پانی پینے کے بعد)'
        },
        purpose: {
          en: 'For residual throbbing tension or low-grade thermal discomfort once fluids have started.',
          ur: 'پانی اور نمکیات پینے کے بعد بھی سر درد رہے تو آرام کے لیے۔'
        },
        activeIngredient: {
          en: 'Paracetamol 500 mg tablet',
          ur: 'پیراسیٹامول 500 ملی گرام'
        },
        safetyNote: {
          en: 'Never take NSAIDs (Ibuprofen, Diclofenac) during active heat dehydration as it precipitates acute renal failure.',
          ur: 'پانی کی شدید کمی کی حالت میں بروفین یا ڈیکلوفینک ہرگز نہ لیں، گردے فیل ہونے کا خدشہ ہوتا ہے۔'
        }
      }
    ],
    strictlyAvoid: {
      en: [
        'Avoid taking Ibuprofen or Diclofenac when severely dehydrated in high heat.',
        'Avoid sugary carbonated energy drinks, heavy caffeinated coffee, or extreme ice-cold water chugs.'
      ],
      ur: [
        'گرمی میں پانی کی کمی کے دوران این ایس اے آئی ڈیز (بروفین، ڈیکلوفینک) سے سخت پرہیز کریں۔',
        'بہت زیادہ میٹھے شربت، کولڈ ڈرنکس اور تیز چائے/کافی سے پرہیز کریں کیونکہ یہ پیشاب آور ہوتی ہیں۔'
      ]
    },
    homeCareAndHydration: {
      en: [
        'Move into air-conditioned or shaded, fan-cooled room immediately.',
        'Loosen restrictive clothing and apply cool damp cloths to armpits, neck, and groin.',
        'Sip cool salted lassi, barley water, or coconut water alongside ORS.'
      ],
      ur: [
        'فوری طور پر ٹھنڈی، سایہ دار یا اے سی والے کمرے میں منتقل ہوں۔',
        'تنگ کپڑے اتاریں اور بغلوں، گردن اور پیشانی پر ٹھنڈی پٹیاں رکھیں۔',
        'نمکین لسی، ستو کا شربت اور او آر ایس کا استعمال کریں۔'
      ]
    },
    redFlagWarning: {
      en: 'EMERGENCY: If body temperature exceeds 40°C (104°F) and the patient stops sweating, becomes confused, delirious, or collapses, this is HEATSTROKE. Call 1122 and cool body immediately!',
      ur: 'ہنگامی خطرہ: اگر جسم کا درجہ حرارت 104 تک پہنچ جائے اور پسینہ آنا بند ہو جائے، مریض بے ہوش ہو یا بہکی باتیں کرے تو یہ ہیٹ اسٹروک ہے۔ فوراً 1122 ملائیں!'
    }
  },
  {
    id: 'spring-allergic-rhinitis',
    name: {
      en: 'Seasonal Allergic Rhinitis & Sinus Headache',
      ur: 'موسم بہار کی پولن الرجی اور سائنوس سر درد'
    },
    seasonId: 'spring',
    seasonName: {
      en: 'Spring',
      ur: 'موسم بہار'
    },
    keySymptoms: {
      en: [
        'Deep facial pressure headache across forehead, nasal bridge, and cheeks',
        'Intense bouts of sneezing (10-20 consecutive sneezes in the morning)',
        'Severe nasal congestion and itchy watery eyes',
        'General body tiredness from disrupted sleep'
      ],
      ur: [
        'پیشانی، گالوں کی ہڈیوں اور ناک کے اردگرد دباؤ اور بھاری پن کا سر درد',
        'صبح کے وقت مسلسل چھینکوں کے دورے (10 سے 15 چھینکیں)',
        'ناک کی شدید بندش اور آنکھوں میں خارش و پانی آنا',
        'نیند پوری نہ ہونے کی وجہ سے سستی اور تھکن'
      ]
    },
    severeBodyacheHeadacheNotice: {
      en: 'Sinus headaches during pollen season occur because inflamed swollen nasal turbinates trap air and mucus inside sinus cavities. Decongesting the sinuses and blocking histamine relieves the headache faster than heavy painkillers.',
      ur: 'پولن کے موسم میں سائنوس کا سر درد ناک کی نالیوں کی سوجن اور ہوا رکنے سے ہوتا ہے۔ الرجی کی دوا اور بھاپ سے سر درد بغیر بھاری درد کش گولیوں کے جلدی ٹھیک ہو جاتا ہے۔'
    },
    recommendedMedicines: [
      {
        name: {
          en: 'Cetirizine 10 mg / Loratadine 10 mg',
          ur: 'سیٹیریزین 10 ملی گرام / لوراٹاڈین'
        },
        purpose: {
          en: 'Blocks histamine receptors to halt sneezing, runny nose, and allergic eye tearing.',
          ur: 'چھینکوں، ناک بہنے اور الرجی کی علامات کو کنٹرول کرنے کے لیے۔'
        },
        activeIngredient: {
          en: 'Cetirizine dihydrochloride 10 mg (Once daily)',
          ur: 'سیٹیریزین 10 ملی گرام (روزانہ ایک بار)'
        },
        safetyNote: {
          en: 'Take consistently during peak pollen weeks for best barrier defense.',
          ur: 'پولن کے دنوں میں روزانہ باقاعدگی سے لیں۔'
        }
      },
      {
        name: {
          en: 'Paracetamol (for Sinus Headache)',
          ur: 'پیراسیٹامول (سائنوس سر درد کے لیے)'
        },
        purpose: {
          en: 'Relieves forehead pressure, cheekbone throbbing, and facial tension.',
          ur: 'پیشانی اور چہرے کی ہڈیوں کے دباؤ اور درد میں آرام کے لیے۔'
        },
        activeIngredient: {
          en: 'Paracetamol 500 mg tablet (1-2 tablets as needed)',
          ur: 'پیراسیٹامول 500 ملی گرام'
        },
        safetyNote: {
          en: 'Combine with steam inhalation to open sinus drainage ports.',
          ur: 'سائنوس کی نالیاں کھولنے کے لیے ساتھ گرم پانی کی بھاپ ضرور لیں۔'
        }
      },
      {
        name: {
          en: 'Isotonic Saline Nasal Spray',
          ur: 'سیلائن نیزل اسپرے (نمکین پانی)'
        },
        purpose: {
          en: 'Flushes out pollen granules directly from nasal mucosa without any drug side effects.',
          ur: 'بغیر کسی دوا کے مضر اثرات کے ناک سے پولن اور گرد کو دھو کر نکالتا ہے۔'
        },
        activeIngredient: {
          en: '0.9% Sodium Chloride sterile wash',
          ur: '0.9 فیصد نمکین پانی کا اسپرے'
        },
        safetyNote: {
          en: 'Safe for unlimited daily use in adults, pregnant women, and children.',
          ur: 'حاملہ خواتین، بچوں اور بڑوں کے لیے مکمل طور پر بے ضرر۔'
        }
      }
    ],
    strictlyAvoid: {
      en: [
        'Avoid prolonged use of chemical nasal decongestant sprays (e.g. Xylometazoline) beyond 4-5 consecutive days (causes severe rebound congestion / rhinitis medicamentosa).',
        'Avoid opening bedroom windows during morning peak pollen hours (5 AM - 10 AM).'
      ],
      ur: [
        'ناک کھولنے والے کیمیائی اسپرے (جیسے زائلومیٹازولین) کو 4 یا 5 دن سے زیادہ ہرگز مت استعمال کریں، اس سے ناک مستقل بند رہنے لگتی ہے۔',
        'صبح 5 سے 10 بجے کے درمیان کھڑکیاں بند رکھیں جب پولن کی شرح زیادہ ہوتی ہے۔'
      ]
    },
    homeCareAndHydration: {
      en: [
        'Wear a protective KN95 or surgical mask when venturing outdoors in breezy spring weather.',
        'Wash face, rinse hair, and change clothes after returning from outdoors to remove trapped pollen.',
        'Use an air purifier with HEPA filter indoors if possible.'
      ],
      ur: [
        'بہار کے موسم میں باہر جاتے وقت ماسک کا استعمال کریں۔',
        'باہر سے گھر آ کر منہ دھوئیں، کلیاں کریں اور کپڑے تبدیل کریں۔',
        'کمرے میں دھول اور پولن سے بچاؤ کے لیے صفائی کا خاص خیال رکھیں۔'
      ]
    },
    redFlagWarning: {
      en: 'EMERGENCY: Audible high-pitched wheezing, asthma flare-up with chest tightness, or inability to exhale normally requires immediate rescue inhaler and emergency care.',
      ur: 'ہنگامی خطرہ: اگر الرجی کے ساتھ سینے میں سیٹی کی آوازیں آئیں، دمہ کا دورہ پڑے یا سانس اندر باہر نہ ہو تو فوری انہیلر لیں اور ہسپتال جائیں۔'
    }
  }
];

export const PAIN_PROTOCOLS: PainProtocol[] = [
  {
    condition: {
      en: 'Severe Bodyache in Viral Infection (Myalgia & Joint Pain)',
      ur: 'وائرل بخار میں شدید جسمانی درد (پٹھوں اور ہڈیوں کا درد)'
    },
    severity: 'severe',
    recommendedFirstLine: {
      en: 'Paracetamol (Acetaminophen) 500mg - 1000mg. Liver-safe at therapeutic doses and strictly safe in Dengue / viral illness.',
      ur: 'پیراسیٹامول (500 تا 1000 ملی گرام)۔ عام مقدار میں جگر کے لیے محفوظ اور ڈینگی میں واحد محفوظ ترین دوا۔'
    },
    dosageSafetyRules: {
      en: [
        'Adult dose: 1 to 2 tablets (500mg-1000mg) every 6 to 8 hours as needed.',
        'Strict 24-hour maximum: 4,000 mg (8 tablets of 500mg).',
        'Never combine with cold & flu combo syrups without checking paracetamol content.'
      ],
      ur: [
        'بڑوں کے لیے خوراک: 1 سے 2 گولیاں (500 سے 1000 ملی گرام) ہر 6 سے 8 گھنٹے بعد ضرورت کے مطابق۔',
        '24 گھنٹے میں زیادہ سے زیادہ حد: 4,000 ملی گرام (8 گولیاں)۔',
        'دیگر جوشاندوں یا ساشے میں پیراسیٹامول کی موجودگی چیک کیے بغیر دوہری دوا نہ لیں۔'
      ]
    },
    contraindications: {
      en: [
        'Severe chronic liver cirrhosis or acute hepatic failure.',
        'Do NOT use Ibuprofen/Aspirin if platelet count is unverified in monsoon season.'
      ],
      ur: [
        'جگر کے شدید امراض کے مریض ڈاکٹر سے خوراک کم کروائیں۔',
        'برسات اور ڈینگی کے سیزن میں بغیر ٹیسٹ کے بروفین یا اسپرین ہرگز نہ لیں۔'
      ]
    },
    urgentDoctorThreshold: {
      en: 'Seek urgent hospital care if bodyache is accompanied by petechiae (pinpoint red skin spots), bleeding from gums, extreme weakness, or dark tea-colored urine.',
      ur: 'اگر جسم درد کے ساتھ جلد پر لال باریک دھبے، مسوڑھوں سے خون یا پیشاب کا رنگ چائے جیسا ہو جائے تو فوراً ہسپتال پہنچیں۔'
    }
  },
  {
    condition: {
      en: 'Severe Acute Headache (Tension, Sinus or Vascular)',
      ur: 'شدید سر درد (ٹینشن، سائنوس یا آدھے سر کا درد)'
    },
    severity: 'severe',
    recommendedFirstLine: {
      en: 'Paracetamol 1000mg OR Ibuprofen 400mg (with full glass of water and food). Rehydrate with 500ml water immediately.',
      ur: 'پیراسیٹامول 1000 ملی گرام یا کھانے کے بعد آئیبوپروفین 400 ملی گرام۔ ساتھ فوری دو گلاس پانی پئیں۔'
    },
    dosageSafetyRules: {
      en: [
        'Drink 500 ml of clean water immediately — 70% of acute headaches are triggered or worsened by mild dehydration.',
        'Rest in a dark, silent, air-cooled room with a cold forehead compress for 30 minutes.',
        'If using Ibuprofen, always take with food or milk to prevent gastric erosion.'
      ],
      ur: [
        'فوری طور پر دو گلاس پانی پئیں کیونکہ 70 فیصد سر درد پانی کی کمی سے بڑھتا ہے۔',
        'مدہم روشنی والے پرامن کمرے میں ماتھے پر ٹھنڈی پٹی رکھ کر 30 منٹ آرام کریں۔',
        'آئیبوپروفین ہمیشہ کھانے کے بعد لیں تاکہ معدے میں جلن نہ ہو۔'
      ]
    },
    contraindications: {
      en: [
        'Active peptic ulcer disease, severe heart disease, or third trimester of pregnancy (for Ibuprofen).',
        'Do not take pain pills more than 15 days a month to prevent medication-overuse headaches.'
      ],
      ur: [
        'معدے میں السر، دل کے امراض یا حمل کے آخری تین مہینوں میں بروفین سے پرہیز کریں۔',
        'مہینے میں 15 دن سے زیادہ درد کی گولیاں مت کھائیں ورنہ دوا کا اپنا سر درد شروع ہو جاتا ہے۔'
      ]
    },
    urgentDoctorThreshold: {
      en: 'RED FLAG EMERGENCY: Sudden "thunderclap" headache (reaching 10/10 agony within seconds), headache with stiff neck and high fever, or headache accompanied by slurred speech or facial weakness is a medical emergency (Call 1122).',
      ur: 'انتہائی ہنگامی خطرہ: اگر سر درد بجلی کی طرح اچانک شدید ترین ہو، گردن اکڑ جائے یا چہرہ ایک طرف مڑ جائے تو یہ فالج یا دماغی جھلی کی سوزش کا خطرہ ہے، فوری 1122 ملائیں۔'
    }
  }
];
