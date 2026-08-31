/**
 * Registro Ufficiale di Trasparenza Dati PM-ESG (Comune di Pisa)
 * Specifica lo stato di ciascun dato (Reale Live, Calcolato ISPRA o Virtuale/Mock)
 * e include i link diretti e certificati alle piattaforme e fonti istituzionali.
 */

export const DATA_STATUS_TYPES = {
  REAL_LIVE: {
    id: 'REAL_LIVE',
    label: 'DATO REALE LIVE',
    color: 'emerald',
    badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    dotClass: 'bg-emerald-400',
    description: 'Dato acquisito in tempo reale tramite API pubblica o sensori territoriali attivi.'
  },
  REAL_CALCULATED: {
    id: 'REAL_CALCULATED',
    label: 'CALCOLO ISPRA / ACI',
    color: 'blue',
    badgeClass: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    dotClass: 'bg-blue-400',
    description: 'Formula matematica certificata applicata sui dati effettivi di spostamento.'
  },
  VIRTUAL_PUMS: {
    id: 'VIRTUAL_PUMS',
    label: 'VIRTUALE / MODELLO PUMS',
    color: 'purple',
    badgeClass: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    dotClass: 'bg-purple-400',
    description: 'Dato simulato/prospettico basato su scenari di piano o stime di mobilità.'
  }
};

