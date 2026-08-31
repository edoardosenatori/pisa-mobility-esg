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
    targetId: 'tour-predictive-traffic',
    title: '3. Simulatore Predittivo AI Meteo-Traffico',
    subtitle: 'AI Smart City Engine per i Lungarni',
    description: 'Simula in tempo reale come il meteo di Pisa impatta la viabilità: seleziona "Pioggia Moderata" o "Maltempo" per stimare l\'aumento di auto sui Lungarni (+28% / +42%), la saturazione dei bus LAM e i consigli orari per i cittadini.',
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

  // Sync tab when step changes
  useEffect(() => {
    if (!isOpen) return;
    if (step && step.tab) {
      onSetActiveTab(step.tab);
    }
  }, [currentStepIndex, isOpen]);

  // Position the spotlight cutout over the target element
  useEffect(() => {
    if (!isOpen) return;

    const updateHighlight = () => {
      const targetEl = document.getElementById(step.targetId);
      if (targetEl) {
        const rect = targetEl.getBoundingClientRect();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });

        setHighlightRect({
          top: Math.max(10, rect.top - 8),
          left: Math.max(10, rect.left - 8),
          width: rect.width + 16,
          height: rect.height + 16,
        });
      } else {
        setHighlightRect(null);
      }
    };

    const timer = setTimeout(updateHighlight, 350);
    window.addEventListener('resize', updateHighlight);
    window.addEventListener('scroll', updateHighlight);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateHighlight);
      window.removeEventListener('scroll', updateHighlight);
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
    <div className="fixed inset-0 z-[100000] pointer-events-none animate-in fade-in duration-200">
      
      {/* 1. CUTOUT SVG SPOTLIGHT MASK (ZERO BLUR, 100% SHARP TARGET ELEMENT) */}
      <svg 
        className="fixed inset-0 w-full h-full pointer-events-auto"
        onClick={onClose}
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

      {/* 3. FLOATING TOUR DIALOG CARD (DOCKED BOTTOM/CENTER) */}
      <div 
        className="fixed inset-x-0 bottom-6 sm:bottom-8 flex justify-center px-4 pointer-events-auto"
        style={{ zIndex: 100002 }}
      >
        <div 
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-xl bg-slate-900/98 border border-emerald-500/60 rounded-3xl p-5 sm:p-6 shadow-2xl shadow-black/95 backdrop-blur-2xl text-slate-100 animate-in slide-in-from-bottom-4 duration-200"
        >
          {/* Top Header with Step Counter & Close Button */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${step.badgeColor}`}>
                <StepIcon className="w-3.5 h-3.5" />
                <span>{step.subtitle}</span>
              </span>
              <span className="text-xs font-bold text-slate-400">
                Step {currentStepIndex + 1} di {TOUR_STEPS.length}
              </span>
            </div>

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-xl hover:bg-slate-800 transition cursor-pointer"
              title="Chiudi tour (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Step Progress Bar */}
          <div className="w-full bg-slate-800 h-1.5 rounded-full my-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-blue-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${((currentStepIndex + 1) / TOUR_STEPS.length) * 100}%` }}
            />
          </div>

          {/* Text Content */}
          <div className="space-y-1.5 my-2.5">
            <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <span>{step.title}</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              {step.description}
            </p>
          </div>

          {/* Step Indicator Dots */}
          <div className="flex items-center justify-center gap-1.5 py-1.5">
            {TOUR_STEPS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => onStepChange(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentStepIndex 
                    ? 'w-6 bg-emerald-400' 
                    : 'w-2 bg-slate-700 hover:bg-slate-500'
                }`}
                title={`Vai a step ${idx + 1}`}
              />
            ))}
          </div>

          {/* Action Controls */}
          <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-800 mt-1">
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
                  className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition cursor-pointer"
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
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 text-white shadow-lg shadow-emerald-950/50 border border-emerald-400/40 transition cursor-pointer"
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
