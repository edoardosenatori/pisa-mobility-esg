import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  Bike, 
  Car, 
  Coins, 
  TreePine, 
  Zap, 
  Flame, 
  Sparkles, 
  ArrowRight, 
  MapPin, 
  Info,
  Calendar
} from 'lucide-react';
import InfoTooltip from './InfoTooltip';
import DataSourceBadge from './DataSourceBadge';

export const PISA_COMMUTER_ROUTES = [
  { id: 'stazione-fibonacci', name: 'Stazione FS ➔ Polo Fibonacci (UniPi)', distanceKm: 2.2, type: 'Studenti / Lavoro' },
  { id: 'stazione-miracoli', name: 'Stazione FS ➔ Piazza dei Miracoli (Torre)', distanceKm: 2.0, type: 'Turisti / Centro' },
  { id: 'cisanello-centro', name: 'Ospedale Cisanello ➔ Ponte di Mezzo', distanceKm: 4.5, type: 'Pendolari / Sanità' },
  { id: 'lucca-ingegneria', name: 'Porta a Lucca ➔ Polo Ingegneria', distanceKm: 2.8, type: 'Studenti' },
  { id: 'stazione-cisanello', name: 'Stazione Centrale ➔ Cisanello Uffici', distanceKm: 4.2, type: 'Pendolari TPL' }
];

