import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  MapPin, 
  BarChart3, 
  Database, 
  Calendar, 
  RefreshCw, 
  ShieldCheck, 
  Activity,
  Layers,
  Sparkles,
  CloudSun,
  Wind,
  Info,
  BookOpen,
  Sliders,
  HelpCircle,
  Play,
  CheckCircle2
} from 'lucide-react';

export default function Header({ 
  activeTab, 
  setActiveTab, 
  onRefresh, 
  isRefreshing, 
  liveWeather, 
  liveAirQuality,
  onOpenDataModal,
  citizenGuide,
  setCitizenGuide,
  onStartTour
}) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentTime.toLocaleDateString('it-IT', {
    weekday: 'short',
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  const formattedTime = currentTime.toLocaleTimeString('it-IT', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  const tabs = [
    {
      id: 'executive',
      label: 'Vista Executive',
      shortLabel: 'Executive',
      icon: LayoutDashboard,
      description: 'Sintesi 4 Dimensioni ESG & Target PUMS'
    },
    {
      id: 'map',
      label: 'Mappa Territoriale',
      shortLabel: 'Mappa',
      icon: MapPin,
      description: 'Asse Pilota Pisa, Ciclopiste, Sharing & PEBA'
    },
    {
      id: 'analyst',
      label: 'Analyst & Flussi',
      shortLabel: 'Analyst',
      icon: BarChart3,
      description: 'Grafico Bivariato Bici vs Bus & Segmenti'
    },
    {
      id: 'opendata',
      label: 'Open Data & Civico',
      shortLabel: 'Open Data',
      icon: Database,
      description: 'Export Dataset & Segnalazioni PEBA'
    }
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 shadow-2xl">
      {/* Top Banner: Institutional Branding & Realtime status */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between py-3 gap-3 border-b border-slate-800/60">
          
          {/* Logo & Institutional Title */}
          <div className="flex items-center gap-3.5 w-full lg:w-auto justify-between lg:justify-start">
            <div className="flex items-center gap-3.5">
              {/* Pisa Institutional Crest */}
              <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-red-600 to-pisa-red border border-red-400/40 shadow-[0_0_20px_rgba(196,18,48,0.45)] shrink-0">
                <svg className="w-7 h-7 text-white" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="square">
                  <path d="M50 12 L50 88 M12 50 L88 50" />
                  <path d="M30 30 L38 38 M70 30 L62 38 M30 70 L38 62 M70 70 L62 62" strokeWidth="5" />
                  <circle cx="50" cy="12" r="4" fill="currentColor" />
                  <circle cx="50" cy="88" r="4" fill="currentColor" />
                  <circle cx="12" cy="50" r="4" fill="currentColor" />
                  <circle cx="88" cy="50" r="4" fill="currentColor" />
                </svg>
                <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base sm:text-lg font-black text-white tracking-tight flex items-center gap-2">
                    <span>Pisa Mobility & ESG Dashboard</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30 hidden sm:inline-block">
                      PM-ESG v2.5
                    </span>
                  </h1>
                </div>
                <p className="text-xs text-slate-400 flex items-center gap-2">
                  <span className="text-slate-300 font-semibold">Comune di Pisa</span>
                  <span>•</span>
                  <span>PUMS 2020-2030</span>
                  <span className="hidden md:inline text-emerald-400 font-medium flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 inline text-emerald-400" /> WCAG 2.1 AA
                  </span>
                </p>
              </div>
            </div>

            {/* Mobile quick action buttons */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={onStartTour}
                className="p-2 rounded-xl bg-emerald-950/80 text-emerald-300 border border-emerald-500 flex items-center gap-1 text-xs font-semibold"
                title="Tour Guidato"
              >
                <HelpCircle className="w-4 h-4 text-emerald-400" />
                <span>Tour</span>
              </button>

              <button
                type="button"
                onClick={() => setCitizenGuide(!citizenGuide)}
                className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition ${
                  citizenGuide 
                    ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500 shadow-lg shadow-emerald-950/50' 
                    : 'bg-slate-800/80 text-slate-400 border-slate-700'
                }`}
                title="Attiva/Disattiva Guida Cittadino"
              >
                <Sparkles className={`w-4 h-4 ${citizenGuide ? 'text-emerald-400' : 'text-slate-500'}`} />
                <span className="text-[11px] font-bold">{citizenGuide ? 'Guida ON' : 'Tecnico'}</span>
              </button>
            </div>
          </div>

          {/* Center / Right: Mode Switch Toggle + Tour Trigger + Live Badges */}
          <div id="tour-header-controls" className="flex items-center gap-2.5 flex-wrap justify-between lg:justify-end w-full lg:w-auto">
            
            {/* 1. PROGRESSIVE DISCLOSURE SWITCH: Guida alla Lettura (Cittadini) */}
            <div className="hidden sm:flex items-center gap-2.5 bg-slate-950/90 px-3 py-1.5 rounded-xl border border-slate-800 shadow-inner">
              <div className="flex items-center gap-1.5">
                <Sparkles className={`w-4 h-4 transition-colors ${citizenGuide ? 'text-emerald-400 animate-pulse' : 'text-slate-500'}`} />
                <span className={`text-xs font-semibold transition-colors ${citizenGuide ? 'text-emerald-300' : 'text-slate-400'}`}>
                  Guida alla Lettura (Cittadini)
                </span>
              </div>

              {/* Tailwind Toggle Switch */}
              <button
                type="button"
                role="switch"
                aria-checked={citizenGuide}
                onClick={() => setCitizenGuide(!citizenGuide)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                  citizenGuide ? 'bg-emerald-600' : 'bg-slate-700'
                }`}
                title="Attiva la modalità divulgativa per cittadini o la modalità tecnica formale"
              >
                <span className="sr-only">Attiva Guida Cittadino</span>
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    citizenGuide ? 'translate-x-5 bg-white' : 'translate-x-0 bg-slate-300'
                  }`}
                />
              </button>

              <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border uppercase transition-colors ${
                citizenGuide 
                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60' 
                  : 'bg-slate-900 text-slate-400 border-slate-700'
              }`}>
                {citizenGuide ? 'ON' : 'OFF'}
              </span>
            </div>

            {/* 2. TRIGGER GUIDA RAPIDA / TOUR SPOTLIGHT */}
            <button
              type="button"
              onClick={onStartTour}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white border border-emerald-400/40 shadow-sm transition cursor-pointer"
              title="Riapri la guida rapida interattiva (Tour Guidato)"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Guida Rapida</span>
            </button>

            {/* Live Weather & Air Quality Badge for Pisa */}
            <div className="hidden xl:flex items-center gap-2 bg-slate-950/80 px-2.5 py-1.5 rounded-lg border border-slate-800 text-xs">
              <div className="flex items-center gap-1 text-amber-300">
                <CloudSun className="w-3.5 h-3.5 text-amber-400" />
                <span>Pisa: <strong>{liveWeather?.temperature ?? '24.5'}°C</strong></span>
              </div>
              <span className="text-slate-600">|</span>
              <div className="flex items-center gap-1 text-emerald-400">
                <Wind className="w-3.5 h-3.5 text-emerald-400" />
                <span>PM10: <strong>{liveAirQuality?.pm10 ?? '18.2'} µg/m³</strong></span>
              </div>
            </div>

            {/* Branch collaborator test badge — feature/collab-test-preview */}
            <span
              data-testid="collaborator-badge"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-emerald-950/80 px-3 py-1.5 text-xs font-medium text-emerald-200 border border-emerald-500/50 whitespace-nowrap"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span>Branch Test OK • Collab Live</span>
            </span>

            {/* Live Date/Time */}
            <div className="flex items-center gap-2 bg-slate-800/80 px-2.5 py-1.5 rounded-lg border border-slate-700/60 text-xs">
              <Calendar className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-slate-300 capitalize hidden md:inline">{formattedDate}</span>
              <span className="font-mono text-emerald-400 font-semibold">{formattedTime}</span>
            </div>

            {/* Transparency Modal Trigger */}
            <button
              onClick={() => onOpenDataModal && onOpenDataModal()}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-purple-900/40 text-purple-300 border border-purple-700/50 hover:bg-purple-800/60 hover:text-white transition shadow-sm cursor-pointer"
              title="Guida trasparenza: vedi quali dati sono reali e i requisiti per quelli virtuali"
            >
              <Info className="w-3.5 h-3.5 text-purple-400" />
              <span className="hidden sm:inline">Dati</span>
            </button>

            {/* Refresh IoT */}
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-blue-900/40 text-blue-300 border border-blue-700/50 hover:bg-blue-800/60 hover:text-white transition shadow-sm cursor-pointer ${
                isRefreshing ? 'opacity-70 cursor-wait' : ''
              }`}
              title="Aggiorna feed sensori IoT"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-blue-400' : ''}`} />
              <span className="hidden sm:inline">{isRefreshing ? 'Sync...' : 'Sync'}</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs (4 main views) */}
        <nav className="flex items-center gap-1 sm:gap-2 py-2 overflow-x-auto no-scrollbar" aria-label="Navigazione viste principali">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-900/50 border border-blue-400/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 ml-0.5 animate-pulse" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
