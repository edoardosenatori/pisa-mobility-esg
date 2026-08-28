import React, { useState } from 'react';
import { 
  WEATHER_SCENARIOS, 
  calculatePredictiveImpact 
} from '../../services/predictiveTrafficService';
import InfoTooltip from './InfoTooltip';
import DataSourceBadge from './DataSourceBadge';
import { 
  Cpu, 
  CloudSun, 
  CloudRain, 
  Sun, 
  CloudLightning, 
  TrendingUp, 
  TrendingDown, 
  Car, 
  Bike, 
  Bus, 
  AlertTriangle, 
  Sparkles, 
  SlidersHorizontal 
} from 'lucide-react';

export default function PredictiveTrafficBanner({ liveWeather, citizenGuide = false }) {
  const [selectedScenario, setSelectedScenario] = useState('live');

  const impact = calculatePredictiveImpact(liveWeather, selectedScenario);

  const iconMap = {
    CloudSun,
    Sun,
    CloudRain,
    CloudLightning
  };

  return (
    <div className="bg-gradient-to-r from-slate-900/95 via-slate-800/90 to-purple-950/40 p-5 sm:p-6 rounded-3xl border border-purple-500/40 shadow-2xl backdrop-blur-2xl space-y-4">
      
      {/* Header with Title & Scenario Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-3 border-b border-slate-700/60">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1.5 shadow-sm">
              <Cpu className="w-3.5 h-3.5 text-purple-400" /> AI Predictive Traffic Engine
            </span>
            <DataSourceBadge
              status="REAL_CALCULATED"
              customLabel="Modello O/D PUMS & Open-Meteo"
            />
            <InfoTooltip term="Modal Split" showCitizenBadge={citizenGuide} />
          </div>
          <h3 className="text-lg sm:text-xl font-black text-white tracking-tight mt-1 flex items-center gap-2">
            <span>Previsione Impatto Meteo sul Traffico Urbano</span>
          </h3>
          <p className="text-xs text-slate-300 mt-0.5">
            Stima in tempo reale del trasferimento modale verso auto o bici in base alle precipitazioni e alle condizioni atmosferiche.
          </p>
        </div>

        {/* Interactive Scenario Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800">
          {Object.values(WEATHER_SCENARIOS).map((sc) => {
            const Icon = iconMap[sc.icon] || CloudSun;
            const isActive = selectedScenario === sc.id;

            return (
              <button
                key={sc.id}
                type="button"
                onClick={() => setSelectedScenario(sc.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-950/50 border border-purple-400/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
                }`}
                title={sc.description}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{sc.id === 'live' ? 'Live Pisa' : sc.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Predictive KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        
        {/* KPI 1: Variazione Auto su Lungarni */}
        <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <Car className="w-3.5 h-3.5 text-rose-400" /> Auto Lungarni
            </span>
            <span className={`font-bold ${impact.carIncreaseRaw > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
              {impact.carIncreasePercent}
            </span>
          </div>
          <div className="text-xl font-black text-white mt-1">
            {impact.lungarnoSpeedCar}
          </div>
          <div className="text-[10px] text-slate-400 mt-1">
            Vel. media stimata
          </div>
        </div>

        {/* KPI 2: Variazione Ciclabilità */}
        <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <Bike className="w-3.5 h-3.5 text-emerald-400" /> Quota Bici
            </span>
            <span className={`font-bold ${impact.bikeVariationRaw > 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
              {impact.bikeVariationPercent}
            </span>
          </div>
          <div className="text-xl font-black text-white mt-1">
            {impact.lungarnoSpeedBike}
          </div>
          <div className="text-[10px] text-slate-400 mt-1">
            Vel. media stimata
          </div>
        </div>

        {/* KPI 3: Saturazione Bus LAM */}
        <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <Bus className="w-3.5 h-3.5 text-blue-400" /> Saturazione LAM
            </span>
            <span className={`font-bold ${impact.busSaturationRaw > 85 ? 'text-rose-400' : 'text-blue-400'}`}>
              {impact.busSaturation}
            </span>
          </div>
          <div className="text-xl font-black text-white mt-1">
            {impact.busSaturationRaw > 85 ? 'Critica' : 'Regolare'}
          </div>
          <div className="text-[10px] text-slate-400 mt-1">
            Grado riempimento bus
          </div>
        </div>

        {/* KPI 4: Ritardo Auto Stimato */}
        <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>Ritardo Veicolare</span>
            <AlertTriangle className={`w-3.5 h-3.5 ${impact.alertLevel === 'high' ? 'text-rose-400' : impact.alertLevel === 'medium' ? 'text-amber-400' : 'text-emerald-400'}`} />
          </div>
          <div className={`text-xl font-black mt-1 ${impact.alertLevel === 'high' ? 'text-rose-400' : impact.alertLevel === 'medium' ? 'text-amber-400' : 'text-emerald-400'}`}>
            {impact.delayMinutesCar}
          </div>
          <div className="text-[10px] text-slate-400 mt-1 truncate">
            {impact.alertTitle}
          </div>
        </div>

      </div>

      {/* Citizen AI Mobility Tip */}
      <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-500/30 text-xs text-purple-200 flex items-start gap-2.5">
        <Sparkles className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <strong className="font-bold text-white">Raccomandazione AI Smart City:</strong>
          <p className="text-purple-200/90">{impact.citizenTip}</p>
        </div>
      </div>

    </div>
  );
}
