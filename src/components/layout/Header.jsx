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
  Info
} from 'lucide-react';

export default function Header({ 
  activeTab, 
  setActiveTab, 
  onRefresh, 
  isRefreshing, 
  liveWeather, 
  liveAirQuality,
  onOpenDataModal 
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
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800 shadow-2xl">
      {/* Top Banner: Institutional Branding & Realtime status */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between py-3 gap-4 border-b border-slate-800/60">
          
          {/* Logo & Institutional Title */}
          <div className="flex items-center gap-3.5">
            {/* Simulated Pisa Institutional Crest with stylized Pisa Cross */}
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-red-600 to-pisa-red border border-red-400/40 shadow-[0_0_20px_rgba(196,18,48,0.45)] group">
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
                    PM-ESG v2.4
                  </span>
                </h1>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-2">
                <span className="text-slate-300 font-semibold">Comune di Pisa</span>
                <span>•</span>
                <span>Direzione Mobilità & PUMS</span>
                <span className="hidden md:inline text-emerald-400 font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 inline text-emerald-400" /> WCAG AA
                </span>
              </p>
            </div>
          </div>

          {/* Dynamic Real Weather / Air Quality & Controls */}
          <div className="flex items-center gap-2.5 flex-wrap justify-end">
            
            {/* Live Weather & Air Quality Badge for Pisa */}
            <div className="hidden lg:flex items-center gap-2 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800 text-xs">
              <div className="flex items-center gap-1 text-amber-300">
                <CloudSun className="w-3.5 h-3.5 text-amber-400" />
                <span>Pisa: <strong>{liveWeather?.temperature ?? '24.5'}°C</strong></span>
              </div>
              <span className="text-slate-600">|</span>
              <div className="flex items-center gap-1 text-emerald-400">
                <Wind className="w-3.5 h-3.5 text-emerald-400" />
                <span>PM10: <strong>{liveAirQuality?.pm10 ?? '18.2'} µg/m³</strong></span>
                <span className="text-[10px] bg-emerald-950 px-1.5 py-0.2 rounded border border-emerald-800 text-emerald-300">
                  {liveAirQuality?.aqiLabel ?? 'Buona'}
                </span>
              </div>
            </div>

            {/* Live Date/Time */}
            <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60 text-xs">
              <Calendar className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-slate-300 capitalize hidden sm:inline">{formattedDate}</span>
              <span className="font-mono text-emerald-400 font-semibold">{formattedTime}</span>
            </div>

            {/* Transparency Modal Trigger */}
            <button
              onClick={() => onOpenDataModal && onOpenDataModal()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-purple-900/40 text-purple-300 border border-purple-700/50 hover:bg-purple-800/60 hover:text-white transition shadow-sm"
              title="Guida trasparenza: vedi quali dati sono reali e i requisiti per quelli virtuali"
            >
              <Info className="w-3.5 h-3.5 text-purple-400" />
              <span className="hidden sm:inline">Trasparenza Dati</span>
            </button>

            {/* Refresh IoT */}
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-900/40 text-blue-300 border border-blue-700/50 hover:bg-blue-800/60 hover:text-white transition shadow-sm ${
                isRefreshing ? 'opacity-70 cursor-wait' : ''
              }`}
              title="Aggiorna feed sensori IoT"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-blue-400' : ''}`} />
              <span className="hidden sm:inline">{isRefreshing ? 'Sync...' : 'Sync Live'}</span>
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
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
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
