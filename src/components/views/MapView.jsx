import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import { 
  PISA_PILOT_AXIS,
  PISA_QUICK_NODES 
} from '../../data/mockEsgData';
import DataSourceBadge from '../ui/DataSourceBadge';
import InfoTooltip from '../ui/InfoTooltip';
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
  ExternalLink,
  Car,
  Compass,
  Radio,
  Timer,
  Clock,
  Flame,
  Globe
} from 'lucide-react';

export default function MapView({ onTriggerCivicReport, onInspectMetric, citizenGuide = false }) {
  // Layer Toggles
  const [showBikeLanes, setShowBikeLanes] = useState(true);
  const [showSharing, setShowSharing] = useState(true);
  const [showPeba, setShowPeba] = useState(true);
  const [showCorridor, setShowCorridor] = useState(true);
  const [showTraffic, setShowTraffic] = useState(true); // Real-time vehicular traffic flow
  const [showIsochrones, setShowIsochrones] = useState(false); // 5/10 min bike circles
  const [filterCriticalOnly, setFilterCriticalOnly] = useState(false);

  // Base map style: 'voyager' | 'dark' | 'satellite'
  const [baseMapStyle, setBaseMapStyle] = useState('voyager');

  // Selected item on map
  const [selectedItem, setSelectedItem] = useState(null);

  // Active quick node
  const [activeNodeId, setActiveNodeId] = useState('all');

  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const tileLayerRef = useRef(null);
  const layerGroupRef = useRef(null);

  // Tile Providers (Free, no API key required)
  const TILE_CONFIGS = {
    voyager: {
      url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 20
    },
    dark: {
      url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      attribution: '&copy; <a href="https://carto.com/">CARTO Dark Matter</a> &copy; OpenStreetMap',
      maxZoom: 20
    },
    satellite: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
      maxZoom: 19
    }
  };

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: PISA_PILOT_AXIS.center,
        zoom: 14,
        minZoom: 12,
        maxZoom: 19,
        zoomControl: false,
      });

      // Initial Tile Layer
      const initialConfig = TILE_CONFIGS.voyager;
      const tiles = L.tileLayer(initialConfig.url, {
        attribution: initialConfig.attribution,
        maxZoom: initialConfig.maxZoom
      }).addTo(map);

      tileLayerRef.current = tiles;

      // Custom Zoom control at bottom right
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

  // Switch Base Map Style (Voyager / Dark / Satellite)
  useEffect(() => {
    if (!mapInstanceRef.current || !tileLayerRef.current) return;
    const config = TILE_CONFIGS[baseMapStyle] || TILE_CONFIGS.voyager;

    tileLayerRef.current.setUrl(config.url);
  }, [baseMapStyle]);

  // Update Layers when toggles or filters change
  useEffect(() => {
    if (!mapInstanceRef.current || !layerGroupRef.current) return;

    const layerGroup = layerGroupRef.current;
    layerGroup.clearLayers();

    // 1. Isochrones (5 min & 10 min Bike Reachability)
    if (showIsochrones) {
      const centerCoords = [43.7166, 10.4019]; // Ponte di Mezzo

      // 5 min radius (~1.2 km)
      L.circle(centerCoords, {
        radius: 1200,
        color: '#10B981',
        fillColor: '#10B981',
        fillOpacity: 0.12,
        weight: 2,
        dashArray: '6, 6'
      }).bindTooltip("<b>Isocrona 5 Minuti in Bici</b><br/>Area centro storico e stazioni", { sticky: true }).addTo(layerGroup);

      // 10 min radius (~2.5 km)
      L.circle(centerCoords, {
        radius: 2500,
        color: '#3B82F6',
        fillColor: '#3B82F6',
        fillOpacity: 0.08,
        weight: 2,
        dashArray: '8, 8'
      }).bindTooltip("<b>Isocrona 10 Minuti in Bici</b><br/>Raggiungibilità Cisanello, Ingegneria, Porta a Lucca", { sticky: true }).addTo(layerGroup);
    }

    // 2. Real-Time Traffic Flow Layer
    if (showTraffic && PISA_PILOT_AXIS.trafficSegments) {
      PISA_PILOT_AXIS.trafficSegments.forEach((segment) => {
        if (filterCriticalOnly && segment.status === 'fluid') return;

        const polyline = L.polyline(segment.coordinates, {
          color: segment.color,
          weight: 7,
          opacity: 0.85,
          lineCap: 'round',
          lineJoin: 'round'
        }).addTo(layerGroup);

        polyline.on('click', () => {
          setSelectedItem({ type: 'traffic', data: segment });
        });

        polyline.bindTooltip(`
          <div class="text-xs">
            <b>🚗 ${segment.name}</b><br/>
            <span style="color:${segment.color}; font-weight:bold;">● ${segment.statusLabel}</span><br/>
            <span>Vel. Auto: ${segment.avgSpeedCar} km/h • Vel. Bici: ${segment.avgSpeedBike} km/h</span><br/>
            <span class="text-emerald-400 font-bold">💡 ${segment.bikeAdvantage}</span>
          </div>
        `, { sticky: true });
      });
    }

    // 3. Corridor line
    if (showCorridor) {
      const corridorLine = L.polyline(PISA_PILOT_AXIS.corridorPath, {
        color: '#38BDF8',
        weight: 5,
        opacity: 0.9,
        dashArray: '8, 8',
        lineCap: 'round'
      }).addTo(layerGroup);

      corridorLine.bindTooltip("<b>Asse Pilota Pisa (OSM Reale)</b><br/>Stazione FS ⇄ Polo Fibonacci ⇄ Miracoli", {
        sticky: true
      });
    }

    // 4. Bike Lanes Layer (Real Geometries from OSM)
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

        polyline.bindTooltip(`<b>🚲 ${lane.name}</b><br/>${lane.lengthKm} km • ${lane.passaggiMediGiorno} passaggi/die`, {
          sticky: true
        });
      });
    }

    // 5. Sharing Stations Layer (Simulated GBFS)
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
          <div class="p-1 text-xs">
            <h4 class="font-bold text-sm text-slate-900 dark:text-white">${station.name}</h4>
            <p class="text-slate-500 mb-2">${station.type}</p>
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

    // 6. PEBA Platforms Layer (Simulated PEBA Census)
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
          <div class="p-1 text-xs">
            <h4 class="font-bold text-sm text-slate-900 dark:text-white">${platform.name}</h4>
            <div class="text-xs font-semibold my-1 ${isAcc ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}">
              ${isAcc ? '✓ 100% Conforme PEBA' : '⚠️ Non conforme - Da adeguare'}
            </div>
            <p class="text-[11px] text-slate-500">${platform.note}</p>
          </div>
        `);
      });
    }

  }, [showBikeLanes, showSharing, showPeba, showCorridor, showTraffic, showIsochrones, filterCriticalOnly]);

  // Quick FlyTo Handler
  const handleFlyTo = (node) => {
    setActiveNodeId(node.id);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(node.coords, node.zoom, {
        duration: 1.2,
        easeLinearity: 0.25
      });
    }
  };

  const resetView = () => {
    handleFlyTo(PISA_QUICK_NODES[0]);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Top Controls & KPI Ribbon */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 bg-slate-800/60 p-4 sm:p-5 rounded-2xl border border-slate-700/60 backdrop-blur-xl">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
              GIS Territoriale & Smart City Traffic Engine
            </span>
            <DataSourceBadge
              status="REAL_LIVE"
              customLabel="OSM Pisa & Satellite HD"
              onClick={() => onInspectMetric && onInspectMetric('osm_pilot_axis')}
            />
            <InfoTooltip term="GBFS / GTFS" showCitizenBadge={citizenGuide} />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
            Asse Pilota & Mappa Traffico in Tempo Reale di Pisa
          </h2>
        </div>

        {/* Quick KPI stats */}
        <div className="flex items-center gap-3 overflow-x-auto w-full lg:w-auto pb-1 lg:pb-0">
          <div className="bg-slate-900/80 px-3 py-2 rounded-xl border border-slate-700/70 text-center shrink-0">
            <div className="text-[10px] text-slate-400">Rete Ciclabile</div>
            <div className="text-sm font-extrabold text-emerald-400">6.5 km OSM</div>
          </div>
          <div className="bg-slate-900/80 px-3 py-2 rounded-xl border border-slate-700/70 text-center shrink-0">
            <div className="text-[10px] text-slate-400">Traffico Lungarni</div>
            <div className="text-sm font-extrabold text-rose-400">78% Congestionato</div>
          </div>
          <div className="bg-slate-900/80 px-3 py-2 rounded-xl border border-slate-700/70 text-center shrink-0">
            <div className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
              <span>Banchine PEBA</span>
              <InfoTooltip term="PEBA / IAU" showCitizenBadge={citizenGuide} />
            </div>
            <div className="text-sm font-extrabold text-amber-400">66.7% A Norma</div>
          </div>
        </div>
      </div>

      {/* FlyTo Quick Navigation Toolbar */}
      <div className="bg-slate-900/90 p-2.5 rounded-2xl border border-slate-800 flex items-center gap-2 overflow-x-auto no-scrollbar shadow-inner">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 flex items-center gap-1 shrink-0">
          <Compass className="w-3.5 h-3.5 text-blue-400" /> Navigatore Rapido:
        </span>
        <div className="flex items-center gap-1.5">
          {PISA_QUICK_NODES.map((node) => (
            <button
              key={node.id}
              type="button"
              onClick={() => handleFlyTo(node)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                activeNodeId === node.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-900/50 border border-blue-400/40'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
              }`}
            >
              {node.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Map & Interactive Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Sidebar (3/12): Layer Toggles & Map Styles */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* Base Map Style Switcher */}
          <div className="bg-slate-800/70 p-4 rounded-2xl border border-slate-700/70 backdrop-blur-xl shadow-lg space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-700/60">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <span>Stile Mappa Reale</span>
              </h3>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                type="button"
                onClick={() => setBaseMapStyle('voyager')}
                className={`p-2 rounded-xl text-center text-xs font-semibold border transition cursor-pointer ${
                  baseMapStyle === 'voyager'
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-500 shadow-md'
                    : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                🗺️ Smart City
              </button>
              <button
                type="button"
                onClick={() => setBaseMapStyle('dark')}
                className={`p-2 rounded-xl text-center text-xs font-semibold border transition cursor-pointer ${
                  baseMapStyle === 'dark'
                    ? 'bg-blue-950 text-blue-300 border-blue-500 shadow-md'
                    : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                🌃 Notturna
              </button>
              <button
                type="button"
                onClick={() => setBaseMapStyle('satellite')}
                className={`p-2 rounded-xl text-center text-xs font-semibold border transition cursor-pointer ${
                  baseMapStyle === 'satellite'
                    ? 'bg-purple-950 text-purple-300 border-purple-500 shadow-md'
                    : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                🛰️ Satellite HD
              </button>
            </div>
          </div>

          {/* Layer Controls Card */}
          <div className="bg-slate-800/70 p-5 rounded-2xl border border-slate-700/70 backdrop-blur-xl shadow-lg space-y-3.5">
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-700/60">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-400" />
                <span>Layer Territoriali</span>
              </h3>
              <button
                onClick={resetView}
                className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 p-1 rounded hover:bg-slate-700/50 transition cursor-pointer"
                title="Ripristina visualizzazione centrale di Pisa"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            </div>

            {/* Toggles */}
            <div className="space-y-2.5">
              
              {/* Toggle Live Traffic Flow */}
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-pulse" />
                    <div>
                      <div className="text-xs font-semibold text-white flex items-center gap-1">
                        <span>Traffico Veicolare Live</span>
                        <InfoTooltip term="Modal Split" showCitizenBadge={citizenGuide} />
                      </div>
                      <div className="text-[10px] text-slate-400">Flusso & congestione Lungarni</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={showTraffic}
                    onChange={(e) => setShowTraffic(e.target.checked)}
                    className="w-4 h-4 text-rose-500 rounded bg-slate-950 border-slate-700 focus:ring-0 cursor-pointer"
                  />
                </label>
                <div className="pt-1 flex items-center justify-between border-t border-slate-800 text-[9px] text-slate-400">
                  <span>6 arterie monitorate</span>
                  <span className="text-rose-400 font-bold">● Live Flow</span>
                </div>
              </div>

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
                  <span className="text-[9px] text-slate-500">OpenStreetMap Reale</span>
                  <DataSourceBadge status="REAL_LIVE" size="xs" customLabel="OSM" onClick={() => onInspectMetric && onInspectMetric('osm_pilot_axis')} />
                </div>
              </div>

              {/* Toggle Stalli Sharing */}
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
                    <div>
                      <div className="text-xs font-semibold text-white flex items-center gap-1">
                        <span>Stalli Sharing (Ciclopi)</span>
                        <InfoTooltip term="GBFS / GTFS" showCitizenBadge={citizenGuide} />
                      </div>
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
                  <span className="text-[9px] text-slate-500">Standard GBFS v3.0</span>
                  <DataSourceBadge status="VIRTUAL_PUMS" size="xs" customLabel="GBFS" onClick={() => onInspectMetric && onInspectMetric('sharing_ciclopi_stations')} />
                </div>
              </div>

              {/* Toggle Banchine PEBA */}
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                    <div>
                      <div className="text-xs font-semibold text-white flex items-center gap-1">
                        <span>Banchine PEBA (TPL)</span>
                        <InfoTooltip term="PEBA / IAU" showCitizenBadge={citizenGuide} />
                      </div>
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
                  <DataSourceBadge status="VIRTUAL_PUMS" size="xs" customLabel="PEBA" onClick={() => onInspectMetric && onInspectMetric('peba_bus_stops')} />
                </div>
              </div>

              {/* Toggle Isocrone Bici (5-10 min) */}
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-2.5">
                    <Timer className="w-3.5 h-3.5 text-purple-400" />
                    <div>
                      <div className="text-xs font-semibold text-white">Isocrone Raggiungibilità</div>
                      <div className="text-[10px] text-slate-400">Raggio 5 & 10 min in Bici</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={showIsochrones}
                    onChange={(e) => setShowIsochrones(e.target.checked)}
                    className="w-4 h-4 text-purple-500 rounded bg-slate-950 border-slate-700 focus:ring-0 cursor-pointer"
                  />
                </label>
              </div>

            </div>

            {/* Quick Filter: Critical items only */}
            <div className="pt-2 border-t border-slate-700/60">
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

          {/* Traffic Legend Card */}
          <div className="bg-slate-800/70 p-4 rounded-2xl border border-slate-700/70 text-xs space-y-2.5">
            <h4 className="font-bold text-slate-300 text-[11px] uppercase tracking-wider flex items-center justify-between">
              <span>Legenda Traffico & Simboli</span>
              <InfoTooltip term="Modal Split" showCitizenBadge={citizenGuide} />
            </h4>
            <div className="space-y-1.5 text-slate-400 text-[11px]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-1.5 rounded-full bg-emerald-500" />
                <span>Traffico Veicolare Fluido (ZTL / Piagge)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-1.5 rounded-full bg-amber-500" />
                <span>Traffico Sostenuto (Porta Nuova)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-1.5 rounded-full bg-rose-500" />
                <span>Congestione / Rallentamenti (Lungarni)</span>
              </div>
              <div className="flex items-center gap-2 pt-1 border-t border-slate-800">
                <span className="w-3 h-3 rounded-full bg-blue-600" />
                <span>Fermata PEBA 100% Conforme</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-600" />
                <span>Fermata Da Adeguare (PNRR)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Center / Right Area (9/12): Map Viewport + Detail Inspector */}
        <div className="lg:col-span-9 space-y-4">
          
          {/* Map Container */}
          <div className="relative w-full h-[540px] rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-950">
            <div ref={mapContainerRef} className="w-full h-full" />

            {/* Over-map Quick Badge */}
            <div className="absolute top-4 left-4 z-[500] bg-slate-900/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-700 text-xs font-semibold text-white shadow-xl flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Sensori IoT & Flusso Traffico Live</span>
            </div>

            {/* Action to report civic barrier on this map */}
            <button
              onClick={() => onTriggerCivicReport && onTriggerCivicReport()}
              className="absolute top-4 right-4 z-[500] bg-blue-600 hover:bg-blue-500 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-xl border border-blue-400/40 flex items-center gap-1.5 transition cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Segnala Barriera PEBA
            </button>
          </div>

          {/* Detail Inspector Panel when user clicks a node or traffic line */}
          {selectedItem && (
            <div className="bg-slate-800/95 p-5 rounded-2xl border border-blue-500/50 shadow-2xl backdrop-blur-2xl animate-in slide-in-from-bottom-3 duration-200">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-950 text-blue-400 border border-blue-800">
                      {selectedItem.type === 'traffic' 
                        ? 'Monitoraggio Traffico & Congestione' 
                        : selectedItem.type === 'sharing' 
                        ? 'Stallo Bike Sharing Ciclopi' 
                        : selectedItem.type === 'peba' 
                        ? 'Banchina TPL / PEBA' 
                        : 'Segmento Ciclabile'}
                    </span>

                    {selectedItem.type === 'traffic' && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded" style={{ backgroundColor: `${selectedItem.data.color}20`, color: selectedItem.data.color, border: `1px solid ${selectedItem.data.color}40` }}>
                        ● {selectedItem.data.statusLabel} ({selectedItem.data.congestionPercent}% Congestione)
                      </span>
                    )}

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
                    className="text-slate-400 hover:text-white text-xs px-2.5 py-1 rounded bg-slate-900 border border-slate-700 cursor-pointer"
                  >
                    Chiudi
                  </button>
                </div>
              </div>

              {/* Dynamic Content based on selected POI type */}
              {selectedItem.type === 'traffic' && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-3 border-t border-slate-700/60 text-xs">
                  <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-slate-400 text-[11px]">Velocità Media Auto</span>
                    <p className="text-sm font-bold text-rose-400 mt-0.5">{selectedItem.data.avgSpeedCar} km/h</p>
                  </div>
                  <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-slate-400 text-[11px]">Velocità Media Bici</span>
                    <p className="text-sm font-bold text-emerald-400 mt-0.5">{selectedItem.data.avgSpeedBike} km/h</p>
                  </div>
                  <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-slate-400 text-[11px]">Ritardo Traffico Auto</span>
                    <p className="text-sm font-bold text-amber-400 mt-0.5">{selectedItem.data.delayMinutes}</p>
                  </div>
                  <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-slate-400 text-[11px]">Vantaggio Mobilità Dolce</span>
                    <p className="text-xs font-bold text-emerald-300 mt-0.5">{selectedItem.data.bikeAdvantage}</p>
                  </div>
                </div>
              )}

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
