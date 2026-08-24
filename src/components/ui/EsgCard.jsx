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
    glow: 'shadow-[0_0_12px_rgba(16,185,129,0.35)]'
  },
  amber: {
    bg: 'bg-amber-500/15',
    border: 'border-amber-500/40',
    dot: 'bg-amber-400',
    text: 'text-amber-400',
    glow: 'shadow-[0_0_12px_rgba(245,158,11,0.35)]'
  },
  rose: {
    bg: 'bg-rose-500/15',
    border: 'border-rose-500/40',
    dot: 'bg-rose-400',
    text: 'text-rose-400',
    glow: 'shadow-[0_0_12px_rgba(239,68,68,0.35)]'
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
  const sem = semaphoreStyles[dimension.semaphore.status] || semaphoreStyles.green;

  const dataStatus = dimension.id === 'environmental' 
    ? 'REAL_LIVE' 
    : dimension.id === 'economic' 
    ? 'REAL_CALCULATED' 
    : 'VIRTUAL_PUMS';

  return (
    <div
      onClick={onClick}
      className={`relative group rounded-2xl p-5 transition-all duration-300 cursor-pointer backdrop-blur-xl border flex flex-col justify-between ${
        isSelected
          ? 'bg-slate-800/95 border-blue-500/80 ring-2 ring-blue-500/40 shadow-2xl scale-[1.01]'
          : 'bg-slate-800/70 border-slate-700/60 hover:bg-slate-800/90 hover:border-slate-600 hover:shadow-xl'
      }`}
    >
      <div>
        {/* Top Header: Code badge, Title, Tooltip, and Semaphore */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5">
            <div className={`p-2.5 rounded-xl ${
              dimension.id === 'environmental' 
                ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/50' 
                : dimension.id === 'social' 
                ? 'bg-blue-950/60 text-blue-400 border border-blue-800/50' 
                : dimension.id === 'economic' 
                ? 'bg-amber-950/60 text-amber-400 border border-amber-800/50' 
                : 'bg-purple-950/60 text-purple-400 border border-purple-800/50'
            }`}>
              <IconComponent className="w-5 h-5" />
            </div>

            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-mono text-[10px] font-bold text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-700">
                  {dimension.code}
                </span>
                <h3 className="text-base font-bold text-white tracking-wide">{dimension.title}</h3>
                {dimension.termKey && (
                  <InfoTooltip term={dimension.termKey} showCitizenBadge={citizenGuide} />
                )}
              </div>
              <p className="text-[11px] text-slate-400">{dimension.subtitle}</p>
            </div>
          </div>

          {/* Semaphore Badge */}
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-semibold shrink-0 ${sem.bg} ${sem.border} ${sem.text} ${sem.glow}`}>
            <span className={`w-2 h-2 rounded-full ${sem.dot} animate-pulse-subtle`} />
            <span className="hidden sm:inline">{dimension.semaphore.label}</span>
          </div>
        </div>

        {/* Primary Metric & Value */}
        <div className="my-3 pt-1">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              {dimension.primaryMetric.value}
            </span>
            <span className="text-xs font-medium text-slate-300 uppercase tracking-wider">
              {dimension.primaryMetric.unit}
            </span>
            {dimension.termKey && (
              <InfoTooltip term={dimension.termKey} showCitizenBadge={citizenGuide} />
            )}
          </div>

          {/* Progressive Disclosure Citizen Subtitle for Primary Metric */}
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
            citizenGuide ? 'max-h-20 opacity-100 mt-2' : 'max-h-0 opacity-0 m-0'
          }`}>
            <div className="p-2 rounded-lg bg-emerald-950/70 border border-emerald-500/40 text-emerald-200 text-xs font-medium flex items-start gap-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>{dimension.citizenSubtitle}</span>
            </div>
          </div>

          {/* Delta Percentage */}
          <div className="flex items-center gap-1.5 mt-2">
            <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-md ${
              dimension.delta.isPositive
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
            }`}>
              {dimension.delta.isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
              {dimension.delta.value}
            </span>
            <span className="text-[11px] text-slate-400 truncate">
              {dimension.delta.period}
            </span>
          </div>
        </div>

        {/* Technical Description */}
        <p className="text-xs text-slate-300/90 leading-relaxed mb-3 line-clamp-2">
          {dimension.description}
        </p>

        {/* Secondary Metrics Grid */}
        <div className="pt-3 border-t border-slate-700/60 grid grid-cols-1 sm:grid-cols-3 gap-2">
          {dimension.secondaryMetrics.map((sec, idx) => {
            const displayVal = (dimension.id === 'environmental' && idx === 0 && liveAirQuality?.pm10)
              ? `${liveAirQuality.pm10} µg/m³`
              : sec.value;

            return (
              <div key={idx} className="bg-slate-900/70 rounded-lg p-2 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] text-slate-400 flex items-center justify-between gap-1">
                    <span className="truncate">{sec.label}</span>
                    {sec.termKey && (
                      <InfoTooltip term={sec.termKey} showCitizenBadge={citizenGuide} />
                    )}
                  </div>
                  <div className="text-xs font-bold text-white mt-0.5">{displayVal}</div>
                  <div className="text-[10px] text-emerald-400 font-medium">{sec.delta}</div>
                </div>

                {/* Progressive Disclosure Note on secondary metric */}
                {citizenGuide && sec.citizenNote && (
                  <div className="mt-1.5 pt-1 border-t border-slate-800 text-[10px] text-emerald-300 leading-tight">
                    {sec.citizenNote}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Data Source Status Footer */}
      <div className="pt-3 mt-3 border-t border-slate-700/40 flex items-center justify-between">
        <span className="text-[10px] text-slate-400">Origine dati:</span>
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
