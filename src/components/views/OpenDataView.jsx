import React, { useState, useEffect } from 'react';
import { 
  CITIZEN_METRICS, 
  OPEN_DATA_RECORDS, 
  INITIAL_CIVIC_REPORTS 
} from '../../data/mockEsgData';
import { 
  DATA_TRANSPARENCY_REGISTRY, 
  DATA_STATUS_TYPES 
} from '../../data/dataTransparencyRegistry';
import { exportToCSV, exportToJSON } from '../../utils/exportUtils';
import DataSourceBadge from '../ui/DataSourceBadge';
import InfoTooltip from '../ui/InfoTooltip';
import { 
  TreePine, 
  Zap, 
  Fuel, 
  Coins, 
  Download, 
  FileText, 
  Search, 
  Filter, 
  Send, 
  MapPin, 
  Camera, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Clock, 
  FileSpreadsheet,
  Building2,
  Share2,
  ExternalLink,
  MessageSquare,
  ShieldCheck,
  Terminal,
  HelpCircle,
  Cpu,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  CheckCircle,
  Bike,
  Wallet
} from 'lucide-react';

export default function OpenDataView({ onShowToast, onInspectMetric, citizenGuide = false }) {
  // Open Data Table State
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAsse, setFilterAsse] = useState('all');
  const [openDataList, setOpenDataList] = useState(OPEN_DATA_RECORDS);
  const [isTableExpanded, setIsTableExpanded] = useState(false);

  // Civic Reports State (Persistent in localStorage)
  const [civicReports, setCivicReports] = useState(() => {
    const saved = localStorage.getItem('pisa_civic_reports');
    return saved ? JSON.parse(saved) : INITIAL_CIVIC_REPORTS;
  });

  const [formData, setFormData] = useState({
    categoria: 'Barriera Architettonica PEBA',
    luogo: 'Ponte di Mezzo (Lungarno Pacinotti)',
    coordinate: '43.7166, 10.4019',
    descrizione: '',
    priorita: 'Media',
    emailContatto: ''
  });
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    localStorage.setItem('pisa_civic_reports', JSON.stringify(civicReports));
  }, [civicReports]);

  // Filtered Open Data Records
  const filteredRecords = openDataList.filter((rec) => {
    const matchesSearch = 
      rec.asse.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.fonte.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesAsse = filterAsse === 'all' || rec.asse.toLowerCase().includes(filterAsse.toLowerCase());

    return matchesSearch && matchesAsse;
  });

  const locationPresets = [
    { label: 'Ponte di Mezzo / Lungarni', coords: '43.7166, 10.4019' },
    { label: 'Stazione FS (Piazza Vitt. Emanuele)', coords: '43.7085, 10.3986' },
    { label: 'Polo Universitario Fibonacci', coords: '43.7196, 10.4075' },
    { label: 'Piazza dei Miracoli / Duomo', coords: '43.7230, 10.3966' },
    { label: 'Corso Italia Centro', coords: '43.7145, 10.4010' },
    { label: 'Piazza dei Cavalieri', coords: '43.7198, 10.4005' },
  ];

  const handleSimulateGPS = () => {
    const lat = (43.7166 + (Math.random() - 0.5) * 0.008).toFixed(4);
    const lng = (10.4019 + (Math.random() - 0.5) * 0.008).toFixed(4);
    setFormData(prev => ({
      ...prev,
      coordinate: `${lat}, ${lng}`,
      luogo: 'Posizione GPS Rilevata (Asse Pilota Pisa)'
    }));
    if (onShowToast) {
      onShowToast({
        type: 'info',
        title: 'Geolocalizzazione GPS Attiva',
        message: `Coordinate GPS acquisite: ${lat}, ${lng}`
      });
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitCivicReport = (e) => {
    e.preventDefault();
    if (!formData.descrizione.trim()) {
      if (onShowToast) {
        onShowToast({
          type: 'warning',
          title: 'Campi Incompleti',
          message: 'Inserisci una breve descrizione della segnalazione.'
        });
      }
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newIdNum = Math.floor(1000 + Math.random() * 9000);
      const newReportId = `SEG-PSA-2026-${newIdNum}`;
      const newProtocol = `PROT-MOB-2026/${Math.floor(900 + Math.random() * 500)}`;

      const newReport = {
        id: newReportId,
        categoria: formData.categoria,
        luogo: formData.luogo,
        coordinate: formData.coordinate,
        dataOra: new Date().toLocaleString('it-IT', { dateStyle: 'short', timeStyle: 'short' }),
        descrizione: formData.descrizione,
        stato: 'Presa in Carico (Verifica Tecnica)',
        priorita: formData.priorita,
        protocollo: newProtocol,
        photo: photoPreview
      };

      setCivicReports([newReport, ...civicReports]);
      setIsSubmitting(false);

      setFormData({
        categoria: 'Barriera Architettonica PEBA',
        luogo: 'Ponte di Mezzo (Lungarno Pacinotti)',
        coordinate: '43.7166, 10.4019',
        descrizione: '',
        priorita: 'Media',
        emailContatto: ''
      });
      setPhotoPreview(null);

      if (onShowToast) {
        onShowToast({
          type: 'success',
          title: 'Segnalazione Civica Inviata con Successo!',
          message: `La segnalazione per "${newReport.categoria}" è stata salvata e protocollata.`,
          meta: `Protocollo Telematico: ${newProtocol} • ID: ${newReportId}`
        });
      }
    }, 600);
  };

  return (
    <div id="tour-opendata-section" className="space-y-10 animate-in fade-in duration-300">
      
      {/* 1. TOP SUMMARY CARDS (DIVULGATIVE AD ALTO IMPATTO CITTADINO) */}
      <div>
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Pisa Smart City • Servizi per la Cittadinanza
              </span>
              <DataSourceBadge
                status="REAL_CALCULATED"
                customLabel="Modello ACI & Statistiche Pisa"
                size="xs"
                onClick={() => onInspectMetric && onInspectMetric('co2_factors_ispra')}
              />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
              Impatto Diretto & Informazioni Utili per i Cittadini
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Card 1: Risparmio Pendolare Medio */}
          <div className="bg-gradient-to-br from-slate-800/90 to-emerald-950/40 p-5 rounded-2xl border border-emerald-500/30 shadow-xl backdrop-blur-xl group hover:border-emerald-500/60 transition">
            <div className="flex items-start justify-between">
              <div className="p-3 rounded-xl bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
                <Wallet className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold text-emerald-300 bg-emerald-900/60 px-2 py-0.5 rounded-full border border-emerald-700/50">
                Economia Famigliare
              </span>
            </div>
            <div className="mt-3.5">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Risparmio Pendolare Medio
              </span>
              <div className="text-3xl font-black text-white tracking-tight mt-0.5">
                142,50 €<span className="text-sm font-semibold text-emerald-400">/mese</span>
              </div>
              <p className="text-xs text-slate-300 mt-2 font-medium">
                Quanto risparmi lasciando l'auto a favore di TPL e bici.
              </p>
            </div>
          </div>

          {/* Card 2: Fasce Orarie Consigliate Bici */}
          <div className="bg-gradient-to-br from-slate-800/90 to-blue-950/40 p-5 rounded-2xl border border-blue-500/30 shadow-xl backdrop-blur-xl group hover:border-blue-500/60 transition">
            <div className="flex items-start justify-between">
              <div className="p-3 rounded-xl bg-blue-950/80 text-blue-400 border border-blue-800/60">
                <Bike className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold text-blue-300 bg-blue-900/60 px-2 py-0.5 rounded-full border border-blue-700/50">
                Consigli Mobilità
              </span>
            </div>
            <div className="mt-3.5">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <span>Fasce Orarie Consigliate Bici</span>
                <InfoTooltip term="Modal Split" showCitizenBadge={citizenGuide} />
              </span>
              <div className="text-3xl font-black text-white tracking-tight mt-0.5">
                10:00 - 12:00
              </div>
              <p className="text-xs text-slate-300 mt-2 font-medium">
                Orario con minor congestione su Lungarni e Ponte di Mezzo.
              </p>
            </div>
          </div>

          {/* Card 3: Stato Segnalazioni Barriere */}
          <div className="bg-gradient-to-br from-slate-800/90 to-purple-950/40 p-5 rounded-2xl border border-purple-500/30 shadow-xl backdrop-blur-xl group hover:border-purple-500/60 transition">
            <div className="flex items-start justify-between">
              <div className="p-3 rounded-xl bg-purple-950/80 text-purple-400 border border-purple-800/60">
                <CheckCircle className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold text-purple-300 bg-purple-900/60 px-2 py-0.5 rounded-full border border-purple-700/50 flex items-center gap-1">
                <span>SLA Comune di Pisa</span>
                <InfoTooltip term="SLA Risoluzione (IRS)" showCitizenBadge={citizenGuide} />
              </span>
            </div>
            <div className="mt-3.5">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <span>Stato Segnalazioni Barriere</span>
                <InfoTooltip term="PEBA / IAU" showCitizenBadge={citizenGuide} />
              </span>
              <div className="text-3xl font-black text-emerald-400 tracking-tight mt-0.5">
                88% Risolte
              </div>
              <p className="text-xs text-slate-300 mt-2 font-medium">
                Tempo medio di intervento: <strong>6 giorni lavorativi</strong>.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* 2. CITIZEN ENGAGEMENT IMPACT COUNTERS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 backdrop-blur-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="flex items-center gap-1">
              <span>Alberi Equivalenti</span>
              <InfoTooltip term="CO2 Evitata" showCitizenBadge={citizenGuide} />
            </span>
            <TreePine className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white">
            {CITIZEN_METRICS.treesEquivalent.toLocaleString('it-IT')}
          </div>
          <div className="text-[11px] text-emerald-400 mt-1">Capacità biologica assorbita</div>
        </div>

        <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 backdrop-blur-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="flex items-center gap-1">
              <span>Km Zero Emissioni</span>
              <InfoTooltip term="Modal Split" showCitizenBadge={citizenGuide} />
            </span>
            <Zap className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-black text-white">
            {(CITIZEN_METRICS.kmZeroEmissions / 1000000).toFixed(2)} M km
          </div>
          <div className="text-[11px] text-blue-400 mt-1">Spostamenti a piedi, bici e sharing</div>
        </div>

        <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 backdrop-blur-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="flex items-center gap-1">
              <span>Carburante Non Consumato</span>
              <InfoTooltip term="PM10 / NO2" showCitizenBadge={citizenGuide} />
            </span>
            <Fuel className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-white">
            {CITIZEN_METRICS.fuelSavedLiters.toLocaleString('it-IT')} L
          </div>
          <div className="text-[11px] text-amber-400 mt-1">Idrocarburi azzerati nei Lungarni</div>
        </div>

        <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 backdrop-blur-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Economia Civica</span>
            <Coins className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-white">
            € {(CITIZEN_METRICS.moneySavedCitizensEuros / 1000000).toFixed(2)} M
          </div>
          <div className="text-[11px] text-purple-400 mt-1">Meno carburante & sosta tariffata</div>
        </div>

      </div>

      {/* 3. COLLAPSIBLE TECHNICAL DATASET TABLE */}
      <div className="bg-slate-800/70 rounded-2xl border border-slate-700/70 backdrop-blur-xl shadow-xl overflow-hidden">
        
        {/* Accordion Header & Export Controls */}
        <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-800/90 border-b border-slate-700/60">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                Open Data Istituzionale (CC-BY 4.0)
              </span>
              <span className="text-xs text-slate-400">Dataset interoperabili Comune di Pisa</span>
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight mt-1 flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-blue-400" />
              <span>Catalogo Rilevazioni Mobilità & ESG Pisa</span>
            </h3>
          </div>

          {/* Export Buttons & Toggle Button */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={() => {
                exportToCSV(filteredRecords, 'pisa_pm_esg_opendata.csv');
                if (onShowToast) onShowToast({ type: 'success', title: 'Export Completato', message: 'File CSV scaricato con successo.' });
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition shadow-sm cursor-pointer"
              title="Scarica dati in CSV"
            >
              <Download className="w-3.5 h-3.5" /> Esporta CSV
            </button>

            <button
              onClick={() => {
                exportToJSON(filteredRecords, 'pisa_pm_esg_opendata.json');
                if (onShowToast) onShowToast({ type: 'success', title: 'Export Completato', message: 'File JSON scaricato con successo.' });
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition shadow-sm cursor-pointer"
              title="Scarica dati in JSON"
            >
              <Download className="w-3.5 h-3.5" /> Esporta JSON
            </button>

            {/* Accordion Expand/Collapse Trigger */}
            <button
              type="button"
              onClick={() => setIsTableExpanded(!isTableExpanded)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition border cursor-pointer ${
                isTableExpanded 
                  ? 'bg-slate-900 text-slate-200 border-slate-600' 
                  : 'bg-blue-950/80 text-blue-300 border-blue-700/60 hover:bg-blue-900/60'
              }`}
            >
              <span>{isTableExpanded ? 'Nascondi Tabella (12 Record)' : 'Mostra / Nascondi Tabella Dati Certificati Completa (12 Record)'}</span>
              {isTableExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Collapsible Content */}
        {isTableExpanded && (
          <div className="p-5 space-y-4 animate-in slide-in-from-top-2 duration-200">
            
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cerca asse, tipo sensore, fonte..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs text-slate-400 whitespace-nowrap">Filtra Asse:</span>
                <select
                  value={filterAsse}
                  onChange={(e) => setFilterAsse(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                  <option value="all">Tutti gli Assi</option>
                  <option value="Ponte di Mezzo">Ponte di Mezzo</option>
                  <option value="Stazione">Stazione FS / Corso Italia</option>
                  <option value="Fibonacci">Polo Fibonacci</option>
                  <option value="Miracoli">Piazza dei Miracoli</option>
                  <option value="Trammino">Ciclopista Trammino</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-700/80">
              <table className="w-full text-xs text-left text-slate-300">
                <thead className="bg-slate-900/90 text-slate-400 uppercase font-semibold border-b border-slate-700">
                  <tr>
                    <th className="px-4 py-3">ID Rilevazione</th>
                    <th className="px-4 py-3">Data</th>
                    <th className="px-4 py-3">Asse / Nodo Stradale</th>
                    <th className="px-4 py-3">Tipologia Misura</th>
                    <th className="px-4 py-3">Valore Misurato</th>
                    <th className="px-4 py-3">Target PUMS</th>
                    <th className="px-4 py-3">CO₂ Evitata</th>
                    <th className="px-4 py-3">Fonte / Validazione</th>
                    <th className="px-4 py-3">Stato</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {filteredRecords.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-700/30 transition">
                      <td className="px-4 py-3 font-mono font-bold text-blue-400">{row.id}</td>
                      <td className="px-4 py-3 text-slate-400">{row.data}</td>
                      <td className="px-4 py-3 font-semibold text-white">{row.asse}</td>
                      <td className="px-4 py-3 text-slate-300">{row.tipo}</td>
                      <td className="px-4 py-3 font-bold text-emerald-400">{row.valore}</td>
                      <td className="px-4 py-3 text-slate-400">{row.targetPums}</td>
                      <td className="px-4 py-3 text-slate-300">{row.co2EvitataKg !== 'N/A' ? `${row.co2EvitataKg} kg` : '-'}</td>
                      <td className="px-4 py-3 text-slate-400">{row.fonte}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800/60">
                          ✓ {row.stato}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <span>Mostrati <strong>{filteredRecords.length}</strong> record certificati su {openDataList.length}</span>
              <span className="flex items-center gap-1.5 text-blue-400">
                <Building2 className="w-3.5 h-3.5" /> API REST Endpoint: <code>/api/v1/mobility/pisa</code>
              </span>
            </div>

          </div>
        )}
      </div>

      {/* 4. TRANSPARENCY REGISTRY & REQUIREMENTS TABLE */}
      <div className="bg-slate-800/70 p-6 rounded-2xl border border-purple-500/40 backdrop-blur-xl shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-700/60">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Matrice di Trasparenza Istituzionale
              </span>
              <InfoTooltip term="GBFS / GTFS" showCitizenBadge={citizenGuide} />
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight mt-1">
              Registro di Provenienza Dati & Requisiti per Attivazione Reale
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Clicca su qualsiasi riga per aprire la specifica tecnica con ente proprietario, standard e passaggi operativi.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-700/80">
          <table className="w-full text-xs text-left text-slate-300">
            <thead className="bg-slate-900/90 text-slate-400 uppercase font-semibold border-b border-slate-700">
              <tr>
                <th className="px-4 py-3">Metrica / Flusso Dati</th>
                <th className="px-4 py-3">Vista Principale</th>
                <th className="px-4 py-3">Stato nel Cruscotto</th>
                <th className="px-4 py-3">Fonte Attuale / Standard Richiesto</th>
                <th className="px-4 py-3 text-right">Azione</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {DATA_TRANSPARENCY_REGISTRY.map((item) => {
                const isReal = item.status === 'REAL_LIVE' || item.status === 'REAL_CALCULATED';

                return (
                  <tr 
                    key={item.id} 
                    onClick={() => onInspectMetric && onInspectMetric(item.id)}
                    className="hover:bg-slate-700/40 cursor-pointer transition"
                  >
                    <td className="px-4 py-3 font-semibold text-white">
                      {item.name}
                    </td>
                    <td className="px-4 py-3 text-slate-400">{item.view}</td>
                    <td className="px-4 py-3">
                      <DataSourceBadge status={item.status} size="xs" />
                    </td>
                    <td className="px-4 py-3 text-slate-300">
                      {isReal ? (
                        <span className="font-mono text-emerald-400 text-[11px] truncate block max-w-xs">{item.currentSource}</span>
                      ) : (
                        <span className="font-mono text-purple-300 text-[11px]">{item.requirementsToMakeReal?.standard}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition flex items-center gap-1 justify-end">
                        <span>{isReal ? 'Info Fonte' : 'Requisiti Reali'}</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. CROWDSOURCING & CIVIC REPORTING FORM */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Form Column (6/12) */}
        <div className="lg:col-span-6 bg-slate-800/70 p-6 rounded-2xl border border-slate-700/70 backdrop-blur-xl shadow-xl space-y-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Partecipazione Civica Attiva
              </span>
              <InfoTooltip term="PEBA / IAU" showCitizenBadge={citizenGuide} />
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight mt-1 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-purple-400" />
              <span>Invia Segnalazione Civica (PEBA & Mobilità)</span>
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Segnala barriere architettoniche, anomalie su piste ciclabili o malfunzionamenti degli stalli sharing. La segnalazione viene memorizzata in locale e protocollata.
            </p>
          </div>

          <form onSubmit={handleSubmitCivicReport} className="space-y-4">
            
            {/* Category Dropdown */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Categoria Barriera / Anomalia *
              </label>
              <select
                value={formData.categoria}
                onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
                required
              >
                <option value="Barriera Architettonica PEBA">♿ Barriera Architettonica PEBA (Marciapiede / Banchina Bus)</option>
                <option value="Danno Manto Pista Ciclabile">🚲 Danno Manto / Buca su Pista Ciclabile</option>
                <option value="Stallo Sharing Critico">⚡ Stallo Sharing Guasto / Pieno / Esaurito</option>
                <option value="Ostacolo / Occupazione Indebita">🚫 Ostacolo o Veicolo su Corsia LOGES / Pedonale</option>
                <option value="Semaforo Non Funzionante">🚦 Dispositivo Acustico / Semaforo Non Funzionante</option>
              </select>
            </div>

            {/* Location & GPS */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Punto Territoriale & Coordinate GPS *
                </label>
                <button
                  type="button"
                  onClick={handleSimulateGPS}
                  className="text-[11px] text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 transition cursor-pointer"
                >
                  <MapPin className="w-3 h-3 text-blue-400" /> Simula GPS Reale
                </button>
              </div>

              {/* Preset buttons */}
              <div className="flex flex-wrap gap-1.5 mb-2">
                {locationPresets.map((loc, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setFormData({ ...formData, luogo: loc.label, coordinate: loc.coords })}
                    className="text-[10px] px-2 py-1 rounded bg-slate-900 hover:bg-slate-700 text-slate-300 border border-slate-700 transition cursor-pointer"
                  >
                    {loc.label.split('/')[0]}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={formData.luogo}
                  onChange={(e) => setFormData({ ...formData, luogo: e.target.value })}
                  placeholder="Nome via / Piazza"
                  className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
                <input
                  type="text"
                  value={formData.coordinate}
                  onChange={(e) => setFormData({ ...formData, coordinate: e.target.value })}
                  placeholder="Lat, Lng"
                  className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-emerald-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
            </div>

            {/* Description Textarea */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Descrizione Dettagliata Anomalia *
              </label>
              <textarea
                value={formData.descrizione}
                onChange={(e) => setFormData({ ...formData, descrizione: e.target.value })}
                rows={3}
                placeholder="Descrivi l'ostacolo (es. gradino banchina bus oltre 10cm, buca su asfalto pista ciclabile, stallo senza bici)..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            {/* Photo upload and Priority */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Foto / Allegato (Opzionale)
                </label>
                <label className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-600 text-xs text-slate-400 cursor-pointer">
                  <Camera className="w-4 h-4 text-purple-400" />
                  <span className="truncate">{photoPreview ? 'Foto Caricata ✓' : 'Carica foto ostacolo'}</span>
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                </label>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                  <span>Livello di Urgenza</span>
                  <InfoTooltip term="SLA Risoluzione (IRS)" showCitizenBadge={citizenGuide} />
                </label>
                <select
                  value={formData.priorita}
                  onChange={(e) => setFormData({ ...formData, priorita: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="Bassa">Bassa (Manutenzione programmata)</option>
                  <option value="Media">Media (Ostacolo parziale)</option>
                  <option value="Alta">Alta (Blocco totale disabili/sicurezza)</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-purple-950/40 border border-purple-400/40 flex items-center justify-center gap-2 transition disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Protocollazione in corso...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Invia Segnalazione Civica Certificata</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Civic Ledger / Feed Column (6/12) */}
        <div className="lg:col-span-6 bg-slate-800/70 p-6 rounded-2xl border border-slate-700/70 backdrop-blur-xl shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-700/60">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-emerald-400" />
                <span>Registro Pubblico Segnalazioni Civiche</span>
              </h3>
              <p className="text-xs text-slate-400">Feed trasparente memorizzato in locale con protocollo telematico</p>
            </div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800/50">
              {civicReports.length} Attive
            </span>
          </div>

          {/* Reports List */}
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
            {civicReports.map((report) => (
              <div
                key={report.id}
                className="p-4 rounded-xl bg-slate-900/80 border border-slate-700/60 hover:border-slate-600 transition space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-[10px] font-bold text-purple-400 bg-purple-950 px-2 py-0.5 rounded border border-purple-800/40">
                        {report.id}
                      </span>
                      <span className="text-xs font-bold text-white">{report.categoria}</span>
                    </div>
                    <p className="text-xs text-slate-300 font-medium mt-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-blue-400 shrink-0" />
                      {report.luogo}
                    </p>
                  </div>

                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                    report.stato === 'Risolto'
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                      : report.stato === 'In Lavorazione'
                      ? 'bg-amber-950 text-amber-300 border-amber-800'
                      : 'bg-blue-950 text-blue-300 border-blue-800'
                  }`}>
                    {report.stato}
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {report.descrizione}
                </p>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                  <span className="font-mono text-slate-400">{report.protocollo}</span>
                  <span className="text-slate-400">{report.dataOra}</span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}
