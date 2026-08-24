import React, { useState, useRef, useEffect } from 'react';
import { HelpCircle, X, Sparkles, Info } from 'lucide-react';

export const DATA_DICTIONARY = {
  'PEBA / IAU': "Piano Eliminazione Barriere Architettoniche. Misura fermate bus e marciapiedi utilizzabili in autonomia da persone in sedia a rotelle, anziani o con passeggini.",
  'CO2 Evitata': "Emissioni climalteranti risparmiate grazie allo spostamento su bici, bus o a piedi al posto dell'auto termica privata.",
  'Modal Split': "Percentuale di viaggi effettuati con modalità sostenibili rispetto al totale complessivo dei veicoli rilevati.",
  'PM10 / NO2': "Particolato e biossido di azoto. Valori sotto le soglie indicano aria salubre e pieno rispetto dei limiti sanitari UE.",
  'GBFS / GTFS': "Standard aperti internazionali per la trasmissione in tempo reale dei dati di trasporto pubblico (orari, ritardi) e micromobilità condivisa.",
  'SLA Risoluzione (IRS)': "Tempo medio garantito dal Comune di Pisa e PisaMo per prendere in carico e riparare i guasti o le barriere segnalate dai cittadini."
};

export default function InfoTooltip({ 
  term, 
  definition, 
  children, 
  className = '', 
  position = 'top',
  showCitizenBadge = false
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const triggerRef = useRef(null);
  const popoverRef = useRef(null);
  const timeoutRef = useRef(null);

  const tooltipId = `tooltip-${term ? term.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase() : Math.random().toString(36).substring(2, 9)}`;
  const finalDefinition = definition || DATA_DICTIONARY[term] || "Definizione tecnica del parametro di monitoraggio PUMS del Comune di Pisa.";

  useEffect(() => {
    // Detect touch device capability
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // Handle click outside to close
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event) {
      if (
        popoverRef.current && 
        !popoverRef.current.contains(event.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleMouseEnter = () => {
    if (isTouchDevice) return;
    timeoutRef.current = setTimeout(() => {
      setIsOpen(true);
    }, 150);
  };

  const handleMouseLeave = () => {
    if (isTouchDevice) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(false);
  };

  const handleToggle = (e) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  // Position classes
  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2'
  };

  return (
    <span className={`relative inline-flex items-center align-middle ${className}`}>
      <button
        ref={triggerRef}
        type="button"
        onClick={handleToggle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={() => setIsOpen(true)}
        onBlur={() => !isTouchDevice && setIsOpen(false)}
        aria-describedby={isOpen ? tooltipId : undefined}
        aria-expanded={isOpen}
        className="inline-flex items-center justify-center p-0.5 ml-1 rounded-full text-slate-400 hover:text-emerald-400 hover:bg-slate-800/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 transition-colors cursor-pointer"
        title={`Spiegazione per ${term}`}
      >
        {children ? (
          children
        ) : (
          <HelpCircle className="w-3.5 h-3.5" />
        )}
      </button>

      {/* Tooltip Content Popover */}
      {isOpen && (
        <div
          ref={popoverRef}
          id={tooltipId}
          role="tooltip"
          className={`absolute z-50 w-72 sm:w-80 p-3.5 rounded-xl bg-slate-900/98 text-slate-100 border border-emerald-500/40 shadow-2xl shadow-black/80 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150 text-left ${positionClasses[position]}`}
          style={{ maxWidth: '90vw' }}
        >
          {/* Header with Term and Close Button */}
          <div className="flex items-start justify-between gap-2 pb-1.5 mb-1.5 border-b border-slate-800">
            <div className="flex items-center gap-1.5">
              <span className="p-1 rounded-md bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                <Info className="w-3.5 h-3.5" />
              </span>
              <span className="font-bold text-xs text-white tracking-wide">{term}</span>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
              className="text-slate-400 hover:text-white p-0.5 rounded hover:bg-slate-800 transition"
              aria-label="Chiudi spiegazione"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Definition text */}
          <p className="text-xs text-slate-200 leading-relaxed font-normal">
            {finalDefinition}
          </p>

          {/* Optional citizen helper footer */}
          {showCitizenBadge && (
            <div className="mt-2 pt-1.5 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-emerald-400 font-medium">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-emerald-400" /> Guida Cittadino Attiva
              </span>
              <span className="text-slate-500">PUMS Pisa</span>
            </div>
          )}
        </div>
      )}
    </span>
  );
}