export default function EcoCalculatorWidget({ citizenGuide = false }) {
  const [selectedRouteId, setSelectedRouteId] = useState('stazione-fibonacci');
  const [daysPerWeek, setDaysPerWeek] = useState(5);
  const [transportMode, setTransportMode] = useState('bike'); // 'bike' | 'sharing' | 'walk' | 'bus'

  const selectedRoute = PISA_COMMUTER_ROUTES.find(r => r.id === selectedRouteId) || PISA_COMMUTER_ROUTES[0];

  // Calculations based on ISPRA & ACI Pisa Parameters
  const results = useMemo(() => {
    const kmRoundTrip = selectedRoute.distanceKm * 2;
    const totalWeeksPerYear = 44; // Working/university weeks
    const totalKmPerYear = kmRoundTrip * daysPerWeek * totalWeeksPerYear;

    // Cost parameters
    const costPerKmCar = 0.22; // ACI car running cost (fuel + wear)
    const parkingSavingsPerDay = 2.50; // Average blue zone parking saved in Pisa
    const annualSavingsEuros = (totalKmPerYear * costPerKmCar) + (daysPerWeek * totalWeeksPerYear * parkingSavingsPerDay);

    // CO2 Parameters (ISPRA: 0.135 kg CO2/km car)
    const annualCo2SavedKg = totalKmPerYear * 0.135;
    const treesEquivalent = (annualCo2SavedKg / 20).toFixed(1); // 1 tree absorbs ~20kg CO2/year

    // Health / Calorie Parameters (~30 kcal/km bike, ~55 kcal/km walk)
    const kcalPerKm = transportMode === 'walk' ? 55 : 30;
    const annualKcalBurned = Math.round(totalKmPerYear * kcalPerKm);

    return {
      totalKmPerYear: Math.round(totalKmPerYear),
      annualSavingsEuros: Math.round(annualSavingsEuros),
      monthlySavingsEuros: (annualSavingsEuros / 12).toFixed(2),
      annualCo2SavedKg: Math.round(annualCo2SavedKg),
      treesEquivalent,
      annualKcalBurned
    };
  }, [selectedRoute, daysPerWeek, transportMode]);

  return (
    <div id="tour-eco-calculator" className="bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-emerald-950/40 p-6 sm:p-7 rounded-3xl border border-emerald-500/40 shadow-2xl backdrop-blur-2xl space-y-6">
      
      {/* Widget Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-700/60">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5 shadow-sm">
              <Calculator className="w-3.5 h-3.5 text-emerald-400" /> Calcolatore Risparmio Personale per Cittadini
            </span>
            <DataSourceBadge
              status="REAL_CALCULATED"
              customLabel="Parametri ISPRA & ACI 2026"
              onClick={() => window.open('https://fetransp.isprambiente.it/', '_blank')}
            />
            <InfoTooltip term="CO2 Evitata" showCitizenBadge={citizenGuide} />
          </div>
          <h3 className="text-xl font-black text-white tracking-tight mt-1">
            Quanto Risparmi Scegliendo la Mobilità Attiva a Pisa?
          </h3>
          <p className="text-xs text-slate-300 mt-0.5">
            Inserisci il tuo tragitto quotidiano e calcola il risparmio economico e l'impronta di carbonio evitata rispetto all'auto privata.
          </p>
        </div>
      </div>

      {/* Input Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* 1. Select Commuter Route */}
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" /> Tragitto Quotidiano a Pisa
          </label>
          <select
            value={selectedRouteId}
            onChange={(e) => setSelectedRouteId(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
          >
            {PISA_COMMUTER_ROUTES.map((route) => (
              <option key={route.id} value={route.id}>
                {route.name} ({route.distanceKm} km)
              </option>
            ))}
          </select>
          <p className="text-[11px] text-slate-400 mt-1">
            Distanza A/R: <strong>{(selectedRoute.distanceKm * 2).toFixed(1)} km/giorno</strong> ({selectedRoute.type})
          </p>
        </div>

        {/* 2. Days per week */}
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-blue-400" /> Frequenza Settimanale
          </label>
          <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-700">
            {[1, 2, 3, 4, 5, 6, 7].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setDaysPerWeek(num)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  daysPerWeek === num 
                    ? 'bg-emerald-600 text-white shadow-sm' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {num}d
              </button>
            ))}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            <strong>{daysPerWeek} giorni</strong> su 7 alla settimana
          </p>
        </div>

        {/* 3. Transport Choice */}
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Bike className="w-3.5 h-3.5 text-purple-400" /> Mezzo Sostenibile
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            <button
              type="button"
              onClick={() => setTransportMode('bike')}
              className={`p-2 rounded-xl text-xs font-semibold border text-center transition cursor-pointer ${
                transportMode === 'bike' ? 'bg-emerald-950 text-emerald-300 border-emerald-500 shadow-sm' : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              🚲 Bici Propria
            </button>
            <button
              type="button"
              onClick={() => setTransportMode('sharing')}
              className={`p-2 rounded-xl text-xs font-semibold border text-center transition cursor-pointer ${
                transportMode === 'sharing' ? 'bg-blue-950 text-blue-300 border-blue-500 shadow-sm' : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              ⚡ Ciclopi Sharing
            </button>
          </div>
        </div>

      </div>

      {/* Dynamic Calculated Results Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        
        {/* Result 1: Money Saved */}
        <div className="bg-slate-950/80 p-4 rounded-2xl border border-emerald-500/40 flex items-start gap-3.5">
          <div className="p-3 rounded-xl bg-emerald-950/90 text-emerald-400 border border-emerald-800 shrink-0">
            <Coins className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Risparmio Economico
            </span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 tracking-tight mt-0.5">
              € {results.annualSavingsEuros.toLocaleString('it-IT')}<span className="text-xs text-slate-300 font-medium">/anno</span>
            </div>
            <p className="text-[11px] text-emerald-300/80 mt-1">
              Circa <strong>€ {results.monthlySavingsEuros}/mese</strong> risparmiati in benzina e parcheggio.
            </p>
          </div>
        </div>

        {/* Result 2: CO2 Avoided */}
        <div className="bg-slate-950/80 p-4 rounded-2xl border border-blue-500/40 flex items-start gap-3.5">
          <div className="p-3 rounded-xl bg-blue-950/90 text-blue-400 border border-blue-800 shrink-0">
            <TreePine className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Emissioni CO₂ Evitate
            </span>
            <div className="text-2xl sm:text-3xl font-black text-blue-400 tracking-tight mt-0.5">
              {results.annualCo2SavedKg.toLocaleString('it-IT')} kg<span className="text-xs text-slate-300 font-medium">/anno</span>
            </div>
            <p className="text-[11px] text-blue-300/80 mt-1">
              Equivale a <strong>{results.treesEquivalent} alberi piantati</strong> a Pisa.
            </p>
          </div>
        </div>

        {/* Result 3: Fitness & Health */}
        <div className="bg-slate-950/80 p-4 rounded-2xl border border-purple-500/40 flex items-start gap-3.5">
          <div className="p-3 rounded-xl bg-purple-950/90 text-purple-400 border border-purple-800 shrink-0">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Salute & Calorie
            </span>
            <div className="text-2xl sm:text-3xl font-black text-purple-400 tracking-tight mt-0.5">
              {results.annualKcalBurned.toLocaleString('it-IT')} kcal
            </div>
            <p className="text-[11px] text-purple-300/80 mt-1">
              <strong>{results.totalKmPerYear.toLocaleString('it-IT')} km</strong> di attività fisica attiva all'anno.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
