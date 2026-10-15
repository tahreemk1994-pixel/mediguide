import { Medicine } from '../types';

export const MEDICINES_DATA: Medicine[] = [
  {
    id: 'paracetamol',
    genericName: 'Paracetamol (Acetaminophen)',
    brandAliases: ['Panadol', 'Calpol', 'Tylenol', 'Disprol', 'Febrol'],
    category: {
      en: 'Analgesics & Antipyretics (Pain & Fever Relievers)',
      ur: 'درد اور بخار کم کرنے والی ادویات'
    },
    activeIngredient: {
      en: 'Paracetamol (500 mg typical adult tablet)',
      ur: 'پیراسیٹامول (عام طور پر 500 ملی گرام)'
    },
    commonUses: {
      en: [
        'Relief of mild to moderate pain (headache, toothache, muscle aches)',
        'Reduction of fever in colds and viral infections'
      ],
      ur: [
        'ہلکے سے معتدل درد سے نجات (سر درد، دانت کا درد، پٹھوں کا درد)',
        'نزلہ زکام اور وائرل انفیکشن میں بخار کم کرنا'
      ]
    },
    commonSideEffects: {
      en: [
        'Rare at recommended doses',
        'Mild nausea or allergic skin rash (uncommon)'
      ],
      ur: [
        'تجویز کردہ خوراک میں شاذ و نادر ہی نقصانات ہوتے ہیں',
        'ہلکی متلی یا جلد پر خارش (شاذ و نادر)'
      ]
    },
    warningsAndPrecautions: {
      en: [
        'Never exceed 4,000 mg (8 standard 500mg tablets) in 24 hours to prevent severe liver damage',
        'Do not combine with other medicines containing paracetamol (e.g. flu remedies)',
        'Patients with chronic liver disease or alcohol dependency must consult a doctor first'
      ],
      ur: [
        'جگر کو شدید نقصان سے بچانے کے لیے 24 گھنٹوں میں 4,000 ملی گرام سے زیادہ کبھی نہ لیں',
        'پیراسیٹامول پر مشتمل دیگر ادویات کے ساتھ ملا کر استعمال نہ کریں',
        'جگر کے امراض کے مریض پہلے معالج سے ضرور مشورہ کریں'
      ]
    },
    source: {
      name: 'DRAP & NHS UK Medicines Guide',
      url: 'https://www.nhs.uk/medicines/paracetamol-for-adults/',
      verifiedOrganization: 'Drug Regulatory Authority of Pakistan (DRAP) / NHS UK'
    },
    lastReviewed: '2024-08-15'
  },
  {
    id: 'ibuprofen',
    genericName: 'Ibuprofen',
    brandAliases: ['Brufen', 'Advil', 'Motrin', 'Nurofen'],
    category: {
      en: 'Non-Steroidal Anti-Inflammatory Drugs (NSAIDs)',
      ur: 'سوزش اور درد کش ادویات (این ایس اے آئی ڈیز)'
    },
    activeIngredient: {
      en: 'Ibuprofen (200 mg - 400 mg)',
      ur: 'آئیبوپروفین (200 تا 400 ملی گرام)'
    },
    commonUses: {
      en: [
        'Inflammatory pain (arthritis, sprains, dental pain, menstrual cramps)',
        'Fever reduction when pain is also present'
      ],
      ur: [
        'سوزش اور درد (جوڑوں کا درد، موچ، دانت کا درد، ماہواری کا درد)',
        'درد کے ساتھ بخار کو کم کرنا'
      ]
    },
    commonSideEffects: {
      en: [
        'Stomach upset, indigestion, or heartburn',
        'Nausea or mild dizziness'
      ],
      ur: [
        'پیٹ کی جلن، بدہضمی یا گیس',
        'متلی یا ہلکا چکر آنا'
      ]
    },
    warningsAndPrecautions: {
      en: [
        'Always take with food or milk to protect stomach lining',
        'Avoid if you have a history of stomach ulcers, kidney disease, or severe heart failure',
        'Avoid during pregnancy (especially third trimester) unless specifically prescribed'
      ],
      ur: [
        'معدے کی حفاظت کے لیے ہمیشہ کھانے یا دودھ کے بعد لیں',
        'معدے کے السر، گردوں کے امراض یا دل کے مریض احتیاط کریں',
        'حمل کے دوران بغیر ڈاکٹر کے مشورے کے ہرگز استعمال نہ کریں'
      ]
    },
    source: {
      name: 'WHO Model List of Essential Medicines & MedlinePlus',
      url: 'https://medlineplus.gov/druginfo/meds/a682159.html',
      verifiedOrganization: 'WHO Essential Medicines List / MedlinePlus'
    },
    lastReviewed: '2024-07-20'
  },
  {
    id: 'amoxicillin',
    genericName: 'Amoxicillin',
    brandAliases: ['Augmentin', 'Amoxil', 'Novamox', 'Clavam'],
    category: {
      en: 'Beta-Lactam Penicillin Antibiotics',
      ur: 'پینسلین گروپ کی اینٹی بائیوٹک'
    },
    activeIngredient: {
      en: 'Amoxicillin trihydrate (often combined with Clavulanic Acid)',
      ur: 'ایموکسی سیلین ٹرائی ہائیڈریٹ'
    },
    commonUses: {
      en: [
        'Bacterial infections of the chest, ear, throat, urinary tract, and dental abscesses',
        'Prescription-only bacterial treatments'
      ],
      ur: [
        'سینے، کان، گلے، پیشاب کی نالی کے بیکٹیریل انفیکشن اور دانت کے پھوڑے',
        'صرف ڈاکٹر کے نسخے پر بیکٹیریل انفیکشن کے لیے'
      ]
    },
    commonSideEffects: {
      en: [
        'Mild diarrhea or loose stools',
        'Nausea and stomach discomfort'
      ],
      ur: [
        'ہلکے دست یا پیٹ کا خراب ہونا',
        'متلی اور معدے میں بے چینی'
      ]
    },
    warningsAndPrecautions: {
      en: [
        'Ineffective against viral infections like colds, flu, and COVID-19',
        'Must NEVER be taken by individuals allergic to penicillin (risk of anaphylaxis)',
        'Always complete the exact course prescribed by your doctor to prevent antibiotic resistance'
      ],
      ur: [
        'نزلہ، زکام اور وائرل بیماریوں پر بالکل اثر نہیں کرتی',
        'پینسلین سے الرجی رکھنے والے افراد کبھی استعمال نہ کریں',
        'اینٹی بائیوٹک کا کورس ڈاکٹر کی ہدایت کے مطابق پورا کریں تاکہ مدافعت پیدا نہ ہو'
      ]
    },
    source: {
      name: 'DRAP & NHS UK Antimicrobial Guide',
      url: 'https://www.nhs.uk/medicines/amoxicillin/',
      verifiedOrganization: 'DRAP Pakistan / NHS UK'
    },
    lastReviewed: '2024-09-01'
  },
  {
    id: 'cetirizine',
    genericName: 'Cetirizine',
    brandAliases: ['Zyrtec', 'Rigix', 'Cetriz', 'Zyrtec Allergy'],
    category: {
      en: 'Second-Generation Antihistamines',
      ur: 'اینٹی ہسٹامائن (الرجی کی دوا)'
    },
    activeIngredient: {
      en: 'Cetirizine dihydrochloride (10 mg)',
      ur: 'سیٹیریزین ڈائی ہائیڈروکلورائیڈ (10 ملی گرام)'
    },
    commonUses: {
      en: [
        'Allergic rhinitis (hay fever, sneezing, runny nose, itchy eyes)',
        'Skin allergy symptoms such as hives (urticaria) and itchiness'
      ],
      ur: [
        'موسمی الرجی (چھینکیں، بہتی ناک، آنکھوں میں خارش اور پانی آنا)',
        'جلد کی الرجی، پتی اچھلنا اور خارش'
      ]
    },
    commonSideEffects: {
      en: [
        'Mild drowsiness or tiredness (less sedative than first-gen antihistamines)',
        'Dry mouth, headache'
      ],
      ur: [
        'ہلکی اونگھ یا تھکن',
        'منہ کا خشک ہونا، سر درد'
      ]
    },
    warningsAndPrecautions: {
      en: [
        'Avoid driving or operating heavy machinery until you know how it affects you',
        'Avoid alcohol consumption while taking antihistamines',
        'Patients with kidney impairment may require adjusted doses'
      ],
      ur: [
        'اونگھ کی صورت میں ڈرائیونگ یا مشینری چلانے سے گریز کریں',
        'دوا کے استعمال کے دوران الکحل یا سکون آور ادویات سے پرہیز کریں',
        'گردے کے امراض کے حامل مریض ڈاکٹر کے مشورے سے مقدار طے کریں'
      ]
    },
    source: {
      name: 'MedlinePlus & NHS UK',
      url: 'https://medlineplus.gov/druginfo/meds/a698026.html',
      verifiedOrganization: 'US National Library of Medicine (MedlinePlus)'
    },
    lastReviewed: '2024-06-18'
  },
  {
    id: 'omeprazole',
    genericName: 'Omeprazole',
    brandAliases: ['Prilosec', 'Risek', 'Omez', 'Losec'],
    category: {
      en: 'Proton Pump Inhibitors (PPIs)',
      ur: 'پروٹون پمپ انہیبیٹرز (تیزابیت کم کرنے والی ادویات)'
    },
    activeIngredient: {
      en: 'Omeprazole (20 mg / 40 mg capsules)',
      ur: 'اوپریپرازول (20 یا 40 ملی گرام)'
    },
    commonUses: {
      en: [
        'Gastroesophageal reflux disease (GERD / severe acid reflux)',
        'Stomach ulcers and protection during long-term NSAID therapy',
        'Heartburn and excess stomach acid production'
      ],
      ur: [
        'سینے کی جلن اور معدے کی تیزابیت کا علاج',
        'معدے اور آنتوں کے السر سے بچاؤ اور علاج',
        'مسلسل درد کش ادویات کے مضر اثرات سے معدے کی حفاظت'
      ]
    },
    commonSideEffects: {
      en: [
        'Headache, mild stomach pain, constipation or diarrhea',
        'Flatulence (excess gas)'
      ],
      ur: [
        'سر درد، پیٹ میں ہلکا درد، قبض یا اسہال',
        'پیٹ میں گیس کا بننا'
      ]
    },
    warningsAndPrecautions: {
      en: [
        'Best taken 30 to 60 minutes before morning breakfast',
        'Swallow whole with water; do not crush or chew capsules',
        'Long-term uninterrupted use without medical supervision may affect magnesium, calcium, and vitamin B12 absorption'
      ],
      ur: [
        'صبح ناشتے سے 30 سے 60 منٹ پہلے خالی پیٹ لینا سب سے مفید ہے',
        'کیپسول کو چبائے بغیر پانی کے ساتھ نگلیں',
        'ڈاکٹر کے مشورے کے بغیر مہینوں مسلسل استعمال سے وٹامنز اور کیلشیم کی کمی ہو سکتی ہے'
      ]
    },
    source: {
      name: 'DRAP & NHS UK Guidance on Acid Suppressants',
      url: 'https://www.nhs.uk/medicines/omeprazole/',
      verifiedOrganization: 'DRAP Pakistan / NHS UK'
    },
    lastReviewed: '2024-08-10'
  },
  {
    id: 'metformin',
    genericName: 'Metformin',
    brandAliases: ['Glucophage', 'Neodipar', 'Diaformin', 'Fortamet'],
    category: {
      en: 'Biguanides (Oral Blood Glucose Lowering Drugs)',
      ur: 'ذیابیطس (شوگر) کو کنٹرول کرنے والی دوا'
    },
    activeIngredient: {
      en: 'Metformin hydrochloride (500 mg / 850 mg / 1000 mg)',
      ur: 'میٹفارمین ہائیڈروکلورائیڈ'
    },
    commonUses: {
      en: [
        'First-line treatment for Type 2 diabetes to lower elevated blood glucose',
        'Polycystic ovary syndrome (PCOS) management under specialist care'
      ],
      ur: [
        'ٹائپ 2 ذیابیطس میں خون میں شکر کی سطح کو متوازن رکھنا',
        'خواتین میں ہارمونل مسائل (PCOS) کا علاج ماہر ڈاکٹر کی زیر نگرانی'
      ]
    },
    commonSideEffects: {
      en: [
        'Nausea, metallic taste in mouth, loose stools, or abdominal bloating',
        'Loss of appetite (often subsides over 1–2 weeks)'
      ],
      ur: [
        'متلی، منہ کا ذائقہ دھاتی ہونا، پیٹ کا خراب ہونا',
        'بھوک میں کمی (عموماً پہلے دو ہفتوں میں ٹھیک ہو جاتی ہے)'
      ]
    },
    warningsAndPrecautions: {
      en: [
        'Always take with or immediately after meals to minimize stomach upset',
        'Regular monitoring of kidney function is essential',
        'Seek immediate medical care for deep rapid breathing or severe weakness (rare lactic acidosis sign)'
      ],
      ur: [
        'پیٹ کی تکلیف سے بچنے کے لیے ہمیشہ کھانے کے دوران یا فوراً بعد لیں',
        'گردوں کے افعال (Creatinine) کا باقاعدگی سے ٹیسٹ ضروری ہے',
        'شدید کمزوری یا سانس پھولنے کی صورت میں فوری ڈاکٹر سے رجوع کریں'
      ]
    },
    source: {
      name: 'WHO Model List & ADA Clinical Practice Guidelines',
      url: 'https://medlineplus.gov/druginfo/meds/a696005.html',
      verifiedOrganization: 'WHO Essential Medicines / American Diabetes Association'
    },
    lastReviewed: '2024-07-15'
  },
  {
    id: 'azithromycin',
    genericName: 'Azithromycin',
    brandAliases: ['Zithromax', 'Azomax', 'Azee', 'Z-Pack'],
    category: {
      en: 'Macrolide Antibiotics',
      ur: 'میکرولائیڈ گروپ کی اینٹی بائیوٹک'
    },
    activeIngredient: {
      en: 'Azithromycin dihydrate (250 mg / 500 mg)',
      ur: 'ایزتھرومائسن ڈائی ہائیڈریٹ'
    },
    commonUses: {
      en: [
        'Bacterial respiratory tract infections (bronchitis, pneumonia, tonsillitis)',
        'Ear infections, skin infections, and certain sexually transmitted infections'
      ],
      ur: [
        'سانس کی نالی، گلے اور پھیپھڑوں کے بیکٹیریل انفیکشن',
        'کان، جلد اور مخصوص بیکٹیریل بیماریوں کا علاج'
      ]
    },
    commonSideEffects: {
      en: [
        'Abdominal cramps, diarrhea, nausea, temporary headache'
      ],
      ur: [
        'پیٹ میں مروڑ، اسہال، متلی، عارضی سر درد'
      ]
    },
    warningsAndPrecautions: {
      en: [
        'Prescription-only medicine; not effective for viral cough or common cold',
        'Caution in patients with cardiac arrhythmia (heart rhythm disturbances) or severe liver disease',
        'Take at the same time each day for the full duration prescribed'
      ],
      ur: [
        'صرف مستند ڈاکٹر کے نسخے پر استعمال کریں؛ عام زکام پر غیر موثر ہے',
        'دل کی دھڑکن کے مسائل یا جگر کی بیماری میں انتہائی احتیاط برتیں',
        'روزانہ ایک ہی وقت پر لیں اور تجویز کردہ کورس مکمل کریں'
      ]
    },
    source: {
      name: 'DRAP & NHS UK Antimicrobial Guidance',
      url: 'https://www.nhs.uk/medicines/azithromycin/',
      verifiedOrganization: 'DRAP Pakistan / NHS UK'
    },
    lastReviewed: '2024-08-25'
  },
  {
    id: 'salbutamol',
    genericName: 'Salbutamol (Albuterol)',
    brandAliases: ['Ventolin', 'Aerolin', 'Asthalin', 'ProAir'],
    category: {
      en: 'Short-Acting Beta-2 Agonists (Bronchodilators)',
      ur: 'سانس کی نالی کو کھولنے والی دوا (انہیلر)'
    },
    activeIngredient: {
      en: 'Salbutamol sulphate (100 mcg per puff inhaler)',
      ur: 'سالبوٹامول سلفیٹ (100 مائیکرو گرام فی پف)'
    },
    commonUses: {
      en: [
        'Rapid relief of bronchospasm in asthma and Chronic Obstructive Pulmonary Disease (COPD)',
        'Prevention of exercise-induced asthma'
      ],
      ur: [
        'دمہ اور سانس کی بندش میں فوری سانس بحال کرنا',
        'ورزش یا الرجی کی وجہ سے سانس کی تنگی سے بچاؤ'
      ]
    },
    commonSideEffects: {
      en: [
        'Tremor (shaky hands), mild palpitations (rapid heartbeat), mild headache'
      ],
      ur: [
        'ہاتھوں میں کپکپاہٹ، دل کی دھڑکن کا وقتی تیز ہونا، ہلکا سر درد'
      ]
    },
    warningsAndPrecautions: {
      en: [
        'This is a rescue inhaler for acute symptoms, not a controller steroid inhaler',
        'If you require the inhaler more than 2–3 times a week, consult your doctor for preventative therapy',
        'Seek emergency medical help if shortness of breath does not improve after recommended puffs'
      ],
      ur: [
        'یہ ہنگامی وقت میں فوری ریلیف کے لیے ہے، باقاعدہ حفاظتی علاج نہیں',
        'اگر ہفتے میں 2 سے 3 بار سے زیادہ ضرورت پڑے تو معالج سے مشورہ کریں',
        'اگر پف لینے کے بعد بھی سانس نہ سنبھلے تو فوراً ایمرجنسی رجوع کریں'
      ]
    },
    source: {
      name: 'WHO Model List of Essential Medicines & GINA Guidelines',
      url: 'https://medlineplus.gov/druginfo/meds/a682145.html',
      verifiedOrganization: 'WHO / Global Initiative for Asthma'
    },
    lastReviewed: '2024-09-12'
  },
  {
    id: 'losartan',
    genericName: 'Losartan',
    brandAliases: ['Cozaar', 'Zaart', 'Cardiovasc', 'Losar'],
    category: {
      en: 'Angiotensin II Receptor Blockers (ARBs)',
      ur: 'بلڈ پریشر کو معمول پر لانے والی دوا (اے آر بی)'
    },
    activeIngredient: {
      en: 'Losartan potassium (25 mg / 50 mg / 100 mg)',
      ur: 'لوسارٹن پوٹاشیم'
    },
    commonUses: {
      en: [
        'Hypertension (high blood pressure) management to reduce stroke risk',
        'Kidney protection in patients with Type 2 diabetes and proteinuria'
      ],
      ur: [
        'ہائی بلڈ پریشر کو کنٹرول میں رکھنا اور فالج کے خطرے کو کم کرنا',
        'ذیابیطس کے مریضوں میں گردوں کو پہنچنے والے نقصان سے حفاظت'
      ]
    },
    commonSideEffects: {
      en: [
        'Dizziness or lightheadedness when standing up quickly',
        'Fatigue, elevated potassium levels (hyperkalemia)'
      ],
      ur: [
        'اچانک کھڑے ہونے پر چکر آنا یا بلڈ پریشر گرنا',
        'تھکاوٹ، خون میں پوٹاشیم کی سطح کا بڑھنا'
      ]
    },
    warningsAndPrecautions: {
      en: [
        'Strictly contraindicated during pregnancy (causes serious fetal harm)',
        'Do not take potassium supplements or salt substitutes without doctor approval',
        'Requires periodic monitoring of blood pressure and kidney function'
      ],
      ur: [
        'حمل کے دوران بالکل ممنوع ہے کیونکہ یہ بچے کے لیے نقصان دہ ہے',
        'ڈاکٹر کی اجازت کے بغیر پوٹاشیم کے سپلیمنٹ ہرگز استعمال نہ کریں',
        'بلڈ پریشر اور گردوں کے ٹیسٹ وقتاً فوقتاً کرواتے رہیں'
      ]
    },
    source: {
      name: 'DRAP & British National Formulary (BNF)',
      url: 'https://www.nhs.uk/medicines/losartan/',
      verifiedOrganization: 'DRAP Pakistan / NHS UK'
    },
    lastReviewed: '2024-06-25'
  },
  {
    id: 'atorvastatin',
    genericName: 'Atorvastatin',
    brandAliases: ['Lipitor', 'Atorva', 'Lipiget', 'Torvast'],
    category: {
      en: 'HMG-CoA Reductase Inhibitors (Statins / Cholesterol Reducers)',
      ur: 'کولیسٹرول کم کرنے والی ادویات (سٹیٹنز)'
    },
    activeIngredient: {
      en: 'Atorvastatin calcium (10 mg / 20 mg / 40 mg)',
      ur: 'ایٹورواسٹاٹن کیلشیم'
    },
    commonUses: {
      en: [
        'Lowering LDL (bad) cholesterol and triglycerides in blood',
        'Reducing the risk of myocardial infarction (heart attack) and stroke in high-risk patients'
      ],
      ur: [
        'خون میں نقصان دہ کولیسٹرول (ایل ڈی ایل) اور چکنائی کو کم کرنا',
        'دل کے دورے اور فالج کے خطرے کو کم کرنا'
      ]
    },
    commonSideEffects: {
      en: [
        'Mild muscle stiffness, joint aches, digestive upset'
      ],
      ur: [
        'پٹھوں یا جوڑوں میں ہلکا درد یا اینٹھن، ہاضمے کے معمولی مسائل'
      ]
    },
    warningsAndPrecautions: {
      en: [
        'Notify your doctor promptly if you experience unexplained severe muscle pain or dark urine',
        'Avoid excessive consumption of grapefruit juice as it interferes with metabolism',
        'Not recommended during pregnancy or breastfeeding'
      ],
      ur: [
        'اگر پٹھوں میں شدید غیر معمولی درد یا پیشاب کا رنگ گہرا ہو تو فوراً ڈاکٹر کو بتائیں',
        'چکوترا (گریپ فروٹ) کے جوس سے پرہیز کریں کیونکہ یہ دوا پر اثر انداز ہوتا ہے',
        'حمل یا دودھ پلانے کے دوران استعمال سے گریز کریں'
      ]
    },
    source: {
      name: 'AHA & NHS UK Cholesterol Treatment Guidelines',
      url: 'https://www.nhs.uk/medicines/atorvastatin/',
      verifiedOrganization: 'American Heart Association / NHS UK'
    },
    lastReviewed: '2024-07-30'
  },
  {
    id: 'ors',
    genericName: 'Oral Rehydration Salts (ORS)',
    brandAliases: ['Nimkol', 'Electral', 'Hydralyte', 'Pedialyte'],
    category: {
      en: 'Electrolytes & Fluid Replacement',
      ur: 'نمکیات اور پانی کی کمی پوری کرنے والا محلول (او آر ایس / نمکول)'
    },
    activeIngredient: {
      en: 'WHO formula: Sodium chloride, Glucose, Potassium chloride, Trisodium citrate',
      ur: 'ڈبلیو ایچ او فارمولہ: نمک، گلوکوز، پوٹاشیم اور سوڈیم سائٹریٹ'
    },
    commonUses: {
      en: [
        'Prevention and treatment of dehydration caused by acute diarrhea or vomiting',
        'Rehydration during extreme heat, sweating, and physical exertion'
      ],
      ur: [
        'اسہال (دست) اور الٹی کی وجہ سے جسم میں پانی اور نمکیات کی کمی دور کرنا',
        'شدید گرمی، پسینے اور ہیٹ اسٹروک سے بچاؤ اور بحالی'
      ]
    },
    commonSideEffects: {
      en: [
        'Generally none when prepared in the exact correct ratio of clean drinking water'
      ],
      ur: [
        'صاف پانی میں صحیح تناسب سے تیار کرنے پر کوئی نقصان نہیں ہوتا'
      ]
    },
    warningsAndPrecautions: {
      en: [
        'Always dissolve in the exact measured volume of clean drinking or boiled water (typically 1 liter or 200 ml per sachet as directed)',
        'Do not add sugar, honey, juice, or milk directly into the ORS solution',
        'Discard unused prepared solution after 24 hours (keep covered in a clean vessel)'
      ],
      ur: [
        'ہمیشہ صاف یا ابال کر ٹھنڈے کیے گئے پانی میں ہدایت کے مطابق صحیح مقدار میں گھولیں',
        'او آر ایس کے محلول میں چینی، شہد یا دودھ ہرگز شامل نہ کریں',
        'تیار شدہ محلول کو ڈھانپ کر رکھیں اور 24 گھنٹے بعد نیا بنائیں'
      ]
    },
    source: {
      name: 'WHO & UNICEF Diarrhoea Management Guidelines',
      url: 'https://www.who.int/publications/i/item/9241593180',
      verifiedOrganization: 'World Health Organization (WHO) & UNICEF'
    },
    lastReviewed: '2024-08-01'
  },
  {
    id: 'ciprofloxacin',
    genericName: 'Ciprofloxacin',
    brandAliases: ['Cipro', 'Ciprobay', 'Novidat', 'Cifran'],
    category: {
      en: 'Fluoroquinolone Antibiotics',
      ur: 'فلوروکوئنولون گروپ کی اینٹی بائیوٹک'
    },
    activeIngredient: {
      en: 'Ciprofloxacin hydrochloride (250 mg / 500 mg)',
      ur: 'سپروفلوکساسین ہائیڈروکلورائیڈ'
    },
    commonUses: {
      en: [
        'Treatment of complicated bacterial urinary tract infections and typhoid fever',
        'Severe bacterial gastrointestinal infections under doctor direction'
      ],
      ur: [
        'پیشاب کی نالی کے پیچیدہ انفیکشن اور ٹائیفائیڈ کا علاج',
        'معدے اور آنتوں کے شدید بیکٹیریل انفیکشن (ڈاکٹر کے مشورے سے)'
      ]
    },
    commonSideEffects: {
      en: [
        'Nausea, diarrhea, mild headache, sun sensitivity (photosensitivity)'
      ],
      ur: [
        'متلی، اسہال، ہلکا سر درد، دھوپ میں جلد کا حساس ہونا'
      ]
    },
    warningsAndPrecautions: {
      en: [
        'Reserved for specific bacterial infections; not suitable for routine uncomplicated colds',
        'Rare risk of tendon pain or inflammation; discontinue and contact physician if tendon ache occurs',
        'Do not take with antacids, iron, or calcium supplements within 2 hours as they reduce absorption'
      ],
      ur: [
        'صرف مخصوص بیکٹیریل بیماریوں کے لیے؛ عام نزلہ زکام کے لیے نہیں',
        'اگر پٹھوں کے ریشوں (Tendon) میں درد محسوس ہو تو فوری طور پر ڈاکٹر سے رابطہ کریں',
        'دودھ، کیلشیم یا اینٹاسڈ کے ساتھ نہ لیں کیونکہ یہ دوا کا اثر کم کرتے ہیں'
      ]
    },
    source: {
      name: 'DRAP & FDA Drug Safety Communication',
      url: 'https://www.fda.gov/drugs/drug-safety-and-availability/',
      verifiedOrganization: 'DRAP Pakistan / US FDA'
    },
    lastReviewed: '2024-07-10'
  }
];
