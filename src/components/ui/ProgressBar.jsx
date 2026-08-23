import React from 'react';
import { Target, CheckCircle2, Clock, Award } from 'lucide-react';

export default function ProgressBar({ target }) {
  const isComplete = target.percentage >= 100;
  const isNear = target.percentage >= 80;

  const colorConfig = {
    green: {
      bar: 'from-emerald-500 to-teal-400',
      badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      glow: 'shadow-[0_0_15px_rgba(16,185,129,0.3)]'
    },
    amber: {
      bar: 'from-amber-500 to-yellow-400',
      badge: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      glow: 'shadow-[0_0_15px_rgba(245,158,11,0.3)]'
    },
    rose: {
      bar: 'from-rose-500 to-pink-500',
      badge: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
      glow: 'shadow-[0_0_15px_rgba(239,68,68,0.3)]'
    }
  };

  const currentTheme = colorConfig[target.status] || colorConfig.green;

  return (
    <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 hover:bg-slate-800/80 transition-all">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div>
          <span className="text-[10px] font-semibold tracking-wider uppercase text-blue-400 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-800/40 inline-block mb-1">
            {target.category}
          </span>
          <h4 className="text-sm font-semibold text-white leading-tight">{target.title}</h4>
        </div>
        <div className={`px-2 py-0.5 rounded-full border text-xs font-bold ${currentTheme.badge}`}>
          {target.percentage}%
        </div>
      </div>

      {/* Progress Track */}
      <div className="relative w-full h-3 bg-slate-900/80 rounded-full overflow-hidden p-0.5 border border-slate-700/50 my-2.5">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${currentTheme.bar} transition-all duration-1000 ease-out ${currentTheme.glow}`}
          style={{ width: `${Math.min(target.percentage, 100)}%` }}
        />
      </div>

      {/* Numerical Stats & Deadline */}
      <div className="flex items-center justify-between text-xs text-slate-300">
        <div className="flex items-center gap-1.5 font-medium">
          <span className="text-white font-bold">{target.current}</span>
          <span className="text-slate-400">/</span>
          <span className="text-slate-400">{target.target} {target.unit}</span>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-slate-400">
          <Clock className="w-3 h-3 text-slate-400" />
          <span>Scadenza: {target.deadline}</span>
        </div>
      </div>
    </div>
  );
}
