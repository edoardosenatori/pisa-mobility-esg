import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  ComposedChart, 
  Line, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { 
  ESG_DIMENSIONS, 
  HISTORICAL_CO2_SERIES, 
  MUNICIPAL_TARGETS 
} from '../../data/mockEsgData';
import EsgCard from '../ui/EsgCard';
import ProgressBar from '../ui/ProgressBar';
import DataSourceBadge from '../ui/DataSourceBadge';
import InfoTooltip from '../ui/InfoTooltip';
import { 
  TrendingUp, 
  Award, 
  Target, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowUpRight, 
  Info, 
  Sparkles, 
  Calendar, 
  Layers, 
  FileCheck, 
  ShieldAlert,
  HelpCircle,
  BookOpen,
  Play,
  MapPin,
  Bike,
  TreePine,
  Accessibility,
  Flame,
  Activity
} from 'lucide-react';

export default function ExecutiveView({ 
  onNavigateToMap, 
  onNavigateToAnalyst, 
  onInspectMetric, 
  liveAirQuality,
  citizenGuide = false,
  onStartTour
}) {
  const [selectedDimension, setSelectedDimension] = useState('environmental');
  const [chartMetric, setChartMetric] = useState('co2');

  const totalCo2Evitata = HISTORICAL_CO2_SERIES.reduce((acc, curr) => acc + curr.co2Evitata, 0);
  const totalTargetPums = HISTORICAL_CO2_SERIES.reduce((acc, curr) => acc + curr.targetPUMS, 0);
  const surplusCo2 = totalCo2Evitata - totalTargetPums;
  const surplusPercentage = ((surplusCo2 / totalTargetPums) * 100).toFixed(1);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* 1. HERO SECTION DINAMICA GLASSMORPHISM */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900/95 via-slate-900/90 to-blue-950/60 p-6 sm:p-8 border border-slate-700/70 shadow-2xl backdrop-blur-2xl">
        {/* Subtle Ambient Glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> PUMS Pisa 2020-2030 • Smart City Control Room
              </span>
              <DataSourceBadge
                status="REAL_LIVE"
                customLabel="Sensori IoT & Open-Meteo"
                onClick={() => onInspectMetric && onInspectMetric('air_quality_pisa')}
              />
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Pisa Mobility & ESG Dashboard
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Monitoraggio in tempo reale di traffico dolce, accessibilità e aria pulita sull'Asse Pilota.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => onStartTour && onStartTour()}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-xl shadow-emerald-950/60 border border-emerald-400/40 transition transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Avvia Tour Guidato (1 min)</span>
              </button>

              <button
                type="button"
                onClick={onNavigateToMap}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 hover:text-white border border-slate-600/70 transition transform hover:-translate-y-0.5 cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-blue-400" />
                <span>Esplora Mappa Asse Pilota</span>
              </button>
            </div>
          </div>

          {/* Quick Header Widget */}
          <div className="hidden xl:flex flex-col gap-2.5 bg-slate-950/80 p-4 rounded-2xl border border-slate-800 text-xs min-w-[220px]">
            <div className="flex items-center justify-between text-slate-400 font-medium">
              <span>Indice Sintetico ESG:</span>
              <span className="font-bold text-emerald-400 text-sm">84.8 / 100</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500 to-blue-500 h-full w-[85%]" />
            </div>
            <p className="text-[11px] text-slate-400">
              Traiettoria PNRR M2C2 pienamente conforme.
            </p>
          </div>
        </div>

        {/* 3 ANIMATED QUICK NUMBERS BADGES */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-6 pt-6 border-t border-slate-800/80">
          
          {/* Quick Number 1: CO2 Risparmiata */}
          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-emerald-500/30 flex items-center gap-3.5 backdrop-blur-md">
            <div className="p-2.5 rounded-xl bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 shrink-0">
              <TreePine className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <span>CO₂ Risparmiata</span>
                <InfoTooltip term="CO2 Evitata" showCitizenBadge={citizenGuide} />
              </div>
              <div className="text-xl font-black text-white">1.420 t</div>
              <span className="text-[10px] font-bold text-emerald-400">+14.8% vs Target PUMS</span>
            </div>
          </div>

          {/* Quick Number 2: Fermate Accessibili */}
          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-blue-500/30 flex items-center gap-3.5 backdrop-blur-md">
            <div className="p-2.5 rounded-xl bg-blue-950/80 text-blue-400 border border-blue-800/60 shrink-0">
              <Accessibility className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <span>Fermate Accessibili</span>
                <InfoTooltip term="PEBA / IAU" showCitizenBadge={citizenGuide} />
              </div>
              <div className="text-xl font-black text-white">74.2%</div>
              <span className="text-[10px] font-bold text-blue-400">142 banchine a norma PEBA</span>
            </div>
          </div>

          {/* Quick Number 3: Bici Transitano Oggi */}
          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-purple-500/30 flex items-center gap-3.5 backdrop-blur-md">
            <div className="p-2.5 rounded-xl bg-purple-950/80 text-purple-400 border border-purple-800/60 shrink-0">
              <Bike className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <span>Transiti Bici Oggi</span>
                <InfoTooltip term="Modal Split" showCitizenBadge={citizenGuide} />
              </div>
              <div className="text-xl font-black text-white">14.500+</div>
              <span className="text-[10px] font-bold text-purple-400">Rilevati su Asse Pilota</span>
            </div>
          </div>

        </div>
      </div>

      {/* SECTION 1: 4 ESG CARDS (WITH CITIZEN SUBTITLES AND TOOLTIPS) */}
      <div id="tour-esg-cards">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-400" />
              <span>Le 4 Dimensioni ESG (Environmental, Social, Economic, Governance)</span>
            </h3>
            <p className="text-xs text-slate-400">
              Clicca sui badge per ispezionare l'origine dei dati e tocca l'icona (?) per la spiegazione accessibile
            </p>
          </div>
          <div className="text-xs text-slate-400 hidden sm:flex items-center gap-3">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span> Conforme (#10B981)</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span> In Monitoraggio (#F59E0B)</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span> Critico (#EF4444)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {Object.values(ESG_DIMENSIONS).map((dimension) => (
            <EsgCard
              key={dimension.id}
              dimension={dimension}
              isSelected={selectedDimension === dimension.id}
              onClick={() => setSelectedDimension(dimension.id)}
              onInspectMetric={onInspectMetric}
              liveAirQuality={liveAirQuality}
              citizenGuide={citizenGuide}
            />
          ))}
        </div>
      </div>

      {/* SECTION 2: 12-MONTH HISTORICAL CHART & MUNICIPAL TARGETS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Col (7/12): 12-Month CO2 Historical Trend Chart */}
        <div className="lg:col-span-7 bg-slate-800/60 p-6 rounded-2xl border border-slate-700/60 backdrop-blur-xl shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-700/50">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                  <span>Serie Storica: CO₂ Evitata vs Target PUMS</span>
                </h3>
                <InfoTooltip term="CO2 Evitata" showCitizenBadge={citizenGuide} />
                <DataSourceBadge
                  status="REAL_CALCULATED"
                  size="xs"
                  onClick={() => onInspectMetric && onInspectMetric('co2_factors_ispra')}
                />
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {citizenGuide 
                  ? "Ogni mese monitoriamo quante emissioni nocive abbiamo risparmiato rispetto all'obiettivo del Comune."
                  : "Modello matematico basato su fattori di emissione ISPRA (0.135 kg CO₂/km)"}
              </p>
            </div>

            {/* Toggle metriche grafico */}
            <div className="flex items-center bg-slate-900/80 p-1 rounded-lg border border-slate-700/60 text-xs">
              <button
                onClick={() => setChartMetric('co2')}
                className={`px-3 py-1 rounded-md font-medium transition ${
                  chartMetric === 'co2'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Emissioni CO₂
              </button>
              <button
                onClick={() => setChartMetric('modal')}
                className={`px-3 py-1 rounded-md font-medium transition flex items-center gap-1 ${
                  chartMetric === 'modal'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>Modal Split %</span>
                <InfoTooltip term="Modal Split" showCitizenBadge={citizenGuide} />
              </button>
            </div>
          </div>

          {/* Recharts Chart */}
          <div className="h-72 sm:h-80 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              {chartMetric === 'co2' ? (
                <ComposedChart data={HISTORICAL_CO2_SERIES} margin={{ top: 10, right: 15, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCo2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                  <XAxis dataKey="month" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 11 }} unit=" t" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderColor: '#334155',
                      borderRadius: '0.75rem',
                      color: '#f8fafc',
                      fontSize: '12px',
                      boxShadow: '0 10px 25px -5px rgba(0,0,0,0.5)'
                    }}
                    formatter={(val, name) => [
                      `${val} t CO₂`,
                      name === 'co2Evitata' ? 'CO₂ Evitata Effettiva (Modello ISPRA)' : 'Target Obiettivo PUMS'
                    ]}
                  />
                  <Legend
                    verticalAlign="top"
                    height={36}
                    wrapperStyle={{ fontSize: '12px', color: '#cbd5e1' }}
                    formatter={(value) => (
                      <span className="text-slate-300 font-medium">
                        {value === 'co2Evitata' ? 'CO₂ Evitata Effettiva (Modello ISPRA)' : 'Traiettoria Obiettivo PUMS'}
                      </span>
                    )}
                  />
                  <Area
                    type="monotone"
                    dataKey="co2Evitata"
                    name="co2Evitata"
                    stroke="#10B981"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorCo2)"
                  />
                  <Line
                    type="monotone"
                    dataKey="targetPUMS"
                    name="targetPUMS"
                    stroke="#F59E0B"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ r: 4, fill: '#F59E0B' }}
                  />
                </ComposedChart>
              ) : (
                <ComposedChart data={HISTORICAL_CO2_SERIES} margin={{ top: 10, right: 15, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorModal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                  <XAxis dataKey="month" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 11 }} unit="%" domain={[20, 35]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderColor: '#334155',
                      borderRadius: '0.75rem',
                      color: '#f8fafc',
                      fontSize: '12px'
                    }}
                    formatter={(val) => [`${val}%`, 'Quota Spostamenti Sostenibili (Modal Split)']}
                  />
                  <Legend
                    verticalAlign="top"
                    height={36}
                    wrapperStyle={{ fontSize: '12px' }}
                    formatter={() => (
                      <span className="text-blue-300 font-medium">
                        Modal Split: Quota Mobilità Dolce & Elettrica (%)
                      </span>
                    )}
                  />
                  <Area
                    type="monotone"
                    dataKey="quotaDolce"
                    stroke="#3B82F6"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorModal)"
                  />
                </ComposedChart>
              )}
            </ResponsiveContainer>
          </div>

          {/* Quick Insights Footer */}
          <div className="pt-3 border-t border-slate-700/50 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-300 gap-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Performance cumulativa: <strong>+140 t CO₂</strong> rispetto agli obiettivi del piano.</span>
            </div>
            <button
              onClick={onNavigateToAnalyst}
              className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 transition cursor-pointer"
            >
              Approfondisci flussi <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Col (5/12): Municipal PUMS Target Progress Bars */}
        <div className="lg:col-span-5 bg-slate-800/60 p-6 rounded-2xl border border-slate-700/60 backdrop-blur-xl shadow-xl flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-700/50 mb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-400" />
                  <span>Obiettivi Comunali PUMS 2026</span>
                </h3>
                <p className="text-xs text-slate-400">
                  {citizenGuide ? "Stato di avanzamento dei cantieri e delle nuove piste ciclabili a Pisa" : "Stato di attuazione delle opere e transizione modale programmata"}
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-800/50">
                Media: 85.0%
              </span>
            </div>

            {/* List of Progress Bars */}
            <div className="space-y-3">
              {MUNICIPAL_TARGETS.map((target) => (
                <ProgressBar key={target.id} target={target} />
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-700/50 flex items-center justify-between text-xs">
            <span className="text-slate-400">Delibera Giunta Comunale n. 42/2021</span>
            <button
              onClick={onNavigateToMap}
              className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 transition cursor-pointer"
            >
              Visualizza su Mappa <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
