# MediGuide Enterprise — Healthcare Information Platform

> **“Understand Your Health Information with Confidence.”**

MediGuide is an enterprise-grade, accessible, bilingual (English & Urdu) healthcare information web application. It empowers individuals, enterprise workplaces, and families to look up medicines, review fictional sample laboratory reports with simplified neutral explanations, understand everyday symptoms with safe home-care advice, assess seasonal viral illnesses according to current weather conditions, manage severe bodyache and headaches with evidence-based protocols, and interact seamlessly via a browser-based **Urdu AI Voice Assistant** and offline-ready Progressive Web App (PWA).

---

## 🌟 Key Capabilities & Enterprise Suites

1. **Weather & Seasonal Viral Diseases Advisor (New)**
   - **Winter / Cold Weather (< 15°C)**: Seasonal Influenza (Flu), chest congestion, and viral bronchitis protocols. Severe bodyache relief guidelines, steam inhalation, and hydration plans.
   - **Monsoon / Rainy Season (25°C–35°C, High Humidity)**: Dengue Viral Fever ("Breakbone Fever") prevention and life-saving medication directives. **Critical directive: NEVER take Aspirin, Disprin, or Ibuprofen in Dengue due to internal hemorrhage danger; Paracetamol is the ONLY safe analgesic**.
   - **Summer / Heatwave (> 38°C)**: Heat exhaustion, sunstroke, summer viral gastroenteritis, and dehydration. Electrolyte replenishment with WHO-formula ORS.
   - **Spring / Pollen Season (18°C–26°C)**: Allergic rhinitis, pollen surge, and sinus pressure headache management with antihistamines and saline washes.

2. **Severe Bodyache & Headache Clinical Protocols**
   - Clear first-line analgesic recommendations (Paracetamol up to 4,000 mg in 24 hours vs. Ibuprofen taken strictly with meals).
   - Guidance on when NSAIDs must be avoided (e.g., active dehydration, gastric ulcers, unverified platelet count in monsoon season).
   - Urgent doctor and red-flag emergency thresholds (thunderclap headache, stiff neck, petechial rash, 1122 dispatch).

3. **Daily Medication Reminders & Dose Alerts (Offline-Ready)**
   - Set daily scheduled alerts for prescribed medicines with customizable time slots (morning, afternoon, night).
   - Relationship to meals (*Before Meal / Empty Stomach*, *With Meal*, *After Meal*, *Anytime*), dosage strength, and notes.
   - **100% Offline Persistence**: All schedules and dose logs stored safely in browser `localStorage`.
   - **Real-Time Dose Alarms & Audible Chimes**: Background checker checks due doses every 20 seconds, rings an in-browser audio chime via Web Audio API, and sends browser notifications when permitted.
   - **Interactive Today's Dosing Checklist & Adherence Rate**: Mark doses as taken/pending, tracking adherence percentage throughout the day.
   - Direct integration with Voice Assistant and Medicine Checker cards.

4. **Urdu AI Voice Assistant & Spoken Urdu Voice Guide**
   - **Dedicated Urdu Voice Guide**: Built-in library of spoken audio modules explaining severe bodyache protocols, Dengue & monsoon fatal medicine warnings, winter flu care, Paracetamol safe dosage ceiling, medication reminder setup, and Rescue 1122 red flags.
   - **Zero Hallucination Intent Engine**: Token-aware Urdu semantic matching that accurately recognizes queries in Urdu script and Roman Urdu (e.g. *“شدید جسم درد کے لیے کیا لیں؟”*, *“سر درد کی محفوظ دوا”*, *“برسات اور ڈینگی میں کونسی دوا نہ لیں؟”*, *“سردیوں کا فلو”*, *“پیراسیٹامول کتنی لینی چاہیے؟”*).
   - **Authentic Urdu Speech Synthesis**: Speaks native Urdu script directly through the browser speech engine (`ur-PK`) without broken romanized character spelling or robotic hallucinations.
   - **Bilingual In-Assistant Switcher**: One-tap toggles between authentic Urdu speech and English, with automatic Urdu detection when users speak or type in Urdu.
   - **Active Audio Waveform Visualizer & Speed Controls**: Real-time auditory feedback, speed adjuster (Normal / Slow), and replay audio button.

4. **Medicine Information Checker**
   - Curated reference dataset of 12+ essential medicines (Paracetamol, Ibuprofen, Amoxicillin, Cetirizine, Omeprazole, Metformin, Azithromycin, Salbutamol, Losartan, Atorvastatin, ORS, Ciprofloxacin).
   - Case-insensitive search supporting generic formula and popular brand aliases (*Panadol, Calpol, Brufen, Augmentin, Zyrtec, Glucophage, Ventolin*).
   - Generic name, category, active ingredient, common uses, side effects, precautions, official verified source (DRAP, WHO, NHS UK, MedlinePlus), and review date.
   - Browser text-to-speech audio narration with play/stop toggle.

