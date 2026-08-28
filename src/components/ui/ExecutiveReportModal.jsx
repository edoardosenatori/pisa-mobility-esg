import React, { useRef } from 'react';
import { 
  X, 
  Printer, 
  Download, 
  FileText, 
  ShieldCheck, 
  Leaf, 
  Users, 
  Euro, 
  Landmark, 
  Target, 
  Award, 
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { ESG_DIMENSIONS, HISTORICAL_CO2_SERIES, MUNICIPAL_TARGETS } from '../../data/mockEsgData';

export default function ExecutiveReportModal({ isOpen, onClose, liveAirQuality, liveWeather }) {
  const printAreaRef = useRef(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const currentDate = new Date().toLocaleDateString('it-IT', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      
      {/* Container Dialog */}
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Action Header (Hidden in Print) */}
        <div className="p-4 bg-slate-800/90 border-b border-slate-700 flex items-center justify-between gap-3 shrink-0 print:hidden">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-950 text-blue-400 border border-blue-800">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Report Esecutivo A4 per la Giunta Comunale</h3>
              <p className="text-xs text-slate-400">Anteprima di stampa e salvataggio in formato PDF</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-950/50 border border-blue-400/40 transition cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Stampa / Salva PDF</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body (A4 Styled) */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 bg-slate-950 print:bg-white print:text-black print:p-0 print:m-0">
          
          <div ref={printAreaRef} className="max-w-3xl mx-auto space-y-6 text-slate-100 print:text-black">
            
            {/* 1. Institutional Document Header */}
            <div className="flex items-start justify-between pb-5 border-b-2 border-red-600 print:border-red-700">
              <div className="flex items-center gap-4">
                {/* Pisa Crest */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-white shadow-md print:bg-red-700 shrink-0">
                  <svg className="w-9 h-9" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="8">
                    <path d="M50 15 L50 85 M15 50 L85 50" />
                    <circle cx="50" cy="15" r="5" fill="currentColor" />
                    <circle cx="50" cy="85" r="5" fill="currentColor" />
                    <circle cx="15" cy="50" r="5" fill="currentColor" />
                    <circle cx="85" cy="50" r="5" fill="currentColor" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white print:text-black">
                    COMUNE DI PISA
                  </h1>
                  <p className="text-xs font-semibold text-slate-400 print:text-slate-700 uppercase tracking-wider">
                    Direzione Mobilità Urbana, Smart City & Transizione Ecologica
                  </p>
                  <p className="text-[11px] text-slate-400 print:text-slate-600">
                    Piano Urbano della Mobilità Sostenibile (PUMS 2020-2030) • Delibera G.C. n. 42/2021
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className="inline-block px-3 py-1 rounded-lg bg-emerald-950/80 print:bg-emerald-100 text-emerald-300 print:text-emerald-900 border border-emerald-700/60 print:border-emerald-300 text-[11px] font-bold uppercase">
                  Conforme PNRR M2C2
                </div>
                <div className="text-[11px] text-slate-400 print:text-slate-600 mt-1">
                  Data: <strong>{currentDate}</strong>
                </div>
              </div>
            </div>

            {/* Document Title & Executive Overview */}
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-white print:text-black uppercase tracking-wide">
                Relazione Esecutiva di Monitoraggio Performance ESG & Decarbonizzazione
              </h2>
              <p className="text-xs text-slate-300 print:text-slate-700 leading-relaxed">
                Il presente documento attesta i progressi quantitativi e qualitativi registrati dal Comune di Pisa nell'attuazione delle politiche di mobilità attiva, elettrificazione del TPL urbano ed eliminazione delle barriere architettoniche (PEBA) sull'Asse Pilota cittadino.
              </p>
            </div>

            {/* 2. ESG Scorecard Matrix (4 Dimensioni) */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 print:text-slate-800">
                1. Sintesi Indicatori delle 4 Dimensioni ESG
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {Object.values(ESG_DIMENSIONS).map((dim) => (
                  <div key={dim.id} className="p-3 rounded-xl bg-slate-900 print:bg-slate-100 border border-slate-800 print:border-slate-300">
                    <div className="flex items-center justify-between text-[10px] text-slate-400 print:text-slate-600">
                      <span className="font-bold">{dim.code}</span>
                      <span className="text-emerald-400 print:text-emerald-700 font-bold">● {dim.semaphore.label}</span>
                    </div>
                    <div className="text-lg font-black text-white print:text-black mt-1">
                      {dim.primaryMetric.value}
                    </div>
                    <div className="text-[10px] text-slate-300 print:text-slate-700 truncate">
                      {dim.primaryMetric.unit}
                    </div>
                    <div className="text-[10px] font-bold text-emerald-400 print:text-emerald-700 mt-1">
                      {dim.delta.value} vs 2025
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Dati Ambientali Live & Aria */}
            <div className="p-4 rounded-xl bg-slate-900 print:bg-slate-100 border border-slate-800 print:border-slate-300 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white print:text-black flex items-center gap-1.5">
                  <Leaf className="w-4 h-4 text-emerald-400 print:text-emerald-700" />
                  <span>2. Rilevazione Qualità dell'Aria a Pisa (Open-Meteo & Copernicus)</span>
                </h3>
                <span className="text-[10px] font-mono text-slate-400 print:text-slate-600">Coordinate: 43.7167 N, 10.4000 E</span>
              </div>
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 print:text-slate-600 text-[11px]">PM10 Attuale:</span>
                  <p className="font-bold text-white print:text-black">{liveAirQuality?.pm10 ?? '18.2'} µg/m³ (Limite UE: 50)</p>
                </div>
                <div>
                  <span className="text-slate-400 print:text-slate-600 text-[11px]">PM2.5:</span>
                  <p className="font-bold text-white print:text-black">{liveAirQuality?.pm25 ?? '10.5'} µg/m³ (Limite UE: 25)</p>
                </div>
                <div>
                  <span className="text-slate-400 print:text-slate-600 text-[11px]">Indice Qualità:</span>
                  <p className="font-bold text-emerald-400 print:text-emerald-700">{liveAirQuality?.aqiLabel ?? 'Buona (Fascia Verde)'}</p>
                </div>
              </div>
            </div>

            {/* 4. Municipal Targets Progress */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 print:text-slate-800">
                3. Stato Avanzamento Opere & Target Comunali PUMS
              </h3>
              <div className="space-y-2">
                {MUNICIPAL_TARGETS.map((t) => (
                  <div key={t.id} className="p-2.5 rounded-lg bg-slate-900 print:bg-slate-100 border border-slate-800 print:border-slate-300 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-white print:text-black">{t.title}</span>
                      <p className="text-[11px] text-slate-400 print:text-slate-600">Scadenza: {t.deadline} • Categoria: {t.category}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-emerald-400 print:text-emerald-700 text-sm">{t.percentage}%</span>
                      <p className="text-[10px] text-slate-400 print:text-slate-600">{t.current} / {t.target} {t.unit}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Institutional Signature Footer */}
            <div className="pt-6 border-t-2 border-slate-800 print:border-slate-300 flex items-end justify-between text-xs">
              <div>
                <p className="text-slate-400 print:text-slate-600 text-[11px]">Documento generato telematicamente da:</p>
                <p className="font-bold text-white print:text-black">Pisa Mobility & ESG Data Platform (PM-ESG)</p>
                <p className="text-[10px] font-mono text-slate-500">ID Certificato: DOC-PUMS-PSA-{Math.floor(100000 + Math.random() * 900000)}</p>
              </div>

              <div className="text-center w-56">
                <p className="text-[11px] text-slate-400 print:text-slate-600 mb-6">Il Dirigente Settore Mobilità e Smart City</p>
                <div className="border-b border-slate-600 print:border-black w-full mb-1"></div>
                <p className="text-[10px] font-semibold text-slate-400 print:text-slate-700">(Firma Digitale ai sensi del CAD)</p>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
