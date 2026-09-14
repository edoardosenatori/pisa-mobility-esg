import React from 'react';
import { LayoutDashboard, MapPin, BarChart3, Database } from 'lucide-react';

export default function BottomNav({ activeTab, setActiveTab }) {
  const tabs = [
    {
      id: 'executive',
      label: 'Executive',
      icon: LayoutDashboard
    },
    {
      id: 'map',
      label: 'Mappa',
      icon: MapPin
    },
    {
      id: 'analyst',
      label: 'Flussi',
      icon: BarChart3
    },
    {
      id: 'opendata',
      label: 'Open Data',
      icon: Database
    }
  ];

  return (
    <nav 
      aria-label="Navigazione Rapida Mobile"
      className="fixed bottom-0 inset-x-0 z-[60] lg:hidden bg-slate-900/95 backdrop-blur-2xl border-t border-slate-800 shadow-[0_-8px_30px_rgba(0,0,0,0.5)] px-3 py-1.5 pb-[max(env(safe-area-inset-bottom),0.5rem)] flex items-center justify-around"
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 cursor-pointer min-w-[64px] ${
              isActive
                ? 'text-emerald-400 font-bold scale-105'
                : 'text-slate-400 hover:text-slate-200 font-medium'
            }`}
          >
            <div className={`p-1 rounded-lg transition-colors ${
              isActive ? 'bg-emerald-500/20 shadow-sm shadow-emerald-900/40' : 'bg-transparent'
            }`}>
              <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
            </div>
            <span className="text-[10px] tracking-tight mt-0.5">
              {tab.label}
            </span>
            {isActive && (
              <span className="w-1 h-1 rounded-full bg-emerald-400 mt-0.5" />
            )}
          </button>
        );
      })}
    </nav>
  );
}
