import React from 'react';
import { TrendingUp, TrendingDown, Leaf, Users, Euro, Landmark } from 'lucide-react';
import DataSourceBadge from './DataSourceBadge';

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

export default function EsgCard({ dimension, onClick, isSelected, onInspectMetric, liveAirQuality }) {
  const IconComponent = iconMap[dimension.id] || Leaf;
  const sem = semaphoreStyles[dimension.semaphore.status] || semaphoreStyles.green;

  // Determine data status type
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
          ? 'bg-slate-800/90 border-blue-500/80 ring-2 ring-blue-500/30 shadow-2xl scale-[1.02]'
          : 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800/80 hover:border-slate-600 hover:shadow-xl'
      }`}
    >
      <div>
        {/* Header card with Dimension title & Semaphore Badge */}
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
              <h3 className="text-base font-bold text-white tracking-wide">{dimension.title}</h3>
              <p className="text-[11px] text-slate-400">{dimension.subtitle}</p>
            </div>
          </div>

          {/* Semaphore Badge */}
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-semibold shrink-0 ${sem.bg} ${sem.border} ${sem.text} ${sem.glow}`}>
            <span className={`w-2 h-2 rounded-full ${sem.dot} animate-pulse-subtle`} />
            <span>{dimension.semaphore.label}</span>
          </div>
        </div>

        {/* Primary Metric & Value */}
        <div className="my-3 pt-1">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              {dimension.primaryMetric.value}
            </span>
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
              {dimension.primaryMetric.unit}
            </span>
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

        {/* Description */}
        <p className="text-xs text-slate-300/90 leading-relaxed mb-3 line-clamp-2">
          {dimension.description}
        </p>

        {/* Secondary Metrics Mini-Grid */}
        <div className="pt-3 border-t border-slate-700/60 grid grid-cols-3 gap-2">
          {dimension.secondaryMetrics.map((sec, idx) => {
            // If environmental, show live PM10 if available
            const displayVal = (dimension.id === 'environmental' && idx === 0 && liveAirQuality?.pm10)
              ? `${liveAirQuality.pm10} µg/m³ (Live)`
              : sec.value;

            return (
              <div key={idx} className="bg-slate-900/60 rounded-lg p-2 border border-slate-800/80">
                <div className="text-[10px] text-slate-400 truncate">{sec.label}</div>
                <div className="text-xs font-bold text-white mt-0.5">{displayVal}</div>
                <div className="text-[10px] text-emerald-400 font-medium">{sec.delta}</div>
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
