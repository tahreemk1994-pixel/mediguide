import { Symptom } from '../types';

export const SYMPTOMS_DATA: Symptom[] = [
  {
    id: 'headache',
    name: {
      en: 'Headache',
      ur: 'سر درد'
    },
    severityLevel: 'mild',
    description: {
      en: 'Pain or throbbing discomfort in the head, scalp, or upper neck area. Can be dull, squeezing, or pulsing.',
      ur: 'سر، کنپٹیوں یا گردن کے اوپری حصے میں درد، کھنچاؤ یا بوجھ کا احساس۔'
    },
    commonCauses: {
      en: [
        'Tension and stress',
        'Dehydration or skipping meals',
        'Lack of sleep or eye strain from prolonged screen use',
        'Sinus pressure from seasonal colds'
      ],
      ur: [
        'ذہنی دباؤ، ٹینشن اور تھکن',
        'پانی کی کمی یا بھوکا رہنا',
        'نیند کی کمی یا موبائل/کمپیوٹر اسکرین کا زیادہ استعمال',
        'نزلہ زکام یا سائنوس کی سوجن'
      ]
    },
    selfCareAdvice: {
      en: [
        'Rest in a quiet, dimly lit, well-ventilated room',
        'Drink 1 to 2 glasses of clean water immediately to rehydrate',
        'Apply a gentle warm or cool compress to your forehead or neck',
        'Take regular breaks from digital screens and dim bright lights'
      ],
      ur: [
        'پرامن، مدہم روشنی اور ہوادار کمرے میں آرام کریں',
        'فوری طور پر ایک سے دو گلاس صاف پانی پئیں',
        'ماتھے یا گردن پر ٹھنڈی یا نیم گرم پٹی رکھیں',
        'موبائل اور کمپیوٹر کی اسکرین سے وقفہ لیں'
      ]
    },
    warningSigns: {
      en: [
        'Sudden, explosive "thunderclap" headache (worst of your life)',
        'Headache accompanied by stiff neck, high fever, or confusion',
        'Headache following a head injury or traumatic bump',
        'Accompanied by weakness on one side of the face or body, or slurred speech'
      ],
      ur: [
        'اچانک بجلی کی طرح کڑکنے والا شدید ترین سر درد',
        'گردن میں اکڑاؤ، تیز بخار یا ذہنی بدحواسی کے ساتھ درد',
        'سر پر چوٹ لگنے کے بعد ہونے والا سر درد',
        'چہرے یا جسم کے ایک حصے میں کمزوری یا بولنے میں دشواری'
      ]
    },
    whenToConsultDoctor: {
      en: 'Consult a general physician if your headache persists for more than 48 hours, recurs frequently, or worsens progressively despite rest and hydration.',
      ur: 'اگر سر درد 48 گھنٹے سے زیادہ رہے، بار بار ہو یا آرام اور پانی کے باوجود بڑھے تو معالج سے مشورہ کریں۔'
    }
  },
  {
    id: 'fever',
    name: {
      en: 'Fever (Elevated Body Temperature)',
      ur: 'بخار (جسمانی درجہ حرارت کا بڑھنا)'
    },
    severityLevel: 'moderate',
    description: {
      en: 'A temporary rise in body temperature (above 38°C / 100.4°F), which is the body natural immune mechanism fighting an infection.',
      ur: 'جسم کے درجہ حرارت کا معمول (38°C / 100.4°F) سے بڑھ جانا، جو عموماً جسم کے مدافعت نظام کی انفیکشن سے لڑنے کی علامت ہے۔'
    },
    commonCauses: {
      en: [
        'Viral upper respiratory infections (common cold, influenza)',
        'Bacterial infections (throat, chest, or urinary tract)',
        'Gastroenteritis (stomach bug)',
        'Heat exhaustion or reaction to recent immunizations'
      ],
      ur: [
        'وائرل نزلہ، زکام یا انفلوئنزا',
        'گلے، سینے یا پیشاب کی نالی کا بیکٹیریل انفیکشن',
        'معدے کی خرابی یا فوڈ پوائزننگ',
        'شدید گرمی یا حالیہ ویکسینیشن کا ردعمل'
      ]
    },
    selfCareAdvice: {
      en: [
        'Get plenty of bed rest to allow your immune system to fight the pathogen',
        'Drink abundant fluids: water, ORS, broths, and clear soups to prevent dehydration',
        'Wear lightweight, breathable clothing and avoid overdressing in heavy blankets',
        'Sponge forehead, neck, and armpits with lukewarm (not ice cold) water if uncomfortable'
      ],
      ur: [
        'بستر پر مکمل آرام کریں تاکہ مدافعتی نظام فعال رہے',
        'پانی کی کمی سے بچنے کے لیے کثرت سے پانی، او آر ایس اور نیم گرم یخنی پئیں',
        'ہلکے اور آرام دہ کپڑے پہنیں؛ بہت بھاری کمبل اوڑھنے سے گریز کریں',
        'تکلیف کی صورت میں پیشانی پر نیم گرم یا عام نلکے کے پانی کی پٹیاں رکھیں'
      ]
    },
    warningSigns: {
      en: [
        'Fever exceeding 39.4°C (103°F) in adults, or above 38°C (100.4°F) in infants under 3 months',
        'Fever lasting longer than 3 continuous days without an obvious cause',
        'Difficulty breathing, persistent chest pain, or bluish lips',
        'Severe lethargy, inability to stay awake, or stiff neck'
      ],
      ur: [
        'بخار کا 103 ڈگری فارن ہائیٹ سے تجاوز کر جانا، یا 3 ماہ سے چھوٹے بچے کو بخار ہونا',
        'بغیر کسی واضح وجہ کے مسلسل 3 دن سے زیادہ بخار رہنا',
        'سانس لینے میں شدید دشواری، سینے میں درد یا ہونٹوں کا نیلا پڑنا',
        'غشی، شدید غنودگی یا گردن کا اکڑ جانا'
      ]
    },
    whenToConsultDoctor: {
      en: 'Seek prompt medical evaluation if the fever does not respond to cooling measures, lasts beyond 72 hours, or occurs in very young children, elderly individuals, or immunocompromised patients.',
      ur: 'اگر بخار 3 دن سے زیادہ رہے، کم نہ ہو، یا چھوٹے بچوں اور بزرگوں کو ہو تو فوراً قریبی کلینک سے رجوع کریں۔'
    }
  },
  {
    id: 'cough',
    name: {
      en: 'Cough (Dry or Productive)',
      ur: 'کھانسی (خشک یا بلغم والی)'
    },
    severityLevel: 'mild',
    description: {
      en: 'A protective reflex that clears the throat and airway of irritants, foreign particles, fluids, and microbes.',
      ur: 'سانس کی نالی اور گلے کو صاف رکھنے کے لیے جسم کا ایک قدرتی ردعمل جو خشک بھی ہو سکتا ہے اور بلغم والا بھی۔'
    },
    commonCauses: {
      en: [
        'Viral viral respiratory tract infection (cold or flu)',
        'Allergies, dust, smog, smoke, or environmental irritants',
        'Post-nasal drip from allergic rhinitis',
        'Acid reflux (GERD) irritating the larynx'
      ],
      ur: [
        'نزلہ زکام یا وائرل فلو',
        'دھواں، گرد و غبار، الرجی اور آلودگی',
        'ناک سے حلق میں رطوبت کا گرنا',
        'معدے کی تیزابیت کا گلے میں آنا'
      ]
    },
    selfCareAdvice: {
      en: [
        'Sip warm fluids such as herbal tea, warm water with a teaspoon of honey (for children over 1 year)',
        'Inhale steam from a bowl of hot water to soothe dry respiratory passages',
        'Avoid exposure to tobacco smoke, aerosol sprays, and fine particulate pollution',
        'Elevate your head with an extra pillow while sleeping to reduce nighttime coughing'
      ],
      ur: [
        'نیم گرم پانی، قہوہ یا ایک چمچ شہد (ایک سال سے بڑے بچوں اور بڑوں کے لیے)',
        'گرم پانی کی بھاپ لیں تاکہ سانس کی نالیوں کو سکون ملے',
        'سگریٹ کے دھوئیں، کیڑے مار اسپرے اور گرد سے پرہیز کریں',
        'سوتے وقت سر کے نیچے اونچا تکیہ رکھیں تاکہ رات کو کھانسی کا دورہ نہ پڑے'
      ]
    },
    warningSigns: {
      en: [
        'Coughing up blood or pink-tinged frothy sputum',
        'Audible high-pitched wheezing, stridor, or severe shortness of breath',
        'Cough lasting longer than 3 weeks without improvement',
        'Unexplained weight loss or drenching night sweats'
      ],
      ur: [
        'کھانسی کے ساتھ خون یا گلابی رنگ کا بلغم آنا',
        'سانس میں سیٹی جیسی آوازیں یا دم گھٹنا',
        'کھانسی کا 3 ہفتوں سے زیادہ جاری رہنا',
        'وزن کا غیر معمولی کم ہونا یا رات کو پسینے چھوٹنا'
      ]
    },
    whenToConsultDoctor: {
      en: 'Visit a healthcare clinic if the cough is associated with high fever, persists beyond 2–3 weeks, or interferes with normal breathing and sleeping.',
      ur: 'اگر کھانسی 2 سے 3 ہفتے سے زیادہ جاری رہے، سانس پھولے یا تیز بخار ہو تو ڈاکٹر کو دکھائیں۔'
    }
  },
  {
    id: 'sore-throat',
    name: {
      en: 'Sore Throat (Pharyngitis)',
      ur: 'گلے کی سوزش اور درد'
    },
    severityLevel: 'mild',
    description: {
      en: 'Pain, scratchiness, or irritation in the throat that often worsens when swallowing.',
      ur: 'گلے میں دکھن، خراش، جلن یا نگلتے وقت شدید درد کا احساس۔'
    },
    commonCauses: {
      en: [
        'Common viral respiratory infections (rhinovirus, adenovirus)',
        'Strep throat (bacterial Streptococcus infection)',
        'Dry ambient indoor air or mouth breathing during sleep',
        'Voice strain or excessive shouting'
      ],
      ur: [
        'وائرل فلو اور نزلہ زکام',
        'بیکٹیریل انفیکشن (اسٹریپ تھروٹ)',
        'خشک ہوا یا منہ کھول کر سونا',
        'زیادہ بولنا یا گلے پر دباؤ ڈالنا'
      ]
    },
    selfCareAdvice: {
      en: [
        'Gargle with warm salt water (1/2 teaspoon salt in a glass of warm water) 3–4 times daily',
        'Drink plenty of warm liquids to keep the mucous membranes moist',
        'Suck on throat lozenges or hard candy to stimulate protective saliva flow',
        'Rest your voice and avoid cold refrigerated drinks'
      ],
      ur: [
        'نیم گرم نمک ملے پانی کے غرارے کریں (دن میں 3 سے 4 بار)',
        'کثرت سے نیم گرم مائعات پئیں تاکہ گلے میں تری رہے',
        'گلے کی ٹافیاں یا شہد کا استعمال کریں تاکہ تھوک کا بہاؤ بڑھے',
        'زیادہ بولنے سے پرہیز کریں اور ٹھنڈے یخ مشروبات سے دور رہیں'
      ]
    },
    warningSigns: {
      en: [
        'Inability to swallow liquids or saliva (drooling due to extreme pain)',
        'Difficulty opening your mouth wide (trismus) or neck swelling',
        'Noticeable difficulty breathing or stridor',
        'Bright red throat with thick white patches of pus on tonsils accompanied by high fever'
      ],
      ur: [
        'پانی نگلنے میں شدید دشواری یا منہ سے رال بہنا',
        'منہ کھولنے میں دشواری یا گردن کا سوج جانا',
        'سانس لینے میں رکاوٹ محسوس ہونا',
        'ٹانسلز پر سفید پیپ کے دھبے اور ساتھ تیز بخار'
      ]
    },
    whenToConsultDoctor: {
      en: 'Consult a medical professional if the sore throat lasts more than 5 days, is severe, or is accompanied by earache, skin rash, or high fever.',
      ur: 'اگر گلے کا درد 5 دن سے زیادہ رہے، کان میں درد ہو یا پیپ والے ٹانسلز ہوں تو ڈاکٹر سے رابطہ کریں۔'
    }
  },
  {
    id: 'nausea',
    name: {
      en: 'Nausea & Vomiting',
      ur: 'متلی اور الٹی'
    },
    severityLevel: 'moderate',
    description: {
      en: 'An uneasy feeling in the stomach with an urge to vomit, potentially resulting in involuntary emptying of stomach contents.',
      ur: 'معدے میں بے چینی اور متلی کا احساس، جس کے نتیجے میں الٹی آ سکتی ہے۔'
    },
    commonCauses: {
      en: [
        'Viral gastroenteritis (stomach flu)',
        'Food poisoning from contaminated food or water',
        'Motion sickness during travel',
        'Early pregnancy (morning sickness) or medication side effect'
      ],
      ur: [
        'معدے اور آنتوں کا وائرل انفیکشن',
        'خراب یا باسی کھانے سے فوڈ پوائزننگ',
        'سفر کے دوران چکر اور متلی',
        'حمل کی شروعات یا بعض ادویات کا ردعمل'
      ]
    },
    selfCareAdvice: {
      en: [
        'Take frequent tiny sips of clear fluids (water, ORS, diluted apple juice) rather than large gulps',
        'Eat small portions of bland, low-fat foods (bananas, rice, plain toast, crackers) when tolerated',
        'Sip fresh ginger tea or smell lemon peel to naturally soothe nausea',
        'Avoid greasy, spicy, heavily seasoned, or fried foods'
      ],
      ur: [
        'ایک ساتھ زیادہ پانی پینے کے بجائے تھوڑے تھوڑے وقفے سے چند گھونٹ او آر ایس یا پانی پئیں',
        'ہلکی اور سادہ غذا لیں جیسے ابلے چاول، کیلا، ڈبل روٹی یا کھچڑی',
        'ادرک کی چائے یا لیموں سونگھنے سے متلی میں افاقہ ہوتا ہے',
        'تلی ہوئی، مرچ مصالحے دار اور چکنی غذاؤں سے سخت پرہیز کریں'
      ]
    },
    warningSigns: {
      en: [
        'Inability to keep fluids down for more than 24 continuous hours',
        'Signs of acute dehydration: sunken eyes, extreme dry mouth, lack of urination for 8+ hours',
        'Vomiting blood or coffee-ground-like black granules',
        'Severe, acute abdominal pain radiating to the back or lower right side'
      ],
      ur: [
        '24 گھنٹے تک کوئی بھی مائع یا پانی پیٹ میں نہ ٹھہرنا',
        'پانی کی شدید کمی کی علامات: آنکھیں اندر دھنس جانا، 8 گھنٹے تک پیشاب نہ آنا',
        'الٹی میں خون یا کافی کے رنگ جیسا کالا مواد آنا',
        'پیٹ میں شدید اور ناقابل برداشت درد ہونا'
      ]
    },
    whenToConsultDoctor: {
      en: 'Seek urgent healthcare if vomiting persists beyond 24 hours, dehydration signs appear, or severe stomach pain accompanies the symptoms.',
      ur: 'اگر الٹی ایک دن سے زیادہ رہے، پانی کی شدید کمی ہو جائے یا تیز پیٹ درد ہو تو فوری ہسپتال جائیں۔'
    }
  },
  {
    id: 'stomach-discomfort',
    name: {
      en: 'Stomach Discomfort & Indigestion (Dyspepsia)',
      ur: 'پیٹ کی خرابی اور بدہضمی'
    },
    severityLevel: 'mild',
    description: {
      en: 'Bloating, burning sensation, upper abdominal fullness, or mild cramps following meals.',
      ur: 'کھانے کے بعد پیٹ میں اپھارہ، جلن، بھاری پن یا ہلکے مروڑ کا احساس۔'
    },
    commonCauses: {
      en: [
        'Overeating or eating too quickly without chewing properly',
        'Excessive consumption of oily, spicy, acidic, or fatty foods',
        'Excessive caffeine, carbonated sodas, or late-night dining',
        'Mild acid reflux or gastritis'
      ],
      ur: [
        'ضرورت سے زیادہ کھانا یا چبائے بغیر تیزی سے نگلنا',
        'تیل والی، مرچوں والی یا باسی چیزوں کا استعمال',
        'چائے، کافی اور کولڈ ڈرنکس کی زیادتی یا دیر سے رات کا کھانا',
        'معدے کی تیزابیت اور جلن'
      ]
    },
    selfCareAdvice: {
      en: [
        'Eat smaller, more frequent meals rather than large heavy meals',
        'Do not lie down immediately after eating; wait at least 2 to 3 hours before bed',
        'Sip lukewarm water, mint tea, or chamomile tea',
        'Avoid tight waistbands and loosen restrictive clothing'
      ],
      ur: [
        'ایک ساتھ بہت زیادہ کھانے کے بجائے کم مقدار میں وقفے وقفے سے کھائیں',
        'کھانے کے فوراً بعد مت لیٹیں؛ سونے سے کم از کم 2 گھنٹے پہلے کھانا کھائیں',
        'نیم گرم پانی یا پودینے کا قہوہ پئیں',
        'تنگ کپڑوں سے پرہیز کریں'
      ]
    },
    warningSigns: {
      en: [
        'Unexplained persistent difficulty or pain while swallowing',
        'Black, tarry stools or blood in stool',
        'Severe sudden sharp abdominal pain with rigid belly wall',
        'Pain that spreads to the chest, jaw, or shoulder (could mimic cardiac pain)'
      ],
      ur: [
        'کھانا نگلنے میں مسلسل رکاوٹ یا تکلیف',
        'پاخانے کا رنگ کالا یا خون آلود ہونا',
        'پیٹ میں شدید اچانک درد اور پیٹ کا پتھر کی طرح سخت ہو جانا',
        'ایسا درد جو سینے، کندھے یا جبڑے کی طرف پھیلے (دل کی تکلیف کا شبہ)'
      ]
    },
    whenToConsultDoctor: {
      en: 'Consult a gastroenterologist or family doctor if indigestion continues for over two weeks, is accompanied by unintentional weight loss, or severe nighttime pain.',
      ur: 'اگر بدہضمی 2 ہفتے سے مسلسل رہے، وزن کم ہو رہا ہو یا رات کو بیدار کر دے تو معالج سے مشورہ کریں۔'
    }
  },
  {
    id: 'runny-nose',
    name: {
      en: 'Runny Nose & Nasal Congestion (Rhinitis)',
      ur: 'بہتی ناک اور نزلہ / زکام'
    },
    severityLevel: 'mild',
    description: {
      en: 'Excessive thin nasal mucus discharge or blocked, swollen nasal passages making nasal breathing difficult.',
      ur: 'ناک سے رطوبت کا مسلسل بہنا یا ناک کی نالیوں کی سوجن جس سے سانس لینا دشوار ہو۔'
    },
    commonCauses: {
      en: [
        'Viral upper respiratory tract infection (the common cold)',
        'Allergic rhinitis (pollen, dust mites, pet dander)',
        'Weather changes, cold outdoor air, or sudden temperature drops',
        'Sinusitis (inflammation of facial sinus cavities)'
      ],
      ur: [
        'عام نزلہ زکام کا وائرس',
        'موسمی الرجی (گرد، پولن اور مٹی)',
        'موسم کی تبدیلی یا اچانک سرد ہوا لگنا',
        'سائنوسائٹس (چہرے کی ہڈیوں میں رطوبت کا جمنا)'
      ]
    },
    selfCareAdvice: {
      en: [
        'Use sterile saline nasal spray or drops to rinse away irritants and loosen secretions',
        'Inhale steam over a warm bowl of water or take a warm shower',
        'Stay well hydrated with warm soups, broths, and water to thin mucus',
        'Use clean disposable tissues and wash hands frequently to prevent transmission'
      ],
      ur: [
        'ناک کی صفائی کے لیے نمکین پانی (سیلائن اسپرے) کا استعمال کریں',
        'گرم پانی کی بھاپ لیں تاکہ ناک کی بندش کھلے',
        'خوب نیم گرم پانی اور یخنی پئیں تاکہ رطوبت پتلی ہو کر خارج ہو سکے',
        'صاف ٹشو استعمال کریں اور ہاتھ باقاعدگی سے دھوئیں'
      ]
    },
    warningSigns: {
      en: [
        'Nasal discharge from only one nostril that is foul-smelling or contains frank blood',
        'Severe facial pain, swelling around the eyes, or high fever',
        'Clear watery fluid dripping continuously after a recent head blow'
      ],
      ur: [
        'صرف ایک نتھنے سے بدبودار یا خون آلود رطوبت کا بہنا',
        'آنکھوں کے گرد شدید سوجن، درد یا تیز بخار',
        'سر پر چوٹ لگنے کے بعد مسلسل پانی کی طرح شفاف رطوبت بہنا'
      ]
    },
    whenToConsultDoctor: {
      en: 'Visit a clinic if symptoms persist longer than 10–14 days without improvement, or if severe forehead/cheek pain develops.',
      ur: 'اگر نزلہ 10 سے 14 دن سے زائد رہے یا چہرے اور آنکھوں میں شدید درد پیدا ہو تو ڈاکٹر کو دکھائیں۔'
    }
  },
  {
    id: 'fatigue',
    name: {
      en: 'Fatigue & Low Energy',
      ur: 'شدید تھکن اور توانائی کی کمی'
    },
    severityLevel: 'mild',
    description: {
      en: 'An overwhelming sense of exhaustion, tiredness, or lack of energy that is not quickly relieved by normal rest.',
      ur: 'مسلسل سستی، کمزوری اور بے دم ہونے کا احساس جو معمول کے آرام سے بھی دور نہ ہو۔'
    },
    commonCauses: {
      en: [
        'Chronic lack of quality sleep or irregular sleep schedule',
        'Nutritional deficits such as iron deficiency anemia or low vitamin D/B12',
        'Dehydration, poor nutrition, or high chronic stress levels',
        'Convalescence recovering from a recent viral illness'
      ],
      ur: [
        'نیند کی دائمی کمی یا بے خوابی',
        'جسم میں خون (آئرن) یا وٹامن ڈی اور بی 12 کی کمی',
        'پانی کی کمی، ناکافی غذا یا مسلسل ذہنی دباؤ',
        'حالیہ کسی بیماری یا بخار کے بعد کی نقاہت'
      ]
    },
    selfCareAdvice: {
      en: [
        'Maintain a consistent sleep routine aiming for 7 to 9 hours of uninterrupted sleep',
        'Eat balanced meals featuring protein, green leafy vegetables, and whole grains',
        'Stay hydrated by drinking water consistently throughout the daytime',
        'Engage in gentle daily movement like 20 minutes of outdoor morning walking'
      ],
      ur: [
        'روزانہ 7 سے 8 گھنٹے پرسکون نیند کا معمول بنائیں',
        'متوازن اور غذائیت سے بھرپور خوراک کھائیں جس میں سبزیاں اور پروٹین شامل ہوں',
        'دن بھر باقاعدگی سے پانی پئیں',
        'روزانہ صبح 20 منٹ کھلی ہوا میں چہل قدمی کریں'
      ]
    },
    warningSigns: {
      en: [
        'Fatigue accompanied by shortness of breath on minimal exertion or chest pain',
        'Unexplained rapid weight loss, recurrent night sweats, or swollen lymph nodes',
        'Sudden severe muscle weakness or inability to stand up',
        'Feelings of profound hopelessness or severe clinical depression'
      ],
      ur: [
        'معمولی چلنے پر سانس کا پھول جانا یا سینے پر بوجھ',
        'بغیر کوشش کے تیزی سے وزن کا گرنا یا رات کو پسینے چھوٹنا',
        'اچانک پٹھوں کی شدید کمزوری یا کھڑے ہونے میں ناکامی',
        'شدید مایوسی یا گہرے ذہنی دباؤ کے احساسات'
      ]
    },
    whenToConsultDoctor: {
      en: 'Consult your doctor for standard laboratory screening (CBC, thyroid, fasting sugar, vitamin levels) if fatigue has lasted more than 2–3 weeks without a clear lifestyle explanation.',
      ur: 'اگر تھکاوٹ بغیر کسی ظاہری وجہ کے کئی ہفتوں تک برقرار رہے تو بنیادی ٹیسٹوں کے لیے معالج سے رجوع کریں۔'
    }
  }
];

