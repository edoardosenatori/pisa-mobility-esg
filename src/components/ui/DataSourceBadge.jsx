import React from 'react';
import { DATA_STATUS_TYPES } from '../../data/dataTransparencyRegistry';
import { Radio, Cpu, Sparkles, HelpCircle } from 'lucide-react';

export default function DataSourceBadge({ status = 'VIRTUAL_PUMS', onClick, customLabel, size = 'sm' }) {
  const config = DATA_STATUS_TYPES[status] || DATA_STATUS_TYPES.VIRTUAL_PUMS;

  const isReal = status === 'REAL_LIVE' || status === 'REAL_CALCULATED';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full font-bold border transition-all cursor-pointer group ${
        size === 'xs' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs'
      } ${config.badgeClass} hover:brightness-110 hover:shadow-md`}
      title={isReal ? 'Dato Reale Certificato - Clicca per dettagli fonte' : 'Dato Virtuale/PUMS - Clicca per vedere i requisiti per renderlo reale'}
    >
      <span className={`w-2 h-2 rounded-full ${config.dotClass} ${isReal ? 'animate-pulse' : ''}`} />
      <span>{customLabel || config.label}</span>
      <HelpCircle className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
    </button>
  );
}
