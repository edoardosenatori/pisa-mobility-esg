import React, { useEffect, useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  X, 
  CheckCircle2, 
  MapPin, 
  Layers, 
  BarChart3, 
  Database, 
  ShieldCheck,
  Play,
  HelpCircle,
  Compass,
  Cpu,
  Calculator,
  ExternalLink
} from 'lucide-react';

export const TOUR_STEPS = [
  {
    id: 'step-header',
    tab: 'executive',
    subTab: 'esg',
    targetId: 'tour-header-controls',
    title: '1. Dati Live Copernicus & Switch Cittadini',
    subtitle: 'Control Room Istituzionale',
    description: 'In cima trovi i dati reali in tempo reale della qualità dell\'aria a Pisa (PM10 / NO₂) da Open-Meteo & Copernicus (cliccabili per aprire la fonte ufficiale). Attiva lo switch "Guida alla Lettura" per spiegazioni divulgative.',
    icon: Sparkles,
    badgeColor: 'text-emerald-400 bg-emerald-950 border-emerald-800'
  },
  {
    id: 'step-esg-cards',
    tab: 'executive',
    subTab: 'esg',
    targetId: 'tour-esg-cards',
    title: '2. Le 4 Dimensioni ESG del PUMS',
    subtitle: 'Environmental, Social, Economic, Governance',
    description: 'Monitora la decarbonizzazione (t CO₂ evitate con modello ISPRA), l\'accessibilità delle fermate per persone con disabilità (PEBA 74.2%), il risparmio economico e i semafori di conformità per la Giunta.',
    icon: Layers,
    badgeColor: 'text-blue-400 bg-blue-950 border-blue-800'
  },
  {
    id: 'step-predictive-traffic',
    tab: 'executive',
    subTab: 'simulator',
    targetId: 'tour-predictive-traffic',
    title: '3. Simulatore Predittivo Meteo-Traffico (Modello PUMS)',
    subtitle: 'Modello Statistico PUMS per i Lungarni',
    description: 'Simula in tempo reale come il meteo di Pisa impatta la viabilità: seleziona "Pioggia Moderata" (+28% auto) o "Maltempo" (+42.5% auto) per stimare il trasferimento modale, la saturazione dei bus LAM e i consigli orari per i cittadini.',
    icon: Cpu,
    badgeColor: 'text-purple-400 bg-purple-950 border-purple-800'
  },
  {
    id: 'step-map',
    tab: 'map',
    targetId: 'tour-map-section',
    title: '4. Mappa Territoriale & Flusso Traffico Live',
    subtitle: 'Asse Pilota Stazione ➔ Miracoli',
    description: 'Esplora le piste ciclabili reali di Pisa snappate al millimetro su OpenStreetMap, gli stalli di bike sharing Ciclopi, le banchine PEBA e il layer traffico veicolare con vista Satellitare HD.',
    icon: MapPin,
    badgeColor: 'text-emerald-400 bg-emerald-950 border-emerald-800'
  },
  {
    id: 'step-analyst',
    tab: 'analyst',
    targetId: 'tour-analyst-section',
    title: '5. Grafico Bivariato: Bici vs Bus TPL',
    subtitle: 'Analisi dei Flussi di Mobilità Dolce',
    description: 'Scopri la correlazione oraria: durante i picchi di mobilità ciclabile (ore 8:00 e 18:00), la congestione e la saturazione dei bus urbani LAM diminuiscono sensibilmente liberando spazio urbano.',
    icon: BarChart3,
    badgeColor: 'text-amber-400 bg-amber-950 border-amber-800'
  },
  {
    id: 'step-eco-calculator',
    tab: 'opendata',
    targetId: 'tour-eco-calculator',
    title: '6. Calcolatore Risparmio Personale Cittadini',
    subtitle: 'Strumento di Calcolo Tratte Pisane',
    description: 'Inserisci il tuo tragitto quotidiano (es. Stazione FS ➔ Polo Fibonacci) per calcolare istantaneamente gli euro risparmiati all\'anno (parametri ACI), i kg di CO₂ evitati (ISPRA) e gli alberi equivalenti.',
    icon: Calculator,
    badgeColor: 'text-teal-400 bg-teal-950 border-teal-800'
  },
  {
    id: 'step-opendata',
    tab: 'opendata',
    targetId: 'tour-opendata-section',
    title: '7. Segnalazioni Civiche PEBA & Open Data',
    subtitle: 'Partecipazione Attiva & Trasparenza',
    description: 'Invia segnalazioni certificate su barriere architettoniche con geolocalizzazione GPS e protocollo telematico, ed esporta liberamente i dataset in formato CSV o JSON (CC-BY 4.0).',
    icon: Database,
    badgeColor: 'text-blue-400 bg-blue-950 border-blue-800'
  }
];