5. **Medical Report Explainer**
   - 5 sample fictional laboratory reports: Complete Blood Count (CBC), Liver Function Test (LFT), Renal Function Test (RFT), Blood Glucose & HbA1c, Lipid Profile & Vitamin D.
   - Interactive table with test item names, sample results, units, and laboratory-specific reference ranges.
   - Neutral status badges (*Within Sample Range*, *Higher than Sample Range*, *Lower than Sample Range*).
   - Plain-language explanations for medical terms and educational clinical notes.

6. **Symptom Information Guide**
   - Comprehensive guides for common symptoms: Headache, Fever, Cough, Sore Throat, Nausea & Vomiting, Stomach Discomfort, Runny Nose, and Fatigue.
   - High-visibility Emergency Red-Flag banner with emergency hotlines (Pakistan Rescue 1122, Edhi 115, UK 999, US 911).

7. **Bilingual Architecture & RTL Typography**
   - Instant language switch with complete translations for all navigation, headers, datasets, and voice assistant responses.
   - Bidirectional layout flipping (`dir="rtl"` for Urdu and `dir="ltr"` for English) with custom Urdu font styling.

8. **Offline Mode & Progressive Web App (PWA)**
   - Standalone Progressive Web App with `manifest.json` and custom Service Worker (`sw.js`).
   - Cache-first strategy for essential assets: cached HTML, styles, scripts, and local datasets remain accessible without an active internet connection.
   - Real-time Online / Offline status badge and floating alert indicator.

9. **Healthcare Safety Centre & Corporate Governance**
   - Medical disclaimers, triage guidelines, and counterfeit medicine awareness (verifying DRAP registration, tamper seals, and packaging).
   - Zero personal data collection: no accounts, no trackers, no external AI APIs or cloud database dependencies.

---

## 🚀 How to Run and Preview (Vite & Replit)

### Running on Replit / Locally

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   The application will start on port `3000` (or the host provided by Replit/Vite).

3. **Production Build:**
   ```bash
   npm run build
   ```

4. **Preview Production Build:**
   ```bash
   npm run preview
   ```

---

## 🧪 Testing & Quality Assurance Checklist

| # | Test Case | Status | Notes |
|---|-----------|:------:|-------|
| 1 | Homepage loads successfully | ✅ Passed | Corporate metrics ribbon, hero, 4 suite cards, emergency banner |
| 2 | All navigation links work | ✅ Passed | Home, Medicines, Seasonal, Reports, Symptoms, Voice, Safety Centre |
| 3 | Weather conditions switch | ✅ Passed | Winter, Monsoon, Summer, and Spring viral profiles and cautions |
| 4 | Severe bodyache & headache protocols | ✅ Passed | First-line dosages, safety caps, and contraindications |
| 5 | Dengue fever warning displayed | ✅ Passed | High-priority alert: Aspirin/Ibuprofen strictly avoided, Paracetamol only |
| 6 | Urdu AI Voice Assistant runs easily | ✅ Passed | One-tap launch, listening visualizer, Urdu intents matching |
| 7 | Unknown inquiries handled smoothly | ✅ Passed | Friendly fallback with quick navigation buttons |
| 8 | Medicine search returns correct records | ✅ Passed | Case-insensitive search by generic & brand aliases (e.g. Panadol, Brufen) |
| 9 | Unknown medicine displays helpful message | ✅ Passed | Clear message explaining database limit and safe consulting tips |
| 10 | Sample reports open correctly | ✅ Passed | 5 fictional reports (CBC, LFT, RFT, Glucose, Vitamin D) switch smoothly |
| 11 | English and Urdu language switches | ✅ Passed | Instant toggle, text direction flips LTR/RTL, Urdu typography |
| 12 | Voice controls check browser support | ✅ Passed | Web Speech API detection, typed fallback always available |
| 13 | Spoken responses can be stopped | ✅ Passed | Audio readouts have functional stop/cancel controls |
| 14 | Offline mode works via Service Worker | ✅ Passed | `sw.js` caches assets, online/offline status banner updates |
| 15 | No paid APIs or external AI required | ✅ Passed | 100% self-contained client-side code |
| 16 | Mobile and desktop layouts usable | ✅ Passed | Responsive navigation drawer, flexible grid layout |

---

## 🛡️ Privacy & Medical Disclaimer

**IMPORTANT:** MediGuide is an informational and educational tool only. It does not provide medical diagnoses, treatment recommendations, or personalized drug dosages. Always consult a licensed medical doctor or pharmacist for any health concerns or before taking any medication. In any life-threatening emergency, dial **1122** (Pakistan) or your local emergency rescue service immediately.
