import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import { 
  PISA_PILOT_AXIS 
} from '../../data/mockEsgData';
import DataSourceBadge from '../ui/DataSourceBadge';
import { 
  Layers, 
  Bike, 
  MapPin, 
  Accessibility, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  Navigation, 
  Sparkles, 
  Maximize2, 
  RotateCcw,
  Zap,
  Eye,
  SlidersHorizontal,
  Plus,
  Terminal,
  ExternalLink
} from 'lucide-react';

export default function MapView({ onTriggerCivicReport, onInspectMetric }) {
  const [showBikeLanes, setShowBikeLanes] = useState(true);
  const [showSharing, setShowSharing] = useState(true);
  const [showPeba, setShowPeba] = useState(true);
  const [showCorridor, setShowCorridor] = useState(true);
  const [filterCriticalOnly, setFilterCriticalOnly] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);

  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const layerGroupRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: PISA_PILOT_AXIS.center,
        zoom: 14,
        minZoom: 12,
        maxZoom: 18,
        zoomControl: false,
      });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        subdomains: 'abcd',
        maxZoom: 20
      }).addTo(map);

      L.control.zoom({ position: 'bottomright' }).addTo(map);

      mapInstanceRef.current = map;
      layerGroupRef.current = L.layerGroup().addTo(map);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current || !layerGroupRef.current) return;

    const layerGroup = layerGroupRef.current;
    layerGroup.clearLayers();

    // Corridor line
    if (showCorridor) {
      const corridorLine = L.polyline(PISA_PILOT_AXIS.corridorPath, {
        color: '#3B82F6',
        weight: 6,
        opacity: 0.85,
        dashArray: '8, 8',
        lineCap: 'round'
      }).addTo(layerGroup);

      corridorLine.bindTooltip("<b>Asse Pilota Pisa (OSM Reale)</b><br/>Stazione FS ⇄ Polo Fibonacci ⇄ Miracoli", {
        sticky: true
      });
    }

    // Bike Lanes Layer (Real Geometries from OSM)
    if (showBikeLanes) {
      PISA_PILOT_AXIS.bikeLanes.forEach((lane) => {
        const polyline = L.polyline(lane.coordinates, {
          color: '#10B981',
          weight: 5,
          opacity: 0.9,
          lineJoin: 'round'
        }).addTo(layerGroup);

        polyline.on('click', () => {
          setSelectedItem({ type: 'bike', data: lane });
        });

        polyline.bindTooltip(`<b>${lane.name} (Geometria Reale OSM)</b><br/>${lane.lengthKm} km • ${lane.passaggiMediGiorno} passaggi/die`, {
          sticky: true
        });
      });
    }

    // Sharing Stations Layer (Simulated GBFS)
    if (showSharing) {
      PISA_PILOT_AXIS.sharingStations.forEach((station) => {
        if (filterCriticalOnly && station.alert === 'optimal') return;

        const alertBg = station.alert === 'full' 
          ? 'bg-rose-500 ring-rose-400' 
          : station.alert === 'empty' 
          ? 'bg-amber-500 ring-amber-400' 
          : 'bg-emerald-500 ring-emerald-400';

        const customIcon = L.divIcon({
          className: 'custom-marker',
          html: `
            <div class="relative flex items-center justify-center w-8 h-8 rounded-full ${alertBg} text-white font-bold shadow-lg ring-4 ring-opacity-40 cursor-pointer transform hover:scale-110 transition-transform">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="18.5" cy="17.5" r="3.5"/><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="15" cy="5" r="1"/><path d="M12 17.5V14l-3-3 4-3 2 3h2"/>
              </svg>
              <span class="absolute -top-1.5 -right-1.5 bg-slate-950 text-white text-[10px] px-1 py-0.2 rounded-full border border-slate-700 font-mono">
                ${station.availableBikes}
              </span>
            </div>
          `,
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        });

        const marker = L.marker(station.position, { icon: customIcon }).addTo(layerGroup);

        marker.on('click', () => {
          setSelectedItem({ type: 'sharing', data: station });
        });

        marker.bindPopup(`
          <div class="p-1">
            <h4 class="font-bold text-sm text-slate-900 dark:text-white">${station.name}</h4>
            <p class="text-xs text-slate-500 mb-2">${station.type}</p>
            <div class="flex items-center justify-between text-xs my-1">
              <span>Bici disponibili:</span>
              <span class="font-bold text-emerald-600 dark:text-emerald-400">${station.availableBikes} / ${station.capacity}</span>
            </div>
            <div class="text-[11px] font-medium px-2 py-0.5 rounded mt-2 ${
              station.alert === 'full' ? 'bg-rose-100 text-rose-800' : station.alert === 'empty' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
            }">
              ${station.alertMessage}
            </div>
          </div>
        `);
      });
    }

    // PEBA Platforms Layer (Simulated PEBA Census)
    if (showPeba) {
      PISA_PILOT_AXIS.pebaPlatforms.forEach((platform) => {
        if (filterCriticalOnly && platform.accessible) return;

        const isAcc = platform.accessible;
        const markerBg = isAcc ? 'bg-blue-600 ring-blue-400' : 'bg-rose-600 ring-rose-400';

        const customIcon = L.divIcon({
          className: 'custom-peba-marker',
          html: `
            <div class="relative flex items-center justify-center w-8 h-8 rounded-full ${markerBg} text-white font-bold shadow-lg ring-4 ring-opacity-40 cursor-pointer transform hover:scale-110 transition-transform">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="4" r="2"/><path d="M18 19v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="14" r="2"/>
              </svg>
              <span class="absolute -bottom-1 -right-1 w-3 h-3 rounded-full ${isAcc ? 'bg-emerald-400' : 'bg-rose-400'} border border-slate-900"></span>
            </div>
          `,
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        });

        const marker = L.marker(platform.position, { icon: customIcon }).addTo(layerGroup);

        marker.on('click', () => {
          setSelectedItem({ type: 'peba', data: platform });
        });

        marker.bindPopup(`
          <div class="p-1">
            <h4 class="font-bold text-sm text-slate-900 dark:text-white">${platform.name}</h4>
            <div class="text-xs font-semibold my-1 ${isAcc ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}">
              ${isAcc ? '✓ 100% Conforme PEBA' : '⚠️ Non conforme - Da adeguare'}
            </div>
            <p class="text-[11px] text-slate-500">${platform.note}</p>
          </div>
        `);
      });
    }

  }, [showBikeLanes, showSharing, showPeba, showCorridor, filterCriticalOnly]);

  const resetView = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView(PISA_PILOT_AXIS.center, PISA_PILOT_AXIS.zoom);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Top Controls & KPI Ribbon */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 bg-slate-800/60 p-4 sm:p-5 rounded-2xl border border-slate-700/60 backdrop-blur-xl">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
              GIS Territoriale & IoT
            </span>
            <DataSourceBadge
              status="REAL_LIVE"
              customLabel="OSM Pisa Reale"
              onClick={() => onInspectMetric && onInspectMetric('osm_pilot_axis')}
            />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
            Asse Pilota di Pisa (Stazione FS ➔ Ponte di Mezzo ➔ Fibonacci ➔ Miracoli)
          </h2>
        </div>

        {/* Quick KPI stats */}
        <div className="flex items-center gap-3 overflow-x-auto w-full lg:w-auto pb-1 lg:pb-0">
          <div className="bg-slate-900/80 px-3 py-2 rounded-xl border border-slate-700/70 text-center shrink-0">
            <div className="text-[10px] text-slate-400">Rete Asse</div>
            <div className="text-sm font-extrabold text-emerald-400">6.5 km OSM</div>
          </div>
          <div className="bg-slate-900/80 px-3 py-2 rounded-xl border border-slate-700/70 text-center shrink-0">
            <div className="text-[10px] text-slate-400">Stalli Ciclopi</div>
            <div className="text-sm font-extrabold text-blue-400">6 Hubs (GBFS)</div>
          </div>
          <div className="bg-slate-900/80 px-3 py-2 rounded-xl border border-slate-700/70 text-center shrink-0">
            <div className="text-[10px] text-slate-400">Conformità PEBA</div>
            <div className="text-sm font-extrabold text-amber-400">66.7% Fermate</div>
          </div>
        </div>
      </div>

      {/* Main Map & Interactive Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Sidebar (3/12): Layer Toggles & Filters */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* Layer Controls Card */}
          <div className="bg-slate-800/70 p-5 rounded-2xl border border-slate-700/70 backdrop-blur-xl shadow-lg space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-700/60">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-400" />
                <span>Layer Territoriali</span>
              </h3>
              <button
                onClick={resetView}
                className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 p-1 rounded hover:bg-slate-700/50 transition"
                title="Ripristina visualizzazione centrale di Pisa"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            </div>

            {/* Toggles with Data Status Indicators */}
            <div className="space-y-2.5">
              
              {/* Toggle Ciclopiste */}
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                    <div>
                      <div className="text-xs font-semibold text-white">Ciclopiste & Corsie</div>
                      <div className="text-[10px] text-slate-400">4 percorsi • 6.5 km</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={showBikeLanes}
                    onChange={(e) => setShowBikeLanes(e.target.checked)}
                    className="w-4 h-4 text-emerald-500 rounded bg-slate-950 border-slate-700 focus:ring-0 cursor-pointer"
                  />
                </label>
                <div className="pt-1 flex items-center justify-between border-t border-slate-800/80">
                  <span className="text-[9px] text-slate-500">Fonte: OpenStreetMap</span>
                  <DataSourceBadge status="REAL_LIVE" size="xs" customLabel="Reale OSM" onClick={() => onInspectMetric && onInspectMetric('osm_pilot_axis')} />
                </div>
              </div>

              {/* Toggle Stalli Sharing */}
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
                    <div>
                      <div className="text-xs font-semibold text-white">Stalli Sharing (Ciclopi)</div>
                      <div className="text-[10px] text-slate-400">6 stazioni con alert</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={showSharing}
                    onChange={(e) => setShowSharing(e.target.checked)}
                    className="w-4 h-4 text-amber-500 rounded bg-slate-950 border-slate-700 focus:ring-0 cursor-pointer"
                  />
                </label>
                <div className="pt-1 flex items-center justify-between border-t border-slate-800/80">
                  <span className="text-[9px] text-slate-500">Standard: GBFS v3.0</span>
                  <DataSourceBadge status="VIRTUAL_PUMS" size="xs" customLabel="Roadmap GBFS" onClick={() => onInspectMetric && onInspectMetric('sharing_ciclopi_stations')} />
                </div>
              </div>

              {/* Toggle Banchine PEBA */}
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                    <div>
                      <div className="text-xs font-semibold text-white">Banchine PEBA (TPL)</div>
                      <div className="text-[10px] text-slate-400">Accessibili vs Non conformi</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={showPeba}
                    onChange={(e) => setShowPeba(e.target.checked)}
                    className="w-4 h-4 text-blue-500 rounded bg-slate-950 border-slate-700 focus:ring-0 cursor-pointer"
                  />
                </label>
                <div className="pt-1 flex items-center justify-between border-t border-slate-800/80">
                  <span className="text-[9px] text-slate-500">Piano PEBA Pisa</span>
                  <DataSourceBadge status="VIRTUAL_PUMS" size="xs" customLabel="Roadmap PEBA" onClick={() => onInspectMetric && onInspectMetric('peba_bus_stops')} />
                </div>
              </div>

            </div>

            {/* Quick Filter: Critical items only */}
            <div className="pt-3 border-t border-slate-700/60">
              <label className="flex items-center justify-between p-2 rounded-lg bg-rose-950/30 border border-rose-900/50 cursor-pointer">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                  <span className="text-xs font-semibold text-rose-300">Filtra solo criticità</span>
                </div>
                <input
                  type="checkbox"
                  checked={filterCriticalOnly}
                  onChange={(e) => setFilterCriticalOnly(e.target.checked)}
                  className="w-4 h-4 text-rose-500 rounded bg-slate-950 border-rose-800 focus:ring-0 cursor-pointer"
                />
              </label>
            </div>
          </div>

          {/* Legend Card */}
          <div className="bg-slate-800/70 p-4 rounded-2xl border border-slate-700/70 text-xs space-y-2">
            <h4 className="font-bold text-slate-300 text-[11px] uppercase tracking-wider">Legenda Simboli</h4>
            <div className="space-y-1.5 text-slate-400 text-[11px]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500" />
                <span>Stallo Sharing Pieno (&gt;90%) o Vuoto (&lt;10%)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span>Stallo Sharing Disponibilità Ottimale</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-600" />
                <span>Fermata Bus con Banchina PEBA 100% Conforme</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-600" />
                <span>Fermata Bus Non Conforme (Intervento PNRR)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Center / Right Area (9/12): Map Viewport + Detail Inspector */}
        <div className="lg:col-span-9 space-y-4">
          
          {/* Map Container */}
          <div className="relative w-full h-[520px] rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-950">
            <div ref={mapContainerRef} className="w-full h-full" />

            {/* Over-map Quick Badge */}
            <div className="absolute top-4 left-4 z-[500] bg-slate-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-700 text-xs font-semibold text-white shadow-xl flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>GIS Pisa Live • Nodi Asse Pilota Connessi</span>
            </div>

            {/* Action to report civic barrier on this map */}
            <button
              onClick={() => onTriggerCivicReport && onTriggerCivicReport()}
              className="absolute top-4 right-4 z-[500] bg-blue-600 hover:bg-blue-500 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-xl border border-blue-400/40 flex items-center gap-1.5 transition"
            >
              <Plus className="w-4 h-4" /> Segnala Barriera PEBA
            </button>
          </div>

          {/* Detail Inspector Panel when user clicks a node */}
          {selectedItem && (
            <div className="bg-slate-800/90 p-5 rounded-2xl border border-blue-500/40 shadow-xl backdrop-blur-xl animate-in slide-in-from-bottom-3 duration-200">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-950 text-blue-400 border border-blue-800">
                      {selectedItem.type === 'sharing' ? 'Stallo Bike Sharing Ciclopi' : selectedItem.type === 'peba' ? 'Banchina TPL / PEBA' : 'Segmento Ciclabile'}
                    </span>
                    {selectedItem.type === 'sharing' && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        selectedItem.data.alert === 'full' ? 'bg-rose-950 text-rose-400 border border-rose-800' : selectedItem.data.alert === 'empty' ? 'bg-amber-950 text-amber-400 border border-amber-800' : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      }`}>
                        {selectedItem.data.alertMessage}
                      </span>
                    )}
                    {selectedItem.type === 'peba' && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        selectedItem.data.accessible ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-rose-950 text-rose-400 border border-rose-800'
                      }`}>
                        {selectedItem.data.scorePEBA} PEBA
                      </span>
                    )}
                  </div>
                  <h4 className="text-base font-bold text-white">{selectedItem.data.name}</h4>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (onInspectMetric) {
                        const targetId = selectedItem.type === 'sharing' 
                          ? 'sharing_ciclopi_stations' 
                          : selectedItem.type === 'peba' 
                          ? 'peba_bus_stops' 
                          : 'osm_pilot_axis';
                        onInspectMetric(targetId);
                      }
                    }}
                    className="text-xs text-purple-300 hover:text-white px-2.5 py-1 rounded bg-purple-950/80 border border-purple-800 flex items-center gap-1 transition"
                  >
                    <Terminal className="w-3 h-3" /> Requisiti Reali
                  </button>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded bg-slate-900 border border-slate-700"
                  >
                    Chiudi
                  </button>
                </div>
              </div>

              {/* Dynamic Content based on selected POI type */}
              {selectedItem.type === 'sharing' && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-3 border-t border-slate-700/60 text-xs">
                  <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-slate-400 text-[11px]">Bici Disponibili</span>
                    <p className="text-sm font-bold text-emerald-400 mt-0.5">{selectedItem.data.availableBikes} / {selectedItem.data.capacity}</p>
                  </div>
                  <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-slate-400 text-[11px]">E-Bike con Batteria</span>
                    <p className="text-sm font-bold text-blue-400 mt-0.5">{selectedItem.data.eBikes} attive</p>
                  </div>
                  <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-slate-400 text-[11px]">Stalli Liberi</span>
                    <p className="text-sm font-bold text-white mt-0.5">{selectedItem.data.emptySlots} posti</p>
                  </div>
                  <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-slate-400 text-[11px]">Azioni Consigliate</span>
                    <p className="text-xs font-semibold text-amber-300 mt-0.5">
                      {selectedItem.data.alert === 'full' ? 'Ribilanciamento flotta' : selectedItem.data.alert === 'empty' ? 'Ricarica stallo' : 'Regolare'}
                    </p>
                  </div>
                </div>
              )}

              {selectedItem.type === 'peba' && (
                <div className="mt-4 pt-3 border-t border-slate-700/60 text-xs space-y-2">
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-slate-400 text-[11px]">Dotazioni Accessibilità:</span>
                    {selectedItem.data.features.map((feat, idx) => (
                      <span key={idx} className="bg-slate-900 px-2 py-0.5 rounded text-slate-200 border border-slate-800">
                        {feat}
                      </span>
                    ))}
                  </div>
                  <p className="text-slate-300 text-xs mt-1">
                    <strong className="text-slate-400">Note Tecniche PEBA:</strong> {selectedItem.data.note}
                  </p>
                </div>
              )}

              {selectedItem.type === 'bike' && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4 pt-3 border-t border-slate-700/60 text-xs">
                  <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-slate-400 text-[11px]">Lunghezza Segmento</span>
                    <p className="text-sm font-bold text-emerald-400 mt-0.5">{selectedItem.data.lengthKm} km</p>
                  </div>
                  <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-slate-400 text-[11px]">Passaggi Giornalieri Stimati</span>
                    <p className="text-sm font-bold text-blue-400 mt-0.5">{selectedItem.data.passaggiMediGiorno} passaggi</p>
                  </div>
                  <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-slate-400 text-[11px]">Stato Pavimentazione</span>
                    <p className="text-xs font-semibold text-white mt-0.5">{selectedItem.data.statoManutenzione}</p>
                  </div>
                </div>
              )}

            </div>
          )}

        </div>

      </div>

    </div>
  );
}
