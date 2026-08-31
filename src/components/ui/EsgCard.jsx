import React from 'react';
import { TrendingUp, TrendingDown, Leaf, Users, Euro, Landmark, Sparkles } from 'lucide-react';
import DataSourceBadge from './DataSourceBadge';
import InfoTooltip from './InfoTooltip';

const iconMap = {
  environmental: Leaf,
  social: Users,
  economic: Euro,
  governance: Landmark
};

const semaphoreStyles = {
  green: {
    bg: 'bg-emerald-500/15',
    border: 'border-emerald-500/40',
    dot: 'bg-emerald-400',
    text: 'text-emerald-400',
    glow: 'shadow-[0_0_10px_rgba(16,185,129,0.3)]'
  },
  amber: {
    bg: 'bg-amber-500/15',
    border: 'border-amber-500/40',
    dot: 'bg-amber-400',
    text: 'text-amber-400',
    glow: 'shadow-[0_0_10px_rgba(245,158,11,0.3)]'
  },
  rose: {
    bg: 'bg-rose-500/15',
    border: 'border-rose-500/40',
    dot: 'bg-rose-400',
    text: 'text-rose-400',
    glow: 'shadow-[0_0_10px_rgba(239,68,68,0.3)]'
  }
};

export default function EsgCard({ 
  dimension, 
  onClick, 
  isSelected, 
  onInspectMetric, 
  liveAirQuality,
  citizenGuide = false 
}) {
  const IconComponent = iconMap[dimension.id] || Leaf;
  const sem = semaphoreStyles[dimension.semaphore?.status] || semaphoreStyles.green;

  const dataStatus = dimension.id === 'environmental' 
    ? 'REAL_LIVE' 
    : dimension.id === 'economic' 
    ? 'REAL_CALCULATED' 
    : 'VIRTUAL_PUMS';

  return (
    <div
      onClick={onClick}
      className={`relative group rounded-3xl p-5 sm:p-6 transition-all duration-300 cursor-pointer backdrop-blur-xl border flex flex-col justify-between overflow-hidden ${
        isSelected
          ? 'bg-slate-800/95 border-blue-500/80 ring-2 ring-blue-500/40 shadow-2xl shadow-blue-950/50 scale-[1.01]'
          : 'bg-slate-800/70 border-slate-700/60 hover:bg-slate-800/90 hover:border-slate-600 hover:shadow-xl'
      }`}
    >
      <div className="space-y-4">
        
        {/* 1. TOP HEADER: Icon, Code Badge, Title & Semaphore */}
        <div className="flex items-start justify-between gap-3 pb-1">
          <div className="flex items-center gap-3 min-w-0">
            <div className={`p-2.5 rounded-2xl shrink-0 ${
              dimension.id === 'environmental' 
                ? 'bg-emerald-950/70 text-emerald-400 border border-emerald-800/50' 
                : dimension.id === 'social' 
                ? 'bg-blue-950/70 text-blue-400 border border-blue-800/50' 
                : dimension.id === 'economic' 
                ? 'bg-amber-950/70 text-amber-400 border border-amber-800/50' 
                : 'bg-purple-950/70 text-purple-400 border border-purple-800/50'
            }`}>
              <IconComponent className="w-5 h-5" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-mono text-[10px] font-bold text-slate-300 bg-slate-900/90 px-1.5 py-0.5 rounded border border-slate-700">
                  {dimension.code}
                </span>
                <h3 className="text-base font-black text-white tracking-tight truncate">
                  {dimension.title}
                </h3>
              </div>
              <p className="text-[11px] text-slate-400 truncate mt-0.5" title={dimension.subtitle}>
                {dimension.subtitle}
              </p>
            </div>
          </div>

          {/* Semaphore Status Pill */}
          <div 
            className={`flex items-center gap-1.5 px-2 py-1 rounded-full border text-[10px] font-bold shrink-0 ${sem.bg} ${sem.border} ${sem.text} ${sem.glow}`}
            title={`Stato conformità: ${dimension.semaphore?.label}`}
          >
            <span className={`w-2 h-2 rounded-full ${sem.dot} animate-pulse-subtle shrink-0`} />
            <span className="truncate max-w-[80px] sm:max-w-none">
              {dimension.semaphore?.status === 'green' ? 'In Target' : dimension.semaphore?.status === 'amber' ? 'Monitorato' : 'Attenzione'}
            </span>
          </div>
        </div>

        {/* 2. PRIMARY METRIC & VALUE (NO UGLY LINE BREAKS) */}
        <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-800/60 space-y-2">
          
          <div className="space-y-1">
            <div className="flex items-baseline justify-between gap-2 flex-wrap">
              <span className="text-2xl sm:text-3xl xl:text-3xl font-black text-white tracking-tight whitespace-nowrap">
                {dimension.primaryMetric.value}
              </span>
              {dimension.termKey && (
                <InfoTooltip term={dimension.termKey} showCitizenBadge={citizenGuide} />
              )}
            </div>

            <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider leading-tight">
              {dimension.primaryMetric.unit}
            </div>
          </div>

          {/* Progressive Disclosure Citizen Subtitle */}
          {citizenGuide && dimension.citizenSubtitle && (
            <div className="p-2.5 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-200 text-xs font-medium flex items-start gap-2 shadow-sm animate-in fade-in duration-200">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span className="leading-snug">{dimension.citizenSubtitle}</span>
            </div>
          )}

          {/* Delta Trend Pill */}
          <div className="flex items-center gap-1.5 pt-1 flex-wrap">
            <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md ${
              dimension.delta.isPositive
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
            }`}>
              {dimension.delta.isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              <span>{dimension.delta.value}</span>
            </span>
            <span className="text-[10px] text-slate-400 truncate">
              {dimension.delta.period}
            </span>
          </div>

        </div>

        {/* 3. TECHNICAL DESCRIPTION (BALANCED HEIGHT) */}
        <p className="text-xs text-slate-300 leading-relaxed min-h-[36px] font-normal">
          {dimension.description}
        </p>

        {/* 4. SECONDARY METRICS: ELEGANT FULL-WIDTH ROWS (NO TRUNCATION) */}
        <div className="pt-3 border-t border-slate-700/60 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block px-0.5">
            Indicatori di Dettaglio
          </span>

          <div className="space-y-1.5">
            {dimension.secondaryMetrics.map((sec, idx) => {
              const displayVal = (dimension.id === 'environmental' && idx === 0 && liveAirQuality?.pm10)
                ? `${liveAirQuality.pm10} µg/m³`
                : sec.value;

              return (
                <div 
                  key={idx} 
                  className="bg-slate-900/80 hover:bg-slate-900 transition-colors rounded-xl p-2.5 border border-slate-800/80 space-y-1"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-[11px] text-slate-300 font-medium truncate flex items-center gap-1 min-w-0">
                      <span className="truncate" title={sec.label}>{sec.label}</span>
                      {sec.termKey && (
                        <InfoTooltip term={sec.termKey} showCitizenBadge={citizenGuide} />
                      )}
                    </div>
                    
                    <div className="text-right shrink-0 flex items-baseline gap-1.5">
                      <span className="text-xs font-bold text-white whitespace-nowrap">{displayVal}</span>
                      {sec.delta && (
                        <span className="text-[10px] font-semibold text-emerald-400">{sec.delta}</span>
                      )}
                    </div>
                  </div>

                  {/* Citizen note inside secondary metric */}
                  {citizenGuide && sec.citizenNote && (
                    <div className="text-[10px] text-emerald-300 leading-snug pt-1 border-t border-slate-800/60">
                      {sec.citizenNote}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* 5. DATA SOURCE FOOTER */}
      <div className="pt-3 mt-4 border-t border-slate-700/40 flex items-center justify-between gap-2">
        <span className="text-[10px] text-slate-400 font-medium">Origine dati:</span>
        <DataSourceBadge
          status={dataStatus}
          size="xs"
          onClick={(e) => {
            e.stopPropagation();
            if (onInspectMetric) {
              const metricMap = {
                environmental: 'air_quality_pisa',
                social: 'peba_bus_stops',
                economic: 'co2_factors_ispra',
                governance: 'civic_reports_storage'
              };
              onInspectMetric(metricMap[dimension.id]);
            }
          }}
        />
      </div>
    </div>
  );
}