export default function OnboardingTour({ 
  isOpen, 
  onClose, 
  currentStepIndex, 
  onStepChange, 
  onSetActiveTab 
}) {
  const [highlightRect, setHighlightRect] = useState(null);

  const step = TOUR_STEPS[currentStepIndex] || TOUR_STEPS[0];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === TOUR_STEPS.length - 1;
  const StepIcon = step.icon || Sparkles;

  // Sync tab & subTab when step changes
  useEffect(() => {
    if (!isOpen) return;
    if (step && step.tab) {
      onSetActiveTab(step.tab);
    }
    // Dispatch custom event for sub-tab synchronization across views
    window.dispatchEvent(new CustomEvent('pm-esg-tour-step', { 
      detail: { 
        tab: step?.tab, 
        subTab: step?.subTab, 
        targetId: step?.targetId 
      } 
    }));
  }, [currentStepIndex, isOpen, step]);

  // Position the spotlight cutout over the target element & track during smooth scroll
  useEffect(() => {
    if (!isOpen) return;

    let animId = null;
    let isTracking = true;

    const updateHighlight = (shouldScroll = false) => {
      const targetEl = document.getElementById(step.targetId);
      if (targetEl) {
        const rect = targetEl.getBoundingClientRect();

        // If element is hidden or not rendered yet (width 0 or height 0), don't draw a broken 16x16 box
        if (rect.width === 0 || rect.height === 0) {
          setHighlightRect(null);
          return;
        }

        if (shouldScroll) {
          const isMobile = window.innerWidth < 768;
          if (isMobile) {
            // On mobile, align near top with clearance for sticky header so target isn't covered by bottom dialog
            const headerOffset = 75;
            const elementPosition = rect.top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
              top: Math.max(0, offsetPosition),
              behavior: 'smooth'
            });
          } else {
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }

        const screenW = Math.min(window.innerWidth || 390, document.documentElement?.clientWidth || 390);
        const leftPadding = 8;
        const adjustedLeft = Math.max(leftPadding, rect.left - 4);
        const maxWidthAllowed = Math.max(40, screenW - adjustedLeft - leftPadding);
        const adjustedWidth = Math.min(maxWidthAllowed, rect.width + 8);

        setHighlightRect({
          top: Math.max(8, rect.top - 4),
          left: adjustedLeft,
          width: adjustedWidth,
          height: rect.height + 8,
        });
      } else {
        setHighlightRect(null);
      }
    };

    // Delay slightly to let React render any subTab changes, then scroll and track
    const initialTimer = setTimeout(() => {
      updateHighlight(true);

      const start = Date.now();
      const loop = () => {
        if (!isTracking) return;
        updateHighlight(false);
        if (Date.now() - start < 650) {
          animId = requestAnimationFrame(loop);
        }
      };
      animId = requestAnimationFrame(loop);
    }, 120);

    const onScrollOrResize = () => updateHighlight(false);
    window.addEventListener('resize', onScrollOrResize, { passive: true });
    window.addEventListener('scroll', onScrollOrResize, { passive: true });

    return () => {
      isTracking = false;
      clearTimeout(initialTimer);
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('resize', onScrollOrResize);
      window.removeEventListener('scroll', onScrollOrResize);
    };
  }, [currentStepIndex, isOpen, step]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        if (!isLastStep) onStepChange(currentStepIndex + 1);
        else onClose();
      } else if (e.key === 'ArrowLeft') {
        if (!isFirstStep) onStepChange(currentStepIndex - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentStepIndex, isFirstStep, isLastStep]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100000] pointer-events-none animate-in fade-in duration-200 overflow-hidden max-w-[100vw]">
      
      {/* 1. CUTOUT SVG SPOTLIGHT MASK (ZERO BLUR, UNLOCKED SCROLL FOR USER) */}
      <svg 
        className="fixed inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 100000 }}
      >
        <defs>
          <mask id="tour-spotlight-mask">
            {/* White everywhere (dimmed overlay) */}
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            
            {/* Transparent Cutout Hole for target (black in mask = clear hole) */}
            {highlightRect && (
              <rect
                x={highlightRect.left}
                y={highlightRect.top}
                width={highlightRect.width}
                height={highlightRect.height}
                rx="20"
                ry="20"
                fill="black"
                className="transition-all duration-300 ease-out"
              />
            )}
          </mask>
        </defs>

        {/* Semi-transparent dark background (NO BLUR, background remains clear and legible) */}
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="rgba(5, 10, 25, 0.72)"
          mask="url(#tour-spotlight-mask)"
        />
      </svg>

      {/* 2. EMERALD GLOWING SPOTLIGHT BORDER OVER THE TARGET ELEMENT */}
      {highlightRect && (
        <div
          className="fixed pointer-events-none rounded-2xl border-2 border-emerald-400 ring-4 ring-emerald-400/35 shadow-[0_0_40px_rgba(16,185,129,0.5)] transition-all duration-300 ease-out"
          style={{
            top: `${highlightRect.top}px`,
            left: `${highlightRect.left}px`,
            width: `${highlightRect.width}px`,
            height: `${highlightRect.height}px`,
            zIndex: 100001
          }}
        />
      )}

      {/* 3. FLOATING TOUR DIALOG CARD (RESPONSIVE DOCKED WITH SAFE AREA & SCROLLABLE CONTENT) */}
      <div 
        className="fixed inset-x-0 bottom-[max(env(safe-area-inset-bottom,0px),0.75rem)] sm:bottom-8 flex justify-center px-3 sm:px-4 pointer-events-auto w-full max-w-[100vw] box-border"
        style={{ zIndex: 100002 }}
      >
        <div 
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-[calc(100vw-1.5rem)] sm:max-w-xl bg-slate-900/98 border border-emerald-500/60 rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 shadow-2xl shadow-black/95 backdrop-blur-2xl text-slate-100 flex flex-col max-h-[min(480px,calc(100dvh-1.5rem))] sm:max-h-[80dvh] animate-in slide-in-from-bottom-4 duration-200 box-border overflow-hidden"
        >
          {/* Top Header with Step Counter & Close Button */}
          <div className="flex items-center justify-between pb-2.5 sm:pb-3 border-b border-slate-800 shrink-0 gap-2">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <span className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-bold border flex items-center gap-1.5 max-w-[210px] sm:max-w-none shrink truncate ${step.badgeColor}`}>
                <StepIcon className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{step.subtitle}</span>
              </span>
              <span className="text-[11px] sm:text-xs font-bold text-slate-400 shrink-0">
                Step {currentStepIndex + 1} di {TOUR_STEPS.length}
              </span>
            </div>

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-slate-800 transition cursor-pointer shrink-0"
              title="Chiudi tour (Esc)"
              aria-label="Chiudi tour"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Step Progress Bar */}
          <div className="w-full bg-slate-800 h-1.5 rounded-full my-2 sm:my-3 overflow-hidden shrink-0">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-blue-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${((currentStepIndex + 1) / TOUR_STEPS.length) * 100}%` }}
            />
          </div>

          {/* Text Content (Never cut off: flexible scroll if needed) */}
          <div className="space-y-1 my-1 sm:my-2 overflow-y-auto max-h-[32vh] sm:max-h-none pr-1 scrollbar-thin scrollbar-thumb-slate-700">
            <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight flex items-center gap-2">
              <span>{step.title}</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              {step.description}
            </p>
          </div>

          {/* Step Indicator Dots */}
          <div className="flex items-center justify-center gap-1.5 py-1 shrink-0">
            {TOUR_STEPS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => onStepChange(idx)}
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentStepIndex 
                    ? 'w-5 sm:w-6 bg-emerald-400' 
                    : 'w-1.5 sm:w-2 bg-slate-700 hover:bg-slate-500'
                }`}
                title={`Vai a step ${idx + 1}`}
              />
            ))}
          </div>

          {/* Action Controls */}
          <div className="flex items-center justify-between gap-2 pt-2.5 sm:pt-3 border-t border-slate-800 mt-1 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="text-xs font-semibold text-slate-400 hover:text-slate-200 px-2 py-1.5 rounded-xl transition cursor-pointer"
            >
              Salta Tour
            </button>

            <div className="flex items-center gap-2">
              {!isFirstStep && (
                <button
                  type="button"
                  onClick={() => onStepChange(currentStepIndex - 1)}
                  className="flex items-center gap-1 px-3 py-1.5 sm:py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Indietro
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  if (isLastStep) {
                    onClose();
                  } else {
                    onStepChange(currentStepIndex + 1);
                  }
                }}
                className="flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 text-white shadow-lg shadow-emerald-950/50 border border-emerald-400/40 transition cursor-pointer"
              >
                {isLastStep ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" /> Esplora Dashboard
                  </>
                ) : (
                  <>
                    <span>Avanti</span> <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
