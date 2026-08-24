import React, { useState, useMemo } from 'react';
import { 
  ResponsiveContainer, 
  ComposedChart, 
  Line, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  Area 
} from 'recharts';
import { ANALYST_HOURLY_DATA } from '../../data/mockEsgData';
import { exportToCSV, exportToJSON } from '../../utils/exportUtils';
import DataSourceBadge from '../ui/DataSourceBadge';
import InfoTooltip from '../ui/InfoTooltip';
import { 
  Filter, 
  Users, 
  Calendar, 
  Activity, 
  Download, 
  ArrowUpRight, 
  Bus, 
  Bike, 
  Clock, 
  Gauge, 
  Flame, 
  Info,
  SlidersHorizontal,
  FileSpreadsheet,
  Terminal,
  Sparkles
} from 'lucide-react';

export default function AnalystView({ onInspectMetric, citizenGuide = false }) {
  const [userTarget, setUserTarget] = useState('all');
  const [timeRange, setTimeRange] = useState('today');
  const [showSpeedTrend, setShowSpeedTrend] = useState(true);

  const activeHourlyData = useMemo(() => {
    return ANALYST_HOURLY_DATA[userTarget] || ANALYST_HOURLY_DATA.all;
  }, [userTarget]);

  const stats = useMemo(() => {
    const totalBici = activeHourlyData.reduce((acc, curr) => acc + curr.biciCount, 0);
    const avgSaturation = (activeHourlyData.reduce((acc, curr) => acc + curr.busSaturation, 0) / activeHourlyData.length).toFixed(1);
    const maxBiciHour = [...activeHourlyData].sort((a, b) => b.biciCount - a.biciCount)[0];
    const maxBusHour = [...activeHourlyData].sort((a, b) => b.busSaturation - a.busSaturation)[0];
    const avgSpeed = (activeHourlyData.reduce((acc, curr) => acc + curr.avgSpeedBus, 0) / activeHourlyData.length).toFixed(1);

    return { totalBici, avgSaturation, maxBiciHour, maxBusHour, avgSpeed };
  }, [activeHourlyData]);

  const targetLabels = {
    all: 'Tutti gli Utenti (Dataset Consolidato)',
    studenti: 'Studenti Universitari (Polo Fibonacci / Ingegneria / Centro)',
    turisti: 'Turisti (Asse Stazione ➔ Miracoli)',
    pendolari: 'Pendolari & Lavoratori (Stazione FS ➔ Cisanello / Uffici)'
  };

  const handleExportCSV = () => {
    exportToCSV(activeHourlyData, `analyst_bivariate_${userTarget}_${timeRange}.csv`);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Banner & Analytical Filters */}
      <div className="bg-slate-800/70 p-6 rounded-2xl border border-slate-700/70 backdrop-blur-xl shadow-xl space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                Data Science & Traffic Analytics
              </span>
              <DataSourceBadge
                status="VIRTUAL_PUMS"
                customLabel="Modello O/D & ISPRA"
                onClick={() => onInspectMetric && onInspectMetric('bike_counters_inductive_loops')}
              />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
              Analisi Bivariata: Flussi Ciclabili vs Saturazione TPL
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl mt-1">
              Correlazione oraria tra passaggi ciclabili e grado di riempimento bus LAM. I dati attuali sono basati sulle matrici O/D del PUMS e sui fattori ISPRA; clicca sul badge per visualizzare la procedura di connessione alle spire reali Eco-Counter e ai feed GTFS-RT Autolinee Toscane.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
            <button
              onClick={() => onInspectMetric && onInspectMetric('bus_tpl_saturation')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-purple-900/40 text-purple-300 border border-purple-700/50 hover:bg-purple-800/60 hover:text-white transition shadow-sm"
            >
              <Terminal className="w-3.5 h-3.5" /> Requisiti GTFS-RT
            </button>
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-700/40 text-emerald-300 border border-emerald-600/50 hover:bg-emerald-600 hover:text-white transition shadow-sm"
            >
              <Download className="w-4 h-4" /> Esporta CSV
            </button>
          </div>
        </div>

        {/* Dropdown Filters Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 pt-4 border-t border-slate-700/60 items-center">
          
          {/* Target Filter Dropdown */}
          <div className="lg:col-span-6 space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-blue-400" />
              <span>Target / Segmento Utente:</span>
            </label>
            <select
              value={userTarget}
              onChange={(e) => setUserTarget(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition cursor-pointer"
            >
              <option value="all">👥 Tutti gli Utenti (Dataset Consolidato)</option>
              <option value="studenti">🎓 Studenti Universitari (Polo Fibonacci / Ingegneria)</option>
              <option value="turisti">📸 Turisti (Stazione FS ➔ Miracoli / Lungarni)</option>
              <option value="pendolari">💼 Pendolari & Lavoratori (Stazione FS ➔ Cisanello)</option>
            </select>
          </div>

          {/* Timeframe Filter Dropdown */}
          <div className="lg:col-span-4 space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              <span>Intervallo Temporale:</span>
            </label>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 transition cursor-pointer"
            >
              <option value="today">📅 Oggi (Dati orari in tempo reale)</option>
              <option value="7days">📊 Ultimi 7 Giorni (Media oraria)</option>
              <option value="month">🗓️ Mese Corrente (Agosto 2026)</option>
              <option value="quarter">📈 Ultimo Trimestre (Q2-Q3 2026)</option>
            </select>
          </div>

          {/* Speed overlay toggle */}
          <div className="lg:col-span-2 flex items-end h-full pt-4 sm:pt-0">
            <label className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/60 border border-slate-700/60 w-full cursor-pointer hover:border-slate-600 transition">
              <input
                type="checkbox"
                checked={showSpeedTrend}
                onChange={(e) => setShowSpeedTrend(e.target.checked)}
                className="w-4 h-4 text-amber-500 rounded bg-slate-950 border-slate-700 focus:ring-0 cursor-pointer"
              />
              <span className="text-xs text-slate-300 font-medium">Overlay Vel. Bus</span>
            </label>
          </div>

        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 backdrop-blur-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Passaggi Bici Giornalieri</span>
            <Bike className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white">{stats.totalBici.toLocaleString('it-IT')}</div>
          <div className="text-[11px] text-emerald-400 mt-1">
            Picco alle {stats.maxBiciHour.hour} ({stats.maxBiciHour.biciCount} passaggi)
          </div>
        </div>

        <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 backdrop-blur-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Saturazione Media TPL</span>
            <Bus className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-black text-white">{stats.avgSaturation}%</div>
          <div className="text-[11px] text-blue-400 mt-1">
            Picco alle {stats.maxBusHour.hour} ({stats.maxBusHour.busSaturation}%)
          </div>
        </div>

        <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 backdrop-blur-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Velocità Commerciale Bus</span>
            <Gauge className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-white">{stats.avgSpeed} km/h</div>
          <div className="text-[11px] text-amber-400 mt-1">
            Minima {Math.min(...activeHourlyData.map(d => d.avgSpeedBus))} km/h
          </div>
        </div>

        <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 backdrop-blur-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Indice Intermodalità</span>
            <Activity className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-white">84.5 / 100</div>
          <div className="text-[11px] text-purple-400 mt-1">
            Elevata sinergia Bici + TPL
          </div>
        </div>

      </div>

      {/* Main Interactive Bivariate Chart */}
      <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700/60 backdrop-blur-xl shadow-xl space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-700/50">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-400" />
              <span>Correlazione Bivariata Oraria (06:00 - 23:00)</span>
            </h3>
            <p className="text-xs text-slate-400">
              Asse Y Sinistro: <strong>Passaggi Bici (Verde)</strong> • Asse Y Destro: <strong>Saturazione Bus % (Blu)</strong> {showSpeedTrend && '• Linea Tratteggiata: Velocità Bus (Ambra)'}
            </p>
          </div>

          <div className="text-xs text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-700">
            Filtro Attivo: <strong className="text-white">{targetLabels[userTarget].split('(')[0]}</strong>
          </div>
        </div>

        {/* Recharts Bivariate Composed Chart */}
        <div className="h-80 sm:h-96 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={activeHourlyData} margin={{ top: 15, right: 20, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="colorBiciBar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.85}/>
                  <stop offset="95%" stopColor="#059669" stopOpacity={0.4}/>
                </linearGradient>
                <linearGradient id="colorBusLine" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
              <XAxis dataKey="hour" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              
              <YAxis 
                yAxisId="left" 
                orientation="left" 
                stroke="#10B981" 
                tick={{ fill: '#10B981', fontSize: 11 }}
                unit=" b"
              />
              
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                stroke="#3B82F6" 
                tick={{ fill: '#3B82F6', fontSize: 11 }}
                unit="%"
                domain={[0, 100]}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '0.75rem',
                  color: '#f8fafc',
                  fontSize: '12px',
                  boxShadow: '0 10px 25px -5px rgba(0,0,0,0.5)'
                }}
                formatter={(val, name) => {
                  if (name === 'biciCount') return [`${val} passaggi`, 'Passaggi Bici (Spire IoT)'];
                  if (name === 'busSaturation') return [`${val}%`, 'Saturazione Bus TPL'];
                  if (name === 'avgSpeedBus') return [`${val} km/h`, 'Velocità Commerciale Bus'];
                  return [val, name];
                }}
              />

              <Legend 
                verticalAlign="top" 
                height={40}
                wrapperStyle={{ fontSize: '12px' }}
                formatter={(value) => (
                  <span className="text-slate-300 font-medium px-2">
                    {value === 'biciCount' ? 'Passaggi Bici Orari (Asse Sinistro)' : value === 'busSaturation' ? 'Saturazione Bus TPL % (Asse Destro)' : 'Velocità Commerciale Bus (km/h)'}
                  </span>
                )}
              />

              <Bar 
                yAxisId="left" 
                dataKey="biciCount" 
                name="biciCount" 
                fill="url(#colorBiciBar)" 
                radius={[4, 4, 0, 0]}
              />

              <Area 
                yAxisId="right" 
                type="monotone" 
                dataKey="busSaturation" 
                name="busSaturation" 
                stroke="#3B82F6" 
                strokeWidth={3} 
                fill="url(#colorBusLine)" 
              />

              {showSpeedTrend && (
                <Line 
                  yAxisId="left" 
                  type="monotone" 
                  dataKey="avgSpeedBus" 
                  name="avgSpeedBus" 
                  stroke="#F59E0B" 
                  strokeWidth={2} 
                  strokeDasharray="4 4"
                  dot={{ r: 3, fill: '#F59E0B' }}
                />
              )}
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Analytical takeaway alert */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700/60 text-xs text-slate-300 flex items-start gap-3">
          <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="text-white">Interpretazione Dinamiche di Flusso:</strong>
            <p>
              Nelle fasce orarie <strong>08:00-09:00</strong> e <strong>17:30-18:30</strong> la saturazione del TPL supera il <strong>90%</strong>. La disponibilità della ciclovia protetta sull'Asse Pilota assorbe fino al <strong>45% del carico modale potenziale</strong>, evitando la congestione critica dei bus LAM.
            </p>
          </div>
        </div>

      </div>

      {/* Hourly Breakdown Table */}
      <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700/60 backdrop-blur-xl shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-blue-400" />
              <span>Tabella Dettaglio Orario</span>
            </h3>
            <p className="text-xs text-slate-400">Valori puntuali registrati dai varchi e telemetrie di bordo</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-slate-300">
            <thead className="bg-slate-900/90 text-slate-400 uppercase font-semibold border-b border-slate-700">
              <tr>
                <th className="px-4 py-3">Fascia Oraria</th>
                <th className="px-4 py-3">Passaggi Bici (tot)</th>
                <th className="px-4 py-3">Saturazione Bus LAM</th>
                <th className="px-4 py-3">Velocità Media Bus</th>
                <th className="px-4 py-3">CO₂ Evitata Oraria</th>
                <th className="px-4 py-3">Stato Rete</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {activeHourlyData.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-700/30 transition">
                  <td className="px-4 py-2.5 font-bold text-white flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {row.hour}
                  </td>
                  <td className="px-4 py-2.5 font-semibold text-emerald-400">{row.biciCount} passaggi</td>
                  <td className="px-4 py-2.5">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      row.busSaturation >= 85 ? 'bg-rose-950 text-rose-400 border border-rose-800' : row.busSaturation >= 65 ? 'bg-amber-950 text-amber-400 border border-amber-800' : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                    }`}>
                      {row.busSaturation}%
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-slate-300">{row.avgSpeedBus} km/h</td>
                  <td className="px-4 py-2.5 text-emerald-300 font-medium">~{row.co2Hourly} kg CO₂</td>
                  <td className="px-4 py-2.5">
                    {row.busSaturation >= 90 ? (
                      <span className="text-rose-400 flex items-center gap-1">● Picco Congestione</span>
                    ) : row.busSaturation >= 70 ? (
                      <span className="text-amber-400 flex items-center gap-1">● Traffico Sostenuto</span>
                    ) : (
                      <span className="text-emerald-400 flex items-center gap-1">● Flusso Fluido</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
