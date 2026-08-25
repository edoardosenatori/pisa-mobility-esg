import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { HelpCircle, X, Sparkles, Info } from 'lucide-react';

export const DATA_DICTIONARY = {
  'PEBA / IAU': "Piano Eliminazione Barriere Architettoniche. Misura fermate bus e marciapiedi utilizzabili in autonomia da persone in sedia a rotelle, anziani o con passeggini.",
  'PEBA': "Piano Eliminazione Barriere Architettoniche. Misura fermate bus e marciapiedi utilizzabili in autonomia da persone in sedia a rotelle, anziani o con passeggini.",
  'IAU': "Indice di Accessibilità Urbana. Percentuale di percorsi e fermate conformi agli standard di accessibilità per utenze deboli e disabili.",
  'CO2 Evitata': "Emissioni climalteranti risparmiate grazie allo spostamento su bici, bus o a piedi al posto dell'auto termica privata.",
  'Modal Split': "Percentuale di viaggi effettuati con modalità sostenibili rispetto al totale complessivo dei veicoli rilevati.",
  'PM10 / NO2': "Particolato e biossido di azoto. Valori sotto le soglie indicano aria salubre e pieno rispetto dei limiti sanitari UE.",
  'PM10': "Particolato atmosferico con diametro inferiore a 10 micrometri. Limite normativo UE: 50 µg/m³ di media giornaliera.",
  'GBFS / GTFS': "Standard aperti internazionali per la trasmissione in tempo reale dei dati di trasporto pubblico (orari, ritardi) e micromobilità condivisa.",
  'GBFS': "General Bikeshare Feed Specification. Standard open data per consultare in tempo reale disponibilità di bici e stalli sharing.",
  'GTFS': "General Transit Feed Specification. Standard mondiale per orari, percorsi e posizioni GPS in tempo reale del trasporto pubblico su gomma.",
  'SLA Risoluzione (IRS)': "Tempo medio garantito dal Comune di Pisa e PisaMo per prendere in carico e riparare i guasti o le barriere segnalate dai cittadini.",
  'IRS': "Indice di Risoluzione Segnalazioni. Percentuale di anomalie e barriere civiche chiuse con esito positivo.",
  'PUMS': "Piano Urbano della Mobilità Sostenibile (2020-2030). Strumento strategico del Comune di Pisa per incentivare la mobilità attiva e ridurre il traffico.",
  'ROI Sociale': "Ritorno sull'Investimento Sociale: stima del beneficio economico, sanitario e ambientale generato per la collettività per ogni euro speso in mobilità dolce."
};

export default function InfoTooltip({ 
  term, 
  definition, 
  children, 
  className = '', 
  showCitizenBadge = false
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0, placement: 'top' });
  const triggerRef = useRef(null);
  const popoverRef = useRef(null);
  const timeoutRef = useRef(null);

  const tooltipId = `tooltip-${term ? term.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase() : Math.random().toString(36).substring(2, 9)}`;
  const finalDefinition = definition || DATA_DICTIONARY[term] || DATA_DICTIONARY[Object.keys(DATA_DICTIONARY).find(k => term && term.includes(k))] || "Parametro istituzionale del monitoraggio PUMS del Comune di Pisa.";

  // Calculate coordinates with boundary detection and auto-flip
  const updatePosition = () => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const tooltipWidth = Math.min(320, window.innerWidth - 32);
    const tooltipHeight = 160; // Estimated height

    let placement = 'top';
    let top = rect.top - 10; // place above
    let left = rect.left + rect.width / 2 - tooltipWidth / 2;

    // Flip to bottom if not enough space on top
    if (rect.top < tooltipHeight + 20) {
      placement = 'bottom';
      top = rect.bottom + 10;
    }

    // Horizontal boundary clamping
    if (left < 16) {
      left = 16;
    } else if (left + tooltipWidth > window.innerWidth - 16) {
      left = window.innerWidth - tooltipWidth - 16;
    }

    setCoords({ top, left, width: tooltipWidth, placement });
  };

  const handleOpen = (e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    updatePosition();
    setIsOpen(true);
  };

  const handleToggle = (e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    if (isOpen) {
      setIsOpen(false);
    } else {
      updatePosition();
      setIsOpen(true);
    }
  };

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      updatePosition();
      setIsOpen(true);
    }, 150);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(false);
  };

  // Close on outside click or escape key or window resize/scroll
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

    function handleScrollOrResize() {
      updatePosition();
    }

    document.addEventListener('mousedown', handleClickOutside, true);
    document.addEventListener('touchstart', handleClickOutside, true);
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleScrollOrResize);
    window.addEventListener('scroll', handleScrollOrResize, true);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true);
      document.removeEventListener('touchstart', handleClickOutside, true);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleScrollOrResize);
      window.removeEventListener('scroll', handleScrollOrResize, true);
    };
  }, [isOpen]);

  return (
    <span className={`inline-flex items-center align-middle ${className}`}>
      <button
        ref={triggerRef}
        type="button"
        onClick={handleToggle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleOpen}
        onBlur={() => setIsOpen(false)}
        aria-describedby={isOpen ? tooltipId : undefined}
        aria-expanded={isOpen}
        className="inline-flex items-center justify-center p-1 rounded-full text-slate-400 hover:text-emerald-400 hover:bg-slate-800/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 transition-colors cursor-pointer"
        title={`Spiegazione per ${term}`}
      >
        {children ? (
          children
        ) : (
          <HelpCircle className="w-3.5 h-3.5" />
        )}
      </button>

      {/* Render via React Portal directly into document.body to prevent clipping */}
      {isOpen && typeof document !== 'undefined' && createPortal(
        <div
          ref={popoverRef}
          id={tooltipId}
          role="tooltip"
          onClick={(e) => e.stopPropagation()}
          className="fixed z-[99999] p-3.5 rounded-xl bg-slate-900/98 text-slate-100 border border-emerald-500/50 shadow-2xl shadow-black/90 backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-150 text-left pointer-events-auto"
          style={{
            top: coords.placement === 'top' ? 'auto' : `${coords.top}px`,
            bottom: coords.placement === 'top' ? `${window.innerHeight - coords.top}px` : 'auto',
            left: `${coords.left}px`,
            width: `${coords.width}px`,
            maxWidth: 'calc(100vw - 32px)'
          }}
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
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
              aria-label="Chiudi spiegazione"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Definition text */}
          <p className="text-xs text-slate-200 leading-relaxed font-normal">
            {finalDefinition}
          </p>

          {/* Citizen Helper Footer */}
          {showCitizenBadge && (
            <div className="mt-2 pt-1.5 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-emerald-400 font-medium">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-emerald-400" /> Guida Cittadino Attiva
              </span>
              <span className="text-slate-500">PUMS Pisa</span>
            </div>
          )}
        </div>,
        document.body
      )}
    </span>
  );
}
