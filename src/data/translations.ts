export const TRANSLATIONS = {
  en: {
    appName: 'MediGuide Enterprise Health',
    tagline: 'Understand Your Health Information with Confidence',
    subTagline: 'Accessible healthcare intelligence guide for medicines, lab reports, seasonal viral diseases, severe pain management, and everyday symptoms in simple English & Urdu. Engineered for public health, safety, and 100% offline access.',
    
    // Navigation
    nav: {
      home: 'Home',
      medicines: 'Medicine Checker',
      seasonal: 'Weather & Seasonal Health',
      reminders: 'Daily Reminders',
      reports: 'Report Explainer',
      symptoms: 'Symptom Guide',
      voice: 'AI Voice Assistant',
      safety: 'Safety Centre',
      language: 'اردو',
      install: 'Install App',
      installing: 'Installing...',
      offline: 'Offline Mode',
      online: 'Online',
    },

    // Homepage Hero & Features
    hero: {
      badge: 'Certified Public Health Knowledge • Bilingual (EN / UR) • Offline PWA',
      searchPlaceholder: 'Search medicines, severe bodyache, weather flu (e.g. Paracetamol, Brufen, Dengue)...',
      searchBtn: 'Search Guide',
      quickTopics: 'Quick shortcuts:',
      featureCards: {
        medicines: {
          title: 'Medicine Checker',
          desc: 'Look up common medicines, active ingredients, dosage limits, verified sources, and precautions.',
          cta: 'Check Medicines',
        },
        seasonal: {
          title: 'Weather & Seasonal Health Advisor',
          desc: 'Weather-based guidance for severe bodyache, headache, influenza, dengue prevention, and heat exhaustion.',
          cta: 'Explore Seasonal Health',
        },
        reports: {
          title: 'Sample Report Explainer',
          desc: 'Understand 5 fictional lab reports (CBC, LFT, RFT, Blood Sugar, Vitamin D) with neutral reference range breakdowns.',
          cta: 'Explore Reports',
        },
        symptoms: {
          title: 'Symptom Information Guide',
          desc: 'Learn about common everyday symptoms, gentle home self-care, warning signs, and critical emergency red flags.',
          cta: 'Review Symptoms',
        },
      },
      voiceBanner: {
        title: 'Urdu & English Voice Assistant Active',
        desc: 'Ask about severe bodyaches, headaches, winter flu, dengue fever, or lab reports hands-free.',
        cta: 'Launch Voice Assistant',
      },
      verifiedBy: 'Information structured in accordance with DRAP Pakistan, WHO, NHS UK, and MedlinePlus guidelines.',
    },

    // Seasonal & Weather Advisor Tab
    seasonal: {
      title: 'Weather & Seasonal Viral Diseases Advisor',
      subtitle: 'Clinical reference protocols for severe bodyaches, headaches, and major viral illnesses aligned with weather and climate conditions.',
      selectSeasonPrompt: 'Select Current Weather Condition:',
      severePainHeader: 'Protocols for Severe Bodyache & Headache Relief',
      severePainSub: 'Verified first-line analgesic guidelines, dosage caps, and critical contraindications in viral states.',
      recommendedMedicines: 'Recommended First-Line Reference Medicines',
      strictlyAvoid: 'Strictly Prohibited & Dangerous Medications',
      homeHydration: 'Evidence-Based Home Care & Hydration',
      redFlag: 'Emergency Red-Flag Warning',
      monsoonDengueWarning: 'CRITICAL MONSOON SAFETY: Never take Aspirin, Disprin, or Ibuprofen in suspected Dengue fever. Risk of fatal hemorrhage.',
    },

    // Medicine Checker Tab
    medicines: {
      title: 'Medicine Information Checker',
      subtitle: 'Search our curated reference database of common essential medicines. Verified against DRAP, WHO, and NHS registries.',
      searchPlaceholder: 'Type generic or brand name (e.g. Paracetamol, Panadol, Ibuprofen, Augmentin)...',
      allCategories: 'All Categories',
      clearSearch: 'Clear Search',
      showingResults: 'Showing {count} medicine(s)',
      notFoundTitle: 'Medicine Not Found in Local Database',
      notFoundDesc: 'The searched item is not in our curated offline database of essential medicines. This tool contains approximately 12–15 common medicines for demonstration and basic reference.',
      notFoundTips: [
        'Check your spelling or search by generic ingredient (e.g. "Paracetamol" instead of rare brand names)',
        'Never consume unverified medicines without consulting a licensed pharmacist or physician',
        'Our database does not contain every available medication'
      ],
      activeIngredient: 'Active Ingredient',
      category: 'Category / Class',
      uses: 'Common Uses',
      sideEffects: 'Common Side Effects',
      warnings: 'Important Warnings & Precautions',
      source: 'Verified Source',
      lastReviewed: 'Last Reviewed',
      listenInfo: 'Listen to Info',
      stopAudio: 'Stop Audio',
      disclaimerNote: 'Important: Never self-prescribe or calculate personal dosage. Information is for educational reference only.',
    },

    // Medication Reminders Tab
    reminders: {
      title: 'Daily Medication Reminders & Dose Alerts',
      subtitle: 'Schedule daily alerts for your prescribed medications. All schedules and dose tracking remain 100% available offline in your local storage.',
      addReminder: 'Add Medication Reminder',
      editReminder: 'Edit Reminder',
      deleteReminder: 'Delete Reminder',
      medicineName: 'Medicine Name',
      medicineNamePlaceholder: 'e.g. Paracetamol, Metformin, Augmentin...',
      dosage: 'Dosage & Strength',
      dosagePlaceholder: 'e.g. 1 Tablet (500mg), 2 Drops, 1 Puff...',
      alertTimes: 'Daily Reminder Times',
      addTime: 'Add Another Time',
      removeTime: 'Remove',
      foodRelation: 'Relation to Meals',
      foodOptions: {
        before_meal: 'Before Meal (Empty Stomach)',
        with_meal: 'With Meal (During Food)',
        after_meal: 'After Meal (Post Food)',
        anytime: 'Anytime / No Specific Relation'
      },
      frequency: 'Schedule Frequency',
      frequencyOptions: {
        daily: 'Every Day (Daily)',
        specific_days: 'Specific Days of Week',
        as_needed: 'As Needed (SOS / PRN)'
      },
      notes: 'Doctor Instructions / Notes',
      notesPlaceholder: 'e.g. Take with a full glass of water, do not crush tablet...',
      saveReminder: 'Save Reminder',
      cancel: 'Cancel',
      todaySchedule: 'Today’s Dosing Schedule',
      allReminders: 'All Scheduled Medications',
      markTaken: 'Mark as Taken',
      taken: 'Taken',
      pending: 'Pending',
      nextDose: 'Next Scheduled Dose',
      noRemindersYet: 'No Medication Reminders Scheduled Yet',
      noRemindersDesc: 'Set daily alarms for your prescribed medicines to receive on-time visual alerts and track doses reliably offline.',
      adherenceToday: 'Today’s Dose Adherence',
      dosesCompleted: '{taken} of {total} doses logged today',
      enableNotifications: 'Enable Browser Alerts',
      notificationsEnabled: 'Browser Alerts Active',
      notificationsBlocked: 'Notifications blocked by browser. Audible in-app alerts are active.',
      quickAddFromDatabase: 'Select from verified medicines:',
      alertDueNow: 'Dose Due Now!',
      dueAt: 'Scheduled for',
      statusActive: 'Alerts Active',
      statusPaused: 'Alerts Paused',
    },

    // Medical Report Explainer Tab
    reports: {
      title: 'Medical Report Explainer',
      subtitle: 'Review fictional laboratory sample reports with simplified explanations of medical terms, units, and neutral reference comparisons.',
      demoNoticeTitle: 'Fictional Demonstration Data Notice',
      demoNoticeDesc: 'All test values shown below are fictional sample numbers for educational illustration. Laboratory reference ranges vary based on individual laboratories, testing instruments, patient age, and biological circumstances. Never use this demonstration to diagnose a disease.',
      selectReport: 'Select a Sample Report:',
      patientContext: 'Sample Demo Context',
      clinicalNoteTitle: 'Educational Reference Note',
      testName: 'Test Item',
      result: 'Result',
      refRange: 'Sample Lab Reference',
      status: 'Status',
      statusNormal: 'Within Sample Range',
      statusHigh: 'Higher than Sample Range',
      statusLow: 'Lower than Sample Range',
      explanation: 'Plain English Meaning',
      disclaimer: 'Always discuss actual diagnostic laboratory results with your attending healthcare physician.',
    },

    // Symptom Guide Tab
    symptoms: {
      title: 'Symptom Information Guide',
      subtitle: 'Learn about common health symptoms, possible causes, safe home self-care, and when to consult a medical doctor.',
      emergencyBannerTitle: 'Critical Emergency Warning Signs',
      emergencyBannerDesc: 'If you or someone around you experiences any of the following life-threatening conditions, seek urgent hospital emergency care or dial emergency rescue immediately (Pakistan: 1122 | UK: 999 | US: 911):',
      searchPlaceholder: 'Filter symptoms (e.g. headache, fever, cough, nausea)...',
      allSymptoms: 'All Symptoms',
      description: 'Overview',
      causes: 'Common Possible Causes',
      selfCare: 'General Safe Self-Care',
      warningSigns: 'Warning Signs Requiring Medical Care',
      consultDoctor: 'When to Consult a Healthcare Professional',
      nonDiagnosticNotice: 'MediGuide does not provide clinical diagnoses. Symptoms can have multiple diverse causes. Never delay emergency medical attention.',
    },

    // Voice Assistant Tab
    voice: {
      title: 'MediGuide AI Voice Assistant',
      subtitle: 'Accessible browser-based voice assistant optimized for instant English and Urdu spoken questions, medicine guidance, and seasonal health advice.',
      tapToSpeak: 'Tap to Speak',
      listening: 'Listening... Please speak your question now',
      processing: 'Processing your request...',
      typeInputPlaceholder: 'Type in English or Urdu (e.g. "Medicine for severe bodyache", "سر درد کی دوا", "Dengue treatment")...',
      send: 'Ask',
      spokenResponseToggle: 'Read response aloud automatically',
      stopSpeaking: 'Stop Speaking',
      statusReady: 'Voice engine ready. Tap microphone or type a query.',
      statusNotSupported: 'Speech recognition is not supported in this browser. Please use the text input below.',
      supportedIntentsHeader: 'Frequently Asked Health Inquiries (English & Urdu)',
      samplePrompts: [
        '“شدید جسم درد کے لیے کیا لیں؟”',
        '“سر درد کی محفوظ دوا کونسی ہے؟”',
        '“سردیوں کے فلو کے لیے رہنمائی”',
        '“برسات اور ڈینگی میں کونسی دوا نہ لیں؟”',
        '“Tell me about Paracetamol”',
        '“Explain Ibuprofen precautions”',
        '“Open CBC blood report”',
        '“Switch language to Urdu”'
      ],
      assistantSays: 'MediGuide Assistant:',
      limitationsNotice: 'Voice Assistant operates locally on predefined clinical rules. It cannot diagnose, prescribe medication, or replace a registered doctor.',
    },

    // Safety Centre Tab
    safety: {
      title: 'Healthcare Safety & Trust Centre',
      subtitle: 'Comprehensive medical disclaimers, triage emergency numbers, verified reference sources, and our privacy commitment.',
      disclaimerHeading: 'Primary Medical Disclaimer',
      disclaimerText: 'MediGuide is strictly an educational healthcare information platform. It is NOT a doctor, medical diagnostic system, prescribing tool, or clinical decision support software. No content on this application should be taken as medical advice, diagnosis, or prescription. Always consult a licensed physician, pharmacist, or certified healthcare provider for any health concern, diagnosis, or treatment plan.',
      whenToConsultHeading: 'When to Consult a Registered Physician',
      whenToConsultPoints: [
        'Whenever symptoms persist for more than 48–72 hours without noticeable improvement.',
        'When you are unsure of the appropriate over-the-counter medicine or suffer from chronic health conditions (e.g. diabetes, hypertension, renal issues).',
        'Before taking medicines during pregnancy, breastfeeding, or administering them to infants.',
        'Whenever you receive laboratory test reports: only a doctor who knows your personal medical history can interpret results properly.'
      ],
      emergencyHeading: 'Emergency Helplines & Rapid Action',
      emergencyPoints: [
        'Pakistan Emergency Rescue: Dial 1122 (Ambulance, Fire, Rescue)',
        'Edhi Foundation Ambulance Service: Dial 115',
        'International Emergency: United States: 911 | United Kingdom: 999 | European Union: 112',
        'Go immediately to the nearest hospital accident & emergency (A&E) department for sudden chest pain, breathing collapse, severe hemorrhaging, or stroke symptoms.'
      ],
      medicineSafetyHeading: 'Safe Medicine Use & Counterfeit Prevention',
      medicineSafetyPoints: [
        'Check Packaging: Inspect the packaging for tamper-evident seals, hologram stickers, DRAP registration numbers, and valid expiry dates.',
        'Avoid Counterfeits: Purchase medicines exclusively from licensed pharmacies. Be wary of medicines sold at unusually deep discounts or with misprinted lettering.',
        'Never Share Prescriptions: Medicines prescribed for someone else may be harmful or contraindicated for your specific condition.',
        'Proper Storage: Keep medicines in a cool, dry place away from direct sunlight and strictly out of reach of children.'
      ],
      officialReferencesHeading: 'Trusted Official Medical Reference Sources',
      officialReferences: [
        { name: 'Drug Regulatory Authority of Pakistan (DRAP)', desc: 'Official federal regulatory body ensuring quality, safety, and efficacy of therapeutic goods in Pakistan.', url: 'https://www.dra.gov.pk/' },
        { name: 'World Health Organization (WHO)', desc: 'Global health agency directing international public health, essential medicines list, and clinical guidelines.', url: 'https://www.who.int/' },
        { name: 'NHS UK Health A to Z & Medicines', desc: 'Comprehensive, evidence-based public medical information service provided by the UK National Health Service.', url: 'https://www.nhs.uk/medicines/' },
        { name: 'MedlinePlus (US National Library of Medicine)', desc: 'Authoritative, peer-reviewed consumer health information from the US National Institutes of Health (NIH).', url: 'https://medlineplus.gov/' }
      ],
      privacyHeading: 'Privacy & Basic Cybersecurity Architecture',
      privacyPoints: [
        'Zero Personal Data Collection: MediGuide does not ask for, collect, or store your name, email, phone number, medical records, or IP logs.',
        'Zero External AI Data Transmissions: All searches, symptom matches, and report explanations are performed entirely in your browser using local predefined files.',
        'Client-Side Only: No server database exists. Harmless UI preferences (such as selected language) are saved only on your device locally.',
        'Safe DOM Handling: All dynamic inputs are sanitized and rendered safely to prevent injection or script execution.'
      ]
    },

    // Footer
    footer: {
      copyright: 'MediGuide Enterprise Healthcare Information Assistant. Educational reference only.',
      disclaimerBrief: 'Not intended to substitute for professional medical advice, diagnosis, or treatment. In an emergency, dial 1122 or local emergency services.',
      quickLinks: 'Navigation',
      trustBadges: 'Evidence-Based Framework',
    }
  },

  ur: {
    appName: 'میڈی گائیڈ انٹرپرائز ہیلتھ',
    tagline: 'اپنی صحت کی معلومات کو اعتماد کے ساتھ سمجھیں',
    subTagline: 'عام ادویات، موسمی وائرل بیماریوں، شدید جسمانی درد، سر درد، اور لیب رپورٹس کے بارے میں مستند رہنمائی۔ اردو وائس اسسٹنٹ اور بغیر انٹرنیٹ کے فعال۔',
    
    // Navigation
    nav: {
      home: 'ہوم',
      medicines: 'ادویات کی جانچ',
      seasonal: 'موسمی صحت و وائرل امراض',
      reminders: 'دوائیوں کے الرٹ',
      reports: 'رپورٹس کی وضاحت',
      symptoms: 'علامات کی رہنمائی',
      voice: 'اردو وائس اسسٹنٹ',
      safety: 'حفاظتی مرکز',
      language: 'English',
      install: 'ایپ انسٹال کریں',
      installing: 'انسٹال ہو رہی ہے...',
      offline: 'آف لائن موڈ',
      online: 'آن لائن',
    },

    // Homepage Hero & Features
    hero: {
      badge: 'مصدقہ طبی معلومات • اردو اور انگلش دو لسانی • مکمل آف لائن فعال',
      searchPlaceholder: 'دوا، شدید جسم درد، سر درد یا موسمی وائرل بیماری تلاش کریں (مثلاً پیراسیٹامول، بروفین، ڈینگی)...',
      searchBtn: 'تلاش کریں',
      quickTopics: 'فوری موضوعات:',
      featureCards: {
        medicines: {
          title: 'ادویات کی جانچ (Medicine Checker)',
          desc: 'عام ضروری ادویات، ان کے فعال اجزاء (فارمولہ)، استعمال کے فوائد، احتیاطی تدابیر اور نقصانات جانیے۔',
          cta: 'ادویات دیکھیں',
        },
        seasonal: {
          title: 'موسمی صحت و وائرل امراض گائیڈ',
          desc: 'موسم کے مطابق شدید جسم درد، سر درد، سردیوں کے فلو، برسات میں ڈینگی اور گرمیوں کے لو سے بچاؤ کی دوائیں اور احتیاط۔',
          cta: 'موسمی امراض دیکھیں',
        },
        reports: {
          title: 'میڈیکل رپورٹس کی وضاحت',
          desc: 'پانچ فرضی لیبارٹری رپورٹس (خون، جگر، گردے، شوگر اور وٹامن ڈی) کی سادہ اردو میں وضاحت۔',
          cta: 'رپورٹس سمجھیں',
        },
        symptoms: {
          title: 'علامات سے آگاہی گائیڈ',
          desc: 'عام جسمانی علامات، ان کی وجوہات، گھریلو دیکھ بھال اور خطرے کی ہنگامی علامات کی رہنمائی۔',
          cta: 'علامات دیکھیں',
        },
      },
      voiceBanner: {
        title: 'اردو AI وائس اسسٹنٹ فعال ہے',
        desc: 'شدید جسم درد، سر درد، سردی کے فلو، ڈینگی یا ادویات کے بارے میں بول کر اردو میں رہنمائی حاصل کریں۔',
        cta: 'وائس اسسٹنٹ کھولیں',
      },
      verifiedBy: 'یہ معلومات ڈریپ پاکستان (DRAP)، ڈبلیو ایچ او اور این ایچ ایس کے مصدقہ رہنما اصولوں کے مطابق ترتیب دی گئی ہیں۔',
    },

    // Seasonal & Weather Advisor Tab
    seasonal: {
      title: 'موسمی حالات اور وائرل بیماریوں کا ہیلتھ ایڈوائزر',
      subtitle: 'موسم اور آب و ہوا کے مطابق شدید جسمانی درد، سر درد، اور عام وائرل بیماریوں کے لیے محفوظ ادویات اور احتیاط۔',
      selectSeasonPrompt: 'موجودہ موسم کا انتخاب کریں:',
      severePainHeader: 'شدید جسم درد اور شدید سر درد سے نجات کے طبی اصول',
      severePainSub: 'مصدقہ بنیادی ادویات، 24 گھنٹے میں زیادہ سے زیادہ حد، اور وائرل بیماریوں میں خطرناک ممنوعہ ادویات۔',
      recommendedMedicines: 'تجویز کردہ محفوظ ادویات (فرسٹ لائن)',
      strictlyAvoid: 'سخت ممنوع اور خطرناک ادویات',
      homeHydration: 'محفوظ گھریلو دیکھ بھال اور پانی کا توازن',
      redFlag: 'ہنگامی خطرے کی علامات (فوری ایمرجنسی)',
      monsoonDengueWarning: 'برسات اور ڈینگی کی اہم ترین تنبیہ: ڈینگی کے بخار میں اسپرین، ڈسپرین یا بروفین ہرگز نہ لیں، یہ جان لیوا اندرونی خون کا سبب بنتی ہیں۔ صرف پیراسیٹامول لیں۔',
    },

    // Medicine Checker Tab
    medicines: {
      title: 'ادویات کی معلومات کی جانچ',
      subtitle: 'ضروری ادویات کا مقامی ڈیٹا بیس تلاش کریں۔ ڈریپ اور این ایچ ایس کی تصدیق شدہ رہنمائی۔',
      searchPlaceholder: 'دوا کا جینرک یا برانڈ نام لکھیں (مثلاً Panadol, Brufen, Amoxicillin)...',
      allCategories: 'تمام اقسام',
      clearSearch: 'تلاش ختم کریں',
      showingResults: '{count} دوا کے نتائج موجود ہیں',
      notFoundTitle: 'مطلوبہ دوا مقامی ریکارڈ میں موجود نہیں ہے',
      notFoundDesc: 'تلاش کی گئی دوا ہمارے محدود بنیادی آف لائن ڈیٹا بیس میں شامل نہیں ہے۔ یہ گائیڈ نمائش اور بنیادی معلومات کے لیے تقریباً 12 سے 15 عام ادویات پر مشتمل ہے۔',
      notFoundTips: [
        'ہجوں (Spelling) کی جانچ کریں یا اصل فارمولہ نام لکھ کر تلاش کریں',
        'مستند ڈاکٹر یا فارماسسٹ کے مشورے کے بغیر دوا ہرگز استعمال نہ کریں',
        'ہمارے پاس ہر قسم کی دوا کا ڈیٹا موجود نہیں ہے'
      ],
      activeIngredient: 'فعال جزو (فارمولہ)',
      category: 'دوا کی قسم / کلاس',
      uses: 'عام استعمالات',
      sideEffects: 'ممکنہ مضر اثرات',
      warnings: 'اہم احتیاطی تدابیر',
      source: 'مصدقہ ذریعہ',
      lastReviewed: 'آخری جائزہ',
      listenInfo: 'آواز میں سنیں',
      stopAudio: 'آواز روکیں',
      disclaimerNote: 'اہم تنبیہ: خود سے دوا تجویز نہ کریں اور نہ ہی خوراک کا تعین کریں۔ یہ معلومات صرف آگاہی کے لیے ہیں۔',
    },

    // Medication Reminders Tab
    reminders: {
      title: 'دوائیوں کے روزانہ الرٹس اور اوقات کار',
      subtitle: 'اپنی روزانہ کی تجویز کردہ ادویات کے الرٹس مقرر کریں۔ یہ شیڈول اور ریکارڈ مکمل طور پر آف لائن آپ کے موبائل پر محفوظ رہتا ہے۔',
      addReminder: 'نیا الرٹ شامل کریں',
      editReminder: 'الرٹ تبدیل کریں',
      deleteReminder: 'الرٹ ختم کریں',
      medicineName: 'دوا کا نام',
      medicineNamePlaceholder: 'مثلاً پیراسیٹامول، میٹفارمین، آگمنٹن...',
      dosage: 'خوراک اور مقدار',
      dosagePlaceholder: 'مثلاً 1 گولی (500 ملی گرام)، 2 قطرے، 1 پف...',
      alertTimes: 'الرٹ کے روزانہ اوقات',
      addTime: 'مزید وقت شامل کریں',
      removeTime: 'ختم کریں',
      foodRelation: 'کھانے کے ساتھ تعلق',
      foodOptions: {
        before_meal: 'کھانے سے پہلے (نہار منہ)',
        with_meal: 'کھانے کے دوران',
        after_meal: 'کھانے کے بعد',
        anytime: 'کسی بھی وقت / کھانے سے تعلق نہیں'
      },
      frequency: 'الرٹ کا شیڈول',
      frequencyOptions: {
        daily: 'ہر روز (روزانہ)',
        specific_days: 'ہفتے کے مخصوص دن',
        as_needed: 'ضرورت پڑنے پر (SOS)'
      },
      notes: 'ڈاکٹر کی ہدایات / نوٹ',
      notesPlaceholder: 'مثلاً پورا گلاس پانی پئیں، گولی چبائیں نہیں...',
      saveReminder: 'الرٹ محفوظ کریں',
      cancel: 'منسوخ',
      todaySchedule: 'آج کی دوائیوں کا شیڈول',
      allReminders: 'تمام مقرر کردہ الرٹس',
      markTaken: 'دوا لے لی ہے',
      taken: 'لی جا چکی ہے',
      pending: 'باقی ہے',
      nextDose: 'اگلی خوراک کا وقت',
      noRemindersYet: 'فی الحال کوئی الرٹ مقرر نہیں ہے',
      noRemindersDesc: 'اپنی روزانہ کی ادویات شامل کریں تاکہ بروقت الرٹ موصول ہو سکے اور آف لائن بھی محفوظ رہے۔',
      adherenceToday: 'آج دوا لینے کی شرح',
      dosesCompleted: 'آج {total} میں سے {taken} خوراکیں لی جا چکی ہیں',
      enableNotifications: 'براؤزر الرٹس فعال کریں',
      notificationsEnabled: 'براؤزر الرٹس فعال ہیں',
      notificationsBlocked: 'براؤزر نے نوٹیفکیشن بلاک کر رکھی ہے، ایپ الرٹ جاری رہے گا۔',
      quickAddFromDatabase: 'مصدقہ ادویات میں سے منتخب کریں:',
      alertDueNow: 'دوا لینے کا وقت ہو گیا ہے!',
      dueAt: 'مقررہ وقت',
      statusActive: 'الرٹ فعال ہے',
      statusPaused: 'الرٹ رکا ہوا ہے',
    },

    // Medical Report Explainer Tab
    reports: {
      title: 'میڈیکل رپورٹ کی آسان وضاحت',
      subtitle: 'فرضی لیب رپورٹس، طبی اصطلاحات، نتائج اور معمول کے پیمانوں (Reference Ranges) کا سادہ اردو میں تجزیہ۔',
      demoNoticeTitle: 'فرضی نمائشی ڈیٹا کی وضاحت',
      demoNoticeDesc: 'نیچے دی گئی رپورٹس صرف فرضی نمونے ہیں تاکہ آپ طبی اصطلاحات سمجھ سکیں۔ ہر لیب کی نارمل حدود مختلف ہو سکتی ہیں۔ ان رپورٹس کی بنیاد پر کوئی بیماری خود فرض نہ کریں۔',
      selectReport: 'کوئی نمونہ رپورٹ منتخب کریں:',
      patientContext: 'فرضی مریض کی تفصیل',
      clinicalNoteTitle: 'طبی آگاہی کا نوٹ',
      testName: 'ٹیسٹ کا نام',
      result: 'نتیجہ',
      refRange: 'لیب کا معمول کا پیمانہ',
      status: 'حالت',
      statusNormal: 'معمول کے مطابق',
      statusHigh: 'معمول سے زیادہ',
      statusLow: 'معمول سے کم',
      explanation: 'سادہ مفہوم',
      disclaimer: 'اپنی اصل لیب رپورٹس ہمیشہ مستند ڈاکٹر کو دکھا کر حتمی مشورہ لیں۔',
    },

    // Symptom Guide Tab
    symptoms: {
      title: 'علامات سے آگاہی کی گائیڈ',
      subtitle: 'عام جسمانی علامات، ان کی وجوہات، محفوظ گھریلو احتیاط اور ڈاکٹر سے رجوع کرنے کا وقت معلوم کریں۔',
      emergencyBannerTitle: 'انتہائی ہنگامی اور جان لیوا علامات',
      emergencyBannerDesc: 'اگر آپ یا آپ کے اردگرد کسی فرد میں درج ذیل میں سے کوئی بھی علامت ظاہر ہو تو فوری طور پر 1122 ملائیں یا ہسپتال کے ایمرجنسی وارڈ پہنچیں:',
      searchPlaceholder: 'علامت تلاش کریں (مثلاً سر درد، بخار، کھانسی، متلی)...',
      allSymptoms: 'تمام علامات',
      description: 'علامت کی تفصیل',
      causes: 'عام ممکنہ وجوہات',
      selfCare: 'محفوظ گھریلو دیکھ بھال',
      warningSigns: 'خطرے کی علامات (ڈاکٹر سے رجوع ضروری)',
      consultDoctor: 'ڈاکٹر کو کب دکھانا چاہیے؟',
      nonDiagnosticNotice: 'میڈی گائیڈ کسی بیماری کی تشخیص نہیں کرتا۔ ایک علامت کی کئی مختلف وجوہات ہو سکتی ہیں۔ ایمرجنسی میں تاخیر نہ کریں۔',
    },

    // Voice Assistant Tab
    voice: {
      title: 'میڈی گائیڈ اردو AI وائس اسسٹنٹ',
      subtitle: 'آسان اور تیز رفتار وائس اسسٹنٹ جو شدید جسم درد، سر درد، موسمی فلو، ڈینگی اور عام ادویات کی فوری رہنمائی آواز میں فراہم کرتا ہے۔',
      tapToSpeak: 'بولنے کے لیے بٹن دبائیں',
      listening: 'سن رہا ہوں... براہ کرم اپنا سوال بولیں',
      processing: 'جواب تیار کیا جا رہا ہے...',
      typeInputPlaceholder: 'اردو یا انگلش میں سوال لکھیں (مثلاً "شدید جسم میں درد کے لیے دوا"، "سر درد"، "ڈینگی کا علاج")...',
      send: 'پوچھیں',
      spokenResponseToggle: 'جواب آواز میں بھی سنیں',
      stopSpeaking: 'آواز بند کریں',
      statusReady: 'اردو وائس انجن تیار ہے۔ مائیکروفون دبائیں یا سوال لکھیں۔',
      statusNotSupported: 'آپ کے براؤزر میں آواز کی شناخت کی سہولت موجود نہیں ہے۔ براہ کرم نیچے لکھ کر سوال پوچھیں۔',
      supportedIntentsHeader: 'اکثر پوچھے جانے والے سوالات (اردو آواز کے لیے)',
      samplePrompts: [
        '”شدید جسم درد کے لیے کیا لیں؟“',
        '”سر درد کی محفوظ دوا کونسی ہے؟“',
        '”سردیوں کے فلو کے لیے رہنمائی“',
        '”برسات اور ڈینگی میں کونسی دوا نہ لیں؟“',
        '”گرمی میں لو اور سر درد کا علاج“',
        '”پیراسیٹامول کے بارے میں بتائیں“',
        '”سی بی سی خون کی رپورٹ سمجھائیں“',
        '”انگلش میں تبدیل کریں“'
      ],
      assistantSays: 'میڈی گائیڈ اسسٹنٹ کا جواب:',
      limitationsNotice: 'یہ وائس اسسٹنٹ مصدقہ طبی اصولوں پر کام کرتا ہے۔ یہ ڈاکٹر کا متبادل نہیں ہے اور نہ ہی نسخہ تجویز کرتا ہے۔',
    },

    // Safety Centre Tab
    safety: {
      title: 'طبی حفاظت اور اعتماد کا مرکز',
      subtitle: 'اہم طبی ڈس کلیمر، ایمرجنسی ہیلپ لائنز، مستند حوالہ جات اور آپ کی پرائیویسی کا مکمل تحفظ۔',
      disclaimerHeading: 'بنیادی طبی ڈس کلیمر (قانونی وضاحت)',
      disclaimerText: 'میڈی گائیڈ صرف اور صرف تعلیمی اور معلوماتی رہنمائی کے لیے تیار کی گئی ایپ ہے۔ یہ کوئی ڈاکٹر، کلینک یا نسخہ تجویز کرنے والا نظام نہیں ہے۔ اس پر موجود کسی بھی مواد کو ڈاکٹر کا متبادل نہ سمجھا جائے۔ کسی بھی بیماری، علاج یا دوا کے لیے ہمیشہ اپنے ڈاکٹر یا فارماسسٹ سے رجوع کریں۔',
      whenToConsultHeading: 'ڈاکٹر سے کب رجوع کرنا چاہیے؟',
      whenToConsultPoints: [
        'جب کوئی علامت 48 سے 72 گھنٹے سے زیادہ برقرار رہے اور آرام نہ آئے۔',
        'اگر آپ کو بلڈ پریشر، شوگر، یا گردوں کا پرانا مرض لاحق ہو۔',
        'حمل کے دوران، دودھ پلانے کے ایام میں یا چھوٹے بچوں کو کوئی بھی دوا دینے سے پہلے۔',
        'جب بھی لیب کی رپورٹس موصول ہوں، صرف ڈاکٹر ہی آپ کی صحت کا مکمل جائزہ لے کر صحیح تشریح کر سکتا ہے۔'
      ],
      emergencyHeading: 'ہنگامی ہیلپ لائنز اور فوری اقدامات',
      emergencyPoints: [
        'پاکستان ریسکیو ایمرجنسی: 1122 ڈائل کریں (ایمبولینس اور فوری ریسکیو)',
        'ایدھی فاؤنڈیشن ایمبولینس سروس: 115 ڈائل کریں',
        'بین الاقوامی ایمرجنسی: برطانیہ: 999 | امریکہ: 911 | یورپی یونین: 112',
        'سینے میں شدید درد، سانس گھٹنے، بے ہوشی یا فالج کی علامات میں فوراً قریبی ایمرجنسی وارڈ پہنچیں۔'
      ],
      medicineSafetyHeading: 'محفوظ ادویات کا استعمال اور جعلی ادویات سے بچاؤ',
      medicineSafetyPoints: [
        'پیکنگ چیک کریں: ڈبے پر سیل، ہولوگرام اسٹیکر، ڈریپ (DRAP) رجسٹریشن نمبر اور ایکسپائری تاریخ ضرور دیکھیں۔',
        'مستند میڈیکل اسٹور: ادویات ہمیشہ لائسنس یافتہ فارمیسیوں سے خریدیں۔ غیر معمولی رعایت یا مشکوک چھپائی سے ہوشیار رہیں۔',
        'کسی دوسرے کی دوا استعمال نہ کریں: جو دوا کسی اور کے لیے مفید ہو وہ آپ کی بیماری یا الرجی میں نقصان دہ ہو سکتی ہے۔',
        'صحیح جگہ رکھیں: ادویات کو دھوپ اور نمی سے دور ٹھنڈی جگہ پر اور بچوں کی پہنچ سے دور رکھیں۔'
      ],
      officialReferencesHeading: 'مستند سرکاری طبی حوالہ جات',
      officialReferences: [
        { name: 'ڈریپ - ڈرگ ریگولیٹری اتھارٹی آف پاکستان (DRAP)', desc: 'پاکستان میں ادویات کی کوالٹی، حفاظت اور رجسٹریشن کا مجاز وفاقی ادارہ۔', url: 'https://www.dra.gov.pk/' },
        { name: 'عالمی ادارہ صحت (WHO)', desc: 'بین الاقوامی صحت کے معیار، ضروری ادویات کی فہرست اور عالمی گائیڈ لائنز جاری کرنے والا ادارہ۔', url: 'https://www.who.int/' },
        { name: 'این ایچ ایس یو کے (NHS UK Medicines)', desc: 'برطانیہ کی قومی ہیلتھ سروس کا مصدقہ اور شواہد پر مبنی معلوماتی پورٹل۔', url: 'https://www.nhs.uk/medicines/' },
        { name: 'میڈ لائن پلس (MedlinePlus)', desc: 'امریکی نیشنل لائبریری آف میڈیسن کا مستند اور باوثوق ہیلتھ گائیڈ۔', url: 'https://medlineplus.gov/' }
      ],
      privacyHeading: 'پرائیویسی اور سائبر سیکیورٹی کا تحفظ',
      privacyPoints: [
        'ذاتی ڈیٹا کا عدم اجتماع: ہم آپ کا نام، فون نمبر، ای میل، پتہ یا کوئی بھی ذاتی ریکارڈ جمع نہیں کرتے۔',
        'انٹرنیٹ پر ڈیٹا نہ جانا: تمام تلاش اور معلومات آپ کے اپنے موبائل یا کمپیوٹر کے براؤزر میں مقامی طور پر پروسیس ہوتی ہیں۔',
        'کوئی اکاؤنٹ درکار نہیں: ایپ بغیر لاگ ان یا سائن اپ کے پوری سہولت کے ساتھ استعمال ہو سکتی ہے۔',
        'محفوظ براؤزنگ: یہ ایپ مکمل طور پر محفوظ کلائنٹ کوڈ پر مبنی ہے جس میں کوئی ٹریکنگ یا جاسوسی کوڈ شامل نہیں۔'
      ]
    },

    // Footer
    footer: {
      copyright: 'میڈی گائیڈ انٹرپرائز ہیلتھ اسسٹنٹ۔ صرف تعلیمی و معلوماتی رہنمائی کے لیے۔',
      disclaimerBrief: 'یہ معلومات کسی ڈاکٹر کے مشورے کا متبادل نہیں ہیں۔ ایمرجنسی کی صورت میں 1122 ڈائل کریں۔',
      quickLinks: 'فوری روابط',
      trustBadges: 'مستند طبی اصول',
    }
  }
};
