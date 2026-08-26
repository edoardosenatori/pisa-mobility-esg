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
  Compass
} from 'lucide-react';

export const TOUR_STEPS = [
  {
    id: 'step-header',
    tab: 'executive',
    targetId: 'tour-header-controls',
    title: '1. Dati Live & Switch Guida Cittadini',
    subtitle: 'Control Room Istituzionale',
    description: 'In cima trovi i dati reali in tempo reale della qualità dell\'aria a Pisa (PM10 / NO₂) da Open-Meteo & Copernicus. Puoi attivare lo switch "Guida alla Lettura" per visualizzare spiegazioni semplici pensate per i cittadini.',
    icon: Sparkles,
    badgeColor: 'text-emerald-400 bg-emerald-950 border-emerald-800'
  },
  {
    id: 'step-esg-cards',
    tab: 'executive',
    targetId: 'tour-esg-cards',
    title: '2. Le 4 Dimensioni ESG del PUMS',
    subtitle: 'Environmental, Social, Economic, Governance',
    description: 'Monitora la decarbonizzazione (t CO₂ evitate), l\'accessibilità delle fermate per persone con disabilità (PEBA 74.2%), il risparmio economico collettivo e l\'avanzamento del piano comunale con semafori conformità.',
    icon: Layers,
    badgeColor: 'text-blue-400 bg-blue-950 border-blue-800'
  },
  {
    id: 'step-map',
    tab: 'map',
    targetId: 'tour-map-section',
    title: '3. Mappa Territoriale & Flusso Traffico Live',
    subtitle: 'Asse Pilota Stazione ➔ Miracoli',
    description: 'Esplora le piste ciclabili reali di Pisa snappate su OpenStreetMap, gli stalli di bike sharing Ciclopi, le banchine PEBA e il nuovo Layer Traffico con velocità auto vs bici e vista Satellitare HD.',
    icon: MapPin,
    badgeColor: 'text-purple-400 bg-purple-950 border-purple-800'
  },
  {
    id: 'step-analyst',
    tab: 'analyst',
    targetId: 'tour-analyst-section',
    title: '4. Grafico Bivariato: Bici vs Bus TPL',
    subtitle: 'Analisi dei Flussi di Mobilità Dolce',
    description: 'Scopri la correlazione oraria: durante i picchi di mobilità ciclabile (ore 8:00 e 18:00), la congestione e la saturazione dei bus urbani LAM diminuiscono sensibilmente liberando spazio urbano.',
    icon: BarChart3,
    badgeColor: 'text-amber-400 bg-amber-950 border-amber-800'
  },
  {
    id: 'step-opendata',
    tab: 'opendata',
    targetId: 'tour-opendata-section',
    title: '5. Segnalazioni Civiche & Open Data',
    subtitle: 'Partecipazione Attiva & Trasparenza',
    description: 'Invia segnalazioni certificate su barriere architettoniche PEBA con GPS simulato e protocollo telematico, e scarica liberamente i cataloghi dati certificati in formato CSV o JSON (CC-BY 4.0).',
    icon: Database,
    badgeColor: 'text-emerald-400 bg-emerald-950 border-emerald-800'
  }
];

export default function OnboardingTour({ 
  isOpen, 
  onClose, 
  currentStepIndex, 
  onStepChange, 
  onSetActiveTab 
}) {
  const [highlightStyle, setHighlightStyle] = useState(null);

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

  // Position the highlight box over the target element
  useEffect(() => {
    if (!isOpen) return;

    const updateHighlight = () => {
      const targetEl = document.getElementById(step.targetId);
      if (targetEl) {
        const rect = targetEl.getBoundingClientRect();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });

        setHighlightStyle({
          top: `${Math.max(10, rect.top - 8)}px`,
          left: `${Math.max(10, rect.left - 8)}px`,
          width: `${rect.width + 16}px`,
          height: `${rect.height + 16}px`,
        });
      } else {
        setHighlightStyle(null);
      }
    };

    const timer = setTimeout(updateHighlight, 300);
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
    <div className="fixed inset-0 z-[100000] flex items-end sm:items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
      
      {/* Target Element Spotlight Ring (if target found) */}
      {highlightStyle && (
        <div
          className="fixed pointer-events-none rounded-3xl border-2 border-emerald-400 ring-4 ring-emerald-400/30 shadow-[0_0_50px_rgba(16,185,129,0.45)] transition-all duration-500 ease-out z-[100001]"
          style={highlightStyle}
        />
      )}

      {/* Floating Tour Guide Dialog Card */}
      <div 
        role="dialog"
        aria-modal="true"
        className="relative z-[100002] w-full max-w-lg bg-slate-900/95 border border-emerald-500/50 rounded-3xl p-6 shadow-2xl shadow-black/90 backdrop-blur-2xl text-slate-100 animate-in zoom-in-95 duration-200"
      >
        {/* Top Header with Step Counter & Close */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${step.badgeColor}`}>
              <StepIcon className="w-3.5 h-3.5" />
              <span>{step.subtitle}</span>
            </span>
            <span className="text-xs font-semibold text-slate-400">
              Step {currentStepIndex + 1} di {TOUR_STEPS.length}
            </span>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-slate-800 transition cursor-pointer"
            title="Chiudi tour (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="w-full bg-slate-800 h-1.5 rounded-full my-4 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-emerald-500 to-blue-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${((currentStepIndex + 1) / TOUR_STEPS.length) * 100}%` }}
          />
        </div>

        {/* Content */}
        <div className="space-y-2.5 my-3">
          <h3 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>{step.title}</span>
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed font-normal">
            {step.description}
          </p>
        </div>

        {/* Step Indicator Dots */}
        <div className="flex items-center justify-center gap-1.5 py-2">
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
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-800 mt-2">
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-semibold text-slate-400 hover:text-slate-200 px-3 py-2 rounded-xl transition cursor-pointer"
          >
            Salta Tour
          </button>

          <div className="flex items-center gap-2">
            {!isFirstStep && (
              <button
                type="button"
                onClick={() => onStepChange(currentStepIndex - 1)}
                className="flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition cursor-pointer"
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
  );
}