export const DATA_TRANSPARENCY_REGISTRY = [
  {
    id: 'air_quality_pisa',
    name: 'Qualità dell\'Aria & Concentrazioni PM10/PM2.5/NO₂ a Pisa',
    view: 'Executive & Header',
    status: 'REAL_LIVE',
    currentSource: 'API Open-Meteo & Copernicus CAMS su coordinate di Pisa (Lat: 43.7167, Lng: 10.4000)',
    updateFrequency: 'Oraria in tempo reale',
    officialUrl: 'https://open-meteo.com/en/docs/air-quality-api',
    officialPortalName: 'Open-Meteo Air Quality & Copernicus CAMS',
    requirementsToMakeReal: null // Già reale al 100%
  },
  {
    id: 'weather_pisa',
    name: 'Meteo & Condizioni Atmosferiche a Pisa',
    view: 'Header & Analyst',
    status: 'REAL_LIVE',
    currentSource: 'API Open-Meteo Forecast Pisa Real-Time',
    updateFrequency: 'Live (ogni 15 min)',
    officialUrl: 'https://open-meteo.com/en/docs',
    officialPortalName: 'Open-Meteo Weather Forecast (Pisa Node)',
    requirementsToMakeReal: null // Già reale al 100%
  },
  {
    id: 'co2_factors_ispra',
    name: 'Algoritmo Calcolo CO₂ Evitata & Fattori di Emissione',
    view: 'Executive & Open Data',
    status: 'REAL_CALCULATED',
    currentSource: 'Banca Dati Ufficiale ISPRA dei fattori di emissione del trasporto stradale in Italia (0.135 kg CO₂/km)',
    updateFrequency: 'Continuo su flussi di spostamento',
    officialUrl: 'https://fetransp.isprambiente.it/',
    officialPortalName: 'Banca Dati Fattori Emissione Trasporto ISPRA',
    requirementsToMakeReal: null // Modello standard certificato
  },
  {
    id: 'aci_running_costs',
    name: 'Costi Chilometrici & Risparmio Famiglie (ACI)',
    view: 'Open Data (Eco-Calculator)',
    status: 'REAL_CALCULATED',
    currentSource: 'Tabelle Nazionali dei Costi Chilometrici di Esercizio ACI (0.22 €/km)',
    updateFrequency: 'Annuale / Tabelle ACI in vigore',
    officialUrl: 'https://aci.gov.it/servizio/costi-chilometrici-di-esercizio/',
    officialPortalName: 'Tabelle Nazionali Costi Chilometrici ACI',
    requirementsToMakeReal: null
  },
  {
    id: 'osm_pilot_axis',
    name: 'Geometrie Stradali Asse Pilota & Coordinate Nodi',
    view: 'Mappa Territoriale',
    status: 'REAL_LIVE',
    currentSource: 'OpenStreetMap (OSM) / OSRM e Geoportale Regione Toscana',
    updateFrequency: 'Geometrie fisiche reali snappate su strada',
    officialUrl: 'https://www.openstreetmap.org/#map=15/43.7167/10.4000',
    officialPortalName: 'OpenStreetMap Nodo Pisa & OSRM',
    requirementsToMakeReal: null
  },
  {
    id: 'pisa_pums_deliberation',
    name: 'PUMS Pisa 2020-2030 & Target Decarbonizzazione',
    view: 'Executive (Report A4)',
    status: 'REAL_CALCULATED',
    currentSource: 'Piano Urbano Mobilità Sostenibile Comune di Pisa - Delibera Consiglio n. 19/2021',
    updateFrequency: 'Atti Ufficiali Comune di Pisa',
    officialUrl: 'https://pumspisa.tages.it/',
    officialPortalName: 'Portale Partecipativo Ufficiale PUMS Pisa',
    requirementsToMakeReal: null
  },
  {
    id: 'sharing_ciclopi_stations',
    name: 'Stalli & Bici Sharing Ciclopi Pisa',
    view: 'Mappa Territoriale',
    status: 'VIRTUAL_PUMS',
    currentSource: 'Simulazione basata su 6 stazioni reali (Stazione, Ponte di Mezzo, Fibonacci, Miracoli, Cavalieri, Porta Nuova)',
    updateFrequency: 'Simulato',
    officialUrl: 'https://pisamo.it/',
    officialPortalName: 'Pisamo S.r.l. - Gestore Mobilità Pisa',
    requirementsToMakeReal: {
      owner: 'Pisamo S.r.l. / Gestore Flotta Bicincittà-Ciclopi',
      standard: 'GBFS v3.0 (General Bikeshare Feed Specification) JSON',
      endpointsNeeded: [
        'https://api.ciclopi.eu/gbfs/v3/station_information.json',
        'https://api.ciclopi.eu/gbfs/v3/station_status.json'
      ],
      administrativeSteps: [
        'Richiesta a Pisamo S.r.l. dell\'URL del feed pubblico GBFS.',
        'Sostituzione dell\'array mock con fetch() periodica verso i feed GBFS.'
      ],
      estimatedTime: '1 giorno lavorativo'
    }
  },
  {
    id: 'bike_counters_inductive_loops',
    name: 'Spire Conta-Bici (Ponte di Mezzo, Lungarni, Corso Italia)',
    view: 'Analyst & Executive',
    status: 'VIRTUAL_PUMS',
    currentSource: 'Dati orari sintetici basati su matrici O/D studentesche e pendolari',
    updateFrequency: 'Simulato',
    officialUrl: 'https://pisamo.it/',
    officialPortalName: 'Pisamo S.r.l. & Comune di Pisa',
    requirementsToMakeReal: {
      owner: 'Comune di Pisa / Pisamo S.r.l. / FIAB Pisa',
      standard: 'API REST Eco-Counter / Protocollo MQTT o LoRaWAN su piattaforma Smart City Pisa',
      endpointsNeeded: [
        'GET /api/v1/counters/pisa/ponte-di-mezzo/hourly',
        'GET /api/v1/counters/pisa/fibonacci/hourly'
      ],
      administrativeSteps: [
        'Accesso all\'infrastruttura sensori IoT di Pisamo (o fornitore Eco-Counter).',
        'Configurazione webhook per l\'ingestione automatica dei passaggi orari nel database.'
      ],
      estimatedTime: '1-2 settimane'
    }
  },
  {
    id: 'bus_tpl_saturation',
    name: 'Saturazione & Velocità Linee Bus LAM (Autolinee Toscane)',
    view: 'Analyst',
    status: 'VIRTUAL_PUMS',
    currentSource: 'Modello orario su flotta urbana LAM Rossa / LAM Verde',
    updateFrequency: 'Simulato',
    officialUrl: 'https://www.at-bus.it/',
    officialPortalName: 'Autolinee Toscane S.p.A. - TPL Toscana',
    requirementsToMakeReal: {
      owner: 'Autolinee Toscane S.p.A. & Regione Toscana',
      standard: 'GTFS-Realtime (TripUpdates & VehiclePositions con occupancy_status)',
      endpointsNeeded: [
        'https://gtfs.at-bus.it/realtime/TripUpdates.pb',
        'https://gtfs.at-bus.it/realtime/VehiclePositions.pb'
      ],
      administrativeSteps: [
        'Richiesta accesso al portale sviluppatori Autolinee Toscane / Muoviti in Toscana.',
        'Parsing del feed binario Protocol Buffer (Protobuf) GTFS-RT per estrarre la saturazione passeggeri.'
      ],
      estimatedTime: '2-3 settimane'
    }
  },
  {
    id: 'peba_bus_stops',
    name: 'Catasto Banchine TPL & Standard PEBA',
    view: 'Mappa Territoriale & Executive',
    status: 'VIRTUAL_PUMS',
    currentSource: 'Censimento simulato su fermate strategiche (Stazione FS, Pacinotti, Fibonacci, Torre)',
    updateFrequency: 'Simulato',
    officialUrl: 'https://www.comune.pisa.it/',
    officialPortalName: 'Comune di Pisa - Portale Istituzionale',
    requirementsToMakeReal: {
      owner: 'Comune di Pisa - Ufficio Tecnico & Consulta per le Disabilità',
      standard: 'Shapefile GIS / GeoJSON / WFS Geoserver Comune di Pisa',
      endpointsNeeded: [
        'GET /geoserver/pisa_peba/wfs?service=WFS&version=2.0.0&request=GetFeature&typeName=peba_fermate&outputFormat=application/json'
      ],
      administrativeSteps: [
        'Esportazione del database redatto dai tecnici comunali per il Piano PEBA approvato in Consiglio.',
        'Caricamento del dataset GeoJSON completo nel cruscotto.'
      ],
      estimatedTime: '2-3 giorni'
    }
  },
  {
    id: 'civic_reports_storage',
    name: 'Registro Segnalazioni Civiche Cittadini',
    view: 'Open Data & Civico',
    status: 'REAL_LIVE',
    currentSource: 'Storage Reale Browser (LocalStorage / Session) + Export CSV/JSON Reale + Protocollo Telematico Generato',
    updateFrequency: 'Istantanea al submit',
    officialUrl: 'https://www.comune.pisa.it/',
    officialPortalName: 'Comune di Pisa - Servizi al Cittadino',
    requirementsToMakeReal: {
      owner: 'Comune di Pisa - Ufficio Relazioni con il Pubblico (URP)',
      standard: 'Database PostgreSQL con estensione PostGIS + REST API (Supabase / FastAPI / Django)',
      endpointsNeeded: [
        'POST /api/v1/civic-reports',
        'GET /api/v1/civic-reports/public-feed'
      ],
      administrativeSteps: [
        'Connessione a un database Supabase o server comunale dedicato per rendere il registro persistente cloud.',
        'Integrazione con il sistema di protocollazione dell\'Ente (es. protocollo Iride/Civilia).'
      ],
      estimatedTime: '1 giorno per DB Cloud / 2 settimane per integrazione con protocollo ente'
    }
  }
];
