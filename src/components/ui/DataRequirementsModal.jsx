import React, { useState } from 'react';
import { 
  DATA_TRANSPARENCY_REGISTRY, 
  DATA_STATUS_TYPES 
} from '../../data/dataTransparencyRegistry';
import { 
  X, 
  ShieldCheck, 
  Radio, 
  Terminal, 
  Clock, 
  Building, 
  FileCode, 
  CheckCircle2, 
  ArrowRight,
  ExternalLink,
  Layers
} from 'lucide-react';

export default function DataRequirementsModal({ isOpen, onClose, initialMetricId }) {
  const [selectedId, setSelectedId] = useState(initialMetricId || DATA_TRANSPARENCY_REGISTRY[0].id);

  if (!isOpen) return null;

  const currentItem = DATA_TRANSPARENCY_REGISTRY.find(item => item.id === selectedId) || DATA_TRANSPARENCY_REGISTRY[0];
  const statusConfig = DATA_STATUS_TYPES[currentItem.status];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-950/80 border border-blue-800 text-blue-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Registro di Trasparenza & Roadmap Dati Reali</h3>
              <p className="text-xs text-slate-400">Specifica tecnica per l'integrazione e certificazione dei flussi dati (Comune di Pisa)</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Two columns layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-y-auto">
          
          {/* Left Column: Metric Selector (5/12) */}
          <div className="md:col-span-5 border-r border-slate-800/80 p-4 space-y-2 bg-slate-950/40">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Catalogo Metriche ({DATA_TRANSPARENCY_REGISTRY.length})
            </div>
            
            <div className="space-y-1.5">
              {DATA_TRANSPARENCY_REGISTRY.map((item) => {
                const isSelected = item.id === selectedId;
                const isReal = item.status === 'REAL_LIVE' || item.status === 'REAL_CALCULATED';

                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedId(item.id)}
                    className={`w-full text-left p-3 rounded-xl border transition-all ${
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
                        {isReal ? 'Reale Live' : 'Virtuale'}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400 flex items-center gap-1.5">
                      <span>Vista: {item.view}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Detailed Specification & Requirements (7/12) */}
          <div className="md:col-span-7 p-6 space-y-6 bg-slate-900/60">
            
            {/* Status & Name Card */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${statusConfig.badgeClass}`}>
                  ● {statusConfig.label}
                </span>
                <span className="text-xs text-slate-400">Sezione: <strong>{currentItem.view}</strong></span>
              </div>
              <h4 className="text-xl font-bold text-white leading-snug">{currentItem.name}</h4>
            </div>

            {/* Current Source Info */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Fonte Attuale:</span>
              <p className="text-xs text-slate-200 font-mono bg-slate-900 p-2.5 rounded border border-slate-800">
                {currentItem.currentSource}
              </p>
              <div className="text-[11px] text-slate-400">Frequenza: {currentItem.updateFrequency}</div>
            </div>

            {/* If Already Real */}
            {currentItem.requirementsToMakeReal === null ? (
              <div className="p-5 rounded-xl bg-emerald-950/30 border border-emerald-800/50 text-emerald-300 space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm text-emerald-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>Questo dato è già integrato al 100% in tempo reale</span>
                </div>
                <p className="text-xs text-emerald-300/80 leading-relaxed">
                  Il cruscotto effettua chiamate REST periodiche a endpoint pubblici attivi o applica modelli di calcolo certificati ISPRA/EEA per la città di Pisa.
                </p>
              </div>
            ) : (
              /* Requirements to Make Real Section */
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-white font-bold text-sm pb-1 border-b border-slate-800">
                  <Terminal className="w-4 h-4 text-purple-400" />
                  <span>Requisiti Tecnici & Amministrativi per Integrazione Reale</span>
                </div>

                {/* Owner & Standard */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400 text-[10px] uppercase font-semibold flex items-center gap-1 mb-1">
                      <Building className="w-3 h-3 text-blue-400" /> Ente / Proprietario
                    </span>
                    <strong className="text-white text-xs">{currentItem.requirementsToMakeReal.owner}</strong>
                  </div>

                  <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400 text-[10px] uppercase font-semibold flex items-center gap-1 mb-1">
                      <FileCode className="w-3 h-3 text-emerald-400" /> Standard Tecnico
                    </span>
                    <strong className="text-white text-xs font-mono">{currentItem.requirementsToMakeReal.standard}</strong>
                  </div>
                </div>

                {/* Required Endpoints */}
                {currentItem.requirementsToMakeReal.endpointsNeeded && (
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-slate-300">Endpoint / URL necessari:</span>
                    <div className="space-y-1">
                      {currentItem.requirementsToMakeReal.endpointsNeeded.map((ep, idx) => (
                        <div key={idx} className="bg-slate-950 text-purple-300 font-mono text-[11px] p-2 rounded border border-purple-900/40 truncate">
                          {ep}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actionable Steps */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-slate-300">Passaggi Operativi:</span>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {currentItem.requirementsToMakeReal.administrativeSteps.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2 bg-slate-950/40 p-2 rounded border border-slate-800/80">
                        <ArrowRight className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Estimated Time */}
                <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-purple-950/20 border border-purple-900/30">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-purple-400" /> Tempo Stimato di Abilitazione:
                  </span>
                  <strong className="text-purple-300 font-bold">{currentItem.requirementsToMakeReal.estimatedTime}</strong>
                </div>

              </div>
            )}

          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/90 flex items-center justify-between text-xs text-slate-400">
          <span>Standard Trasparenza Smart City Pisa • Livello di Maturità Open Data: <strong>Livello 4 (Linked Data)</strong></span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition"
          >
            Chiudi
          </button>
        </div>

      </div>
    </div>
  );
}
