import React, { useState, useEffect } from 'react';
import { 
  X, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  FileCode, 
  ShieldCheck, 
  Database, 
  Terminal, 
  Building, 
  Clock, 
  Layers,
  Sparkles,
  Link2
} from 'lucide-react';
import { 
  DATA_TRANSPARENCY_REGISTRY, 
  DATA_STATUS_TYPES 
} from '../../data/dataTransparencyRegistry';

export default function DataRequirementsModal({ isOpen, onClose, initialMetricId = 'air_quality_pisa' }) {
  const [selectedId, setSelectedId] = useState(initialMetricId);

  useEffect(() => {
    if (initialMetricId) {
      setSelectedId(initialMetricId);
    }
  }, [initialMetricId]);

  if (!isOpen) return null;

  const currentItem = DATA_TRANSPARENCY_REGISTRY.find(d => d.id === selectedId) || DATA_TRANSPARENCY_REGISTRY[0];
  const statusConfig = DATA_STATUS_TYPES[currentItem.status];

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Modal Card */}
      <div 
        role="dialog" 
        aria-modal="true" 
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-slate-800/80 border-b border-slate-700 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <span>Trasparenza Dati & Verifica Fonti Ufficiali</span>
                <span className="text-xs font-normal text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-800">
                  Audit PM-ESG
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Consulta la provenienza esatta di ogni indicatore e accedi alle piattaforme istituzionali certificate
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-700/60 transition cursor-pointer"
            aria-label="Chiudi modale"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Two Column Split */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-slate-800">
          
          {/* Left Column: Data Streams List (5/12) */}
          <div className="md:col-span-5 p-4 space-y-2 bg-slate-950/40">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2">
              Flussi Dati del Cruscotto ({DATA_TRANSPARENCY_REGISTRY.length})
            </span>
            
            <div className="space-y-1.5">
              {DATA_TRANSPARENCY_REGISTRY.map((item) => {
                const isSelected = item.id === selectedId;
                const isReal = item.status === 'REAL_LIVE' || item.status === 'REAL_CALCULATED';

                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedId(item.id)}
                    className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-slate-800 border-blue-500 text-white shadow-md'
                        : 'bg-slate-900/60 border-slate-800/80 text-slate-300 hover:bg-slate-800/50 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-semibold truncate">{item.name}</span>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase shrink-0 border ${
                        isReal ? 'bg-emerald-950 text-emerald-300 border-emerald-800' : 'bg-purple-950 text-purple-300 border-purple-800'
                      }`}>
                        {isReal ? 'Reale' : 'Virtuale'}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400 flex items-center justify-between">
                      <span>Vista: {item.view}</span>
                      {item.officialUrl && (
                        <span className="text-blue-400 flex items-center gap-0.5 text-[9px]">
                          Link ↗
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Detailed Specification & Requirements (7/12) */}
          <div className="md:col-span-7 p-6 space-y-5 bg-slate-900/60">
            
            {/* Status & Name Card */}
            <div>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${statusConfig.badgeClass}`}>
                  ● {statusConfig.label}
                </span>
                <span className="text-xs text-slate-400">Sezione: <strong>{currentItem.view}</strong></span>
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-white leading-snug">{currentItem.name}</h4>
            </div>

            {/* Current Source Info */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Origine & Fonte Ufficiale:</span>
              <p className="text-xs text-slate-200 font-mono bg-slate-900 p-2.5 rounded-xl border border-slate-800 leading-relaxed">
                {currentItem.currentSource}
              </p>
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span>Frequenza Aggiornamento: <strong>{currentItem.updateFrequency}</strong></span>
              </div>
            </div>

            {/* Official Platform Direct Verified Link Banner */}
            {currentItem.officialUrl && (
              <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-blue-300 uppercase tracking-wider flex items-center gap-1">
                    <Link2 className="w-3 h-3 text-blue-400" /> Fonte Istituzionale Verificata
                  </span>
                  <div className="text-xs font-bold text-white">
                    {currentItem.officialPortalName || 'Portale Ufficiale'}
                  </div>
                </div>

                <a
                  href={currentItem.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-950/50 border border-blue-400/50 transition shrink-0 cursor-pointer"
                >
                  <span>Apri Piattaforma</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}

            {/* If Already Real */}
            {currentItem.requirementsToMakeReal === null ? (
              <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-800/50 text-emerald-300 space-y-2">
                <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-emerald-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Dato Attivo & Certificato al 100%</span>
                </div>
                <p className="text-xs text-emerald-300/80 leading-relaxed">
                  Il cruscotto acquisisce i dati in tempo reale dalle API pubbliche o applica le formule ufficiali ISPRA/ACI convalidati per il territorio del Comune di Pisa.
                </p>
              </div>
            ) : (
              /* Requirements to Make Real Section */
              <div className="space-y-3.5">
                <div className="flex items-center gap-2 text-white font-bold text-xs sm:text-sm pb-1 border-b border-slate-800">
                  <Terminal className="w-4 h-4 text-purple-400" />
                  <span>Requisiti per Attivazione Feed Live Enterprise</span>
                </div>

                {/* Owner & Standard */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400 text-[10px] uppercase font-semibold flex items-center gap-1 mb-1">
                      <Building className="w-3 h-3 text-blue-400" /> Ente / Proprietario
                    </span>
                    <p className="font-semibold text-white">{currentItem.requirementsToMakeReal.owner}</p>
                  </div>

                  <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400 text-[10px] uppercase font-semibold flex items-center gap-1 mb-1">
                      <FileCode className="w-3 h-3 text-emerald-400" /> Standard Richiesto
                    </span>
                    <p className="font-semibold text-white">{currentItem.requirementsToMakeReal.standard}</p>
                  </div>
                </div>

                {/* Endpoints */}
                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 space-y-1.5">
                  <span className="text-slate-400 text-[10px] uppercase font-semibold">Endpoint / Feed da Collegare:</span>
                  <div className="space-y-1">
                    {currentItem.requirementsToMakeReal.endpointsNeeded.map((ep, i) => (
                      <code key={i} className="block text-[11px] text-purple-300 font-mono bg-purple-950/40 p-1.5 rounded border border-purple-900/40 truncate">
                        {ep}
                      </code>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