export const EMERGENCY_RED_FLAGS = [
  {
    id: 'chest-pain',
    title: {
      en: 'Severe Chest Pain or Pressure',
      ur: 'سینے میں شدید درد یا دباؤ'
    },
    description: {
      en: 'Crushing sensation in the center of the chest, radiating to the jaw, neck, back, or left arm, often with shortness of breath or cold sweats. Possible heart attack.',
      ur: 'سینے میں شدید گھٹن یا بوجھ جو جبڑے، بائیں بازو یا کمر تک پھیلے، ساتھ پسینے چھوٹیں یا دم گھٹے۔ دل کے دورے کا خدشہ۔'
    },
    action: {
      en: 'Call 1122 or Emergency Services Immediately. Do not drive yourself.',
      ur: 'فوری طور پر 1122 یا ایمرجنسی سروس کو کال کریں۔ خود گاڑی نہ چلائیں۔'
    }
  },
  {
    id: 'breathing-difficulty',
    title: {
      en: 'Severe Difficulty Breathing',
      ur: 'سانس لینے میں شدید دشواری'
    },
    description: {
      en: 'Gasping for air, inability to speak full sentences, blue lips or fingernails, sudden severe wheezing.',
      ur: 'دم گھٹنا، پورا جملہ نہ بول پانا، ہونٹوں کا نیلا ہونا یا سانس کی شدید تنگی۔'
    },
    action: {
      en: 'Seek immediate emergency medical treatment or dial 1122 without delay.',
      ur: 'بغیر تاخیر کے فوری ہنگامی طبی امداد حاصل کریں یا 1122 ملائیں۔'
    }
  },
  {
    id: 'stroke-signs',
    title: {
      en: 'Signs of Stroke (F.A.S.T.)',
      ur: 'فالج کی ہنگامی علامات (فاسٹ اصول)'
    },
    description: {
      en: 'Face drooping on one side, Arm weakness or numbness, Slurred speech or confusion. Time is critical (Every second matters).',
      ur: 'چہرے کا ایک طرف ڈھلک جانا، ایک بازو میں کمزوری یا سن ہونا، بولنے میں لڑکھڑاہٹ۔ وقت انتہائی قیمتی ہے۔'
    },
    action: {
      en: 'Call emergency rescue immediately. Note the exact time symptoms started.',
      ur: 'فوری ریسکیو 1122 کو کال کریں اور علامتیں شروع ہونے کا وقت نوٹ کریں۔'
    }
  },
  {
    id: 'unconsciousness',
    title: {
      en: 'Loss of Consciousness or Sudden Seizure',
      ur: 'بے ہوشی یا اچانک جھٹکے لگنا (دورے)'
    },
    description: {
      en: 'Unresponsiveness, fainting with inability to regain consciousness quickly, or violent uncontrolled convulsions.',
      ur: 'غشی، ہوش میں نہ آنا، یا جسم میں بے قابو جھٹکے لگنا۔'
    },
    action: {
      en: 'Keep airway clear, place on side (recovery position), call emergency rescue immediately.',
      ur: 'مریض کو کروٹ کے بل لٹائیں اور فوراً ایمرجنسی مدد طلب کریں۔'
    }
  }
];
