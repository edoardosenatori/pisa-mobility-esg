import React from 'react';
import { DATA_STATUS_TYPES, DATA_TRANSPARENCY_REGISTRY } from '../../data/dataTransparencyRegistry';
import { HelpCircle, ExternalLink } from 'lucide-react';

export default function DataSourceBadge({ 
  status = 'VIRTUAL_PUMS', 
  onClick, 
  customLabel, 
  size = 'sm',
  metricId,
  officialUrl
}) {
  const config = DATA_STATUS_TYPES[status] || DATA_STATUS_TYPES.VIRTUAL_PUMS;
  const isReal = status === 'REAL_LIVE' || status === 'REAL_CALCULATED';

  const resolvedUrl = officialUrl || (metricId ? DATA_TRANSPARENCY_REGISTRY.find(d => d.id === metricId)?.officialUrl : null);

  return (
    <div className="inline-flex items-center gap-1 shrink-0">
      <button
        type="button"
        onClick={onClick}
        className={`inline-flex items-center gap-1.5 rounded-full font-bold border transition-all cursor-pointer group ${
          size === 'xs' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs'
        } ${config.badgeClass} hover:brightness-110 hover:shadow-md`}
        title={isReal ? 'Dato Reale Certificato - Clicca per dettagli fonte e requisiti' : 'Dato Virtuale/PUMS - Clicca per vedere i requisiti per renderlo reale'}
      >
        <span className={`w-2 h-2 rounded-full ${config.dotClass} ${isReal ? 'animate-pulse' : ''}`} />
        <span>{customLabel || config.label}</span>
        <HelpCircle className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
      </button>

      {resolvedUrl && (
        <a
          href={resolvedUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className={`rounded-full text-slate-400 hover:text-white bg-slate-900/90 hover:bg-blue-600 border border-slate-700 hover:border-blue-400 transition cursor-pointer shadow-sm ${
            size === 'xs' ? 'w-5 h-5 flex items-center justify-center text-[10px]' : 'w-6 h-6 flex items-center justify-center text-xs'
          }`}
          title="Apri direttamente la piattaforma o fonte ufficiale in una nuova scheda"
        >
          <ExternalLink className={size === 'xs' ? 'w-2.5 h-2.5' : 'w-3 h-3'} />
        </a>
      )}
    </div>
  );
}
