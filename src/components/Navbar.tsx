import React, { useState } from 'react';
import { 
  HeartPulse, 
  Pill, 
  FileText, 
  Activity, 
  Mic, 
  ShieldCheck, 
  Languages, 
  Download, 
  Wifi, 
  WifiOff, 
  Menu, 
  X,
  Home,
  CloudRain,
  Sparkles,
  Bell
} from 'lucide-react';
import { ActiveTab, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  language,
  setLanguage
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showIOSModal, setShowIOSModal] = useState(false);
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const isOnline = useOnlineStatus();
  const t = TRANSLATIONS[language];

  const toggleLanguage = () => {
    const nextLang: Language = language === 'en' ? 'ur' : 'en';
    setLanguage(nextLang);
    localStorage.setItem('mediguide_language', nextLang);
  };

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: t.nav.home, icon: <Home className="w-4 h-4" /> },
    { id: 'medicines', label: t.nav.medicines, icon: <Pill className="w-4 h-4" /> },
    { id: 'seasonal', label: t.nav.seasonal, icon: <CloudRain className="w-4 h-4" /> },
    { id: 'reminders', label: t.nav.reminders, icon: <Bell className="w-4 h-4" /> },
    { id: 'reports', label: t.nav.reports, icon: <FileText className="w-4 h-4" /> },
    { id: 'symptoms', label: t.nav.symptoms, icon: <Activity className="w-4 h-4" /> },
    { id: 'voice', label: t.nav.voice, icon: <Mic className="w-4 h-4" /> },
    { id: 'safety', label: t.nav.safety, icon: <ShieldCheck className="w-4 h-4" /> },
  ];

  const handleNavClick = (tabId: ActiveTab) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUrduVoiceLaunch = () => {
    if (language !== 'ur') {
      setLanguage('ur');
      localStorage.setItem('mediguide_language', 'ur');
    }
    setActiveTab('voice');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-teal-100 shadow-xs">
        {/* Top Status & Accessibility Bar */}
        <div className="bg-slate-900 text-teal-100 text-xs px-4 py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
            <span className="font-semibold tracking-wide text-[11px] sm:text-xs">
              {language === 'en' ? 'Enterprise Healthcare Information Platform' : 'مصدقہ انٹرپرائز ہیلتھ انفارمیشن پلیٹ فارم'}
            </span>
            <span className="hidden sm:inline-block text-[10px] bg-teal-950 text-teal-300 border border-teal-800 px-1.5 py-0.2 rounded font-mono">
              DRAP • WHO • NHS
            </span>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Urdu AI Voice Trigger Button */}
            <button
              onClick={handleUrduVoiceLaunch}
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-600 hover:bg-teal-500 text-white text-[11px] font-bold shadow-xs transition cursor-pointer"
              title="Launch Urdu AI Voice Assistant"
            >
              <Mic className="w-3 h-3 text-white animate-pulse" />
              <span>{language === 'en' ? 'Urdu Voice AI' : 'اردو وائس اسسٹنٹ'}</span>
            </button>

            {/* Online/Offline Status Indicator */}
            <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold transition ${
              isOnline 
                ? 'bg-slate-800 text-teal-300 border border-slate-700' 
                : 'bg-amber-500 text-white animate-pulse'
            }`}>
              {isOnline ? (
                <>
                  <Wifi className="w-3 h-3 text-teal-400" />
                  <span className="hidden sm:inline">{t.nav.online}</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-3 h-3" />
                  <span>{t.nav.offline}</span>
                </>
              )}
            </div>

            {/* Language Toggle in Top Bar */}
            <button
              onClick={toggleLanguage}
              aria-label="Switch Language"
              className="flex items-center gap-1 text-slate-200 hover:text-white px-2 py-0.5 rounded-md hover:bg-slate-800 transition cursor-pointer text-[12px] font-bold border border-slate-700"
            >
              <Languages className="w-3.5 h-3.5 text-teal-400" />
              <span>{t.nav.language}</span>
            </button>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Brand Logo & Corporate Tagline */}
            <button 
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 text-left group cursor-pointer focus:outline-hidden"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-cyan-700 flex items-center justify-center text-white shadow-md shadow-teal-600/20 group-hover:scale-105 transition">
                <HeartPulse className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-black tracking-tight text-slate-900 group-hover:text-teal-700 transition">
                    {t.appName}
                  </span>
                  <span className="hidden xl:inline-block text-[10px] font-bold uppercase tracking-wider bg-teal-50 text-teal-800 border border-teal-200 px-1.5 py-0.5 rounded-md">
                    Verified Portal
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 hidden md:block line-clamp-1">
                  {t.tagline}
                </p>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${
                      isActive
                        ? 'bg-teal-700 text-white shadow-xs font-bold'
                        : 'text-slate-600 hover:text-teal-800 hover:bg-teal-50/70'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Right Action Tools */}
            <div className="flex items-center gap-2">
              {/* Language Switch Button */}
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border border-teal-200 bg-teal-50/70 hover:bg-teal-100 text-teal-800 text-xs font-bold transition cursor-pointer"
                title="Switch Language (English / اردو)"
              >
                <Languages className="w-3.5 h-3.5" />
                <span>{t.nav.language}</span>
              </button>

              {/* Install PWA Button */}
              {!isInstalled && isInstallable && (
                <button
                  onClick={install}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold shadow-xs transition cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{t.nav.install}</span>
                </button>
              )}

              {/* iOS Safari Install Guide Button */}
              {!isInstalled && isIOS && (
                <button
                  onClick={() => setShowIOSModal(true)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-medium transition cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">iOS Install</span>
                </button>
              )}

              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-fadeIn">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-3 w-full px-3.5 py-2.5 rounded-xl text-sm font-semibold transition text-left cursor-pointer ${
                    isActive
                      ? 'bg-teal-700 text-white font-bold'
                      : 'text-slate-700 hover:bg-teal-50 hover:text-teal-800'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-50 text-teal-800 border border-teal-200 text-xs font-bold cursor-pointer"
              >
                <Languages className="w-4 h-4" />
                <span>{language === 'en' ? 'اردو زبان منتخب کریں' : 'Switch to English'}</span>
              </button>

              <button
                onClick={handleUrduVoiceLaunch}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-teal-700 text-white text-xs font-bold cursor-pointer"
              >
                <Mic className="w-4 h-4" />
                <span>{language === 'en' ? 'Urdu Voice AI' : 'اردو وائس'}</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* iOS Installation Instructions Modal */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-slate-900">
                {language === 'en' ? 'Install MediGuide on iOS' : 'آئی فون پر میڈی گائیڈ انسٹال کریں'}
              </h3>
              <button
                onClick={() => setShowIOSModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              {language === 'en' ? (
                <>
                  1. Tap the <strong>Share</strong> icon (square with arrow) in Safari.<br />
                  2. Scroll down and tap <strong>Add to Home Screen</strong>.<br />
                  3. Tap <strong>Add</strong> in the top-right corner to access MediGuide offline anytime.
                </>
              ) : (
                <>
                  1. سفاری براؤزر کے نیچے <strong>Share</strong> بٹن پر کلک کریں۔<br />
                  2. فہرست میں سے <strong>Add to Home Screen</strong> منتخب کریں۔<br />
                  3. اوپر دائیں جانب <strong>Add</strong> کا بٹن دبائیں۔
                </>
              )}
            </p>
            <button
              onClick={() => setShowIOSModal(false)}
              className="mt-5 w-full rounded-xl bg-teal-600 py-2.5 text-sm font-semibold text-white hover:bg-teal-700 transition cursor-pointer"
            >
              {language === 'en' ? 'Got it' : 'سمجھ گیا'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
