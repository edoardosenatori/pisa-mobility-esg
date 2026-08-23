import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />,
    error: <XCircle className="w-5 h-5 text-red-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-blue-400 shrink-0" />
  };

  const borders = {
    success: 'border-emerald-500/50 bg-slate-900/95 text-slate-100 shadow-emerald-950/40',
    warning: 'border-amber-500/50 bg-slate-900/95 text-slate-100 shadow-amber-950/40',
    error: 'border-red-500/50 bg-slate-900/95 text-slate-100 shadow-red-950/40',
    info: 'border-blue-500/50 bg-slate-900/95 text-slate-100 shadow-blue-950/40'
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className={`p-4 rounded-xl border backdrop-blur-md shadow-2xl flex items-start gap-3 ${borders[toast.type || 'success']}`}>
        {icons[toast.type || 'success']}
        <div className="flex-1 pr-2">
          {toast.title && <h4 className="text-sm font-semibold text-white mb-0.5">{toast.title}</h4>}
          <p className="text-xs text-slate-300 leading-relaxed">{toast.message}</p>
          {toast.meta && (
            <div className="mt-2 text-[11px] font-mono text-emerald-300/90 bg-emerald-950/60 px-2 py-1 rounded border border-emerald-800/40 inline-block">
              {toast.meta}
            </div>
          )}
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          aria-label="Chiudi notifica"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
